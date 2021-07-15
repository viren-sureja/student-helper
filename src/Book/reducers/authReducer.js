const INTIAL_STATE = {
  isSignedIn: false,
};
export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case "verifyLogin":
      return { ...state, isSignedIn: true };
    case "login":
      return { ...state, isSignedIn: true };
    default:
      return state;
  }
};
