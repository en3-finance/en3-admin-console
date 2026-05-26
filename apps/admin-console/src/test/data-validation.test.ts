import { describe, expect, it } from 'vitest';
import { datasets, moduleDefinitions, simulationTransactions } from '../data/mockData';
import { validateMockData } from '../data/validators';

describe('mock data contract', () => {
  it('loads all required datasets without validation issues', () => {
    expect(validateMockData(datasets)).toEqual([]);
  });

  it('supports every requested module with local mock data', () => {
    expect(moduleDefinitions).toHaveLength(12);
    expect(datasets.organizations.length).toBeGreaterThan(0);
    expect(datasets.users.length).toBeGreaterThan(0);
    expect(datasets.roles.length).toBeGreaterThan(0);
    expect(datasets.wallets.length).toBeGreaterThan(0);
    expect(datasets.policies.every((policy) => policy.mockOnly)).toBe(true);
    expect(datasets.riskReviews.every((review) => review.mockOnly)).toBe(true);
    expect(datasets.webhooks.length).toBeGreaterThan(0);
    expect(simulationTransactions.length).toBeGreaterThan(0);
  });
});
