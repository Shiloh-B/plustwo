import { combineReducers } from 'redux';
import loginReducer from './isLogged';

const rootReducer = combineReducers({
  checkLogin: loginReducer
});

export default rootReducer;