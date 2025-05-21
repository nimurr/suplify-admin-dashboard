import React from 'react';
import { Table } from 'antd';
import { Link } from 'react-router-dom';

const dataSource = [
  {
    key: '1',
    id: '01',
    category: 'Supplements',
    item: 10,
  },
  {
    key: '2',
    id: '02',
    category: 'Fitness',
    item: 25,
  },
  {
    key: '3',
    id: '03',
    category: 'Wellness',
    item: 24,
  },
  {
    key: '4',
    id: '04',
    category: 'Lifestyle',
    item: 60,
  },
  {
    key: '5',
    id: '05',
    category: 'Lab test',
    item: 60,
  },
];

const columns = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
    width: 80,
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
    render: (text) => <strong>{text}</strong>,
  },
  {
    title: 'Item',
    dataIndex: 'item',
    key: 'item',
  },
  {
    title: 'Action',
    key: 'action',
    render: () =>  (
     <Link to="view-store">
     view
     </Link>
    ),
  },
];

const StoreTable = () => {
  return <Table dataSource={dataSource} columns={columns} pagination={false} />;
};

export default StoreTable;
