import React, { useRef, useEffect, useState } from "react";
import Map, { Marker, NavigationControl, MapRef } from "react-map-gl";
import { useStore } from "../context/store";
import Icon from "./ui/Icon";
import "mapbox-gl/dist/mapbox-gl.css";
import ListItem from "./ListItem";
import { createPortal } from "react-dom";
import { IconMapping } from "./ListItem";

const isLocal = process.env.NODE_ENV === "development";
const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

const MyMap = () => {
  const { venues, selectedVenue, setSelectedVenue } = useStore();
  const mapRef = useRef<MapRef | null>(null);
  const [hoveredVenue, setHoveredVenue] = useState<number | null>(null);
  const [hoverPosition, setHoverPosition] = useState({ top: 0, left: 0 });

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

  const handleMouseEnter = (e: any, venue: any) => {
    updateHoverPosition(venue.lon, venue.lat);
    setHoveredVenue(venue.id);
  };

  const handleClick = (venue: any) => {
    setSelectedVenue(venue);
  };

  const updateHoverPosition = (longitude: number, latitude: number) => {
    if (mapRef.current) {
      const { x, y } = mapRef.current.project([longitude, latitude]);
      setHoverPosition({ top: y, left: x });
    }
  };

  useEffect(() => {
    const onMapMove = () => {
      if (hoveredVenue !== null) {
        const venue = venues.find((v) => v.id === hoveredVenue);
        if (venue) {
          updateHoverPosition(venue.lon, venue.lat);
        }
      }
    };

    if (mapRef.current) {
      mapRef.current.on("move", onMapMove);
      mapRef.current.on("zoom", onMapMove);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.off("move", onMapMove);
        mapRef.current.off("zoom", onMapMove);
      }
    };
  }, [hoveredVenue, venues]);

  return (
    <div className="w-full h-screen relative">
      <Map
        ref={mapRef}
        initialViewState={{
          longitude: 19.0402,
          latitude: 47.4979,
          zoom: 12,
        }}
        style={{ width: "100%", height: "100%", position: "relative" }}
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
              className={`relative w-[56px] h-[56px] flex items-center justify-center rounded-[16px] ${
                selectedVenue && selectedVenue.id === venue.id
                  ? "bg-black ring-2 ring-green-500"
                  : "bg-black"
              }`}
              onMouseEnter={(e) => handleMouseEnter(e, venue)}
              onMouseLeave={() => setHoveredVenue(null)}
              onClick={() => handleClick(venue)}
              style={{
                zIndex:
                  selectedVenue && selectedVenue.id === venue.id
                    ? 9999
                    : hoveredVenue === venue.id
                    ? 9998
                    : 1,
              }}
            >
              <Icon
                src={
                  IconMapping[venue.type] ||
                  "/icons/cafeTypes/cafeType_cafe.svg"
                }
                alt="VenueIcon"
                className="w-[24px] h-[24px] z-10"
              />
            </div>
          </Marker>
        ))}
      </Map>

      {hoveredVenue !== null &&
        createPortal(
          <div
            className="absolute z-50 pointer-events-none"
            style={{
              top: hoverPosition.top - 220,
              left: hoverPosition.left - -300,
            }}
          >
            <ListItem venueId={hoveredVenue} map={true} />
          </div>,
          document.body
        )}
    </div>
  );
};

export default MyMap;
