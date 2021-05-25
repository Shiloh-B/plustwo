export const userData = (userData) => {
  return {
    type: 'USER_DATA',
    payload: userData
  };
};

export const newPost = (posts) => {
  return {
    type: 'NEW_POST',
    payload: posts
  };
};