import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import ProductDetail from "./Pages/ProductDetail";
import Home from './Pages/Home';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/detail" element={<ProductDetail />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
