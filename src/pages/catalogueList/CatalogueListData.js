import React, {useState, useEffect} from "react";
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
  Pagination,
} from "antd";
import {
  RedoOutlined,
  EyeOutlined,
  ShareAltOutlined,
  EditOutlined,
  CopyOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { fetchCatalogueList } from "../../ApiStore/ApiData";
const { Title, Text } = Typography;

const CatalogueListData = ({catalogueData}) => {

  // console.log(">>>>>>>>>>CatalogueDataaha---->",catalogueData)
const { short_id } = catalogueData;
// console.log(">>>>shortId<<<<--->", short_id);
  // useEffect(()=>{
  //   fetchData();
  //   // catalogueData
  // },[catalogueData])
  // const getImageVariants = (s3Url, { thumbnail, base, preview } = {}) => {
  //   if (!s3Url) {
  //     return {};
  //   }
//  const images = catalogueData.media.sort((media1, media2)=> media2.type === 'image').map(item => item.src_url);
// console.log(">>>IMage", images)
  
  const onChange = (value) => {
    console.log("changed", value);
  };
  return (
    <>
      <Card>
        {/* {console.log(">>>>>>>ImgData", images)} */}
        <Row gutter={[16, 16]} justify="space-evenly">
          <Col xs={24}  lg={6} align-items="space-between">
            <Row >
              {/* <Image 
              height={130}
              src="	https://s3.ap-south-1.amazonaws.com/wmall-product-catalogue/AANAYA 2403_1665677307398_m5x4irzr9x1evgb.jpg
              "
              /> */}
              { catalogueData.media[0].thumbnail_url ?
                <Image
                    //  width={120}
                     src ={catalogueData.media[0].thumbnail_url
                     }
                     preview={{
                      src: catalogueData.media[0].preview_url
                    }} 
              /> :
              <Image
                    //  width={120}
                     src ="https://d1311wbk6unapo.cloudfront.net/Catalogue/tr:w-600,fo-auto/product-image-placeholder.jpg"
                     preview={{
                      src: "https://d1311wbk6unapo.cloudfront.net/Catalogue/tr:w-600,fo-auto/product-image-placeholder.jpg"
                    }} 
              />

                  }
            </Row>
         
         <Col>
            <Row gutter={[16, 16]}>
              {/* <Col span={24}> */}
              <Col >
                <Form.Item label={catalogueData.customer_skus[0].size}>
                    <InputNumber min={1} defaultValue={catalogueData.customer_skus[0].quantity} onChange={onChange} />
                </Form.Item>
              </Col>
              <Col>
                <Title level={5} strong>
                  Confirm
                </Title>
                <Tooltip placement="top" title="Update Quantity">
                  <SaveOutlined style={{ color: "#15A362", fontSize: "1.2rem" }} />
                </Tooltip>
              </Col>
              {/* </Col> */}
            </Row>
            </Col>
            </Col>
          <Col
            xs={24}
            sm={8}
            lg={6}
            align="left"
            style={{
              marginBottom: "0.5em",
              fontWeight: "600",
              fontSize: "16px",
              lineHeight: "1.5",
            }}
          >
            <Row justify="flex-start">
              <Col>
                <Title level={5} strong>
                  Name
                </Title>
              </Col>
              <Col>
                <Title level={5} code>
                  {catalogueData.en.web.title}
                </Title>
              </Col>
            </Row>
            <Row justify="flex-start">
              <Col>
                <Title level={5} strong>
                  Product Code
                </Title>
              </Col>
              <Col>
                <Title level={5} code>
                  {catalogueData.seller_sku_id}

                </Title>
              </Col>
            </Row>
            <Row justify="flex-start">
              <Col>
                <Title level={5} strong>
                  Pickup Address
                </Title>
              </Col>
              <Col>
                <Title level={5} code>
                  {catalogueData.pickup_point}
                </Title>
              </Col>
            </Row>
          </Col>
          <Col xs={24} sm={8} lg={6}>
            {/* <Row justify="center">
              <Col>
                <Button icon={<RedoOutlined />}>Refresh Amazon Reviews</Button>
              </Col>
            </Row> */}
            <Row gutter={[12, 12]} justify="space-between">
              <Col>
                <Tooltip placement="top" title="Toggle Visibility">
                  <EyeOutlined style={{ color: "#15A362", fontSize: "1.2rem" }} />
                </Tooltip>
              </Col>
              <Col>
                <Tooltip placement="top" title="Share Product">
                  <Link to="https://web.whatsapp.com">
                    <ShareAltOutlined style={{ color: "#15A362", fontSize: "1.2rem" }} />
                  </Link>
                </Tooltip>
              </Col>
              <Col>
                <Tooltip placement="top" title="Edit Product">
                  <Link to={`/edit/${short_id}`}>
                    <EditOutlined style={{ color: "#15A362", fontSize: "1.2rem" }} />
                  </Link>
                </Tooltip>
              </Col>
              <Col>
                <Tooltip placement="top" title="Copy Link">
                  <CopyOutlined style={{ color: "#15A362", fontSize: "1.2rem" }} />
                </Tooltip>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default CatalogueListData 
