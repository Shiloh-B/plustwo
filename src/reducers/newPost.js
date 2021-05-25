const newPostReducer = (state = [], action) => {
  switch(action.type) {
    case 'NEW_POST':
      let newState = state.slice();
      newState.push(action.payload);
      return newState;
    default:
      return [];
  }
}

export default newPostReducer;