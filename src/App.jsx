import { Routes, Route, BrowserRouter } from "react-router-dom";
import DashLayout from "./components/DashLayout"; // Includes DashHeader and DashFooter
import Hero from "./features/auth/Hero";
import OrderPlacement from "./features/orders/OrderPlacement";
import ContactUs from "./features/ContactUs";
import EditProfile from "./features/users/EditProfile";
import OrderHistory from "./features/orders/OrderHistory";
import OrderTracking from "./features/orders/OrderTracking";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<DashLayout />}>
          <Route index element={<Hero />} />

          {/* Authenticated Routes */}
          <Route path="order-placement" element={<OrderPlacement />} />
          <Route path="contact-us" element={<ContactUs />} />
          <Route path="edit-profile" element={<EditProfile />} />
          <Route path="order-history" element={<OrderHistory />} />
          <Route path="order-tracking" element={<OrderTracking />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// import { Routes, Route } from "react-router-dom";
// import Layout from "./components/Layout";
// import Login from "./features/auth/Login";
// import DashLayout from "./components/DashLayout";
// import Welcome from "./features/auth/Welcome";
// import NotesList from "./features/notes/NotesList";
// import UsersList from "./features/users/UsersList";
// import { BrowserRouter } from "react-router-dom";
// import Public from './components/Public'

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Layout />}>
//           <Route index element={<Public />} />
//           <Route path="login" element={<Login />} />

//           <Route path="dash" element={<DashLayout />}>
//             <Route index element={<Welcome />} />

//             <Route path="notes">
//               <Route index element={<NotesList />} />
//             </Route>

//             <Route path="users">
//               <Route index element={<UsersList />} />
//             </Route>
//           </Route>
//           {/* End Dash */}
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
