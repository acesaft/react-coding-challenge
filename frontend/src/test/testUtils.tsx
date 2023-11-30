import React, { PropsWithChildren, ReactElement } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { AppStore, combinedReducers, RootState } from '@/store/store.ts';
import { configureStore, PreloadedState } from '@reduxjs/toolkit';
import { render, RenderOptions } from '@testing-library/react';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
  route?: string;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = configureStore({ reducer: combinedReducers, preloadedState }),
    route = '/',
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  setupListeners(store.dispatch);

  const Wrapper = ({ children }: PropsWithChildren<{}>): ReactElement => {
    return (
      <MemoryRouter initialEntries={[route]}>
        <Provider store={store}>{children}</Provider>
      </MemoryRouter>
    );
  };

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
