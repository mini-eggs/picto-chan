import { connect } from "vue2-redux";
import {
  requestPosts,
  selectPostByIndex,
  previousPost,
  nextPost,
  preloadInit,
  preloadComplete,
  preloadReset,
  toggleAspectRatio,
  toggleAutoPlay
} from "../actions/Posts";
import { PRELOAD_STATES } from "../constants/Posts";

export default connect(
  state => ({
    posts: state.PostsReducer.posts,
    aspect_ratio: state.PostsReducer.aspect_ratio,
    autoplay: state.PostsReducer.autoplay,
    autoplayTime: state.PostsReducer.autoplayTime,
    selectedPost: state.PostsReducer.selected,
    displayBack: state.PostsReducer.back,
    displayNext: state.PostsReducer.next,
    shouldPreload: state.PostsReducer.preload === PRELOAD_STATES.UNINITIALIZED && state.PostsReducer.posts.length > 0
  }),
  dispatch => ({
    requestPosts: props => dispatch(requestPosts(props)),
    selectPostByIndex: i => dispatch(selectPostByIndex(i)),
    previousPost: () => dispatch(previousPost()),
    nextPost: () => dispatch(nextPost()),
    preloadInit: () => dispatch(preloadInit()),
    preloadReset: () => dispatch(preloadReset()),
    preloadComplete: () => dispatch(preloadComplete()),
    toggleAspectRatio: () => dispatch(toggleAspectRatio()),
    toggleAutoPlay: () => dispatch(toggleAutoPlay())
  })
);
