import { createStyles, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
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

    markdown: {
      maxWidth: '100%',
    },
  }),
);

const PostContentForm: React.FC<{
  initialContent?: string;
  isPreview: boolean;
  onChange: (postContent: string) => void;
}> = ({ initialContent, isPreview, onChange }) => {
  const classes = useStyles();
  const [draftPostContent, setDraftPostContent] = useState(initialContent || '');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDraftPostContent(e.target.value);
    onChange(e.target.value);
  };

  return (
    <>
      {(!isPreview && (
        <textarea
          className={classes.root}
          name="content"
          onChange={handleChange}
          value={draftPostContent}
        ></textarea>
      )) || <ReactMarkdown>{draftPostContent}</ReactMarkdown>}
    </>
  );
};

export default PostContentForm;
