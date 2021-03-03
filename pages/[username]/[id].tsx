import axios from 'axios';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { useContext } from 'react';
import { AuthContext } from '../../lib/auth/auth.hook';
import { resolveUrl } from '../../lib/config';
import { Post } from '../../lib/posts/post';
import PostDetails from '../../lib/posts/post-details.component';

export const getStaticProps: GetStaticProps<
  { post: Post; usernameInView: string },
  { id: string; username: string }
> = async ({ params }) => {
  const API_URL = resolveUrl();

  if (params.id) {
    const { data: post } = await axios.get<Post>(`${API_URL}/posts/${params.id}`);

    return { props: { post, usernameInView: params.username }, revalidate: 5 };
  }
  return {
    notFound: true,
  };
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  const API_URL = resolveUrl();

  const { data: posts } = await axios.get<Post[]>(`${API_URL}/posts`);
  const paths = posts.map((post) => ({
    params: { username: post.author.username, id: post.id },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

const PostPage = ({ post, usernameInView }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { userId, username } = useContext(AuthContext);
  const API_URL = resolveUrl();

  return (
    <main>
      <PostDetails post={post} isUser={userId && usernameInView === username}></PostDetails>
    </main>
  );
};

export default PostPage;
