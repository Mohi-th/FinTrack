import './Badge.css';

export default function Badge({
  children,
  variant = 'default', // 'default' | 'income' | 'expense' | 'primary' | 'warning' | 'info'
  size = 'md',         // 'sm' | 'md'
  className = '',
}) {
  return (
    <span className={`badge badge--${variant} badge--${size} ${className}`}>
      {children}
    </span>
  );
}
