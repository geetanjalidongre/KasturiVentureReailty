/*
  # Create Inquiries Management System

  1. New Tables
    - `inquiries`
      - `id` (uuid, primary key)
      - `first_name` (text)
      - `last_name` (text)
      - `email` (text)
      - `phone` (text)
      - `property_id` (uuid, foreign key)
      - `inquiry_type` (text)
      - `budget_min` (bigint)
      - `budget_max` (bigint)
      - `message` (text)
      - `preferred_contact` (text)
      - `visit_date` (date)
      - `status` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `inquiries` table
    - Add policy for authenticated admin access
    - Add policy for public insert (form submissions)
*/

CREATE TABLE IF NOT EXISTS inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  property_id uuid REFERENCES properties(id) ON DELETE SET NULL,
  inquiry_type text NOT NULL CHECK (inquiry_type IN ('buying', 'selling', 'renting', 'investment', 'general')),
  budget_min bigint,
  budget_max bigint,
  message text,
  preferred_contact text DEFAULT 'email' CHECK (preferred_contact IN ('email', 'phone', 'whatsapp')),
  visit_date date,
  status text DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'scheduled', 'completed', 'closed')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit inquiries"
  ON inquiries
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can view inquiries"
  ON inquiries
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Only authenticated users can update inquiries"
  ON inquiries
  FOR UPDATE
  TO authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries(created_at);
CREATE INDEX IF NOT EXISTS idx_inquiries_property_id ON inquiries(property_id);
CREATE INDEX IF NOT EXISTS idx_inquiries_email ON inquiries(email);