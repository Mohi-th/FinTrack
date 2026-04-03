export default function Card({
  children,
  className = '',
  variant = 'default',  // 'default' | 'glass' | 'outlined'
  hover = false,
  padding = 'md',        // 'sm' | 'md' | 'lg' | 'none'
  onClick,
  ...props
}) {
  const baseClasses = 'rounded-lg transition-all duration-200';

  const variantClasses = {
    default: 'bg-bg-secondary border border-border',
    glass: 'bg-glass-bg backdrop-blur-[16px] border border-glass-border',
    outlined: 'bg-transparent border border-border',
  };

  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-5',
    lg: 'p-8',
  };

  const hoverClasses = hover
    ? 'hover:border-border-hover hover:shadow-glow hover:-translate-y-0.5'
    : '';

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${paddingClasses[padding]} ${hoverClasses} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
}
