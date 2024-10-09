import { combineReducers, createStore, applyMiddleware } from "redux";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import { ProductListReducer, ProductReducer } from "./Reducers/Product";
import {thunk} from "redux-thunk";
import { UserLoginReducer, UserRegisterReducer } from "./Reducers/User";

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const rootReducer = combineReducers({
  ProductListReducer,
  ProductReducer,
  UserLoginReducer,
  UserRegisterReducer,
   
});

const middleware = [thunk];
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  applyMiddleware(thunk)
);

export let persistor = persistStore(store);
