import React from "react";
import { Descriptions, Tag, Card, Row, Col, Typography } from "antd";
import {} from "@ant-design/icons";
import OrderTable from "./ordertable.component";

const SingleOrder = () => {
  const { Item } = Descriptions;
  const { Text } = Typography;
  return (
    <>
      <Row gutter={10}>
        <Col span={12}>
          <Card>
            <Descriptions
              title="Order Summary"
              layout="vertical"
              bordered
              size="small"
            >
              <Item label="Order Number">
                <Text strong>2341</Text>
              </Item>
              <Item label="Date &amp; Time" span={2}>
                21/09/2020 22:30pm
              </Item>
              <Item label="Status" span={3}>
                <Tag>Pending</Tag>
              </Item>
              <Item label="Total Order Amount" span={3}>
                GH&cent; 2,000
              </Item>
            </Descriptions>
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Descriptions title="Reseller Info" bordered size="large">
              <Item label="Name" span={3}>
                Derrick Manford
              </Item>
              <Item label="Phone" span={3}>
                1810000000
              </Item>
              <Item label="Email" span={3}>
                user@gmail.com
              </Item>
              <Item label="User Status" span={3}>
                Premium
              </Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>
      <Card style={{ margin: "18px 0" }}>
        <Row gutter={10}>
          <Col span={12}>
            <Descriptions title="Customer Info" bordered size="small">
              <Item label="Name" span={3}>
                Derrick Manford
              </Item>
              <Item label="Phone" span={3}>
                1810000000
              </Item>

              <Item label="Shipping Address" span={3}>
                No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
              </Item>
            </Descriptions>
          </Col>
          <Col></Col>
        </Row>
      </Card>
      <Card style={{ margin: "20px 0" }}>
        <OrderTable />
      </Card>
      <Row>
        <Col span={12}>
          <Card>
            <Descriptions title="Customer Info" bordered size="small">
              <Item label="Sub-total" span={3}>
                GH&cent; 1,900
              </Item>
              <Item label="Shipping Cost" span={3}>
                GH&cent; 100
              </Item>

              <Item label="Total" span={3}>
                <Text strong>GH&cent; 2,000</Text>
              </Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default SingleOrder;
