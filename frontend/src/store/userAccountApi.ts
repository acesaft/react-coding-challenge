import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { UserAccount } from '@/types';

export const userAccountApi = createApi({
  reducerPath: 'userAccountApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
  endpoints: (builder) => ({
    getUserAccount: builder.query<UserAccount, void>({
      query: () => `/`,
    }),
  }),
});

export const { useGetUserAccountQuery } = userAccountApi;
