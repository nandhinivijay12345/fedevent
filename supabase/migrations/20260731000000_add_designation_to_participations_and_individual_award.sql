-- Designation is now collected as free text on every registration form,
-- including the two that previously didn't ask for it.

ALTER TABLE public.participations
  ADD COLUMN IF NOT EXISTS designation TEXT NOT NULL DEFAULT '';

ALTER TABLE public.participations
  ALTER COLUMN designation DROP DEFAULT;

ALTER TABLE public.individual_award_registrations
  ADD COLUMN IF NOT EXISTS designation TEXT NOT NULL DEFAULT '';

ALTER TABLE public.individual_award_registrations
  ALTER COLUMN designation DROP DEFAULT;
