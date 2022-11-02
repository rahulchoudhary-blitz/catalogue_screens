import {
  Card,
  Col,
  Image,
  Row,
  Typography,
  Button,
  Tooltip,
  InputNumber,
  Form,
} from "antd";
import React from "react";
import {
  RedoOutlined,
  EyeOutlined,
  ShareAltOutlined,
  EditOutlined,
  CopyOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
const { Title, Text } = Typography;

const CatalogueListData = () => {
  const onChange = (value) => {
    console.log("changed", value);
  };
  return (
    <>
      <Card>
        <Row gutter={[16, 16]} justify="space-evenly">
          <Col xs={24} sm={8} lg={6} align-items="space-between">
            <Row>
              <Image
                width={120}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            </Row>

            <Row>
              <Col>
                <Form.Item label="FREE SIZE">
                  <InputNumber min={1} defaultValue={3} onChange={onChange} />
                </Form.Item>
              </Col>
              <Col>
                <Title level={5} strong>
                  Confirm
                </Title>
                <Tooltip placement="top" title="Update Quantity">
                  <SaveOutlined style={{ color: "#15A362" }} />
                </Tooltip>
              </Col>
            </Row>
          </Col>
          <Col
            xs={24}
            sm={8}
            lg={6}
            align="middle"
            style={{
              marginBottom: "0.5em",
              fontWeight: "600",
              fontSize: "16px",
              lineHeight: "1.5",
            }}
          >
            <Row justify="space-evenly">
              <Col>
                <Title level={5} strong>
                  Name
                </Title>
              </Col>
              <Col>
                <Title level={5} code>
                  Redmi
                </Title>
              </Col>
            </Row>
            <Row justify="space-evenly">
              <Col>
                <Title level={5} strong>
                  Product Code
                </Title>
              </Col>
              <Col>
                <Title level={5} code>
                  bjhbhjb
                </Title>
              </Col>
            </Row>
            <Row justify="space-evenly">
              <Col>
                <Title level={5} strong>
                  Pickup Address
                </Title>
              </Col>
              <Col>
                <Title level={5} code>
                  Pickup/no 20 abcdefgh fkfjrjjfjfjffkk, Delhi, Delhi, India -
                  110092
                </Title>
              </Col>
            </Row>
          </Col>
          <Col xs={24} sm={8} lg={6}>
            <Row justify="center">
              <Col>
                <Button icon={<RedoOutlined />}>Refresh Amazon Reviews</Button>
              </Col>
            </Row>
            <Row gutter={[12, 12]} justify="space-between">
              <Col>
                <Tooltip placement="top" title="Toggle Visibility">
                  <EyeOutlined style={{ color: "#15A362" }} />
                </Tooltip>
              </Col>
              <Col>
                <Tooltip placement="top" title="Share Product">
                  <Link to="https://web.whatsapp.com">
                    <ShareAltOutlined style={{ color: "#15A362" }} />
                  </Link>
                </Tooltip>
              </Col>
              <Col>
                <Tooltip placement="top" title="Edit Product">
                  <Link to="/">
                    <EditOutlined style={{ color: "#15A362" }} />
                  </Link>
                </Tooltip>
              </Col>
              <Col>
                <Tooltip placement="top" title="Copy Link">
                  <CopyOutlined style={{ color: "#15A362" }} />
                </Tooltip>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default CatalogueListData;
