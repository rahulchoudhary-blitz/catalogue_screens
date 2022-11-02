import React from "react";
import Cards from "../pages/Cards";
// import Cards from '../pages/Cards'
import UploadMedia from "../pages/UploadMedia";
import { PlusOutlined } from "@ant-design/icons";
import Content from "../layout/NavBar";
import "./addcatalog.css";
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Select,
  Card,
  InputNumber,
  Switch,
  Pagination,
} from "antd";
import Collection from "../pages/Collection";
import { SkuForm } from "../pages/SkuFrom";
import { AttributeForm } from "../pages/AttributeForm";
const { TextArea } = Input;

const AddCatalogue = () => {
  const [form] = Form.useForm();

  const onFinish = () => {
    //form data handle
  };
  const formLayout = {
    labelCol: {
      lg: { span: 5 },
      xs: { span: 4 },
    },
  };
  const handleClear = () => {
    form.resetFields();
  };
  return (
    <Content>
      <Row
        md ={{
          span: 24,
        }}
      >
        <Col span={24}>
          <Cards />
        </Col>
        <Col span={24}>
          <Form
            form = {form}
            name = "catalogue_form"
            onFinish = {onFinish}
            autoComplete = "off"
            {...formLayout}
          >
            <Row gutter = {[12, 12]}>
              <Col span = {24}>
                <UploadMedia />
              </Col>
            </Row>

            <Col span={24}>
              <Card>
                <Row gutter = {[12, 12]}>
                  <Col xs = {24} lg = {12}>
                    <Form.Item
                      label = "Name"
                      name = "name"
                      rules ={[
                        {
                          required: true,
                          message: "Please enter product name!",
                        },
                      ]}
                    >
                      <Input type="text" placeholder="Name" />
                    </Form.Item>
                  </Col>
                  <Col xs = {24} lg = {12}>
                    <Form.Item
                      label = "Pick-up Point"
                      name = "pickup-name"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your pick-up point!",
                        },
                      ]}
                    >
                      <Select>
                        <Select.Option>
                          pickup/address-045/xhahsdasassnasj
                        </Select.Option>
                        <Select.Option>
                          pickup/address-067/xhahsdasassnasj
                        </Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  {/* */}
                  <Col xs={24} lg={12}>
                    <Form.Item label = "Product Type" name = "product_type">
                      <Select
                        showSearch
                        filterOption = {(input, option) =>
                          option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0 ||
                          option.props.value
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                        placeholder = "product_type"
                      >
                        <Select.Option>Chooes Product Type</Select.Option>
                        <Select.Option>Body Art(beauty)</Select.Option>
                        <Select.Option>Eyes(beauty)</Select.Option>
                        <Select.Option>Face(beauty)</Select.Option>
                        <Select.Option>Lips(beauty)</Select.Option>
                        <Select.Option>Nails(beauty)</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs = {24} lg = {12}>
                    <Form.Item
                      label="GST (%)"
                      name="gst"
                      rules={[
                        {
                          required: true,
                          message: "Please Enter the GST",
                        },
                      ]}
                    >
                      <Select placeholder="Select GST(%)"></Select>
                    </Form.Item>
                  </Col>
                  {/* ---------------------------------------- */}
                  <Col xs={24} lg={12}>
                    <Form.Item
                      label="Return Condition"
                      name="return-condition"
                      rules={[
                        {
                          required: true,
                          message: "Please select the return condition!",
                        },
                      ]}
                    >
                      <Select>
                        <Select.Option>Easy 5 days return</Select.Option>
                        <Select.Option>
                          This Product cannot be returned
                        </Select.Option>
                        <Select.Option>Easy 3 days return</Select.Option>
                        <Select.Option>
                          Exchange Only Within 5 days
                        </Select.Option>
                        <Select.Option>
                          Exchange Only Within 3 days
                        </Select.Option>
                        <Select.Option>Easy Returns</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs = {24} lg = {12}>
                    <Form.Item label = "Colour" name = {"colour"}>
                      <Input type = "text" placeholder = "Color" />
                    </Form.Item>
                  </Col>
                  <Col xs = {24} lg = {12}>
                    <Form.Item
                      label = "Product Code"
                      name = {"product_id"}
                      rules ={[
                        {
                          required: true,
                          message: "Please enter Code",
                        },
                      ]}
                    >
                      <Input type="text" placeholder="Product Code" />
                    </Form.Item>
                  </Col>
                  {/* ------------------------------------ */}
                  <Col xs={24} lg={12}>
                    <Form.Item label="Amazon ASIN" name={"amazon_asin"}>
                      <Input type="text" placeholder="Amazon ASIN" />
                    </Form.Item>
                  </Col>
                  {/* --------------------------------- */}
                  <Col xs={24} lg={12}>
                    <Form.Item
                      label="Select Custom Flow"
                      name="customisation_page_short_id"
                    >
                      <Select defaultValue={null}>
                        <Select.Option value="demo">
                          No custom flow
                        </Select.Option>
                        <Select.Option value="demo">test</Select.Option>
                        <Select.Option value="demo">
                          test custom flow
                        </Select.Option>
                        <Select.Option value="demo">test custom</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  {/* ------------------------------- */}
                  <Col xs={24} lg={12}>
                    <Form.Item label="HSN Code" name={"hsn_code"}>
                      <InputNumber
                        style={{ width: "100%" }}
                        placeholder="HSN Code"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item label="Description" name="description">
                      <TextArea rows={6} placeholder="Description" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} lg={12}>
                    <Form.Item label="Single Size" tooltip={"Single Size"}>
                      <Switch />
                    </Form.Item>
                  </Col>
                  <Col md={{ span: 24 }}>
                    {/* SkuForm */}
                    <Form.List name="customer_skus">
                      {(fields, { add, remove }) => (
                        <>
                          {fields.map((field, index) => (
                            <SkuForm
                              index={index}
                              field={field}
                              remove={remove}
                              form={form}
                            />
                          ))}
                          <Row justify="center">
                            <Col xs={24} lg={6}>
                              <Button
                                type="dashed"
                                onClick={() => add()}
                                block
                                icon={<PlusOutlined />}
                              >
                                Add More Skus
                              </Button>
                            </Col>
                          </Row>
                        </>
                      )}
                    </Form.List>
                  </Col>
                  <Col span={24}>
                    <Form.List name="product_attributes">
                      {(fields, { add, remove }) => (
                        <>
                          {fields.map((field, index) => (
                            // AttributeForm
                            <AttributeForm
                              index={index}
                              field={field}
                              remove={remove}
                              form={form}
                            />
                          ))}
                          <Row justify="center">
                            <Col xs={24} lg={6}>
                              <Button
                                type="dashed"
                                onClick={() => add()}
                                block
                                icon={<PlusOutlined />}
                              >
                                Add More Attributes
                              </Button>
                            </Col>
                          </Row>
                        </>
                      )}
                    </Form.List>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col span={24}>
              <Card title="Select Collections">
                <Row>
                  <Col span={24}>
                    <Collection />
                    <Pagination defaultCurrent={6} total={500} />
                  </Col>

                  <Col span={24}>
                    <Row gutter={[12, 12]} justify="center">
                      <Col xs={24} lg={4}>
                        <Button type="primary" htmlType="submit" block>
                          Submit
                        </Button>
                      </Col>
                      <Col xs={24} lg={4}>
                        <Button type="secondary" block>
                          Cancel
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Card>
            </Col>
            {/* </Row> */}
          </Form>
        </Col>
        {/* </Spin> */}
      </Row>
    </Content>
  );
};

export default AddCatalogue;
