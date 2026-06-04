import { useState, useEffect, useCallback } from 'react';
import { supabase, type Course, type WeeklyActivity, type UserStreak, type CourseSection } from '../lib/supabase';

export const useCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCourses = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: true });

      if (fetchError) throw fetchError;
      setCourses(data || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch courses');
      setCourses([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCourses();

    const subscription = supabase
      .channel('courses-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'courses' },
        () => { fetchCourses(); }
      )
      .subscribe();

    return () => { subscription.unsubscribe(); };
  }, [fetchCourses]);

  return { courses, loading, error, refetch: fetchCourses };
};

export const useWeeklyActivity = () => {
  const [activity, setActivity] = useState<WeeklyActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchActivity = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('weekly_activity')
        .select('*')
        .order('created_at', { ascending: true });

      if (fetchError) throw fetchError;
      setActivity(data || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch activity');
      setActivity([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchActivity();

    const subscription = supabase
      .channel('activity-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'weekly_activity' },
        () => { fetchActivity(); }
      )
      .subscribe();

    return () => { subscription.unsubscribe(); };
  }, [fetchActivity]);

  return { activity, loading, error, refetch: fetchActivity };
};

export const useUserStreak = () => {
  const [streak, setStreak] = useState<UserStreak | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStreak = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('user_streak')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (fetchError) throw fetchError;
      setStreak(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch streak');
      setStreak(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStreak();

    const subscription = supabase
      .channel('streak-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'user_streak' },
        () => { fetchStreak(); }
      )
      .subscribe();

    return () => { subscription.unsubscribe(); };
  }, [fetchStreak]);

  return { streak, loading, error, refetch: fetchStreak };
};

export const useCourseSections = (courseId: string | null) => {
  const [sections, setSections] = useState<CourseSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSections = useCallback(async () => {
    if (!courseId) {
      setSections([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('course_sections')
        .select('*')
        .eq('course_id', courseId)
        .order('section_number', { ascending: true });

      if (fetchError) throw fetchError;
      setSections(data || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch sections');
      setSections([]);
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    fetchSections();

    if (!courseId) return;

    const subscription = supabase
      .channel('sections-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'course_sections' },
        () => { fetchSections(); }
      )
      .subscribe();

    return () => { subscription.unsubscribe(); };
  }, [fetchSections, courseId]);

  return { sections, loading, error, refetch: fetchSections };
};
