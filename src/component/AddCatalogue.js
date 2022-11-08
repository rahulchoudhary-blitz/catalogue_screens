import React, { useState, useCallback, useEffect } from "react";
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
import { fetchAddPreferred, fetchPickupAddress } from "../ApiStore/ApiData";

const { TextArea } = Input;

const AddCatalogue = () => {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState("horizontal");
  const [singleSize, setSingleSize] = useState(false);
  const [validateName, setValidateName] = useState("");
  const [productList, setproductList] = useState([]);
  const [skuSizeList, setSkuSizeList] = useState([]);
  const [gstValue, setGstValue] = useState([]);
  const [returnCondition, setReturnCondition] = useState([]);

  const [initialVal, setInitialVal] = useState({
    pickup_point: "",
    product_code: "",
    gst: "",
    return_condition: "",
    customer_skus: [],
    product_attributes: [],
    product_type: "",
  });

  //  * fetch All preferred data
  const fetchPreferredData = async () => {
    const response = await fetchAddPreferred();
    setproductList([
      ...response.data.data.product_types.map((item) => ({
        value: item.key,
        label: item.display_value,
      })),
    ]);
    //skuSizeList
    setSkuSizeList(
      response.data.data.sku_sizes.map((item) => ({ value: item }))
    );
    //set Gst
    setGstValue(response.data.data.gst_options);
    //set Return Condition
    setReturnCondition(
      response.data.data.return_conditions.map((item) => ({
        value: item.key,
        label: item.label,
      }))
    );
    //intialValue
    let formInitialValue = initialVal;
    if (response.selected_product_type) {
      formInitialValue = {
        ...formInitialValue,
        product_type: response.selected_product_type,
      };
    }
    setInitialVal(formInitialValue);
  };

  useEffect(() => {
    fetchPreferredData();
  }, []);

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

  //validateProductName
  const validateProductName = (rule, value, callback) => {
    const specialChars = `\`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`;
    const spaicalChar = specialChars.split("").some((specialChars) => {
      if (value.includes(specialChars)) {
        setValidateName("error");
        callback("Product name not includes any spaical char");
      }
    });
    if (!value && value !== 0) {
      setValidateName("error");
      callback("Please enter valid Name");
    } else if (value.includes(specialChars)) {
      setValidateName("error");
      callback("Product name not includes any spaical char");
    } else {
      setValidateName("succes");
      callback();
    }
  };
  //Select Value handleChange
  const handleChangeOnSelect = (value) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value) => {
    console.log("search:", value);
  };

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
                  <Col xs={24} lg={8}>
                    <Form.Item
                      label="Name"
                      name="name"
                      {...formStyle}
                      validateStatus={validateName}
                      rules={[
                        {
                          required: true,
                          validator: validateProductName,
                        },
                      ]}
                    >
                      <Input type="text" placeholder="Name" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} lg={8}>
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
                      <Select
                        defaultValue="pickup/address-045/xhahsdasassnasj"
                        onChange={handleChangeOnSelect}
                        options={[
                          {
                            value: "pickup/address-045/xhahsdasassnasj",
                            label: "pickup/address-045/xhahsdasassnasj",
                          },
                          {
                            value: "pickup/address-067/xhahsdasassnasj",
                            label: "pickup/address-067/xhahsdasassnasj",
                          },
                        ]}
                      />
                    </Form.Item>
                  </Col>
                  {/* */}
                  <Col xs={24} lg={8}>
                    <Form.Item
                      label="Product Type"
                      name="product_type"
                      {...formStyle}
                    >
                      <Select
                        onChange={handleChangeOnSelect}
                        showSearch
                        optionFilterProp="children"
                        style={{ width: "100%" }}
                        placeholder="Product Type"
                        filterOption={(inputValue, option) =>
                          option.props.children
                            .toLowerCase()
                            .indexOf(inputValue.toLowerCase()) >= 0
                        }
                      >
                        {productList.map((item) => (
                          <Option value={item.key}>{item.label}</Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24} lg={8}>
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
                      <Select placeholder="Select GST(%)">
                        {gstValue.map((item) => (
                          <Option value={item}>{item}</Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col xs={24} lg={8}>
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
                      <Select
                        onChange={handleChangeOnSelect}
                        placeholder="Easy 5 days return"
                      >
                        {returnCondition.map((item) => (
                          <Option key={item.value}>{item.label}</Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24} lg={8}>
                    <Form.Item label="Colour" name={"colour"} {...formStyle}>
                      <Input type="text" placeholder="Color" />
                    </Form.Item>
                  </Col>
                  <Col xs={12} lg={8}>
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
                      <Input
                        type="text"
                        placeholder="Product Code"
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} lg={8}>
                    <Form.Item
                      label="Amazon ASIN"
                      name={"amazon_asin"}
                      value={formLayout}
                      {...formStyle}
                    >
                      <Input type="text" placeholder="Amazon ASIN" />
                    </Form.Item>
                  </Col>

                  <Col xs={24} lg={8}>
                    <Form.Item
                      label="Select Custom Flow"
                      name="customisation_page_short_id"
                      {...formStyle}
                      value={formLayout}
                    >
                      <Select
                        defaultValue="1"
                        onChange={handleChangeOnSelect}
                        options={[
                          {
                            value: "1",
                            label: "No custom flow",
                          },
                          {
                            value: "2",
                            label: "test",
                          },
                          {
                            value: "3",
                            label: " test custom flow",
                          },
                          {
                            value: "4",
                            label: "test custom",
                          },
                        ]}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} lg={8}>
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
                              skuSizes={skuSizeList}
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
                                style={{ width: "100%" }}
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
