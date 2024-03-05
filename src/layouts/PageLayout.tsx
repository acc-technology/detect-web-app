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
      <Sider className="overflow-auto py-4" width={250}>
        <div className="flex h-full flex-col justify-between">
          <div className="flex flex-col items-center gap-4">
            <img className="w-2/3" src="/logo.png" />
            <Menu
              className="w-full"
              theme="dark"
              items={items}
              selectedKeys={[pathname.split('/')[1]]}
              onSelect={({ selectedKeys }) => navigate(`/${selectedKeys[0]}`)}
            />
          </div>
          <div className="m-4 rounded-xl bg-[#8877ba] p-4 text-white">
            <div className="text-xl">About us</div>
            <div className="my-2 text-xs">
              这是一款全流程的智能化无障碍环境监测系统，开发团队根据无障碍设施问题呈现形式上的先验性和正确模式的规范性，在无障碍设施问题监测中引入图像识别、深度学习、地理信息技术、生成式人工智能等技术，可以高效应对海量无障碍图像数据的识别与分析，为无障碍环境体系化改造策略和完善的无障碍物质环境提供技术支持。
            </div>
            <img className="w-1/2" src="/accessibility.png" />
          </div>
        </div>
      </Sider>
      <Layout className="py-2 pr-2">
        <Header className="flex items-center rounded-t-xl">
          <Title className="mb-0 text-[#514390]" level={4}>
            无障碍环境智能监测系统
          </Title>
        </Header>
        <Content className="overflow-auto rounded-b-xl bg-white px-8 py-4">
          {useOutlet()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default PageLayout;
