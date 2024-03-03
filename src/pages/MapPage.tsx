import { PointLayer, Scene } from '@antv/l7';
import { GaodeMap } from '@antv/l7-maps';
import { useEffect } from 'react';
import { useListImageQuery } from '../apis';

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

const MapPage = () => {
  const { data } = useListImageQuery();

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
      const pointLayer = new PointLayer({})
        .source(data, {
          parser: { type: 'json', x: 'longitude', y: 'latitude' },
        })
        .shape('simple')
        .size(4)
        .color('error_types', (value) => colorMap[value[0] ?? '没有错误']);
      scene.addLayer(pointLayer);
      return () => scene.destroy();
    }
  }, [data]);

  return <div id="map" className="relative h-full" />;
};

export default MapPage;
