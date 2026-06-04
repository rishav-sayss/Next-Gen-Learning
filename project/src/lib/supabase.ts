import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Course = {
  id: string;
  title: string;
  progress: number;
  icon_name: string;
  created_at: string;
};

export type WeeklyActivity = {
  id: string;
  day: string;
  hours: number;
  created_at: string;
};

export type UserStreak = {
  id: string;
  days: number;
  updated_at: string;
};

export type CourseSection = {
  id: string;
  course_id: string;
  section_number: number;
  title: string;
  description: string;
  completed: boolean;
  created_at: string;
};
