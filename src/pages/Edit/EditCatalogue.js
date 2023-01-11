import React, { useState, useEffect } from "react";
import PageOverviewCard from "../../pages/AddCatalogues/PageOverviewCard";

import { PlusOutlined } from "@ant-design/icons";
import Content from "../../layout/NavBar";

import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Select,
  Card,
  InputNumber,
  message,
  Upload,
  Modal,
} from "antd";
import CollectionList from "../../pages/AddCatalogues/CollectionList";

import { SkuForm } from "../../pages/AddCatalogues/SkuFrom";
import { AttributeForm } from "../../pages/AddCatalogues/AttributeForm";

import {
  fetchEditCatalogueList,
  fetchAddPreferred,
} from "../../ApiStore/ApiData";
import { useParams } from "react-router-dom";

const { TextArea } = Input;

const EditCatalogue = () => {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState("horizontal");
  const [singleSize, setSingleSize] = useState(false);
  const [validateName, setValidateName] = useState("");
  //Upload media

  const [loading, setLoading] = useState(false);
  const [imageUpload, setImageUpload] = useState([]);
  const [videoUpload, setVideoUpload] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const [sizeChartUpload, setSizeChartUpload] = useState([]);
  //api preferred
  const [productList, setproductList] = useState([]);
  const [skuSizeList, setSkuSizeList] = useState([]);
  const [gstValue, setGstValue] = useState([]);
  const [returnCondition, setReturnCondition] = useState([]);
  const [attrbuteList, setAttributeList] = useState([]);

  const [initialVal, setInitialVal] = useState({
    pickup_point: "",
    product_code: "",
    gst: "",
    return_condition: "",
    customer_skus: [],
    product_attributes: [],
    product_type: "",
  });

  //image upload
  const beforeUploadImg = (file) => {
    setImageUpload([...imageUpload, file]);
    return false;
  };

  const removeImage = (file) => {
    setImageUpload(imageUpload.filter((item) => item.uid !== file.uid));
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  /**
   * validation video upload
   * @param {*} file
   * @returns Boolean
   */
  const beforeUploadVideo = (file) => {
    const validFileType =
      file.type === "video/mov" ||
      file.type === "video/wmv" ||
      file.type === "video/mp4" ||
      file.type === "video/avi" ||
      file.type === "video/flv" ||
      file.type === "video/mkv";
    if (!validFileType) {
      message.error(
        "You can only upload .mp4, .mov, .wmv, .avi, .flv, .mkv file"
      );
    }
    if (validFileType) setVideoUpload([...videoUpload, file]);
    return false;
  };

  const removeVideo = (file) => {
    setVideoUpload(videoUpload.filter((item) => item.uid !== file.uid));
  };

  const handleCancel = () => setPreviewOpen(false);

  /**
   * chartImg
   */
  const beforeSizeChartUpload = (file) => {
    setSizeChartUpload([...sizeChartUpload, file]);
  };

  const handleChange = ({ fileList }) => setFileList(fileList);

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

  let params = useParams();

  //Api Call
  // 1--> Preferreddata Api
  const fetchPreferredData = async () => {
    const response = await fetchAddPreferred();

    setproductList([
      ...response.data.data.product_types.map((item) => ({
        value: item.key,
        label: item.display_value,
      })),
    ]);

    //set skuSize
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
    //set Attribute List
    setAttributeList(
      response.data.data.product_attributes.map((attr) => ({ value: attr }))
    );
    let formInitialValue = initialVal;
    if (response.selected_product_type) {
      formInitialValue = {
        ...formInitialValue,
        product_type: response.selected_product_type,
      };
    }
    setInitialVal(formInitialValue);
  };

  const editCatalogueData = async () => {
    const res = await fetchEditCatalogueList(params.catalogue_id);

    setAttributeList([
      res.data.data.catalogue.product_attributes.map((attr) => ({
        value: attr.key,
        label: attr.label,
      })),
    ]);
    form.setFieldsValue({
      name: res.data.data.catalogue.en.web.title,
      pickup_point: res.data.data.catalogue.pickup_point,
      product_type: res.data.data.catalogue.product_type || "not_selected",
      description: res.data.data.catalogue.en.web.description,
      gst: res.data.data.catalogue.gst,
      colour: res.data.data.catalogue.colour,
      customer_skus: res.data.data.catalogue.customer_skus,
      seller_sku_id: res.data.data.catalogue.seller_sku_id,
      amazon_asin_id: res.data.data.catalogue.amazon_asin_id,
      hsn_code: res.data.data.catalogue.hsn_code,
      return_condition: res.data.data.catalogue.return_condition,
      product_attributes: attrbuteList,
      isNewSku: false,
      customisation_page_short_id:
        res.data.data.catalogue.customisation_page_short_id,
    });

    //upload media
    //image
    const images = res.data.data.catalogue.media.filter(
      (item) => item.type === "image"
    );
    setImageUpload(images.map((item) => ({ url: item.src_url })));
    //video
    const videos = res.data.data.catalogue.media.filter(
      (item) => item.type === "video"
    );
    setVideoUpload(videos.map((item) => ({ url: item.src_url })));
  };
  useEffect(() => {
    editCatalogueData();
    fetchPreferredData();
  }, []);

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
                {/* UploadMedia */}
                <Card
                  title="Upload media for catalogues"
                  bordered={false}
                  style={{ margin: "6px" }}
                >
                  <Form.Item name="image">
                    <Upload
                      listType="picture-card"
                      maxCount={10}
                      accept=".jpg, jpeg, .png"
                      fileList={imageUpload}
                      beforeUpload={beforeUploadImg}
                      onRemove={removeImage}
                      onPreview={handlePreview}
                    >
                      + Upload Images
                    </Upload>
                  </Form.Item>

                  <Form.Item name="video">
                    <Upload
                      listType="picture-card"
                      fileList={videoUpload}
                      beforeUpload={beforeUploadVideo}
                      maxCount={2}
                      accept=".mp4, .mov, .wmv, .avi, .flv, .mkv"
                      onRemove={removeVideo}
                      onPreview={handlePreview}
                    >
                      {videoUpload.length >= 2 ? null : "+ Upload Videos"}
                    </Upload>
                  </Form.Item>
                  <Form.Item name="video">
                    <Upload
                      name="avatar"
                      listType="picture-card"
                      maxCount={1}
                      fileList={sizeChartUpload}
                      accept=".jpg, jpeg, .png"
                      beforeUpload={beforeUploadImg}
                      onPreview={handlePreview}
                      onRemove={removeImage}
                    >
                      {imageUpload.length >= 1 ? null : "+ Upload Size Chart"}
                    </Upload>
                  </Form.Item>
                  <Modal
                    visible={previewOpen}
                    title={previewTitle}
                    footer={null}
                    onCancel={handleCancel}
                  >
                    <img
                      alt="example"
                      style={{ width: "100%" }}
                      src={previewImage}
                    />
                  </Modal>
                </Card>
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
                      ></Select>
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
                      // name={"product_id"}
                      name={"seller_sku_id"}
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
                              attributeList={attrbuteList}
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

export default EditCatalogue;
