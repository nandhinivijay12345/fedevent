-- Schema for the nyfadcrlpzbzvuvybbhx Supabase project.
-- Run this once in the Supabase SQL Editor (Dashboard > SQL Editor) since this
-- project isn't linked to the Supabase CLI session used to generate these files.

CREATE TABLE IF NOT EXISTS public.confirmations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  confirmation_code TEXT NOT NULL,
  school_name TEXT NOT NULL,
  your_name TEXT NOT NULL,
  designation TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  student_passes INT NOT NULL CHECK (student_passes BETWEEN 0 AND 50),
  staff_passes INT NOT NULL CHECK (staff_passes BETWEEN 0 AND 20),
  signature_url TEXT,
  authorised BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.confirmations TO anon, authenticated;
GRANT ALL ON public.confirmations TO service_role;
ALTER TABLE public.confirmations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone can submit confirmation" ON public.confirmations FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE TABLE IF NOT EXISTS public.nominations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_name TEXT NOT NULL,
  city TEXT NOT NULL,
  your_name TEXT NOT NULL,
  designation TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  reason TEXT NOT NULL CHECK (char_length(reason) <= 300),
  link TEXT,
  authorised BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.nominations TO anon, authenticated;
GRANT ALL ON public.nominations TO service_role;
ALTER TABLE public.nominations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone can submit nomination" ON public.nominations FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Storage bucket for signature uploads (public so getPublicUrl() works).
INSERT INTO storage.buckets (id, name, public)
VALUES ('signatures', 'signatures', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "anyone can upload signature" ON storage.objects FOR INSERT TO anon, authenticated
WITH CHECK (bucket_id = 'signatures');

CREATE POLICY "anyone can read signature" ON storage.objects FOR SELECT TO anon, authenticated
USING (bucket_id = 'signatures');
