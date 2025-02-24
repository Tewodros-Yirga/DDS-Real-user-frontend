import { Routes, Route, BrowserRouter } from "react-router-dom";
import DashLayout from "./components/DashLayout"; // Includes DashHeader and DashFooter
import OrderPlacement from "./features/orders/OrderPlacement";
import ContactUs from "./features/ContactUs";
import EditProfile from "./features/users/EditProfile";
import OrderTracking from "./features/orders/OrderTracking";
import ButtonGradient from "./assets/svg/ButtonGradient";
import { LandingPage } from "./features/landingPage/LandingPage";
import { useNavigate } from "react-router-dom";
import OrderingMap from "./features/orders/OrderingMap";
import DroneTrackingMap from "./features/orders/DroneTrackingMap";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/main/Dashboard";
import Analytics from "./pages/main/Analytics";
import Orders from "./pages/pages/Orders";
import Pilots from "./pages/pages/Pilots";
import Quadcopters from "./pages/pages/Quadcopters";
import Users from "./pages/pages/Users";
import BarChartPage from "./pages/charts/BarChartPage";
import GeoChartPage from "./pages/charts/GeoChartPage";
import LineChartPage from "./pages/charts/LineChartPage";
import PieChartPage from "./pages/charts/PieChartPage";
import DeliveryZones from "./pages/pages/DeliveryZones";
import History from "./features/users/History";
import PilotSidebar from "./components/PilotSidebar";
import PilotDashboard from "./pilot/PilotDashboard";
import PilotOrders from "./pilot/PilotOrders";
import Quadcopter from "./pilot/Quadcopter";
import Fly from "./pilot/Fly";
import Prefetch from "./features/auth/Prefetch";
import PersistLogin from "./features/auth/PersistLogin";
import { ROLES } from "./config/roles";
import RequireAuth from "./features/auth/RequireAuth";

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6">
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="dash" element={<Dashboard />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="users" element={<Users />} />
          <Route path="orders" element={<Orders />} />
          <Route path="pilots" element={<Pilots />} />
          <Route path="quadcopters" element={<Quadcopters />} />
          <Route path="delivery-zones" element={<DeliveryZones />} />
          <Route path="bar-chart" element={<BarChartPage />} />
          <Route path="pie-chart" element={<PieChartPage />} />
          <Route path="line-chart" element={<LineChartPage />} />
          <Route path="geo-chart" element={<GeoChartPage />} />
        </Routes>
      </div>
    </div>
  );
};
const PilotLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <PilotSidebar />
      <div className="flex-1 p-6">
        <Routes>
          <Route index element={<PilotDashboard />} />
          <Route path="dashboard" element={<PilotDashboard />} />
          <Route path="orders" element={<PilotOrders />} />
          <Route path="quadcopter" element={<Quadcopter />} />
          <Route path="fly" element={<Fly />} />
          <Route path="trackdrone" element={<DroneTrackingMap />} />
        </Routes>
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}

        <Route path="/" element={<DashLayout />}>
          <Route element={<Prefetch />}>
            <Route element={<PersistLogin />}>
              <Route index element={<LandingPage />} />
              <Route element={<RequireAuth allowedRoles={[ROLES.Customer]} />}>
                {/* Authenticated Routes */}
                <Route path="order-placement" element={<OrderPlacement />} />
                <Route path="contact-us" element={<ContactUs />} />
                <Route path="edit-profile" element={<EditProfile />} />

                <Route path="history" element={<History />} />

                {/* <Route path="order-history" element={<OrderHistory />} /> */}
                {/* <Route path="order-tracking" element={<DroneTrackingMap />} /> */}
              </Route>
              {/* Admin routes */}
              <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                <Route path="/admin/*" element={<AdminLayout />} />
              </Route>
              {/* Pilot routes */}
              <Route element={<RequireAuth allowedRoles={[ROLES.Pilot]} />}>
                <Route path="/pilot/*" element={<PilotLayout />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>

      <ButtonGradient />
    </BrowserRouter>
  );
}

export default App;
