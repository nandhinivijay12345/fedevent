-- Attendee registration gains an optional free-text note so visitors can
-- flag questions, accessibility needs, or anything else ahead of the event.

ALTER TABLE public.participations ADD COLUMN IF NOT EXISTS note TEXT;
