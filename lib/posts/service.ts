import axios from 'axios';
import { resolveUrl } from '../config';
import { Post } from './post';

const API_URL = resolveUrl();

export const getAllPosts = async () => {
  const res = await axios.get<Post[]>(`${API_URL}/posts`);
  return res.data;
};
