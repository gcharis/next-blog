import '../styles/globals.css';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import { AuthContext, useAuth } from '../lib/auth/auth.hook';
import Navbar from '../lib/layout/navbar.component';
import Palette from '../lib/material/theme-provider.component';
import { Container } from '@material-ui/core';
import LoadingSuspense from '../lib/material/loader';
import { Suspense } from 'react';

export function reportWebVitals(metric) {
  console.log(metric);
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { userId, authToken } = useAuth();

  return (
    <AuthContext.Provider value={{ userId, authToken }}>
      <Palette>
        <Navbar />
        <Container style={{ marginTop: '100px' }}>
          <LoadingSuspense fallback={<div>loading...</div>}>
            <Component {...pageProps} />
          </LoadingSuspense>
        </Container>
      </Palette>
    </AuthContext.Provider>
  );
};

export default MyApp;
