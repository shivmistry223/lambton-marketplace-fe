import React, { useEffect } from "react";
import { Layout, Menu, Button, Avatar, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { userExists } from "../../utils/helper";

const { Header } = Layout;

const CustomHeader = () => {

    const navigate = useNavigate()

    const token = localStorage.getItem("token")

    const navigateToProduct = () => navigate("/add-product");

    useEffect(() => {
        if (!userExists()) {
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
                },
            });
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
    };

    return (
        <Header className="d-flex justify-content-between align-items-center px-4 bg-white shadow-sm">
            <div className="d-flex align-items-center gap-4">
                <img
                    src="/src/assets/LambtonCollege_Logo.png"
                    alt="Lambton Logo"
                    style={{ height: "40px" }}
                />
                <Button type="primary" className="me-3" onClick={navigateToProduct}>Add Product +</Button>

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
                <Avatar size="large" icon={<UserOutlined />} />
                <Button className="ms-2" type="primary" danger onClick={handleLogout}>Logout</Button>
            </div>
        </Header>
    );
};

export default CustomHeader;
