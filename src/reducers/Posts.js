import {
  POSTS_RECEIVED,
  POST_SELECT,
  PREVIOUS_POST,
  NEXT_POST,
  PRELOAD_RESET,
  PRELOAD_INIT,
  PRELOAD_COMPLETE,
  TOGGLE_ASPECT_RATIO,
  TOGGLE_AUTO_PLAY,
  PRELOAD_STATES
} from "../constants/Posts";
import { toggleAspectRatio } from "../actions/Posts";

const initial = {
  posts: [],
  selected: undefined,
  next: false,
  back: false,
  preload: PRELOAD_STATES.UNINITIALIZED,
  aspect_ratio: "contain",
  autoplay: false,
  autoplayTime: 5 * 1000
};

const transformPosts = ({ board, thread, posts }) => {
  const filtered = posts.filter(({ tim }) => typeof tim !== "undefined");
  const transformed = filtered.map(item => ({
    name: `${item.tim}${item.ext}`,
    ext: item.ext,
    image: `/api/get/media/${board}/${item.tim}${item.ext}`,
    thumbnail: `/api/get/media/${board}/${item.tim}s.jpg`
  }));
  return transformed;
};

const getSelectedSubState = ({ posts, index = 0 }) => {
  if (index < 0) {
    index = posts.length - 1;
  } else if (index > posts.length - 1) {
    index = 0;
  }
  const back = index > 0 && posts.length > 1;
  const next = index < posts.length - 1 && posts.length > 1;
  const selected = posts[index];
  return { selected, back, next };
};

const getCurrentIndex = ({ selected, posts }) =>
  posts.reduce(
    (finalIndex, currentItem, currentIndex) =>
      selected.name === currentItem.name ? currentIndex : finalIndex,
    0
  );

const aspectRatioToggleRules = {
  contain: "cover",
  cover: "contain"
};

const reducer = (state = initial, { type, payload }) => {
  switch (type) {
    case PRELOAD_RESET: {
      return { ...state, preload: PRELOAD_STATES.UNINITIALIZED };
    }

    case TOGGLE_ASPECT_RATIO: {
      return {
        ...state,
        aspect_ratio: aspectRatioToggleRules[state.aspect_ratio]
      };
    }

    case TOGGLE_AUTO_PLAY: {
      return { ...state, autoplay: !state.autoplay };
    }

    case PRELOAD_INIT: {
      return { ...state, preload: PRELOAD_STATES.LOADING };
    }

    case PRELOAD_COMPLETE: {
      return { ...state, preload: PRELOAD_STATES.COMPLETE };
    }

    case POSTS_RECEIVED: {
      const posts = transformPosts(payload);
      const selectedState = getSelectedSubState({ posts });
      return { ...state, ...selectedState, posts };
    }

    case POST_SELECT: {
      const posts = state.posts;
      const index = payload.index;
      const selectedState = getSelectedSubState({ posts, index });
      return { ...state, ...selectedState };
    }

    case PREVIOUS_POST: {
      const posts = state.posts;
      const selected = state.selected;
      const previous = state.selected;
      const currentIndex = getCurrentIndex({ selected, posts });
      const index = currentIndex - 1;
      const selectedState = getSelectedSubState({ posts, index, previous });
      return { ...state, ...selectedState };
    }

    case NEXT_POST: {
      const posts = state.posts;
      const selected = state.selected;
      const previous = state.selected;
      const currentIndex = getCurrentIndex({ selected, posts });
      const index = currentIndex + 1;
      const selectedState = getSelectedSubState({ posts, index, previous });
      return { ...state, ...selectedState };
    }

    default: {
      return { ...state };
    }
  }
};

export default reducer;
