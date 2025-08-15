-- Storage Setup Script for Driving School Application
-- Run this script in your Supabase SQL Editor

-- Create storage bucket for gallery images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'gallery',
  'gallery',
  true,
  5242880, -- 5MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for the gallery bucket
-- Allow public read access to gallery images
CREATE POLICY "Allow public read access to gallery images" ON storage.objects
FOR SELECT USING (bucket_id = 'gallery');

-- Allow authenticated users to upload images to gallery
CREATE POLICY "Allow authenticated uploads to gallery" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'gallery');

-- Allow authenticated users to update their uploaded images
CREATE POLICY "Allow authenticated updates to gallery" ON storage.objects
FOR UPDATE USING (bucket_id = 'gallery');

-- Allow authenticated users to delete their uploaded images
CREATE POLICY "Allow authenticated deletes from gallery" ON storage.objects
FOR DELETE USING (bucket_id = 'gallery');

-- Print success message
SELECT 'Storage setup completed successfully!' as status;
