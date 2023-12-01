import { screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';

import { server } from '@/test/server';
import { formatDate } from '@/utils/common';
import PersonDetails from '@/components/PersonDetails';
import { setupStore } from '@/store/store';
import { renderWithProviders } from '@/test/testUtils';
import { mockPersons } from '@/test/mockData';

describe('PersonDetails', () => {
  test('it renders a loading message and the address details once fetching the person resolves', async () => {
    const store = setupStore();
    const mockData = mockPersons[0];

    renderWithProviders(<PersonDetails />, { store });
    expect(screen.queryAllByText('loading', { exact: false })).toHaveLength(5);
    await waitFor(() => {
      expect(screen.getByText(`Salutation:`, { exact: false })).toBeInTheDocument();
      expect(screen.getByText(mockData.salutation, { exact: false })).toBeInTheDocument();
      expect(screen.getByText(`First Name:`, { exact: false })).toBeInTheDocument();
      expect(screen.getByText(mockData.firstName, { exact: false })).toBeInTheDocument();
      expect(screen.getByText(`Last Name:`, { exact: false })).toBeInTheDocument();
      expect(screen.getByText(mockData.lastName, { exact: false })).toBeInTheDocument();
      expect(screen.getByText(`Occupation:`, { exact: false })).toBeInTheDocument();
      expect(screen.getByText(mockData.occupation, { exact: false })).toBeInTheDocument();
      expect(screen.getByText(`Birth Date:`, { exact: false })).toBeInTheDocument();
      expect(screen.getByText(formatDate(mockData.birthdate), { exact: false })).toBeInTheDocument();
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
    expect(screen.queryAllByText('loading', { exact: false })).toHaveLength(5);
    await waitFor(() => {
      expect(screen.getByText('Something went wrong loading the person!', { exact: false })).toBeInTheDocument();
    });
  });
});
