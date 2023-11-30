import { createSelector } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { Profile, UserAccount } from '@/types';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_USER_ACCOUNT_BACKEND_URL }),
  tagTypes: ['Profile', 'UserAccount'],
  endpoints: (builder) => ({
    getUserAccount: builder.query<UserAccount, void>({
      query: () => `/`,
      providesTags: ['UserAccount'],
    }),
    getProfiles: builder.query<Profile[], void>({
      query: () => `/profiles`,
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Profile' as const, id })), { type: 'Profile', id: 'LIST' }]
          : [{ type: 'Profile', id: 'LIST' }],
    }),
    deleteProfile: builder.mutation<Profile, string>({
      query: (id) => ({
        url: `/profiles/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: 'Profile', id: arg }, 'UserAccount'],
    }),
  }),
});

export const { useGetUserAccountQuery, useGetProfilesQuery, useDeleteProfileMutation } = api;

export const selectUserAccountCounts = createSelector(
  api.endpoints.getUserAccount.select(),
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
