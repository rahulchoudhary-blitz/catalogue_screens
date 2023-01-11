import React from "react";
import { Form, Input, Row, Col, AutoComplete, Divider } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";

export const AttributeForm = ({
  index,
  field,
  remove,
  form,
  formStyle,
  attributeList,
}) => {
  return (
    <>
      <Row key={field.key} align="baseline" gutter={[8, 8]}>
        <Divider orientation="left">{`Attribute: ${index + 1}`}</Divider>
        <Col span={22}>
          <Row gutter={[8, 8]}>
            <Col xs={24} lg={12}>
              <Form.Item
                {...field}
                label="Attribute key"
                name={[field.name, "attribute_lable"]}
                fieldKey={[field.fieldKey, "attribute_label"]}
                {...formStyle}
                rules={[
                  {
                    required: true,
                    message: "Messing Atribute Key",
                  },
                ]}
              >
                <AutoComplete
                  options={attributeList}
                  filterOption={(inputValue, option) =>
                    option.value
                      .toUpperCase()
                      .indexOf(inputValue.toUpperCase()) !== -1
                  }
                  placeholder="Attribute key"
                />
              </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
              <Form.Item
                {...field}
                label="Attribute Value"
                name={[field.name, "attribute_value"]}
                fieldkey={[field.fieldKey, "attribute_value"]}
                {...formStyle}
                rules={[
                  {
                    required: true,
                    message: " Missing Attribute Value ",
                  },
                ]}
              >
                <Input
                  type="text"
                  style={{ width: "100%" }}
                  placeholder=" Attribute Value "
                  min={0}
                />
              </Form.Item>
            </Col>
          </Row>
        </Col>
        <Col span={2}>
          <Row justify="center">
            <Col justify="center">
              {form.getFieldValue("product_attributes").length >= 1 && (
                <MinusCircleOutlined
                  style={{
                    fontSize: "30px",
                    marginTop: "20px",
                  }}
                  onClick={() => remove(field.name)}
                />
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};
