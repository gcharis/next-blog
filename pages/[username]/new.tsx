import Protected from '../../lib/auth/protected.component';
import NewPostForm from '../../lib/posts/new-post-form.componen';

const NewPost = () => {
  return (
    <main>
      <Protected>
        <NewPostForm></NewPostForm>
      </Protected>
    </main>
  );
};

export default NewPost;
