import React, { useEffect } from "react";
import { Layout, Menu, Button, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { userExists } from "../../utils/helper";

const { Header } = Layout;

const CustomHeader = ({ handleLogout }) => {

    const navigate = useNavigate()

    const navigateToProduct = () => navigate("/add-product");

    useEffect(() => {
        if (!userExists()) {
            navigate("/login");
            return;
        }
    }, []);

    return (
        <Header className="d-flex justify-content-between align-items-center px-4 bg-white shadow-sm">
            <div className="d-flex align-items-center gap-4">
                <img
                    src="/src/assets/LambtonCollege_Logo.png"
                    alt="Lambton Logo"
                    style={{ height: "40px", cursor: "pointer" }}
                    onClick={() => navigate("/dashboard")}
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
                <Avatar size="large" style={{cursor:"pointer"}} icon={<UserOutlined />} onClick={() => navigate("/profile")}/>
                <Button className="ms-2" type="primary" danger onClick={handleLogout}>Logout</Button>
            </div>
        </Header>
    );
};

export default CustomHeader;
