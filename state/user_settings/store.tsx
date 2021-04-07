import { createStore } from "redux";
import { userSettingsReducer } from "./settingsReducer";

export const store = createStore(
  userSettingsReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
