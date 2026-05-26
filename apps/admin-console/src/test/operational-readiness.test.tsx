import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { App } from '../App';

describe('audit and integration readiness modules', () => {
  it('shows deterministic transaction simulation copy', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /transaction simulation/i }));
    expect(screen.getByText(/does not submit, sign, settle, or write to a ledger/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /run mock simulation/i }));
    expect(screen.getByText(/simulation refreshed in local ui only/i)).toBeInTheDocument();
  });

  it('shows risk, audit, and webhook reference surfaces', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /risk review/i }));
    expect(screen.getByText(/no sanctions, kyt, or address-risk vendor integration/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /audit log/i }));
    expect(screen.getByRole('heading', { name: /reference event timeline/i })).toBeInTheDocument();
    expect(screen.getByText(/policy matched/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /webhooks/i }));
    expect(screen.getByText(/do not deliver events/i)).toBeInTheDocument();
    expect(screen.getByText(/example.invalid\/mock-ops-events/i)).toBeInTheDocument();
  });
});
