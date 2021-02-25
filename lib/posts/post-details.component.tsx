import {
  Card,
  CardContent,
  CardHeader,
  createStyles,
  Grid,
  Button,
  makeStyles,
} from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { Post } from './post';
import moment from 'moment';
import { AuthContext } from '../auth/auth.hook';
import { getDocumentCookie } from '../auth/auth.service';
import axios from 'axios';
import PostContentForm from './post-content-form.component';

const useStyles = makeStyles((theme) =>
  createStyles({
    author: {
      color: theme.palette.primary.light,
    },
  }),
);

const PostDetails: React.FC<{ post: Post; isUser: boolean }> = ({ post, isUser }) => {
  const classes = useStyles();
  const { userId } = useContext(AuthContext);
  const [isPreview, setIsPreview] = useState(true);

  const Subheader = (
    <div>
      <span className={classes.author}>{post.author.username}</span>{' '}
      {moment(post.createdAt).format('DD MMMM, YYYY')}.
    </div>
  );

  const onSubmit = ({ content }: Partial<Post>) => {
    const jwt = getDocumentCookie('auth');
    axios.put(
      `http://localhost:1337/posts/${post.id}`,
      { content },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      },
    );
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={userId && isUser ? 10 : 12}>
        <Card>
          <CardHeader title={post.title} subheader={Subheader} />
          <CardContent>
            <PostContentForm
              post={post}
              isPreview={isPreview}
              onSubmit={onSubmit}
            ></PostContentForm>
          </CardContent>
        </Card>
      </Grid>
      {userId === post.author.id && (
        <Grid item>
          <aside>
            <Button
              variant="contained"
              color={isPreview ? 'default' : 'primary'}
              onClick={(e) => setIsPreview((current) => !current)}
            >
              {isPreview ? 'edit' : 'preview'}
            </Button>
          </aside>
        </Grid>
      )}
    </Grid>
  );
};

export default PostDetails;
