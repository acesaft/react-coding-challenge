import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { userAccountApi } from '@/store/userAccountApi';

export const store = configureStore({
  reducer: {
    [userAccountApi.reducerPath]: userAccountApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userAccountApi.middleware),
})

setupListeners(store.dispatch)
