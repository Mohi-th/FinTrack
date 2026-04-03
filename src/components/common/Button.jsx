import { Loader2 } from 'lucide-react';

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
  const baseClasses = 'inline-flex items-center justify-center gap-2 font-semibold rounded-md transition-all duration-200 whitespace-nowrap cursor-pointer border-none outline-none relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:!transform-none';

  const sizeClasses = {
    sm: 'px-3 py-2 text-xs rounded-[6px]',
    md: 'px-5 py-2 text-[0.8125rem] h-[38px]',
    lg: 'px-6 py-3 text-sm h-[44px]',
  };

  const variantClasses = {
    primary: 'bg-gradient-to-br from-primary to-[#2563EB] text-white shadow-[0_2px_8px_rgba(59,130,246,0.3)] hover:not-disabled:shadow-[0_4px_16px_rgba(59,130,246,0.4)] hover:not-disabled:-translate-y-px active:not-disabled:translate-y-0',
    secondary: 'bg-bg-elevated text-text-primary border border-border hover:not-disabled:bg-bg-hover hover:not-disabled:border-text-muted',
    ghost: 'bg-transparent text-text-secondary hover:not-disabled:bg-bg-elevated hover:not-disabled:text-text-primary',
    danger: 'bg-expense text-white shadow-[0_2px_8px_rgba(244,63,94,0.3)] hover:not-disabled:shadow-[0_4px_16px_rgba(244,63,94,0.4)] hover:not-disabled:-translate-y-px',
    success: 'bg-income text-white shadow-[0_2px_8px_rgba(16,185,129,0.3)] hover:not-disabled:shadow-[0_4px_16px_rgba(16,185,129,0.4)] hover:not-disabled:-translate-y-px',
    outline: 'bg-transparent text-primary border border-primary hover:not-disabled:bg-primary-light',
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
