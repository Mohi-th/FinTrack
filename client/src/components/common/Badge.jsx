export default function Badge({
  children,
  variant = 'default', // 'default' | 'income' | 'expense' | 'primary' | 'warning' | 'info'
  size = 'md',         // 'sm' | 'md'
  className = '',
}) {
  const baseClasses = 'inline-flex items-center gap-1 font-semibold rounded-full whitespace-nowrap capitalize';

  const sizeClasses = {
    sm: 'px-2 py-[2px] text-[0.625rem]',
    md: 'px-3 py-1 text-xs',
  };

  const variantClasses = {
    default: 'bg-bg-elevated text-text-secondary',
    income: 'bg-income-light text-income',
    expense: 'bg-expense-light text-expense',
    primary: 'bg-primary-light text-primary',
    warning: 'bg-warning-light text-warning',
    info: 'bg-info-light text-info',
  };

  return (
    <span className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
}
