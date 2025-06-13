"use client";

import { useConfirm } from "@/hooks/use-confirm";
import { PlaceType } from "@/type/post.type";
import type { LatLngTuple } from "leaflet";
import { icon, latLng } from "leaflet";
import MarkerIcon from "leaflet/dist/images/marker-icon.png";
import "leaflet/dist/leaflet.css";
import { Dispatch, SetStateAction, useEffect } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";

const markerIcon = icon({
  iconUrl: typeof MarkerIcon === "string" ? MarkerIcon : MarkerIcon.src,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const position: LatLngTuple = [37.56675, 126.97842];

export default function AddressMap({
  setSelectPositions,
  selectPositions,
}: {
  setSelectPositions: Dispatch<SetStateAction<PlaceType[] | []>>;
  selectPositions: PlaceType[] | [];
}) {
  const [ConfirmDialog, confirm] = useConfirm(
    "정말로 방문장소를 삭제하시겠습니까?",
    ""
  );
  const JAWG_ACCESS_TOKEN = process.env.NEXT_PUBLIC_JAWG_ACCESS_TOKEN;

  async function handleDeleteMarker(placeId: number) {
    const ok = await confirm();
    if (ok) {
      setSelectPositions((prevItems) =>
        prevItems.filter((item) => item.place_id !== placeId)
      );
    }
  }
  return (
    <>
      <ConfirmDialog />
      <MapContainer
        center={position}
        zoom={15}
        className="size-full rounded-lg"
      >
        <TileLayer
          attribution='<a href="https://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={`https://tile.jawg.io/jawg-sunny/{z}/{x}/{y}{r}.png?access-token=${JAWG_ACCESS_TOKEN}`}
        />
        {selectPositions.map((position) => (
          <Marker
            key={position.place_id}
            position={[position.lat, position.lon]}
            icon={markerIcon}
            eventHandlers={{
              click: () => handleDeleteMarker(position.place_id),
            }}
          />
        ))}
        <ResetCenterView selectPositions={selectPositions} />
      </MapContainer>
    </>
  );
}

function ResetCenterView({
  selectPositions,
}: {
  selectPositions: PlaceType[] | [];
}) {
  const map = useMap();

  useEffect(() => {
    if (selectPositions.length === 1) {
      const pos = selectPositions[0];
      map.setView(latLng(pos.lat, pos.lon), map.getZoom(), { animate: true });
    } else if (selectPositions.length > 1) {
      const bounds: LatLngTuple[] = selectPositions.map(
        (pos) => [pos.lat, pos.lon] as LatLngTuple
      );
      map.fitBounds(bounds, { padding: [50, 50], animate: true });
    }
  }, [selectPositions, map]);

  return null;
}
