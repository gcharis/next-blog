import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { Post } from '../lib/posts/post';
import { getAllPosts } from '../lib/posts/service';
import React from 'react';
import PostList from '../lib/posts/post-list.component';

export const getServerSideProps: GetServerSideProps<{ posts: Post[] }> = async ({}) => {
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

const PostsPage = ({ posts }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <main>
      <PostList posts={posts}></PostList>
    </main>
  );
};

export default PostsPage;
