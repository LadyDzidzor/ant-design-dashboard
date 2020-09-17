import React from "react";
import { Modal, Form, InputNumber } from "antd";

const AdvancePriceModal = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  function onChange(value) {
    console.log("changed", value);
  }
  return (
    <>
      <Modal
        visible={visible}
        title="Advance Price"
        okText="Done"
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              onCreate(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form form={form} layout="vertical" name="advanceForm">
          <Form.Item name="discount" label="Discount">
            <InputNumber
              style={{ width: "100%" }}
              defaultValue={0}
              min={0}
              max={100}
              formatter={(value) => `${value}%`}
              parser={(value) => value.replace("%", "")}
              onChange={onChange}
            />
          </Form.Item>
          <Form.Item name="promo" label="Promo price">
            <InputNumber
              style={{ width: "100%" }}
              defaultValue={0}
              formatter={(value) =>
                `\u00A2 ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\u00A2\s?|(,*)/g, "")}
              onChange={onChange}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AdvancePriceModal;
