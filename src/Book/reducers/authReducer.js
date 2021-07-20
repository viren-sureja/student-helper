import { TramRounded } from "@material-ui/icons";

const INTIAL_STATE = {
  isSignedIn: null,
};
export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case "verifyLogin":
      return { ...state, isSignedIn: action.payload };
    case "login":
      return { ...state, isSignedIn: true };
    default:
      return state;
  }
};
