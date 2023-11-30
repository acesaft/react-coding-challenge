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
    expect(screen.getByText('loading payment method', { exact: false })).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText(`Name: ${mockData.name}`, { exact: false })).toBeInTheDocument();
      expect(screen.getByText(`IBAN: ${mockData.iban}`, { exact: false })).toBeInTheDocument();
      expect(screen.getByText(`bic: ${mockData.bic}`, { exact: false })).toBeInTheDocument();
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
    await waitFor(() => {
      expect(
        screen.getByText('Something went wrong loading the payment method!', { exact: false }),
      ).toBeInTheDocument();
    });
  });
});
