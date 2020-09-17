import React from "react";
import {
  Typography,
  Row,
  Col,
  Input,
  Space,
  Button,
  Dropdown,
  Menu,
} from "antd";
import { UploadOutlined, PlusOutlined, DownOutlined } from "@ant-design/icons";
import TableComponent from "./table.component";

const Products = () => {
  // @TODO: Change dummy data in table
  const { Title } = Typography;
  const { Search } = Input;

  const menu = (
    <Menu>
      <Menu.Item key="1">Delete</Menu.Item>
      <Menu.Item key="2">Edit</Menu.Item>
    </Menu>
  );

  return (
    <>
      <Title level={4}>Products</Title>
      <Row gutter={10} style={{ marginBottom: 18 }}>
        <Col span={12}>
          <Search
            placeholder="Search product ..."
            onSearch={(value) => console.log(value)}
          />
        </Col>
        <Col span={12}>
          <Space style={{ float: "right" }}>
            <Button type="primary" icon={<PlusOutlined />}>
              Add Product
            </Button>
            <Button icon={<PlusOutlined />}>Add Variation</Button>
            <Button type="dashed" icon={<UploadOutlined />}>
              Upload CSV
            </Button>
          </Space>
        </Col>
      </Row>

      <div style={{ marginBottom: 24, marginTop: 24 }}>
        <div style={{ marginBottom: 18 }}>
          <span>Products</span>
          <div style={{ float: "right" }}>
            <Dropdown overlay={menu}>
              <Space align="center">
                <Button type="primary">
                  <span>Bulk Action</span>
                  <DownOutlined />
                </Button>
              </Space>
            </Dropdown>
          </div>
        </div>
        <TableComponent />
      </div>
    </>
  );
};

export default Products;
