import {
  GlobalOutlined,
  HistoryOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, Typography } from 'antd';
import { useLocation, useNavigate, useOutlet } from 'react-router-dom';

const { Content, Header, Sider } = Layout;
const { Title } = Typography;

const items: MenuProps['items'] = [
  { key: 'upload', label: '图片上传', icon: <UploadOutlined /> },
  { key: 'history', label: '历史记录', icon: <HistoryOutlined /> },
  { key: 'map', label: '地图汇总', icon: <GlobalOutlined /> },
];

const PageLayout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <Layout className="h-screen">
      <Header className="flex items-center">
        <Title className="mb-0 text-white" level={4}>
          识别系统
        </Title>
      </Header>
      <Layout>
        <Sider>
          <Menu
            theme="dark"
            items={items}
            selectedKeys={[pathname.split('/')[1]]}
            onSelect={({ selectedKeys }) => navigate(`/${selectedKeys[0]}`)}
          />
        </Sider>
        <Content className="overflow-auto px-8 py-4">{useOutlet()}</Content>
      </Layout>
    </Layout>
  );
};

export default PageLayout;
