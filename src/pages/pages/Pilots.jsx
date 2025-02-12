import React, { useState } from "react";
import { Table, Card, Button, Space, Tag, Grid, Spin, Alert, Modal } from "antd";
import { useGetUsersQuery } from "../../features/users/usersApiSlice"; // Adjust the import path

// PilotForm component for adding a new pilot
const PilotForm = ({ onCloseModal }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    deliveryZone: "",
    assignedQuadcopters: [],
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.username) newErrors.username = "Please enter a username";
    if (!formData.email) newErrors.email = "Please enter an email";
    if (!formData.phone) newErrors.phone = "Please enter a phone number";
    if (!formData.deliveryZone) newErrors.deliveryZone = "Please select a delivery zone";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    // Submit the form data (e.g., send to API)
    console.log("Form Data:", formData);
    onCloseModal(); // Close the modal after submission
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded-lg shadow">
      <div className="mb-4">
        <label className="block text-sm font-medium">Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Phone</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Delivery Zone</label>
        <input
          type="text"
          name="deliveryZone"
          value={formData.deliveryZone}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        {errors.deliveryZone && <p className="text-red-500 text-sm">{errors.deliveryZone}</p>}
      </div>

      <button
        type="submit"
        className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Add Pilot
      </button>
    </form>
  );
};

const Pilots = () => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch pilots data using the API slice
  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useGetUsersQuery();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Define table columns for pilots
  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Delivery Zone",
      dataIndex: "deliveryZone",
      key: "deliveryZone",
    },
    {
      title: "Assigned Quadcopters",
      dataIndex: "assignedQuadcopters",
      key: "assignedQuadcopters",
      render: (quadcopters) => quadcopters?.join(", ") || "None", // Display quadcopters as a comma-separated list
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

  // Filter users to display only pilots (assuming pilots have the role "Pilot")
  const pilots = users
    ? users.ids
        .map((id) => users.entities[id])
        .filter((user) => user.roles?.includes("Pilot")) // Check if the roles array includes "Pilot"
    : [];

  // Transform API data to match the table structure
  const tableData = pilots.map((pilot) => ({
    key: pilot.id,
    id: pilot.id,
    username: pilot.username,
    email: pilot.email,
    phone: pilot.phone,
    deliveryZone: pilot.deliveryZone || "Unassigned",
    assignedQuadcopters: pilot.assignedQuadcopters || [], // Replace with actual assigned quadcopters data
  }));

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
          description={error.message || "Failed to fetch pilots"}
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
        title={<h2 className="text-lg font-bold text-gray-800">Pilots</h2>}
        extra={<Button type="primary" onClick={handleOpenModal}>Add Pilot</Button>}
        className="border shadow-sm"
      >
        {screens.md ? (
          // Render Table for Medium and Larger Screens
          <div style={{ overflowX: "auto" }}> {/* Make table horizontally scrollable */}
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
          </div>
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
                  <strong>Username:</strong> {item.username}
                </p>
                <p>
                  <strong>Email:</strong> {item.email}
                </p>
                <p>
                  <strong>Phone:</strong> {item.phone}
                </p>
                <p>
                  <strong>Delivery Zone:</strong> {item.deliveryZone}
                </p>
                <p>
                  <strong>Assigned Quadcopters:</strong>{" "}
                  {item.assignedQuadcopters?.join(", ") || "None"}
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
        title="Add Pilot"
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={null}
      >
        <PilotForm onCloseModal={handleCloseModal} />
      </Modal>
    </div>
  );
};

export default Pilots;
