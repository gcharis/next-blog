import {
  Button,
  Card,
  CardContent,
  CardHeader,
  createStyles,
  Grid,
  makeStyles,
} from '@material-ui/core';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useContext, useMemo, useState } from 'react';
import { AuthContext } from '../auth/auth.hook';
import { getDocumentCookie } from '../auth/auth.service';
import { Post } from './post';
import PostContentForm from './post-content-form.component';

const useStyles = makeStyles((theme) =>
  createStyles({
    'title-input': {
      fontSize: '1.5rem',
      width: '100%',
      borderRadius: '5px',
      borderColor: 'lightgrey',

      '&:focus': {
        borderColor: 'lightgrey',
        outline: 'none !important',
      },
    },
  }),
);

export const NewPostForm = () => {
  const [isPreview, setIsPreview] = useState(false);
  const { userId, username } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const classes = useStyles();
  const router = useRouter();

  const onSubmit = ({ content }: Partial<Post>) => {
    const jwt = getDocumentCookie('auth');
    try {
      axios.post(
        `http://localhost:1337/posts`,
        { title, content, author: userId },
        { headers: { Authorization: `Bearer ${jwt}` } },
      );

      router.push(`/${username}`);
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <Card>
            <CardHeader
              title={
                isPreview ? (
                  title
                ) : (
                  <input
                    className={classes['title-input']}
                    placeholder="New title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                )
              }
            />
            <CardContent>
              <PostContentForm isPreview={isPreview} onSubmit={onSubmit}></PostContentForm>
            </CardContent>
          </Card>
        </Grid>
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
      </Grid>
    </>
  );
};

export default NewPostForm;
