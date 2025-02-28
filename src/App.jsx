import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import ResetPassword from "./components/Auth/ResetPassword";
import ForgotPassword from "./components/Auth/ForgotPassword";
import Dashboard from "./components/Dashboard/Dashboard";
import Profile from "./components/Profile/Profile";  // Adjust the path based on your folder structure

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
       
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Dashboard />} />  // Ensure this exists
<Route path="/*" element={<Login />} />   // Only redirect unknown routes
      </Routes>
    </Router>
  );
}

export default App;