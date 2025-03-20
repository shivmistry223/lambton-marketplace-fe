import React from "react";
import { Layout } from "antd";

const { Footer } = Layout;

const CustomFooter = () => {
    return (
        <Footer style={{ textAlign: "center" }}>
            © {new Date().getFullYear()} Lambton Marketplace. All Rights Reserved.
        </Footer>
    );
};

export default CustomFooter;
