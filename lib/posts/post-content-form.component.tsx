import { Button, createStyles, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { Post } from './post';
import ReactMarkdown from 'react-markdown';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      height: '60vh',
      padding: '0.5rem',
      fontSize: '1.25rem',
      width: '100%',
      outline: 'none',
      border: '2px solid lightgrey',
      borderRadius: '5px',
    },
    'update-button': {
      width: '100%',
    },

    markdown: {
      maxWidth: '100%',
    },
  }),
);

const PostContentForm: React.FC<{
  post?: Post;
  isPreview: boolean;
  onSubmit: (post: Partial<Post>) => void;
  btnLabel: string;
}> = ({ post, isPreview, onSubmit, btnLabel }) => {
  const classes = useStyles();
  const [draftPostContent, setDraftPostContent] = useState(post?.content || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ content: draftPostContent });
  };

  return (
    <>
      {(!isPreview && (
        <form onSubmit={handleSubmit}>
          <textarea
            className={classes.root}
            name="content"
            onChange={(e) => setDraftPostContent(e.target.value)}
            value={draftPostContent}
          ></textarea>
          <Button variant="contained" className={classes['update-button']} type="submit">
            {btnLabel}
          </Button>
        </form>
      )) || <ReactMarkdown>{draftPostContent}</ReactMarkdown>}
    </>
  );
};

export default PostContentForm;
