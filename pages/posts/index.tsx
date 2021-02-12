import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { Post } from '../../lib/posts/post';
import { getAllPosts } from '../../lib/posts/service';
import Link from 'next/link';
import { useContext } from 'react';
import { AuthContext } from '../../lib/auth/auth.hook';
import { useRouter } from 'next/router';

export const getStaticProps: GetStaticProps<{ posts: Post[] }> = async ({}) => {
  console.warn('page init');
  try {
    const posts = await getAllPosts();
    return {
      props: {
        posts,
      },
    };
  } catch (e) {
    console.log(e.message);
    return {
      notFound: true,
    };
  }
};

const PostsPage = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  return (
    <main>
      {posts.map((post) => (
        <article key={post.id}>
          <Link href={{ pathname: `/posts/${post.id}` }}>{post.title}</Link>
        </article>
      ))}
      <br />
      <Link href={{ pathname: `/user/posts` }}>My posts</Link>
    </main>
  );
};

export default PostsPage;
