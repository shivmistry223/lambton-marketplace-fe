import React, { useEffect, useState } from "react";
import {
    Layout,
    Tabs,
    message,
    Pagination,
    Skeleton,
} from "antd";
import { Container, Row, Col, Card, TabPane } from "react-bootstrap";
import CustomHeader from "../Header/CustomHeader";
import Product from "../Product/Product";
import { PRODUCT, PRODUCT_TYPES, UPDATE_STATUS } from "../../utils/constant";
import { getUserId } from "../../utils/helper";
import CustomFooter from "../CustomFooter/CustomFooter";

const { Header, Content } = Layout;

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState("all");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(10);
    const [pageSize, setPageSize] = useState(8);
    const [currentKey, setCurrentKey] = useState(1);
    const [searchValue, setSearchValue] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);

    const token = localStorage.getItem("token");
    const ownerId = getUserId();
    let searchTimeout;

    const [messageApi, contextHolder] = message.useMessage();

    const checkOwner = () => {
        return currentKey === "2" ? `&ownerId=${ownerId}` : "";
    };
    useEffect(() => {
        fetchProducts(activeTab, currentPage);
    }, [activeTab, currentPage, currentKey]);

    const fetchProducts = async (category, page) => {
        setLoading(true);

        const url = `${PRODUCT}?category=${category}&page=${page}&pageSize=${pageSize}${checkOwner()}`;
        try {
            const response = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setProducts(data.products);
            setTotalPage(data.totalCount);
        } catch (error) {
            messageApi.open({
                type: "error",
                content: "Something went wrong",
            });
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

    const getLabelByValue = (value) => {
        const product = PRODUCT_TYPES.find((item) => item.value === value);
        return product ? product.label : "All";
    };

    const handleSearch = (value) => {
        setLoading(true);
        setSearchValue(value);
        clearTimeout(searchTimeout);

        const url = `${PRODUCT}?search=${value}&category=${activeTab}&page=${currentPage}&pageSize=${pageSize}${checkOwner()}`;

        searchTimeout = setTimeout(async () => {
            try {
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                setProducts(data.products);
                setTotalPage(data.totalCount);
            } catch (error) {
                message.error("Error fetching search results.");
            }
        }, 1000);
        setLoading(false);
    };

    const handleMarkAsSold = async (id) => {
        const data = { orderId: id, isSold: true };

        try {
            const response = await fetch(UPDATE_STATUS, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });

            await response.json();

            if (!response.ok) {
                setIsModalVisible(false);
                messageApi.open({
                    type: "error",
                    content: "Something went wrong",
                });
            } else {
                setIsModalVisible(false);
                fetchProducts(activeTab, currentPage);
            }
        } catch (error) {
            setIsModalVisible(false);
            messageApi.open({
                type: "error",
                content: error.message || "Failed to fetch data.",
            });
        }
    };

    return (
        <Layout style={{ minHeight: "100vh", minWidth: "100vw" }}>
            {contextHolder}
            <CustomHeader
                currentKey={currentKey}
                setCurrentKey={setCurrentKey}
                searchValue={searchValue}
                handleSearch={handleSearch}
            />
            <Container>
                <Row className="flex-column align-items-center ">
                    <Card className="p-3 m-3">
                        <h3>{currentKey === "1" ? "Welcome," : "Your Products"}</h3>
                        <Tabs
                            defaultActiveKey="All"
                            onChange={handleTabChange}
                            size="large"
                        >
                            <TabPane tab="All" key="all" />
                            {PRODUCT_TYPES.map((type) => (
                                <TabPane tab={type.label} key={type.value} />
                            ))}
                        </Tabs>
                    </Card>

                    <Card className="p-3 m-3">
                        <h3>{getLabelByValue(activeTab)} Products</h3>
                        {loading ? (
                            <Skeleton active />
                        ) : products.length > 0 ? (
                            <>
                                <div
                                    className="d-flex flex-wrap justify-content-start gap-4"
                                    style={{ gap: "20px" }}
                                >
                                    {products.map((product, _id) => (
                                        <Product
                                            product={product}
                                            key={_id}
                                            currentKey={currentKey}
                                            handleMarkAsSold={handleMarkAsSold}
                                            isModalVisible={isModalVisible}
                                            setIsModalVisible={setIsModalVisible}
                                        />
                                    ))}
                                </div>
                                <Pagination
                                    current={currentPage}
                                    pageSize={pageSize}
                                    total={totalPage}
                                    onChange={handlePageChange}
                                    style={{
                                        textAlign: "center",
                                        marginTop: "20px",
                                        justifyContent: "center",
                                    }}
                                />
                            </>
                        ) : (
                            <p>No products available</p>
                        )}
                    </Card>
                </Row>
            </Container>
            <CustomFooter />
        </Layout>
    );
};

export default Dashboard;
