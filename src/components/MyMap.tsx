import React, { useRef, useEffect, useState } from "react";
import Map, { Marker, NavigationControl, MapRef } from "react-map-gl";
import { useStore } from "../context/store";
import Icon from "./ui/Icon";
import "mapbox-gl/dist/mapbox-gl.css";

const isLocal = process.env.NODE_ENV === "development";
const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

const MyMap = () => {
  const { venues, selectedVenue } = useStore();
  const mapRef = useRef<MapRef | null>(null);
  const [hoveredVenue, setHoveredVenue] = useState<number | null>(null);

  const mapStyleUrl = isLocal
    ? "http://localhost:3001/mapbox"
    : "mapbox://styles/mapbox/dark-v10";

  useEffect(() => {
    if (selectedVenue && mapRef.current) {
      mapRef.current.flyTo({
        center: [selectedVenue.lon, selectedVenue.lat],
        zoom: 15,
        essential: true,
      });
    }
  }, [selectedVenue]);

  return (
    <div className="w-full h-screen relative">
      <Map
        ref={mapRef}
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
            <div
              onMouseEnter={() => setHoveredVenue(venue.id)}
              onMouseLeave={() => setHoveredVenue(null)}
            >
              <Icon
                src={
                  selectedVenue && selectedVenue.id === venue.id
                    ? "/icons/greenJar.svg"
                    : "/icons/whiteJar.svg"
                }
                alt="Marker"
                className="w-[24px] h-[24px]"
              />
              {hoveredVenue === venue.id && (
                <div className="absolute bottom-8 left-0 bg-black text-white text-xs rounded px-2 py-1 inline-block whitespace-nowrap font rubik">
                  {venue.name}
                </div>
              )}
            </div>
          </Marker>
        ))}
      </Map>
    </div>
  );
};

export default MyMap;
