import { GaodeMap, Scene } from '@antv/l7';
import { Card, Col, Descriptions, Image, Row, Skeleton, Space } from 'antd';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetImageQuery } from '../apis';
import { getPointLayer } from '../utils/map';

const DetectPage = () => {
  const { imageId = '' } = useParams();

  const { data } = useGetImageQuery({ id: +imageId || 0 });

  useEffect(() => {
    if (data) {
      const scene = new Scene({
        id: 'map',
        map: new GaodeMap({
          center: [120.2052342, 30.2489634],
          zoom: 10,
          token: import.meta.env.VITE_MAP_TOKEN,
        }),
      });
      scene.on('loaded', async () =>
        scene.addLayer(await getPointLayer([data])),
      );
      return () => scene.destroy();
    }
  }, [data]);

  return (
    <Row gutter={32}>
      <Col span={8}>
        <Space className="w-full" direction="vertical">
          <Card
            hoverable
            cover={
              data ? (
                <Image
                  src={`${import.meta.env.VITE_BASE_API}/image/fetch/${data.filename}`}
                />
              ) : (
                <Skeleton.Image className="w-full" active />
              )
            }
          >
            <Card.Meta title="原图" />
          </Card>
          <Card
            hoverable
            cover={
              data ? (
                <Image
                  src={`${import.meta.env.VITE_BASE_API}/image/fetch/${data.filename}?type=new`}
                />
              ) : (
                <Skeleton.Image className="w-full" active />
              )
            }
          >
            <Card.Meta title="识别结果" />
          </Card>
        </Space>
      </Col>
      <Col span={16}>
        {data ? (
          <Space className="w-full" direction="vertical">
            <Descriptions
              title="图片信息"
              bordered
              items={[
                { label: '图片编号', children: data.id },
                { label: '经度', children: data.longitude.toFixed(5) },
                { label: '纬度', children: data.latitude.toFixed(5) },
                { label: '问题类型', children: data.error_types },
              ]}
            />
            <div id="map" className="relative h-96" />
          </Space>
        ) : (
          <Skeleton active />
        )}
      </Col>
    </Row>
  );
};

export default DetectPage;
