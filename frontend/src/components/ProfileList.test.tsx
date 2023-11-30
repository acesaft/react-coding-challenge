import { fireEvent, screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';

import ProfileList from '@/components/ProfileList';
import { setupStore } from '@/store/store.ts';
import { renderWithProviders } from '@/test/testUtils.tsx';
import { server } from '@/test/server.ts';
import { mockData, mockProfile } from '@/test/mockData.ts';

describe('UserAccount', () => {
  test('it renders a loading message and the profiles details once fetching the profiles resolves', async () => {
    const store = setupStore();

    renderWithProviders(<ProfileList />, { store });
    expect(screen.getByText('loading profiles', { exact: false })).toBeInTheDocument();
    await waitFor(() => {
      mockData.profiles?.forEach((profile) => {
        expect(screen.getByText(profile.name, { exact: false })).toBeInTheDocument();
      });
    });
  });

  test('it renders  a loading message and the profiles details if fetching the profiles fails', async () => {
    const store = setupStore();

    server.use(
      http.get(`${import.meta.env.VITE_USER_ACCOUNT_BACKEND_URL}/profiles`, () => {
        return new HttpResponse(null, { status: 500 });
      }),
    );

    renderWithProviders(<ProfileList />, { store });
    expect(screen.getByText('loading profiles', { exact: false })).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('Something went wrong loading the profiles!', { exact: false })).toBeInTheDocument();
    });
  });

  test('clicking the delete button of a profile will remove it', async () => {
    const store = setupStore();

    server.use(
      http.delete(`${import.meta.env.VITE_USER_ACCOUNT_BACKEND_URL}/profiles/:id`, () => {
        return HttpResponse.json(mockProfile);
      }),
    );

    renderWithProviders(<ProfileList />, { store });
    await waitFor(() => expect(screen.getByText('Marlo_Reiber', { exact: false })).toBeInTheDocument());

    const deleteButton = screen.getByRole('button', { name: 'delete Marlo_Reiber' });
    expect(deleteButton).toBeInTheDocument();
    expect(screen.getByText('Marlo_Reiber', { exact: false })).toBeInTheDocument();
    fireEvent.click(deleteButton);
    await waitFor(() => {
      expect(screen.queryByRole('button', { name: 'delete Marlo_Reiber' })).not.toBeInTheDocument();
      expect(screen.queryByText('Marlo_Reiber', { exact: false })).not.toBeInTheDocument();
    });
  });
});
