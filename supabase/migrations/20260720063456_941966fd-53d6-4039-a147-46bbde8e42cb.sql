
CREATE TABLE public.confirmations (
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

CREATE TABLE public.nominations (
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
