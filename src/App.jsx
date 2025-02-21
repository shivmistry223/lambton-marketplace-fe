import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import ResetPassword from "./components/Auth/ResetPassword"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/reset-password" element={<ResetPassword />} />
      
      </Routes>
    </Router>
  );
}

export default App;