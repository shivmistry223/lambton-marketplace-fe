import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    studentName: "",
    courseName: "",
    term: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async () => {
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Registration successful!");
      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error registering:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center">
      <div className="row w-100">
        <div className="col-lg-6 d-none d-lg-block p-0">
          <img
            src="/src/assets/banner.webp"
            alt="Lambton College"
            className="img-fluid w-100 vh-100 object-fit-cover"
          />
        </div>

        <div className="col-lg-6 d-flex flex-column align-items-center justify-content-center p-5">
          <h1 className="text-primary fw-bold mb-4">Lambton Marketplace</h1>
          <div className="card shadow p-4 w-100" style={{ maxWidth: "400px" }}>
            <h2 className="text-center mb-3">Register</h2>

            <input
              type="text"
              name="studentName"
              className="form-control mb-3"
              placeholder="Student Name"
              onChange={handleChange}
            />
            <input
              type="text"
              name="courseName"
              className="form-control mb-3"
              placeholder="Course Name"
              onChange={handleChange}
            />
            <input
              type="text"
              name="term"
              className="form-control mb-3"
              placeholder="Term (e.g., Term 4)"
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              className="form-control mb-3"
              placeholder="Email"
              onChange={handleChange}
            />
            <input
              type="text"
              name="phoneNumber"
              className="form-control mb-3"
              placeholder="Phone Number"
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              className="form-control mb-3"
              placeholder="Password"
              onChange={handleChange}
            />
            <input
              type="password"
              name="confirmPassword"
              className="form-control mb-3"
              placeholder="Confirm Password"
              onChange={handleChange}
            />

            {error && <p className="text-danger text-center">{error}</p>} {/* Display error if passwords don't match */}

            <button className="btn btn-success w-100" onClick={handleRegister}>
              Register
            </button>

            <p className="text-center mt-3">
              Already have an account?{" "}
              <Link to="/" className="text-primary fw-bold">
                Login Here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}