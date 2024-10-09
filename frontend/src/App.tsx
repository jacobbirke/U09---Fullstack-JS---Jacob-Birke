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
        </Routes>
      </Router>
    </>
  );
}

export default App;
