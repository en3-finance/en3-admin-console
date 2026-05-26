export function formatDateTime(value: string | null): string {
  if (!value) {
    return 'Not yet active';
  }

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(value));
}

export function formatAmount(value: string, asset: string): string {
  const numeric = Number(value);
  if (Number.isNaN(numeric)) {
    return `${value} ${asset}`;
  }

  return `${numeric.toLocaleString('en', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })} ${asset}`;
}

export function humanize(value: string): string {
  return value
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function statusTone(value: string): 'good' | 'warning' | 'danger' | 'neutral' | 'info' {
  const normalized = value.toLowerCase();

  if (['active', 'sandbox_active', 'success', 'clear', 'approved', 'resolved', 'mock_current'].includes(normalized)) {
    return 'good';
  }

  if (
    ['pending', 'review', 'review_required', 'retrying', 'draft', 'invited', 'sandbox_review', 'open', 'mock_due'].includes(
      normalized
    )
  ) {
    return 'warning';
  }

  if (['blocked', 'rejected', 'frozen', 'failed', 'escalated', 'high', 'critical'].includes(normalized)) {
    return 'danger';
  }

  if (['paused', 'disabled', 'sandbox_paused', 'none', 'mock_not_configured'].includes(normalized)) {
    return 'neutral';
  }

  return 'info';
}
