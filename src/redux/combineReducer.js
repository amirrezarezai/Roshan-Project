import { combineReducers } from "redux";
import archiveReducer from "./reducer/archiveReducer";
import dashboardReducer from "./reducer/dashboardReducer";

const rootReducer = combineReducers({
  archive: archiveReducer,
  dashboard: dashboardReducer,
});

export default rootReducer;
