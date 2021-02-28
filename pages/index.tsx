import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { Post } from '../lib/posts/post';
import { getAllPosts } from '../lib/posts/service';
import React from 'react';
import PostList from '../lib/posts/post-list.component';

export const getStaticProps: GetStaticProps<{ posts: Post[] }> = async ({}) => {
  try {
    const posts = await getAllPosts();
    return {
      props: {
        posts,
      },
      revalidate: 5,
    };
  } catch (e) {
    console.log(e.message);
    return {
      notFound: true,
    };
  }
};

const PostsPage = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <main>
      <PostList posts={posts}></PostList>
    </main>
  );
};

export default PostsPage;
