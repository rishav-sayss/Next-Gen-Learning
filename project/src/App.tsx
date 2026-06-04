import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { CoursesPage } from './components/CoursesPage';
import { AnalyticsPage } from './components/AnalyticsPage';

type Page = 'dashboard' | 'courses' | 'analytics' | 'settings';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'courses':
        return <CoursesPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'settings':
        return (
          <div className="min-h-screen bg-gray-950 p-8 text-white">
            <h1 className="text-4xl font-bold mb-4">Settings</h1>
            <p className="text-gray-400">Settings page coming soon...</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex w-full min-h-screen bg-gray-950">
      <Sidebar
        collapsed={sidebarCollapsed}
        onCollapsedChange={setSidebarCollapsed}
        currentPage={currentPage}
        onNavigate={(page) => setCurrentPage(page as Page)}
      />

      <main className="flex-1 overflow-auto">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderPage()}
        </motion.div>
      </main>
    </div>
  );
}

export default App;
