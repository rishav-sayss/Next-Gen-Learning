import { useState } from 'react';
import { motion } from 'framer-motion';
import { HeroTile } from './HeroTile';
import { CourseCard } from './CourseCard';
import { ActivityTile } from './ActivityTile';
import { SkeletonCard, HeroSkeletonCard } from './SkeletonCard';
import { useCourses } from '../hooks/useDashboardData';
import { AlertCircle, RefreshCw } from 'lucide-react';

export const Dashboard = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { courses, loading, error, refetch } = useCourses();

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <main className="flex-1 overflow-auto">
        <div className="lg:ml-0 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <motion.h1
              className="text-3xl font-bold text-white"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              Dashboard
            </motion.h1>
            <motion.button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 border border-gray-700 rounded-lg transition-colors duration-200 text-sm font-medium text-gray-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RefreshCw
                className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`}
              />
              Refresh
            </motion.button>
          </div>
        </div>

        <div className="lg:ml-0 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto pt-0">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {loading ? (
              <>
                <HeroSkeletonCard delay={0} />
                {[0, 1, 2].map((idx) => (
                  <SkeletonCard key={idx} delay={idx * 0.1 + 0.2} />
                ))}
                <SkeletonCard delay={0.5} />
              </>
            ) : error ? (
              <motion.div
                className="lg:col-span-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center gap-3 p-6 bg-red-500/10 border border-red-500/20 rounded-lg mb-4">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-red-300">
                      Failed to load courses from Supabase
                    </p>
                    <p className="text-xs text-red-400/70 mt-1">{error}</p>
                  </div>
                </div>
                <motion.button
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg transition-colors duration-200 text-sm font-medium text-white"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isRefreshing ? 'Retrying...' : 'Retry'}
                </motion.button>
              </motion.div>
            ) : (
              <>
                <HeroTile delay={0} />
                {courses.map((course, idx) => (
                  <CourseCard key={course.id} course={course} delay={idx * 0.1 + 0.2} />
                ))}
                <ActivityTile delay={(courses.length + 1) * 0.1 + 0.2} />
                <motion.div
                  className="lg:col-span-3 text-center py-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: (courses.length + 2) * 0.1 + 0.3 }}
                >
                  <p className="text-xs text-gray-500">
                    Data synced from Supabase PostgreSQL • {courses.length} courses loaded
                  </p>
                </motion.div>
              </>
            )}
          </motion.div>
        </div>
      </main>
  );
};
