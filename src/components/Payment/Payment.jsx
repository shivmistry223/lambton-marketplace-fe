import React, { useEffect, useState } from "react";
import {
    Button,
    Typography,
    Space,
    Layout,
    Row,
    Col,
    Card,
    message,
} from "antd";
import { useNavigate } from "react-router-dom";
import CustomHeader from "../Header/CustomHeader";
import { Container } from "react-bootstrap";
import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";
import { UPDATE_STATUS } from "../../utils/constant";

const { Title, Text } = Typography;

const Payment = () => {
    const navigate = useNavigate();
    const [status, setStatus] = useState(false);
    const [productId, setProductId] = useState("");
    const token = localStorage.getItem("token");
    const [messageApi, contextHolder] = message.useMessage();



    const handleProductRedirect = () => {
        navigate(`/product-detail/${productId}`);
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const orderId = urlParams.get("id");
        const paymentStatus = urlParams.get("paymentStatus");

        if (!orderId) handleDashboardRedirect();

        setProductId(orderId);

        if (orderId && paymentStatus === "success") {
            setData(orderId);
        }
    }, []);

    const setData = async (orderId) => {
        const data = { orderId, isSold: true };

        try {
            const response = await fetch(UPDATE_STATUS, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                setStatus(false);
                messageApi.open({
                    type: "error",
                    content: "Something went wrong",
                });
            } else {
                setStatus(true);
            }
        } catch (error) {
            setStatus(false);
            console.log("errpr");
            messageApi.open({
                type: "error",
                content: data.error || "Failed to fetch data.",
            });
        }
    };
    return (
        <Layout style={{ minHeight: "100vh", minWidth: "100vw" }}>
            {contextHolder}
            <CustomHeader />
            <Container className="mt-4">
                <Row
                    justify="center"
                    align="middle"
                    style={{ flex: 1, padding: "20px" }}
                >
                    <Col xs={24} sm={18} md={12} lg={10} xl={8}>
                        <Card
                            style={{
                                textAlign: "center",
                                borderRadius: "12px",
                                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                            }}
                        >
                            <Space
                                direction="vertical"
                                align="center"
                                style={{ width: "100%" }}
                            >
                                {status === true ? (
                                    <>
                                        <CheckCircleTwoTone
                                            twoToneColor="#52c41a"
                                            style={{ fontSize: "64px" }}
                                        />
                                        <Title level={2} style={{ marginBottom: 0 }}>
                                            Payment Successful
                                        </Title>
                                        <Text
                                            type="secondary"
                                            style={{ fontSize: "16px", textAlign: "center" }}
                                        >
                                            Your payment was successful. Thank you for your purchase!
                                        </Text>
                                    </>
                                ) : (
                                    <>
                                        <CloseCircleTwoTone
                                            twoToneColor="#ff4d4f"
                                            style={{ fontSize: "64px" }}
                                        />
                                        <Title
                                            level={2}
                                            style={{ marginBottom: 0, color: "#ff4d4f" }}
                                        >
                                            Payment Failed
                                        </Title>
                                        <Text
                                            type="secondary"
                                            style={{ fontSize: "16px", textAlign: "center" }}
                                        >
                                            Your payment could not be processed. Please try again or
                                            contact support.
                                        </Text>

                                    </>
                                )}
                                <Button
                                    type="primary"
                                    size="large"
                                    onClick={handleProductRedirect}
                                    block
                                >
                                    {status ? "Continue" : "Try Again"}
                                </Button>
                            </Space>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
};

export default Payment;
