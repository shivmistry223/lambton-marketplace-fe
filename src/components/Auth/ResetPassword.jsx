import { useState } from "react";
import { Form, Input, Button, Alert } from "antd";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";

export default function ResetPassword() {
    const { token } = useParams(); 
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            const response = await fetch("http://localhost:5000/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    token,
                    password: values.password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage({ type: "success", text: "Password reset successful! You can now login." });
            } else {
                setMessage({ type: "error", text: data.error || "Failed to reset password." });
            }
        } catch (error) {
            setMessage({ type: "error", text: "Something went wrong. Try again later." });
        }
        setLoading(false);
    };
    <img src="/src/assets/LambtonCollege_Logo.png" alt="Lambton Logo" style={{ height: "40px" }} />
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
                <img src="/src/assets/LambtonCollege_Logo.png" alt="Lambton Logo" style={{ height: "40px" }} />

                <Col xs={12} md={3} className="d-flex flex-column justify-content-center align-items-top p-4">
                    

                    <Form layout="vertical" onFinish={handleSubmit}>
                        <Form.Item
                            label="New Password"
                            name="password"
                            rules={[
                                { required: true, message: "Password is required!" },
                                { min: 6, message: "Password must be at least 6 characters!" },
                            ]}
                            hasFeedback
                        >
                            <Input.Password placeholder="Enter new password" />
                        </Form.Item>

                        <Form.Item
                            label="Confirm Password"
                            name="confirmPassword"
                            dependencies={["password"]}
                            rules={[
                                { required: true, message: "Confirm your password!" },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue("password") === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject("Passwords do not match!");
                                    },
                                }),
                            ]}
                            hasFeedback
                        >
                            <Input.Password placeholder="Confirm new password" />
                        </Form.Item>

                        <Button type="primary" htmlType="submit" block loading={loading}>
                            Reset Password
                        </Button>
                    </Form>

                    <p className="text-center mt-3">
                        Return to Login Page?{" "}
                        <Link to="/login" className="text-primary fw-bold">
                            Click Here
                        </Link>
                    </p>


                    {message && (
                        <Alert className="mt-3" message={message.text} type={message.type} showIcon />
                    )}
                </Col>
            </Row>
        </Container>
    );
}