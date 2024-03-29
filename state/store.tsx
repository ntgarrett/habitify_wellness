import { compose, createStore, combineReducers, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { settingsReducer } from "./user_settings/settingsReducer";
import { trackingReducer } from "./data_tracking/trackingReducer";

const rootReducer = combineReducers({
  settings: settingsReducer,
  progress: trackingReducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const middleware = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
