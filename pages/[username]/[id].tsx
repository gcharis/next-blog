import axios from 'axios';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { useContext } from 'react';
import { AuthContext } from '../../lib/auth/auth.hook';
import { API_URL } from '../../lib/config';
import { Post } from '../../lib/posts/post';
import PostDetails from '../../lib/posts/post-details.component';

export const getStaticProps: GetStaticProps<{ post: Post }, { id: string }> = async ({
  params,
}) => {
  if (params.id) {
    const { data: post } = await axios.get<Post>(`${API_URL}/posts/${params.id}`);

    return { props: { post }, revalidate: 5 };
  }
  return {
    notFound: true,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

const PostPage = ({ post }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { userId, username } = useContext(AuthContext);

  return (
    <main>
      <PostDetails post={post}></PostDetails>
    </main>
  );
};

export default PostPage;
