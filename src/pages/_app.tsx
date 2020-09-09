import { AppInitialProps } from 'next/app';
import { NextComponentType } from 'next';
import { ThemeProvider } from 'styled-components';
import React, { ReactElement } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import { theme } from '../themes/default';
import { GlobalStyle } from '../themes/global';
import { AuthProvider } from '../providers/auth.provider';

export type AppProps = Record<string, unknown> & AppInitialProps;

export default function App({
  Component,
  pageProps,
}: AppProps & {
  Component: NextComponentType;
}): ReactElement {
  return (
    <>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Component {...pageProps} />
        </ThemeProvider>
      </AuthProvider>
    </>
  );
}
