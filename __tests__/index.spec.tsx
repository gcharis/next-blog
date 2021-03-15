import { mount, shallow } from 'enzyme';
import PostsPage from '../pages';
import React from 'react';
import { Post } from '../lib/posts/post';
import Link from 'next/link';
import PostItem from '../lib/posts/post-item.component';
import { CardContent, CardHeader } from '@material-ui/core';

describe('PostsPage', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<PostsPage posts={[]} />);

    expect(wrapper).toBeTruthy();
  });

  describe('rendered post list', () => {
    let posts: Post[];
    beforeEach(() => {
      posts = [
        {
          id: '1',
          title: 'title1',
          author: {
            id: '1',
            username: 'charis',
          },
          content: 'Super post',
        },
        {
          id: '2',
          title: 'title2',
          author: {
            id: '1',
            username: 'charis',
          },
          content: 'Super post',
        },
      ] as Post[];
    });

    it('should display the correct length of items', () => {
      const wrapper = mount(<PostsPage posts={posts} />);
      const postItems = wrapper.find(PostItem);

      expect(postItems.length).toBe(2);
    });

    it('rendered post items should contain one link to the user and one to the post', () => {
      const wrapper = mount(<PostsPage posts={posts} />);
      const postItems = wrapper.find(PostItem);

      postItems.forEach((el, i) => {
        const post = posts[i];
        expect(el.find(CardHeader).find(Link).prop('href')).toStrictEqual(
          `/${post.author.username}`,
        );
        expect(el.find(CardContent).find(Link).prop('href')).toStrictEqual(
          `/${post.author.username}/${post.id}`,
        );
      });
    });
  });
});
