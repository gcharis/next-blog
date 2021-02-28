import Enzyme, { mount, shallow } from 'enzyme';
import PostsPage from '../pages';
import React from 'react';
import { Post } from '../lib/posts/post';
import Link from 'next/link';

describe('PostsPage', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<PostsPage posts={[]} />);

    expect(wrapper).toBeTruthy();
  });

  it('should display a list of posts', () => {
    const posts = [
      {
        id: '1',
        title: 'title1',
      },
      {
        id: '2',
        title: 'title2',
      },
    ] as Post[];

    const wrapper = mount(<PostsPage posts={posts} />);
    const postsElements = wrapper.find('article');

    postsElements.forEach((el, i) => {
      expect(el.find(Link).prop('href')).toStrictEqual({ pathname: `/posts/${posts[i].id}` });
      expect(el.find(Link).text()).toBe(posts[i].title);
    });
    expect(postsElements.length).toBe(2);
  });

  it('should have a link to go to the users posts', () => {
    const wrapper = shallow(<PostsPage posts={[]} />);

    expect(wrapper.find(Link).prop('href')).toStrictEqual({ pathname: `/user/posts` });
  });
});
