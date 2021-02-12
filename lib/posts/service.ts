import axios from 'axios';
import { API_URL } from '../config';
import { Post } from './post';

export const getAllPosts = async () => {
  const res = await axios.get<Post[]>(`${API_URL}/posts`);
  return res.data;
};
