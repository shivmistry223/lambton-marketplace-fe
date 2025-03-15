import React, { useEffect, useState } from "react";
import { Layout, Menu, Button, Avatar, message, Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { userExists } from "../../utils/helper";
import { LOGOUT } from "../../utils/constant";

const { Header } = Layout;
const { Search } = Input;

const CustomHeader = ({ currentKey = "1", setCurrentKey = () => { }, searchValue = "", handleSearch = () => { } }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!userExists()) {
            navigate("/login");
            return;
        }
    }, []);

    const navigateToProduct = () => navigate("/add-product");

    const handleLogout = async () => {
        try {
            const response = await fetch(LOGOUT, {
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
                localStorage.removeItem("user");
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
                    style={{ height: "40px", cursor: "pointer" }}
                    onClick={() => navigate("/dashboard")}
                />
                <Button type="primary" className="me-3" onClick={navigateToProduct}>
                    Add Product +
                </Button>
                <Menu
                    mode="horizontal"
                    defaultSelectedKeys={["1"]}
                    className="ms-4"
                    items={[
                        { key: "1", label: <b>Dashboard</b>, className: currentKey == "1" && "text-primary" },
                        { key: "2", label: "Your Products", className: currentKey == "2" && "text-primary" },
                    ]}
                    selectedKeys={currentKey}
                    onSelect={(e) => setCurrentKey(e.key)}
                    selectable={true}
                />
            </div>
            <Search
                placeholder="Search products..."
                onChange={(e) => handleSearch(e.target.value)}
                value={searchValue}
                style={{ width: 300 }}
                allowClear
            />
            <div className="d-flex align-items-center">
                <Avatar size="large" style={{ cursor: "pointer" }} icon={<UserOutlined />} onClick={() => navigate("/profile")} />
                <Button className="ms-2" type="primary" danger onClick={handleLogout}>
                    Logout
                </Button>
            </div>
        </Header>
    );
};

export default CustomHeader;