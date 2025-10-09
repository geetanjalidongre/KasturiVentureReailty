/*
  # Create Website Settings Management System

  1. New Tables
    - `settings`
      - `id` (uuid, primary key)
      - `key` (text, unique)
      - `value` (jsonb)
      - `description` (text)
      - `category` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `settings` table
    - Add policy for public read access to public settings
    - Add policy for authenticated admin write access
*/

CREATE TABLE IF NOT EXISTS settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value jsonb NOT NULL,
  description text,
  category text DEFAULT 'general' CHECK (category IN ('general', 'contact', 'social', 'seo', 'appearance')),
  is_public boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public settings are viewable by everyone"
  ON settings
  FOR SELECT
  TO public
  USING (is_public = true);

CREATE POLICY "Only authenticated users can manage settings"
  ON settings
  FOR ALL
  TO authenticated
  USING (true);

-- Insert default settings
INSERT INTO settings (key, value, description, category, is_public) VALUES
('company_name', '"Kasturi Reality Venture"', 'Company name', 'general', true),
('company_tagline', '"Your Dream Property Awaits"', 'Company tagline', 'general', true),
('contact_phone', '"9876543210"', 'Primary contact phone', 'contact', true),
('contact_email', '"Kasturiventures99@gmail.com"', 'Primary contact email', 'contact', true),
('contact_person', '"Manoj Shrivastav"', 'Primary contact person', 'contact', true),
('office_address', '"Vatsalya flat no. B-103, Sector no. 8, Charkop, Kandivali West, Mumbai 400067"', 'Office address', 'contact', true),
('office_hours', '{"monday_friday": "9:00 AM - 7:00 PM", "saturday": "10:00 AM - 5:00 PM", "sunday": "By Appointment"}', 'Office hours', 'contact', true),
('social_whatsapp', '"9876543210"', 'WhatsApp number', 'social', true),
('years_experience', '5', 'Years of experience', 'general', true),
('properties_sold', '500', 'Number of properties sold', 'general', true),
('client_satisfaction', '100', 'Client satisfaction percentage', 'general', true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_settings_key ON settings(key);
CREATE INDEX IF NOT EXISTS idx_settings_category ON settings(category);
CREATE INDEX IF NOT EXISTS idx_settings_public ON settings(is_public);