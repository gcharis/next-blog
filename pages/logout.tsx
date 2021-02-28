import { GetServerSideProps } from 'next';
import { deleteHttpCookie } from '../lib/auth/auth.service';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  deleteHttpCookie(req, res, 'auth');
  deleteHttpCookie(req, res, 'uid');
  deleteHttpCookie(req, res, 'username');

  return {
    redirect: {
      destination: '/',
      statusCode: 302,
    },
  };
};

const LogoutPage = ({}) => {
  return <main>loading...</main>;
};

export default LogoutPage;
