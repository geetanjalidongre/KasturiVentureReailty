/*
  # Final fix for feedback RLS policies

  1. Changes
    - Drop ALL existing policies on feedback table
    - Create clean, simple policies for INSERT, SELECT, DELETE
    - Use clear role specifications

  2. Security
    - INSERT: Allow anon and authenticated users to submit feedback
    - SELECT: Allow authenticated users to read feedback
    - DELETE: Allow authenticated users to delete feedback
*/

DROP POLICY IF EXISTS "Allow public feedback submission" ON feedback;
DROP POLICY IF EXISTS "Public can submit feedback" ON feedback;
DROP POLICY IF EXISTS "Anon can submit feedback" ON feedback;
DROP POLICY IF EXISTS "Anyone can submit feedback" ON feedback;
DROP POLICY IF EXISTS "Authenticated users can read feedback" ON feedback;
DROP POLICY IF EXISTS "Authenticated users can delete feedback" ON feedback;

CREATE POLICY "feedback_insert_policy"
  ON feedback
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "feedback_select_policy"
  ON feedback
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "feedback_delete_policy"
  ON feedback
  FOR DELETE
  TO authenticated
  USING (true);