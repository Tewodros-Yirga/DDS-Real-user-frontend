import React, { useState ,useEffect} from "react";
import { Table, Card, Button, Space, Grid, Spin, Alert, Modal } from "antd";
import { useGetUsersQuery,useDeleteUserMutation,  useUpdateUserMutation } from "../../features/users/usersApiSlice"; // Adjust the import path


const EditCustomerForm = ({ user, onCloseModal, onUpdateUser }) => {
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    roles: ["Customer"],
    phone: user.phone,
    address: user.address,
  });

  const [errors, setErrors] = useState({});

  // Update formData when the user prop changes
  useEffect(() => {
    setFormData({
      username: user.username,
      email: user.email,
      roles: ["Customer"],
      phone: user.phone,
      address: user.address,
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

      <button
        type="submit"
        className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Update Customer
      </button>
    </form>
  );
};


// CustomerForm component for adding a new customer
const CustomerForm = ({ onCloseModal }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    address: "",
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
    if (!formData.address) newErrors.address = "Please enter an address";

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

      <button
        type="submit"
        className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Add Customer
      </button>
    </form>
  );
};


const Users = () => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Fetch users data using the API slice
  const {
    data: users,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetUsersQuery();

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


   // Handle delete action with confirmation
    const handleDelete = (id) => {
      Modal.confirm({
        title: "Are you sure you want to delete this User?",
        content: "This action cannot be undone.",
        okText: "Yes, delete it",
        okType: "danger",
        cancelText: "No, cancel",
        onOk: async () => {
          try {
            await deleteUser({id}).unwrap();
            refetch(); // Refetch the quadcopters data to update the UI
          } catch (err) {
            console.error("Failed to delete a User:", err);
          }
        },
        onCancel: () => {
          console.log("Deletion canceled");
        },
      });
    };


  // Define table columns for customers
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
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button type="link"  onClick={() => handleOpenEditModal(record)}>Edit</Button>
          <Button type="link" danger onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  // Filter users to display only customers (assuming customers have no role or a specific role)
const customerUsers = users
? users.ids
    .map((id) => users.entities[id])
    .filter((user) => user.roles?.includes("Customer")) // Check if the roles array includes "Pilot"
: [];

  // Transform API data to match the table structure
  const tableData = customerUsers.map((user) => ({
    key: user.id,
    id: user.id,
    username: user.username,
    email: user.email,
    phone: user.phone,
    address: user.address,
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
          description={error.message || "Failed to fetch customers"}
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
        title={<h2 className="text-lg font-bold text-gray-800">Customers</h2>}
        extra={<Button type="primary" onClick={handleOpenModal}>Add Customer</Button>}
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
                  <strong>Username:</strong> {item.username}
                </p>
                <p>
                  <strong>Email:</strong> {item.email}
                </p>
                <p>
                  <strong>Phone:</strong> {item.phone}
                </p>
                <p>
                  <strong>Address:</strong> {item.address}
                </p>
                <div className="mt-2 flex space-x-2">
                  <Button type="primary" ghost  onClick={() => handleOpenEditModal(item)}>
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
        title="Add Customer"
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={null}
      >
        <CustomerForm onCloseModal={handleCloseModal} />
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

export default Users;
