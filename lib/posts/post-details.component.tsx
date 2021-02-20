import {
  Card,
  CardContent,
  CardHeader,
  createStyles,
  Grid,
  Button,
  makeStyles,
  SvgIcon,
} from '@material-ui/core';
import React, { useContext } from 'react';
import { Post } from './post';
import moment from 'moment';
import { AuthContext } from '../auth/auth.hook';
import ReactMarkdown from 'react-markdown';
import { EditSharp } from '@material-ui/icons';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {},
    author: {
      color: theme.palette.primary.light,
    },
    options: {},
  }),
);

const PostDetails: React.FC<{ post: Post }> = ({ post }) => {
  const classes = useStyles();
  const { userId } = useContext(AuthContext);

  const Subheader = (
    <div>
      <span className={classes.author}>{post.author.username}</span>{' '}
      {moment(post.createdAt).format('DD MMMM, YYYY')}.
    </div>
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={10}>
        <Card className={classes.root}>
          <CardHeader title={post.title} subheader={Subheader} />
          <CardContent>
            <ReactMarkdown>{post?.content}</ReactMarkdown>
          </CardContent>
        </Card>
      </Grid>
      <Grid item>
        <aside>
          <Button color="primary">preview</Button>
        </aside>
      </Grid>
    </Grid>
  );
};

export default PostDetails;
