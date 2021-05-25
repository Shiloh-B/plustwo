import { combineReducers } from 'redux';
import newPostReducer from './newPost';
import userDataReducer from './userData';

const rootReducer = combineReducers({
  userData: userDataReducer,
  newPost: newPostReducer
});

export default rootReducer;