import _ from 'lodash';
import objectAssign from 'object-assign';
import {
  ON_FETCH_POSTS_LOADING,
  ON_FETCH_POSTS_FAILURE,
  ON_FETCH_NEW_POSTS_SUCCESS,
  ON_FETCH_OLD_POSTS_SUCCESS
} from '../constants/actionTypes';
import initialState from './initalState';

const filteredData = (list, data) => {
  let newList = data.map(d => {
    const index = _.findIndex(list, function(o) { return o.title === d.title; });
    if(index === -1) return d;
    return false;
  });

  return _.compact(newList);
}

const addStories = ( list, data) => {
  let {newStories, allStories } = list;
  allStories = [...newStories, ...allStories];
  newStories = [];
  newStories = filteredData(allStories, data);
  allStories = _.uniq(allStories);
  return { newStories, allStories };
}

const addOldStories = ( list, data) => {
  let newList = filteredData(list, data);
  return [...list, ...newList];
}

export default function postsReducer(state = initialState.posts, action) {
  switch(action.type) {
    case ON_FETCH_POSTS_LOADING:
      return objectAssign({}, state, {
        loading: true,
        error: false,
        errorMessage: '',
      });
    case ON_FETCH_NEW_POSTS_SUCCESS:
      return {
        stories: addStories(state.stories, action.response.data.hits),
        loading: false,
        error: false,
        errorMessage: ''
      };
    case ON_FETCH_OLD_POSTS_SUCCESS:
      return {
        stories: objectAssign({}, state.stories, {
          allStories: addOldStories(state.stories.allStories, action.response.data.hits)
        }),
        pageNo: action.pageNo,
        loading: false,
        error: false,
        errorMessage: ''
      };
    case ON_FETCH_POSTS_FAILURE:
      return objectAssign({}, state, {
        loading: false,
        error: true,
        errorMessage: action.errorMessage
      });
    default:
      return state;
  }
}
