import { useState } from "react";
import { Link } from "react-router-dom";
import bannerImage from "../../assets/banner.webp"; 

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError(""); 

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login successful!");
        localStorage.setItem("token", data.token); 
        window.location.href = "/dashboard"; 
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center">
      <div className="row w-100">
       
        <div className="col-lg-6 d-none d-lg-block p-0">
          <img
            src={bannerImage} 
            alt="Lambton College"
            className="img-fluid w-100 h-100 object-fit-cover"
          />
        </div>

        <div className="col-lg-6 d-flex flex-column align-items-center justify-content-center p-5">
          <h1 className="text-primary fw-bold mb-4">Lambton Marketplace</h1>
          <div className="card shadow p-4 w-100" style={{ maxWidth: "400px" }}>
            <h2 className="text-center mb-3">Login</h2>

            {error && <p className="text-danger text-center">{error}</p>}

            <input
              type="email"
              className="form-control mb-3"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="form-control mb-3"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="btn btn-primary w-100" onClick={handleLogin}>
              Login
            </button>
            <p className="text-center mt-3">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary fw-bold">
                Register Here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}