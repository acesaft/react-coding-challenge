import { combineReducers, configureStore, PreloadedState } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { userAccountApi } from '@/store/userAccountApi';

export const combinedReducers = combineReducers({
  [userAccountApi.reducerPath]: userAccountApi.reducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: combinedReducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userAccountApi.middleware),
    preloadedState,
  });
};

export type RootState = ReturnType<typeof combinedReducers>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
export const store = setupStore();
setupListeners(store.dispatch);
