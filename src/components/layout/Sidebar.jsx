import { NavLink, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  LayoutDashboard, ArrowLeftRight, Lightbulb,
  Shield, Eye, ChevronLeft, ChevronRight, X, Wallet
} from 'lucide-react';
import { toggleSidebar, closeMobileSidebar } from '../../store/slices/uiSlice';

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/transactions', label: 'Transactions', icon: ArrowLeftRight },
  { path: '/insights', label: 'Insights', icon: Lightbulb },
];

export default function Sidebar() {
  const dispatch = useDispatch();
  const { role, sidebarOpen, mobileSidebarOpen } = useSelector(s => s.ui);
  const location = useLocation();

  const collapsed = !sidebarOpen;

  return (
    <>
      {/* Mobile overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[99] backdrop-blur-[4px] lg:hidden"
          onClick={() => dispatch(closeMobileSidebar())}
        />
      )}

      <aside
        className={`fixed left-0 top-0 bottom-0 bg-bg-secondary border-r border-border flex flex-col z-[100] transition-all duration-300 overflow-hidden
          ${collapsed ? 'w-[var(--spacing-sidebar-collapsed)]' : 'w-[var(--spacing-sidebar)]'}
          max-lg:!w-[var(--spacing-sidebar)] max-lg:shadow-lg
          ${mobileSidebarOpen ? 'max-lg:translate-x-0' : 'max-lg:-translate-x-full'}
        `}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 h-[var(--spacing-header)] border-b border-border shrink-0">
          <div className="w-[38px] h-[38px] rounded-md bg-gradient-to-br from-primary to-[#8B5CF6] flex items-center justify-center text-white shrink-0 shadow-[0_4px_12px_rgba(59,130,246,0.3)]">
            <Wallet size={24} />
          </div>
          <span className={`text-xl font-bold whitespace-nowrap bg-gradient-to-br from-primary to-[#8B5CF6] bg-clip-text text-transparent ${collapsed ? 'lg:hidden' : ''}`}>
            FinTrack
          </span>
          <button
            className="hidden max-lg:flex ml-auto text-text-secondary p-2 rounded-[6px] transition-all duration-150 hover:text-text-primary hover:bg-bg-elevated"
            onClick={() => dispatch(closeMobileSidebar())}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 px-3 flex flex-col gap-1 overflow-y-auto">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium no-underline transition-all duration-200 relative whitespace-nowrap
                  ${isActive
                    ? 'text-primary bg-primary-light'
                    : 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated'
                  }
                  ${collapsed ? 'lg:justify-center lg:!px-3' : ''}
                `}
                onClick={() => dispatch(closeMobileSidebar())}
                title={item.label}
              >
                <Icon size={20} className="shrink-0" />
                <span className={`${collapsed ? 'lg:hidden' : ''}`}>{item.label}</span>
                {isActive && !collapsed && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-primary rounded-full max-lg:hidden" />
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom section */}
        <div className="p-3 border-t border-border flex flex-col gap-2 shrink-0">
          {/* Current Role Badge (read-only, synced with header toggle) */}
          <div
            className={`flex items-center gap-2 px-3 py-2.5 rounded-md transition-all duration-300 ${
              collapsed ? 'lg:justify-center' : ''
            } ${
              role === 'admin'
                ? 'bg-primary-light border border-primary/20'
                : 'bg-warning-light border border-warning/20'
            }`}
            title={role === 'admin' ? 'Admin Mode' : 'Viewer Mode'}
          >
            {role === 'admin' ? (
              <Shield size={16} className="text-primary shrink-0" />
            ) : (
              <Eye size={16} className="text-warning shrink-0" />
            )}
            <span className={`text-xs font-bold uppercase tracking-wide ${collapsed ? 'lg:hidden' : ''} ${
              role === 'admin' ? 'text-primary' : 'text-warning'
            }`}>
              {role === 'admin' ? 'Admin' : 'Viewer'}
            </span>
          </div>

          {/* Collapse Toggle (desktop only) */}
          <button
            className="flex items-center gap-3 px-4 py-3 rounded-md text-text-secondary text-[0.8125rem] font-medium transition-all duration-200 whitespace-nowrap hover:text-text-primary hover:bg-bg-elevated max-lg:hidden"
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
