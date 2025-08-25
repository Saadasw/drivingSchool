-- Database setup for Rawaa's Driving School website
-- Run this in your Supabase SQL editor

-- 1. Contact Information Table
CREATE TABLE IF NOT EXISTS contact_information (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  phone VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL,
  address TEXT NOT NULL,
  hours TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Website Content Table (for dynamic content)
CREATE TABLE IF NOT EXISTS website_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  section_name VARCHAR(100) UNIQUE NOT NULL,
  content JSONB NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Visibility Settings Table
CREATE TABLE IF NOT EXISTS visibility_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  setting_name VARCHAR(100) UNIQUE NOT NULL,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Insert default contact information
INSERT INTO contact_information (phone, email, address, hours) 
VALUES (
  '0481 322 734',
  'info@rawaadrivingschool.com',
  '123 George Street\nSydney, NSW 2000',
  'Mon-Fri: 8AM-6PM\nSat: 9AM-4PM'
) ON CONFLICT DO NOTHING;

-- 5. Insert default visibility settings
INSERT INTO visibility_settings (setting_name, is_visible) VALUES
  ('showContactForm', true),
  ('showPhone', true),
  ('showEmail', true),
  ('showAddress', true),
  ('showHours', true),
  ('showFooterPhone', true),
  ('showFooterEmail', true),
  ('showFooterAddress', true)
ON CONFLICT DO NOTHING;

-- 6. Insert default website content
INSERT INTO website_content (section_name, content) VALUES
  ('hero_title', '{"main": "Learn to Drive with", "highlight": "Confidence"}'),
  ('hero_description', 'Professional driving instruction with experienced instructors. Get your license faster with our proven teaching methods.'),
  ('company_name', 'Rawaa''s Driving School'),
  ('company_domain', 'www.rawaadrivingschool.com')
ON CONFLICT DO NOTHING;

-- 7. Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- 8. Apply triggers to all tables
CREATE TRIGGER update_contact_information_updated_at 
  BEFORE UPDATE ON contact_information 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_website_content_updated_at 
  BEFORE UPDATE ON website_content 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_visibility_settings_updated_at 
  BEFORE UPDATE ON visibility_settings 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 9. Enable Row Level Security (RLS)
ALTER TABLE contact_information ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE visibility_settings ENABLE ROW LEVEL SECURITY;

-- 10. Create policies for public read access
CREATE POLICY "Allow public read access to contact information" 
  ON contact_information FOR SELECT USING (true);

CREATE POLICY "Allow public read access to website content" 
  ON website_content FOR SELECT USING (true);

CREATE POLICY "Allow public read access to visibility settings" 
  ON visibility_settings FOR SELECT USING (true);

-- 11. Create policies for admin write access (you'll need to implement authentication)
CREATE POLICY "Allow admin write access to contact information" 
  ON contact_information FOR ALL USING (true);

CREATE POLICY "Allow admin write access to website content" 
  ON website_content FOR ALL USING (true);

CREATE POLICY "Allow admin write access to visibility settings" 
  ON visibility_settings FOR ALL USING (true);

-- 12. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_contact_information_updated_at ON contact_information(updated_at);
CREATE INDEX IF NOT EXISTS idx_website_content_section_name ON website_content(section_name);
CREATE INDEX IF NOT EXISTS idx_visibility_settings_setting_name ON visibility_settings(setting_name);
