import React from "react";
import { Typography } from "antd";
import AddVariationForm from "./addvariationForm.component";

const AddProductVariation = () => {
  const { Title } = Typography;
  return (
    <>
      <Title level={4}>Add Variation</Title>
      <AddVariationForm />
    </>
  );
};

export default AddProductVariation;
