import { AlertTriangle, Inbox, Loader2 } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  message: string;
  variant?: 'empty' | 'loading' | 'error';
}

export function EmptyState({ title, message, variant = 'empty' }: EmptyStateProps) {
  const Icon = variant === 'loading' ? Loader2 : variant === 'error' ? AlertTriangle : Inbox;

  return (
    <div className={`empty-state empty-state--${variant}`} role={variant === 'error' ? 'alert' : 'status'}>
      <Icon aria-hidden="true" className={variant === 'loading' ? 'spin' : undefined} size={22} />
      <div>
        <h3>{title}</h3>
        <p>{message}</p>
      </div>
    </div>
  );
}
