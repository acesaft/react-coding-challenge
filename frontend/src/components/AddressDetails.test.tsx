import { screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';

import { server } from '@/test/server.ts';
import AddressDetails from '@/components/AddressDetails';
import { setupStore } from '@/store/store.ts';
import { renderWithProviders } from '@/test/testUtils.tsx';
import { mockAddresses } from '@/test/mockData.ts';

describe('AddressDetails', () => {
  test('it renders a loading message and the address details once fetching the address resolves', async () => {
    const store = setupStore();
    const mockData = mockAddresses[0];

    renderWithProviders(<AddressDetails />, { store });
    expect(screen.getByText('loading address', { exact: false })).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText(`Name: ${mockData.name}`, { exact: false })).toBeInTheDocument();
      expect(screen.getByText(`Postal Code: ${mockData.postalCode}`, { exact: false })).toBeInTheDocument();
      expect(screen.getByText(`City: ${mockData.city}`, { exact: false })).toBeInTheDocument();
      expect(screen.getByText(`Street: ${mockData.street}`, { exact: false })).toBeInTheDocument();
      expect(screen.getByText(`House Number: ${mockData.houseNumber}`, { exact: false })).toBeInTheDocument();
      expect(screen.getByText(`Primary Mailing Address`, { exact: false })).toBeInTheDocument();
      expect(screen.queryByText(`Primary Billing Address`, { exact: false })).not.toBeInTheDocument();
      expect(screen.queryByText(`Primary Shipping Address`, { exact: false })).not.toBeInTheDocument();
    });
  });

  test('it renders a loading message and an error message if fetching the address fails', async () => {
    const store = setupStore();

    server.use(
      http.get(`${import.meta.env.VITE_USER_ACCOUNT_BACKEND_URL}/profiles/:profileId/addresses/:addressId`, () => {
        return new HttpResponse(null, { status: 500 });
      }),
    );

    renderWithProviders(<AddressDetails />, { store });
    await waitFor(() => {
      expect(screen.getByText('Something went wrong loading the address!', { exact: false })).toBeInTheDocument();
    });
  });
});
