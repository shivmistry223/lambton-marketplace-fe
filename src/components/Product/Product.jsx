import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Space, Tag } from "antd";
import { IMAGEDIR } from "../../utils/constant";
import { UserOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { getUserId, truncateText } from "../../utils/helper";
import { Modal as AntModal } from "antd";

const Product = ({ product, currentKey, handleMarkAsSold, isModalVisible, setIsModalVisible }) => {
    const currentUserId = getUserId();

    const navigate = useNavigate()

    const isOwner = product?.productOwner?._id === currentUserId && currentKey === "2";

    const { productOwner } = product


    const onUpdate = (id) => navigate(`/update-product/${id}`)

    const onView = (id) => navigate(`/product-detail/${id}`)

    return (<>
        <Card
            style={{
                width: "100%",
                margin: "10px",
                maxWidth: "270px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                borderRadius: "10px",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            className="product-card"
        >
            <Card.Img
                variant="top"
                src={IMAGEDIR + product.productimageUrl}
                alt={product.productName}
                style={{
                    height: "200px",
                    objectFit: "contain",
                    borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px",
                    padding: "15px",
                }}
            />
            <Card.Body>
                <Card.Title>{truncateText(product.productName, 20)}</Card.Title>
                <Card.Text>
                    <strong>$ {" "}{product.productPrice}</strong>
                </Card.Text>
                <Card.Text>
                    {product.isSold ? (
                        <Tag color="red">Sold</Tag>
                    ) : (
                        <Tag color="green">Available</Tag>
                    )}
                </Card.Text>
                <Card.Text>
                    <span>
                        <UserOutlined /> {productOwner.fullName}
                    </span>
                </Card.Text>

                <div className="d-flex gap-2">
                    <Button
                        variant="primary"
                        style={{ width: !isOwner && "100%", flex: 1, }}
                        onClick={() => onView(product._id)}
                    >
                        View
                    </Button>
                    {isOwner && !product.isSold && (
                        <Button
                            variant="outline-primary"
                            onClick={() => onUpdate(product._id)}
                            style={{ flex: 1 }}

                        >
                            Update
                        </Button>
                    )}
                </div>

                {isOwner && (
                    <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
                        <Button
                            variant="danger"
                            onClick={() => setIsModalVisible(true)}
                            style={{ flex: 1 }}
                            disabled={product.isSold}
                        >
                            Mark As Sold
                        </Button>
                    </div>
                )}



            </Card.Body>
        </Card >
        <AntModal
            title={<><ExclamationCircleOutlined /> Confirm Action</>}
            open={isModalVisible}
            onOk={() => handleMarkAsSold(product._id)}
            onCancel={() => setIsModalVisible(false)}
            okText="Yes, Mark as Sold"
            cancelText="Cancel"
        >
            <p>Are you sure you want to mark this product as sold?</p>
        </AntModal>
    </>
    );
};

export default Product;
