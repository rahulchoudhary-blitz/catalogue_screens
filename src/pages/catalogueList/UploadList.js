
import React from 'react'
import { UploadOutlined, DownloadOutlined } from '@ant-design/icons'
import {
  Row,
  Col,
  Form,
  Button,
  Card,
  Upload,
  Typography,
  Divider,
  message
} from "antd";
const { Text } = Typography
const UploadList = () => {

  const props = {
    name: 'file',
    action: `${process.env.REACT_APP_BASE_URL}/uploadcsv`,
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  return (
    <Col span={24}>
      <Card>
        <Row gutter={[24, 18]}>
          <Col xs={24} lg={4}>
            <Upload {...props}>
              <Button
                type="primary"
                style={{backgroundColor:"#15A362"}}
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
            <Upload {...props} accept=".jpg, jpeg, .png">
              <Button
                type="primary"
                style={{backgroundColor:"#15A362"}}
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
        <Row gutter={[8,8]} justify='center'>
        <Col>
              <Upload {...props}>
                <Button type="primary" style={{backgroundColor:"#15A362"}}> Import From Amazon </Button>
              </Upload>
            </Col>
            <Col>
            <Button type="secondary" > Import Amazon Sample CSV </Button>
            </Col>
        </Row>
      </Card>
    </Col>
  );
}

export default UploadList
