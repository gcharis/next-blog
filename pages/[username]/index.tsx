import axios from 'axios';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import { API_URL } from '../../lib/config';
import { Post } from '../../lib/posts/post';
import PostItem from '../../lib/posts/post-item.component';

export const getStaticProps: GetStaticProps<{ posts: Post[] }, { username: string }> = async ({
  params,
}) => {
  const { data: posts } = await axios.get<Post[]>(`${API_URL}/users/${params.username}/posts`);

  return {
    props: { posts },
    revalidate: 5,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

const UserPosts = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
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
