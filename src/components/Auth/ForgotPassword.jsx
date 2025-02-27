import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Form, Input, Button, Alert } from "antd";
import { Link } from "react-router-dom";
import { FORGOT_PASSWORD } from "../../utils/constant";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();


    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            const response = await fetch(FORGOT_PASSWORD, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userName: values.userName }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage({
                    type: "success",
                    text: "Reset link sent! Check your email.",
                });
                form.resetFields();

            } else {
                setMessage({
                    type: "error",
                    text: data.error || "Failed to send reset link.",
                });
            }
        } catch (error) {
            setMessage({
                type: "error",
                text: "Something went wrong. Try again later.",
            });
        }
        setLoading(false);
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
                        style={{ height: "50px", width: "50%" }}
                    />
                    <br></br>
                    <br></br>

                    <Form layout="vertical" onFinish={handleSubmit} style={{ margin: "auto 0px" }} form={form}>
                        <p className="text-center fw-bold mb-4 fs-3">
                            Forgot Password
                        </p>
                        {message && (
                            <Alert
                                className="mt-3"
                                message={message.text}
                                type={message.type}
                                showIcon
                            />
                        )}
                        <Form.Item
                            label="Enter your College ID"
                            name="userName"
                            rules={[
                                { required: true, message: "Email is required!" },
                                { type: "email", message: "Invalid email format!" },
                            ]}
                        >
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Item>

                        <Button type="primary" htmlType="submit" block loading={loading}>
                            Send Reset Link
                        </Button>
                        <p className="text-center mt-3">
                            Return to Login?{" "}
                            <Link to="/login" className="text-primary fw-bold">
                                Click Here
                            </Link>
                        </p>
                    </Form>




                </Col>
            </Row>
        </Container>
    );
}
