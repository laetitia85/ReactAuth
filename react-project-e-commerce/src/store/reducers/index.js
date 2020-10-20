import { combineReducers } from "redux";


import usersReducer from "./users";
import productsReducer from "./products";

export default combineReducers({
  usersReducer,
  productsReducer
});