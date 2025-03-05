import React, { useEffect, useState } from "react";
import { Layout, Menu, Tabs, Button, Avatar, message, Pagination, Skeleton } from "antd";
import { Container, Row, Col, Card, TabPane } from "react-bootstrap";
import CustomHeader from "../Header/CustomHeader";
import Product from "../Product/Product";
import { PRODUCT, PRODUCT_DATA } from "../../utils/constant";

const { Header, Content } = Layout;

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState("all");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [pageSize, setPageSize] = useState(8);

    const token = localStorage.getItem("token")

    useEffect(() => {
        fetchProducts(activeTab, currentPage);
    }, [activeTab, currentPage]);

    const fetchProducts = async (category, page) => {
        setLoading(true);
        const url = `${PRODUCT}?category=${category}&page=${page}&pageSize=${pageSize}`
        try {
            const response = await fetch(url,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                },
            );
            const data = await response.json();
            setProducts(data.products);
            setTotalPage(data.totaPages)
            setPageSize(data.totalCount)
        } catch (error) {
            console.error("Error fetching products:", error);
        }
        setLoading(false);
    };
    const handleTabChange = (key) => {
        setActiveTab(key);
        setCurrentPage(1);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };


    return (
        <Layout style={{ minHeight: "100vh", minWidth: "100vw" }}>
            <CustomHeader />
            <Container>
                <Row className="flex-column align-items-center ">

                    <Card className="p-3 m-3">
                        <h3>Welcome,</h3>
                        <Tabs defaultActiveKey="All" onChange={handleTabChange} size="large">
                            <TabPane tab="All" key="all" />
                            <TabPane tab="Book" key="book" />
                            <TabPane tab="Clothing" key="clothing" />
                            <TabPane tab="Sport" key="sport" />
                            <TabPane tab="Electronic" key="electronic" />
                        </Tabs>
                    </Card>

                    <Card className="p-3 m-3">
                        <h3>Products ({activeTab})</h3>
                        {loading ? (
                            <Skeleton active />
                        ) : products.length > 0 ? (
                            <>
                                <div className="d-flex flex-wrap justify-content-start gap-4" style={{ gap: "20px" }}>
                                    {products.map((product) => (
                                        <Product {...product} />
                                    ))}
                                </div>
                                <Pagination
                                    current={currentPage}
                                    pageSize={pageSize}
                                    total={totalPage}
                                    onChange={handlePageChange}
                                    style={{ textAlign: "center", marginTop: "20px", justifyContent: "center" }}
                                />
                            </>
                        ) : (
                            <p>No products available</p>
                        )}
                    </Card>

                </Row>
            </Container>
        </Layout>
    );
};

export default Dashboard;