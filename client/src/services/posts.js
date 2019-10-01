import { api } from './auth.js';

export const createPost = async (postData) => {
  const resp = await api.post('/posts', postData);
  return resp.data.post;
};

export const fetchPosts = async () => {
  const resp = await api.get('/posts');
  return resp.data.post;
}