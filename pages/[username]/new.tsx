import { GetServerSideProps } from 'next';
import { getHttpCookie } from '../../lib/auth/auth.service';
import NewPostForm from '../../lib/posts/new-post-form.componen';
import Metatags from '../../lib/utils/metatags.component';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const jwt = getHttpCookie(req, res, 'auth');

  if (!jwt) {
    return {
      redirect: {
        destination: '/login',
        statusCode: 302,
      },
    };
  }

  return {
    props: {},
  };
};

const NewPost = () => {
  return (
    <>
      <Metatags title="Create a new post" description="Create a new post" />
      <main>
        <NewPostForm></NewPostForm>
      </main>
    </>
  );
};

export default NewPost;
