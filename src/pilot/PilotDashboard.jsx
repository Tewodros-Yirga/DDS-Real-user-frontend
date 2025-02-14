import React, { useState, useEffect } from "react";
import { FaBox, FaChartLine, FaBell, FaCloudSun, FaPlayCircle, FaPlane } from "react-icons/fa"; // Use FaPlane instead of FaDrone
import { MdOutlineAirplanemodeActive } from "react-icons/md"; // Valid icon for drone
import { Bar } from "react-chartjs-2";
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PilotDashboard = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [upcomingOrders, setUpcomingOrders] = useState([]);
  const [droneStatus, setDroneStatus] = useState({});
  const [deliveryStats, setDeliveryStats] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [assignedQuadcopters, setAssignedQuadcopters] = useState([]); // State for assigned quadcopters
  const [isLoading, setIsLoading] = useState(true);

  // Simulate data fetching
  useEffect(() => {
    setTimeout(() => {
      setUpcomingOrders([
        { id: 1, orderId: "ORD123", pickupPlace: "Warehouse A", destination: "123 Main St", status: "Pending" },
        { id: 2, orderId: "ORD124", pickupPlace: "Warehouse B", destination: "456 Elm St", status: "In Progress" },
      ]);
      setDroneStatus({
        battery: 85,
        speed: 25,
        altitude: 120,
        status: "In Transit",
      });
      setDeliveryStats({
        completed: 12,
        pending: 3,
        total: 15,
      });
      setNotifications([
        { id: 1, message: "New order assigned: ORD123" },
        { id: 2, message: "Drone battery low: 20% remaining" },
      ]);
      setAssignedQuadcopters([
        { id: "QC001", status: "Active", battery: 90 },
        { id: "QC002", status: "Inactive", battery: 45 },
        { id: "QC003", status: "Maintenance", battery: 10 },
      ]);
      setIsLoading(false);
    }, 1000); // Simulate 1-second loading delay
  }, []);

  // Chart data for delivery stats
  const chartData = {
    labels: ["Completed", "Pending"],
    datasets: [
      {
        label: "Deliveries",
        data: [deliveryStats.completed, deliveryStats.pending],
        backgroundColor: ["#4F46E5", "#F59E0B"],
        borderColor: ["#4F46E5", "#F59E0B"],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Delivery Statistics",
      },
    },
  };

  // Function to handle Check Weather button click
  const handleCheckWeather = () => {
    // Open a new tab with a Google search for "Google Weather"
    window.open("https://www.google.com/search?q=google+weather", "_blank");
  };

  // Function to handle Start Now button click
  const handleStartNow = () => {
    // Navigate to the /pilot/quadcopter route
    navigate("/pilot/quadcopter");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div
      className="p-6 bg-gray-100 custom-scrollbar dashboard-container"
      style={{ overflowY: "auto", height: "calc(100vh - 64px)" }} // Add this style
    >
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Pilot Dashboard</h1>

      {/* Quick Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Upcoming Orders Card */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-700">Upcoming Orders</h2>
            <FaBox className="text-2xl text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900 mt-4">{upcomingOrders.length}</p>
          <p className="text-sm text-gray-500">Orders to be delivered</p>
        </div>

        {/* Drone Status Card */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-700">Drone Status</h2>
            <MdOutlineAirplanemodeActive className="text-2xl text-green-500" /> {/* Updated icon */}
          </div>
          <p className="text-3xl font-bold text-gray-900 mt-4">{droneStatus.status}</p>
          <p className="text-sm text-gray-500">Battery: {droneStatus.battery}%</p>
        </div>

        {/* Delivery Stats Card */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-700">Delivery Stats</h2>
            <FaChartLine className="text-2xl text-purple-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900 mt-4">{deliveryStats.completed}</p>
          <p className="text-sm text-gray-500">Completed Deliveries</p>
        </div>

        {/* Notifications Card */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-700">Notifications</h2>
            <FaBell className="text-2xl text-yellow-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900 mt-4">{notifications.length}</p>
          <p className="text-sm text-gray-500">New Notifications</p>
        </div>
      </div>

      {/* Assigned Quadcopters Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Assigned Quadcopters</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {assignedQuadcopters.map((quadcopter) => (
            <div
              key={quadcopter.id}
              className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">
                  Quadcopter ID: {quadcopter.id}
                </h3>
                <FaPlane className="text-2xl text-blue-500" /> {/* Use FaPlane instead of FaDrone */}
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Status:{" "}
                <span
                  className={`font-bold ${
                    quadcopter.status === "Active"
                      ? "text-green-500"
                      : quadcopter.status === "Inactive"
                      ? "text-yellow-500"
                      : "text-red-500"
                  }`}
                >
                  {quadcopter.status}
                </span>
              </p>
              <p className="text-sm text-gray-600">
                Battery:{" "}
                <span
                  className={`font-bold ${
                    quadcopter.battery > 50
                      ? "text-green-500"
                      : quadcopter.battery > 20
                      ? "text-yellow-500"
                      : "text-red-500"
                  }`}
                >
                  {quadcopter.battery}%
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Orders Table */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Upcoming Orders</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white text-black">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left">Order ID</th>
                <th className="py-2 px-4 border-b text-left">Pickup Place</th>
                <th className="py-2 px-4 border-b text-left">Destination</th>
                <th className="py-2 px-4 border-b text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {upcomingOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-2 px-4 border-b">{order.orderId}</td>
                  <td className="py-2 px-4 border-b">{order.pickupPlace}</td>
                  <td className="py-2 px-4 border-b">{order.destination}</td>
                  <td className="py-2 px-4 border-b">
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delivery Statistics Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Delivery Statistics</h2>
        <div className="h-64">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Quick Actions Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Start Delivery Button */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-700">Start Delivery</h2>
            <FaPlayCircle className="text-2xl text-blue-500" />
          </div>
          <p className="text-sm text-gray-500 mt-2">Start a new delivery mission.</p>
          <button
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            onClick={handleStartNow} // Add onClick handler
          >
            Start Now
          </button>
        </div>

        {/* Check Weather Button */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-700">Check Weather</h2>
            <FaCloudSun className="text-2xl text-orange-500" />
          </div>
          <p className="text-sm text-gray-500 mt-2">Check weather conditions for delivery.</p>
          <button
            className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
            onClick={handleCheckWeather} // Add onClick handler
          >
            Check Weather
          </button>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Notifications</h2>
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <p className="text-sm text-gray-700">{notification.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PilotDashboard;