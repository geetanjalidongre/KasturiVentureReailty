/*
  # Simplify feedback RLS policies for public access

  1. Changes
    - Drop all existing INSERT policies on feedback table
    - Create a single comprehensive policy that allows anyone to submit feedback
    - Use 'authenticated, anon' roles explicitly

  2. Security
    - Allow both authenticated and anonymous users to submit feedback
    - Maintain existing read/delete policies for authenticated users
*/

DROP POLICY IF EXISTS "Public can submit feedback" ON feedback;
DROP POLICY IF EXISTS "Anon can submit feedback" ON feedback;
DROP POLICY IF EXISTS "Anyone can submit feedback" ON feedback;

CREATE POLICY "Allow public feedback submission"
  ON feedback
  FOR INSERT
  TO authenticated, anon
  WITH CHECK (true);