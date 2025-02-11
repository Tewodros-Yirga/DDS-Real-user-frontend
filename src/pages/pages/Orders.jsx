import React from "react";
import { Table, Card, Button, Space, Tag, Grid } from "antd";

const Orders = () => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Customer",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => `$${amount.toFixed(2)}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Delivered" ? "green" : "blue"}>{status}</Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button type="link">View</Button>
          <Button type="link" danger>
            Cancel
          </Button>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      orderId: "ORD12345",
      customerName: "John Doe",
      date: "2024-12-06",
      amount: 150.5,
      status: "Delivered",
    },
    {
      key: "2",
      orderId: "ORD12346",
      customerName: "Jane Smith",
      date: "2024-12-05",
      amount: 85.3,
      status: "In Transit",
    },
    {
      key: "3",
      orderId: "ORD12347",
      customerName: "Alex Johnson",
      date: "2024-12-04",
      amount: 120.75,
      status: "Pending",
    },
    {
      key: "4",
      orderId: "ORD12348",
      customerName: "Emma Brown",
      date: "2024-12-03",
      amount: 45.99,
      status: "Delivered",
    },
    {
      key: "5",
      orderId: "ORD12349",
      customerName: "William Davis",
      date: "2024-12-02",
      amount: 230.0,
      status: "Cancelled",
    },
    {
      key: "6",
      orderId: "ORD12350",
      customerName: "Sophia Miller",
      date: "2024-12-01",
      amount: 198.4,
      status: "In Transit",
    },
    {
      key: "7",
      orderId: "ORD12351",
      customerName: "James Wilson",
      date: "2024-11-30",
      amount: 95.8,
      status: "Delivered",
    },
    {
      key: "8",
      orderId: "ORD12352",
      customerName: "Ava Garcia",
      date: "2024-11-29",
      amount: 60.25,
      status: "Pending",
    },
    {
      key: "9",
      orderId: "ORD12353",
      customerName: "Mason Taylor",
      date: "2024-11-28",
      amount: 110.99,
      status: "Delivered",
    },
    {
      key: "10",
      orderId: "ORD12354",
      customerName: "Isabella Martinez",
      date: "2024-11-27",
      amount: 75.6,
      status: "In Transit",
    },
    {
      key: "11",
      orderId: "ORD12355",
      customerName: "Ethan Harris",
      date: "2024-11-26",
      amount: 180.9,
      status: "Delivered",
    },
    {
      key: "12",
      orderId: "ORD12356",
      customerName: "Olivia Clark",
      date: "2024-11-25",
      amount: 220.7,
      status: "Cancelled",
    },
  ];
  

  return (
    <div className="p-4 bg-gray-100">
      <Card
        title={<h2 className="text-lg font-bold text-gray-800">Orders</h2>}
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
                  <strong>Order Id:</strong> {item.orderId}
                </p>
                <p>
                  <strong>Customer:</strong> {item.customerName}
                </p>
                <p>
                  <strong>Date:</strong> {item.date}
                </p>
                <p>
                  <strong>Amount:</strong> {item.amount}
                </p>
                <p>
                  <strong>Status:</strong> {item.status}
                </p>
                <div className="flex space-x-2">
                  <Button type="link">View</Button>
                  <Button type="link" danger>
                    Cancel
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

export default Orders;
