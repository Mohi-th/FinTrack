export default function EmptyState({ title, message, icon: Icon, action }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 px-6 gap-4 animate-fade-in-up">
      {Icon && (
        <div className="text-text-muted opacity-50 animate-float">
          <Icon size={48} strokeWidth={1.5} />
        </div>
      )}
      <h3 className="text-lg font-semibold text-text-primary">{title || 'No data found'}</h3>
      {message && <p className="text-[0.8125rem] text-text-muted max-w-[320px] leading-relaxed">{message}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
