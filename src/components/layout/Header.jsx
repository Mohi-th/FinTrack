import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, Shield, Eye, Sun, Moon } from 'lucide-react';
import { toggleMobileSidebar, toggleTheme, setRole } from '../../store/slices/uiSlice';

export default function Header({ title, subtitle }) {
  const dispatch = useDispatch();
  const { role, theme } = useSelector(s => s.ui);
  const [tilting, setTilting] = useState(false);

  const handleThemeToggle = () => {
    setTilting(true);
    dispatch(toggleTheme());
    setTimeout(() => setTilting(false), 500);
  };

  return (
    <header className="flex items-center justify-between h-[var(--spacing-header)] px-6 bg-bg-secondary border-b border-border sticky top-0 z-50 backdrop-blur-[12px] max-lg:px-4" id="main-header">
      <div className="flex items-center gap-4">
        <button
          className="hidden max-lg:flex text-text-secondary p-2 rounded-md transition-all duration-150 hover:text-text-primary hover:bg-bg-elevated"
          onClick={() => dispatch(toggleMobileSidebar())}
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
        <div className="flex flex-col">
          <h1 className="text-xl font-bold text-text-primary leading-tight max-sm:text-lg">{title || 'Dashboard'}</h1>
          {subtitle && <p className="text-[0.8125rem] text-text-muted leading-tight">{subtitle}</p>}
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Role Toggle */}
        <div className="flex gap-1 bg-bg-primary rounded-lg p-1 border border-border">
          <button
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 whitespace-nowrap ${
              role === 'admin'
                ? 'bg-primary text-white shadow-[0_2px_8px_rgba(59,130,246,0.3)]'
                : 'text-text-secondary hover:text-text-primary'
            }`}
            onClick={() => dispatch(setRole('admin'))}
            title="Switch to Admin"
          >
            <Shield size={14} />
            <span className="max-[420px]:hidden">Admin</span>
          </button>
          <button
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 whitespace-nowrap ${
              role === 'viewer'
                ? 'bg-primary text-white shadow-[0_2px_8px_rgba(59,130,246,0.3)]'
                : 'text-text-secondary hover:text-text-primary'
            }`}
            onClick={() => dispatch(setRole('viewer'))}
            title="Switch to Viewer"
          >
            <Eye size={14} />
            <span className="max-[420px]:hidden">Viewer</span>
          </button>
        </div>

        {/* Theme Toggle with tilt animation */}
        <button
          className={`flex items-center justify-center w-10 h-10 rounded-xl bg-bg-primary border border-border text-text-secondary transition-all duration-300 hover:text-text-primary hover:bg-bg-elevated hover:border-text-muted hover:shadow-[0_0_16px_rgba(59,130,246,0.15)] ${
            tilting ? 'animate-theme-tilt' : ''
          }`}
          onClick={handleThemeToggle}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  );
}
