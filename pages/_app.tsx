import '../styles/globals.css';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import { AuthContext, useAuth } from '../lib/auth/auth.hook';
import Logout from '../lib/auth/logout.component';
import Navbar from '../lib/layout/navbar.component';
import Palette from '../lib/material/theme-provider.component';
import { Container } from '@material-ui/core';

export function reportWebVitals(metric) {
  console.log(metric);
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  console.warn('app init');

  const { userId, authToken } = useAuth();

  return (
    <AuthContext.Provider value={{ userId, authToken }}>
      <Palette>
        <Navbar />
        <Container style={{ marginTop: '100px' }}>
          <Component {...pageProps} />
        </Container>
      </Palette>
    </AuthContext.Provider>
  );
};

export default MyApp;
