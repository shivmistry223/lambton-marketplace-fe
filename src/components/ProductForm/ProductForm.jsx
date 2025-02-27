import React, { useState } from "react";
import { Form, Button, Input, Select, Layout, Upload, message, Typography, Alert } from "antd";
import { Container, Row, Col } from "react-bootstrap";
import CustomHeader from "../Header/CustomHeader";
import { handleLogout } from "../../utils/helper";
import { UploadOutlined } from "@ant-design/icons";
import { PRODUCT_TYPES } from "../../utils/constant";
import { request } from '../../utils/request'
const { Option } = Select;
const { Title } = Typography;

const ProductForm = ({ onSubmit }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [file, setFile] = useState(null);

    const handleFinish = async (values) => {
        try {
            setLoading(true);

            const token = localStorage.getItem("token")

            const formData = new FormData();
            formData.append("productName", values["productName"]);
            formData.append("productDescription", values["productDescription"]);
            formData.append("productCatagory", values["productCategory"]);
            formData.append("productPrice", values["productPrice"]);
            formData.append("productImage", file);


            const response = await fetch("http://localhost:5000/product", {
                method: "post",
                body: formData,
                headers: new Headers({
                    "Access-Control-Allow-Origin": "http://localhost:5173",
                    Authorization: `Bearer ${token}`,

                }),
            })

            setLoading(false);

            if (response.ok) {
                setMessage({
                    type: "success",
                    text: "Product added successfully!",
                });
                form.resetFields();
            } else {
                setError(data.message || "Something went wrong");
            }

        } catch (e) {
            setLoading(false)
            setMessage({
                type: "error",
                text: e.error || "Something went wrong.",
            });
        } finally {
            setLoading(false);
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
                            <Title level={2} className="text-center">Add New Product</Title>
                            {message && (
                                <Alert
                                    className="mt-3"
                                    message={message.text}
                                    type={message.type}
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

                                <Form.Item label="Upload Image" name="productImage" rules={[{ required: true, message: "Please upload an image" }]}>
                                    <Upload beforeUpload={() => false} listType="picture" onChange={handleFileChange}>
                                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                    </Upload>
                                </Form.Item>

                                <Form.Item>
                                    <Button type="primary" htmlType="submit" block loading={loading}>
                                        Add Product
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
