import React from "react";
import { Table, Card, Button, Space, Grid } from "antd";

const Users = () => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  const data = [
    {
      key: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      role: "Admin",
    },
    {
      key: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "User",
    },
    {
      key: "3",
      name: "Michael Johnson",
      email: "michael.johnson@example.com",
      role: "User",
    },
    {
      key: "4",
      name: "Emily Davis",
      email: "emily.davis@example.com",
      role: "User",
    },
    {
      key: "5",
      name: "David Brown",
      email: "david.brown@example.com",
      role: "Admin",
    },
    {
      key: "6",
      name: "Sophia Wilson",
      email: "sophia.wilson@example.com",
      role: "User",
    },
    {
      key: "7",
      name: "James Martinez",
      email: "james.martinez@example.com",
      role: "User",
    },
    {
      key: "8",
      name: "Oliver Garcia",
      email: "oliver.garcia@example.com",
      role: "User",
    },
    {
      key: "9",
      name: "Isabella Rodriguez",
      email: "isabella.rodriguez@example.com",
      role: "Admin",
    },
    {
      key: "10",
      name: "Liam Hernandez",
      email: "liam.hernandez@example.com",
      role: "User",
    },
    {
      key: "11",
      name: "Amelia Lopez",
      email: "amelia.lopez@example.com",
      role: "User",
    },
    {
      key: "12",
      name: "Lucas Perez",
      email: "lucas.perez@example.com",
      role: "User",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="small" wrap>
          <Button type="primary" ghost>
            Edit
          </Button>
          <Button type="text" danger>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div
      className="p-4 bg-gray-100"
      style={{ overflowY: "auto", height: "calc(100vh - 64px)" }} // Add this style
    >
      <Card
        title={<h2 className="text-lg font-bold text-gray-800">Users</h2>}
        extra={<Button type="primary">Add User</Button>}
        className="shadow-sm border"
      >
        {screens.md ? (
          // Render Table for Medium and Larger Screens
          <Table
            columns={columns}
            dataSource={data}
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
            {data.map((item) => (
              <Card
                key={item.key}
                bordered
                className="bg-white shadow-sm rounded-lg"
              >
                <p>
                  <strong>Name:</strong> {item.name}
                </p>
                <p>
                  <strong>Email:</strong> {item.email}
                </p>
                <p>
                  <strong>Role:</strong> {item.role}
                </p>
                <div className="flex space-x-2 mt-2">
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
    </div>
  );
};

export default Users;