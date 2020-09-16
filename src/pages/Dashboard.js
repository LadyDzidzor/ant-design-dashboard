import React, { useState } from "react";
import {
  BrowserRouter as Router,
  NavLink,
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";
import { Layout, Menu, Button, Dropdown, Typography, Space } from "antd";
import {
  HomeOutlined,
  TagOutlined,
  ShoppingOutlined,
  UserOutlined,
  BookOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DownOutlined,
} from "@ant-design/icons";

import Routes from "../core/dashboard.routes";

import Logo from "../assets/images/tendo.png";

const DashboardPage = (props) => {
  const [collapsed, setCollapsed] = useState(false);

  const { Header, Sider, Content } = Layout;
  const { SubMenu } = Menu;
  const { Title } = Typography;
  let { url } = useRouteMatch();

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const menu = (
    <Menu>
      <Menu.Item key="1">Logout</Menu.Item>
      <Menu.Item key="2">Settings</Menu.Item>
    </Menu>
  );

  return (
    <>
      <Router>
        <Layout style={{ height: "100vh" }}>
          <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            style={{ overflow: "auto", height: "100vh" }}
          >
            {collapsed ? (
              <div
                style={{
                  height: 55,
                  background: "#fff",
                  margin: 16,
                }}
              >
                <img src={Logo} alt="logo" height={45} width={"100%"} />
              </div>
            ) : (
              <img
                src={Logo}
                alt="logo"
                height={65}
                width={155}
                style={{ margin: 24 }}
              />
            )}

            <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
              <Menu.Item key="1" icon={<HomeOutlined />}>
                <NavLink to="/dashboard">Dashboard</NavLink>
              </Menu.Item>

              <SubMenu key="sub2" icon={<TagOutlined />} title="Catalogue">
                <Menu.Item key="2">
                  <NavLink to={`${url}/products`}>Products</NavLink>
                </Menu.Item>
                <Menu.Item key="3">
                  <NavLink to={`${url}/add-product`}>Add Product</NavLink>
                </Menu.Item>
                <Menu.Item key="4">
                  <NavLink to={`${url}/upload-csv`}>Upload CSV</NavLink>
                </Menu.Item>
                <Menu.Item key="5">
                  <NavLink to={`${url}/variations`}>Variation</NavLink>
                </Menu.Item>
              </SubMenu>
              <SubMenu key="sub1" icon={<ShoppingOutlined />} title="Orders">
                <Menu.Item key="6">
                  <NavLink to={`${url}/orders`}>Orders</NavLink>
                </Menu.Item>
              </SubMenu>

              <Menu.Item key="7" icon={<UserOutlined />}>
                <NavLink to={`${url}/users`}>Users</NavLink>
              </Menu.Item>
              <Menu.Item key="8" icon={<BookOutlined />}>
                <NavLink to={`${url}/reports`}>Report</NavLink>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }}>
              <Space direction="horizontal" size={"large"} align="baseline">
                {collapsed ? (
                  <MenuUnfoldOutlined
                    style={{ color: "#fff" }}
                    onClick={toggle}
                  />
                ) : (
                  <MenuFoldOutlined
                    style={{ color: "#fff" }}
                    onClick={toggle}
                  />
                )}

                <Switch>
                  {Routes.map((route, index) => (
                    <Route
                      key={index}
                      path={route.path}
                      exact={route.exact}
                      children={
                        <Title level={3} style={{ color: "#fff" }}>
                          <route.name />
                        </Title>
                      }
                    />
                  ))}
                </Switch>
              </Space>
              <div style={{ float: "right", paddingRight: 16 }}>
                <Dropdown overlay={menu}>
                  <Space align="center">
                    <Button
                      type="primary"
                      shape="round"
                      icon={<UserOutlined />}
                    >
                      <span>Username</span>
                      <DownOutlined />
                    </Button>
                  </Space>
                </Dropdown>
              </div>
            </Header>
            <Content
              className="site-layout-background"
              style={{
                margin: "24px 16px",
                padding: 24,
                height: "100vh",
                overflow: "scroll",
              }}
            >
              <Switch>
                {Routes.map((route, index) => {
                  return (
                    <Route
                      key={index}
                      exact={route.exact}
                      path={route.path}
                      children={<route.main {...props} />}
                      {...props}
                    />
                  );
                })}
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Router>
    </>
  );
};

export default DashboardPage;
