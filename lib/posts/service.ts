import axios from 'axios';
import { getDocumentCookie } from '../auth/auth.service';
import { resolveUrl } from '../config';
import { Post } from './post';

const API_URL = resolveUrl();

export const getAllPosts = async () => {
  const { data } = await axios.get<Post[]>(`${API_URL}/posts`);
  return data;
};

export const getPost = async (postId: string) => {
  const { data } = await axios.get<Post>(`${API_URL}/posts/${postId}`);
  return data;
};

export const getUserPosts = async (username: string) => {
  const { data } = await axios.get<Post[]>(`${API_URL}/users/${username}/posts`);
  return data;
};

export const createNewPost = async (title: string, content: string, userId: string) => {
  const jwt = getDocumentCookie('auth');
  return axios.post(
    `${API_URL}/posts`,
    { title, content, author: userId },
    { headers: { Authorization: `Bearer ${jwt}` } },
  );
};

export const updatePost = async (postId: string, content: string) => {
  const jwt = getDocumentCookie('auth');

  return axios.put(
    `${API_URL}/posts/${postId}`,
    { content },
    { headers: { Authorization: `Bearer ${jwt}` } },
  );
};
