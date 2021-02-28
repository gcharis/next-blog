import { Card, CardContent, CardHeader, createStyles, makeStyles, Theme } from '@material-ui/core';
import moment from 'moment';
import Link from 'next/link';
import React from 'react';
import ReactMarkdown, { EscapeHtmlProp } from 'react-markdown';
import { Post } from './post';
import strip from 'strip-markdown';
import { RefreshSharp } from '@material-ui/icons';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginBottom: '1rem',
    },
    author: {
      color: theme.palette.primary.dark,
    },
  }),
);

const PostItem: React.FC<{ post: Post }> = ({ post }) => {
  const classes = useStyles();
  const PostAuthor = (
    <>
      By{' '}
      <Link href={`/${post.author.username}`}>
        <a className={classes.author}>{post.author.username}</a>
      </Link>
    </>
  );

  const Subheader = (
    <>
      {PostAuthor}, {moment(post.createdAt).format('DD MMM')}
    </>
  );

  return (
    <Card className={classes.root}>
      <CardHeader title={post.title} subheader={Subheader} />
      <CardContent>
        <Link href={`/${post.author.username}/${post.id}`}>
          <a>
            <ReactMarkdown plugins={[strip]}>{post.content.slice(0, 50) + '...'}</ReactMarkdown>
          </a>
        </Link>
      </CardContent>
    </Card>
  );
};

export default PostItem;
