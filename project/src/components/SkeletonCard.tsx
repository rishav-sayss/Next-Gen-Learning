import { motion } from 'framer-motion';

interface SkeletonCardProps {
  delay?: number;
}

export const SkeletonCard = ({ delay = 0 }: SkeletonCardProps) => {
  return (
    <motion.div
      className="rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 p-6 border border-gray-700 h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay,
        duration: 0.5,
      }}
    >
      <motion.div
        className="h-8 bg-gray-700 rounded mb-4 w-3/4"
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <motion.div
        className="h-4 bg-gray-700 rounded mb-6 w-1/2"
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 }}
      />
      <motion.div
        className="h-2 bg-gray-700 rounded mb-2 w-full"
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
      />
      <motion.div
        className="h-2 bg-gray-700 rounded w-1/3"
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
      />
    </motion.div>
  );
};

export const HeroSkeletonCard = ({ delay = 0 }: SkeletonCardProps) => {
  return (
    <motion.div
      className="rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 p-8 lg:col-span-2 border border-gray-700 h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay,
        duration: 0.5,
      }}
    >
      <motion.div
        className="h-12 bg-gray-700 rounded mb-4 w-1/2"
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <motion.div
        className="h-8 bg-gray-700 rounded mb-6 w-1/3"
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 }}
      />
    </motion.div>
  );
};
