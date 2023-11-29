import { createSelector } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { UserAccount } from '@/types';

export const userAccountApi = createApi({
  reducerPath: 'userAccountApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_USER_ACCOUNT_BACKEND_URL }),
  endpoints: (builder) => ({
    getUserAccount: builder.query<UserAccount, void>({
      query: () => `/`,
    }),
  }),
});

export const { useGetUserAccountQuery } = userAccountApi;

export const selectUserAccountCounts = createSelector(
  userAccountApi.endpoints.getUserAccount.select(),
  ({ data: userAccount }) => {
    return {
      profileCount: userAccount?.profiles?.length ?? 0,
      personCount: userAccount?.profiles?.reduce((count, profile) => count + profile.persons.length, 0) ?? 0,
      addressCount: userAccount?.profiles?.reduce((count, profile) => count + profile.addresses.length, 0) ?? 0,
      paymentCount: userAccount?.profiles?.reduce((count, profile) => count + profile.paymentMethods.length, 0) ?? 0,
      meterCount:
        userAccount?.profiles?.reduce(
          (count, profile) => count + profile.addresses.reduce((count, address) => count + address.meters.length, 0),
          0,
        ) ?? 0,
    };
  },
);

export const selectUserAccountProfiles = createSelector(
  userAccountApi.endpoints.getUserAccount.select(),
  ({ data: userAccount }) => userAccount?.profiles || [],
);
