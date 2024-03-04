import { PointLayer } from '@antv/l7';

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

export const getPointLayer = async (data: any) => {
  data = data.filter((value: any) => value.longitude && value.latitude);
  const { locations } = await new Promise<any>((resolve) => {
    const { AMap } = window as any;
    AMap.convertFrom(
      data.map(
        (value: any) => new AMap.LngLat(value.longitude, value.latitude),
      ),
      'gps',
      (_: any, result: any) => resolve(result),
    );
  });
  const pointLayer = new PointLayer({})
    .source(
      data.map((value: any, index: any) => ({
        ...value,
        lng: locations[index].lng,
        lat: locations[index].lat,
      })),
      { parser: { type: 'json', x: 'lng', y: 'lat' } },
    )
    .shape('circle')
    .size(4)
    .color('error_types', (value) => colorMap[value[0] ?? '没有错误']);
  return pointLayer;
};
