import {
  combineReducers,
  legacy_createStore as createStore,
  applyMiddleware,
} from "redux";
import { todoReducers } from "./reducers/todoReducer";
import { counterReducer } from "./reducers/counterReducer";
import { persistReducer, persistStore } from "redux-persist";
import { composeWithDevTools } from "@redux-devtools/extension";
import { thunk } from "redux-thunk";
import logger from "redux-logger";
import storage from "redux-persist/lib/storage";

const reducers = combineReducers({
  todo: todoReducers,
  counter: counterReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistReducers = persistReducer(persistConfig, reducers);

const store = createStore(
  persistReducers,
  composeWithDevTools(applyMiddleware(thunk, logger))
);

const persist = persistStore(store);

export { store, persist };
