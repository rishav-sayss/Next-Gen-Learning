/*
  # Create courses table
  
  1. New Tables
    - `courses`
      - `id` (uuid, primary key)
      - `title` (text, course name)
      - `progress` (integer, progress percentage 0-100)
      - `icon_name` (text, Lucide icon name to render)
      - `created_at` (timestamp)
  
  2. Security
    - Enable RLS on `courses` table
    - Add policy for public read access (courses are public data)
  
  3. Notes
    - This table stores course data for the learning dashboard
    - Progress values should be integers from 0 to 100
    - icon_name should correspond to valid Lucide icon names
*/

CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  progress integer NOT NULL CHECK (progress >= 0 AND progress <= 100),
  icon_name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Courses are publicly readable"
  ON courses
  FOR SELECT
  TO public
  USING (true);
