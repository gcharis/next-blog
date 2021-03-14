import {
  Card,
  CardContent,
  CardHeader,
  createStyles,
  Grid,
  Button,
  makeStyles,
} from '@material-ui/core';
import React, { MouseEventHandler, useContext, useState } from 'react';
import { Post } from './post';
import moment from 'moment';
import { AuthContext } from '../auth/auth.hook';
import { getDocumentCookie } from '../auth/auth.service';
import axios from 'axios';
import PostContentForm from './post-content-form.component';
import { resolveUrl } from '../config';
import { useRouter } from 'next/router';
import { updatePost } from './service';

const useStyles = makeStyles((theme) =>
  createStyles({
    author: {
      color: theme.palette.primary.light,
    },
  }),
);

const PostDetails: React.FC<{ post: Post; isUser: boolean }> = ({ post, isUser }) => {
  const classes = useStyles();
  const { userId, username } = useContext(AuthContext);
  const [isPreview, setIsPreview] = useState(true);
  const API_URL = resolveUrl();
  const router = useRouter();

  const [draftPostContent, setDraftPostContent] = useState(post.content);

  const Subheader = (
    <div>
      <span className={classes.author}>{post.author.username}</span>{' '}
      {moment(post.createdAt).format('DD MMMM, YYYY')}.
    </div>
  );

  const handleSubmit: MouseEventHandler = async (e) => {
    e.preventDefault();
    const jwt = getDocumentCookie('auth');
    try {
      await updatePost(post.id, draftPostContent);
      router.push(`/${username}/${post.id}`);
    } catch (e) {
      console.error(e);
    }
  };

  const handleContentChange = (postContent: string) => {
    setDraftPostContent(postContent);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={userId && isUser ? 10 : 12}>
        <Card>
          <CardHeader title={post.title} subheader={Subheader} />
          <CardContent>
            <PostContentForm
              initialContent={post.content}
              isPreview={isPreview}
              onChange={handleContentChange}
            ></PostContentForm>
          </CardContent>
        </Card>
      </Grid>
      {userId === post.author.id && (
        <Grid item xs={12} sm={2}>
          <aside>
            <Grid container spacing={2} direction="column">
              <Grid item>
                <Button
                  variant="contained"
                  color={isPreview ? 'default' : 'primary'}
                  style={{ width: '100%' }}
                  onClick={(e) => setIsPreview((current) => !current)}
                >
                  {isPreview ? 'edit' : 'preview'}
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  type="button"
                  style={{ width: '100%' }}
                  onClick={handleSubmit}
                  disabled={draftPostContent === post.content}
                >
                  Update
                </Button>
              </Grid>
            </Grid>
          </aside>
        </Grid>
      )}
    </Grid>
  );
};

export default PostDetails;
