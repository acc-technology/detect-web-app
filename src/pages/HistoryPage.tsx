import type { TableProps } from 'antd';
import { Button, Table } from 'antd';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { useListImageQuery } from '../apis';

const columns: TableProps['columns'] = [
  { title: '图片编号', dataIndex: 'id' },
  {
    title: '上传时间',
    dataIndex: 'upload_time',
    render: (value) => dayjs.unix(value).format('YYYY-MM-DD'),
  },
  {
    title: '经度',
    dataIndex: 'longitude',
    render: (value) => value.toFixed(5),
  },
  { title: '纬度', dataIndex: 'latitude', render: (value) => value.toFixed(5) },
  {
    title: '问题类型',
    dataIndex: 'error_types',
    render: (value) => value.join('，'),
  },
  {
    title: '操作',
    render: (_, record) => (
      <>
        <Link to={`/detect/${record.id}`}>
          <Button type="link" size="small">
            详情
          </Button>
        </Link>
        <Button type="link" danger size="small">
          删除
        </Button>
      </>
    ),
  },
];

const HistoryPage = () => {
  const { data, loading } = useListImageQuery();

  return (
    <Table columns={columns} rowKey="id" dataSource={data} loading={loading} />
  );
};

export default HistoryPage;
