import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeToast } from '../../store/slices/uiSlice';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
};

const borderClasses = {
  success: 'border-l-[3px] border-l-income',
  error: 'border-l-[3px] border-l-expense',
  info: 'border-l-[3px] border-l-primary',
};

const iconColorClasses = {
  success: 'text-income',
  error: 'text-expense',
  info: 'text-primary',
};

export default function Toast() {
  const dispatch = useDispatch();
  const toasts = useSelector(s => s.ui.toasts);

  return (
    <div className="fixed top-6 right-6 flex flex-col gap-3 z-[300] pointer-events-none max-sm:top-4 max-sm:right-4 max-sm:left-4">
      {toasts.map(toast => (
        <ToastItem key={toast.id} toast={toast} onDismiss={() => dispatch(removeToast(toast.id))} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onDismiss }) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, toast.duration || 3000);
    return () => clearTimeout(timer);
  }, [toast.duration, onDismiss]);

  const Icon = icons[toast.type] || Info;
  const type = toast.type || 'info';

  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-md bg-bg-secondary border border-border shadow-lg min-w-[280px] max-w-[420px] pointer-events-auto animate-slide-right max-sm:min-w-0 max-sm:max-w-none ${borderClasses[type] || borderClasses.info}`}>
      <Icon size={18} className={`${iconColorClasses[type] || iconColorClasses.info}`} />
      <span className="flex-1 text-[0.8125rem] text-text-primary font-medium">{toast.message}</span>
      <button
        className="text-text-muted p-1 rounded-[6px] transition-all duration-150 shrink-0 hover:text-text-primary hover:bg-bg-elevated"
        onClick={onDismiss}
      >
        <X size={14} />
      </button>
    </div>
  );
}
