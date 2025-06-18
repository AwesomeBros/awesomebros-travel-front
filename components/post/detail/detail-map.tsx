"use client";

import { PostType } from "@/type";
import type { LatLngTuple } from "leaflet";
import L, { icon } from "leaflet";
import MarkerIcon from "leaflet/dist/images/marker-icon.png";
import "leaflet/dist/leaflet.css";
import { MutableRefObject, useEffect, useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

const markerIcon = icon({
  iconUrl: typeof MarkerIcon === "string" ? MarkerIcon : MarkerIcon.src,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const position: LatLngTuple = [37.56675, 126.97842];

export default function DetailMap({ post }: { post: PostType }) {
  const markerRefs = useRef<(L.Marker | null)[]>([]);

  useEffect(() => {
    return () => {
      markerRefs.current = [];
    };
  }, []);

  return (
    <MapContainer center={position} zoom={15} className="size-full rounded-lg">
      <TileLayer
        attribution='<a href="https://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url={`https://tile.jawg.io/jawg-sunny/{z}/{x}/{y}{r}.png?access-token=${process.env.NEXT_PUBLIC_JAWG_ACCESS_TOKEN}`}
      />
      {post.location.map((loc, index) => (
        <Marker
          key={index}
          position={[loc.lat, loc.lng] as LatLngTuple}
          icon={markerIcon}
          ref={(marker) => {
            if (marker) {
              markerRefs.current[index] = marker;
            } else {
              markerRefs.current[index] = null;
            }
          }}
        >
          <Popup autoClose={false} closeOnClick={false} closeButton={false}>
            {loc.name}
          </Popup>
        </Marker>
      ))}
      <ResetCenterView post={post} markerRefs={markerRefs} />
    </MapContainer>
  );
}

function ResetCenterView({
  post,
  markerRefs,
}: {
  post: PostType;
  markerRefs: MutableRefObject<(L.Marker | null)[]>;
}) {
  const map = useMap();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (post.location && post.location.length > 0) {
      if (post.location.length === 1) {
        map.setView(
          [post.location[0].lat, post.location[0].lng] as LatLngTuple,
          15
        );
      } else {
        const bounds: LatLngTuple[] = post.location.map(
          (pos) => [pos.lat, pos.lng] as LatLngTuple
        );
        map.fitBounds(bounds, {
          padding: [50, 50],
          maxZoom: 10,
          animate: true,
        });
      }

      if (markerRefs.current.length === post.location.length) {
        timer = setTimeout(() => {
          markerRefs.current.forEach((marker) => {
            if (marker) {
              const popup = marker.getPopup();
              if (popup) {
                marker.openPopup();
              }
            }
          });
        }, 50);
      }
    } else {
      map.setView(position, 15);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [post.location, map, markerRefs]);

  return null;
}
