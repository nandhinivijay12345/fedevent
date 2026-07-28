-- Attendee Registration / Individual Award track: mirrors the shape of
-- public.confirmations (the School Award track) but for individual nominees.

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
CREATE POLICY "anyone can submit individual award registration" ON public.individual_award_registrations FOR INSERT TO anon, authenticated WITH CHECK (true);
