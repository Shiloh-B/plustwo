import { combineReducers } from 'redux';
import newPostReducer from './newPost';
import userDataReducer from './userData';

const rootReducer = (state, action) => {
  if(action.type === 'USER_LOGOUT') {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
}

const appReducer = combineReducers({
  userData: userDataReducer,
  newPost: newPostReducer
})

export default rootReducer;