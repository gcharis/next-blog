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
import { useContext, useState, MouseEventHandler } from 'react';
import { AuthContext } from '../auth/auth.hook';
import { getDocumentCookie } from '../auth/auth.service';
import { resolveUrl } from '../config';
import PostContentForm from './post-content-form.component';

const useStyles = makeStyles((theme) =>
  createStyles({
    'title-input': {
      fontSize: '1.5rem',
      width: '100%',
      borderRadius: '5px',
      borderColor: 'lightgrey',
      borderStyle: 'solid',

      '&:focus': {
        borderColor: 'lightgrey',
        outline: 'none !important',
      },
    },
  }),
);

export const NewPostForm = () => {
  const [isPreview, setIsPreview] = useState(false);
  const [draftPostContent, setDraftPostContent] = useState('');

  const { userId, username } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const classes = useStyles();
  const router = useRouter();

  const API_URL = resolveUrl();

  const handleSubmit: MouseEventHandler = async (e) => {
    e.preventDefault();
    const jwt = getDocumentCookie('auth');
    try {
      await axios.post(
        `${API_URL}/posts`,
        { title, content: draftPostContent, author: userId },
        { headers: { Authorization: `Bearer ${jwt}` } },
      );

      router.push(`/${username}`);
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleContentChange = (postContent: string) => {
    setDraftPostContent(postContent);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={10}>
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
              <PostContentForm
                isPreview={isPreview}
                onChange={handleContentChange}
              ></PostContentForm>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={2}>
          <aside>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <Button
                  variant="contained"
                  color={isPreview ? 'default' : 'primary'}
                  onClick={(e) => setIsPreview((current) => !current)}
                  style={{ width: '100%' }}
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
                >
                  Create
                </Button>
              </Grid>
            </Grid>
          </aside>
        </Grid>
      </Grid>
    </>
  );
};

export default NewPostForm;
