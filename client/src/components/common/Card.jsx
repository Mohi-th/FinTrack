export default function Card({
  children,
  className = '',
  hover = false,
  padding = 'md',
  glow = '',
  onClick,
  ...props
}) {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-5 max-[360px]:p-4',
    lg: 'p-8 max-sm:p-5',
  };

  return (
    <div
      className={`${hover ? 'glass-card' : 'glass-card-static'} ${paddingClasses[padding]} ${className}`}
      onClick={onClick}
      style={glow ? { boxShadow: glow } : undefined}
      {...props}
    >
      {children}
    </div>
  );
}
