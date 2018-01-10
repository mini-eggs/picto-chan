import { connect } from "vue2-redux";
import {
  requestPosts,
  selectPostByIndex,
  previousPost,
  nextPost
} from "../actions/Posts";

export default connect(
  state => ({
    posts: state.PostsReducer.posts,
    selectedPost: state.PostsReducer.selected,
    displayBack: state.PostsReducer.back,
    displayNext: state.PostsReducer.next
  }),
  dispatch => ({
    requestPosts: props => dispatch(requestPosts(props)),
    selectPostByIndex: i => dispatch(selectPostByIndex(i)),
    previousPost: () => dispatch(previousPost()),
    nextPost: () => dispatch(nextPost())
  })
);
