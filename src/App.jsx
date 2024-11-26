import { Routes, Route, BrowserRouter } from "react-router-dom";
import DashLayout from "./components/DashLayout"; // Includes DashHeader and DashFooter
import OrderPlacement from "./features/orders/OrderPlacement";
import ContactUs from "./features/ContactUs";
import EditProfile from "./features/users/EditProfile";
import OrderHistory from "./features/orders/OrderHistory";
import OrderTracking from "./features/orders/OrderTracking";
import ButtonGradient from "./assets/svg/ButtonGradient";
import { LandingPage } from "./features/landingPage/LandingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<DashLayout />}>
          <Route index element={<LandingPage />} />

          {/* Authenticated Routes */}
          <Route path="order-placement" element={<OrderPlacement />} />
          <Route path="contact-us" element={<ContactUs />} />
          <Route path="edit-profile" element={<EditProfile />} />
          <Route path="order-history" element={<OrderHistory />} />
          <Route path="order-tracking" element={<OrderTracking />} />
        </Route>
      </Routes>
      <ButtonGradient />
    </BrowserRouter>
  );
}

export default App;

// git branching  
