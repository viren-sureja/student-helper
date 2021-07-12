import history from "../history";
import axios from "../axios";

export const getCollection =
  (setFilteredCollection) => async (dispatch, getState) => {
    try {
      const token = localStorage.getItem("user");
      const response = await axios.get("/books/collection", {
        headers: {
          "auth-token": token,
        },
      });
      console.log(response.data);
      setFilteredCollection(response.data);
      dispatch({ type: "getCollection", payload: response.data });
    } catch (e) {
      console.log(e);
    }
  };
