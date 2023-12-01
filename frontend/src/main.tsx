import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import theme from '@/theme.ts';
import { App } from '@/App';
import { store } from '@/store/store.ts';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <CssBaseline />
      <App />
    </Provider>
  </ThemeProvider>,
);
