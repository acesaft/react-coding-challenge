import { http, HttpResponse } from 'msw';

import { mockData, mockProfile } from '@/test/mockData.ts';

export const handlers = [
  http.get(`${import.meta.env.VITE_USER_ACCOUNT_BACKEND_URL}/`, () => {
    return HttpResponse.json(mockData);
  }),
  http.get(`${import.meta.env.VITE_USER_ACCOUNT_BACKEND_URL}/profiles`, () => {
    return HttpResponse.json([mockProfile]);
  }),
  http.delete(`${import.meta.env.VITE_USER_ACCOUNT_BACKEND_URL}/profiles/:id`, () => {
    return HttpResponse.json(mockProfile);
  }),
];
