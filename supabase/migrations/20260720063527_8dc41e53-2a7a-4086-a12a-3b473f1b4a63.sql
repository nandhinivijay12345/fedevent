
CREATE POLICY "anyone can upload signature" ON storage.objects FOR INSERT TO anon, authenticated
WITH CHECK (bucket_id = 'signatures');
