import React, { useState, useEffect } from "react";
import Section from "../../design/section";
import { useNavigate } from "react-router-dom";
import OrderingMap from "./OrderingMap";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../auth/authSlice";
import { useCreateOrderMutation } from "../orders/orderApiSlice";
import { useGetDeliveryZonesQuery } from "../landingPage/deliveryZonesApiSlice";

// Utility function to calculate distance between two points (Haversine formula)
const calculateDistance = ([lat1, lon1], [lat2, lon2]) => {
  const R = 6371; // Radius of Earth in kilometers
  const toRad = (value) => (value * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in kilometers
};

const OrderPlacement = () => {
  const currentUser = useSelector(selectCurrentUser);
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const {
    data: deliveryZones,
    isLoading: isZonesLoading,
    isError: isZonesError,
    error: zonesError,
  } = useGetDeliveryZonesQuery();
  const [formData, setFormData] = useState({
    items: [{ product: "", quantity: 1, price: 0 }],
    totalAmount: 0,
    pickupAddress: { type: "Point", coordinates: [0, 0] },
    dropoffAddress: { type: "Point", coordinates: [0, 0] },
    deliveryDate: "",
    paymentStatus: "Paid",
    deliveryZone: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [backendResponse, setBackendResponse] = useState(null); // New state for backend response

  const navigate = useNavigate();

  // Automatically calculate total amount whenever items change
  useEffect(() => {
    const total = formData.items.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0,
    );
    setFormData((prev) => ({ ...prev, totalAmount: total }));
  }, [formData.items]);

  // Automatically determine delivery zone when pickup or drop-off location changes
  useEffect(() => {
    if (
      formData.pickupAddress.coordinates[0] !== 0 &&
      formData.pickupAddress.coordinates[1] !== 0 &&
      deliveryZones
    ) {
      console.log("Pickup Coordinates:", formData.pickupAddress.coordinates);
      console.log("Delivery Zones:", deliveryZones);

      const deliveryZonesArray = Object.values(deliveryZones.entities); // Extract zones
      const pickupZone = determineDeliveryZone(
        formData.pickupAddress.coordinates,
        deliveryZonesArray,
      );
      const dropoffZone = determineDeliveryZone(
        formData.dropoffAddress.coordinates,
        deliveryZonesArray,
      );

      // Assign the pickup zone if available, otherwise assign the dropoff zone
      if (pickupZone) {
        setFormData((prev) => ({ ...prev, deliveryZone: pickupZone._id }));
      } else if (dropoffZone) {
        setFormData((prev) => ({ ...prev, deliveryZone: dropoffZone._id }));
      } else {
        setFormData((prev) => ({ ...prev, deliveryZone: "" }));
      }
    }
  }, [formData.pickupAddress, formData.dropoffAddress, deliveryZones]);

  // Utility function to determine the delivery zone for a given location
  const determineDeliveryZone = (coordinates, zones = []) => {
    if (!coordinates || !Array.isArray(coordinates)) {
      console.error("Invalid coordinates:", coordinates);
      return null;
    }

    for (const zone of zones) {
      if (!zone?.coordinates || typeof zone.coordinates !== "object") {
        console.error("Invalid zone coordinates:", zone.coordinates);
        continue;
      }

      // Convert zone coordinates object to array [lng, lat]
      const [zoneLng, zoneLat] = [zone.coordinates.lng, zone.coordinates.lat];

      // Convert pickup/dropoff coordinates to array [lng, lat]
      const [lng, lat] = coordinates;

      const distance = calculateDistance([lat, lng], [zoneLat, zoneLng]);
      if (distance <= zone.radius / 1000) {
        // Convert radius to kilometers
        return zone;
      }
    }
    return null; // No matching zone found
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const updatedItems = [...formData.items];
    updatedItems[index][name] =
      name === "quantity" || name === "price" ? +value : value;
    setFormData({ ...formData, items: updatedItems });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { product: "", quantity: 1, price: 0 }],
    });
  };

  const validateForm = () => {
    const validationErrors = {};
    if (!currentUser?.id) validationErrors.customer = "User not logged in.";
    if (
      formData.items.length === 0 ||
      !formData.items.every((item) => item.product)
    ) {
      validationErrors.items =
        "At least one item with a product name is required.";
    }
    if (!formData.deliveryDate)
      validationErrors.deliveryDate = "Delivery date is required.";
    const deliveryDate = new Date(formData.deliveryDate);
    const currentTime = new Date();
    const maxDeliveryTime = new Date(
      currentTime.getTime() + 48 * 60 * 60 * 1000,
    );
    if (deliveryDate < currentTime || deliveryDate > maxDeliveryTime) {
      validationErrors.deliveryDate =
        "Delivery date must be within the next 48 hours.";
    }
    if (
      !formData.pickupAddress.coordinates.length ||
      !formData.dropoffAddress.coordinates.length
    ) {
      validationErrors.deliveryAddress =
        "Pickup and drop-off address coordinates are required.";
    }
    if (formData.paymentStatus !== "Paid") {
      validationErrors.paymentStatus = "Payment status must be 'Paid'.";
    }
    if (!formData.deliveryZone) {
      validationErrors.deliveryZone =
        "No matching delivery zone found for the selected locations.";
    }
    setErrors(validationErrors);
    console.log("Validation Errors:", validationErrors); // Add this line
    return Object.keys(validationErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("button clicked");
    if (!validateForm()) return;

    try {
      const orderData = {
        ...formData,
        customer: currentUser.id, // Add the logged-in user's ID
      };

      const response = await createOrder(orderData).unwrap(); // Use the mutation
      setMessage("Order placed successfully!");
      setBackendResponse(response); // Store the backend response
      setFormData({
        items: [{ product: "", quantity: 1, price: 0 }],
        totalAmount: 0,
        pickupAddress: { type: "Point", coordinates: [0, 0] },
        dropoffAddress: { type: "Point", coordinates: [0, 0] },
        deliveryDate: "",
        paymentStatus: "Paid",
        deliveryZone: "",
      });
    } catch (error) {
      setErrors({ form: error.data?.message || "Order placement failed." });
      setBackendResponse(error.data); // Store the backend error response
    }
  };

  const handleMapSubmit = (locations) => {
    setFormData((prev) => ({
      ...prev,
      pickupAddress: {
        type: "Point",
        coordinates: [locations.pickup.lng, locations.pickup.lat],
      },
      dropoffAddress: {
        type: "Point",
        coordinates: [locations.dropoff.lng, locations.dropoff.lat],
      },
    }));
    setIsMapOpen(false);
  };

  return (
    <Section>
      <div className="mx-auto max-w-4xl rounded-lg bg-gradient-to-r from-gray-50 to-gray-200 p-6 shadow-md">
        <h2 className="mb-6 text-center text-3xl font-semibold text-blue-600">
          Place an Order
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Order Items */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Order Items
            </label>
            {formData.items.map((item, index) => (
              <div key={index} className="mb-2 flex space-x-4">
                <input
                  type="text"
                  name="product"
                  placeholder="Product Name"
                  value={item.product}
                  onChange={(e) => handleItemChange(index, e)}
                  className="block w-full rounded-md border-gray-300 shadow-sm"
                />
                <input
                  type="number"
                  name="quantity"
                  placeholder="Quantity"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, e)}
                  className="block w-24 rounded-md border-gray-300 shadow-sm"
                />
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={item.price}
                  onChange={(e) => handleItemChange(index, e)}
                  className="block w-24 rounded-md border-gray-300 shadow-sm"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addItem}
              className="mt-2 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              Add Item
            </button>
            {errors.items && (
              <p className="text-sm text-red-500">{errors.items}</p>
            )}
          </div>

          {/* Total Amount */}
          <div className="text-lg font-semibold text-gray-700">
            Total Amount: ${formData.totalAmount.toFixed(2)}
          </div>

          {/* Delivery Date */}
          <div>
            <label
              htmlFor="deliveryDate"
              className="block text-sm font-medium text-gray-700"
            >
              Delivery Date
            </label>
            <input
              type="datetime-local"
              id="deliveryDate"
              name="deliveryDate"
              value={formData.deliveryDate}
              onChange={handleInputChange}
              className={`mt-1 block w-full rounded-md border ${
                errors.deliveryDate ? "border-red-500" : "border-gray-300"
              } shadow-sm`}
            />
            {errors.deliveryDate && (
              <p className="mt-1 text-sm text-red-500">{errors.deliveryDate}</p>
            )}
          </div>

          {/* Delivery Zone */}
          <div>
            <label
              htmlFor="deliveryZone"
              className="block text-sm font-medium text-gray-700"
            >
              Delivery Zone
            </label>
            <input
              type="text"
              id="deliveryZone"
              name="deliveryZone"
              value={formData.deliveryZone}
              readOnly
              className={`mt-1 block w-full rounded-md border ${
                errors.deliveryZone ? "border-red-500" : "border-gray-300"
              } shadow-sm`}
            />
            {errors.deliveryZone && (
              <p className="mt-1 text-sm text-red-500">{errors.deliveryZone}</p>
            )}
          </div>

          {/* Delivery Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Delivery Address
            </label>
            <button
              type="button"
              onClick={() => setIsMapOpen(true)}
              className="mt-2 rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
            >
              Set Pickup & Drop-Off
            </button>

            {formData.pickupAddress?.coordinates?.length > 0 && (
              <p className="mt-2 text-sm text-gray-600">
                <strong>Pickup:</strong>{" "}
                {formData.pickupAddress.coordinates.join(", ")}
              </p>
            )}
            {formData.dropoffAddress?.coordinates?.length > 0 && (
              <p className="mt-2 text-sm text-gray-600">
                <strong>Drop-Off:</strong>{" "}
                {formData.dropoffAddress.coordinates.join(", ")}
              </p>
            )}
            {errors.deliveryAddress && (
              <p className="text-sm text-red-500">{errors.deliveryAddress}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="mt-6 w-full rounded-md bg-blue-500 px-6 py-2 text-lg font-semibold text-white hover:bg-blue-600"
          >
            {isLoading ? "Placing Order..." : "Place Order"}
          </button>
        </form>

        {message && (
          <div className="mt-4 rounded-md bg-green-100 p-4 text-green-700">
            {message}
          </div>
        )}
        {errors.form && (
          <div className="mt-4 rounded-md bg-red-100 p-4 text-red-700">
            {errors.form}
          </div>
        )}

        {/* Backend Response */}
      </div>

      {/* Map Modal */}
      {isMapOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-[90%] max-w-3xl rounded-lg bg-white p-6">
            <OrderingMap onSubmit={handleMapSubmit} />
            <button
              onClick={() => setIsMapOpen(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-800"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </Section>
  );
};

export default OrderPlacement;
