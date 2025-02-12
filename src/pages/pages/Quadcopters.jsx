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
} from "antd";
import {
  useAddQuadcopterMutation,
  useGetQuadcoptersQuery,
} from "../quadcopter/quadcopter"; // Adjust the import path
import { useGetDeliveryZonesQuery } from "../../features/landingPage/deliveryZonesApiSlice"; // Adjust the import path
import { useGetUsersQuery } from "../../features/users/usersApiSlice"; // Adjust the import path

// QuadcopterForm component for adding a new quadcopter
const QuadcopterForm = ({ onCloseModal }) => {
  const [addQuadcopter, { isLoading, isSuccess, isError, error }] =
    useAddQuadcopterMutation();
  const [formData, setFormData] = useState({
    name: "",
    deliveryZone: "",
    pilot: "",
  });

  const [errors, setErrors] = useState({});

  // Fetch delivery zones
  const {
    data: deliveryZones = [],
    error: deliveryZoneError,
    isLoadingZones,
  } = useGetDeliveryZonesQuery();
  const deliveryZonesArray =
    deliveryZones?.ids?.map((id) => deliveryZones.entities[id]) || [];

  // Fetch pilots
  const { data: users = [], isLoading: isLoadingPilots } = useGetUsersQuery();
  const usersArray = users?.ids?.map((id) => users.entities[id]) || [];
  console.log(usersArray);
  const selectedDeliveryZone = formData.deliveryZone;

  // Filter pilots based on role and delivery zone
  const pilots = usersArray?.filter(
    (user) =>
      user.roles.includes("Pilot") &&
      user.deliveryZone === selectedDeliveryZone,
  );
  //console.log(pilots);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name) newErrors.name = "Please enter the quadcopter name";
    if (!formData.deliveryZone)
      newErrors.deliveryZone = "Please select a delivery zone";
    if (!formData.pilot) newErrors.pilot = "Please select a pilot";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    // Submit the form data (e.g., send to API)
    try {
      await addQuadcopter({
        name: formData.name,
        deliveryZone: formData.deliveryZone,
        pilot: formData.pilot,
      });
    } catch (err) {
      console.error("Failed to register:", err);
    }
    console.log("Form Data:", formData);
    if (isSuccess) onCloseModal();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-md rounded-lg border p-4 shadow"
    >
      <div className="mb-4">
        <label className="block text-sm font-medium">Quadcopter Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full rounded border bg-white p-2"
        />
        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Delivery Zone</label>
        <select
          name="deliveryZone"
          value={formData.deliveryZone}
          onChange={handleChange}
          className="w-full rounded border bg-white p-2"
        >
          <option value="">Select Delivery Zone</option>
          {isLoadingZones ? (
            <option>Loading...</option>
          ) : (
            deliveryZonesArray?.map((zone) => (
              <option key={zone._id} value={zone._id}>
                {zone.zoneName}
              </option>
            ))
          )}
        </select>
        {errors.deliveryZonesArray && (
          <p className="text-sm text-red-500">{errors.deliveryZonesArray}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Pilot</label>
        <select
          name="pilot"
          value={formData.pilot}
          onChange={handleChange}
          className="w-full rounded border bg-white p-2"
        >
          <option value="">Select Pilot</option>
          {isLoadingPilots ? (
            <option>Loading...</option>
          ) : (
            pilots?.map((pilot) => (
              <option key={pilot.id} value={pilot.id}>
                {pilot.username}
              </option>
            ))
          )}
        </select>
        {errors.pilot && <p className="text-sm text-red-500">{errors.pilot}</p>}
      </div>
      <button
        type="submit"
        className="w-full rounded bg-blue-600 p-2 text-white hover:bg-blue-700"
      >
        {isLoading ? "Adding..." : "Add Quadcopter"}
      </button>
      {isError && (
        <p className="mt-2 text-sm text-red-500">
          Error: {error?.data?.message}
        </p>
      )}
    </form>
  );
};

const Quadcopters = () => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch quadcopters data using the API slice
  const {
    data: quadcopters,
    isLoading,
    isError,
    error,
  } = useGetQuadcoptersQuery();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Define table columns for quadcopters
  const columns = [
    {
      title: "Quadcopter Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Pilot",
      dataIndex: "pilotName",
      key: "pilotName",
      render: (pilotName) => pilotName || "Unassigned", // Show "Unassigned" if no pilot
    },
    {
      title: "Active",
      dataIndex: "active",
      key: "active",
      render: (active) => (
        <Tag color={active === "active" ? "green" : "red"}>
          {active === "active" ? "Active" : "Inactive"}
        </Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => status || "Unassigned",
    },
    {
      title: "Delivery Zone",
      dataIndex: "deliveryZoneName",
      key: "deliveryZoneName",
      render: (deliveryZoneName) => deliveryZoneName || "Unassigned", // Show "Unassigned" if no zone
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => createdAt || "Unassigned", // Show "Unassigned" if no date
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button type="link">Edit</Button>
          <Button type="link" danger>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  // Transform API data to match the table structure
  const tableData = quadcopters
    ? quadcopters.ids.map((id) => {
        const quadcopter = quadcopters.entities[id];
        return {
          key: quadcopter.id,
          id: quadcopter.id,
          name: quadcopter.name,
          pilotName: quadcopter.pilotName,
          active: quadcopter.active ? "active" : "inactive", // Map `active` to status
          status: quadcopter.status,
          deliveryZoneName: quadcopter.deliveryZoneName,
          createdAt: quadcopter.createdAt,
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
          description={error.message || "Failed to fetch quadcopters"}
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
        title={<h2 className="text-lg font-bold text-gray-800">Quadcopters</h2>}
        extra={
          <Button type="primary" onClick={handleOpenModal}>
            Add Quadcopter
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
                  <strong>Quadcopter Name:</strong> {item.name}
                </p>
                <p>
                  <strong>Pilot:</strong> {item.pilotName || "Unassigned"}
                </p>
                <p>
                  <strong>Active:</strong>{" "}
                  <Tag color={item.active === "active" ? "green" : "red"}>
                    {item.active === "active" ? "Active" : "Inactive"}
                  </Tag>
                </p>
                <p>
                  <strong>Delivery Zone:</strong>{" "}
                  {item.deliveryZoneName || "Unassigned"}
                </p>
                <p>
                  <strong>Created At:</strong> {item.createdAt || "Unassigned"}
                </p>
                <p>
                  <strong>Status:</strong> {item.status || "Unassigned"}
                </p>
                <div className="mt-2 flex space-x-2">
                  <Button type="primary" ghost>
                    Edit
                  </Button>
                  <Button type="text" danger>
                    Delete
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Card>
      <Modal
        title="Add Quadcopter"
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={null}
      >
        <QuadcopterForm onCloseModal={handleCloseModal} />
      </Modal>
    </div>
  );
};

export default Quadcopters;
