import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useState } from 'react';
import { getHttpCookie } from '../lib/auth/auth.service';
import Metatags from '../lib/utils/metatags.component';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const jwt = getHttpCookie(req, res, 'auth');
  if (jwt) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

const EnterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`/api/login`, { identifier: email, password });
      router.push('/');
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <>
      <Metatags title="Login" description="Login and discover the world." />
      <main>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">submit</button>
        </form>
      </main>
    </>
  );
};

export default EnterPage;
