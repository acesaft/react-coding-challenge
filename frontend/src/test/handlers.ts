import { http, HttpResponse } from 'msw';

import { userAccountMock } from '@/test/userAccountMock';

export const handlers = [
  http.get(`${import.meta.env.VITE_USER_ACCOUNT_BACKEND_URL}/`, () => {
    return HttpResponse.json(userAccountMock);
  }),
];
