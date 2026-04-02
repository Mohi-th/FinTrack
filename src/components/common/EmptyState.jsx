import './EmptyState.css';

export default function EmptyState({ title, message, icon: Icon, action }) {
  return (
    <div className="empty-state animate-fade-in-up">
      {Icon && (
        <div className="empty-state__icon">
          <Icon size={48} strokeWidth={1.5} />
        </div>
      )}
      <h3 className="empty-state__title">{title || 'No data found'}</h3>
      {message && <p className="empty-state__message">{message}</p>}
      {action && <div className="empty-state__action">{action}</div>}
    </div>
  );
}
