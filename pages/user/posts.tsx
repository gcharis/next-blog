import axios from 'axios';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Link from 'next/link';
import { getHttpCookie } from '../../lib/auth/auth.service';
import { API_URL } from '../../lib/config';
import { Post } from '../../lib/posts/post';

export const getServerSideProps: GetServerSideProps<{ posts: Post[] }> = async ({ req, res }) => {
  const jwt = getHttpCookie(req, res, 'auth');

  try {
    if (!jwt) {
      throw new Error('Unauthorized');
    }
    const { data: posts } = await axios.get<Post[]>(`${API_URL}/user/posts`, {
      headers: {
        authorization: 'Bearer ' + jwt,
      },
    });

    return {
      props: { posts },
    };
  } catch (e) {
    console.error(e.message);
    return {
      redirect: {
        destination: '/enter',
        permanent: false,
      },
    };
  }
};

const UserPosts = ({ posts }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <main>
      {posts.map((post) => (
        <article key={post.id}>
          <Link href={`/posts/${post.id}`}>{post.title}</Link>
        </article>
      ))}
    </main>
  );
};

export default UserPosts;
