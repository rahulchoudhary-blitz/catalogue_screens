import React from "react";
import { Card, Col, Image, Row, Button, Tooltip } from "antd";
import {
  RedoOutlined,
  EyeOutlined,
  ShareAltOutlined,
  EditOutlined,
  CopyOutlined,
} from "@ant-design/icons";
const catalogueApiList = () => {
  return (
    <Card>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8} lg={6} align="middle">
          <Image
            width={120}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
        </Col>
        <Col xs={24} sm={16} lg={18}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={15} lg={15}>
              <Row>
                <Col sm={12} lg={6}>
                  <Title level={5} strong>
                    Name
                  </Title>
                </Col>
                <Col sm={12} lg={18}>
                  <Title level={5} keyboard>
                    {" "}
                    Redmi
                  </Title>
                </Col>
              </Row>

              <Row>
                <Col sm={12} lg={6}>
                  <Title level={5} strong>
                    Product code
                  </Title>
                </Col>
                <Col sm={12} lg={18}>
                  <Title level={5} keyboard>
                    bjhbhjb
                  </Title>
                </Col>
              </Row>

              <Row>
                <Col sm={12} lg={6}>
                  <Title level={5} strong>
                    Pickup Address
                  </Title>
                </Col>
                <Col sm={12} lg={18}>
                  <Title level={5} keyboard>
                    Pickup/no 20, Delhi 110092
                  </Title>
                </Col>
              </Row>
            </Col>
            <Col xs={24} sm={9} lg={9}>
              <Row className="one-unit-margin-bottom" justify="center">
                <Col>
                  <Button
                    icon={<RedoOutlined />}
                    loading={loader}
                    disabled={forceSyncDisability()}
                  >
                    {" "}
                    Refresh Amazon Reviews{" "}
                  </Button>
                </Col>
              </Row>

              <Row gutter={[12, 12]} justify="space-between">
                <Col lg={5}>
                  {/* using css hear */}
                  <Tooltip placement="top" title="Toggle Visibility">
                    <EyeOutlined
                      style={{ color: "#15A362", fontSize: "1.2rem" }}
                    />
                  </Tooltip>
                </Col>
                <Col lg={5}>
                  <Tooltip placement="top" title="Share Product">
                    <ShareAltOutlined
                      style={{ color: "#15A362", fontSize: "1.2rem" }}
                    />
                  </Tooltip>
                </Col>

                <Col lg={5}>
                  <Tooltip placement="top" title="Edit Product">
                    <Link to="/">
                      <EditOutlined
                        style={{ color: "#15A362", fontSize: "1.2rem" }}
                        tooltips="edit"
                      />
                    </Link>
                  </Tooltip>
                </Col>

                <Col lg={5}>
                  <Tooltip placement="top" title="Copy Link">
                    <CopyOutlined style={{ color: "#15A362" }} />
                  </Tooltip>
                </Col>

                <Tooltip placement="top" title="Share Product">
                  <Col lg={5}>
                    <Link to="https://web.whatsapp.com">
                      <ShareAltOutlined
                        style={{ color: "#15A362", fontSize: "1.2rem" }}
                      />
                    </Link>
                  </Col>
                </Tooltip>
              </Row>
            </Col>
          </Row>
          <Row gutter={[16, 16]} className="one-unit-margin-top">
            <Col span={24}>
              <Tag color={is_visible ? "purple" : "red"}>
                {is_visible ? "Visible" : "Non-Visible"}
              </Tag>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <QuantityTable skus={skus} shortId={short_id} />
        </Col>
      </Row>
    </Card>
  );
};

export default catalogueApiList;
