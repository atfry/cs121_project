import { api } from './auth.js';

export const createPost = async (postData) => {
  console.log(postData);
  const resp = await api.post('/posts', postData);
  console.log(resp.data);
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
  console.log(posts);
  const resp = await api.put(`/posts/${id}`, { posts });
  return resp.data.post;
}

// The function for joining a ride adds an entry to the postgroups database
// and changes the number of riders in the post database
export const joinRides = async (joinData, posts) => {
  console.log(posts);
  const resp = await api.post('/postgroups', joinData);
  const resp2 = await api.put(`/posts/${joinData.post_id}`, {posts});
  console.log(resp2);
  return resp.data;
};

// This function gets all of the entries from the postgroups database
export const fetchJoinedRides = async () => {
  const resp = await api.get('/postgroups');
  console.log(resp);
  return resp.data.posts;
}

// The function for leaving a ride gets rid of an entry in the postgroups database
// and increments the number of riders in the posts database
export const leaveRide = async (id, posts, post_id) => {
  const resp = await api.delete(`/postgroups/${id}`);
  const resp2 = await api.put(`/posts/${post_id}`, {posts});
  return resp.data;
}