# Navigation & Page Routing Guide

## Overview
The dashboard now features a fully functional multi-page navigation system with client-side routing, allowing users to explore different sections of the learning platform.

## Available Pages

### 1. Dashboard (Home)
**Route:** `/` (default)
**Icon:** Home

The main landing page featuring:
- Welcome/Hero tile with personalized greeting
- Quick course overview cards showing progress
- Weekly activity chart
- Data sync status indicator
- Manual refresh functionality

**Key Features:**
- Staggered animations on page load
- Real-time data from Supabase
- Loading skeletons during data fetch
- Error recovery with retry button

### 2. Courses
**Route:** `courses`
**Icon:** BookOpen

A comprehensive course management page with:

**Left Panel:**
- List of all available courses
- Course selection with hover effects
- Progress indicators and status badges
- Clickable course items

**Right Panel (Course Details):**
- Detailed course information
- Large progress bar with animation
- Course statistics (progress %, status)
- Course sections list (4 mock sections)
- "Continue Learning" call-to-action button

**Interactions:**
- Click any course in the left list to view details
- Animated transition between course selections
- Status badges show completion level (Just started, In progress, Almost done, Completed)

### 3. Analytics
**Route:** `analytics`
**Icon:** BarChart3

A detailed analytics dashboard showing learning statistics:

**Key Statistics Cards:**
- **Total Courses**: Number of active courses
- **Completed**: Number of finished courses
- **Avg. Progress**: Average progress percentage across all courses
- **Total Hours**: Cumulative learning hours
- **Streak**: Current learning streak (days)
- **This Week**: Hours spent learning this week

**Visualizations:**

1. **Progress Distribution**
   - Shows breakdown of courses by progress ranges
   - 0-25%, 26-50%, 51-75%, 76-100%
   - Animated bar charts with counts

2. **Weekly Activity Chart**
   - 7-day view of learning hours
   - Day-by-day breakdown (Mon-Sun)
   - Animated bar heights based on hours
   - Shows total hours per day

**Data Integration:**
- All statistics calculated from Supabase courses data
- Real-time updates when course data changes
- Dynamic calculations based on current courses

### 4. Settings
**Route:** `settings`
**Icon:** Settings

Placeholder page for future settings functionality.

## Navigation System Architecture

### Routing Implementation
The routing is handled entirely client-side using React state:

```typescript
type Page = 'dashboard' | 'courses' | 'analytics' | 'settings';

// In App.tsx
const [currentPage, setCurrentPage] = useState<Page>('dashboard');
```

### Component Hierarchy
```
App.tsx (routes & state)
├── Sidebar (navigation, page switching)
└── Main Content (dynamic page rendering)
    ├── Dashboard
    ├── CoursesPage
    ├── AnalyticsPage
    └── Settings
```

### Navigation Flow
1. User clicks navigation item in Sidebar
2. Sidebar calls `onNavigate` callback with page name
3. App.tsx updates `currentPage` state
4. Main content re-renders with fade transition
5. New page animations trigger automatically

## Sidebar Navigation

### Navigation Items
```
Dashboard  (Home icon)
Courses    (BookOpen icon)
Analytics  (BarChart3 icon)
Settings   (Settings icon)
```

### Sidebar Features
- **Active Item Highlighting**: Current page is highlighted with blue gradient background
- **Collapse Animation**: Sidebar toggles between expanded (256px) and collapsed (80px) on mobile
- **Layout Animation**: Active indicator snaps into place with spring physics
- **Text Fade**: Labels fade in/out when sidebar collapses
- **Logout Button**: Bottom navigation item

### Responsive Behavior
- **Desktop (>1024px)**: Sidebar always visible, full width with labels
- **Tablet (768px-1024px)**: Sidebar collapses to icons, can be toggled
- **Mobile (<768px)**: Hamburger menu, sidebar collapses completely

## Page Transitions

### Animation Details
- **Duration**: 300ms fade transition between pages
- **Easing**: Smooth ease-in-out
- **No Layout Shifts**: Using transform and opacity only

```typescript
<motion.div
  key={currentPage}
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.3 }}
>
  {renderPage()}
</motion.div>
```

## Data Flow Between Pages

### Supabase Integration
All pages use the same `useCourses` hook for consistent data:

```
Supabase Database
       ↓
useCourses Hook (fetch + subscribe)
       ↓
Dashboard, CoursesPage, AnalyticsPage
```

### Real-time Updates
- When courses data changes in Supabase, all pages automatically refresh
- No manual refresh needed (but manual refresh button available on each page)
- Subscriptions persist across page navigations

## User Interactions

### On Dashboard
1. Click "Courses" in sidebar → Navigate to Courses page
2. Click "Analytics" in sidebar → Navigate to Analytics page
3. Click "Refresh" button → Re-fetch data from Supabase

### On Courses Page
1. Click course in left list → View course details on right
2. Click "Continue Learning" → Would open course player (future feature)
3. Click "Refresh" → Re-fetch latest course data

### On Analytics Page
1. View real-time statistics and charts
2. All data updates automatically when Supabase changes

## Technical Implementation

### New Components
- **CoursesPage.tsx**: Course browsing and detail view
- **AnalyticsPage.tsx**: Learning statistics and visualizations

### Modified Components
- **App.tsx**: Added routing logic and state management
- **Sidebar.tsx**: Added navigation callbacks and active page tracking
- **Dashboard.tsx**: Removed Sidebar, now content-only

### State Management
All state is managed in App.tsx:
- `currentPage`: Tracks which page user is viewing
- `sidebarCollapsed`: Tracks sidebar collapse state
- Page state passed to Sidebar for active item highlighting

## Browser Navigation

Currently supports:
- Internal navigation via sidebar clicks
- Page refresh maintains Dashboard (default)
- Future: Can be enhanced with browser history API

## Accessibility

- Semantic HTML structure maintained
- ARIA labels on interactive elements
- Keyboard navigation support in sidebar
- Clear visual feedback for active states

## Performance Considerations

1. **Code Splitting**: All pages render in single bundle (consider lazy loading for large apps)
2. **State Persistence**: Page state resets on navigation (can be enhanced)
3. **Real-time**: Supabase subscriptions persist across pages
4. **Animations**: Using GPU-accelerated transforms only

## Future Enhancements

- [ ] Add browser history/URL routing (React Router)
- [ ] Persist page state when navigating back
- [ ] Add breadcrumb navigation
- [ ] Create nested routes for course detail pages
- [ ] Add page transitions with different animations
- [ ] Add deep linking to specific courses
- [ ] Implement page loading skeletons during navigation
- [ ] Add footer with additional navigation options

## Troubleshooting

### Page Not Updating
1. Check browser console for errors
2. Verify Supabase data is accessible
3. Try clicking Refresh button on any page

### Navigation Not Working
1. Check Sidebar component is rendering
2. Verify `onNavigate` callback is passed correctly
3. Ensure App.tsx state management is working

### Animations Not Smooth
1. Check GPU acceleration is enabled
2. Reduce animation complexity if needed
3. Monitor browser performance in DevTools

## Code Examples

### Navigating Programmatically
```typescript
// In Sidebar
onNavigate?.('courses'); // Switch to Courses page
onNavigate?.('analytics'); // Switch to Analytics page
```

### Adding a New Page
```typescript
// 1. Create new component (e.g., CoursePage.tsx)
export const CoursePage = () => { /* ... */ };

// 2. Add to routing in App.tsx
case 'course':
  return <CoursePage />;

// 3. Update Page type
type Page = 'dashboard' | 'courses' | 'analytics' | 'course' | 'settings';

// 4. Add navigation item to Sidebar navItems
```

## References

- [React State Management](https://react.dev/learn/managing-state)
- [Framer Motion Page Transitions](https://www.framer.com/motion/)
- [Supabase Real-time Docs](https://supabase.com/docs/guides/realtime)
