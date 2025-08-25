-- Fix website_content table schema mismatch
-- Run this in your Supabase SQL Editor

-- 1. Drop the old website_content table
DROP TABLE IF EXISTS website_content;

-- 2. Create the new website_content table with correct schema
CREATE TABLE IF NOT EXISTS website_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  section_name VARCHAR(100) UNIQUE NOT NULL,
  content JSONB NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Insert default website content with new schema
INSERT INTO website_content (section_name, content) VALUES
  ('hero_title', '{"main": "Learn to Drive with", "highlight": "Confidence"}'),
  ('hero_description', '"Professional driving instruction with experienced instructors. Get your license faster with our proven teaching methods."'),
  ('company_name', '"Rawaa''s Driving School"'),
  ('company_domain', '"www.rawaadrivingschool.com"')
ON CONFLICT DO NOTHING;

-- 4. Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- 5. Apply trigger to website_content table
CREATE TRIGGER update_website_content_updated_at 
  BEFORE UPDATE ON website_content 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 6. Enable Row Level Security
ALTER TABLE website_content ENABLE ROW LEVEL SECURITY;

-- 7. Create policies for public read access
CREATE POLICY "Allow public read access to website content" 
  ON website_content FOR SELECT USING (true);

-- 8. Create policies for admin write access
CREATE POLICY "Allow admin write access to website content" 
  ON website_content FOR ALL USING (true);

-- 9. Create index for better performance
CREATE INDEX IF NOT EXISTS idx_website_content_section_name ON website_content(section_name);

-- 10. Print success message
SELECT 'Website content table schema fixed successfully!' as status;
