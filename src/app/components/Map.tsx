"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import MarkerData from "./MapWrapper"

// Fix for Leaflet's default icons
const iconPrototype = L.Icon.Default.prototype as L.Icon & {
  _getIconUrl?: () => void;
};
delete iconPrototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface MapProps {
  markers: typeof MarkerData[];
}


const Map = ({ markers }: MapProps) => {
  return (
    <MapContainer
      center={markers[0]?.position} // Center the map on the first marker
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((marker, index) => (
        <Marker key={index} position={marker.position}>
          <Popup>Marker #{index + 1} - {marker.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;


