import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes, FaHome, FaChartBar, FaUsers, FaBoxOpen, FaSignOutAlt, FaTable, FaRegCalendarAlt, FaQuestionCircle, FaChartPie } from 'react-icons/fa';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className={`md:hidden fixed top-4 left-4 z-50 p-2 rounded-full ${
          isOpen ? 'bg-red-500 text-white' : 'bg-gray-800 text-white'
        }`}
        onClick={toggleSidebar}
      >
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`h-full bg-gray-800 text-white w-64 flex flex-col fixed top-0 left-0 z-40 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0`}
      >
        {/* Sidebar Header */}
        <div className="p-4 text-center border-b border-gray-700">
          <img
            src="https://via.placeholder.com/100"
            alt="Admin"
            className="rounded-full mx-auto mb-2"
            style={{ width: '70px', height: '70px' }}
          />
          <h3 className="font-semibold text-md">Admin Name</h3>
          <p className="text-xs text-gray-400">admin@example.com</p>
        </div>

        {/* Sidebar Content */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
          <SidebarSection title="Main">
            <SidebarLink to="/" icon={<FaHome />} label="Dashboard" />
            <SidebarLink to="/analytics" icon={<FaChartBar />} label="Analytics" />
          </SidebarSection>

          <SidebarSection title="Data">
            <SidebarLink to="/users" icon={<FaUsers />} label="Manage Users" />
            <SidebarLink to="/orders" icon={<FaBoxOpen />} label="Manage Orders" />
            <SidebarLink to="/pilots" icon={<FaUsers />} label="Manage Pilots" />
            <SidebarLink to="/quadcopters" icon={<FaBoxOpen />} label="Manage Quadcopters" />
          </SidebarSection>

          <SidebarSection title="Pages">
            <SidebarLink to="/profile" icon={<FaTable />} label="Profile Form" />
            <SidebarLink to="/calendar" icon={<FaRegCalendarAlt />} label="Calendar" />
            <SidebarLink to="/faq" icon={<FaQuestionCircle />} label="FAQ Page" />
          </SidebarSection>

          <SidebarSection title="Charts">
            <SidebarLink to="/bar-chart" icon={<FaChartBar />} label="Bar Chart" />
            <SidebarLink to="/pie-chart" icon={<FaChartPie />} label="Pie Chart" />
            <SidebarLink to="/line-chart" icon={<FaChartBar />} label="Line Chart" />
            <SidebarLink to="/geo-chart" icon={<FaChartBar />} label="Geography Chart" />
          </SidebarSection>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-700">
          <button
            className="w-full flex items-center justify-center gap-2 p-2 bg-red-500 hover:bg-red-600 rounded text-white"
            onClick={() => console.log('Logout clicked')}
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>

      {/* Background Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

const SidebarSection = ({ title, children }) => (
  <div>
    <h4 className="text-gray-400 font-bold text-xs mb-2">{title}</h4>
    <div className="space-y-2">{children}</div>
  </div>
);

const SidebarLink = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-4 p-2 rounded transition duration-300 ease-in-out transform ${
        isActive ? 'bg-gray-700 hover:bg-gray-700' : 'hover:bg-gray-700 hover:scale-105'
      }`
    }
  >
    {icon} <span>{label}</span>
  </NavLink>
);

export default Sidebar;
