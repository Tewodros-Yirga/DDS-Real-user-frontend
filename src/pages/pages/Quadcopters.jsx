import React from "react";
import { Table, Card, Button, Space, Tag, Grid } from "antd";

const Quadcopters = () => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  const columns = [
    {
      title: "Quadcopter ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Model",
      dataIndex: "model",
      key: "model",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Operational" ? "green" : "orange"}>
          {status}
        </Tag>
      ),
    },
    {
      title: "Flight Hours",
      dataIndex: "hours",
      key: "hours",
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
      id: "QDR12345",
      model: "Phantom X",
      status: "Operational",
      hours: 500,
    },
    {
      key: "2",
      id: "QDR67890",
      model: "Drone Pro 200",
      status: "Under Maintenance",
      hours: 300,
    },
    {
      key: "3",
      id: "QDR23456",
      model: "Mavic Air 3",
      status: "Operational",
      hours: 400,
    },
    {
      key: "4",
      id: "QDR78901",
      model: "Inspire 3",
      status: "Under Maintenance",
      hours: 250,
    },
    {
      key: "5",
      id: "QDR34567",
      model: "Autel EVO II Pro",
      status: "Operational",
      hours: 600,
    },
    {
      key: "6",
      id: "QDR89012",
      model: "Phantom 4 RTK",
      status: "Operational",
      hours: 350,
    },
    {
      key: "7",
      id: "QDR45678",
      model: "Skydio 2",
      status: "Operational",
      hours: 450,
    },
    {
      key: "8",
      id: "QDR90123",
      model: "Mavic 2 Enterprise",
      status: "Under Maintenance",
      hours: 200,
    },
    {
      key: "9",
      id: "QDR56789",
      model: "DJI Mini 2",
      status: "Operational",
      hours: 100,
    },
    {
      key: "10",
      id: "QDR01234",
      model: "Yuneec Typhoon H Plus",
      status: "Under Maintenance",
      hours: 350,
    },
    {
      key: "11",
      id: "QDR67891",
      model: "Parrot Anafi USA",
      status: "Operational",
      hours: 500,
    },
    {
      key: "12",
      id: "QDR23457",
      model: "Phantom 4 Pro",
      status: "Under Maintenance",
      hours: 300,
    },
  ];
  

  return (
    <div className="p-4 bg-gray-100">
    <Card
      title={<h2 className="text-lg font-bold text-gray-800">Quadcopters</h2>}
      extra={<Button type="primary">Add Quadcopter</Button>}
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
                <strong>Quadcopter Id:</strong> {item.id}
              </p>
              <p>
                <strong>Model:</strong> {item.model}
              </p>
              <p>
                <strong>Status:</strong> {item.status}
              </p>
              <p>
                <strong>Flight Hours:</strong> {item.hours}
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

export default Quadcopters;
