import axios from 'axios';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Link from 'next/link';
import { resolveUrl } from '../../lib/config';
import { Post } from '../../lib/posts/post';
import PostItem from '../../lib/posts/post-item.component';

export const getServerSideProps: GetServerSideProps<
  { posts: Post[] },
  { username: string }
> = async ({ params }) => {
  const API_URL = resolveUrl();

  const { data: posts } = await axios.get<Post[]>(`${API_URL}/users/${params.username}/posts`);

  if (!posts?.length) {
    return {
      notFound: true,
    };
  }

  return {
    props: { posts },
  };
};

const UserPosts = ({ posts }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const API_URL = resolveUrl();

  return (
    <main>
      {posts.map((post) => (
        <PostItem key={post.id} post={post}>
          <Link href={`/posts/${post.id}`}>{post.title}</Link>
        </PostItem>
      ))}
    </main>
  );
};

export default UserPosts;
