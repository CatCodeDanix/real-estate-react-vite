import { SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import { type LatLngTuple, type LatLng } from "leaflet";
import { useMapEvents } from "react-leaflet";
import { Marker } from "react-leaflet";

const LocationMarker = ({ pos = null }: { pos: LatLngTuple | null }) => {
  const [position, setPosition] = useState(pos);

  const navigate = useNavigate();

  useMapEvents({
    click(e: {
      latlng: LatLng | (SetStateAction<null> & { lat: number; lng: number });
    }) {
      setPosition(e.latlng as unknown as LatLngTuple);
      navigate(`?lat=${e?.latlng?.lat}&lng=${e?.latlng?.lng}`);
    },
  });

  return position === null ? null : <Marker position={position}></Marker>;
};

export default LocationMarker;
