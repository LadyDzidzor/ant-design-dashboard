/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Divider,
  Typography,
  Spin,
  Upload,
  Modal,
  Skeleton,
} from "antd";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { getBase64 } from "../core/_helper";

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 8,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const AddProductForm = () => {
  const [categoryState, updateCategory] = useState({
    items: ["fashion", "beauty"],
    name: "",
  });
  const [variationSate, setVariation] = useState({
    data: [],
    value: [],
    fetching: false,
  });
  const [imagesState, setImageState] = useState({
    previewVisible: false,
    previewImage: "",
    previewTitle: "",
    fileList: [],
  });

  const { Item } = Form;
  const { Option } = Select;
  const { Text } = Typography;
  let index = 0;
  let lastFetchId = 0;

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onChange = (value) => {
    console.log("changed", value);
  };

  const onNameChange = (event) => {
    updateCategory({
      ...categoryState,
      name: event.target.value,
    });
  };

  const addItem = () => {
    console.log("addItem");
    const { items, name } = categoryState;
    updateCategory({
      ...categoryState,
      items: [...items, name || `New item ${index++}`],
      name: "",
    });
  };

  const fetchVariation = (value) => {
    console.log("fetching user", value);
    lastFetchId += 1;
    const fetchId = lastFetchId;
    setVariation({ ...variationSate, data: [], fetching: true });
    fetch("https://randomuser.me/api/?results=5")
      .then((response) => response.json())
      .then((body) => {
        if (fetchId !== lastFetchId) {
          // for fetch callback order
          return;
        }
        const data = body.results.map((user) => ({
          text: `${user.name.first} ${user.name.last}`,
          value: user.login.username,
        }));
        setVariation({ ...variationSate, data, fetching: false });
      });
  };

  const handleVariationChange = (value) => {
    setVariation({
      ...variationSate,
      value,
      data: [],
      fetching: false,
    });
  };

  const handleImageCancel = () =>
    setImageState({ ...imagesState, previewVisible: false });

  const handleImageChange = ({ fileList }) =>
    setImageState({ ...imagesState, fileList });

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setImageState({
      ...imagesState,
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const { items, name } = categoryState;
  const { fetching, data, value } = variationSate;
  const { previewVisible, previewImage, fileList, previewTitle } = imagesState;

  return (
    <>
      <Form
        {...layout}
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Item
          label="Product Name"
          name="productName"
          rules={[
            {
              required: true,
              message: "Please input product name",
            },
          ]}
        >
          <Input placeholder="Product Name" />
        </Item>
        <Item
          label="SKU"
          name="sku"
          rules={[
            {
              required: true,
              message: "Please input product SKU",
            },
          ]}
        >
          <Input placeholder="Enter SKU" />
        </Item>
        <Item
          label="Cost"
          name="cost"
          rules={[
            {
              required: true,
              message: "Please input product cost",
            },
          ]}
        >
          <InputNumber
            style={{ width: "100%" }}
            defaultValue={0}
            formatter={(value) =>
              `\u00A2 ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\u00A2\s?|(,*)/g, "")}
            onChange={onChange}
          />
        </Item>
        <Item
          label="Display Price"
          name="displayPrice"
          rules={[
            {
              required: true,
              message: "Please input display price",
            },
          ]}
        >
          <InputNumber
            style={{ width: "100%" }}
            defaultValue={0}
            formatter={(value) =>
              `\u00A2 ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\u00A2\s?|(,*)/g, "")}
            onChange={onChange}
          />
        </Item>
        <Item
          label="Category"
          name="category"
          rules={[
            {
              required: true,
              message: "Please select one or more category",
            },
          ]}
        >
          <Select
            mode="multiple"
            placeholder="Select category"
            dropdownRender={(menu) => (
              <div>
                {menu}
                <Divider style={{ margin: "4px 0" }} />
                <div
                  style={{ display: "flex", flexWrap: "nowrap", padding: 8 }}
                >
                  <Input
                    style={{ flex: "auto" }}
                    value={name}
                    onChange={onNameChange}
                  />
                  <a
                    style={{
                      flex: "none",
                      padding: "8px",
                      display: "block",
                      cursor: "pointer",
                    }}
                    onClick={addItem}
                  >
                    <PlusOutlined /> Add category
                  </a>
                </div>
              </div>
            )}
          >
            {items.map((item) => (
              <Option key={item}>{item}</Option>
            ))}
          </Select>
        </Item>
        <Divider style={{ margin: "4px 0" }} />
        <Text strong style={{ marginBottom: 24 }}>
          Content
        </Text>
        <Item label="Description" name="description">
          <CKEditor
            editor={ClassicEditor}
            data="<p>Enter product description</p>"
            onInit={(editor) => {
              // You can store the "editor" and use when it is needed.
              console.log("Editor is ready to use!", editor);
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              console.log({ event, editor, data });
            }}
            onBlur={(event, editor) => {
              console.log("Blur.", editor);
            }}
            onFocus={(event, editor) => {
              console.log("Focus.", editor);
            }}
          />
        </Item>
        <Item
          label="Google photos link"
          name="gpLink"
          rules={[
            {
              required: true,
              message: "Please input photos link",
            },
          ]}
        >
          <Input placeholder="https://googlephotolink.com" />
        </Item>
        <Divider style={{ margin: "16px 0" }} />
        <Item
          label="Variation"
          name="variation"
          rules={[
            {
              required: true,
              message: "Please select product variation",
            },
          ]}
        >
          <Select
            showSearch
            value={value}
            placeholder="Select variation"
            notFoundContent={
              fetching ? (
                <Spin
                  indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
                />
              ) : null
            }
            filterOption={false}
            onSearch={fetchVariation}
            onChange={handleVariationChange}
            optionFilterProp="children"
            style={{ width: "100%" }}
          >
            {data.map((d) => (
              <Option key={d.value}>{d.text}</Option>
            ))}
          </Select>
        </Item>
        <Text strong style={{ marginBottom: 24 }}>
          Supplier details
        </Text>
        <Item label="Name" name="supplierName">
          <Input placeholder="Enter supplier name" />
        </Item>
        <Item label="Location" name="supplierLocation">
          <Input placeholder="Enter supplier location" />
        </Item>
        <Item label="Contact" name="supplierContact">
          <Input placeholder="Enter supplier contact" />
        </Item>
        <Divider style={{ margin: "16px 0" }} />
        <Text strong style={{ marginBottom: 24 }}>
          Images
        </Text>
        <Item name="images" style={{ marginTop: 16 }}>
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleImageChange}
          >
            {fileList.length >= 8 ? null : uploadButton}
          </Upload>
          <Modal
            visible={previewVisible}
            title={previewTitle}
            footer={null}
            onCancel={handleImageCancel}
          >
            <img alt="example" style={{ width: "100%" }} src={previewImage} />
          </Modal>
        </Item>
        <Divider style={{ margin: "16px 0" }} />
        <Text strong style={{ marginBottom: 24 }}>
          Related products
        </Text>
        <Item label="Search Product" name="relatedProduct">
          <Select
            mode="multiple"
            value={value}
            placeholder="Select variation"
            notFoundContent={
              fetching ? (
                <Spin
                  indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
                />
              ) : null
            }
            filterOption={false}
            onSearch={fetchVariation}
            onChange={handleVariationChange}
            style={{ width: "100%" }}
          >
            {data.map((d) => (
              <Option key={d.value}>{d.text}</Option>
            ))}
          </Select>
          <Skeleton.Image />
          <Skeleton.Image />
          <Skeleton.Image />
        </Item>
        <Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Add Product
          </Button>
        </Item>
      </Form>
    </>
  );
};

export default AddProductForm;
