import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Sidebar.css";
import className from "classnames/bind";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UnorderedListOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Col } from "antd";

const { Sider, Content, Header } = Layout;
const NavBar = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout>
      
      <Sider
        zeroWidthTriggerStyle={null}
        trigger={null}
        collapsible
        collapsed={collapsed}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        theme="light"
        breakpoint="lg"
        collapsedWidth="0"
      >
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={[
            {
              key: "1",
              icon: <PlusOutlined />,
              label: <Link to="/">Create New</Link>,
            },
            {
              key: "2",
              icon: <UnorderedListOutlined />,
              label: <Link to="/catlist">All Catalogue</Link>,
            },
          ]}
        ></Menu>
      </Sider>
      <Layout>
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        >
          <Col>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: () => setCollapsed(!collapsed),
              }
            )}
          </Col>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px 0",
            // padding: 24,
          }}
        >
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            {props.children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default NavBar;
