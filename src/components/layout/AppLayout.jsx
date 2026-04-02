import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import './AppLayout.css';

export default function AppLayout() {
  const { sidebarOpen } = useSelector(s => s.ui);

  return (
    <div className={`layout ${sidebarOpen ? '' : 'layout--collapsed'}`}>
      <Sidebar />
      <main className="layout__main">
        <Outlet />
      </main>
    </div>
  );
}
