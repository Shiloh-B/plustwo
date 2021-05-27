const newPostReducer = (state = [], action) => {
  switch(action.type) {
    case 'NEW_POST':
      if(action.payload.length === 0) {
        return [];
      }
      let newState = state.slice();
      newState.unshift(action.payload);
      return newState;
    default:
      return state;
  }
}

export default newPostReducer;