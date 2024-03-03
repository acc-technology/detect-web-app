import { GaodeMap, PointLayer, Scene } from '@antv/l7';
import { Card, Col, Descriptions, Image, Row, Skeleton, Space } from 'antd';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetImageQuery } from '../apis';

const colorMap: Record<string, string> = {
  没有错误: '#52c41a',
  端部盲道缺失: '#f5222d',
  端部盲道错误: '#fa541c',
  交叉处盲道错误: '#fa8c16',
  柱状物占用: '#faad14',
  机动车占用: '#fadb14',
  非机动车占用: '#722ed1',
  窨井盖占用: '#eb2f96',
};

const DetectPage = () => {
  const { imageId = '' } = useParams();

  const { data } = useGetImageQuery({ id: +imageId || 0 });

  useEffect(() => {
    if (data && data.longitude && data.latitude) {
      const scene = new Scene({
        id: 'map',
        map: new GaodeMap({
          center: [data.longitude, data.latitude],
          zoom: 15,
          token: import.meta.env.VITE_MAP_TOKEN,
        }),
      });
      const pointLayer = new PointLayer({})
        .source([data], {
          parser: { type: 'json', x: 'longitude', y: 'latitude' },
        })
        .shape('simple')
        .size(4)
        .color('error_types', (value) => colorMap[value[0] ?? '没有错误']);
      scene.addLayer(pointLayer);
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
