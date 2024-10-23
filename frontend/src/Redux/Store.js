import { combineReducers, createStore, applyMiddleware } from "redux";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import { ProductListReducer, ProductReducer } from "./Reducers/Product";
import {thunk} from "redux-thunk";
import { UserDeleteReducer, UserListReducer, UserLoginReducer, UserRegisterReducer, UserUpdateReducer } from "./Reducers/User";
import { CartReducer } from "./Reducers/Cart";
import { orderDetailReducer, orderPaymentReducer, orderReducer } from "./Reducers/Order";

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
  CartReducer,
  orderReducer,
  orderDetailReducer,
  orderPaymentReducer,
  UserListReducer,
  UserUpdateReducer,
  UserDeleteReducer
   
});

const middleware = [thunk];
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  applyMiddleware(thunk)
);

export let persistor = persistStore(store);
