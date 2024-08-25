import React from "react";
import Map, { Marker, NavigationControl } from "react-map-gl";
import { useStore } from "../context/store";
import Icon from "./ui/Icon";

const isLocal = process.env.NODE_ENV === "development";
const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

const MyMap = () => {
  const { venues } = useStore();
  const mapStyleUrl = isLocal
    ? "http://localhost:3001/mapbox"
    : "mapbox://styles/mapbox/dark-v10";

  return (
    <div className="w-full h-screen">
      <Map
        initialViewState={{
          longitude: 19.0402,
          latitude: 47.4979,
          zoom: 12,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle={mapStyleUrl}
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        <NavigationControl position="top-left" />
        {venues.map((venue) => (
          <Marker
            key={venue.id}
            longitude={venue.lon}
            latitude={venue.lat}
            anchor="bottom"
          >
            <Icon
              src="/icons/whiteJar.svg"
              alt="Marker"
              className="w-[24px] h-[24px]"
            />
          </Marker>
        ))}
      </Map>
    </div>
  );
};

export default MyMap;
