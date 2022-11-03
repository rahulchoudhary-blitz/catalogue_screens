import React, { useState, useCallback } from "react";
import PageOverviewCard from "../pages/AddCatalogues/PageOverviewCard";
import UploadMedia from "../pages/AddCatalogues/UploadMedia";
import { PlusOutlined } from "@ant-design/icons";
import Content from "../layout/NavBar";
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
import CollectionList from "../pages/AddCatalogues/CollectionList";
import { SkuForm } from "../pages/AddCatalogues/SkuFrom";
import { AttributeForm } from "../pages/AddCatalogues/AttributeForm";

const { TextArea } = Input;
const AddCatalogue = () => {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState("horizontal");
  const [singleSize, setSingleSize] = useState(false);

  const onFormLayoutChange = ({ layout }) => {
    setFormLayout(layout);
  };

  const formItemLayout =
    formLayout === "horizontal"
      ? {
          labelCol: {
            lg: { span: 5 },
            xs: { span: 4 },
          },
        }
      : null;

  const formStyle = {
    labelCol: {
      lg: { span: 11 },
      xs: { span: 4 },
    },
  };

  const onFinish = () => {
    //form data handle
  };

  const handleClear = () => {
    form.resetFields();
  };

  //SingleSize
  const handleSingleSizeChange = useCallback(() => {
    setSingleSize(!singleSize);

    form.setFieldsValue({
      customer_skus: !singleSize
        ? [
            {
              size: "FREE SIZE",
              weight: "0.4",
              length: "15",
              breadth: "10",
              height: "10",
              volume: "0.5",
            },
          ]
        : [
            {
              weight: "0.4",
              length: "15",
              breadth: "10",
              height: "10",
              volume: "0.5",
            },
          ],
    });
  }, [singleSize]);

  return (
    <Content>
      <Row
        md={{
          span: 24,
        }}
      >
        <Col span={24}>
          <PageOverviewCard />
        </Col>
        <Col span={24}>
          <Form
            form={form}
            name="catalogue_form"
            onFinish={onFinish}
            autoComplete="off"
            {...formItemLayout}
            layout={formLayout}
            onValuesChange={onFormLayoutChange}
          >
            {/* image and video and img chartImg comp  */}
            <Row gutter={[12, 12]}>
              <Col span={24}>
                <UploadMedia />
              </Col>
            </Row>
           {/* Product details form  */}
            <Col span={24}>
              <Card>
                <Row gutter={[12, 12]}>
                  <Col xs={24} lg={12}>
                    <Form.Item
                      label="Name"
                      name="name"
                      {...formStyle}
                      rules={[
                        {
                          required: true,
                          message: "Please enter product name!",
                        },
                      ]}
                    >
                      <Input type="text" placeholder="Name" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} lg={12}>
                    <Form.Item
                      label="Pick-up Point"
                      name="pickup-name"
                      {...formStyle}
                      value={formLayout}
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
                    <Form.Item
                      label="Product Type"
                      name="product_type"
                      {...formStyle}
                    >
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
                        placeholder="product_type"
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
                  <Col xs={24} lg={12}>
                    <Form.Item
                      label="GST (%)"
                      name="gst"
                      {...formStyle}
                      value={formLayout}
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

                  <Col xs={24} lg={12}>
                    <Form.Item
                      label="Return Condition"
                      name="return-condition"
                      {...formStyle}
                      value={formLayout}
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
                  <Col xs={24} lg={12}>
                    <Form.Item label="Colour" name={"colour"} {...formStyle}>
                      <Input type="text" placeholder="Color" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} lg={12}>
                    <Form.Item
                      label="Product Code"
                      name={"product_id"}
                      {...formStyle}
                      value={formLayout}
                      rules={[
                        {
                          required: true,
                          message: "Please enter Code",
                        },
                      ]}
                    >
                      <Input type="text" placeholder="Product Code" />
                    </Form.Item>
                  </Col>

                  <Col xs={24} lg={12}>
                    <Form.Item
                      label="Amazon ASIN"
                      name={"amazon_asin"}
                      value={formLayout}
                      {...formStyle}
                    >
                      <Input type="text" placeholder="Amazon ASIN" />
                    </Form.Item>
                  </Col>

                  <Col xs={24} lg={12}>
                    <Form.Item
                      label="Select Custom Flow"
                      name="customisation_page_short_id"
                      {...formStyle}
                      value={formLayout}
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

                  <Col xs={24} lg={12}>
                    <Form.Item
                      label="HSN Code"
                      name={"hsn_code"}
                      value={formLayout}
                      {...formStyle}
                    >
                      <InputNumber
                        style={{ width: "100%" }}
                        placeholder="HSN Code"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      label="Description"
                      name="description"
                      value={formLayout}
                    >
                      <TextArea rows={6} placeholder="Description" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} lg={12}>
                    <Form.Item
                      label="Single Size"
                      tooltip={"Single Size"}
                      value={formLayout}
                      {...formStyle}
                    >
                      <Switch
                        checked={singleSize}
                        onChange={handleSingleSizeChange}
                      />
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
                              singleSize={singleSize}
                              formStyle={formStyle}
                            />
                          ))}
                          <Row justify="center">
                            <Col xs={24} lg={6}>
                              <Button
                                type="dashed"
                                onClick={() => add()}
                                block
                                icon={<PlusOutlined />}
                                disabled={singleSize}
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
                              formStyle={formStyle}
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
                    <CollectionList />
                    {/* <Pagination defaultCurrent={6} total={500} /> */}
                  </Col>
                  <Col> </Col>
                  <Col span={24}>
                    <Row gutter={[12, 12]} justify="center">
                      <Col xs={24} lg={4}>
                        <Button
                          type="primary"
                          htmlType="submit"
                          block
                          style={{
                            backgroundColor: "#15A362",
                            border: "1px solid green",
                          }}
                        >
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
          </Form>
        </Col>
      </Row>
    </Content>
  );
};

export default AddCatalogue;
