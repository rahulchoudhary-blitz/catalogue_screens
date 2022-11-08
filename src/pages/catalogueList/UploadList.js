import React, { useEffect } from "react";
import { UploadOutlined, DownloadOutlined } from "@ant-design/icons";
import {
  Row,
  Col,
  Form,
  Button,
  Card,
  Upload,
  Typography,
  Divider,
  message,
} from "antd";
const { Text } = Typography;

import { bulkUploadApi } from "../../ApiStore/ApiData";

const UploadList = () => {
  const beforeUploadCsvFile = async (file) => {
    await bulkUploadApi(file);
    notification.success({ message: "Catalogues uploaded successfully" });
  };

  return (
    <Col span={24}>
      <Card>
        <Row gutter={[24, 18]}>
          <Col xs={24} lg={4}>
            <Upload beforeUpload={beforeUploadCsvFile}>
              <Button
                type="primary"
                style={{ backgroundColor: "#15A362" }}
                icon={<UploadOutlined />}
                size="large"
                block
              >
                <Text style={{ color: "white" }}>Bulk Upload</Text>
              </Button>
            </Upload>
          </Col>
          <Col xs={24} lg={4}>
            <Button
              type="success"
              onClick=""
              icon={<DownloadOutlined />}
              size="large"
              block
            >
              CSV Data
            </Button>
          </Col>
          <Col xs={24} lg={8}>
            <Button
              type="secondary"
              icon={<DownloadOutlined />}
              size="large"
              block
            >
              Sample Catalogue Upload CSV
            </Button>
          </Col>
          <Col xs={24} lg={6}>
            <Button
              type="secondary"
              icon={<DownloadOutlined />}
              size="large"
              block
            >
              Product Types
            </Button>
          </Col>
          <Col xs={24} lg={6}>
            <Upload accept=".jpg, jpeg, .png">
              <Button
                type="primary"
                style={{ backgroundColor: "#15A362" }}
                icon={<UploadOutlined />}
                size="large"
                block
              >
                <Text style={{ color: "white" }}>Bulk Update Image</Text>
              </Button>
            </Upload>
          </Col>
          <Col xs={24} lg={8}>
            <Button
              type="secondary"
              icon={<DownloadOutlined />}
              size="large"
              block
            >
              Bulk Update Image Sample CSV
            </Button>
          </Col>
        </Row>
        <Divider> OR </Divider>
        <Row gutter={[8, 8]} justify="center">
          <Col>
            <Upload>
              <Button type="primary" style={{ backgroundColor: "#15A362" }}>
                {" "}
                Import From Amazon{" "}
              </Button>
            </Upload>
          </Col>
          <Col>
            <Button type="secondary"> Import Amazon Sample CSV </Button>
          </Col>
        </Row>
      </Card>
    </Col>
  );
};

export default UploadList;
