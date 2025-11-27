/*
  # Create feedback table

  1. New Tables
    - `feedback`
      - `id` (uuid, primary key) - Unique identifier for each feedback entry
      - `name` (text, not null) - Name of the person providing feedback
      - `email` (text, not null) - Email address of the person
      - `rating` (integer, not null) - Rating from 1 to 5
      - `message` (text, not null) - Feedback message content
      - `created_at` (timestamptz) - Timestamp when feedback was submitted
      
  2. Security
    - Enable RLS on `feedback` table
    - Add policy for anyone to insert feedback (public submission)
    - Add policy for authenticated users to read all feedback
*/

CREATE TABLE IF NOT EXISTS feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit feedback"
  ON feedback
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read feedback"
  ON feedback
  FOR SELECT
  TO authenticated
  USING (true);