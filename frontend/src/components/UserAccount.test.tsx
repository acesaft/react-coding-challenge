import { screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';

import { server } from '@/test/server.ts';
import UserAccount from '@/components/UserAccount';
import { setupStore } from '@/store/store.ts';
import { renderWithProviders } from '@/test/testUtils.tsx';
import { mockData } from '@/test/mockData.ts';

describe('UserAccount', () => {
  test('it renders loading animations and the user account details once fetching the userAccount resolves', async () => {
    const store = setupStore();

    renderWithProviders(<UserAccount />, { store });
    expect(screen.queryAllByText('Loading...', { exact: false })).toHaveLength(6);
    await waitFor(() => {
      expect(screen.getByText(`Email: ${mockData.email}`, { exact: false })).toBeInTheDocument();
      expect(screen.getByText('Profiles: 1', { exact: false })).toBeInTheDocument();
      expect(screen.getByText('Persons: 2', { exact: false })).toBeInTheDocument();
      expect(screen.getByText('Addresses: 5', { exact: false })).toBeInTheDocument();
      expect(screen.getByText('Payment Methods: 5', { exact: false })).toBeInTheDocument();
      expect(screen.getByText('Meters: 4', { exact: false })).toBeInTheDocument();
    });
  });

  test('it renders loading animations and an error message if fetching the userAccount fails', async () => {
    const store = setupStore();

    server.use(
      http.get(`${import.meta.env.VITE_USER_ACCOUNT_BACKEND_URL}/`, () => {
        return new HttpResponse(null, { status: 500 });
      }),
    );

    renderWithProviders(<UserAccount />, { store });
    expect(screen.queryAllByText('Loading...', { exact: false })).toHaveLength(6);
    await waitFor(() => {
      expect(screen.getByText('Something went wrong loading the user account!', { exact: false })).toBeInTheDocument();
    });
  });
});
