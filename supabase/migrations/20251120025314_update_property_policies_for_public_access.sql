/*
  # Update Property Policies for Public Access
  
  1. Changes
    - Drop existing restrictive policies
    - Create new policies allowing public insert and delete operations
    - Maintain read access for everyone
    
  2. Security
    - Allow anyone to add properties (for client listing)
    - Allow anyone to delete properties (for client management)
    - Keep public read access
    
  3. Notes
    - This allows clients to directly manage their property listings
    - No authentication required for basic CRUD operations
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Only authenticated users can insert properties" ON properties;
DROP POLICY IF EXISTS "Only authenticated users can update properties" ON properties;
DROP POLICY IF EXISTS "Only authenticated users can delete properties" ON properties;

-- Create new public access policies
CREATE POLICY "Anyone can insert properties"
  ON properties
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can update properties"
  ON properties
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete properties"
  ON properties
  FOR DELETE
  TO public
  USING (true);
