import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet"; // Ensure Leaflet icons work
import io from "socket.io-client";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png"; // Webpack handles the import
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

// Fix for missing Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

// Component to update the map view dynamically
const UpdateMapView = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
};

const Fly = () => {
  const [isCameraOn, setIsCameraOn] = useState(true); // State to toggle camera feed
  const [quadcopterStatus, setQuadcopterStatus] = useState("Idle"); // State for quadcopter status
  const [dronePosition, setDronePosition] = useState(null); // Current position
  const [dronePath, setDronePath] = useState([]); // History of positions
  const [gpsInfo, setGpsInfo] = useState({ time: "Unknown" }); // Date and time from GPS data

  // Function to handle takeoff
  const handleTakeoff = () => {
    setQuadcopterStatus("Taking Off...");
    setTimeout(() => {
      setQuadcopterStatus("In Flight");
    }, 2000); // Simulate takeoff delay
  };

  // Function to handle landing
  const handleLand = () => {
    setQuadcopterStatus("Landing...");
    setTimeout(() => {
      setQuadcopterStatus("Idle");
    }, 2000); // Simulate landing delay
  };

  // Listen for GPS data
  useEffect(() => {
    const socket = io("http://localhost:4500"); // Backend server address

    socket.on("gps-data", (data) => {
      console.log("Received GPS data:", data);

      if (data.latitude !== undefined && data.longitude !== undefined) {
        const newPosition = [data.latitude, data.longitude];

        setDronePosition(newPosition);
        setDronePath((prevPath) => [...prevPath, newPosition]);

        setGpsInfo({
          time: data.time || "Unknown", // Ensure time is not undefined
        });
      }
    });

    // Cleanup on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="flex h-screen">
      {/* Drone Controller Section */}
      <div className="w-1/2 p-6 bg-gray-50 custom-scrollbar" style={{ overflowY: "auto" }}>
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Quadcopter Control</h1>

        {/* Camera Feed Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-700">Live Camera Feed</h2>
            <button
              onClick={() => setIsCameraOn(!isCameraOn)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              {isCameraOn ? "Turn Off Camera" : "Turn On Camera"}
            </button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            {isCameraOn ? (
              <iframe
                src="http://192.168.43.53" // Replace with your ESP32-CAM IP address
                title="Quadcopter Camera Feed"
                width="100%"
                height="500px"
                style={{ border: "none", borderRadius: "8px" }}
                allowFullScreen
              />
            ) : (
              <div className="flex items-center justify-center h-64 bg-gray-200 rounded-lg">
                <p className="text-gray-500">Camera is turned off.</p>
              </div>
            )}
          </div>
        </div>

        {/* Quadcopter Controls Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Quadcopter Controls</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Takeoff Button */}
            <button
              onClick={handleTakeoff}
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
            >
              Takeoff
            </button>

            {/* Land Button */}
            <button
              onClick={handleLand}
              className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors"
            >
              Land
            </button>

            {/* Emergency Stop Button */}
            <button
              onClick={() => setQuadcopterStatus("Emergency Stopped")}
              className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition-colors"
            >
              Emergency Stop
            </button>

            {/* Reset Button */}
            <button
              onClick={() => setQuadcopterStatus("Idle")}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Quadcopter Status Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Quadcopter Status</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <p className="text-lg font-semibold text-gray-800">
              Current Status:{" "}
              <span
                className={`font-bold ${
                  quadcopterStatus === "Idle"
                    ? "text-gray-500"
                    : quadcopterStatus === "In Flight"
                    ? "text-green-500"
                    : quadcopterStatus === "Emergency Stopped"
                    ? "text-red-500"
                    : "text-yellow-500"
                }`}
              >
                {quadcopterStatus}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Drone Tracking Section */}
      <div className="w-1/2 p-6 bg-gray-50 custom-scrollbar" style={{ overflowY: "auto" }}>
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Drone Tracking</h1>

        {/* GPS Information Display */}
        <div className="w-full max-w-md rounded bg-gray-700 p-4 text-center shadow mb-4">
          <h2 className="text-lg font-bold">Drone GPS Information</h2>
          <p>
            <strong>Date:</strong> {gpsInfo.date}
          </p>
          <p>
            <strong>Time:</strong> {gpsInfo.time}
          </p>
          <p>
            <strong>Current Position:</strong> Lat: {dronePosition ? dronePosition[0] : "N/A"}, Lng:{" "}
            {dronePosition ? dronePosition[1] : "N/A"}
          </p>
        </div>

        {/* Map Display */}
        {dronePosition && (
          <MapContainer
            center={dronePosition}
            zoom={15}
            style={{ height: "500px", width: "100%" }}
            className="rounded shadow"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <UpdateMapView center={dronePosition} />
            <Marker position={dronePosition} />
            <Polyline positions={dronePath} color="blue" />
          </MapContainer>
        )}
      </div>
    </div>
  );
};

export default Fly;