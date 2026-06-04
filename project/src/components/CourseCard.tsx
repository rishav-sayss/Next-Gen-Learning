import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { ProgressBar } from './ProgressBar';
import type { Course } from '../lib/supabase';

interface CourseCardProps {
  course: Course;
  delay?: number;
}

export const CourseCard = ({ course, delay = 0 }: CourseCardProps) => {
  const IconComponent = (LucideIcons as any)[course.icon_name];
  const Icon = IconComponent || LucideIcons.BookOpen;

  return (
    <motion.article
      className="relative group overflow-hidden rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 p-6 h-full border border-gray-700 hover:border-blue-500/50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay,
        duration: 0.5,
        ease: 'easeOut',
      }}
      whileHover={{
        scale: 1.02,
        transition: {
          type: 'spring',
          stiffness: 300,
          damping: 20,
        },
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-cyan-500/0 to-blue-500/0 group-hover:from-blue-500/5 group-hover:via-cyan-500/5 group-hover:to-blue-500/5 transition-all duration-300 pointer-events-none" />

      <div className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-start justify-between mb-4">
          <div className="p-2 bg-gray-900/80 rounded-lg border border-gray-700 group-hover:border-blue-500/30 transition-colors duration-300">
            <Icon className="w-6 h-6 text-cyan-400" />
          </div>
          <motion.div
            className="text-sm font-medium text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.3 }}
          >
            {course.progress}%
          </motion.div>
        </div>

        <h3 className="text-lg font-semibold text-white mb-6 leading-tight flex-grow">
          {course.title}
        </h3>

        <div className="space-y-2">
          <ProgressBar progress={course.progress} delay={delay + 0.2} />
          <motion.p
            className="text-xs text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.4 }}
          >
            Continue learning
          </motion.p>
        </div>
      </div>
    </motion.article>
  );
};
