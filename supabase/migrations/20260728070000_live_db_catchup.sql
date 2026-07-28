-- ============================================================================
-- Catch-up script for project nyfadcrlpzbzvuvybbhx
--
-- Verified live state (via read-only PostgREST probes, no writes made):
--   - public.confirmations exists but only in its ORIGINAL shape: still has
--     confirmation_code, missing website/founding_year/board_affiliation/
--     school_type/school_type_other/total_student_strength/accreditations/
--     vision/mission/award_recipient_*.
--   - public.nominations exists and already matches the current code.
--   - public.organization_award_registrations   -> does not exist
--   - public.college_award_registrations        -> does not exist
--   - public.individual_award_registrations      -> does not exist
--   - public.participations                      -> does not exist
--   - storage bucket "signatures"                -> does not exist
--
-- This script folds together every migration in supabase/migrations/ that
-- has not yet been applied here (everything after the original two files),
-- in their original order, so the live schema ends up matching what
-- src/hooks/*.ts and src/integrations/supabase/types.ts already assume.
--
-- Safe to run more than once: table/column/constraint changes use
-- IF NOT EXISTS / IF EXISTS guards; storage policies are wrapped in DO
-- blocks that check pg_policies first.
-- ============================================================================

-- ---- storage bucket + policies (from 20260725000000_setup_new_project.sql) ----
INSERT INTO storage.buckets (id, name, public)
VALUES ('signatures', 'signatures', true)
ON CONFLICT (id) DO NOTHING;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'storage' AND tablename = 'objects'
      AND policyname = 'anyone can upload signature'
  ) THEN
    CREATE POLICY "anyone can upload signature" ON storage.objects FOR INSERT TO anon, authenticated
    WITH CHECK (bucket_id = 'signatures');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'storage' AND tablename = 'objects'
      AND policyname = 'anyone can read signature'
  ) THEN
    CREATE POLICY "anyone can read signature" ON storage.objects FOR SELECT TO anon, authenticated
    USING (bucket_id = 'signatures');
  END IF;
END $$;

-- ---- 20260727000000_add_award_recipient_to_confirmations.sql ----
ALTER TABLE public.confirmations
  ADD COLUMN IF NOT EXISTS award_recipient_name TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS award_recipient_designation TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS award_recipient_phone TEXT NOT NULL DEFAULT '';

ALTER TABLE public.confirmations
  ALTER COLUMN award_recipient_name DROP DEFAULT,
  ALTER COLUMN award_recipient_designation DROP DEFAULT,
  ALTER COLUMN award_recipient_phone DROP DEFAULT;

-- ---- 20260727010000_add_school_profile_to_confirmations.sql ----
ALTER TABLE public.confirmations
  ADD COLUMN IF NOT EXISTS founding_year INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS board_affiliation TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS total_student_strength INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS accreditations TEXT,
  ADD COLUMN IF NOT EXISTS standout_milestone TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS vision TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS mission TEXT NOT NULL DEFAULT '';

ALTER TABLE public.confirmations
  ALTER COLUMN founding_year DROP DEFAULT,
  ALTER COLUMN board_affiliation DROP DEFAULT,
  ALTER COLUMN total_student_strength DROP DEFAULT,
  ALTER COLUMN standout_milestone DROP DEFAULT,
  ALTER COLUMN vision DROP DEFAULT,
  ALTER COLUMN mission DROP DEFAULT;

-- ---- 20260727020000_add_school_type_to_confirmations.sql ----
ALTER TABLE public.confirmations
  ADD COLUMN IF NOT EXISTS school_type TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS school_type_other TEXT;

ALTER TABLE public.confirmations
  ALTER COLUMN school_type DROP DEFAULT;

-- ---- 20260728000000_add_participations_table.sql ----
CREATE TABLE IF NOT EXISTS public.participations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  visitor_type TEXT NOT NULL,
  visitor_type_other TEXT,
  organisation TEXT,
  city TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  guest_count INT NOT NULL DEFAULT 0 CHECK (guest_count BETWEEN 0 AND 5),
  updates_opt_in BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.participations TO anon, authenticated;
GRANT ALL ON public.participations TO service_role;
ALTER TABLE public.participations ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'participations'
      AND policyname = 'anyone can submit participation'
  ) THEN
    CREATE POLICY "anyone can submit participation" ON public.participations FOR INSERT TO anon, authenticated WITH CHECK (true);
  END IF;
END $$;

-- ---- 20260728010000_add_individual_award_registrations_table.sql ----
CREATE TABLE IF NOT EXISTS public.individual_award_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  confirmation_code TEXT NOT NULL,
  your_name TEXT NOT NULL,
  role TEXT NOT NULL,
  organisation TEXT,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  award_category TEXT NOT NULL,
  award_category_other TEXT,
  standout_achievement TEXT NOT NULL,
  bio TEXT NOT NULL,
  guest_passes INT NOT NULL CHECK (guest_passes BETWEEN 0 AND 10),
  signature_url TEXT,
  authorised BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.individual_award_registrations TO anon, authenticated;
GRANT ALL ON public.individual_award_registrations TO service_role;
ALTER TABLE public.individual_award_registrations ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'individual_award_registrations'
      AND policyname = 'anyone can submit individual award registration'
  ) THEN
    CREATE POLICY "anyone can submit individual award registration" ON public.individual_award_registrations FOR INSERT TO anon, authenticated WITH CHECK (true);
  END IF;
END $$;

-- ---- 20260728020000_drop_confirmation_code.sql ----
ALTER TABLE public.confirmations DROP COLUMN IF EXISTS confirmation_code;
ALTER TABLE public.individual_award_registrations DROP COLUMN IF EXISTS confirmation_code;

-- ---- 20260728030000_add_organization_and_college_award_tables.sql ----
CREATE TABLE IF NOT EXISTS public.organization_award_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_name TEXT NOT NULL,
  founding_year INTEGER NOT NULL,
  industry TEXT NOT NULL,
  organization_type TEXT NOT NULL,
  organization_type_other TEXT,
  total_team_strength INTEGER NOT NULL,
  accreditations TEXT,
  standout_milestone TEXT NOT NULL,
  vision TEXT NOT NULL,
  mission TEXT NOT NULL,
  your_name TEXT NOT NULL,
  designation TEXT NOT NULL,
  award_recipient_name TEXT NOT NULL,
  award_recipient_designation TEXT NOT NULL,
  award_recipient_phone TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  team_passes INT NOT NULL CHECK (team_passes BETWEEN 0 AND 50),
  guest_passes INT NOT NULL CHECK (guest_passes BETWEEN 0 AND 20),
  signature_url TEXT,
  authorised BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.organization_award_registrations TO anon, authenticated;
GRANT ALL ON public.organization_award_registrations TO service_role;
ALTER TABLE public.organization_award_registrations ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'organization_award_registrations'
      AND policyname = 'anyone can submit organization award registration'
  ) THEN
    CREATE POLICY "anyone can submit organization award registration" ON public.organization_award_registrations FOR INSERT TO anon, authenticated WITH CHECK (true);
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS public.college_award_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  institution_name TEXT NOT NULL,
  founding_year INTEGER NOT NULL,
  affiliation TEXT NOT NULL,
  institution_type TEXT NOT NULL,
  institution_type_other TEXT,
  total_student_strength INTEGER NOT NULL,
  accreditations TEXT,
  standout_milestone TEXT NOT NULL,
  vision TEXT NOT NULL,
  mission TEXT NOT NULL,
  your_name TEXT NOT NULL,
  designation TEXT NOT NULL,
  award_recipient_name TEXT NOT NULL,
  award_recipient_designation TEXT NOT NULL,
  award_recipient_phone TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  student_passes INT NOT NULL CHECK (student_passes BETWEEN 0 AND 50),
  staff_passes INT NOT NULL CHECK (staff_passes BETWEEN 0 AND 20),
  signature_url TEXT,
  authorised BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.college_award_registrations TO anon, authenticated;
GRANT ALL ON public.college_award_registrations TO service_role;
ALTER TABLE public.college_award_registrations ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'college_award_registrations'
      AND policyname = 'anyone can submit college award registration'
  ) THEN
    CREATE POLICY "anyone can submit college award registration" ON public.college_award_registrations FOR INSERT TO anon, authenticated WITH CHECK (true);
  END IF;
END $$;

-- ---- 20260728040000_drop_standout_milestone.sql ----
ALTER TABLE public.confirmations DROP COLUMN IF EXISTS standout_milestone;
ALTER TABLE public.organization_award_registrations DROP COLUMN IF EXISTS standout_milestone;
ALTER TABLE public.college_award_registrations DROP COLUMN IF EXISTS standout_milestone;

-- ---- 20260728050000_award_category_updates.sql ----
ALTER TABLE public.confirmations ADD COLUMN IF NOT EXISTS website TEXT;
ALTER TABLE public.organization_award_registrations ADD COLUMN IF NOT EXISTS website TEXT;
ALTER TABLE public.college_award_registrations ADD COLUMN IF NOT EXISTS website TEXT;

ALTER TABLE public.individual_award_registrations DROP COLUMN IF EXISTS standout_achievement;

ALTER TABLE public.confirmations DROP CONSTRAINT IF EXISTS confirmations_student_passes_check;
ALTER TABLE public.confirmations ADD CONSTRAINT confirmations_student_passes_check CHECK (student_passes BETWEEN 0 AND 30);

ALTER TABLE public.college_award_registrations DROP CONSTRAINT IF EXISTS college_award_registrations_student_passes_check;
ALTER TABLE public.college_award_registrations ADD CONSTRAINT college_award_registrations_student_passes_check CHECK (student_passes BETWEEN 0 AND 30);

ALTER TABLE public.organization_award_registrations DROP CONSTRAINT IF EXISTS organization_award_registrations_team_passes_check;
ALTER TABLE public.organization_award_registrations ADD CONSTRAINT organization_award_registrations_team_passes_check CHECK (team_passes BETWEEN 0 AND 5);

ALTER TABLE public.individual_award_registrations DROP CONSTRAINT IF EXISTS individual_award_registrations_guest_passes_check;
ALTER TABLE public.individual_award_registrations ADD CONSTRAINT individual_award_registrations_guest_passes_check CHECK (guest_passes BETWEEN 0 AND 2);

-- ---- 20260728060000_add_note_to_participations.sql ----
ALTER TABLE public.participations ADD COLUMN IF NOT EXISTS note TEXT;

-- ---- 20260728060000_drop_individual_award_category.sql ----
ALTER TABLE public.individual_award_registrations DROP COLUMN IF EXISTS award_category;
ALTER TABLE public.individual_award_registrations DROP COLUMN IF EXISTS award_category_other;
