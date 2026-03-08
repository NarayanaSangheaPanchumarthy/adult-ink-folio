
-- Add verification columns to profiles
ALTER TABLE public.profiles 
  ADD COLUMN IF NOT EXISTS date_of_birth date,
  ADD COLUMN IF NOT EXISTS id_verified boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS id_document_url text,
  ADD COLUMN IF NOT EXISTS verification_status text NOT NULL DEFAULT 'unverified';

-- Create storage bucket for ID documents
INSERT INTO storage.buckets (id, name, public)
VALUES ('id-documents', 'id-documents', false)
ON CONFLICT (id) DO NOTHING;

-- RLS: Users can upload their own ID documents
CREATE POLICY "Users can upload own ID docs"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'id-documents' AND (storage.foldername(name))[1] = auth.uid()::text);

-- RLS: Users can view their own ID documents
CREATE POLICY "Users can view own ID docs"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'id-documents' AND (storage.foldername(name))[1] = auth.uid()::text);

-- RLS: Users can delete their own ID documents
CREATE POLICY "Users can delete own ID docs"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'id-documents' AND (storage.foldername(name))[1] = auth.uid()::text);
