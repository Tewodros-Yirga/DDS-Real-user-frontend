import React, { useState ,useEffect} from "react";
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
  useGetUsersQuery,
  useAddNewUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation 
} from "../../features/users/usersApiSlice"; // Adjust the import path
import { useGetDeliveryZonesQuery } from "../../features/landingPage/deliveryZonesApiSlice";




const EditCustomerForm = ({ user, onCloseModal, onUpdateUser }) => {
  const { data: deliveryZones = [], error: deliveryZoneError } =
  useGetDeliveryZonesQuery();
const deliveryZonesArray =
  deliveryZones?.ids?.map((id) => deliveryZones.entities[id]) || [];
  const [formData, setFormData] = useState({
    id :user.id,
    username: user.username,
    email: user.email,
    roles: ["Pilot"],
    phone: user.phone,
    address: user.address,
    deliveryZone: "",
  });

  const [errors, setErrors] = useState({});

  // Update formData when the user prop changes
  useEffect(() => {
    setFormData({
      id:user.id,
      username: user.username,
      email: user.email,
      roles: ["Pilot"],
      phone: user.phone,
      address: user.address,
      deliveryZone: user.deliveryZone,
    });
  }, [user]);

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
    if (!formData.address) newErrors.address = "Please enter an address";
    if (!formData.deliveryZone)
      newErrors.deliveryZone = "Please select a delivery zone";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onUpdateUser(user.id, formData); // Pass the updated data to the parent component
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
          className="w-full p-2 border bg-white rounded"
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
          className="w-full p-2 border bg-white rounded"
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
          className="w-full p-2 border bg-white rounded"
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full p-2 border bg-white rounded"
        />
        {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Delivery Zone</label>
        <select
          name="deliveryZone"
          value={formData.deliveryZone}
          onChange={handleChange}
          className="w-full rounded border bg-white p-2"
        >
          <option value="">Select a Delivery Zone</option>
          {deliveryZonesArray?.map((zone) => (
            <option key={zone._id} value={zone._id}>
              {zone.zoneName}
            </option>
          ))}
        </select>
        {errors.deliveryZoneArray && (
          <p className="text-sm text-red-500">{errors.deliveryZoneArray}</p>
        )}
      </div>
      <button
        type="submit"
        className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Update Pilot
      </button>
    </form>
  );
};



// PilotForm component for adding a new pilot
const PilotForm = ({ onCloseModal }) => {
  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation();
  const { data: deliveryZones = [], error: deliveryZoneError } =
    useGetDeliveryZonesQuery();
  const deliveryZonesArray =
    deliveryZones?.ids?.map((id) => deliveryZones.entities[id]) || [];

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    deliveryZone: "",
    assignedQuadcopters: [],
    address: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.username) newErrors.username = "Please enter a username";
    if (!formData.password) newErrors.password = "Please enter a password";
    if (!formData.email) newErrors.email = "Please enter an email";
    if (!formData.phone) newErrors.phone = "Please enter a phone number";
    if (!formData.address) newErrors.address = "please enter an address";
    if (!formData.deliveryZone)
      newErrors.deliveryZone = "Please select a delivery zone";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    try {
      await addNewUser({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        roles: ["Pilot"],
        deliveryZone: formData.deliveryZone,
        address: formData.address,
        createdBy: "6720ad60bb76da4ce78b78f4",
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
        <label className="block text-sm font-medium">Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="w-full rounded border bg-white p-2"
        />
        {errors.username && (
          <p className="text-sm text-red-500">{errors.username}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Password</label>
        <input
          type="text"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full rounded border bg-white p-2"
        />
        {errors.phone && (
          <p className="text-sm text-red-500">{errors.password}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full rounded border bg-white p-2"
        />
        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Phone</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full rounded border bg-white p-2"
        />
        {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full rounded border bg-white p-2"
        />
        {errors.phone && (
          <p className="text-sm text-red-500">{errors.address}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Delivery Zone</label>
        <select
          name="deliveryZone"
          value={formData.deliveryZone}
          onChange={handleChange}
          className="w-full rounded border bg-white p-2"
        >
          <option value="">Select a Delivery Zone</option>
          {deliveryZonesArray?.map((zone) => (
            <option key={zone._id} value={zone._id}>
              {zone.zoneName}
            </option>
          ))}
        </select>
        {errors.deliveryZoneArray && (
          <p className="text-sm text-red-500">{errors.deliveryZoneArray}</p>
        )}
      </div>
      <button
        type="submit"
        className="w-full rounded bg-blue-600 p-2 text-white hover:bg-blue-700"
      >
        {isLoading ? "Adding..." : "Add Pilot"}
      </button>
      {isError && (
        <p className="mt-2 text-sm text-red-500">
          Error: {error?.data?.message}
        </p>
      )}
    </form>
  );
};

const Pilots = () => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

  // Fetch pilots data using the API slice
  const { data: users, isLoading, isError, error,refetch, } = useGetUsersQuery();
   const [deleteUser] = useDeleteUserMutation();
 const [updateUser] = useUpdateUserMutation();
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenEditModal = (user) => {
    setEditingUser(null); // Reset first to ensure re-render
    setTimeout(() => setEditingUser(user), 0); // Delay update to force re-render
    setIsEditModalOpen(true);
  };
  

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingUser(null);
  };
  
    const handleUpdateUser = async (id, updatedData) => {
      Modal.confirm({
        title: "Are you sure you want to update this user?",
        content: "This action will modify the user's details.",
        okText: "Yes, update it",
        okType: "primary",
        cancelText: "No, cancel",
        onOk: async () => {
          try {
            // Call your API to update the user here
            await updateUser({ id, ...updatedData }).unwrap();
            console.log("Updating user:", id, updatedData);
            refetch(); // Refetch the users data to update the UI
            handleCloseEditModal(); // Close the edit modal after successful update
          } catch (err) {
            console.error("Failed to update user:", err);
          }
        },
        onCancel: () => {
          console.log("Update canceled");
        },
      });
    };
  

  const handleDelete = (id) => {
    // Find the user by ID
    const userToDelete = users.entities[id];
  
    // Check if the user is a pilot
    if (!userToDelete || !userToDelete.roles?.includes("Pilot")) {
      console.error("User is not a pilot or does not exist");
      return;
    }
  
    Modal.confirm({
      title: "Are you sure you want to delete this Pilot?",
      content: "This action cannot be undone.",
      okText: "Yes, delete it",
      okType: "danger",
      cancelText: "No, cancel",
      onOk: async () => {
        try {
          await deleteUser({ id }).unwrap();
          refetch(); // Refetch the data to update the UI
        } catch (err) {
          console.error("Failed to delete a Pilot:", err);
        }
      },
      onCancel: () => {
        console.log("Deletion canceled");
      },
    });
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
          <Button type="link" onClick={() => handleOpenEditModal(record)}>Edit</Button>
          <Button type="link" danger onClick={() => handleDelete(record.id)}>
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
        extra={
          <Button type="primary" onClick={handleOpenModal}>
            Add Pilot
          </Button>
        }
        className="border shadow-sm"
      >
        {screens.md ? (
          // Render Table for Medium and Larger Screens
          <div style={{ overflowX: "auto" }}>
            {" "}
            {/* Make table horizontally scrollable */}
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
                  <Button type="primary" ghost onClick={() => handleOpenEditModal(item)}>
                    Edit
                  </Button>
                  <Button type="text" danger onClick={() => handleDelete(item.id)}>
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
      <Modal
              title="Edit Customer"
              open={isEditModalOpen}
              onCancel={handleCloseEditModal}
              footer={null}
            >
              {editingUser && (
                <EditCustomerForm
                  user={editingUser}
                  onCloseModal={handleCloseEditModal}
                  onUpdateUser={handleUpdateUser}
                />
              )}
            </Modal>
    </div>
  );
};

export default Pilots;