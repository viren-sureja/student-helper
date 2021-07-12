import { combineReducers } from "redux";
import addBookReducer from "./addBookReducer";
import getCollectionReducer from "./getCollectionReducer";
import getTradeReducer from "./getTradeReducer";
import loginReducer from "./loginReducer";
import sentRequestReducer from "./sentRequestReducer";
import receivedRequestReducer from "./receivedRequestReducer";

export default combineReducers({
  addBook: addBookReducer,
  collection: getCollectionReducer,
  login: loginReducer,
  trades: getTradeReducer,
  sentRequest: sentRequestReducer,
  receivedRequest: receivedRequestReducer,
});
