const userDataReducer = (state = {}, action) => {
  switch(action.type) {
    case 'USER_DATA':
      let newState = {...state};
      newState = action.payload;
      return newState;
    default:
      return state;
  }
}

export default userDataReducer;