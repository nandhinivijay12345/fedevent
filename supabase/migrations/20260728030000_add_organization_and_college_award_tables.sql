-- Awardee Registration gains two more tracks alongside Individual and School:
-- Organization Award and College/University Award. Both mirror the shape of
-- public.confirmations (the School Award track), relabeled for their entity type.

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
CREATE POLICY "anyone can submit organization award registration" ON public.organization_award_registrations FOR INSERT TO anon, authenticated WITH CHECK (true);

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
CREATE POLICY "anyone can submit college award registration" ON public.college_award_registrations FOR INSERT TO anon, authenticated WITH CHECK (true);
