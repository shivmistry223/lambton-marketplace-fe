import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Button, List, Input, Rate, Layout, Tag } from "antd";
import { Container, Row, Col, Image } from "react-bootstrap";
import { IMAGEDIR, PRODUCT } from "../../utils/constant";
import CustomHeader from "../Header/CustomHeader";
import { getUserId } from "../../utils/helper";

const { TextArea } = Input;

const ProductDetail = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState(0);
    const token = localStorage.getItem("token");

    const navigate = useNavigate()


    useEffect(() => {
        fetch(`${PRODUCT}/${productId}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((data) => setProduct(data))
            .catch((error) => console.error("Error fetching product:", error));

    }, [productId]);

    const handleAddReview = async () => {
        if (!reviewText) return;

        const newReview = {
            text: reviewText,
            rating,
            user: "Anonymous",
            date: new Date().toLocaleDateString(),
        };

        setReviews([...reviews, newReview]);
        setReviewText("");
        setRating(0);

        try {
            //    api call in future
        } catch (error) {
            console.error("Error submitting review:", error);
        }
    };
    const isOwnProduct = (id) => getUserId() === id

    const onUpdate = (id) => navigate(`/update-product/${id}`)

    if (!product) return <div>Loading...</div>;

    return (
        <Layout style={{ minHeight: "100vh", minWidth: "100vw", background: "#f8f9fa" }}>
            <CustomHeader />
            <Container style={{ margin: "10px auto", width: "100%" }}>
                <Row className="mt-4">
                    <Col md={7} >
                        <Card className="d-flex justify-content-center">
                            <Image src={IMAGEDIR + product.productimageUrl} fluid style={{ height: "400px" }} />
                        </Card>

                    </Col>

                    <Col md={5}>
                        <h2>{product.productName}</h2>
                        <p>{product.productDescription}</p>
                        <h5>
                            <strong> {product.productCatagory}</strong>
                        </h5>
                        <h4 style={{ color: "#d9534f" }}>${product.productPrice}</h4>
                        <h5>Status: {product.isSold ? <Tag color="red">Sold</Tag> : <Tag color="green">Available</Tag>}</h5>

                        {isOwnProduct(product.productOwner._id) ? <Button type="primary" block onClick={() => onUpdate(product._id)}
                        >
                            Update Product
                        </Button>
                            : <Button type="primary" block disabled={product.isSold}>
                                {product.isSold ? "Sold Out" : "Buy Now"}
                            </Button>
                        }

                        <Card className="mt-4 p-3">
                            <h5>Seller Information</h5>
                            <p className="mt-3">
                                <strong>Name:</strong> {product.productOwner?.fullName}
                            </p>
                            <Button type="primary" block>See Profile</Button>
                        </Card>
                    </Col>
                </Row>


                <Row className="mt-4">
                    <Col md={12}>
                        <h3>Reviews</h3>

                        <Card className="p-3">
                            <h5>Add a Review</h5>
                            <Rate onChange={setRating} value={rating} />
                            <TextArea
                                rows={3}
                                placeholder="Write your review..."
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                            />
                            <Button type="primary" className="mt-2" onClick={handleAddReview}>
                                Submit Review
                            </Button>
                        </Card>

                        <List
                            className="mt-3"
                            itemLayout="vertical"
                            dataSource={reviews}
                            renderItem={(review) => (
                                <List.Item>
                                    <Card>
                                        <Rate disabled value={review.rating} />
                                        <p>{review.text}</p>
                                        <small>By {review.user} on {review.date}</small>
                                    </Card>
                                </List.Item>
                            )}
                        />
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
};

export default ProductDetail;