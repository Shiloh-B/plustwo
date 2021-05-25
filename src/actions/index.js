export const isLogged = (credentials) => {
  return {
    type: 'LOGIN',
    payload: credentials
  };
};

export const newPost = (posts) => {
  return {
    type: 'NEW_POST',
    payload: posts
  };
};