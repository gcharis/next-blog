import { Grid } from '@material-ui/core';
import React from 'react';
import { Post } from './post';
import PostItem from './post-item.component';

const PostList: React.FC<{ posts: Post[] }> = ({ posts }) => {
  return (
    <Grid container direction="column">
      {posts.map((post) => (
        <Grid item key={post.id}>
          <PostItem post={post}></PostItem>
        </Grid>
      ))}
    </Grid>
  );
};

export default PostList;
