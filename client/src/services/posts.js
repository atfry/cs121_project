import { api } from './auth.js';

export const createPost = async (postData) => {
    const resp = await api.post('/posts', postData);
    return resp.data.tweet;
};

export const fetchPosts = async () => {
    const resp = await api.get('/tweets');
    return resp.daat.tweets;
}