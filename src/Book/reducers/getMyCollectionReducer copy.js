import _ from "lodash";

export default (state = {}, action) => {
  switch (action.type) {
    case "getMyCollection":
      return { ...state, ..._.mapKeys(action.payload, "_id") };
    default:
      return state;
  }
};
