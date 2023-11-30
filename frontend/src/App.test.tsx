import { screen, waitFor, fireEvent } from '@testing-library/react';
import { http, HttpResponse } from 'msw';

import { App } from '@/App';
import { setupStore } from '@/store/store.ts';
import { server } from '@/test/server.ts';
import { renderWithProviders } from '@/test/testUtils.tsx';
import { mockData, mockProfile } from '@/test/mockData.ts';

const expectUserAccount = () => {
  expect(screen.getByText(`Email: ${mockData.email}`, { exact: false })).toBeInTheDocument();
  expect(screen.getByText('Profiles: 1', { exact: false })).toBeInTheDocument();
  expect(screen.getByText('Persons: 2', { exact: false })).toBeInTheDocument();
  expect(screen.getByText('Addresses: 5', { exact: false })).toBeInTheDocument();
  expect(screen.getByText('Payment Methods: 5', { exact: false })).toBeInTheDocument();
  expect(screen.getByText('Meters: 4', { exact: false })).toBeInTheDocument();
};

describe('App', () => {
  test('it renders loading and the user account details if fetching the userAccount resolves', async () => {
    const store = setupStore();

    renderWithProviders(<App />, { store });
    expect(screen.getByText('loading user account', { exact: false })).toBeInTheDocument();
    expect(screen.getByText('loading profiles', { exact: false })).toBeInTheDocument();
    await waitFor(() => {
      expectUserAccount();
      mockData.profiles?.forEach((profile) => {
        expect(screen.getByText(profile.name, { exact: false })).toBeInTheDocument();
      });
    });
  });

  test('it renders loading and an error message if fetching the userAccount fails', async () => {
    const store = setupStore();

    server.use(
      http.get(`${import.meta.env.VITE_USER_ACCOUNT_BACKEND_URL}/`, () => {
        return new HttpResponse(null, { status: 500 });
      }),
    );

    renderWithProviders(<App />, { store });
    expect(screen.getByText('loading user account', { exact: false })).toBeInTheDocument();
    expect(screen.getByText('loading profiles', { exact: false })).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('Something went wrong loading the user account!', { exact: false })).toBeInTheDocument();
      expect(screen.getByText('Marlo_Reiber', { exact: false })).toBeInTheDocument();
    });
  });

  test('it renders loading and an error message if fetching the profiles fails', async () => {
    const store = setupStore();

    server.use(
      http.get(`${import.meta.env.VITE_USER_ACCOUNT_BACKEND_URL}/profiles`, () => {
        return new HttpResponse(null, { status: 500 });
      }),
    );

    renderWithProviders(<App />, { store });
    expect(screen.getByText('loading user account', { exact: false })).toBeInTheDocument();
    expect(screen.getByText('loading profiles', { exact: false })).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('Something went wrong loading the profiles!', { exact: false })).toBeInTheDocument();
      expectUserAccount();
    });
  });

  test('clicking the delete button of a profile will remove it and reloads the user account data if successful', async () => {
    const store = setupStore();

    server.use(
      http.delete(`${import.meta.env.VITE_USER_ACCOUNT_BACKEND_URL}/profiles/:id`, () => {
        return HttpResponse.json(mockProfile);
      }),
    );

    renderWithProviders(<App />, { store });
    await waitFor(() => expect(screen.getByText('Marlo_Reiber', { exact: false })).toBeInTheDocument());

    const deleteButton = screen.getByRole('button', { name: 'delete Marlo_Reiber' });
    expect(deleteButton).toBeInTheDocument();
    expect(screen.getByText('Marlo_Reiber', { exact: false })).toBeInTheDocument();
    fireEvent.click(deleteButton);
    await waitFor(() => {
      expect(screen.getByText('loading user account', { exact: false })).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: 'delete Marlo_Reiber' })).not.toBeInTheDocument();
      expect(screen.queryByText('Marlo_Reiber', { exact: false })).not.toBeInTheDocument();
    });
  });
});
