import { GetServerSideProps } from 'next';
import { deleteCookie } from '../lib/auth/auth.service';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  deleteCookie(req, res, 'auth');
  deleteCookie(req, res, 'uid');

  return {
    redirect: {
      destination: '/posts',
      statusCode: 302,
    },
  };
};

const LogoutPage = ({}) => {
  return <main></main>;
};

export default LogoutPage;
