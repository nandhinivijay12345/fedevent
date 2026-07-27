ALTER TABLE public.confirmations
  ADD COLUMN IF NOT EXISTS school_type TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS school_type_other TEXT;

ALTER TABLE public.confirmations
  ALTER COLUMN school_type DROP DEFAULT;
