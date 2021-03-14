import axios from 'axios';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Link from 'next/link';
import { resolveUrl } from '../../lib/config';
import { Post } from '../../lib/posts/post';
import PostItem from '../../lib/posts/post-item.component';
import { getUserPosts } from '../../lib/posts/service';

export const getServerSideProps: GetServerSideProps<
  { posts: Post[] },
  { username: string }
> = async ({ params }) => {
  const posts = await getUserPosts(params.username);

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
