import { Loader2 } from 'lucide-react';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
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
  const baseClasses = 'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer border-none outline-none relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:!transform-none';

  const sizeClasses = {
    sm: 'px-3.5 py-2 text-xs rounded-full',
    md: 'px-5 py-2.5 text-[0.8125rem] h-[38px] rounded-xl',
    lg: 'px-6 py-3 text-sm h-[44px] rounded-xl',
  };

  const variantClasses = {
    primary: 'bg-gradient-to-br from-primary to-[#6D28D9] text-white shadow-[0_2px_12px_rgba(139,92,246,0.3)] hover:not-disabled:shadow-[0_4px_20px_rgba(139,92,246,0.45)] hover:not-disabled:-translate-y-px active:not-disabled:translate-y-0',
    secondary: 'bg-glass-bg backdrop-blur-[16px] text-text-primary border border-glass-border hover:not-disabled:bg-glass-bg-hover hover:not-disabled:border-glass-border-hover',
    ghost: 'bg-transparent text-text-secondary hover:not-disabled:bg-bg-hover hover:not-disabled:text-text-primary rounded-full',
    danger: 'bg-gradient-to-br from-expense to-[#E11D48] text-white shadow-[0_2px_12px_rgba(251,113,133,0.25)] hover:not-disabled:shadow-[0_4px_20px_rgba(251,113,133,0.4)] hover:not-disabled:-translate-y-px',
    success: 'bg-gradient-to-br from-income to-[#059669] text-white shadow-[0_2px_12px_rgba(52,211,153,0.25)] hover:not-disabled:shadow-[0_4px_20px_rgba(52,211,153,0.4)] hover:not-disabled:-translate-y-px',
    outline: 'bg-transparent text-primary border border-primary/30 hover:not-disabled:bg-primary-light hover:not-disabled:border-primary/50 rounded-xl',
  };

  return (
    <button
      type={type}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <Loader2 size={size === 'sm' ? 14 : 18} className="animate-spin-slow" />
      ) : Icon ? (
        <Icon size={size === 'sm' ? 14 : 18} />
      ) : null}
      {children && <span>{children}</span>}
      {IconRight && !loading && <IconRight size={size === 'sm' ? 14 : 18} />}
    </button>
  );
}
