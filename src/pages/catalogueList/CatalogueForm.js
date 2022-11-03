import React from "react";
import { Row, Col, Form, Input, Button, Select, Card, DatePicker } from "antd";
import { SearchOutlined, ClearOutlined } from "@ant-design/icons";

const CatalogueForm = () => {
  return (
    <>
      <Form name="catalogue_form" autoComplete="off">
        <Card>
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={6}>
              <Form.Item label="Name" name={"name"}>
                <Input type="text" placeholder="Ryon Kurti" />
              </Form.Item>
            </Col>
            <Col xs={24} lg={6}>
              <Form.Item label="Product Code" name={"productid"}>
                <Input type="text" placeholder="Kurti_123" />
              </Form.Item>
            </Col>
            <Col xs={24} lg={6}>
              <Form.Item label="Sku Code" name={"sku_id"}>
                <Input type="text" placeholder="Kurti_abcd" />
              </Form.Item>
            </Col>
            <Col xs={24} lg={6}>
              <Form.Item label="Pickup Address" name={"address"}>
                <Select>
                  <Select.Option value="address">
                    pickup/address-045/xhahsdasassnasj
                  </Select.Option>
                  <Select.Option value="address">
                    pickup/address-067/xhahsdasassnasj
                  </Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[12, 12]}>
            <Col xs={24} lg={8}>
              <Form.Item label="Is OOs" name={"is_oos"}>
                <Select placeholder="Is Out Of Stock">
                  <Select.Option value="true">True</Select.Option>
                  <Select.Option value="false">False</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} lg={8}>
              <Form.Item label="Is Visible" name={"is_visible"}>
                <Select defaultValue={null}>
                  <Select.Option value="true">True</Select.Option>
                  <Select.Option value="false">False</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} lg={8}>
              <Form.Item label="Date range" name={"daterange"}>
                <DatePicker.RangePicker initialValues="date" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[12, 12]}>
            <Col xs={24} lg={8}>
              <Form.Item label="Product Types" name={"producttype"}>
                <Select
                  showSearch
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0 ||
                    option.props.value
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  placeholder="Product Type"
                >
                  <Select.Option value="demo">
                    Chooes Product Type
                  </Select.Option>
                  <Select.Option value="demo">Body Art(beauty)</Select.Option>
                  <Select.Option value="demo">Eyes(beauty)</Select.Option>
                  <Select.Option value="demo">Face(beauty)</Select.Option>
                  <Select.Option value="demo">Lips(beauty)</Select.Option>
                  <Select.Option value="demo">Nails(beauty)</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} lg={8}>
              <Form.Item label="Recently Updated" name={"updated"}>
                <Select>
                  <Select.Option value="true">Recently Updated</Select.Option>
                  <Select.Option value="false">Recently Created</Select.Option>
                  <Select.Option value="false">Sales</Select.Option>
                  <Select.Option value="false">Price High to low</Select.Option>
                  <Select.Option value="false">Price Low to High</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} lg={8}>
              <Form.Item label="Link" name={"catalogue_link"}>
                <Input
                  type="url"
                  placeholder="https://toofan.shop/catalogue/LrmZ1Cr5/e5PgbVBL"
                />
              </Form.Item>
            </Col>
            <Row gutter={[12, 12]} justify="center">
              <Col xs={24} lg={6} style={{ margin: "20px" }} justify="center">
                <Button
                  type="primary"
                  style={{ backgroundColor: "#15A362" }}      
                  icon={<SearchOutlined />}
                  size="large"
                  htmlType="submit"
                >
                  Search
                </Button>
              </Col>
              <Col xs={24} lg={6} style={{ margin: "20px" }} justify="center">
                <Button type="secondary" icon={<ClearOutlined />} size="large">
                  Clear Filters
                </Button>
              </Col>
            </Row>
          </Row>
        </Card>
      </Form>
    </>
  );
};

export default CatalogueForm;
