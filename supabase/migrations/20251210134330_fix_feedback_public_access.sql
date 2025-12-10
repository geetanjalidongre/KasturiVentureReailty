/*
  # Fix feedback table for public access

  1. Changes
    - Drop and recreate INSERT policy with proper public access
    - Ensure anon users can submit feedback without authentication
    - Add better policy for public feedback submission

  2. Security
    - Allow anonymous (public) users to submit feedback
    - Maintain existing read/delete policies for authenticated users
*/

DROP POLICY IF EXISTS "Anyone can submit feedback" ON feedback;

CREATE POLICY "Public can submit feedback"
  ON feedback
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anon can submit feedback"
  ON feedback
  FOR INSERT
  TO anon
  WITH CHECK (true);