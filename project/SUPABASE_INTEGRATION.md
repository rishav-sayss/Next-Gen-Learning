# Supabase Data Integration Guide

## Overview
This dashboard uses **Supabase PostgreSQL** as the primary data store for course information. All data is fetched in real-time with live subscriptions for automatic updates.

## Database Schema

### Courses Table
Located in the `public` schema with Row Level Security (RLS) enabled.

```sql
CREATE TABLE courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  progress integer NOT NULL CHECK (progress >= 0 AND progress <= 100),
  icon_name text NOT NULL,
  created_at timestamptz DEFAULT now()
);
```

**Columns:**
- `id` (uuid): Unique identifier for each course
- `title` (text): Course name (e.g., "Advanced React Patterns")
- `progress` (integer): Learning progress as percentage (0-100)
- `icon_name` (text): Lucide icon name to render (e.g., "Code", "Zap")
- `created_at` (timestamptz): Timestamp of course creation

**Current Data (4 courses):**
| Title | Progress | Icon |
|-------|----------|------|
| Advanced React Patterns | 75% | Code |
| TypeScript Mastery | 58% | FileCode |
| Web Performance Optimization | 92% | Zap |
| CSS Grid & Flexbox | 45% | Layout |

## Data Integration Architecture

### Client Setup
The Supabase client is configured in `src/lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);
```

### Data Fetching Hook
`src/hooks/useCourses.ts` handles all course data operations:

```typescript
export const useCourses = () => {
  // Fetches courses from Supabase
  const { courses, loading, error, refetch } = useCourses();
  
  // Features:
  // - Initial data fetch on mount
  // - Real-time subscriptions to course changes
  // - Error handling and loading states
  // - Manual refetch capability
}
```

**Features:**
- **Initial Fetch**: Retrieves all courses from database on component mount
- **Real-time Subscriptions**: Automatically refetches when any course data changes
- **Error Handling**: Graceful error messages if database fetch fails
- **Loading States**: Shows skeleton loaders during data fetch
- **Manual Refresh**: Users can click "Refresh" button to manually sync

### Component Integration
The `Dashboard` component uses the `useCourses` hook to:

1. Display loading skeletons while fetching data
2. Render `CourseCard` components for each course
3. Show error state if fetch fails
4. Display data source indicator ("Data synced from Supabase")
5. Provide manual refresh button with loading spinner

## Real-time Updates

The dashboard subscribes to PostgreSQL changes via Supabase:

```typescript
supabase
  .channel('courses')
  .on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'courses' },
    () => {
      // Automatically refetch when courses table changes
      fetchCourses();
    }
  )
  .subscribe();
```

This means if data is updated in Supabase (via another session or admin panel), the dashboard will automatically refresh without user action.

## Environment Configuration

### Required Variables
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

These are:
- Publicly safe (ANON_KEY only allows read access via RLS)
- Loaded from `.env` file (never committed)
- Used by Supabase client to authenticate requests

### Security
- **Row Level Security (RLS)**: Enabled on courses table
- **Public Read Policy**: `SELECT` allowed for all users (courses are public data)
- **Anonymous Access**: Safe via ANON_KEY with restricted permissions

## Data Flow Diagram

```
User Browser
    ↓
React Component (useCourses hook)
    ↓
Supabase Client (@supabase/supabase-js)
    ↓
Supabase REST API
    ↓
PostgreSQL Database (courses table)
    ↓
Real-time Subscription Channel
    ↓
Automatic Refetch on Data Changes
```

## Type Safety

Fully typed with TypeScript:

```typescript
type Course = {
  id: string;
  title: string;
  progress: number;
  icon_name: string;
  created_at: string;
};
```

All Supabase queries return typed data for better IDE support and compile-time safety.

## Performance Optimizations

1. **Caching**: React state caches courses to avoid redundant renders
2. **Subscriptions**: Real-time updates without polling
3. **Lazy Loading**: Skeleton loaders show while data fetches
4. **Error Recovery**: Retry button allows manual recovery from failed requests
5. **Single Source of Truth**: All data flows from one Supabase table

## Adding New Courses

To add a new course to the database:

```sql
INSERT INTO courses (title, progress, icon_name)
VALUES ('New Course Name', 0, 'ValidLucideIconName');
```

The dashboard will automatically display it thanks to real-time subscriptions.

## Troubleshooting

### Data Not Loading
1. Check `.env` file has valid `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
2. Verify Supabase project is active and accessible
3. Check browser console for network errors
4. Click "Refresh" button to manually retry

### Real-time Updates Not Working
1. Verify PostgreSQL-to-Realtime bridge is enabled in Supabase dashboard
2. Check that the subscription channel name matches the table name
3. Ensure RLS policy allows read access

### Type Errors
1. Regenerate types if database schema changes
2. Ensure `Course` type matches actual database columns
3. Check Supabase client initialization

## Future Enhancements

- [ ] Add authentication to track user progress per-user
- [ ] Implement write permissions for progress updates
- [ ] Add filtering/search for courses
- [ ] Implement pagination for large course lists
- [ ] Add course categories/tags
- [ ] Track course completion history
- [ ] Add course ratings/reviews

## References

- [Supabase JavaScript Client Docs](https://supabase.com/docs/reference/javascript/introduction)
- [Supabase Real-time Subscriptions](https://supabase.com/docs/guides/realtime)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
