import { combineReducers } from "redux";
import addBookReducer from "./addBookReducer";
import getCollectionReducer from "./getCollectionReducer";
import getTradeReducer from "./getTradeReducer";
import loginReducer from "./authReducer";
import sentRequestReducer from "./sentRequestReducer";
import receivedRequestReducer from "./receivedRequestReducer";
import wishListReducer from "./wishListReducer";
import getMyCollectionReducer from "./getMyCollectionReducer copy";
export default combineReducers({
  addBook: addBookReducer,
  collection: getCollectionReducer,
  login: loginReducer,
  trades: getTradeReducer,
  sentRequest: sentRequestReducer,
  receivedRequest: receivedRequestReducer,
  wishList: wishListReducer,
  myCollection: getMyCollectionReducer,
});
