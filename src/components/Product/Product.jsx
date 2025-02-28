import React from "react";
import { Card, Button } from "react-bootstrap";
import { Space, Tag } from "antd";
import { IMAGEDIR } from "../../utils/constant";


const Product = (product) => {


    const currentUserId = 12

    // const isOwner = productOwner === currentUserId;
    const isOwner = true;

    return (
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
                style={{ height: "200px", objectFit: "cover", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}
            />
            <Card.Body>
                <Card.Title>{product.productName}</Card.Title>
                <Card.Text>
                    <strong>Price:</strong> ${product.productPrice} <br />
                    <strong>Description:</strong> {product.productDescription} <br />
                    {product.isSold ? <Tag color="red">Sold</Tag> : <Tag color="green">Available</Tag>}
                </Card.Text>
                {/* View button on one line */}
                <Space>
                    <Button variant="primary" onClick={() => onView(product._id)}>View</Button>
                </Space>

                {/* Update & Delete buttons below */}
                {isOwner && !product.isSold && (
                    <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
                        <Button variant="warning" onClick={() => onUpdate(product._id)} style={{ flex: 1 }}>Update</Button>
                        <Button variant="danger" onClick={() => onDelete(product._id)} style={{ flex: 1 }}>Delete</Button>
                    </div>
                )}
            </Card.Body>
        </Card>
    );
};

export default Product;
