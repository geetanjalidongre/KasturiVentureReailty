/*
  # Allow Public Property Inserts

  1. Changes
    - Update RLS policy to allow public (anon) users to insert properties
    - This enables adding properties without authentication

  2. Security
    - Maintains read access for everyone
    - Allows anonymous inserts for property management
*/

DROP POLICY IF EXISTS "Only authenticated users can insert properties" ON properties;

CREATE POLICY "Anyone can insert properties"
  ON properties
  FOR INSERT
  TO public
  WITH CHECK (true);
