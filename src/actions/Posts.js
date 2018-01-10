import {
  POSTS_RECEIVED,
  POST_SELECT,
  PREVIOUS_POST,
  NEXT_POST
} from "../constants/Posts";

export const requestPosts = ({ board, thread }) => async dispatch => {
  const req = await fetch(`/api/get/posts/${board}/${thread}`);
  const { posts } = await req.json();
  dispatch({ type: POSTS_RECEIVED, payload: { board, thread, posts } });
};

export const selectPostByIndex = index => ({
  type: POST_SELECT,
  payload: { index }
});

export const previousPost = () => ({
  type: PREVIOUS_POST
});

export const nextPost = () => ({
  type: NEXT_POST
});
