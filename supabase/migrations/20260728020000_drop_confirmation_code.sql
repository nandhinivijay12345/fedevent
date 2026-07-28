-- Verification-by-code step was removed from all registration forms.

ALTER TABLE public.confirmations DROP COLUMN IF EXISTS confirmation_code;
ALTER TABLE public.individual_award_registrations DROP COLUMN IF EXISTS confirmation_code;
