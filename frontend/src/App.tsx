import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ProductDetail from "./Pages/ProductDetail";
import Home from "./Pages/Home";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import { useSelector } from "react-redux";
import Checkout from "./Pages/Checkout";
import PlaceOrder from "./Pages/PlaceOrder";
import AdminPage from './Pages/Admin/Admin';

function App() {
  const UserLoginReducer = useSelector((state) => state.UserLoginReducer);
  const { userInfo } = UserLoginReducer;
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/products/:id" element={<ProductDetail />}></Route>
          <Route
            path="/login"
            element={userInfo ? <Navigate to="/"></Navigate> : <Login />}
          ></Route>
          <Route
            path="/register"
            element={userInfo ? <Navigate to="/"></Navigate> : <Register />}
          ></Route>
          <Route path="/checkout" element={<Checkout />}></Route>
          <Route path="/placeorder" element={<PlaceOrder />}></Route>

          <Route
            path="/admin"
            element={
              userInfo && userInfo.isAdmin ? (
                <AdminPage /> // Render Admin component if user is admin
              ) : (
                <Navigate to="/" /> // Redirect to home if not admin
              )
            }
          ></Route>

        </Routes>
      </Router>
    </>
  );
}

export default App;
