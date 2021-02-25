import axios from 'axios';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useContext } from 'react';
import { AuthContext } from '../../lib/auth/auth.hook';
import { API_URL } from '../../lib/config';
import { Post } from '../../lib/posts/post';
import PostDetails from '../../lib/posts/post-details.component';

export const getServerSideProps: GetServerSideProps<
  { post: Post; usernameInView: string },
  { id: string; username: string }
> = async ({ params }) => {
  if (params.id) {
    const { data: post } = await axios.get<Post>(`${API_URL}/posts/${params.id}`);

    return { props: { post, usernameInView: params.username } };
  }
  return {
    notFound: true,
  };
};

const PostPage = ({
  post,
  usernameInView,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { userId, username } = useContext(AuthContext);

  return (
    <main>
      <PostDetails post={post} isUser={userId && usernameInView === username}></PostDetails>
    </main>
  );
};

export default PostPage;
