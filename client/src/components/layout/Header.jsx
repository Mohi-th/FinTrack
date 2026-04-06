import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { Sun, Moon, Wallet, LogOut, User } from 'lucide-react';
import { toggleTheme } from '../../store/slices/uiSlice';
import { logout } from '../../store/slices/authSlice';
import { clearTransactions } from '../../store/slices/transactionSlice';

const navItems = [
  { path: '/', label: 'Dashboard' },
  { path: '/transactions', label: 'Transactions' },
  { path: '/insights', label: 'Insights' },
];

export default function Header() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { theme } = useSelector(s => s.ui);
  const user = useSelector(s => s.auth.user);
  const [tilting, setTilting] = useState(false);

  const handleThemeToggle = () => {
    setTilting(true);
    dispatch(toggleTheme());
    setTimeout(() => setTilting(false), 500);
  };

  const handleLogout = () => {
    dispatch(clearTransactions());
    dispatch(logout());
  };

  return (
    <header className="sticky top-0 z-50 px-6 pt-5 pb-3 max-sm:px-4 max-sm:pt-3 max-[360px]:px-3">
      <div
        className="glass-card-static flex items-center justify-between px-4 py-3 max-w-[1200px] mx-auto max-sm:px-3"
        style={{ borderRadius: '9999px' }}
      >
        {/* Left — Logo */}
        <div className="flex items-center gap-2.5 pl-1 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-[#22D3EE] flex items-center justify-center text-white shadow-[0_2px_16px_rgba(139,92,246,0.35)]">
            <Wallet size={18} />
          </div>
          <span className="text-[0.9375rem] font-bold text-text-primary tracking-tight max-sm:hidden">FinTrack</span>
        </div>

        {/* Center — Nav Tabs (desktop) */}
        <nav className="flex items-center gap-1 max-md:hidden">
          {navItems.map(item => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'text-text-primary'
                    : 'text-text-muted hover:text-text-secondary'
                }`}
                style={isActive ? { background: 'color-mix(in srgb, #ffffff 12%, transparent)', boxShadow: 'inset 0 1px 0 color-mix(in srgb, #ffffff 6%, transparent)' } : {}}
              >
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        {/* Right — User + Theme + Logout */}
        <div className="flex items-center gap-3 shrink-0 pr-1">
          {/* User badge */}
          {user && (
            <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold text-primary bg-primary-light border border-primary/15">
              <User size={13} />
              <span className="max-[480px]:hidden">{user.name?.split(' ')[0]}</span>
            </div>
          )}

          {/* Theme Toggle */}
          <button
            className={`flex items-center justify-center w-10 h-10 rounded-full text-text-muted transition-all duration-300 hover:text-text-primary ${
              tilting ? 'animate-theme-tilt' : ''
            }`}
            style={{ border: '1px solid color-mix(in srgb, #ffffff 6%, transparent)', background: 'color-mix(in srgb, #ffffff 3%, transparent)' }}
            onClick={handleThemeToggle}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {/* Logout */}
          <button
            className="flex items-center justify-center w-10 h-10 rounded-full text-text-muted transition-all duration-300 hover:text-expense"
            style={{ border: '1px solid color-mix(in srgb, #ffffff 6%, transparent)', background: 'color-mix(in srgb, #ffffff 3%, transparent)' }}
            onClick={handleLogout}
            title="Logout"
          >
            <LogOut size={17} />
          </button>
        </div>
      </div>
    </header>
  );
}
