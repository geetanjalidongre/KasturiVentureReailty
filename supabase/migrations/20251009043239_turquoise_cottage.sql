/*
  # Create Email Enquiries Management System

  1. New Tables
    - `email_enquiries`
      - `id` (uuid, primary key)
      - `sender_name` (text)
      - `sender_email` (text)
      - `sender_phone` (text)
      - `subject` (text)
      - `message` (text)
      - `property_id` (uuid, foreign key)
      - `enquiry_source` (text)
      - `email_sent` (boolean)
      - `email_sent_at` (timestamp)
      - `status` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `email_enquiries` table
    - Add policy for public insert (email submissions)
    - Add policy for authenticated admin access
*/

CREATE TABLE IF NOT EXISTS email_enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_name text NOT NULL,
  sender_email text NOT NULL,
  sender_phone text,
  subject text NOT NULL,
  message text NOT NULL,
  property_id uuid REFERENCES properties(id) ON DELETE SET NULL,
  enquiry_source text DEFAULT 'website' CHECK (enquiry_source IN ('website', 'hero_section', 'contact_form', 'property_page', 'whatsapp')),
  email_sent boolean DEFAULT false,
  email_sent_at timestamptz,
  status text DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'closed')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE email_enquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit email enquiries"
  ON email_enquiries
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can view email enquiries"
  ON email_enquiries
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Only authenticated users can update email enquiries"
  ON email_enquiries
  FOR UPDATE
  TO authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_email_enquiries_status ON email_enquiries(status);
CREATE INDEX IF NOT EXISTS idx_email_enquiries_created_at ON email_enquiries(created_at);
CREATE INDEX IF NOT EXISTS idx_email_enquiries_sender_email ON email_enquiries(sender_email);
CREATE INDEX IF NOT EXISTS idx_email_enquiries_source ON email_enquiries(enquiry_source);
CREATE INDEX IF NOT EXISTS idx_email_enquiries_property_id ON email_enquiries(property_id);