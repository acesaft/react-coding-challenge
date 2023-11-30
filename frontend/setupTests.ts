import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import { expect, afterEach } from 'vitest';
import '@testing-library/jest-dom/vitest';

import { store } from '@/store/store.ts';
import { api } from '@/store/api.ts';
import { server } from '@/test/server.ts';

expect.extend(matchers);

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
  store.dispatch(api.util.resetApiState());
});

afterAll(() => server.close());

afterEach(() => {
  cleanup();
});
