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
    expect(screen.queryAllByText('Loading...', { exact: false })).toHaveLength(1);
    expect(screen.queryAllByRole('progressbar')).toHaveLength(5);
    await waitFor(() => {
      expect(screen.getByText(`Email:`, { exact: false })).toBeInTheDocument();
      expect(screen.getByText(`${mockData.email}`, { exact: false })).toBeInTheDocument();
      expect(screen.getByText('Persons', { exact: false })).toBeInTheDocument();
      const personsCount = screen.getByText('Persons', { exact: false }).closest('div');
      expect(personsCount).toHaveTextContent('2');
      expect(screen.getByText('Profiles', { exact: false })).toBeInTheDocument();
      const profileCount = screen.getByText('Profiles', { exact: false }).closest('div');
      expect(profileCount).toHaveTextContent('1');
      expect(screen.getByText('Addresses', { exact: false })).toBeInTheDocument();
      const addressCount = screen.getByText('Addresses', { exact: false }).closest('div');
      expect(addressCount).toHaveTextContent('5');
      expect(screen.getByText('Payment Methods', { exact: false })).toBeInTheDocument();
      const paymentMethodCount = screen.getByText('Payment Methods', { exact: false }).closest('div');
      expect(paymentMethodCount).toHaveTextContent('5');
      expect(screen.getByText('Meters', { exact: false })).toBeInTheDocument();
      const meterCount = screen.getByText('Meters', { exact: false }).closest('div');
      expect(meterCount).toHaveTextContent('4');
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
    expect(screen.queryAllByText('Loading...', { exact: false })).toHaveLength(1);
    expect(screen.queryAllByRole('progressbar')).toHaveLength(5);
    await waitFor(() => {
      expect(screen.getByText('Something went wrong loading the user account!', { exact: false })).toBeInTheDocument();
    });
  });
});
