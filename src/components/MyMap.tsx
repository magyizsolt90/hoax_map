// import React, { useRef, useEffect, useState } from "react";
// import Map, { NavigationControl, MapRef } from "react-map-gl";
// import { useStore } from "../context/store";
// import Icon from "./ui/Icon";
// import "mapbox-gl/dist/mapbox-gl.css";
// import ListItem from "./ListItem";
// import { createPortal } from "react-dom";
// import { IconMapping } from "./ListItem";

// const isLocal = process.env.NODE_ENV === "development";
// const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

// const MyMap = () => {
//   const { venues, selectedVenue, setSelectedVenue } = useStore();
//   const mapRef = useRef<MapRef | null>(null);
//   const [hoveredVenue, setHoveredVenue] = useState<number | null>(null);
//   const [hoverPosition, setHoverPosition] = useState({ top: 0, left: 0 });
//   const [markerPositions, setMarkerPositions] = useState<{
//     [key: number]: { top: number; left: number };
//   }>({});

//   const mapStyleUrl = isLocal
//     ? "http://localhost:3001/mapbox"
//     : "mapbox://styles/mapbox/dark-v10";

//   // Fly to selected venue
//   useEffect(() => {
//     if (selectedVenue && mapRef.current) {
//       mapRef.current.flyTo({
//         center: [selectedVenue.lon, selectedVenue.lat],
//         zoom: 15,
//         essential: true,
//       });
//     }
//   }, [selectedVenue]);

//   const updateMarkerPositions = () => {
//     if (mapRef.current) {
//       const newPositions: { [key: number]: { top: number; left: number } } = {};
//       venues.forEach((venue) => {
//         const { x, y } = mapRef.current?.project([venue.lon, venue.lat]) || {
//           x: 0,
//           y: 0,
//         }; // Optional chaining
//         newPositions[venue.id] = { top: y, left: x };
//       });
//       setMarkerPositions(newPositions);
//     }
//   };

//   useEffect(() => {
//     const onMapMove = () => {
//       if (mapRef.current) {
//         updateMarkerPositions();
//       }
//     };

//     mapRef.current?.on("move", onMapMove); // Optional chaining
//     mapRef.current?.on("zoom", onMapMove); // Optional chaining

//     // Initial update
//     updateMarkerPositions();

//     return () => {
//       mapRef.current?.off("move", onMapMove); // Optional chaining
//       mapRef.current?.off("zoom", onMapMove); // Optional chaining
//     };
//   }, [venues]);

//   const handleMouseEnter = (venue: any) => {
//     updateHoverPosition(venue.lon, venue.lat);
//     setHoveredVenue(venue.id);
//   };

//   const handleClick = (venue: any) => {
//     setSelectedVenue(venue);
//   };

//   const updateHoverPosition = (longitude: number, latitude: number) => {
//     if (mapRef.current) {
//       const { x, y } = mapRef.current.project([longitude, latitude]);
//       setHoverPosition({ top: y, left: x });
//     }
//   };

//   return (
//     <div className="w-full h-screen relative">
//       <Map
//         ref={mapRef}
//         initialViewState={{
//           longitude: 19.0402,
//           latitude: 47.4979,
//           zoom: 12,
//         }}
//         style={{ width: "100%", height: "100%", position: "relative" }}
//         mapStyle={mapStyleUrl}
//         mapboxAccessToken={MAPBOX_TOKEN}
//       >
//         <NavigationControl position="top-left" />

//         {/* Render Markers manually */}
//         {venues.map((venue) => (
//           <div
//             key={venue.id}
//             className={`absolute cursor-pointer w-[56px] h-[56px] flex items-center justify-center rounded-[16px] transition-transform ${
//               selectedVenue && selectedVenue.id === venue.id
//                 ? "bg-black ring-2 ring-green-500"
//                 : "bg-black"
//             }`}
//             onMouseEnter={() => handleMouseEnter(venue)}
//             onMouseLeave={() => setHoveredVenue(null)}
//             onClick={() => handleClick(venue)}
//             style={{
//               top: markerPositions[venue.id]?.top - 28 || 0, // Offset for marker height
//               left: markerPositions[venue.id]?.left - 28 || 0, // Offset for marker width
//               zIndex:
//                 selectedVenue && selectedVenue.id === venue.id
//                   ? 9999 // Ensure the selected marker is always on top
//                   : hoveredVenue === venue.id
//                   ? 9998 // Ensure hover marker is just below selected
//                   : 1,
//             }}
//           >
//             <Icon
//               src={
//                 IconMapping[venue.type] || "/icons/cafeTypes/cafeType_cafe.svg"
//               }
//               alt="VenueIcon"
//               className="w-[24px] h-[24px] z-10 "
//             />
//           </div>
//         ))}
//       </Map>

//       {hoveredVenue !== null &&
//         createPortal(
//           <div
//             className="absolute z-50 pointer-events-none"
//             style={{
//               top: hoverPosition.top - 170,
//               left: hoverPosition.left - -300,
//             }}
//           >
//             <ListItem venueId={hoveredVenue} map={true} />
//           </div>,
//           document.body
//         )}
//     </div>
//   );
// };

// export default MyMap;

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

  // When a marker is clicked, fly to the venue
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

  // Update the hover popup position when the map moves or zooms
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
                    ? 9999 // Legfelső rétegbe tesszük a kiválasztott markert
                    : hoveredVenue === venue.id
                    ? 9998 // A hoverelt marker is kiemelkedik, de alatta van a kiválasztottnak
                    : 1, // Alapértelmezett z-index
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
