import React, { useEffect } from "react";
import { Layout, Menu, Tabs, Button, Avatar, message } from "antd";
import { Container, Row, Col } from "react-bootstrap";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Header, Content } = Layout;

const Dashboard = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            message.error("No token found, please login again.");
            navigate("/login");
            return;
        }
    }, []);


    const handleLogout = async () => {
        try {
            const response = await fetch("http://localhost:5000/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            })
            const data = await response.json();

            if (response.ok) {
                message.success(data.message || "Logged out successfully.");
                localStorage.removeItem("token");
                navigate("/login");
            } else {
                message.error(data.message || "Logout failed.");
            }
        } catch (error) {
            message.error("Network error, please try again.");
        }
    }

    return (
        <Layout style={{ minHeight: "100vh", minWidth: "100vw" }}>
            <Header className="d-flex justify-content-between align-items-center px-4 bg-white shadow-sm">
                <div className="d-flex align-items-center">
                    <img src="/src/assets/LambtonCollege_Logo.png" alt="Lambton Logo" style={{ height: "40px" }} />
                    <Menu
                        mode="horizontal"
                        defaultSelectedKeys={["1"]}
                        className="ms-4"
                        items={[
                            { key: "1", label: <b>Your Dashboard</b>, className: "text-primary" },
                            { key: "2", label: "Your Products" },

                        ]}
                    />
                </div>
                <div className="d-flex align-items-center">
                    <Button type="primary" className="me-3">Add Product +</Button>
                    <Avatar size="large" icon={<UserOutlined />} />
                    <Button className="ms-2" type="primary" danger onClick={handleLogout}>Logout</Button>
                </div>
            </Header>

            <Container className="mt-4">

            </Container>
        </Layout>
    );
};

export default Dashboard;