import { type LatLngTuple } from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import LocationMarker from "./LocationMarker";
import { useTheme } from "../contexts/ThemeContext";

interface MapProps {
  position?: LatLngTuple;
  withMarker?: boolean;
  className?: string;
  editMode?: boolean;
}

const Map = ({
  position = [35.7219, 51.3347],
  withMarker = false,
  className,
  editMode,
}: MapProps) => {
  // const position: LatLngTuple = [35.7219, 51.3347];

  const { theme } = useTheme();

  const mapClassNames = className ?? "h-[560px] w-[600px] min-w-80 rounded-md";

  return (
    <div>
      {withMarker ? null : (
        <h2 className="pb-2 text-center font-bold">
          لطفاً لوکیشن دقیق ملک را روی نقشه مشخص کنید
        </h2>
      )}
      <MapContainer
        key={theme}
        className={mapClassNames}
        center={position}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          className={theme === "dark" ? "map-tiles" : ""}
        />
        {withMarker && !editMode ? (
          <Marker position={position}></Marker>
        ) : (
          <LocationMarker pos={position} />
        )}
      </MapContainer>
    </div>
  );
};

export default Map;
