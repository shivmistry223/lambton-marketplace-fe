import React from "react";
import { Layout } from "antd";

const { Footer } = Layout;

const CustomFooter = () => {
    return (
        <Footer style={{ textAlign: "center", margin: "5px 0px", }}>
            © {new Date().getFullYear()} Lambton Marketplace. All Rights Reserved.
        </Footer>
    );
};

export default CustomFooter;
