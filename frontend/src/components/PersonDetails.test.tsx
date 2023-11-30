import { screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';

import { server } from '@/test/server.ts';
import { formatDate } from '@/utils/common.ts';
import PersonDetails from '@/components/PersonDetails';
import { setupStore } from '@/store/store.ts';
import { renderWithProviders } from '@/test/testUtils.tsx';
import { mockPersons } from '@/test/mockData.ts';

describe('PersonDetails', () => {
  test('it renders a loading message and the address details once fetching the person resolves', async () => {
    const store = setupStore();
    const mockData = mockPersons[0];

    renderWithProviders(<PersonDetails />, { store });
    expect(screen.getByText('loading person', { exact: false })).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText(`Salutation: ${mockData.salutation}`, { exact: false })).toBeInTheDocument();
      expect(screen.getByText(`First Name: ${mockData.firstName}`, { exact: false })).toBeInTheDocument();
      expect(screen.getByText(`Last Name: ${mockData.lastName}`, { exact: false })).toBeInTheDocument();
      expect(screen.getByText(`Occupation: ${mockData.occupation}`, { exact: false })).toBeInTheDocument();
      expect(screen.getByText(`Birth Date: ${formatDate(mockData.birthdate)}`, { exact: false })).toBeInTheDocument();
      expect(screen.queryByText(`Primary`, { exact: false })).not.toBeInTheDocument();
    });
  });

  test('it renders a loading message and an error message if fetching the person fails', async () => {
    const store = setupStore();

    server.use(
      http.get(`${import.meta.env.VITE_USER_ACCOUNT_BACKEND_URL}/profiles/:profileId/persons/:personId`, () => {
        return new HttpResponse(null, { status: 500 });
      }),
    );

    renderWithProviders(<PersonDetails />, { store });
    await waitFor(() => {
      expect(screen.getByText('Something went wrong loading the person!', { exact: false })).toBeInTheDocument();
    });
  });
});
