import { combineReducers } from "redux";
import eventReducer from "../../features/event/eventReducer";
import testReducer from "./testReducer";

const rootReducer = combineReducers({
  test: testReducer,
  events: eventReducer,
});

export default rootReducer;
