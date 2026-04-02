import './Card.css';

export default function Card({
  children,
  className = '',
  variant = 'default',  // 'default' | 'glass' | 'outlined'
  hover = false,
  padding = 'md',        // 'sm' | 'md' | 'lg' | 'none'
  onClick,
  ...props
}) {
  return (
    <div
      className={`card card--${variant} card--pad-${padding} ${hover ? 'card--hover' : ''} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
}
