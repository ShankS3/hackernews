import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/postsActions';
import Posts from '../components/Posts';

const mapStateToProps = (state) => {
  return {
    posts: state.posts
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

const PostsContainer = connect(mapStateToProps, mapDispatchToProps)(Posts);

export default PostsContainer;
