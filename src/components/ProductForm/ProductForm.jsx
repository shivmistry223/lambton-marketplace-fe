import React, { useEffect, useState } from "react";
import { Form, Button, Input, Select, Layout, Upload, message, Typography, Alert } from "antd";
import { Container, Row, Col } from "react-bootstrap";
import CustomHeader from "../Header/CustomHeader";
import { handleLogout } from "../../utils/helper";
import { UploadOutlined } from "@ant-design/icons";
import { PRODUCT_TYPES } from "../../utils/constant";
import { useParams } from "react-router-dom";

const { Option } = Select;
const { Title } = Typography;

const ProductForm = () => {
    const { id } = useParams();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [messageData, setMessageData] = useState(null);
    const [file, setFile] = useState(null);
    const [existingImage, setExistingImage] = useState("");

    useEffect(() => {
        if (id) {
            fetchProductData(id);
        }
    }, [id]);

    const fetchProductData = async (productId) => {
        try {
            const response = await fetch(`http://localhost:5000/product/${productId}`);
            const data = await response.json();

            if (response.ok) {
                form.setFieldsValue({
                    productName: data.productName,
                    productDescription: data.productDescription,
                    productCategory: data.productCatagory,
                    productPrice: data.productPrice,
                });
                setExistingImage(data.productimageUrl);
            } else {
                setMessageData({ type: "error", text: "Failed to fetch product details." });
            }
        } catch (error) {
            setMessageData({ type: "error", text: "Something went wrong while fetching data." });
        }
    };

    const handleFinish = async (values) => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");

            const formData = new FormData();
            formData.append("productName", values.productName);
            formData.append("productDescription", values.productDescription);
            formData.append("productCatagory", values.productCategory);
            formData.append("productPrice", values.productPrice);

            if (file) {
                formData.append("productImage", file);
            }

            const method = id ? "PATCH" : "POST";
            const url = id ? `http://localhost:5000/product/${id}` : "http://localhost:5000/product";

            const response = await fetch(url, {
                method: method,
                body: formData,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setLoading(false);

            if (response.ok) {
                setMessageData({
                    type: "success",
                    text: id ? "Product updated successfully!" : "Product added successfully!",
                });
                form.resetFields();
            } else {
                setMessageData({
                    type: "error",
                    text: "Something went wrong.",
                });
            }
        } catch (error) {
            setLoading(false);
            setMessageData({
                type: "error",
                text: "Something went wrong.",
            });
        }
    };

    const handleFileChange = (e) => {
        setFile(e.file);
    };

    return (
        <Layout style={{ minHeight: "100vh", minWidth: "100vw" }}>
            <CustomHeader handleLogout={handleLogout} />
            <Container className="mt-4">
                <Row className="justify-content-center">
                    <Col md={6}>
                        <div style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", padding: "20px", borderRadius: "8px", background: "white" }}>
                            <Title level={2} className="text-center">
                                {id ? "Update Product" : "Add Product"}
                            </Title>
                            {messageData && (
                                <Alert
                                    className="mt-3"
                                    message={messageData.text}
                                    type={messageData.type}
                                    showIcon
                                />
                            )}
                            <Form form={form} layout="vertical" onFinish={handleFinish}>
                                <Form.Item label="Product Name" name="productName" rules={[{ required: true, message: "Please enter the product name" }]}>
                                    <Input placeholder="Enter product name" />
                                </Form.Item>

                                <Form.Item label="Product Description" name="productDescription" rules={[{ required: true, message: "Please enter the product description" }]}>
                                    <Input.TextArea rows={4} placeholder="Enter product description" />
                                </Form.Item>

                                <Form.Item label="Category" name="productCategory" rules={[{ required: true, message: "Please select a category" }]}>
                                    <Select placeholder="Select a category">
                                        {PRODUCT_TYPES.map((type) => (
                                            <Option key={type.value} value={type.value}>
                                                {type.label}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>

                                <Form.Item label="Price ($)" name="productPrice" rules={[{ required: true, message: "Please enter the price" }]}>
                                    <Input type="number" placeholder="Enter price" />
                                </Form.Item>

                                <Form.Item label="Upload Image" name="productImage">
                                    {existingImage && !file && (
                                        <div>
                                            <img
                                                src={`http://localhost:5000${existingImage}`}
                                                alt="Product"
                                                style={{ width: "100px", marginBottom: "10px" }}
                                            />
                                        </div>
                                    )}
                                    <Upload beforeUpload={() => false} listType="picture" onChange={handleFileChange}>
                                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                    </Upload>
                                </Form.Item>

                                <Form.Item>
                                    <Button type="primary" htmlType="submit" block loading={loading}>
                                        {id ? "Update Product" : "Add Product"}
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
};

export default ProductForm;
