import { humanize, statusTone } from '../data/formatters';

interface StatusBadgeProps {
  value: string;
  label?: string;
}

export function StatusBadge({ value, label }: StatusBadgeProps) {
  return (
    <span className={`status-badge status-badge--${statusTone(value)}`}>
      {label ?? humanize(value)}
    </span>
  );
}
