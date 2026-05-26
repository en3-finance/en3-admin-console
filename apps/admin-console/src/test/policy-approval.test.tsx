import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { App } from '../App';

describe('policy and approval workflow', () => {
  it('shows policy detail with non-enforcement boundary', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /policies/i }));
    expect(screen.getByRole('heading', { name: /high value stablecoin approval/i })).toBeInTheDocument();
    expect(screen.getByText(/does not enforce production rules/i)).toBeInTheDocument();
  });

  it('records approval decisions in local UI state only', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /pending approvals/i }));
    expect(screen.getByRole('heading', { name: /txn_001/i })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /approve mock decision/i }));
    expect(screen.getByText(/mock decision recorded: approved/i)).toBeInTheDocument();
    expect(screen.getByText(/no backend, signing, settlement, ledger, or webhook side effect/i)).toBeInTheDocument();
  });
});
