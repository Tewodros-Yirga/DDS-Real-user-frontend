import React, { useState, useEffect } from "react";
import Section from "../../design/section";
import { useNavigate } from "react-router-dom";
import OrderingMap from "./OrderingMap";

const OrderPlacement = () => {
  const [formData, setFormData] = useState({
    customer: "", // Manually input for now, replace with dynamic user ID after authentication
    items: [{ name: "", quantity: 1, price: 0 }],
    totalAmount: 0,
    pickupAddress: { coordinates: [0, 0] },
    dropoffAddress: { coordinates: [0, 0] },
    deliveryDate: "",
    paymentStatus: "Paid",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [isMapOpen, setIsMapOpen] = useState(false);

  const navigate = useNavigate();

  // Automatically calculate total amount whenever items change
  useEffect(() => {
    const total = formData.items.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0,
    );
    setFormData((prev) => ({ ...prev, totalAmount: total }));
  }, [formData.items]);

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
      items: [...formData.items, { name: "", quantity: 1, price: 0 }],
    });
  };

  const validateForm = () => {
    const validationErrors = {};
    if (!formData.customer)
      validationErrors.customer = "Customer ID is required.";
    if (
      formData.items.length === 0 ||
      !formData.items.every((item) => item.name)
    ) {
      validationErrors.items = "At least one item with a name is required.";
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
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        setFormData({
          customer: "",
          items: [{ name: "", quantity: 1, price: 0 }],
          totalAmount: 0,
          pickupAddress: { coordinates: [0, 0] },
          dropoffAddress: { coordinates: [0, 0] },
          deliveryDate: "",
          paymentStatus: "Paid",
        });
      } else {
        setErrors({ form: data.message || "Order placement failed." });
      }
    } catch (error) {
      setErrors({ form: "An error occurred while placing the order." });
    }
  };

  const handleMapSubmit = (locations) => {
    setFormData((prev) => ({
      ...prev,
      pickupAddress: locations.pickup,
      dropoffAddress: locations.dropoff,
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
          {/* Customer ID */}
          <div>
            <label
              htmlFor="customer"
              className="block text-sm font-medium text-gray-700"
            >
              Customer ID
            </label>
            <input
              type="text"
              id="customer"
              name="customer"
              value={formData.customer}
              onChange={handleInputChange}
              className={`mt-1 block w-full rounded-md border ${
                errors.customer ? "border-red-500" : "border-gray-300"
              } shadow-sm`}
            />
            {errors.customer && (
              <p className="mt-1 text-sm text-red-500">{errors.customer}</p>
            )}
          </div>

          {/* Order Items */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Order Items
            </label>
            {formData.items.map((item, index) => (
              <div key={index} className="mb-2 flex space-x-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Item Name"
                  value={item.name}
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
            className="mt-6 w-full rounded-md bg-blue-500 px-6 py-2 text-lg font-semibold text-white hover:bg-blue-600"
          >
            Place Order
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
