/*
  # Make email field optional in feedback table

  1. Changes
    - Modify `feedback.email` column to allow NULL values
    - This allows users to submit feedback without providing an email address

  2. Security
    - No changes to RLS policies
    - Existing policies remain intact
*/

DO $$ 
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'feedback' 
    AND column_name = 'email'
    AND is_nullable = 'NO'
  ) THEN
    ALTER TABLE feedback ALTER COLUMN email DROP NOT NULL;
  END IF;
END $$;