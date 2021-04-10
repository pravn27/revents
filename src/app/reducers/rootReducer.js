import { combineReducers } from "redux";
import { reducer as FormReducer } from "redux-form";
import eventReducer from "../../features/event/eventReducer";
import testReducer from "./testReducer";

const rootReducer = combineReducers({
  form: FormReducer,
  test: testReducer,
  events: eventReducer,
});

export default rootReducer;
