import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { App } from '../App';

describe('admin console shell', () => {
  it('renders the dashboard with mock-only posture', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: /operations control plane/i })).toBeInTheDocument();
    expect(screen.getAllByText(/sandbank mock posture/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/public reference/i).length).toBeGreaterThan(0);
  });

  it('navigates to requested control-plane modules', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /organizations/i }));
    expect(screen.getByRole('heading', { name: /organizations/i })).toBeInTheDocument();
    expect(screen.getAllByText(/sandbank/i).length).toBeGreaterThan(0);

    await user.click(screen.getByRole('button', { name: /roles \/ rbac/i }));
    expect(screen.getByRole('heading', { name: /roles \/ rbac/i })).toBeInTheDocument();
    expect(screen.getByText(/operations admin/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /wallet registry/i }));
    expect(screen.getByRole('heading', { name: /wallet registry/i })).toBeInTheDocument();
    expect(screen.getByText(/sandbank user wallet/i)).toBeInTheDocument();
  });
});
