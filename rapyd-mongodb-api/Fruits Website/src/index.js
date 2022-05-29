import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Register from "./Components/Register";
import Dashboard from "./Components/Dashboard";
import Cart from "./Components/Cart";
import Home from "./Components/Home";
import App from "./App";
import Cookies from "js-cookie";
import Success from "./Components/Success";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

// const userCheck = () => {
//   var ans;
//   console.log(Cookies.get("email"));
//   console.log(Cookies.get("password"));
//   if (
//     Cookies.get("email") === undefined &&
//     Cookies.get("password") === undefined
//   )
//     ans = false;
//   else ans = true;
//   console.log(ans);
//   return ans;
// };

root.render(
  <StrictMode>
    <Router>
      <Routes>
        {/* <Route
          exact
          path="/login"
          element={userCheck() ? <Navigate to="/dashboard" /> : <App />}
        /> */}
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/success" element={<Success />} />
        {/* <Route
          exact
          path="/register"
          element={userCheck() ? <Navigate to="/dashboard" /> : <Register />}
        /> */}
      </Routes>
    </Router>
  </StrictMode>
);
