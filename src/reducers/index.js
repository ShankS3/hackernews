import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import posts from './postsReducer'

const rootReducer = (history) => combineReducers({
  posts,
  router: connectRouter(history)
})

export default rootReducer