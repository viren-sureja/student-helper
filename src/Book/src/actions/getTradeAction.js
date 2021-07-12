import history from "../history";
import axios from "../axios";

export const getTrade = () => async (dispatch, getState) => {
  try {
    const token = localStorage.getItem("user");
    const response = await axios.get("/books/getTrade", {
      headers: {
        "auth-token": token,
      },
    });
    console.log(response.data);

    dispatch({ type: "getTrade", payload: response.data });
  } catch (e) {
    console.log(e);
  }
};
