const INTIAL_STATE = {
  isSignedIn: null,
  userId: null,
};
export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case "login":
      return { ...state, isSignedIn: true, userId: action.payload };
    default:
      return state;
  }
};
