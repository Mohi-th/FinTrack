import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeToast } from '../../store/slices/uiSlice';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

const icons = { success: CheckCircle, error: AlertCircle, info: Info };
const glowClasses = {
  success: 'shadow-[0_0_20px_rgba(52,211,153,0.1)]',
  error: 'shadow-[0_0_20px_rgba(251,113,133,0.1)]',
  info: 'shadow-[0_0_20px_rgba(139,92,246,0.1)]',
};
const accentColors = { success: '#34D399', error: '#FB7185', info: '#8B5CF6' };

export default function Toast() {
  const dispatch = useDispatch();
  const toasts = useSelector(s => s.ui.toasts);

  return (
    <div className="fixed bottom-24 right-6 flex flex-col gap-3 z-[300] pointer-events-none max-sm:bottom-20 max-sm:right-3 max-sm:left-3">
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
    <div className={`flex items-center gap-3 px-4 py-3 glass-card-static min-w-[280px] max-w-[420px] pointer-events-auto animate-slide-right max-sm:min-w-0 max-sm:max-w-none ${glowClasses[type]}`}
      style={{ borderLeft: `3px solid ${accentColors[type]}`, borderRadius: '12px' }}
    >
      <Icon size={18} style={{ color: accentColors[type] }} />
      <span className="flex-1 text-[0.8125rem] text-text-primary font-medium">{toast.message}</span>
      <button className="text-text-muted p-1 rounded-full transition-all duration-150 shrink-0 hover:text-text-primary hover:bg-bg-hover" onClick={onDismiss}>
        <X size={14} />
      </button>
    </div>
  );
}
