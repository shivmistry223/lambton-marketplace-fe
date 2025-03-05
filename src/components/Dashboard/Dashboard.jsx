import React, { useEffect } from "react";
import { Layout, Menu, Tabs, Button, Avatar, message } from "antd";
import { Container, Row, Col } from "react-bootstrap";
import CustomHeader from "../Header/CustomHeader";
import Product from "../Product/Product";
import { PRODUCT_DATA } from "../../utils/constant";

const { Header, Content } = Layout;

const Dashboard = () => {


    return (
        <Layout style={{ minHeight: "100vh", minWidth: "100vw" }}>
            <CustomHeader />
            <Container className="mt-4">
                <Product {...PRODUCT_DATA} />
            </Container>
        </Layout>
    );
};

export default Dashboard;