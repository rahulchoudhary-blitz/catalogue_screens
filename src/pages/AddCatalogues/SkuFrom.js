import React, { useState } from "react";
import {
  Form,
  Input,
  Row,
  Col,
  Divider,
  InputNumber,
  AutoComplete,
  Select,
} from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";

export const SkuForm = ({
  index,
  field,
  remove,
  form,
  singleSize,
  formStyle,
}) => {
  const [validWeight, setValidWeight] = useState("");
  const [validSellingPrice, setValidSellingPrice] = useState("");
  const [validMrp, setValidMrp] = useState("");
  const [validLength, setValidLength] = useState("");
  const [validBreadth, setValidBreadth] = useState("");
  const [validHeight, setValidHeight] = useState("");

  /**
   * Validate Weight
   * @param {*} value
   * @param {*} callback
   */
  const validateWeight = (rule, value, callback) => {
    if (!value && value !== 0) {
      setValidWeight("error");
      callback("Please enter  the weight");
    } else if (value < 0.05) {
      setValidWeight("error");
      callback("weight cannot be less than 0.05");
    } else if (value > 10) {
      setValidWeight("error");
      callback("weight cannot be greater than 10");
    } else {
      setValidWeight("succes");
      callback();
    }
  };

  /**
   * validate length
   * @param {*} value
   * @param {*} callback
   */
  const validateLength = (rule, value, callback) => {
    if (!value && value !== 0) {
      setValidLength("error");
      callback("Please enter Length");
    } else if (value < 1) {
      setValidLength("error");
      callback("Length cannot be less than 1");
    } else if (value > 50) {
      setValidLength("error");
      callback("Length cannot be greater than 50");
    } else {
      setValidLength("succes");
      callback();
    }
  };

  /**
   * validate selling price
   * @param {*} value
   * @param {*} callback
   */
  const validateSellingPrice = (rule, value, callback) => {
    const mrp = form.getFieldsValue().customer_skus[index].mrp;
    if (!value && value !== 0) {
      setValidSellingPrice("error");
      callback("Please enter Selling Price");
    } else if (value < 1) {
      setValidSellingPrice("error");
      callback("selling price cannot be less then ₹1");
    } else if (value > 1000000) {
      setValidSellingPrice("error");
      callback("selling price cannot be greater than ₹1000000");
    } else if (mrp && value > mrp) {
      setValidSellingPrice("error");
      callback("selling price cannot be greater than mrp");
    } else {
      setValidSellingPrice("succes");
      callback();
    }
  };

  /**
   *  validate Mrp
   * @param {*} value
   * @param {*} callback
   */
  const validateMrp = (rule, value, callback) => {
    const sellingPrice =
      form.getFieldsValue().customer_skus[index].selling_price;
    if (!value && value !== 0) {
      setValidMrp("error");
      callback("Please enter Mrp");
    } else if (value < 1) {
      setValidMrp("error");
      callback("Mrp cannot be less than ₹1");
    } else if (value > 1000000) {
      setValidMrp("error");
      callback("Mrp cannot be greater than ₹1000000");
    } else if (sellingPrice && value < sellingPrice) {
      setValidMrp("error");
      callback("Mrp cannot be less than selling price");
    } else {
      setValidMrp("succes");
      callback();
    }
  };
  /**
   * validate Breadth
   * @param {*} rule
   * @param {*} value
   * @param {*} callback
   */
  const validateBreadth = (rule, value, callback) => {
    if (!value && value !== 0) {
      setValidBreadth("error");
      callback("Please enter Breadth");
    } else if (value < 1) {
      setValidBreadth("error");
      callback("Breadth cannot be less than 1");
    } else if (value > 50) {
      setValidBreadth("error");
      callback("Breadth cannot be greater than 50");
    } else {
      setValidBreadth("succes");
      callback();
    }
  };

  /**
   * validate height
   * @param {*} rule
   * @param {*} value
   * @param {*} callback
   */
  const validateHeight = (rule, value, callback) => {
    if (!value && value !== 0) {
      setValidHeight("error");
      callback("Please enter Height");
    } else if (value < 1) {
      setValidHeight("error");
      callback("Height cannot be less than 1");
    } else if (value > 50) {
      setValidHeight("error");
      callback("Height cannot be greater than 50");
    } else {
      setValidHeight("succes");
      callback();
    }
  };
  return (
    <>
      <Row key={field.key} align="baseline" gutter={[8, 8]}>
        {/* orientation-->The position of title inside divider */}
        <Divider orientation="left"> {`Sku number:${index + 1}`}</Divider>
        <Col span={22}>
          <Row gutter={[8, 8]}>
            <Col xs={24} lg={8}>
              <Form.Item
                {...field}
                {...formStyle}
                label="Size"
                name={[field.name, "size"]}
                fieldKey={[field.fieldKey, "size"]}
                rules={[
                  {
                    require: true,
                    message: "Missing size field",
                  },
                ]}
              >
                <AutoComplete
                  filterOption={(inputValue, option) =>
                    option.value
                      .toUpperCase()
                      .indexOf(inputValue.toUpperCase()) !== -1
                  }
                  disabled={singleSize}
                  placeholder="Size"
                />
              </Form.Item>
            </Col>
            <Col xs={24} lg={8}>
              <Form.Item
                {...field}
                {...formStyle}
                label="Sku Id"
                name={[field.name, "sku_id"]}
                fieldKey={[field.fieldKey, "sku_id"]}
                rules={[
                  {
                    required: true,
                    message: "missing Sku_id",
                  },
                ]}
              >
                <Input type="text" placeholder="Sku Id" />
              </Form.Item>
            </Col>

            <Col xs={24} lg={8}>
              <Form.Item
                {...field}
                {...formStyle}
                label="Selling Price"
                name={[field.name, "selling_price"]}
                fieldKey={[field.fieldKey, "selling_price"]}
                validateStatus={validSellingPrice}
                rules={[
                  {
                    required: true,
                    validator: validateSellingPrice,
                  },
                ]}
              >
                <InputNumber style={{ width: "100%" }} placeholder="Price" />
              </Form.Item>
            </Col>
            <Col xs={24} lg={8}>
              <Form.Item
                {...field}
                {...formStyle}
                label="MRP"
                name={[field.name, "mrp"]}
                fieldKey={[field.fieldKey, "mrp"]}
                validateStatus={validMrp}
                rules={[
                  {
                    required: true,
                    validator: validateMrp,
                  },
                ]}
              >
                <InputNumber style={{ width: "100%" }} placeholder="Price" />
              </Form.Item>
            </Col>
            <Col xs={24} lg={8}>
              <Form.Item
                {...field}
                {...formStyle}
                label="Cost Price"
                fieldKey={[field.fieldKey, "cost_price"]}
                name={[field.name, "cost_price"]}
                rules={[
                  {
                    message: "missing price",
                  },
                ]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  placeholder="Cost Price"
                />
              </Form.Item>
            </Col>
            <Col xs={24} lg={8}>
              <Form.Item
                {...field}
                {...formStyle}
                label="Qty"
                fieldKey={[field.fieldKey, "quantity"]}
                name={[field.name, "quantity"]}
                rules={[
                  {
                    required: true,
                    message: "Missing Quantity",
                  },
                ]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  min={0}
                  placeholder="Quantity"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[8, 8]}>
            <Col xs={24} lg={8}>
              <Form.Item
                {...field}
                {...formStyle}
                label="Weight(kg)"
                fieldKey={[field.fieldKey, "weight"]}
                name={[field.name, "weight"]}
                validateStatus={validWeight}
                rules={[
                  {
                    required: true,
                    validator: validateWeight,
                  },
                ]}
              >
                <InputNumber style={{ width: "100%" }} placeholder="Weight" />
              </Form.Item>
            </Col>
            <Col xs={24} lg={8}>
              <Form.Item
                {...field}
                {...formStyle}
                label="L (cm)"
                fieldKey={[field.fieldKey, "length"]}
                name={[field.name, "length"]}
                validateStatus={validLength}
                rules={[
                  {
                    required: true,
                    validator: validateLength,
                  },
                ]}
              >
                <InputNumber style={{ width: "100%" }} placeholder="Length" />
              </Form.Item>
            </Col>
            <Col xs={24} lg={8}>
              <Form.Item
                {...field}
                {...formStyle}
                label="B (cm)"
                name={[field.name, "breadth"]}
                fieldKey={[field.fieldKey, "breadth"]}
                validateStatus={validBreadth}
                rules={[
                  {
                    required: true,
                    validator: validateBreadth,
                  },
                ]}
              >
                <InputNumber style={{ width: "100%" }} placeholder="breadth" />
              </Form.Item>
            </Col>
            <Col xs={24} lg={8}>
              <Form.Item
                {...field}
                {...formStyle}
                label="H (cm)"
                fieldKey={[field.fieldKey, "height"]}
                name={[field.name, "height"]}
                validateStatus={validHeight}
                rules={[
                  {
                    required: true,
                    validator: validateHeight,
                  },
                ]}
              >
                <InputNumber style={{ width: "100%" }} placeholder="height" />
              </Form.Item>
            </Col>
            <Col xs={24} lg={8}>
              <Form.Item
                {...field}
                {...formStyle}
                label="Vol (cm3)"
                fieldKey={[field.fieldKey, "volume"]}
                name={[field.name, "volume"]}
                rules={[
                  {
                    required: true,
                    message: "messing volume",
                  },
                ]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  placeholder="volume"
                  disabled={true}
                />
              </Form.Item>
            </Col>
          </Row>
        </Col>
        {form.getFieldValue("customer_skus").length > 1 && (
          <Col span={2}>
            <Row justify="center">
              <Col justify="center">
                {
                  <MinusCircleOutlined
                    style={{ fontSize: "30px", marginTop: "20px" }}
                    onClick={() => remove(field.name)}
                  />
                }
              </Col>
            </Row>
          </Col>
        )}
      </Row>
    </>
  );
};
