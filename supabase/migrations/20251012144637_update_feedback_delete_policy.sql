/*
  # Update feedback table policies

  1. Security Updates
    - Add policy to allow anyone to delete feedback (for demo purposes)
    - In production, this should be restricted to admin users only
*/

CREATE POLICY "Anyone can delete feedback"
  ON feedback
  FOR DELETE
  TO anon, authenticated
  USING (true);