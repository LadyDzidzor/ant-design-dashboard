import React from "react";
import { Typography } from "antd";
import AddProductForm from "./addproductForm.component";

const AddProduct = () => {
  const { Title } = Typography;
  return (
    <>
      <Title level={4}>Add Product</Title>
      <div style={{ marginBottom: 18, marginTop: 24 }}>
        <AddProductForm />
      </div>
    </>
  );
};

export default AddProduct;
