import { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button, Alert } from "antd";
import { Container, Row, Col } from "react-bootstrap";
import { LOGIN } from "../../utils/constant";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();


  const handleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const response = await fetch(LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName: username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        form.resetFields();
        window.location.href = "/dashboard";
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid>
      <Row className="vh-100">
        <Col xs={12} md={9} className="p-0">
          <img
            src="/src/assets/banner.webp"
            alt="Left Image"
            className="img-fluid h-100 w-100 object-fit-cover"
          />
        </Col>

        <Col
          xs={12}
          md={3}
          className="d-flex flex-column justify-content-top align-items-top p-4"
        >
          <img
            src="/src/assets/LambtonCollege_Logo.png"
            alt="Lambton Logo"
            style={{ height: "50px", width: "50%", margin: "10px 0px" }}
          />

          <div
            className="p-4 w-100"
            style={{ maxWidth: "400px", margin: "auto" }}
          >
            <p className="text-center fw-bold mb-4 fs-3">
              Hi, Welcome to Lambton Marketplace
            </p>

            <span className="text-center" style={{ margin: "10px 0px" }}>
              Enter your details to log in your account
            </span>

            {error && (
              <Alert message={error} type="error" showIcon className="mb-3" />
            )}

            <Form
              layout="vertical"
              onFinish={handleLogin}
              style={{ margin: "20px 0px" }}
              form={form}
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  { required: true, message: "Please enter your username!" },
                ]}
              >
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please enter your password!" },
                ]}
              >
                <Input.Password
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Item>

              <Button type="primary" htmlType="submit" block loading={loading}>
                Login
              </Button>
            </Form>

            <p className="text-center mt-3">
              Don't have an account? <Link to="/register">Register Here</Link>
            </p>

            <p className="text-center mt-2">
              Forgot Password? <Link to="/forgot-password">Click Here</Link>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
