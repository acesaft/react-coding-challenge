import { screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';

import { server } from '@/test/server';
import AddressDetails from '@/components/AddressDetails';
import { setupStore } from '@/store/store';
import { renderWithProviders } from '@/test/testUtils';
import { mockAddresses } from '@/test/mockData';

describe('AddressDetails', () => {
  test('it renders a loading message and the address details once fetching the address resolves', async () => {
    const store = setupStore();
    const mockData = mockAddresses[0];

    renderWithProviders(<AddressDetails />, { store });
    expect(screen.queryAllByText('loading', { exact: false })).toHaveLength(5);
    await waitFor(() => {
      expect(screen.getByText(`Name:`, { exact: false })).toBeInTheDocument();
      expect(screen.getByText(mockData.name, { exact: false })).toBeInTheDocument();
      expect(screen.getByText(`Postal Code:`, { exact: false })).toBeInTheDocument();
      expect(screen.getByText(mockData.postalCode, { exact: false })).toBeInTheDocument();
      expect(screen.getByText(`City:`, { exact: false })).toBeInTheDocument();
      expect(screen.getByText(mockData.city, { exact: false })).toBeInTheDocument();
      expect(screen.getByText(`Street:`, { exact: false })).toBeInTheDocument();
      expect(screen.getByText(mockData.street, { exact: false })).toBeInTheDocument();
      expect(screen.getByText(`House Number:`, { exact: false })).toBeInTheDocument();
      expect(screen.getByText(mockData.houseNumber, { exact: false })).toBeInTheDocument();
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
    expect(screen.queryAllByText('loading', { exact: false })).toHaveLength(5);
    await waitFor(() => {
      expect(screen.getByText('Something went wrong loading the address!', { exact: false })).toBeInTheDocument();
    });
  });
});
