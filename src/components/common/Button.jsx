import { Loader2 } from 'lucide-react';
import './Button.css';

export default function Button({
  children,
  variant = 'primary',  // 'primary' | 'secondary' | 'ghost' | 'danger' | 'success' | 'outline'
  size = 'md',           // 'sm' | 'md' | 'lg'
  loading = false,
  disabled = false,
  icon: Icon,
  iconRight: IconRight,
  fullWidth = false,
  onClick,
  type = 'button',
  className = '',
  ...props
}) {
  return (
    <button
      type={type}
      className={`btn btn--${variant} btn--${size} ${fullWidth ? 'btn--full' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <Loader2 size={size === 'sm' ? 14 : 18} className="btn__spinner" />
      ) : Icon ? (
        <Icon size={size === 'sm' ? 14 : 18} />
      ) : null}
      {children && <span>{children}</span>}
      {IconRight && !loading && <IconRight size={size === 'sm' ? 14 : 18} />}
    </button>
  );
}
