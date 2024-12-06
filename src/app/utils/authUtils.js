// /utils/authUtils.js


  
  // Retrieve the token from local storage
  export const getToken = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  };
  
  
  // Check if the user is authenticated by verifying the presence of a token
  export const isAuthenticated = () => {
    return !!getToken();
  };
  