import React from "react";
import { Form, Button, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import AttributeCard from "./attributeCard.component";

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const AddVariationForm = () => {
  const { Item } = Form;

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Form {...layout} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Item
          label="Product Attribute Name"
          name="attrSetName"
          rules={[
            {
              required: true,
              message: "Please input product attribute name",
            },
          ]}
        >
          <Input placeholder="Enter collective name for variation" />
        </Item>
        <Item label="Description" name="description">
          <Input.TextArea placeholder="Enter description ..." />
        </Item>
        <Item name="productVariation" label="Product variation">
          <Form.List name="attribute">
            {(fields, { add, remove }) => {
              return (
                <>
                  {fields.map((field) => (
                    <>
                      <AttributeCard remove={remove} field={field} />
                    </>
                  ))}

                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => {
                        add();
                      }}
                      block
                    >
                      <PlusOutlined /> Add attribute
                    </Button>
                  </Form.Item>
                </>
              );
            }}
          </Form.List>
        </Item>
        <Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Item>
      </Form>
    </>
  );
};

export default AddVariationForm;
