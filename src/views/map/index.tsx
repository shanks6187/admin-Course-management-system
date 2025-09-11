import AMapLoader from '@amap/amap-jsapi-loader';
import React, { useEffect } from 'react';
import styled from 'styled-components';

export interface IAppProps {}

declare global {
  interface Window {
    _AMapSecurityConfig?: {
      securityJsCode: string;
    };
  }
}

const MapIndex: React.FC<IAppProps> = () => {
  let map: any = null;

  useEffect(() => {
    window._AMapSecurityConfig = {
      securityJsCode: "「你申请的安全密钥」",
    };

    AMapLoader.load({
      key: "ad626f0439f1abbe20c49472ab3549e7",
      version: "2.0",
      plugins: ["AMap.Scale", "AMap.Geolocation"],
    })
      .then((AMap) => {
        map = new AMap.Map("container", {
          viewMode: "3D",
          zoom: 11,
          center: [116.397428, 39.90923],
        });

        map.addControl(new AMap.Scale());

        const geolocation = new AMap.Geolocation({
          enableHighAccuracy: true,
          timeout: 10000,
          position: 'RB',
          offset: [10, 20],
          zoomToAccuracy: true,
        });
        map.addControl(geolocation);

        geolocation.getCurrentPosition((status: string, result: any) => {
          if (status === "complete") {
            console.log("定位成功：", result);
          } else {
            alert("定位失败，请检查定位权限或网络！");
          }
        });
      })
      .catch((e) => {
        console.log("地图加载失败：", e);
      });

    return () => {
      map?.destroy();
    };
  }, []);

  return (
    <div>
      <MapBox id="container"></MapBox>
    </div>
  );
};

export default MapIndex;

const MapBox = styled.div`
  height: 600px;
  border: 1px solid red;
`;
