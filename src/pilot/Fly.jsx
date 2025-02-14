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
import DroneTrackingMap from "../features/orders/DroneTrackingMap";

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
      <div
        className="custom-scrollbar w-1/2 bg-gray-50 p-6"
        style={{ overflowY: "auto" }}
      >
        <h1 className="mb-6 text-3xl font-bold text-gray-800">
          Quadcopter Control
        </h1>

        {/* Camera Feed Section */}
        <div className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-700">
              Live Camera Feed
            </h2>
            <button
              onClick={() => setIsCameraOn(!isCameraOn)}
              className="rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
            >
              {isCameraOn ? "Turn Off Camera" : "Turn On Camera"}
            </button>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-sm">
            {isCameraOn ? (
              <iframe
                src="http://192.168.43.187" // Replace with your ESP32-CAM IP address
                title="Quadcopter Camera Feed"
                width="100%"
                height="500px"
                style={{ border: "none", borderRadius: "8px" }}
                allowFullScreen
              />
            ) : (
              <div className="flex h-64 items-center justify-center rounded-lg bg-gray-200">
                <p className="text-gray-500">Camera is turned off.</p>
              </div>
            )}
          </div>
        </div>

        {/* Quadcopter Controls Section */}
        <div className="mb-8">
          <h2 className="mb-4 text-xl font-semibold text-gray-700">
            Quadcopter Controls
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Takeoff Button */}
            <button
              onClick={handleTakeoff}
              className="rounded-lg bg-green-500 px-6 py-3 text-white transition-colors hover:bg-green-600"
            >
              Takeoff
            </button>

            {/* Land Button */}
            <button
              onClick={handleLand}
              className="rounded-lg bg-red-500 px-6 py-3 text-white transition-colors hover:bg-red-600"
            >
              Land
            </button>

            {/* Emergency Stop Button */}
            <button
              onClick={() => setQuadcopterStatus("Emergency Stopped")}
              className="rounded-lg bg-yellow-500 px-6 py-3 text-white transition-colors hover:bg-yellow-600"
            >
              Emergency Stop
            </button>

            {/* Reset Button */}
            <button
              onClick={() => setQuadcopterStatus("Idle")}
              className="rounded-lg bg-blue-500 px-6 py-3 text-white transition-colors hover:bg-blue-600"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Quadcopter Status Section */}
        <div>
          <h2 className="mb-4 text-xl font-semibold text-gray-700">
            Quadcopter Status
          </h2>
          <div className="rounded-lg bg-white p-6 shadow-sm">
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
      <div
        className="custom-scrollbar w-1/2 bg-gray-50 p-6"
        style={{ overflowY: "auto" }}
      >
        <h1 className="mb-6 text-3xl font-bold text-gray-800">
          Drone Tracking
        </h1>
        <DroneTrackingMap />
      </div>
    </div>
  );
};

export default Fly;
