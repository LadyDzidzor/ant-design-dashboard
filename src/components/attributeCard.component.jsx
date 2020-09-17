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
import AdvancePriceModal from "./advancePriceModal.component";

const AttributeCard = ({ field, remove }) => {
  const [primaryAttrPrice, setAttrPrice] = useState(false);
  const [visible, setVisible] = useState(false);

  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    setVisible(false);
  };

  const onPrimarySwitch = (checked) => {
    console.log(`switch to ${checked}`);
    if (checked) setAttrPrice(checked);
    if (!checked) setAttrPrice(!primaryAttrPrice);
  };

  const onChange = (value) => {
    console.log("changed", value);
  };

  return (
    <>
      <AdvancePriceModal
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
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
            onChange={onPrimarySwitch}
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
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 5,
                    }}
                    align="start"
                  >
                    <Form.Item
                      {...field}
                      name={[field.name, "variationName"]}
                      fieldKey={[field.fieldKey, "variationName"]}
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
                      <>
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
                        <Button
                          type="primary"
                          onClick={() => {
                            setVisible(true);
                          }}
                        >
                          Advance Price
                        </Button>
                      </>
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
  );
};

export default AttributeCard;
