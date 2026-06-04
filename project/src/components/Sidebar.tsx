import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, BookOpen, BarChart3, Settings, LogOut } from 'lucide-react';

interface SidebarProps {
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  currentPage?: string;
  onNavigate?: (page: string) => void;
}

export const Sidebar = ({
  collapsed = false,
  onCollapsedChange,
  currentPage = 'dashboard',
  onNavigate,
}: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(collapsed);
  const [activeItem, setActiveItem] = useState(currentPage);

  const handleCollapse = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    onCollapsedChange?.(newState);
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <motion.nav
      className="fixed lg:sticky top-0 left-0 h-full z-40 bg-gray-900 border-r border-gray-800 flex flex-col"
      initial={false}
      animate={{
        width: isCollapsed ? 80 : 256,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
      }}
    >
      <div className="flex items-center justify-between p-4 h-20 border-b border-gray-800">
        <AnimatePresence mode="wait">
          {!isCollapsed && (
            <motion.div
              key="logo"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">L</span>
              </div>
              <span className="font-bold text-white">Learn</span>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={handleCollapse}
          className="p-1 hover:bg-gray-800 rounded-lg transition-colors duration-200 lg:hidden"
          aria-label="Toggle sidebar"
        >
          {isCollapsed ? (
            <Menu className="w-5 h-5 text-gray-400" />
          ) : (
            <X className="w-5 h-5 text-gray-400" />
          )}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-2">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;

            return (
              <li key={item.id}>
                <motion.button
                  onClick={() => {
                    setActiveItem(item.id);
                    onNavigate?.(item.id);
                  }}
                  className={`relative w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 group ${
                    isActive
                      ? 'text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                  }`}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg"
                      initial={false}
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                  <Icon className="w-5 h-5 flex-shrink-0 relative z-10" />
                  <AnimatePresence mode="wait">
                    {!isCollapsed && (
                      <motion.span
                        key={item.label}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-sm font-medium relative z-10"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="border-t border-gray-800 p-2">
        <motion.button
          className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors duration-200"
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.98 }}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.span
                key="logout"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="text-sm font-medium"
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.nav>
  );
};
