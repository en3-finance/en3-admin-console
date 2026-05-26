import { formatDateTime, humanize } from '../data/formatters';
import { getOrganizationName } from '../data/mockData';
import type { AuditEvent } from '../data/types';

interface AuditTimelineProps {
  events: AuditEvent[];
}

export function AuditTimeline({ events }: AuditTimelineProps) {
  const sortedEvents = [...events].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <section className="view-stack" aria-label="Audit event timeline">
      <div className="reference-banner">
        <div>
          <p className="eyebrow">Audit log model</p>
          <h3>Reference event timeline for lifecycle visibility</h3>
        </div>
        <span className="count-pill">{events.length} events</span>
      </div>

      <div className="timeline">
        {sortedEvents.map((event) => (
          <article key={event.id} className="timeline-item timeline-item--large">
            <span>{formatDateTime(event.createdAt)}</span>
            <strong>{humanize(event.action)}</strong>
            <p>{event.summary}</p>
            <small>
              {getOrganizationName(event.organizationId)} / {humanize(event.resourceType)} / {event.resourceId}
            </small>
          </article>
        ))}
      </div>
    </section>
  );
}
