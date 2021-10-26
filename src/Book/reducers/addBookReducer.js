export default (state = {}, action) => {
  switch (action.type) {
    case "addBook":
      return { ...state, [action.payload.userId]: action.payload.formValues };
    case "logout":
      return {};
    default:
      return state;
  }
};
