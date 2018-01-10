import {
  POSTS_RECEIVED,
  POST_SELECT,
  PREVIOUS_POST,
  NEXT_POST
} from "../constants/Posts";

const initial = {
  posts: [],
  selected: undefined,
  next: false,
  back: false
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

const getSelectedSubState = ({
  posts,
  index = 0,
  previous = initial.selected
}) => {
  const back = index > 0 && posts.length > 1;
  const next = index < posts.length - 1 && posts.length > 1;
  const selected = posts[index] || previous;
  return { selected, back, next };
};

const getCurrentIndex = ({ selected, posts }) =>
  posts.reduce(
    (finalIndex, currentItem, currentIndex) =>
      selected.name === currentItem.name ? currentIndex : finalIndex,
    0
  );

const reducer = (state = initial, { type, payload }) => {
  switch (type) {
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
