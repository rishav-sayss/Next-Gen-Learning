import { useState } from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { useCourses, useCourseSections } from '../hooks/useDashboardData';
import { ProgressBar } from './ProgressBar';
import { BookOpen, CheckCircle2, Circle, RefreshCw } from 'lucide-react';

export const CoursesPage = () => {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const { courses, loading, error, refetch } = useCourses();
  const { sections, loading: sectionsLoading } = useCourseSections(selectedCourse);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  const selectedCourseData = courses.find((c) => c.id === selectedCourse);

  return (
    <div className="min-h-screen bg-gray-950 p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-blue-400" />
            <h1 className="text-4xl font-bold text-white">All Courses</h1>
          </div>
          <motion.button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 border border-gray-700 rounded-lg transition-colors text-sm font-medium text-gray-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </motion.button>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Courses List */}
          <div className="lg:col-span-1">
            <motion.div
              className="space-y-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {loading ? (
                [0, 1, 2, 3].map((idx) => (
                  <motion.div
                    key={idx}
                    className="h-20 bg-gray-800 rounded-lg"
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: idx * 0.1 }}
                  />
                ))
              ) : error ? (
                <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <span className="text-sm text-red-300">Failed to load courses from Supabase</span>
                </div>
              ) : (
                courses.map((course, idx) => (
                  <motion.button
                    key={course.id}
                    onClick={() => setSelectedCourse(course.id)}
                    className={`w-full text-left p-4 rounded-lg border transition-all duration-200 group ${
                      selectedCourse === course.id
                        ? 'bg-blue-600/20 border-blue-500 shadow-lg shadow-blue-500/20'
                        : 'bg-gray-800 border-gray-700 hover:border-blue-500/50'
                    }`}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <h3 className="font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors">
                      {course.title}
                    </h3>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">{course.progress}%</span>
                      <span className="text-gray-500 text-xs">
                        {course.progress === 100
                          ? 'Completed'
                          : course.progress >= 75
                          ? 'Almost done'
                          : course.progress >= 50
                          ? 'In progress'
                          : 'Just started'}
                      </span>
                    </div>
                  </motion.button>
                ))
              )}
            </motion.div>
          </div>

          {/* Course Details */}
          <div className="lg:col-span-2">
            {loading ? (
              <div className="space-y-4">
                <div className="h-12 bg-gray-800 rounded-lg" />
                <motion.div
                  className="h-40 bg-gray-800 rounded-lg"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </div>
            ) : selectedCourseData ? (
              <motion.div
                key={selectedCourseData.id}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-gray-700 p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {/* Course Header */}
                <div className="mb-8">
                  <motion.div
                    className="inline-flex items-center gap-3 mb-4 px-4 py-2 bg-gray-900 rounded-lg border border-gray-700"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    {(() => {
                      const IconComponent = (LucideIcons as any)[selectedCourseData.icon_name];
                      const Icon = IconComponent || LucideIcons.BookOpen;
                      return <Icon className="w-6 h-6 text-cyan-400" />;
                    })()}
                    <span className="text-sm font-medium text-gray-400">
                      {selectedCourseData.icon_name}
                    </span>
                  </motion.div>

                  <h2 className="text-4xl font-bold text-white mb-4">
                    {selectedCourseData.title}
                  </h2>

                  <p className="text-gray-400 mb-6">
                    Continue your learning journey and master this course.
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <motion.div
                      className="p-4 bg-gray-900/50 rounded-lg border border-gray-700"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <p className="text-sm text-gray-500 mb-1">Progress</p>
                      <p className="text-3xl font-bold text-cyan-400">
                        {selectedCourseData.progress}%
                      </p>
                    </motion.div>

                    <motion.div
                      className="p-4 bg-gray-900/50 rounded-lg border border-gray-700"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <p className="text-sm text-gray-500 mb-1">Status</p>
                      <p className="text-lg font-semibold text-blue-400">
                        {selectedCourseData.progress === 100
                          ? 'Completed'
                          : 'In Progress'}
                      </p>
                    </motion.div>
                  </div>
                </div>

                {/* Progress Bar */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <p className="text-sm font-medium text-gray-400 mb-3">Overall Progress</p>
                  <ProgressBar progress={selectedCourseData.progress} delay={0.5} />
                </motion.div>

                {/* Course Sections from Supabase */}
                <motion.div
                  className="mt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <h3 className="text-lg font-semibold text-white mb-4">Course Sections</h3>

                  {sectionsLoading ? (
                    <div className="space-y-3">
                      {[0, 1, 2, 3].map((idx) => (
                        <motion.div
                          key={idx}
                          className="h-16 bg-gray-900/50 rounded-lg border border-gray-700"
                          animate={{ opacity: [0.3, 0.6, 0.3] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: idx * 0.1 }}
                        />
                      ))}
                    </div>
                  ) : sections.length > 0 ? (
                    <div className="space-y-3">
                      {sections.map((section, idx) => (
                        <motion.div
                          key={section.id}
                          className="flex items-center gap-4 p-4 bg-gray-900/50 rounded-lg border border-gray-700 hover:border-blue-500/50 transition-colors cursor-pointer group"
                          whileHover={{ x: 4 }}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + idx * 0.05 }}
                        >
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-sm ${
                            section.completed
                              ? 'bg-gradient-to-br from-green-500 to-emerald-400'
                              : 'bg-gradient-to-br from-blue-500 to-cyan-400'
                          }`}>
                            {section.section_number}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-white group-hover:text-blue-300 transition-colors">
                              {section.title}
                            </p>
                            <p className="text-sm text-gray-500">{section.description}</p>
                          </div>
                          {section.completed ? (
                            <CheckCircle2 className="w-5 h-5 text-green-400" />
                          ) : (
                            <Circle className="w-5 h-5 text-gray-600" />
                          )}
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">No sections available for this course.</p>
                  )}
                </motion.div>

                {/* Continue Button */}
                <motion.button
                  className="mt-8 w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 rounded-lg font-semibold text-white transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                >
                  Continue Learning
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                className="flex flex-col items-center justify-center h-96 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <BookOpen className="w-16 h-16 text-gray-700 mb-4" />
                <p className="text-xl font-semibold text-gray-400">Select a course to view details</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
