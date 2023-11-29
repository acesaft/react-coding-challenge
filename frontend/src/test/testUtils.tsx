import { AppStore, combinedReducers, RootState } from '@/store/store.ts';
import { configureStore, PreloadedState } from '@reduxjs/toolkit';
import { render, RenderOptions } from '@testing-library/react';
import React, { PropsWithChildren, ReactElement } from 'react';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { Provider } from 'react-redux';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = configureStore({ reducer: combinedReducers, preloadedState }),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  setupListeners(store.dispatch);

  const Wrapper = ({ children }: PropsWithChildren<{}>): ReactElement => {
    return <Provider store={store}>{children}</Provider>;
  };

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
