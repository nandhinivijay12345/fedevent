-- Award category updates: website field added to the School / Organization /
-- College tracks, "Standout Achievement" dropped from Individual, and pass
-- limits tightened per track (Individual guests 0-2, School/College students
-- 0-30, Organization team 0-5).

ALTER TABLE public.confirmations ADD COLUMN IF NOT EXISTS website TEXT;
ALTER TABLE public.organization_award_registrations ADD COLUMN IF NOT EXISTS website TEXT;
ALTER TABLE public.college_award_registrations ADD COLUMN IF NOT EXISTS website TEXT;

ALTER TABLE public.individual_award_registrations DROP COLUMN IF EXISTS standout_achievement;

ALTER TABLE public.confirmations DROP CONSTRAINT IF EXISTS confirmations_student_passes_check;
ALTER TABLE public.confirmations ADD CONSTRAINT confirmations_student_passes_check CHECK (student_passes BETWEEN 0 AND 30);

ALTER TABLE public.college_award_registrations DROP CONSTRAINT IF EXISTS college_award_registrations_student_passes_check;
ALTER TABLE public.college_award_registrations ADD CONSTRAINT college_award_registrations_student_passes_check CHECK (student_passes BETWEEN 0 AND 30);

ALTER TABLE public.organization_award_registrations DROP CONSTRAINT IF EXISTS organization_award_registrations_team_passes_check;
ALTER TABLE public.organization_award_registrations ADD CONSTRAINT organization_award_registrations_team_passes_check CHECK (team_passes BETWEEN 0 AND 5);

ALTER TABLE public.individual_award_registrations DROP CONSTRAINT IF EXISTS individual_award_registrations_guest_passes_check;
ALTER TABLE public.individual_award_registrations ADD CONSTRAINT individual_award_registrations_guest_passes_check CHECK (guest_passes BETWEEN 0 AND 2);
