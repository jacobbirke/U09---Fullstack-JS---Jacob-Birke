import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ProductDetail from './Pages/ProductDetail';
import {

  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App/>}></Route>
        <Route path="/detail" element={<ProductDetail/>}></Route>
      </Routes>
    </Router>
  </StrictMode>
);
