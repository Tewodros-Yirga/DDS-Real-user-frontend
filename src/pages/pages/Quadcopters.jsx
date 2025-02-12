import React from "react";
import { Table, Card, Button, Space, Tag, Grid, Spin, Alert } from "antd";
import { useGetQuadcoptersQuery } from "../quadcopter/quadcopter"; // Update the import path

const Quadcopters = () => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  // Fetch data using the API slice
  const {
    data: quadcopters,
    isLoading,
    isError,
    error,
  } = useGetQuadcoptersQuery();

  // Define table columns
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
      title: "created at",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => createdAt || "Unassigned", // Show "Unassigned" if no zone
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
        extra={<Button type="primary">Add Quadcopter</Button>}
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
                  <strong>Created at:</strong> {item.createdAt || "Unassigned"}
                </p>
                <p>
                  <strong>status:</strong> {item.status || "Unassigned"}
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
    </div>
  );
};

export default Quadcopters;
