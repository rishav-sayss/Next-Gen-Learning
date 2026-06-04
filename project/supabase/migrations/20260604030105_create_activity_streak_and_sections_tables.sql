/*
  # Create activity, streak, and course_sections tables

  1. New Tables
    - `weekly_activity`
      - `id` (uuid, primary key)
      - `day` (text) - Day of the week, e.g. "Mon"
      - `hours` (integer) - Hours spent learning that day
      - `created_at` (timestamptz)
    - `user_streak`
      - `id` (uuid, primary key)
      - `days` (integer) - Current learning streak in days
      - `updated_at` (timestamptz)
    - `course_sections`
      - `id` (uuid, primary key)
      - `course_id` (uuid, foreign key to courses.id)
      - `section_number` (integer) - Section order number
      - `title` (text) - Section title
      - `description` (text) - Section description
      - `completed` (boolean) - Whether section is completed
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add public read policy for all tables (data is viewable by all)
*/

-- Weekly activity table
CREATE TABLE IF NOT EXISTS weekly_activity (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  day text NOT NULL,
  hours integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE weekly_activity ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view weekly activity"
  ON weekly_activity FOR SELECT
  TO anon, authenticated
  USING (true);

-- User streak table
CREATE TABLE IF NOT EXISTS user_streak (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  days integer NOT NULL DEFAULT 0,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_streak ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view user streak"
  ON user_streak FOR SELECT
  TO anon, authenticated
  USING (true);

-- Course sections table
CREATE TABLE IF NOT EXISTS course_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  section_number integer NOT NULL DEFAULT 0,
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  completed boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE course_sections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view course sections"
  ON course_sections FOR SELECT
  TO anon, authenticated
  USING (true);
