import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    Layout,
    Card,
    Avatar,
    Typography,
    Row,
    Col,
    List,
    message,
    Radio,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { OWNER } from "../../utils/constant";
import CustomHeader from "../Header/CustomHeader";
import { Container } from "react-bootstrap";
import moment from "moment";
import Product from "../Product/Product";

const { Title, Text } = Typography;
const { Content } = Layout;

const OwnerDetail = () => {
    const { ownerId } = useParams();
    const [owner, setOwner] = useState({});
    const [products, setProducts] = useState([]);
    const [mode, setMode] = useState(false);
    const token = localStorage.getItem("token");
    const [loading, setLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${OWNER}/${ownerId}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((data) => {
                setOwner(data.user);
                setProducts(data.products);
            })
            .catch((error) => {
                messageApi.open({
                    type: "error",
                    content: "Error fetching product : " + error.message,
                });
                navigate("/dashboard");
            });
    }, [ownerId]);

    const handleModeChange = (e) => {
        setMode(e.target.value);
    };

    const getAvailableProducts = (flag) => {
        return products.filter((product) => product.isSold === flag).length
    }

    return (
        <Layout
            style={{ minHeight: "100vh", minWidth: "100vw", background: "#f8f9fa" }}
        >
            {contextHolder}

            <CustomHeader />
            <Container style={{ margin: "10px auto", width: "100%" }}>
                <Content>
                    <Card className="shadow-sm mt-3">
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-top gap-3">
                                <Avatar size={80} icon={<UserOutlined />} />
                                <div>
                                    <h2>{owner.fullName}</h2>

                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <p>
                                                <strong>Email:</strong> {owner.userName}
                                            </p>
                                            <p>
                                                <strong>Phone:</strong> {owner.phoneNumber}
                                            </p>
                                            <p>
                                                <strong>Course Code:</strong> {owner.courseCode}
                                            </p>
                                        </div>
                                        <div className="col-md-6">
                                            <p>
                                                <strong>Term Number:</strong> {owner.termNo}
                                            </p>
                                            <p>
                                                <strong>Joined at:</strong>{" "}
                                                {moment(owner.updatedAt?.$date).format(
                                                    "dddd, D MMMM YYYY, h:mm A"
                                                )}
                                            </p>{" "}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex gap-4">
                                <div>
                                    <h3>Available</h3>
                                    <p>{getAvailableProducts(false)}</p>
                                </div>
                                <div>
                                    <h3>Sold</h3>
                                    <p>{getAvailableProducts(true)}</p>
                                </div>
                            </div>
                        </div>
                    </Card>
                    <Card className="mt-3 shadow-sm">
                        <Radio.Group
                            onChange={handleModeChange}
                            value={mode}
                            style={{
                                marginBottom: 8,
                            }}
                        >
                            <Radio.Button value={false}>Available</Radio.Button>
                            <Radio.Button value={true}>Sold</Radio.Button>
                        </Radio.Group>
                        <Card className="p-3 m-3">
                            {loading ? (
                                <Skeleton active />
                            ) : products.filter((product) => product.isSold === mode).length >
                                0 ? (
                                <>
                                    <div
                                        className="d-flex flex-wrap justify-content-start gap-4"
                                        style={{ gap: "20px" }}
                                    >
                                        {products
                                            .filter((product) => product.isSold === mode)
                                            .map((product, _id) => (
                                                <Product
                                                    product={product}
                                                    key={_id}
                                                    currentKey="1"
                                                    fromProfile
                                                />
                                            ))}
                                    </div>
                                </>
                            ) : (
                                <p>No products available</p>
                            )}
                        </Card>
                    </Card>
                </Content>
            </Container>
        </Layout>
    );
};

export default OwnerDetail;