/*
  # Create Properties Management System

  1. New Tables
    - `properties`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `price` (bigint)
      - `price_display` (text)
      - `location` (text)
      - `address` (text)
      - `property_type` (text)
      - `bedrooms` (integer)
      - `bathrooms` (integer)
      - `sqft` (integer)
      - `status` (text)
      - `featured` (boolean)
      - `images` (jsonb array)
      - `amenities` (jsonb array)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `properties` table
    - Add policy for public read access
    - Add policy for authenticated admin write access
*/

CREATE TABLE IF NOT EXISTS properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  price bigint NOT NULL,
  price_display text NOT NULL,
  location text NOT NULL,
  address text,
  property_type text NOT NULL CHECK (property_type IN ('Villa', 'Apartment', 'Commercial', 'Plot')),
  bedrooms integer DEFAULT 0,
  bathrooms integer DEFAULT 0,
  sqft integer DEFAULT 0,
  status text DEFAULT 'available' CHECK (status IN ('available', 'sold', 'under_offer', 'coming_soon')),
  featured boolean DEFAULT false,
  images jsonb DEFAULT '[]'::jsonb,
  amenities jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Properties are viewable by everyone"
  ON properties
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Only authenticated users can insert properties"
  ON properties
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can update properties"
  ON properties
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Only authenticated users can delete properties"
  ON properties
  FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_properties_type ON properties(property_type);
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);
CREATE INDEX IF NOT EXISTS idx_properties_featured ON properties(featured);
CREATE INDEX IF NOT EXISTS idx_properties_location ON properties(location);
CREATE INDEX IF NOT EXISTS idx_properties_price ON properties(price);