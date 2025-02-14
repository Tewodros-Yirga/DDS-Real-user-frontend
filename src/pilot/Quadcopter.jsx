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
      className="p-6 bg-gray-50 custom-scrollbar dashboard-container"
      style={{ overflowY: "auto", height: "calc(100vh - 64px)" }} // Add this style
    >
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
  );
};

export default Quadcopter;