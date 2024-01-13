import {YMaps, Map} from "@pbe/react-yandex-maps";

const MapModule = () => {
  let coordinates = [59.9386, 30.3141]
  return (
    <YMaps query={{ lang: 'ru_RU', apikey: process.env.REACT_APP_YMAP_KEY }}>
        <Map className="map-section pt-5" defaultState={{center: coordinates, zoom: 10}}/>
    </YMaps>
  );
}

export default MapModule;