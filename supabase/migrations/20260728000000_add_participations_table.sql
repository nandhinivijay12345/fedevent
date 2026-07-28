-- Participation Registration: lightweight signup for visitors attending FED 2026
-- who are not part of the school/individual award flows.

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
CREATE POLICY "anyone can submit participation" ON public.participations FOR INSERT TO anon, authenticated WITH CHECK (true);
