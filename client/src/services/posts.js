import { api } from './auth.js';

export const createPost = async (postData) => {
  const resp = await api.post('/posts', postData);
  console.log(resp);
  return resp.data;
};

export const fetchPosts = async () => {
  const resp = await api.get('/posts');
  console.log(resp);
  return resp.data;
}