import React from "react";
import { Card, Button } from "react-bootstrap";
import { Space, Tag } from "antd";
import { IMAGEDIR } from "../../utils/constant";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Product = (product) => {
    const currentUserId = 12;

    const navigate = useNavigate()

    // const isOwner = productOwner === currentUserId;
    const isOwner = true;
    const onUpdate = (id) => {
        navigate(`/update-product/${id}`)
    }
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
                style={{
                    height: "200px",
                    objectFit: "contain",
                    borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px",
                    padding: "15px",
                }}
            />
            <Card.Body>
                <Card.Title>{product.productName}</Card.Title>
                <Card.Text>
                    <strong>$ {" "}{product.productPrice}</strong>
                </Card.Text>
                <Card.Text>
                    {product.fromProfile && product.isSold ? (
                        <Tag color="red">Sold</Tag>
                    ) : (
                        <Tag color="green">Available</Tag>
                    )}
                </Card.Text>
                <Card.Text>
                    <span>
                        <UserOutlined /> Shiv Mistry
                    </span>
                </Card.Text>

                <div>
                    <Button
                        variant="primary"
                        style={{ width: "100%" }}
                        onClick={() => onView(product._id)}
                    >
                        View
                    </Button>
                </div>

                {isOwner && (
                    <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
                        <Button
                            variant="outline-primary"
                            onClick={() => onUpdate(product._id)}
                            style={{ flex: 1 }}
                        >
                            Update
                        </Button>
                        <Button
                            variant="danger"
                            onClick={() => onDelete(product._id)}
                            style={{ flex: 1 }}
                        >
                            Delete
                        </Button>
                    </div>
                )}
            </Card.Body>
        </Card>
    );
};

export default Product;
