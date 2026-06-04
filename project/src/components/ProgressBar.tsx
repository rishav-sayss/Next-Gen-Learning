import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: number;
  delay?: number;
}

export const ProgressBar = ({ progress, delay = 0 }: ProgressBarProps) => {
  return (
    <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{
          delay,
          duration: 1.2,
          ease: 'easeOut',
        }}
      />
    </div>
  );
};
