import axios from 'axios';
import {
  RADIX,
  BASE_URL,
  BAD_REQUEST,
  FORBIDDEN,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR
} from '../constants/applicationConstants';
import {
  ON_FETCH_POSTS_LOADING,
  ON_FETCH_NEW_POSTS_SUCCESS,
  ON_FETCH_OLD_POSTS_SUCCESS,
  ON_FETCH_POSTS_FAILURE
} from '../constants/actionTypes';

const onFetchPostsLoading = () => ({ type: ON_FETCH_POSTS_LOADING });

const onFetchPostsFailure = message => ({ type: ON_FETCH_POSTS_FAILURE, message });

const onFetchNewPostsSuccess = response => 
  ({ type: ON_FETCH_NEW_POSTS_SUCCESS, response });

const onFetchOldPostsSuccess = (response, pageNo) => 
  ({ type: ON_FETCH_OLD_POSTS_SUCCESS, response, pageNo });

function _errorHandling(error, dispatch){
  switch(parseInt(error, RADIX)) {
    case BAD_REQUEST: 
      dispatch(onFetchPostsFailure("Error encountered. Please refresh!"));
      break;
    case FORBIDDEN:
      dispatch(onFetchPostsFailure("Access to information is currently forbidden!"));
      break;
    case NOT_FOUND:
      dispatch(onFetchPostsFailure("Unable to find the information you are looking for!"));
      break;
    case INTERNAL_SERVER_ERROR:
      dispatch(onFetchPostsFailure("We seem to have encountered an issue. Try again later!"));
      break;
    default:
      dispatch(onFetchPostsFailure("We seem to have encountered an issue. Try again later!"));
  }
}

const fetchPosts = (pageNo = 0) => axios.get(`${BASE_URL}search_by_date?tags=story&page=${pageNo}`);

const onFetchNewPosts = () => {
  return function (dispatch) {
    dispatch(onFetchPostsLoading());
    return fetchPosts().then(
      (success) => dispatch(onFetchNewPostsSuccess(success)),
      (error) => _errorHandling(error, dispatch)
    );
  }
};

const onFetchOldPosts = (pageNo) => {
  return function (dispatch) {
    dispatch(onFetchPostsLoading());
    return fetchPosts(pageNo).then(
      (success) => dispatch(onFetchOldPostsSuccess(success, pageNo)),
      (error) => _errorHandling(error, dispatch)
    );
  }
};

export { onFetchNewPosts, onFetchOldPosts };
