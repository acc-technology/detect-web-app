import { Scene } from '@antv/l7';
import { GaodeMap } from '@antv/l7-maps';
import { useEffect } from 'react';
import { useListImageQuery } from '../apis';
import { getPointLayer } from '../utils/map';

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
      scene.on('loaded', async () => scene.addLayer(await getPointLayer(data)));
      return () => scene.destroy();
    }
  }, [data]);

  return <div id="map" className="relative h-full" />;
};

export default MapPage;
