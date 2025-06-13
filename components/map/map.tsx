"use client";

import { LatLngTuple, icon } from "leaflet";
import MarkerIcon from "leaflet/dist/images/marker-icon.png";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const Icon = icon({
  iconUrl: typeof MarkerIcon === "string" ? MarkerIcon : MarkerIcon.src,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const position: LatLngTuple = [37.56675, 126.97842];

const JAWG_ACCESS_TOKEN = process.env.NEXT_PUBLIC_JAWG_ACCESS_TOKEN;
export default function Map() {
  return (
    <MapContainer center={position} zoom={13} className="size-full">
      <TileLayer
        attribution='<a href="https://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url={`https://tile.jawg.io/jawg-sunny/{z}/{x}/{y}{r}.png?access-token=${JAWG_ACCESS_TOKEN}`}
      />
      <Marker position={position} icon={Icon}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}
