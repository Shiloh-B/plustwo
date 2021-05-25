export const isLogged = (credentials) => {
  return {
    type: 'LOGIN',
    payload: credentials
  };
};