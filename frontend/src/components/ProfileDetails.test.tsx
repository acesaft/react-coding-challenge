import { screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';

import { server } from '@/test/server.ts';
import { getAddressString, getPersonString } from '@/utils/common.ts';
import ProfileDetails from '@/components/ProfileDetails';
import { setupStore } from '@/store/store.ts';
import { renderWithProviders } from '@/test/testUtils.tsx';
import { mockProfile } from '@/test/mockData.ts';

describe('ProfileDetails', () => {
  test('it renders a loading message and the address details once fetching the person resolves', async () => {
    const store = setupStore();

    renderWithProviders(<ProfileDetails />, { store });
    expect(screen.getByText('loading profile', { exact: false })).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('Persons', { exact: false })).toBeInTheDocument();
      mockProfile.persons.forEach((person) => {
        expect(screen.getByText(getPersonString(person), { exact: false })).toBeInTheDocument();
      });
      expect(screen.getByText('Addresses', { exact: false })).toBeInTheDocument();
      mockProfile.addresses.forEach((address) => {
        expect(screen.getByText(getAddressString(address), { exact: false })).toBeInTheDocument();
      });
      expect(screen.getByText('Payment Methods', { exact: false })).toBeInTheDocument();
      mockProfile.paymentMethods.forEach((paymentMethod) => {
        expect(screen.getByText(paymentMethod.name, { exact: false })).toBeInTheDocument();
      });
    });
  });

  test('it renders a loading message and an error message if fetching the person fails', async () => {
    const store = setupStore();

    server.use(
      http.get(`${import.meta.env.VITE_USER_ACCOUNT_BACKEND_URL}/profiles/:profileId`, () => {
        return new HttpResponse(null, { status: 500 });
      }),
    );

    renderWithProviders(<ProfileDetails />, { store });
    await waitFor(() => {
      expect(screen.getByText('Something went wrong loading the profile!', { exact: false })).toBeInTheDocument();
    });
  });
});
