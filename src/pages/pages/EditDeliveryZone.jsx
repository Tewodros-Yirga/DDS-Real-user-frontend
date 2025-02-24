import React, { useState, useEffect } from "react";
import { Button, Select, Modal } from "antd";
import MapModal from "./MapModal";
import { useUpdateDeliveryZoneMutation } from "../../features/landingPage/deliveryZonesApiSlice";
import { useGetUsersQuery } from "../../features/users/usersApiSlice";
import { useGetQuadcoptersQuery } from "../quadcopter/quadcoptersApiSlice";

const EditDeliveryZoneForm = ({ deliveryZone, onCloseModal }) => {
  const [updateDeliveryZone, { isLoading, isError, error }] =
    useUpdateDeliveryZoneMutation();
  const [formData, setFormData] = useState({
    id: deliveryZone._id,
    zoneName: deliveryZone.zoneName,
    radius: deliveryZone.radius,
    active: deliveryZone.active,
    assignedPilots: deliveryZone.assignedPilots || [],
    assignedQuadcopters: deliveryZone.assignedQuadcopters || [],
    coordinates: deliveryZone.coordinates || null,
  });

  const [isMapModalVisible, setIsMapModalVisible] = useState(false);
  const [errors, setErrors] = useState({});

  // Fetch pilots
  const { data: users = [], isLoading: isLoadingPilots } = useGetUsersQuery(
    undefined,
    {
      pollingInterval: 15000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    },
  );
  const usersArray = users?.ids?.map((id) => users.entities[id]) || [];
  const pilots = usersArray?.filter((user) => user.roles.includes("Pilot"));

  // Fetch quadcopters
  const { data: quadcopters = [], isLoading: isLoadingQuadcopters } =
    useGetQuadcoptersQuery(undefined, {
      pollingInterval: 15000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    });
  const quadcoptersArray =
    quadcopters?.ids?.map((id) => quadcopters.entities[id]) || [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleLocationSelect = (location) => {
    setFormData({
      ...formData,
      coordinates: {
        type: "Point",
        coordinates: [location.lat, location.lng], // Correct order: [longitude, latitude]
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.zoneName) newErrors.zoneName = "Please enter the zone name";
    if (!formData.radius) newErrors.radius = "Please enter the radius";
    //if (!formData.coordinates)
    //newErrors.coordinates = "Please select a location";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    try {
      console.log("Submitting form data:", formData); // Debugging
      const response = await updateDeliveryZone(formData).unwrap();
      console.log("Update response:", response); // Debugging
      onCloseModal(); // Close the modal after successful update
    } catch (err) {
      console.error("Failed to update delivery zone:", err);
      // Display backend error message
      setErrors({
        backend: err.data?.message || "Failed to update delivery zone",
      });
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-md rounded-lg border p-4 shadow"
    >
      {/* Existing form fields */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Zone Name</label>
        <input
          type="text"
          name="zoneName"
          value={formData.zoneName}
          onChange={handleChange}
          className="w-full rounded border bg-white p-2"
        />
        {errors.zoneName && (
          <p className="text-sm text-red-500">{errors.zoneName}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Radius</label>
        <input
          type="number"
          name="radius"
          value={formData.radius}
          onChange={handleChange}
          className="w-full rounded border bg-white p-2"
        />
        {errors.radius && (
          <p className="text-sm text-red-500">{errors.radius}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Active</label>
        <select
          name="active"
          value={formData.active}
          onChange={handleChange}
          className="w-full rounded border bg-white p-2"
        >
          <option value={true}>Active</option>
          <option value={false}>Inactive</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Assigned Pilots</label>
        <Select
          mode="multiple"
          placeholder="Select Pilots"
          value={formData.assignedPilots}
          onChange={(value) => handleSelectChange("assignedPilots", value)}
          loading={isLoadingPilots}
          className="w-full"
        >
          {pilots?.map((pilot) => (
            <Select.Option key={pilot._id} value={pilot._id}>
              {pilot.username}
            </Select.Option>
          ))}
        </Select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">
          Assigned Quadcopters
        </label>
        <Select
          mode="multiple"
          placeholder="Select Quadcopters"
          value={formData.assignedQuadcopters}
          onChange={(value) => handleSelectChange("assignedQuadcopters", value)}
          loading={isLoadingQuadcopters}
          className="w-full"
        >
          {quadcoptersArray?.map((quadcopter) => (
            <Select.Option key={quadcopter._id} value={quadcopter._id}>
              {quadcopter.name}
            </Select.Option>
          ))}
        </Select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Location</label>
        <Button
          type="button"
          onClick={() => setIsMapModalVisible(true)}
          className="w-full"
        >
          Pick Location
        </Button>
        {formData.coordinates && (
          <p className="mt-2 text-sm">
            Selected Coordinates: {formData.coordinates.coordinates[1]},{" "}
            {formData.coordinates.coordinates[0]}
          </p>
        )}
        {errors.coordinates && (
          <p className="text-sm text-red-500">{errors.coordinates}</p>
        )}
      </div>
      <MapModal
        visible={isMapModalVisible}
        onClose={() => setIsMapModalVisible(false)}
        onSelectLocation={handleLocationSelect}
      />
      <button
        type="submit"
        className="w-full rounded bg-blue-600 p-2 text-white hover:bg-blue-700"
      >
        {isLoading ? "Updating..." : "Update Delivery Zone"}
      </button>
      {errors.backend && (
        <p className="mt-2 text-sm text-red-500">{errors.backend}</p>
      )}
    </form>
  );
};

export default EditDeliveryZoneForm;
