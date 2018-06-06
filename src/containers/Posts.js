import { connect } from "vue2-redux";
import {
  requestPosts,
  selectPostByIndex,
  previousPost,
  nextPost,
  preloadInit,
  preloadComplete,
  preloadReset
} from "../actions/Posts";
import { PRELOAD_STATES } from "../constants/Posts";

export default connect(
  state => ({
    posts: state.PostsReducer.posts,
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
    nextPost: () => dispatch(nextPost()),
    preloadInit: () => dispatch(preloadInit()),
    preloadReset: () => dispatch(preloadReset()),
    preloadComplete: () => dispatch(preloadComplete())
  })
);
