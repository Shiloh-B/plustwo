import { combineReducers } from 'redux';
import newPostReducer from './newPost';

const rootReducer = combineReducers({
  newPost: newPostReducer
});

export default rootReducer;