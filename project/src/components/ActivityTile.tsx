import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { useWeeklyActivity } from '../hooks/useDashboardData';

interface ActivityTileProps {
  delay?: number;
}

export const ActivityTile = ({ delay = 0 }: ActivityTileProps) => {
  const { activity, loading, error } = useWeeklyActivity();

  const maxHours = activity.length > 0 ? Math.max(...activity.map((d) => d.hours)) : 1;

  return (
    <motion.article
      className="relative group overflow-hidden rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 p-6 border border-gray-700 hover:border-blue-500/50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: 'easeOut' }}
      whileHover={{
        scale: 1.02,
        transition: { type: 'spring', stiffness: 300, damping: 20 },
      }}
    >
      <div className="relative z-10">
        <motion.div
          className="flex items-center gap-2 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.2 }}
        >
          <TrendingUp className="w-5 h-5 text-green-400" />
          <h3 className="text-lg font-semibold text-white">Weekly Activity</h3>
        </motion.div>

        {loading ? (
          <div className="flex items-end justify-between gap-2 h-32">
            {[0, 1, 2, 3, 4, 5, 6].map((idx) => (
              <motion.div
                key={idx}
                className="flex-1 h-full bg-gray-700 rounded-t-md"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: idx * 0.1 }}
              />
            ))}
          </div>
        ) : error ? (
          <p className="text-sm text-red-400">Failed to load activity data</p>
        ) : (
          <div className="flex items-end justify-between gap-2 h-32">
            {activity.map((item, idx) => (
              <motion.div
                key={item.day}
                className="flex-1 flex flex-col items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: delay + 0.3 + idx * 0.05 }}
              >
                <motion.div
                  className="w-full bg-gradient-to-t from-blue-500 to-cyan-400 rounded-t-md hover:shadow-lg hover:shadow-cyan-400/50 transition-shadow duration-300"
                  initial={{ height: 0 }}
                  animate={{ height: `${(item.hours / maxHours) * 100}%` }}
                  transition={{
                    delay: delay + 0.4 + idx * 0.05,
                    duration: 0.8,
                    ease: 'easeOut',
                  }}
                />
                <span className="text-xs text-gray-500 font-medium">{item.day}</span>
              </motion.div>
            ))}
          </div>
        )}

        <motion.p
          className="text-xs text-gray-500 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.8 }}
        >
          Hours spent learning this week
        </motion.p>
      </div>
    </motion.article>
  );
};
