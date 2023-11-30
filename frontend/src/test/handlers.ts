import { http, HttpResponse } from 'msw';

import { mockAddresses, mockData, mockPaymentMethods, mockPersons, mockProfile } from '@/test/mockData.ts';

export const handlers = [
  http.get(`${import.meta.env.VITE_USER_ACCOUNT_BACKEND_URL}/`, () => {
    return HttpResponse.json(mockData);
  }),
  http.get(`${import.meta.env.VITE_USER_ACCOUNT_BACKEND_URL}/profiles`, () => {
    return HttpResponse.json([mockProfile]);
  }),
  http.get(`${import.meta.env.VITE_USER_ACCOUNT_BACKEND_URL}/profiles/:profileId`, () => {
    return HttpResponse.json(mockProfile);
  }),
  http.get(`${import.meta.env.VITE_USER_ACCOUNT_BACKEND_URL}/profiles/:profileId/persons/:personId`, () => {
    return HttpResponse.json(mockPersons[0]);
  }),
  http.get(`${import.meta.env.VITE_USER_ACCOUNT_BACKEND_URL}/profiles/:profileId/addresses/:addressId`, () => {
    return HttpResponse.json(mockAddresses[0]);
  }),
  http.get(
    `${import.meta.env.VITE_USER_ACCOUNT_BACKEND_URL}/profiles/:profileId/paymentMethods/:paymentMethodId`,
    () => {
      return HttpResponse.json(mockPaymentMethods[0]);
    },
  ),
  http.delete(`${import.meta.env.VITE_USER_ACCOUNT_BACKEND_URL}/profiles/:id`, () => {
    return HttpResponse.json(mockProfile);
  }),
];
