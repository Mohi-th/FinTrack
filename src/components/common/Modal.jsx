import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import './Modal.css';

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',  // 'sm' | 'md' | 'lg'
  showClose = true,
}) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className={`modal modal--${size}`} ref={modalRef}>
        <div className="modal__header">
          <h2 className="modal__title">{title}</h2>
          {showClose && (
            <button className="modal__close" onClick={onClose} aria-label="Close modal">
              <X size={20} />
            </button>
          )}
        </div>
        <div className="modal__body">
          {children}
        </div>
      </div>
    </div>
  );
}
