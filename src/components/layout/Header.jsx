import { useSelector, useDispatch } from 'react-redux';
import { Menu, Bell, Search } from 'lucide-react';
import { toggleMobileSidebar } from '../../store/slices/uiSlice';
import './Header.css';

export default function Header({ title, subtitle }) {
  const dispatch = useDispatch();
  const { role } = useSelector(s => s.ui);

  return (
    <header className="header" id="main-header">
      <div className="header__left">
        <button
          className="header__menu-btn"
          onClick={() => dispatch(toggleMobileSidebar())}
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
        <div className="header__title-group">
          <h1 className="header__title">{title || 'Dashboard'}</h1>
          {subtitle && <p className="header__subtitle">{subtitle}</p>}
        </div>
      </div>

      <div className="header__right">
        <div className="header__role-badge" data-role={role}>
          {role === 'admin' ? '🛡️ Admin' : '👁️ Viewer'}
        </div>
        <button className="header__icon-btn" aria-label="Notifications" title="Notifications">
          <Bell size={20} />
          <span className="header__notification-dot"></span>
        </button>
        <div className="header__avatar">
          <span>JD</span>
        </div>
      </div>
    </header>
  );
}
