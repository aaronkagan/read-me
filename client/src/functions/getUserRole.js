// Helper function to get the current logged in user ROLE (currently it's from local storage but will change when i implement a more secure authentication and authorization system) (Alternatively i could be getting this information from the userContext. No specific reason as to why i'm doing it this way)

const getUserRole = () => {
  return window.localStorage.getItem('role');
};

export default getUserRole;
