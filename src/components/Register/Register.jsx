import { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button, Select, Alert } from "antd";
import { Container, Row, Col } from "react-bootstrap";


const validateFormData = (data) => {
  const errors = {};

  if (!data.userName) errors.userName = "Username (Email) is required!";
  if (!data.courseCode) errors.courseCode = "Course Code is required!";
  if (!data.termNo) errors.termNo = "Term Number is required!";
  if (!data.email) errors.email = "Email is required!";
  if (!data.phoneNumber) errors.phoneNumber = "Phone Number is required!";
  if (!data.password) errors.password = "Password is required!";
  if (data.password !== data.confirmPassword) errors.confirmPassword = "Passwords do not match!";
  if (!data.confirmPassword) errors.confirmPassword = "Confirm Password is required!";

  return errors;
};

const emailRegex = /^[c]\d{6}@mylambton\.ca$/;
const phoneNumberRegex = /^\d{3}-\d{3}-\d{4}$/;

export default function Register() {
  const [formData, setFormData] = useState({
    userName: "",
    courseCode: "",
    termNo: "",
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

  const handleRegister = () => {
    const validationErrors = validateFormData(formData);

    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }

    registerUser();
  };

  const registerUser = async () => {
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
    <Container fluid>
      <Row className="vh-100">
        <Col xs={12} md={9} className="p-0">
          <img
            src="/src/assets/banner.webp"
            alt="Left Image"
            className="img-fluid h-100 w-100 object-fit-cover"
          />
        </Col>

        <Col xs={12} md={3} className="d-flex flex-column justify-content-top align-items-top p-4" style={{ overflowY: "auto", maxHeight: "100vh" }}>

          <h2 className="text-primary fw-bold mb-4">Lambton Marketplace</h2>


          <h2 className="text-center mb-3">Register</h2>

          <Form
            className="p-4"
            layout="vertical"
            onFinish={handleRegister}
            initialValues={formData}
            onValuesChange={(changedValues) =>
              setFormData((prev) => ({ ...prev, ...changedValues }))
            }
          >

            <Form.Item
              label="Email"
              name="userName"
              rules={[
                { required: true, message: "Email is required!" },
                {
                  pattern: emailRegex,
                  message: "Email must be in the format c902999@mylambton.ca",
                },
              ]}
              help={error.email}
              validateStatus={error.email ? "error" : ""}
            >
              <Input placeholder="Email" />
            </Form.Item>

            <Form.Item
              label="Name"
              name="fullName"
              rules={[{ required: true, message: "Username (Email) is required!" }]}
              help={error.userName}
              validateStatus={error.userName ? "error" : ""}
            >
              <Input placeholder="Name" />
            </Form.Item>

            <Form.Item
              label="Course Code"
              name="courseCode"
              rules={[{ required: true, message: "Course Code is required!" }]}
              help={error.courseCode}
              validateStatus={error.courseCode ? "error" : ""}
            >
              <Input placeholder="Course Code" />
            </Form.Item>

            <Form.Item
              label="Term Number"
              name="termNo"
              rules={[{ required: true, message: "Term Number is required!" }]}
              help={error.termNo}
              validateStatus={error.termNo ? "error" : ""}
            >
              <Select placeholder="Select Term" allowClear>
                <Select.Option value="1">Term 1</Select.Option>
                <Select.Option value="2">Term 2</Select.Option>
                <Select.Option value="3">Term 3</Select.Option>
                <Select.Option value="4">Term 4</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Phone Number"
              name="phoneNumber"
              rules={[
                { required: true, message: "Phone number is required!" },
                {
                  pattern: phoneNumberRegex,
                  message: "Phone number must be in the format 123-456-7890",
                },
              ]}
              help={error.phoneNumber}
              validateStatus={error.phoneNumber ? "error" : ""}
            >
              <Input placeholder="Phone Number" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Password is required!" }]}
              help={error.password}
              validateStatus={error.password ? "error" : ""}
              hasFeedback
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              rules={[
                { required: true, message: "Confirm Password is required!" },
                {
                  validator: (_, value) =>
                    value && value !== formData.password
                      ? Promise.reject("Passwords do not match!")
                      : Promise.resolve(),
                },
              ]}
              help={error.confirmPassword}
              validateStatus={error.confirmPassword ? "error" : ""}
              hasFeedback
            >
              <Input.Password placeholder="Confirm Password" />
            </Form.Item>

            {error.confirmPassword && (
              <Alert message={error.confirmPassword} type="error" showIcon />
            )}

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Register
              </Button>
            </Form.Item>

            <p className="text-center mt-3">
              Already have an account?{" "}
              <Link to="/" className="text-primary fw-bold">
                Login Here
              </Link>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>

  );
}