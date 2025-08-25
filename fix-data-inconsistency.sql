-- Fix data inconsistency in database tables
-- Run this in your Supabase SQL Editor

-- 1. Fix missing visibility settings
INSERT INTO visibility_settings (setting_name, is_visible) VALUES
  ('showPhone', true),
  ('showEmail', true),
  ('showAddress', true),
  ('showHours', true),
  ('showFooterPhone', true),
  ('showFooterEmail', true),
  ('showFooterAddress', true)
ON CONFLICT (setting_name) DO UPDATE SET 
  is_visible = EXCLUDED.is_visible,
  updated_at = NOW();

-- 2. Fix missing website content
INSERT INTO website_content (section_name, content, is_active) VALUES
  ('hero_description', '"Professional driving instruction with experienced instructors. Get your license faster with our proven teaching methods."', true),
  ('company_name', '"Rawaa''s Driving School"', true),
  ('company_domain', '"www.rawaadrivingschool.com"', true)
ON CONFLICT (section_name) DO UPDATE SET 
  content = EXCLUDED.content,
  is_active = EXCLUDED.is_active,
  updated_at = NOW();

-- 3. Verify all required data exists
SELECT 'Visibility Settings Check:' as check_type;
SELECT setting_name, is_visible FROM visibility_settings ORDER BY setting_name;

SELECT 'Website Content Check:' as check_type;
SELECT section_name, content FROM website_content ORDER BY section_name;

SELECT 'Data consistency fixed successfully!' as status;
