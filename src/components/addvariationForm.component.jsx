import React, { useState } from "react";
import {
  Form,
  Button,
  Input,
  InputNumber,
  Card,
  Space,
  Switch,
  Tooltip,
} from "antd";
import {
  MinusCircleOutlined,
  PlusOutlined,
  CheckOutlined,
  CloseOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

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
  const [primaryAttrPrice, setAttrPrice] = useState(false);
  const { Item } = Form;

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onChange = (value) => {
    console.log("changed", value);
  };

  const onPrimarySwitch = (checked) => {
    console.log(`switch to ${checked}`);
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
                      <Card
                        key={field.key}
                        extra={
                          <MinusCircleOutlined
                            onClick={() => {
                              remove(field.name);
                            }}
                          />
                        }
                        style={{ marginBottom: 10 }}
                      >
                        <Form.Item
                          {...field}
                          name={[field.name, "attrName"]}
                          fieldKey={[field.fieldKey, "attrName"]}
                        >
                          <Input placeholder="Attribute Name" />
                        </Form.Item>
                        <div style={{ marginBottom: 10 }}>
                          Make primary attribute{" "}
                          <Switch
                            checkedChildren={<CheckOutlined />}
                            unCheckedChildren={<CloseOutlined />}
                            {...field}
                            name={[field.name, "primaryAttr"]}
                            key={[field.fieldKey, "primaryAttr"]}
                            onChange={(e, record) =>
                              onPrimarySwitch(e, record.checked)
                            }
                          />{" "}
                          <Tooltip title="Making primary attribute means pricing will be base it.">
                            <InfoCircleOutlined />
                          </Tooltip>
                        </div>
                        <Form.List
                          name={[field.name, "variation"]}
                          key={[field.fieldKey, "variation"]}
                        >
                          {(field, { add, remove }) => {
                            return (
                              <div>
                                {field.map((field) => (
                                  <Space
                                    key={field.key}
                                    style={{ display: "flex", marginBottom: 5 }}
                                    align="start"
                                  >
                                    <Form.Item
                                      {...field}
                                      name={[field.name, "variationName"]}
                                      fieldKey={[
                                        field.fieldKey,
                                        "variationName",
                                      ]}
                                      rules={[
                                        {
                                          required: true,
                                          message: "Missing variation name",
                                        },
                                      ]}
                                    >
                                      <Input placeholder="Name" />
                                    </Form.Item>

                                    <Form.Item
                                      {...field}
                                      name={[field.name, "quantity"]}
                                      fieldKey={[field.fieldKey, "quantity"]}
                                      rules={[
                                        {
                                          required: true,
                                          message: "Missing quantity",
                                        },
                                      ]}
                                    >
                                      <Input placeholder="Quantity" />
                                    </Form.Item>

                                    {primaryAttrPrice ? (
                                      <Form.Item
                                        {...field}
                                        name={[field.name, "price"]}
                                        fieldKey={[field.fieldKey, "price"]}
                                        rules={[
                                          {
                                            required: true,
                                            message: "Missing price",
                                          },
                                        ]}
                                      >
                                        <InputNumber
                                          defaultValue={0}
                                          formatter={(value) =>
                                            `\u00A2 ${value}`.replace(
                                              /\B(?=(\d{3})+(?!\d))/g,
                                              ","
                                            )
                                          }
                                          parser={(value) =>
                                            value.replace(/\u00A2\s?|(,*)/g, "")
                                          }
                                          onChange={onChange}
                                        />
                                      </Form.Item>
                                    ) : null}

                                    <MinusCircleOutlined
                                      onClick={() => {
                                        remove(field.name);
                                      }}
                                    />
                                  </Space>
                                ))}

                                <Form.Item>
                                  <Button
                                    type="dashed"
                                    onClick={() => {
                                      add();
                                    }}
                                    block
                                  >
                                    <PlusOutlined /> Add field
                                  </Button>
                                </Form.Item>
                              </div>
                            );
                          }}
                        </Form.List>
                      </Card>
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
