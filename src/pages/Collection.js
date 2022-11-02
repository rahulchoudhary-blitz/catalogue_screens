import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Table, Pagination } from 'antd';

const columns = [
  {
    title: 'Short Id',
    dataIndex: 'shortid',
  },
  {
    title: 'Collection Type',
    dataIndex: 'collection',
  },
  {
    title: 'Title',
    dataIndex: 'title',
    responsive: ['md']
  },
  {
    title: 'Is Visible',
    dataIndex: 'isvisible',
    responsive: ['md']
  },
  {
    title: 'Is Active',
    dataIndex: 'isactive',
    responsive: ['lg']
  },
  {
    title: 'Action',
    dataIndex: 'action',
    responsive: ['lg']
  },
];

const Collection = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
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
        key: 'odd',
        text: 'Select Odd Row',
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
        key: 'even',
        text: 'Select Even Row',
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
  return <Table rowSelection={rowSelection} columns={columns}/>;
};
export default Collection;