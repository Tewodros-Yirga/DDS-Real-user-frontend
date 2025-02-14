import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import DashHeader from "./DashHeader";
import DashFooter from "./DashFooter";
import DroneLoader from "./DroneLoader";

const DashLayout = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isPilotRoute = location.pathname.startsWith("/pilot");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Adjust loading time as needed

    return () => clearTimeout(timeout);
  }, [location.pathname]);

  if (isLoading) {
    return <DroneLoader />; // Show only loader before rendering anything else
  }

  return (
    <>
      {/* Show DashHeader only for non-admin and non-pilot routes */}
      {!isAdminRoute && !isPilotRoute && <DashHeader />}

      {/* Main Content */}
      <div
        className={`overflow-hidden ${
          !isAdminRoute && !isPilotRoute ? "pt-[4.75rem] lg:pt-[5.25rem]" : ""
        }`}
      >
        <Outlet />
      </div>

      {/* Show DashFooter only for non-admin and non-pilot routes */}
      {!isAdminRoute && !isPilotRoute && <DashFooter />}
    </>
  );
};

export default DashLayout;