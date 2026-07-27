ALTER TABLE public.confirmations
  ADD COLUMN IF NOT EXISTS award_recipient_name TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS award_recipient_designation TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS award_recipient_phone TEXT NOT NULL DEFAULT '';

ALTER TABLE public.confirmations
  ALTER COLUMN award_recipient_name DROP DEFAULT,
  ALTER COLUMN award_recipient_designation DROP DEFAULT,
  ALTER COLUMN award_recipient_phone DROP DEFAULT;
