import React, { useState } from "react";
import { Form, Input, Select, Button, message, Card } from "antd";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const { Option } = Select;

const Profile = () => {
    const [loading, setLoading] = useState(false);
    const collegeID = "123456789";

    const onFinishPersonalInfo = async (values) => {
        setLoading(true);
        try {
            await axios.post("http://localhost:5000/api/update-profile", { ...values, collegeID });
            message.success("Profile updated successfully!");
        } catch (error) {
            message.error("Failed to update profile.");
        } finally {
            setLoading(false);
        }
    };

    const onFinishPassword = async (values) => {
        setLoading(true);
        if (values.newPassword !== values.confirmPassword) {
            message.error("Passwords do not match!");
            setLoading(false);
            return;
        }
        try {
            await axios.post("http://localhost:5000/api/change-password", values);
            message.success("Password changed successfully!");
        } catch (error) {
            message.error("Failed to change password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div className="d-flex flex-wrap justify-content-between w-100" style={{ maxWidth: "100%" }}>
                {/* Student Information Form */}
                <Card title="Student Information" bordered={false} style={{ flex: 1, marginRight: "10px", minWidth: "350px", boxShadow: "0px 4px 12px rgba(0,0,0,0.1)" }}>
                    <Form layout="vertical" onFinish={onFinishPersonalInfo}>
                        <Form.Item label="College ID" name="collegeID" initialValue={collegeID}>
                            <Input disabled />
                        </Form.Item>
                        <Form.Item label="Full Name" name="fullName" rules={[{ required: true, message: "Please enter your full name" }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Course Code" name="courseCode" rules={[{ required: true, message: "Please enter your Course Code" }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Term Number" name="termNumber" rules={[{ required: true, message: "Please select your Term Number" }]}>
                            <Select placeholder="Select Term">
                                <Option value="1">1</Option>
                                <Option value="2">2</Option>
                                <Option value="3">3</Option>
                                <Option value="4">4</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Phone Number" name="phoneNumber" rules={[{ required: true, message: "Please enter your Phone Number" }, { pattern: /^[0-9]{10}$/, message: "Phone Number must be 10 digits" }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={loading} block>
                                Update
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>

                {/* Change Password Form */}
                <Card title="Change Password" bordered={false} style={{ flex: 1, minWidth: "350px", boxShadow: "0px 4px 12px rgba(0,0,0,0.1)" }}>
                    <Form layout="vertical" onFinish={onFinishPassword}>
                        <Form.Item label="Old Password" name="oldPassword" rules={[{ required: true, message: "Please enter your old password" }]}>
                            <Input.Password />
                        </Form.Item>
                        <Form.Item label="New Password" name="newPassword" rules={[{ required: true, message: "Please enter a new password" }]}>
                            <Input.Password />
                        </Form.Item>
                        <Form.Item label="Confirm Password" name="confirmPassword" rules={[{ required: true, message: "Please confirm your password" }]}>
                            <Input.Password />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={loading} block>
                                Update
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </div>
    );
};

export default Profile;