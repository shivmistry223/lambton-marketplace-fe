import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import ResetPassword from "./components/Auth/ResetPassword";
import ForgotPassword from "./components/Auth/ForgotPassword";
import Dashboard from "./components/Dashboard/Dashboard";
import ProductForm from "./components/ProductForm/ProductForm";
import Profile from "./components/Profile/Profile";
import ProductDetail from "./components/Product/ProductDetail";
import Payment from "./components/Payment/Payment";
import OwnerDetail from "./components/OwnerDetail/OwnerDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-product" element={<ProductForm />} />
        <Route path="/update-product/:id" element={<ProductForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/product-detail/:productId" element={<ProductDetail />} />
        <Route path="/owner-detail/:ownerId" element={<OwnerDetail />} />
        <Route path="/*" element={<Login />} />

      </Routes>
    </Router>
  );
}

export default App;