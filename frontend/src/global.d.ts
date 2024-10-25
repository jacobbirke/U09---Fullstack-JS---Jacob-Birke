// src/global.d.ts
import { ComponentType } from 'react';
import { Store } from 'redux';
import { Persistor } from 'redux-persist';

// Define your user type if you haven't already
export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

// Define the state for the user login reducer
export interface UserLoginState {
  userInfo: User | null; // User info or null if not logged in
}

// Define the overall RootState interface
export interface RootState {
  UserLoginReducer: UserLoginState;
  ProductListReducer: ProductListState ;
  ProductReducer: ProductState; 
  CartReducer: CartState; 
  orderReducer: orderState; 
  orderDetailReducer: orderDetailState; 
  orderPaymentReducer: orderPaymentState; 
  UserListReducer: UserListState; 
  UserUpdateReducer: UserUpdateSate; 
  UserDeleteReducer: UserDeleteState; 
}

declare module './Pages/ProductDetail' {
  const ProductDetail: ComponentType;
  export default ProductDetail;
}

declare module './Pages/Home' {
  const Home: ComponentType;
  export default Home;
}

declare module './Pages/Auth/Login' {
  const Login: ComponentType;
  export default Login;
}

declare module './Pages/Auth/Register' {
  const Register: ComponentType;
  export default Register;
}

declare module './Pages/Checkout' {
  const Checkout: ComponentType;
  export default Checkout;
}

declare module './Pages/PlaceOrder' {
  const PlaceOrder: ComponentType;
  export default PlaceOrder;
}

declare module './Pages/Admin/Admin' {
  const AdminPage: ComponentType;
  export default AdminPage;
}

declare module './Pages/Admin/myadmin' {
  const MyAdmin: ComponentType;
  export default MyAdmin;
}

declare module './Redux/store' {
  const store: Store<RootState>; // Replace RootState with your actual root state type
  const persistor: Persistor; // Specify the correct type for persistor
  export { store, persistor };
}

declare module 'redux-persist/integration/react' {
  import { ComponentType } from 'react';
  const PersistGate: ComponentType; // Adjust based on the actual type of PersistGate
  export { PersistGate };
}

declare module './serviceWorkerRegistration' {
  const serviceWorkerRegistration: ServiceWorkerRegistration; // Or the appropriate type
  export default serviceWorkerRegistration;
}
