import taskReducer from "./reducers/taskReducer";
import counterReducer from "./reducers/counterReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  taskList: taskReducer,
  counter: counterReducer,
});

export default rootReducer;
