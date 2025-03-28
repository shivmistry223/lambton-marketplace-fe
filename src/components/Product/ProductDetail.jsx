import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    Card,
    Button,
    List,
    Input,
    Rate,
    Layout,
    Tag,
    Modal,
    message,
} from "antd";
import { Container, Row, Col, Image } from "react-bootstrap";
import { ADD_REVIEW, GET_REVIEW, IMAGEDIR, PAYMENT, PRODUCT, STRIPE_PUBLIC_KEY } from "../../utils/constant";
import CustomHeader from "../Header/CustomHeader";
import { getUserId } from "../../utils/helper";
import { loadStripe } from "@stripe/stripe-js";
import CustomFooter from "../CustomFooter/CustomFooter";

const { TextArea } = Input;

const ProductDetail = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState(0);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        fetch(`${PRODUCT}/${productId}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((data) => setProduct(data))
            .catch((error) => {
                messageApi.open({
                    type: "error",
                    content: "Error fetching product : " + error.message,
                });
                navigate("/dashboard");
            });
        fetchReviews()
    }, [productId]);

    const fetchReviews = async () => {
        try {
            const response = await fetch(`${GET_REVIEW}/${productId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch reviews");
            }

            const data = await response.json();
            setReviews(
                data.map((review) => ({
                    rating: review.rating,
                    text: review.comment,
                    user: review.reviewer?.fullName || "Anonymous",
                    date: new Date(review.date).toLocaleDateString(),
                }))
            );
        } catch (error) {
            console.error("Error fetching reviews:", error);
            messageApi.open({
                type: "error",
                content: "Error fetching product : " + error.message,
            });
        }
    };


    const handleAddReview = async () => {
        if (!reviewText || rating === 0) return;

        const newReview = {
            productId,
            comment: reviewText,
            rating,
        };

        try {
            const response = await fetch(ADD_REVIEW, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(newReview),
            });

            if (!response.ok) {
                throw new Error("Failed to submit review");
            }

            const data = await response.json();
            setReviews([...reviews, { ...data, date: new Date(data.date).toLocaleDateString() }]);

            setReviewText("");
            setRating(0);
            fetchReviews();
        } catch (error) {
            console.error("Error submitting review:", error);
            messageApi.open({
                type: "error",
                content: "Error fetching product : " + error.message,
            });
        }
    };

    const isOwnProduct = (id) => getUserId() === id;

    const onUpdate = (id) => navigate(`/update-product/${id}`);

    const handleOwner = () =>
        navigate(`/owner-detail/${product.productOwner?._id}`);

    const handleBuyNow = async () => {
        const stripe = await loadStripe(STRIPE_PUBLIC_KEY);
        const lineItems = [
            {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: product.productName,
                        description: product.productDescription,
                        images: [IMAGEDIR + product.productimageUrl],
                    },
                    unit_amount: product.productPrice * 100,
                },
                quantity: 1,
            },
        ];
        try {
            const response = await fetch(
                PAYMENT,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        lineItems,
                        id: productId,
                    }),
                }
            );

            const session = await response.json();
            const result = stripe.redirectToCheckout({
                sessionId: session.id,
            });
        } catch (error) {
            messageApi.open({
                type: "error",
                content: "Payment error" + error.message,
            });
        }
    };

    const redirectToDashboard = (id) => {
        navigate("/dashboard")
    }

    return (
        <Layout
            style={{ minHeight: "100vh", minWidth: "100vw", background: "#f8f9fa" }}
        >
            {contextHolder}
            <CustomHeader currentKey="3" setCurrentKey={redirectToDashboard} />
            <Container style={{ margin: "10px auto", width: "100%" }}>
                <Row className="mt-4">
                    <Col md={7}>
                        <Card className="d-flex justify-content-center">
                            <Image
                                src={IMAGEDIR + product?.productimageUrl}
                                fluid
                                style={{ height: "400px" }}
                            />
                        </Card>
                    </Col>

                    <Col md={5}>
                        <h2>{product?.productName}</h2>
                        <p>{product?.productDescription}</p>
                        <h5>
                            <strong>{product?.productCatagory}</strong>
                        </h5>
                        <h4 style={{ color: "#d9534f" }}>${product?.productPrice}</h4>
                        <h5>
                            Status:{" "}
                            {product?.isSold ? (
                                <Tag color="red">Sold</Tag>
                            ) : (
                                <Tag color="green">Available</Tag>
                            )}
                        </h5>

                        {isOwnProduct(product?.productOwner?._id) ? (
                            <Button
                                type="primary"
                                block
                                onClick={() => onUpdate(product?._id)}
                                disabled={product.isSold}

                            >
                                Update Product
                            </Button>
                        ) : (
                            <Button
                                type="primary"
                                block
                                disabled={product?.isSold}
                                onClick={handleBuyNow}
                            >
                                {product?.isSold ? "Sold Out" : "Buy Now"}
                            </Button>
                        )}

                        <Card className="mt-4 p-3">
                            <h5>Seller Information</h5>
                            <p className="mt-3">
                                <strong>Name:</strong> {product?.productOwner?.fullName}
                            </p>
                            <Button type="primary" block onClick={handleOwner}>
                                See Profile
                            </Button>
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
                            <Button type="primary" className="mt-2" onClick={handleAddReview} disabled={!product?.isSold}>
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
                                        <small>
                                            By {review.user} on {review.date}
                                        </small>
                                    </Card>
                                </List.Item>
                            )}
                        />
                    </Col>
                </Row>
            </Container>
            <CustomFooter />
        </Layout>
    );
};

export default ProductDetail;