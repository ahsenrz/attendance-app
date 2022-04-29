import { combineReducers } from "redux";
import { firebaseAuth } from "./Authentication/authSlice";


const parentReducer = combineReducers({
  auth: firebaseAuth,
});

export default parentReducer;