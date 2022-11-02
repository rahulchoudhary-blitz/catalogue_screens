import React from "react";
import { Form, Input, Row, Col, Typography, Divider } from "antd";
import Content from "../layout/NavBar";
import Cards from "../pages/Cards";
import CatalogueForm from "../pages/catalogueList/CatalogueForm";
import UploadList from "../pages/catalogueList/UploadList";
import CatalogueListData from "../pages/catalogueList/CatalogueListData";

const { Title } = Typography;
const CatalogueList = () => {
  return (
    <>
      <Content>
        <Row>
          <Col span={24}>
            <Cards />
          </Col>
          <Col span={24}>
            <CatalogueForm />
          </Col>
          <Col span={24}>
            <UploadList />
          </Col>
          <Col span={24}>
            <Divider orientation="left">
              <Title level={5}>Total Catalogues : 1 </Title>
            </Divider>
          </Col>
          <Col span={24}>
            <CatalogueListData />
          </Col>
        </Row>
      </Content>
    </>
  );
};

export default CatalogueList;
