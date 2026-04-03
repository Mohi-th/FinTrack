import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';

export default function AppLayout() {
  const { sidebarOpen } = useSelector(s => s.ui);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main
        className="flex-1 min-h-screen overflow-x-hidden transition-[margin-left] duration-300 max-lg:!ml-0"
        style={{ marginLeft: sidebarOpen ? 'var(--spacing-sidebar)' : 'var(--spacing-sidebar-collapsed)' }}
      >
        <Outlet />
      </main>
    </div>
  );
}
