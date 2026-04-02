import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeToast } from '../../store/slices/uiSlice';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import './Toast.css';

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
};

export default function Toast() {
  const dispatch = useDispatch();
  const toasts = useSelector(s => s.ui.toasts);

  return (
    <div className="toast-container">
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

  return (
    <div className={`toast toast--${toast.type || 'info'}`}>
      <Icon size={18} className="toast__icon" />
      <span className="toast__message">{toast.message}</span>
      <button className="toast__close" onClick={onDismiss}>
        <X size={14} />
      </button>
    </div>
  );
}
