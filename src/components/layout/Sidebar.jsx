import { NavLink, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  LayoutDashboard, ArrowLeftRight, Lightbulb, Sun, Moon,
  Shield, Eye, ChevronLeft, ChevronRight, RefreshCw, X, Wallet
} from 'lucide-react';
import { toggleTheme, setRole, toggleSidebar, closeMobileSidebar } from '../../store/slices/uiSlice';
import { resetData } from '../../store/slices/transactionSlice';
import './Sidebar.css';

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/transactions', label: 'Transactions', icon: ArrowLeftRight },
  { path: '/insights', label: 'Insights', icon: Lightbulb },
];

export default function Sidebar() {
  const dispatch = useDispatch();
  const { theme, role, sidebarOpen, mobileSidebarOpen } = useSelector(s => s.ui);
  const location = useLocation();

  const handleRoleChange = (e) => {
    dispatch(setRole(e.target.value));
  };

  return (
    <>
      {/* Mobile overlay */}
      {mobileSidebarOpen && (
        <div className="sidebar-overlay" onClick={() => dispatch(closeMobileSidebar())} />
      )}

      <aside className={`sidebar ${sidebarOpen ? '' : 'sidebar--collapsed'} ${mobileSidebarOpen ? 'sidebar--mobile-open' : ''}`}>
        {/* Logo */}
        <div className="sidebar__logo">
          <div className="sidebar__logo-icon">
            <Wallet size={24} />
          </div>
          {sidebarOpen && <span className="sidebar__logo-text">FinTrack</span>}
          <button
            className="sidebar__close-mobile"
            onClick={() => dispatch(closeMobileSidebar())}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="sidebar__nav">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`sidebar__link ${isActive ? 'sidebar__link--active' : ''}`}
                onClick={() => dispatch(closeMobileSidebar())}
                title={item.label}
              >
                <Icon size={20} className="sidebar__link-icon" />
                {sidebarOpen && <span className="sidebar__link-label">{item.label}</span>}
                {isActive && <div className="sidebar__link-indicator" />}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom section */}
        <div className="sidebar__bottom">
          {/* Role Switcher */}
          <div className="sidebar__section">
            {sidebarOpen && <label className="sidebar__section-label">Role</label>}
            <div className="sidebar__role-switcher">
              <button
                className={`sidebar__role-btn ${role === 'admin' ? 'sidebar__role-btn--active' : ''}`}
                onClick={() => dispatch(setRole('admin'))}
                title="Admin"
              >
                <Shield size={16} />
                {sidebarOpen && <span>Admin</span>}
              </button>
              <button
                className={`sidebar__role-btn ${role === 'viewer' ? 'sidebar__role-btn--active' : ''}`}
                onClick={() => dispatch(setRole('viewer'))}
                title="Viewer"
              >
                <Eye size={16} />
                {sidebarOpen && <span>Viewer</span>}
              </button>
            </div>
          </div>

          {/* Theme Toggle */}
          <button
            className="sidebar__theme-toggle"
            onClick={() => dispatch(toggleTheme())}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            {sidebarOpen && <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>}
          </button>

          {/* Reset Data */}
          <button
            className="sidebar__reset-btn"
            onClick={() => dispatch(resetData())}
            title="Reset mock data"
          >
            <RefreshCw size={18} />
            {sidebarOpen && <span>Reset Data</span>}
          </button>

          {/* Collapse Toggle (desktop only) */}
          <button
            className="sidebar__collapse-btn"
            onClick={() => dispatch(toggleSidebar())}
            title={sidebarOpen ? 'Collapse' : 'Expand'}
          >
            {sidebarOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
            {sidebarOpen && <span>Collapse</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
