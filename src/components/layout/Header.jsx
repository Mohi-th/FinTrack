import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { Shield, Eye, Sun, Moon, ChevronDown, Wallet } from 'lucide-react';
import { toggleTheme, setRole } from '../../store/slices/uiSlice';

const roles = [
  { value: 'admin', label: 'Admin', icon: Shield },
  { value: 'viewer', label: 'Viewer', icon: Eye },
];

const navItems = [
  { path: '/', label: 'Dashboard' },
  { path: '/transactions', label: 'Transactions' },
  { path: '/insights', label: 'Insights' },
];

export default function Header() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { role, theme } = useSelector(s => s.ui);
  const [tilting, setTilting] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const currentRole = roles.find(r => r.value === role);

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdownOpen(false);
    };
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClick);
      return () => document.removeEventListener('mousedown', handleClick);
    }
  }, [dropdownOpen]);

  const handleThemeToggle = () => {
    setTilting(true);
    dispatch(toggleTheme());
    setTimeout(() => setTilting(false), 500);
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
                    ? 'bg-[rgba(255,255,255,0.12)] text-text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]'
                    : 'text-text-muted hover:text-text-secondary'
                }`}
              >
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        {/* Right — Role + Theme */}
        <div className="flex items-center gap-3 shrink-0 pr-1">
          {/* Role Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold uppercase tracking-wide text-primary bg-primary-light border border-primary/15 transition-all duration-200 hover:border-primary/30 cursor-pointer"
            >
              <currentRole.icon size={13} />
              <span className="max-[360px]:hidden">{currentRole.label}</span>
              <ChevronDown size={12} className={`transition-transform duration-200 opacity-50 ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 top-[calc(100%+8px)] glass-card-static py-1 min-w-[140px] animate-scale-in z-[60]" style={{ borderRadius: '12px' }}>
                {roles.map(r => {
                  const Icon = r.icon;
                  const isActive = role === r.value;
                  return (
                    <button
                      key={r.value}
                      onClick={() => { dispatch(setRole(r.value)); setDropdownOpen(false); }}
                      className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 text-xs font-semibold transition-all duration-150 ${
                        isActive ? 'text-primary bg-primary-light' : 'text-text-secondary hover:bg-bg-hover hover:text-text-primary'
                      }`}
                    >
                      <Icon size={14} />
                      <span>{r.label}</span>
                      {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_6px_rgba(139,92,246,0.5)]" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            className={`flex items-center justify-center w-10 h-10 rounded-full text-text-muted transition-all duration-300 hover:text-text-primary border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] ${
              tilting ? 'animate-theme-tilt' : ''
            }`}
            onClick={handleThemeToggle}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>
        </div>
      </div>
    </header>
  );
}
