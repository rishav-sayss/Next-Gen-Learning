import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';
import { useUserStreak } from '../hooks/useDashboardData';

interface HeroTileProps {
  delay?: number;
}

export const HeroTile = ({ delay = 0 }: HeroTileProps) => {
  const { streak, loading, error } = useUserStreak();
  const streakDays = streak?.days ?? 0;

  return (
    <motion.article
      className="relative group overflow-hidden rounded-lg bg-gradient-to-br from-blue-900/40 via-gray-900 to-gray-900 p-8 lg:col-span-2 border border-gray-700 hover:border-blue-500/50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: 'easeOut' }}
      whileHover={{
        scale: 1.01,
        transition: { type: 'spring', stiffness: 300, damping: 20 },
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div className="relative z-10">
        <motion.h1
          className="text-4xl lg:text-5xl font-bold text-white mb-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: delay + 0.2 }}
        >
          Welcome back,
        </motion.h1>
        <motion.p
          className="text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: delay + 0.3 }}
        >
          Alex
        </motion.p>

        <motion.div
          className="inline-flex items-center gap-3 px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-lg backdrop-blur-sm hover:border-orange-500/50 transition-colors duration-300"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: delay + 0.4 }}
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Flame className="w-6 h-6 text-orange-500" />
          </motion.div>
          <div>
            <p className="text-sm text-gray-400">Learning Streak</p>
            {loading ? (
              <motion.div
                className="h-7 w-20 bg-gray-700 rounded"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            ) : error ? (
              <p className="text-sm text-red-400">Unavailable</p>
            ) : (
              <p className="text-2xl font-bold text-white">{streakDays} days</p>
            )}
          </div>
        </motion.div>
      </div>
    </motion.article>
  );
};
