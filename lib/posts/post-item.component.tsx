import { Card, CardContent, CardHeader, createStyles, makeStyles, Theme } from '@material-ui/core';
import moment from 'moment';
import Link from 'next/link';
import React from 'react';
import { Post } from './post';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginBottom: '1rem',
    },
  }),
);

const PostItem: React.FC<{ post: Post }> = ({ post }) => {
  const classes = useStyles();
  const PostAuthor = (
    <Link href={`/${post.author.username}`}>
      <a>By {post.author.username}</a>
    </Link>
  );

  const subheader = moment(post.createdAt).format('DD MMMM YYYY, hh:mm');

  return (
    <Card className={classes.root}>
      <CardHeader title={PostAuthor} subheader={subheader} />
      <CardContent>
        <Link href={`/${post.author.username}/${post.id}`}>{post.title}</Link>
      </CardContent>
    </Card>
  );
};

export default PostItem;
