import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Link from 'next/link';
import { Post } from '../../lib/posts/post';
import PostItem from '../../lib/posts/post-item.component';
import { getUserPosts } from '../../lib/posts/service';
import Metatags from '../../lib/utils/metatags.component';

export const getServerSideProps: GetServerSideProps<
  { posts: Post[]; username: string },
  { username: string }
> = async ({ params }) => {
  const posts = await getUserPosts(params.username);

  if (!posts?.length) {
    return {
      notFound: true,
    };
  }

  return {
    props: { posts, username: params.username },
  };
};

const UserPosts = ({ posts, username }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Metatags title={username} description={username} />
      <main>
        {posts.map((post) => (
          <PostItem key={post.id} post={post}>
            <Link href={`/posts/${post.id}`}>{post.title}</Link>
          </PostItem>
        ))}
      </main>
    </>
  );
};

export default UserPosts;
