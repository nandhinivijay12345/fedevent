-- "Award Category" removed from the Individual Award form — the track itself
-- (Educator Of The Year Award) is now the only category for this form.

ALTER TABLE public.individual_award_registrations DROP COLUMN IF EXISTS award_category;
ALTER TABLE public.individual_award_registrations DROP COLUMN IF EXISTS award_category_other;
