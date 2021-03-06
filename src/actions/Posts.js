import {
  POSTS_RECEIVED,
  POST_SELECT,
  PREVIOUS_POST,
  NEXT_POST,
  PRELOAD_RESET,
  PRELOAD_INIT,
  PRELOAD_COMPLETE,
  TOGGLE_ASPECT_RATIO,
  TOGGLE_AUTO_PLAY
} from "../constants/Posts";

export const requestPosts = ({ board, thread }) => async dispatch => {
  if (typeof window !== "undefined") {
    const req = await fetch(`/api/get/posts/${board}/${thread}`);
    const { posts } = await req.json();
    dispatch({ type: POSTS_RECEIVED, payload: { board, thread, posts } });
  }
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

export const preloadInit = () => ({
  type: PRELOAD_INIT
});

export const preloadReset = () => ({
  type: PRELOAD_RESET
});

export const preloadComplete = () => ({
  type: PRELOAD_COMPLETE
});

export const toggleAspectRatio = () => ({
  type: TOGGLE_ASPECT_RATIO
});

export const toggleAutoPlay = () => ({
  type: TOGGLE_AUTO_PLAY
});
