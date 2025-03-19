import React, { useState, useEffect } from "react";
import {
    Form,
    Input,
    Select,
    Button,
    message,
    Card,
    Layout,
    Table,
    Tag,
} from "antd";
import CustomHeader from "../Header/CustomHeader";
import { Container } from "react-bootstrap";
import { PAYMENT_LIST, PROFILE, PROFILE_RESET_PASSWORD } from "../../utils/constant";

const { Option } = Select;

const Profile = () => {
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token");
    const [form] = Form.useForm();
    const [passwordForm] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const [payments, setPayments] = useState([]);


    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await fetch(PROFILE, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch profile data");
                }
                const data = await response.json();

                form.setFieldsValue({
                    userName: data.userName,
                    fullName: data.fullName,
                    courseCode: data.courseCode,
                    termNo: data.termNo,
                    phoneNumber: data.phoneNumber,
                });
            } catch (error) {
                messageApi.open({
                    type: "error",
                    content: "Failed to load profile data.",
                });
            }
        };

        fetchProfileData();
        fetchPayments()
    }, [token, form]);

    const onFinishPersonalInfo = async (values) => {
        setLoading(true);
        try {
            const response = await fetch(PROFILE, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ ...values }),
            });
            const data = await response.json();
            if (response.ok) {
                messageApi.open({
                    type: "success",
                    content: "Profile updated successfully!",
                });
                form.setFieldsValue({
                    userName: data.userName,
                    fullName: data.fullName,
                    courseCode: data.courseCode,
                    termNo: data.termNo,
                    phoneNumber: data.phoneNumber,
                });
            } else {
                messageApi.open({
                    type: "error",
                    content: data.error || "Failed to reset password.",
                });
            }
        } catch (error) {
            messageApi.open({
                type: "error",
                content: "Failed to update profile!",
            });
            form.resetFields();
        } finally {
            setLoading(false);
        }
    };

    const onFinishPassword = async (values) => {
        setLoading(true);
        if (values.newPassword !== values.confirmPassword) {
            messageApi.open({
                type: "error",
                content: "Passwords do not match!",
            });
            setLoading(false);
            return;
        }
        try {
            const response = await fetch(
                PROFILE_RESET_PASSWORD,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ ...values }),
                }
            );
            await response.json();

            if (response.ok) {
                setLoading(false);
                passwordForm.resetFields();
                messageApi.open({
                    type: "success",
                    content: "Password changed successfully!",
                });
            }
        } catch (error) {
            setLoading(false);
            messageApi.open({
                type: "error",
                content: "Failed to change password.",
            });
        } finally {
            setLoading(false);
        }
    };

    const fetchPayments = async () => {
        try {
            const response = await fetch(PAYMENT_LIST, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error("Failed to fetch profile data");
            }
            const data = await response.json();
            setPayments(data)

        } catch (error) {
            messageApi.open({
                type: "error",
                content: "Failed to load profile data.",
            });
        }
    };

    const columns = [
        {
            title: "User",
            dataIndex: ["user", "fullName"], // Nested field from user object
            key: "user",
        },
        {
            title: "Product",
            dataIndex: ["product", "productName"], // Nested field from product object
            key: "product",
        },
        {
            title: "Amount ($)",
            dataIndex: "amount",
            key: "amount",
            render: (amount) => `$${amount.toFixed(2)}`,
        },
        {
            title: "Currency",
            dataIndex: "currency",
            key: "currency",
            render: (currency) => currency.toUpperCase(),
        },
        {
            title: "Status",
            dataIndex: "paymentStatus",
            key: "paymentStatus",
            render: (status) => (
                <Tag color={status === "success" ? "green" : status === "failed" ? "red" : "orange"}>
                    {status.toUpperCase()}
                </Tag>
            ),
        },
        {
            title: "Date",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (date) => new Date(date).toLocaleString(),
        },
    ];

    return (
        <Layout style={{ minHeight: "100vh", minWidth: "100vw" }}>
            {contextHolder}

            <CustomHeader />
            <Container>
                <div className="container mt-5 d-flex justify-content-center">
                    <div
                        className="d-flex flex-wrap justify-content-between w-100"
                        style={{ maxWidth: "100%" }}
                    >
                        <Card
                            title="Student Information"
                            bordered={false}
                            style={{
                                flex: 1,
                                marginRight: "10px",
                                minWidth: "350px",
                                boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
                            }}
                        >
                            <Form
                                layout="vertical"
                                onFinish={onFinishPersonalInfo}
                                form={form}
                            >
                                <Form.Item label="College ID" name="userName">
                                    <Input disabled />
                                </Form.Item>
                                <Form.Item
                                    label="Full Name"
                                    name="fullName"
                                    rules={[
                                        { required: true, message: "Please enter your full name" },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Course Code"
                                    name="courseCode"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please enter your Course Code",
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Term Number"
                                    name="termNo"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please select your Term Number",
                                        },
                                    ]}
                                >
                                    <Select placeholder="Select Term">
                                        <Option value="1">1</Option>
                                        <Option value="2">2</Option>
                                        <Option value="3">3</Option>
                                        <Option value="4">4</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label="Phone Number"
                                    name="phoneNumber"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please enter your Phone Number",
                                        },
                                        {
                                            pattern: /^[0-9]{10}$/,
                                            message: "Phone Number must be 10 digits",
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" block>
                                        Update Profile
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Card>

                        <Card
                            title="Change Password"
                            bordered={false}
                            style={{
                                flex: 1,
                                minWidth: "350px",
                                boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
                            }}
                        >
                            <Form
                                layout="vertical"
                                onFinish={onFinishPassword}
                                form={passwordForm}
                            >
                                <Form.Item
                                    label="Old Password"
                                    name="oldPassword"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please enter your old password",
                                        },
                                    ]}
                                >
                                    <Input.Password />
                                </Form.Item>
                                <Form.Item
                                    label="New Password"
                                    name="newPassword"
                                    rules={[
                                        { required: true, message: "Please enter a new password" },
                                    ]}
                                >
                                    <Input.Password />
                                </Form.Item>
                                <Form.Item
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    rules={[
                                        { required: true, message: "Please confirm your password" },
                                    ]}
                                >
                                    <Input.Password />
                                </Form.Item>
                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        loading={loading}
                                        block
                                    >
                                        Update Password
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Card>
                    </div>

                </div>
                <Card className="p-3 m-3">
                    <h2>Payment History</h2>
                    <Table
                        columns={columns}
                        dataSource={payments}
                        rowKey="_id"
                        loading={loading}
                    />
                </Card>
            </Container>
        </Layout>
    );
};

export default Profile;
