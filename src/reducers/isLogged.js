const testUser = 'test';
const testPass = 'pass';

const loginReducer = (state = false, action) => {
  switch(action.type) {
    case 'LOGIN':
      if(action.payload.username === testUser && action.payload.pass === testPass) {
        return true;
      } else {
        return false;
      }
      
    default:
      return false;
  }
}

export default loginReducer;