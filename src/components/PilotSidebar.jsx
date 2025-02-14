import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaBoxOpen,
  FaSignOutAlt,
  FaQuestionCircle,
  FaChartPie,
  FaMapMarkerAlt,
  FaPaperPlane, // Import the FaPaperPlane icon
} from "react-icons/fa";

const PilotSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className={`fixed left-4 top-4 z-50 rounded-full p-2 md:hidden ${
          isOpen ? "bg-red-500 text-white" : "bg-gray-800 text-white"
        }`}
        onClick={toggleSidebar}
      >
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 flex h-full w-64 transform flex-col bg-gray-800 text-white transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0`}
      >
        {/* Sidebar Header */}
        <div className="border-b border-gray-700 p-4 text-center">
          <img
            src="https://via.placeholder.com/100"
            alt="Pilot"
            className="mx-auto mb-2 rounded-full"
            style={{ width: "70px", height: "70px" }}
          />
          <h3 className="text-md font-semibold">Pilot Name</h3>
          <p className="text-xs text-gray-400">pilot@example.com</p>
        </div>

        {/* Sidebar Content */}
        <nav className="custom-scrollbar flex-1 space-y-6 overflow-y-auto p-4">
          <SidebarSection title="Main">
            <SidebarLink
              to="/pilot/dashboard"
              icon={<FaHome />}
              label="Dashboard"
            />
            <SidebarLink
              to="/pilot/orders"
              icon={<FaBoxOpen />}
              label="Orders"
            />
            <SidebarLink
              to="/pilot/quadcopter"
              icon={<FaMapMarkerAlt />}
              label="Quadcopter"
            />
            <SidebarLink
              to="/pilot/trackdrone"
              icon={<FaChartPie />}
              label="Track Drone"
            />
            {/* Add the new Fly link here */}
            <SidebarLink
              to="/pilot/fly"
              icon={<FaPaperPlane />}
              label="Fly"
            />
          </SidebarSection>

          <SidebarSection title="Support">
            <SidebarLink
              to="/pilot/faq"
              icon={<FaQuestionCircle />}
              label="FAQ"
            />
          </SidebarSection>
        </nav>

        {/* Logout Button */}
        <div className="border-t border-gray-700 p-4">
          <button
            className="flex w-full items-center justify-center gap-2 rounded bg-red-500 p-2 text-white hover:bg-red-600"
            onClick={() => console.log("Logout clicked")}
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>

      {/* Background Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

const SidebarSection = ({ title, children }) => (
  <div>
    <h4 className="mb-2 text-xs font-bold text-gray-400">{title}</h4>
    <div className="space-y-2">{children}</div>
  </div>
);

const SidebarLink = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex transform items-center gap-4 rounded p-2 transition duration-300 ease-in-out ${
        isActive
          ? "bg-gray-700 hover:bg-gray-700"
          : "hover:scale-105 hover:bg-gray-700"
      }`
    }
  >
    {icon} <span>{label}</span>
  </NavLink>
);

export default PilotSidebar;