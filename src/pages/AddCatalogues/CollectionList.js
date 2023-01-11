import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import {
  Table,
  Pagination,
  Row,
  Col,
  Tag,
  Spin,
  Typography,
  Tooltip,
} from "antd";
import { fectCollectionList } from "../../ApiStore/ApiData";
import { LinkOutlined } from "@ant-design/icons";

const { Text } = Typography;
const columns = [
  {
    title: "Short Id",
    dataIndex: "short_id",
    key: "short_id",
  },
  {
    title: "Collection Type",
    dataIndex: "collection_type",
    key: "collection_type",
  },
  {
    title: "Title",
    dataIndex: "title",
    responsive: ["md"],
  },
  {
    title: "Is Visible",
    dataIndex: "is_visible",
    responsive: ["md"],
    key: "is_visible",
    render: (text) => (
      <Tag color={text == true ? "green" : "red"}>{text.toString()}</Tag>
    ),
  },
  {
    title: "Is Active",
    dataIndex: "is_active",
    responsive: ["lg"],
    key: "is_active",
    render: (text) => (
      <Tag color={text == true ? "green" : "red"}>{text.toString()}</Tag>
    ),
  },
  {
    title: "Action",
    dataIndex: "action",
    responsive: ["lg"],
    key: "action",
    render: (text, record) => (
      <Row gutter={16} justify="center" align="middle">
        <Col span={12}>
          <Text
            style={{ fontSize: "1.2em" }}
            copyable={{
              tooltips: "Copy Link",
            }}
          ></Text>
        </Col>
        <Col span={12}>
          <Tooltip title="Visit Link">
            <Typography.Link target="_blank">
              <LinkOutlined
                tooltips="Visit Link"
                style={{ fontSize: "1.2em", color: "#15A362" }}
              />
            </Typography.Link>
          </Tooltip>
        </Col>
      </Row>
    ),
  },
];

const CollectionList = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  //api
  const [collectionData, setCollectionData] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

  //api data
  const fetchCollectionTable = async () => {
    try {
      const collectionResponse = await fectCollectionList();
      setCollectionData(collectionResponse.data.data.data);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchCollectionTable();
  }, []);
  return (
    <>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={collectionData}
      />
    </>
  );
};
export default CollectionList;
