import '../styles/globals.css';
import { AuthContext, useAuth } from '../lib/auth/auth.hook';
import Navbar from '../lib/layout/navbar.component';
import Palette from '../lib/material/theme-provider.component';
import LoadingSuspense from '../lib/material/loading-suspense';
import ContentContainer from '../lib/layout/content-container.component';
import type { AppProps } from 'next/app';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { userId, authToken, username } = useAuth();

  return (
    <AuthContext.Provider value={{ userId, authToken, username }}>
      <Palette>
        <Navbar />
        <ContentContainer>
          <LoadingSuspense fallback={<div>loading...</div>}>
            <Component {...pageProps} />
          </LoadingSuspense>
        </ContentContainer>
      </Palette>
    </AuthContext.Provider>
  );
};

export default MyApp;
