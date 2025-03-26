import { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button, Select, Alert, Modal } from "antd";
import { Container, Row, Col } from "react-bootstrap";
import { REGISTER } from "../../utils/constant";


const validateFormData = (data) => {
  const errors = {};

  if (!data.userName) errors.userName = "Name is required!";
  if (!data.courseCode) errors.courseCode = "Course Code is required!";
  if (!data.termNo) errors.termNo = "Term Number is required!";
  if (!data.fullName) errors.fullName = "Full Name is required!";
  if (!data.phoneNumber) errors.phoneNumber = "Phone Number is required!";
  if (!data.password) errors.password = "Password is required!";
  if (data.password !== data.confirmPassword) errors.confirmPassword = "Passwords do not match!";
  if (!data.confirmPassword) errors.confirmPassword = "Confirm Password is required!";

  return errors;
};

const emailRegex = /^c\d{7}@mylambton\.ca$/;

export default function Register() {
  const [formData, setFormData] = useState({
    userName: "",
    courseCode: "",
    termNo: "",
    phoneNumber: "",
    fullName: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);



  const handleRegister = () => {
    const validationErrors = validateFormData(formData);

    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }

    registerUser();
  };

  const registerUser = async () => {
    setError("");
    setLoading(true);
    try {
      const response = await fetch(REGISTER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Registration successful!");
        window.location.href = "/login";
      } else {
        setError(data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
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


          <img
            src="/src/assets/LambtonCollege_Logo.png"
            alt="Lambton Logo"
            style={{ height: "50px", width: "50%", margin: "10px 0px" }}
          />

          <p className="text-center fw-bold mt-4">
            Register Yourself To Our Marketplace
          </p>
          {error && <Alert message={error} type="error" showIcon className="mb-3" />}

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
              label="College ID"
              name="userName"
              rules={[
                { required: true, message: "Email is required!" },
                {
                  pattern: emailRegex,
                  message: "User Name must be in the college id format",
                },
              ]}
              help={error.email}
              validateStatus={error.email ? "error" : ""}
            >
              <Input placeholder="College ID" />
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
              <Button type="primary" htmlType="submit" block loading={loading}>
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