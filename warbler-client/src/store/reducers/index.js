import { combineReducers } from "redux";
import currentUsers from "./currentUsers";
import errors from "./errors";

const rootReducer = combineReducers({
    currentUsers,
    errors
});

export default rootReducer;