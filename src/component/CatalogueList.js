import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Row,
  Col,
  Typography,
  Divider,
  Spin,
  List,
  Select,
  Card,
  DatePicker,
  Button,
  
} from "antd";
import Content from "../layout/NavBar";
import PageOverviewCard from "../pages/AddCatalogues/PageOverviewCard";
import UploadList from "../pages/catalogueList/UploadList";
import CatalogueListData from "../pages/catalogueList/CatalogueListData";
import {
  fetchCatalogueList,
  fetchAddPreferred,
  fetchSearchApi,
} from "../ApiStore/ApiData";
import { SearchOutlined, ClearOutlined } from "@ant-design/icons";

// const { Title } = Typography;

const CatalogueList = () => {
  const [catalogueData, setCatalogueData] = useState([]);
  const [totalCount, setTotalCount] = useState();
  const [loader, setLoader] = useState(true);
  const [productType, setProductType] = useState([]);
  const [searchValues, setSearchValues] = useState({});

  const [sortingOptions, setSortingOption] = useState({});

  const [form] = Form.useForm();

//catalogueList Api
  const CatalogueList = async () => {
    const catalogueResponse = await fetchCatalogueList();
    setLoader(false);
    setCatalogueData(catalogueResponse.data.data.catalogues);
    setTotalCount(catalogueResponse.data.data.count);
  };
  useEffect(() => {
    CatalogueList();
  }, []);

  //Auto fill Require data 
  const fetchPreferredCollection = async () => {
    const response = await fetchAddPreferred();
    setProductType([
      ...response.data.data.product_types.map((item) => ({
        value: item.key,
        label: item.display_value,
      })),
    ]);
  };

  useEffect(() => {
    fetchPreferredCollection();
  }, []);
  const handleChangeOnSelect = (value) => {
    console.log(`selected ${value}`);
  };

  //formData
  //search Api data handling
  const onFinish = async (values) => {
    Object.keys(values).forEach((key) => !values[key] && delete values[key]);
    setLoader(true);
    const resSearchData = await fetchSearchApi(values);
    setLoader(false);
    setCatalogueData(resSearchData.data.data.catalogues);
    setTotalCount(resSearchData.data.data.count);
  };
  const handleClear = () => {
    form.resetFields();
    setSearchValues({});
  };

  return (
    <>
      <Content>
        <Row>
          <Col span={24}>
            <PageOverviewCard />
          </Col>

          <Col span={24}>
            {/* CatalogueForm */}
            <Form
              name="catalogue_form"
              autoComplete="off"
              form={form}
              onFinish={onFinish}
            >
              <Card>
                <Row gutter={[16, 16]}>
                  <Col xs={24} lg={6}>
                    <Form.Item label="Name" name={"name"}>
                      <Input type="text" placeholder="Ryon Kurti" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} lg={6}>
                    <Form.Item label="Product Code" name={"seller_sku_id"}>
                      <Input type="text" placeholder="Kurti_123" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} lg={6}>
                    <Form.Item label="Sku Code" name={"sku_id"}>
                      <Input type="text" placeholder="Kurti_abcd" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} lg={6}>
                    <Form.Item label="Pickup Address" name={"pickup_point"}>
                      <Select
                        defaultValue="1"
                        onChange={handleChangeOnSelect}
                        options={[
                          {
                            value: "1",
                            label: " pickup/address-045/xhahsdasassnasj",
                          },
                          {
                            value: "2",
                            label: "pickup/address-067/xhahsdasassnasj",
                          },
                        ]}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={[12, 12]}>
                  <Col xs={24} lg={8}>
                    <Form.Item label="Is OOs" name={"is_oos"}>
                      <Select placeholder="Is Out Of Stock">
                        <Select.Option key={"true"}>{"True"}</Select.Option>
                        <Select.Option key={"false"}>{"False"}</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24} lg={8}>
                    <Form.Item label="Is Visible" name={"is_visible"}>
                      <Select defaultValue="true">
                        <Select.Option value="true" key={"true"}>
                          {"True"}
                        </Select.Option>
                        <Select.Option value="false" key={"false"}>
                          {"False"}
                        </Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24} lg={8}>
                    <Form.Item label="Date range" name={"date_range"}>
                      <DatePicker.RangePicker initialValues="date" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={[12, 12]}>
                  <Col xs={24} lg={8}>
                    <Form.Item label="Product Types" name={"product_types"}>
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
                        {productType.map((item) => (
                          <Option value={item.key}>{item.label}</Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24} lg={8}>
                    <Form.Item label="Recently Updated" name={"sort_by"}>
                      <Select defaultValue={"recently_updated"}>
                        {sortingOptions &&
                          Object.keys(sortingOptions).map((key, index) => (
                            <Select.Option value={key} key={`${key}_index`}>
                              {sortingOptions[key]}
                            </Select.Option>
                          ))}
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
                    <Col xs={24} lg={6} style={{ margin: "20px" }}>
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
                    <Col xs={24} lg={6} style={{ margin: "20px" }}>
                      <Button
                        type="secondary"
                        icon={<ClearOutlined />}
                        size="large"
                        onClick={handleClear}
                      >
                        Clear Filters
                      </Button>
                    </Col>
                  </Row>
                </Row>
              </Card>
            </Form>
          </Col>

          <Col span={24}>
            <UploadList />
          </Col>
          <Col span={24}>
            <Spin spinning={loader} style={{ color: "green" }}>
              {totalCount ? (
                <Divider orientation="left">
                  <Typography.Title
                    level={5}
                  >{`Total Catalogues: ${totalCount}`}</Typography.Title>
                </Divider>
              ) : null}
              <List
                dataSource={catalogueData}
                key={`catalogue_list_key_${Math.random()}`}
                renderItem={(item, index) => (
                  <List.Item key={index}>
                    <CatalogueListData
                      catalogueData={item}
                      fetchData={CatalogueList}
                    />
                  </List.Item>
                )}
              />
            </Spin>
          </Col>
        </Row>
      </Content>
    </>
  );
};

export default CatalogueList;
