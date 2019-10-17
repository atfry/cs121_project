import { api } from './auth.js';

export const createPost = async (postData) => {
  const resp = await api.post('/posts', postData);
  console.log(resp);
  return resp.data;
};

export const fetchPosts = async () => {
  const resp = await api.get('/posts');
  console.log(resp);
  return resp.data.posts;
}

export const deletePosts = async (id) => {
  const resp = await api.delete(`/posts/${id}`);
  return resp.data;
}

export const updatePosts = async (id, posts) => {
  const resp = await api.put(`/posts/${id}`, { posts });
  return resp.data.posts;
}

export const joinRides = async (userId, postId) => {
  const resp = await api.put(`users/${userId}/posts/${postId}`)
  return resp.data
}