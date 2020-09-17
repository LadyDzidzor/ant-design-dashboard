import React from "react";
import { Typography, Menu, Dropdown, Button, Input, Row, Col } from "antd";
import { DownOutlined } from "@ant-design/icons";
import TableComponent from "./table.component";

const Orders = () => {
  // @TODO: Change dummy data
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
      <Title level={4}>Orders</Title>
      <Row gutter={10} style={{ marginBottom: 18 }}>
        <Col span={12}>
          <Search
            placeholder="Search orders ..."
            onSearch={(value) => console.log(value)}
          />
        </Col>
      </Row>
      <div style={{ marginBottom: 24, marginTop: 24 }}>
        <div style={{ float: "right", margin: "24px 0" }}>
          <Dropdown overlay={menu}>
            <Button type="primary">
              <span>Bulk Action</span>
              <DownOutlined />
            </Button>
          </Dropdown>
        </div>

        <TableComponent />
      </div>
    </>
  );
};

export default Orders;
