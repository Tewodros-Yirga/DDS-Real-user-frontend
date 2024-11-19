import { Outlet } from "react-router-dom";
import DashHeader from "./DashHeader";
import DashFooter from "./DashFooter";

const DashLayout = () => {
  return (
    <>
      <DashHeader />
      <div className="overflow-hidden pt-[4.75rem] lg:pt-[5.25rem]">
        <Outlet />
      </div>
      <DashFooter />
    </>
  );
};
export default DashLayout;
