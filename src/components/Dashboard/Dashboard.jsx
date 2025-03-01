import React, { useEffect } from "react";
import { Layout, Menu, Tabs, Button, Avatar, message } from "antd";
import { Container, Row, Col } from "react-bootstrap";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import CustomHeader from "../Header/CustomHeader";

const { Header, Content } = Layout;

const Dashboard = () => {
    const navigate = useNavigate();


    return (
        <Layout style={{ minHeight: "100vh", minWidth: "100vw" }}>
            <CustomHeader />
            <Container className="mt-4">

            </Container>
        </Layout>
    );
};

export default Dashboard;