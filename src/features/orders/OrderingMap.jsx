import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  Circle,
  useMapEvents,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useSelector } from "react-redux";
import {
  useGetDeliveryZonesQuery,
  selectAllDeliveryZones,
} from "../landingPage/deliveryZonesApiSlice";

// Utility function to calculate distance between two points (Haversine formula)
const calculateDistance = ([lat1, lon1], [lat2, lon2]) => {
  const R = 6371; // Radius of Earth in kilometers
  const toRad = (value) => (value * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in kilometers
};

const MapEffect = ({ center }) => {
  const map = useMap();

  useEffect(() => {
    if (map) {
      map.flyTo(center, 18, {
        animate: true,
        duration: 5,
      });
    }
  }, [center, map]);

  return null;
};

const MapClickHandler = ({ setPosition, activeField }) => {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;

      if (activeField === "pickup") {
        setPosition((prev) => ({ ...prev, pickup: [lat, lng] }));
      } else if (activeField === "dropoff") {
        setPosition((prev) => ({ ...prev, dropoff: [lat, lng] }));
      }
    },
  });

  return null;
};

const OrderingMap = ({ onSubmit }) => {
  const [positions, setPositions] = useState({
    pickup: null,
    dropoff: null,
  });
  const [activeField, setActiveField] = useState("pickup"); // "pickup" or "dropoff"
  const [distance, setDistance] = useState(null);

  // Fetch delivery zones
  const { data: zones, isLoading, isError, error } = useGetDeliveryZonesQuery();
  const deliveryZones = useSelector(selectAllDeliveryZones) || []; // Fallback to empty array

  useEffect(() => {
    if (positions.pickup && positions.dropoff) {
      const dist = calculateDistance(positions.pickup, positions.dropoff);
      setDistance(dist.toFixed(2)); // Distance in kilometers, rounded to 2 decimal places
    }
  }, [positions]);

  if (isLoading) return <p>Loading delivery zones...</p>;
  if (isError) return <p>Error loading zones: {error.message}</p>;

  return (
    <div className="space-y-6">
      {/* Input Fields */}
      <div className="space-y-4">
        <div className="flex justify-between">
          <label className="block">
            <span className="text-gray-700">Pickup Location</span>
            <input
              type="text"
              className="mt-1 block w-full rounded-lg border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              readOnly
              value={
                positions.pickup
                  ? `Latitude: ${positions.pickup[0]}, Longitude: ${positions.pickup[1]}`
                  : "Click on the map to select"
              }
              onFocus={() => setActiveField("pickup")}
            />
          </label>
          <div>
            <button
              onClick={() => onSubmit(positions)}
              className="mt-4 rounded-md bg-green-500 px-4 py-2 text-white"
            >
              Submit Locations
            </button>
          </div>
          <label className="block">
            <span className="text-gray-700">Drop-Off Location</span>
            <input
              type="text"
              className="mt-1 block w-full rounded-lg border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              readOnly
              value={
                positions.dropoff
                  ? `Latitude: ${positions.dropoff[0]}, Longitude: ${positions.dropoff[1]}`
                  : "Click on the map to select"
              }
              onFocus={() => setActiveField("dropoff")}
            />
          </label>
        </div>

        {distance && (
          <p className="text-black">
            Distance: <strong>{distance} km</strong>
          </p>
        )}
      </div>

      {/* Map */}
      <div className="rounded-lg">
        <MapContainer
          className="h-60 w-full rounded-lg"
          center={[9.035837172515716, 38.752291674100675]} // Initial center
          zoom={13}
          style={{ height: "75vh", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">DDS</a> contributors - DDS'
          />
          {/* Delivery Zones */}
          {deliveryZones.map((zone) => (
            <Circle
              key={zone.id}
              center={zone.coordinates}
              radius={zone.radius}
              pathOptions={{
                color: "blue",
                fillColor: "blue",
                fillOpacity: 0.3,
              }}
              eventHandlers={{
                click: (e) => {
                  // Prevent the Circle from stopping event propagation
                  e.originalEvent.stopPropagation();
                },
              }}
            ></Circle>
          ))}

          {/* Markers */}
          {positions.pickup && (
            <Marker position={positions.pickup}>
              <Popup>Pickup Location</Popup>
            </Marker>
          )}
          {positions.dropoff && (
            <Marker position={positions.dropoff}>
              <Popup>Drop-Off Location</Popup>
            </Marker>
          )}
          {/* Line between Pickup and Drop-Off */}
          {positions.pickup && positions.dropoff && (
            <Polyline
              positions={[positions.pickup, positions.dropoff]}
              color="blue"
            >
              <Popup>Distance: {distance} km</Popup>
            </Polyline>
          )}
          <MapEffect
            center={
              positions?.dropoff ||
              positions?.pickup || [9.035837172515716, 38.752291674100675]
            }
          />
          <MapClickHandler
            setPosition={setPositions}
            activeField={activeField}
          />
        </MapContainer>
      </div>
    </div>
  );
};

export default OrderingMap;
