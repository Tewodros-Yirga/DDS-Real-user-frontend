import React from "react";
import { Table, Card, Button, Space, Tag, Grid } from "antd";

const Pilots = () => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

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
      title: "License",
      dataIndex: "license",
      key: "license",
    },
    {
      title: "Flight Hours",
      dataIndex: "hours",
      key: "hours",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Active" ? "green" : "red"}>{status}</Tag>
      ),
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
  const data = [
    {
      key: "1",
      name: "John Pilot",
      email: "john.pilot@example.com",
      license: "LP12345",
      hours: 1200,
      status: "Active",
    },
    {
      key: "2",
      name: "Jane Aviator",
      email: "jane.aviator@example.com",
      license: "LP67890",
      hours: 800,
      status: "Inactive",
    },
    {
      key: "3",
      name: "Alex Skywalker",
      email: "alex.skywalker@example.com",
      license: "LP23456",
      hours: 950,
      status: "Active",
    },
    {
      key: "4",
      name: "Emily Airman",
      email: "emily.airman@example.com",
      license: "LP78901",
      hours: 450,
      status: "Active",
    },
    {
      key: "5",
      name: "Michael Flyer",
      email: "michael.flyer@example.com",
      license: "LP34567",
      hours: 1100,
      status: "Inactive",
    },
    {
      key: "6",
      name: "Sophia Pilot",
      email: "sophia.pilot@example.com",
      license: "LP89012",
      hours: 700,
      status: "Active",
    },
    {
      key: "7",
      name: "Daniel Skydiver",
      email: "daniel.skydiver@example.com",
      license: "LP45678",
      hours: 850,
      status: "Active",
    },
    {
      key: "8",
      name: "Olivia Aviator",
      email: "olivia.aviator@example.com",
      license: "LP90123",
      hours: 600,
      status: "Inactive",
    },
    {
      key: "9",
      name: "William Jet",
      email: "william.jet@example.com",
      license: "LP56789",
      hours: 1300,
      status: "Active",
    },
    {
      key: "10",
      name: "Grace Cloud",
      email: "grace.cloud@example.com",
      license: "LP01234",
      hours: 500,
      status: "Inactive",
    },
    {
      key: "11",
      name: "Benjamin Flyer",
      email: "benjamin.flyer@example.com",
      license: "LP67891",
      hours: 1200,
      status: "Active",
    },
    {
      key: "12",
      name: "Mia Skies",
      email: "mia.skies@example.com",
      license: "LP23457",
      hours: 900,
      status: "Active",
    },
  ];
  

  return (
    <div className="p-4 bg-gray-100">
    <Card
      title={<h2 className="text-lg font-bold text-gray-800">Pilots</h2>}
      extra={<Button type="primary">Add Pilot</Button>}
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
                <strong>License:</strong> {item.license}
              </p>
              <p>
                <strong>Flight Hours:</strong> {item.hours}
              </p>
              <p>
                <strong>Status:</strong> {item.status}
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

export default Pilots;
