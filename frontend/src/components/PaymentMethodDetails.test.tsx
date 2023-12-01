import { server } from '@/test/server.ts';
import { screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';

import PaymentMethodDetails from '@/components/PaymentMethodDetails';
import { setupStore } from '@/store/store.ts';
import { renderWithProviders } from '@/test/testUtils.tsx';
import { mockPaymentMethods } from '@/test/mockData.ts';

describe('PaymentMethodDetails', () => {
  test('it renders a loading message and the address details once fetching the paymentMethod resolves', async () => {
    const store = setupStore();
    const mockData = mockPaymentMethods[0];

    renderWithProviders(<PaymentMethodDetails />, { store });
    expect(screen.queryAllByText('loading', { exact: false })).toHaveLength(3);
    await waitFor(() => {
      expect(screen.getByText(`Name:`, { exact: false })).toBeInTheDocument();
      expect(screen.getByText(mockData.name, { exact: false })).toBeInTheDocument();
      expect(screen.getByText(`IBAN:`, { exact: false })).toBeInTheDocument();
      expect(screen.getByText(mockData.iban, { exact: false })).toBeInTheDocument();
      expect(screen.getByText(`Bic:`, { exact: false })).toBeInTheDocument();
      expect(screen.getByText(mockData.bic, { exact: false })).toBeInTheDocument();
      expect(screen.getByText(`Primary`, { exact: false })).toBeInTheDocument();
    });
  });

  test('it renders a loading message and an error message if fetching the paymentMethod fails', async () => {
    const store = setupStore();

    server.use(
      http.get(
        `${import.meta.env.VITE_USER_ACCOUNT_BACKEND_URL}/profiles/:profileId/paymentMethods/:paymentMethodId`,
        () => {
          return new HttpResponse(null, { status: 500 });
        },
      ),
    );

    renderWithProviders(<PaymentMethodDetails />, { store });
    expect(screen.queryAllByText('loading', { exact: false })).toHaveLength(3);
    await waitFor(() => {
      expect(
        screen.getByText('Something went wrong loading the payment method!', { exact: false }),
      ).toBeInTheDocument();
    });
  });
});
