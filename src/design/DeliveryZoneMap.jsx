import { useEffect } from "react";
import { MapContainer, TileLayer, Circle, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapEffect = ({ center }) => {
  const map = useMap();

  useEffect(() => {
    if (center && center.lat !== undefined && center.lng !== undefined) {
      map.flyTo(center, 14, {
        animate: true,
        duration: 5,
      });
    } else {
      console.warn("Invalid center provided to MapEffect:", center);
    }
  }, [center, map]);

  return null;
};

const DeliveryZonesMap = ({
  centers,
  mapCenter = { lat: 9.035837172515716, lng: 38.752291674100675 },
  isLoading,
}) => {
  const validatedCenters = centers.filter(
    (center) =>
      center.coordinates &&
      center.coordinates.lat !== undefined &&
      center.coordinates.lng !== undefined &&
      center.radius !== undefined,
  );

  const validatedMapCenter =
    mapCenter?.lat !== undefined && mapCenter?.lng !== undefined
      ? mapCenter
      : { lat: 9.035837172515716, lng: 38.752291674100675 }; // fallback center

  return (
    <div className="relative rounded-lg">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 opacity-75">
          Loading...
        </div>
      )}
      <MapContainer
        className="h-[480px] w-full rounded-lg"
        center={validatedMapCenter}
        zoom={18}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">DDS</a> contributors - DDS'
        />
        {validatedCenters.map((center, index) => (
          <Circle
            key={index}
            center={center.coordinates}
            radius={center.radius}
            color="#ac6aff"
          />
        ))}
        <MapEffect center={validatedMapCenter} />
      </MapContainer>
    </div>
  );
};

export default DeliveryZonesMap;
