import { store } from "../../app/store";
import { ordersApiSlice } from "../orders/orderApiSlice";
import { deliveryZonesApiSlice } from "../landingPage/deliveryZonesApiSlice";
import { usersApiSlice } from "../users/usersApiSlice";
import { quadcoptersApiSlice } from "../../pages/quadcopter/quadcoptersApiSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Prefetch = () => {
  useEffect(() => {
    console.log("subscribing");
    const orders = store.dispatch(
      ordersApiSlice.endpoints.getAllOrders.initiate(),
    );
    const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate());
    const deliveryzones = store.dispatch(
      deliveryZonesApiSlice.endpoints.getDeliveryZones.initiate(),
    );
    const quadcopters = store.dispatch(
      quadcoptersApiSlice.endpoints.getQuadcopters.initiate(),
    );

    return () => {
      console.log("unsubscribing");
      orders.unsubscribe();
      users.unsubscribe();
      deliveryzones.unsubscribe();
      quadcopters.unsubscribe();
    };
  }, []);

  return <Outlet />;
};
export default Prefetch;
