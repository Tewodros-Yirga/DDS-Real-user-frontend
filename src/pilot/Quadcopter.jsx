import React, { useState } from "react";

const Quadcopter = () => {
  const [isCameraOn, setIsCameraOn] = useState(true); // State to toggle camera feed
  const [quadcopterStatus, setQuadcopterStatus] = useState("Idle"); // State for quadcopter status

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

  return (
    <div
      className="custom-scrollbar dashboard-container bg-gray-50 p-6"
      style={{ overflowY: "auto", height: "calc(100vh - 64px)" }} // Add this style
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
  );
};

export default Quadcopter;
