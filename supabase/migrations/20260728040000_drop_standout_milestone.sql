-- "Standout Milestone" field removed from School/Organization/College award forms.

ALTER TABLE public.confirmations DROP COLUMN IF EXISTS standout_milestone;
ALTER TABLE public.organization_award_registrations DROP COLUMN IF EXISTS standout_milestone;
ALTER TABLE public.college_award_registrations DROP COLUMN IF EXISTS standout_milestone;
