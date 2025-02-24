import React, { useState } from "react";
import {
  Table,
  Card,
  Button,
  Space,
  Tag,
  Grid,
  Spin,
  Alert,
  Modal,
  Select,
} from "antd";
import {
  useGetDeliveryZonesQuery,
  useCreateDeliveryZoneMutation,
  useUpdateDeliveryZoneMutation,
  useDeleteDeliveryZoneMutation,
} from "../../features/landingPage/deliveryZonesApiSlice";
import { useGetUsersQuery } from "../../features/users/usersApiSlice";
import { useGetQuadcoptersQuery } from "../quadcopter/quadcoptersApiSlice";
import EditDeliveryZoneForm from "./EditDeliveryZone";
import MapModal from "./MapModal";

// DeliveryZoneForm component for adding a new delivery zone
const DeliveryZoneForm = ({ onCloseModal }) => {
  const [createDeliveryZone, { isLoading, isSuccess, isError, error }] =
    useCreateDeliveryZoneMutation();
  const [deleteDeliveryZone] = useDeleteDeliveryZoneMutation();
  const [formData, setFormData] = useState({
    zoneName: "",
    radius: "",
    active: false,
    assignedPilots: [],
    assignedQuadcopters: [],
    coordinates: null, // Add coordinates to formData
  });

  const [isMapModalVisible, setIsMapModalVisible] = useState(false); // State for map modal visibility

  const [errors, setErrors] = useState({});

  const handleLocationSelect = (location) => {
    setFormData({
      ...formData,
      coordinates: {
        type: "Point",
        coordinates: [location.lat, location.lng], // Correct order: [longitude, latitude]
      },
    });
  };
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
      pollingInterval: 60000,
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.zoneName) newErrors.zoneName = "Please enter the zone name";
    if (!formData.radius) newErrors.radius = "Please enter the radius";
    if (!formData.coordinates)
      newErrors.coordinates = "Please select a location";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    try {
      await createDeliveryZone({
        zoneName: formData.zoneName,
        radius: formData.radius,
        active: formData.active,
        assignedPilots: formData.assignedPilots,
        assignedQuadcopters: formData.assignedQuadcopters,
        coordinates: formData.coordinates, // Include coordinates
      });
    } catch (err) {
      console.error("Failed to register:", err);
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

      {/* Add the "Pick Location" button */}
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
      </div>

      {/* Render the MapModal */}
      <MapModal
        visible={isMapModalVisible}
        onClose={() => setIsMapModalVisible(false)}
        onSelectLocation={handleLocationSelect}
      />

      <button
        type="submit"
        className="w-full rounded bg-blue-600 p-2 text-white hover:bg-blue-700"
      >
        {isLoading ? "Adding..." : "Add Delivery Zone"}
      </button>
    </form>
  );
};
const DeliveryZones = () => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedDeliveryZone, setSelectedDeliveryZone] = useState(null);

  // Fetch delivery zones data using the API slice
  const {
    data: deliveryZones,
    isLoading,
    isError,
    error,
    refetch, // Add refetch to update the UI after deletion
  } = useGetDeliveryZonesQuery(undefined, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const [deleteDeliveryZone] = useDeleteDeliveryZoneMutation();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleOpenEditModal = (deliveryZone) => {
    setSelectedDeliveryZone(deliveryZone);
    setIsEditModalOpen(true);
  };
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedDeliveryZone(null);
  };
  // Handle delete action with confirmation
  const handleDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this delivery zone?",
      content: "This action cannot be undone.",
      okText: "Yes, delete it",
      okType: "danger",
      cancelText: "No, cancel",
      onOk: async () => {
        try {
          await deleteDeliveryZone({ id }).unwrap();
          refetch(); // Refetch the delivery zones data to update the UI
        } catch (err) {
          console.error("Failed to delete delivery zone:", err);
        }
      },
      onCancel: () => {
        console.log("Deletion canceled");
      },
    });
  };

  // Define table columns for delivery zones
  const columns = [
    {
      title: "Zone Name",
      dataIndex: "zoneName",
      key: "zoneName",
    },
    {
      title: "Radius",
      dataIndex: "radius",
      key: "radius",
    },
    {
      title: "Active",
      dataIndex: "active",
      key: "active",
      render: (active) => (
        <Tag color={active ? "green" : "red"}>
          {active ? "Active" : "Inactive"}
        </Tag>
      ),
    },
    {
      title: "Assigned Pilots",
      dataIndex: "assignedPilots",
      key: "assignedPilots",
      render: (assignedPilots) => (
        <Select
          mode="multiple"
          value={assignedPilots}
          disabled
          style={{ width: "100%" }}
          dropdownStyle={{ pointerEvents: "none" }} // Disable pointer events for the dropdown
        >
          {assignedPilots?.map((pilot) => (
            <Select.Option key={pilot} value={pilot}>
              {pilot}
            </Select.Option>
          ))}
        </Select>
      ),
    },
    {
      title: "Assigned Quadcopters",
      dataIndex: "assignedQuadcopters",
      key: "assignedQuadcopters",
      render: (assignedQuadcopters) => (
        <Select
          mode="multiple"
          value={assignedQuadcopters}
          disabled
          style={{ width: "100%" }}
          dropdownStyle={{ pointerEvents: "none" }} // Disable pointer events for the dropdown
        >
          {assignedQuadcopters?.map((quadcopter) => (
            <Select.Option key={quadcopter} value={quadcopter}>
              {quadcopter}
            </Select.Option>
          ))}
        </Select>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleOpenEditModal(record)}>
            Edit
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  // Transform API data to match the table structure
  const tableData = deliveryZones
    ? deliveryZones.ids.map((id) => {
        const zone = deliveryZones.entities[id];
        return {
          key: zone._id,
          id: zone._id,
          zoneName: zone.zoneName,
          radius: zone.radius,
          active: zone.active,
          assignedPilots: zone.assignedPilots || [],
          assignedQuadcopters: zone.assignedQuadcopters || [],
        };
      })
    : [];

  // Handle loading and error states
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4">
        <Alert
          message="Error"
          description={error.message || "Failed to fetch delivery zones"}
          type="error"
          showIcon
        />
      </div>
    );
  }

  return (
    <div
      className="bg-gray-100 p-4"
      style={{ overflowY: "auto", height: "calc(100vh - 64px)" }}
    >
      <Card
        title={
          <h2 className="text-lg font-bold text-gray-800">Delivery Zones</h2>
        }
        extra={
          <Button type="primary" onClick={handleOpenModal}>
            Add Delivery Zone
          </Button>
        }
        className="border shadow-sm"
      >
        {screens.md ? (
          // Render Table for Medium and Larger Screens
          <Table
            columns={columns}
            dataSource={tableData}
            rowKey="key"
            pagination={{
              pageSize: 5,
              showQuickJumper: true,
            }}
            bordered
          />
        ) : (
          // Render Card Layout for Small Screens
          <div className="space-y-4">
            {tableData.map((item) => (
              <Card
                key={item.key}
                bordered
                className="rounded-lg bg-white shadow-sm"
              >
                <p>
                  <strong>Zone Name:</strong> {item.zoneName}
                </p>
                <p>
                  <strong>Radius:</strong> {item.radius}
                </p>
                <p>
                  <strong>Active:</strong>{" "}
                  <Tag color={item.active ? "green" : "red"}>
                    {item.active ? "Active" : "Inactive"}
                  </Tag>
                </p>
                <p>
                  <strong>Assigned Pilots:</strong>{" "}
                  {item.assignedPilots?.join(", ") || "None"}
                </p>
                <p>
                  <strong>Assigned Quadcopters:</strong>{" "}
                  {item.assignedQuadcopters?.join(", ") || "None"}
                </p>
                <div className="mt-2 flex space-x-2">
                  <Button
                    type="primary"
                    ghost
                    onClick={() => handleOpenEditModal(item)}
                  >
                    Edit
                  </Button>
                  <Button
                    type="text"
                    danger
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Card>
      <Modal
        title="Add Delivery Zone"
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={null}
      >
        <DeliveryZoneForm onCloseModal={handleCloseModal} />
      </Modal>
      <Modal
        title="Edit Delivery Zone"
        open={isEditModalOpen}
        onCancel={handleCloseEditModal}
        footer={null}
      >
        {selectedDeliveryZone && (
          <EditDeliveryZoneForm
            deliveryZone={selectedDeliveryZone}
            onCloseModal={handleCloseEditModal}
          />
        )}
      </Modal>
    </div>
  );
};

export default DeliveryZones;
