import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaChartBar,
  FaUsers,
  FaBoxOpen,
  FaSignOutAlt,
  FaTable,
  FaRegCalendarAlt,
  FaQuestionCircle,
  FaChartPie,
} from "react-icons/fa";

const Sidebar = () => {
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
            alt="Admin"
            className="mx-auto mb-2 rounded-full"
            style={{ width: "70px", height: "70px" }}
          />
          <h3 className="text-md font-semibold">Admin Name</h3>
          <p className="text-xs text-gray-400">admin@example.com</p>
        </div>

        {/* Sidebar Content */}
        <nav className="custom-scrollbar flex-1 space-y-6 overflow-y-auto p-4">
          <SidebarSection title="Main">
            <SidebarLink to="/admin/dash" icon={<FaHome />} label="Dashboard" />
            <SidebarLink
              to="/admin/analytics"
              icon={<FaChartBar />}
              label="Analytics"
            />
          </SidebarSection>

          <SidebarSection title="Data">
            <SidebarLink
              to="/admin/users"
              icon={<FaUsers />}
              label="Manage Users"
            />
            <SidebarLink
              to="/admin/orders"
              icon={<FaBoxOpen />}
              label="Manage Orders"
            />
            <SidebarLink
              to="/admin/pilots"
              icon={<FaUsers />}
              label="Manage Pilots"
            />
            <SidebarLink
              to="/admin/quadcopters"
              icon={<FaBoxOpen />}
              label="Manage Quadcopters"
            />
            <SidebarLink
              to="/admin/delivery-zones"
              icon={<FaBoxOpen />}
              label="Manage Delivery Zones"
            />
          </SidebarSection>

          <SidebarSection title="Pages">
            <SidebarLink
              to="/admin/profile"
              icon={<FaTable />}
              label="Profile Form"
            />
            <SidebarLink
              to="/admin/calendar"
              icon={<FaRegCalendarAlt />}
              label="Calendar"
            />
            <SidebarLink
              to="/admin/faq"
              icon={<FaQuestionCircle />}
              label="FAQ Page"
            />
          </SidebarSection>

          <SidebarSection title="Charts">
            <SidebarLink
              to="/admin/bar-chart"
              icon={<FaChartBar />}
              label="Bar Chart"
            />
            <SidebarLink
              to="/admin/pie-chart"
              icon={<FaChartPie />}
              label="Pie Chart"
            />
            <SidebarLink
              to="/admin/line-chart"
              icon={<FaChartBar />}
              label="Line Chart"
            />
            <SidebarLink
              to="/admin/geo-chart"
              icon={<FaChartBar />}
              label="Geography Chart"
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

export default Sidebar;
