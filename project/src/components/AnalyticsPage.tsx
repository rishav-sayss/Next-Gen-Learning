import { motion } from 'framer-motion';
import {
  TrendingUp,
  Clock,
  Zap,
  Award,
  LineChart as LineChartIcon,
  Calendar,
  Flame,
} from 'lucide-react';
import { useCourses, useWeeklyActivity, useUserStreak } from '../hooks/useDashboardData';

export const AnalyticsPage = () => {
  const { courses, loading: coursesLoading } = useCourses();
  const { activity, loading: activityLoading } = useWeeklyActivity();
  const { streak, loading: streakLoading } = useUserStreak();

  const isLoading = coursesLoading || activityLoading || streakLoading;

  const completedCourses = courses.filter((c) => c.progress === 100).length;
  const averageProgress =
    courses.length > 0
      ? Math.round(courses.reduce((sum, c) => sum + c.progress, 0) / courses.length)
      : 0;
  const totalHours = activity.reduce((sum, a) => sum + a.hours, 0);
  const streakDays = streak?.days ?? 0;

  const progressDistribution = [
    { range: '0-25%', count: courses.filter((c) => c.progress <= 25).length, color: 'from-red-500 to-orange-400' },
    { range: '26-50%', count: courses.filter((c) => c.progress > 25 && c.progress <= 50).length, color: 'from-yellow-500 to-amber-400' },
    { range: '51-75%', count: courses.filter((c) => c.progress > 50 && c.progress <= 75).length, color: 'from-blue-500 to-cyan-400' },
    { range: '76-100%', count: courses.filter((c) => c.progress > 75).length, color: 'from-green-500 to-emerald-400' },
  ];

  const maxHours = activity.length > 0 ? Math.max(...activity.map((a) => a.hours)) : 1;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const StatCard = ({
    title,
    value,
    subtitle,
    icon: Icon,
    gradient,
    loading,
  }: {
    title: string;
    value: string | number;
    subtitle: string;
    icon: React.ElementType;
    gradient: string;
    loading: boolean;
  }) => (
    <motion.div
      className={`p-6 bg-gradient-to-br ${gradient} to-gray-900 rounded-lg border border-gray-700 hover:border-blue-500/50 transition-colors`}
      variants={itemVariants}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-400 font-medium">{title}</h3>
        <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
          <Icon className="w-5 h-5 text-gray-300" />
        </div>
      </div>
      {loading ? (
        <motion.div
          className="h-10 w-24 bg-gray-700 rounded"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      ) : (
        <>
          <p className="text-4xl font-bold text-white">{value}</p>
          <p className="text-sm text-gray-500 mt-2">{subtitle}</p>
        </>
      )}
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-950 p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <LineChartIcon className="w-8 h-8 text-blue-400" />
            <h1 className="text-4xl font-bold text-white">Analytics</h1>
          </div>
          <p className="text-gray-400">Track your learning progress and insights</p>
        </motion.div>

        {/* Key Stats Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <StatCard
            title="Total Courses"
            value={courses.length}
            subtitle="Active courses"
            icon={Award}
            gradient="from-blue-900/40"
            loading={coursesLoading}
          />
          <StatCard
            title="Completed"
            value={completedCourses}
            subtitle="Courses finished"
            icon={TrendingUp}
            gradient="from-green-900/40"
            loading={coursesLoading}
          />
          <StatCard
            title="Avg. Progress"
            value={`${averageProgress}%`}
            subtitle="Overall completion"
            icon={Zap}
            gradient="from-cyan-900/40"
            loading={coursesLoading}
          />
          <StatCard
            title="Total Hours"
            value={totalHours}
            subtitle="Time invested"
            icon={Clock}
            gradient="from-purple-900/40"
            loading={activityLoading}
          />
          <StatCard
            title="Streak"
            value={streakDays}
            subtitle="Days in a row"
            icon={Flame}
            gradient="from-orange-900/40"
            loading={streakLoading}
          />
          <StatCard
            title="This Week"
            value={`${totalHours}h`}
            subtitle="Learning hours"
            icon={Calendar}
            gradient="from-teal-900/40"
            loading={activityLoading}
          />
        </motion.div>

        {/* Progress Distribution */}
        <motion.div
          className="p-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6">Progress Distribution</h2>

          {coursesLoading ? (
            <div className="space-y-6">
              {[0, 1, 2, 3].map((idx) => (
                <motion.div
                  key={idx}
                  className="h-12 bg-gray-700 rounded-lg"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: idx * 0.1 }}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {progressDistribution.map((item, idx) => (
                <motion.div
                  key={item.range}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-300 font-medium">{item.range}</span>
                    <span className="text-gray-400 text-sm">
                      {item.count} course{item.count !== 1 ? 's' : ''}
                    </span>
                  </div>

                  <div className="w-full h-8 bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${item.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${courses.length > 0 ? (item.count / courses.length) * 100 : 0}%` }}
                      transition={{ delay: 0.6 + idx * 0.1, duration: 0.8 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Weekly Activity Chart from Supabase */}
        <motion.div
          className="mt-8 p-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6">Weekly Insights</h2>

          {activityLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-7 gap-2">
              {[0, 1, 2, 3, 4, 5, 6].map((idx) => (
                <motion.div
                  key={idx}
                  className="h-40 bg-gray-700 rounded-lg"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: idx * 0.05 }}
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-7 gap-2">
              {activity.map((item, idx) => (
                <motion.div
                  key={item.day}
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + idx * 0.05 }}
                >
                  <div className="w-full h-32 bg-gray-900 rounded-t-lg border border-gray-700 border-b-0 flex items-end justify-center pb-2 relative">
                    <motion.div
                      className="w-3/4 bg-gradient-to-t from-blue-500 to-cyan-400 rounded-t-md"
                      initial={{ height: 0 }}
                      animate={{ height: `${(item.hours / maxHours) * 100}%` }}
                      transition={{ delay: 0.8 + idx * 0.05, duration: 0.8 }}
                    />
                  </div>

                  <div className="w-full p-2 bg-gray-800 border border-gray-700 border-t-0 rounded-b-lg text-center">
                    <span className="text-xs font-medium text-gray-400">{item.day}</span>
                  </div>

                  <p className="text-xs text-gray-500 mt-2">{item.hours}h</p>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Data Sync Info */}
        <motion.div
          className="mt-8 text-center py-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <p className="text-xs text-gray-500">
            All data fetched live from Supabase PostgreSQL
          </p>
        </motion.div>
      </div>
    </div>
  );
};
