import React, { useState } from "react";
import {
  Table,
  Card,
  Input,
  Button,
  Tag,
  Dropdown,
  Menu,
  Space,
  Popover,
  Pagination,
  Grid,
  message,
} from "antd";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";

// Import useBreakpoint correctly
const { useBreakpoint } = Grid;

const Orders = () => {
  const screens = useBreakpoint(); // Now this will work
  const [searchText, setSearchText] = useState("");
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  // Dummy data for demonstration
  const [ordersData, setOrdersData] = useState([
    {
      key: "1",
      orderId: "ORD123",
      customerName: "John Doe",
      deliveryZone: "Zone A",
      items: [
        { product: "Product 1", quantity: 2, price: 20 },
        { product: "Product 2", quantity: 1, price: 15 },
      ],
      status: "Pending",
      deliveryDate: "2024-12-05",
      completed: "No",
    },
    {
      key: "2",
      orderId: "ORD124",
      customerName: "Jane Smith",
      deliveryZone: "Zone B",
      items: [{ product: "Product 3", quantity: 3, price: 30 }],
      status: "Completed",
      deliveryDate: "2024-12-06",
      completed: "Yes",
    },
  ]);

  // Function to handle order completion
  const handleCompleteOrder = (orderId) => {
    setOrdersData((prevOrders) =>
      prevOrders.map((order) =>
        order.orderId === orderId ? { ...order, status: "Completed" } : order
      )
    );
    message.success(`Order ${orderId} marked as completed.`);
  };

  // Function to handle order cancellation
  const handleCancelOrder = (orderId) => {
    setOrdersData((prevOrders) =>
      prevOrders.map((order) =>
        order.orderId === orderId ? { ...order, status: "Cancelled" } : order
      )
    );
    message.warning(`Order ${orderId} has been cancelled.`);
  };

  // Filter and search logic
  const filteredData = ordersData.filter((order) => {
    return (
      order.orderId.includes(searchText) &&
      (!filters.status || order.status === filters.status)
    );
  });

  // Columns for the table
  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
      sorter: (a, b) => a.orderId.localeCompare(b.orderId),
    },
    {
      title: "Customer",
      dataIndex: "customerName",
      key: "customerName",
      sorter: (a, b) => a.customerName.localeCompare(b.customerName),
    },
    {
      title: "Delivery Zone",
      dataIndex: "deliveryZone",
      key: "deliveryZone",
      sorter: (a, b) => a.deliveryZone.localeCompare(b.deliveryZone),
    },
    {
      title: "Items",
      dataIndex: "items",
      key: "items",
      render: (items) => (
        <Dropdown
          overlay={
            <Menu>
              {items.map((item, index) => (
                <Menu.Item key={index}>
                  {item.product} (Qty: {item.quantity}, Price: ${item.price})
                </Menu.Item>
              ))}
            </Menu>
          }
        >
          <Button type="link" className="text-blue-500 hover:text-blue-700">
            View Items
          </Button>
        </Dropdown>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          color={
            status === "Completed"
              ? "green"
              : status === "Pending"
              ? "orange"
              : status === "Cancelled"
              ? "red"
              : "gray"
          }
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Delivery Date",
      dataIndex: "deliveryDate",
      key: "deliveryDate",
      sorter: (a, b) => new Date(a.deliveryDate) - new Date(b.deliveryDate),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          {/* View Action */}
          <Popover
            title="Order Details"
            content={
              <div>
                <p>
                  <strong>Status:</strong> {record.status}
                </p>
                <p>
                  <strong>Delivery Date:</strong> {record.deliveryDate}
                </p>
                <p>
                  <strong>Completed:</strong> {record.completed}
                </p>
              </div>
            }
          >
            <Button type="link" className="text-blue-500 hover:text-blue-700">
              View
            </Button>
          </Popover>

          {/* Complete Action */}
          {record.status !== "Completed" && (
            <Button
              type="link"
              className="text-green-500 hover:text-green-700"
              onClick={() => handleCompleteOrder(record.orderId)}
            >
              Complete
            </Button>
          )}

          {/* Cancel Action */}
          {record.status !== "Cancelled" && (
            <Button
              type="link"
              className="text-red-500 hover:text-red-700"
              onClick={() => handleCancelOrder(record.orderId)}
            >
              Cancel
            </Button>
          )}
        </Space>
      ),
    },
  ];

  // Pagination logic
  const pageSize = 5;
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div
      className="bg-gray-50 p-6"
      style={{ overflowY: "auto", height: "calc(100vh - 64px)" }}
    >
      <Card
        title={
          <h2 className="text-2xl font-bold text-gray-800">Orders Management</h2>
        }
        className="rounded-lg shadow-sm border"
      >
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <Input
            placeholder="Search by Order ID"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full md:w-64"
          />
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item onClick={() => setFilters({})}>All</Menu.Item>
                <Menu.Item onClick={() => setFilters({ status: "Pending" })}>
                  Pending
                </Menu.Item>
                <Menu.Item onClick={() => setFilters({ status: "Completed" })}>
                  Completed
                </Menu.Item>
                <Menu.Item onClick={() => setFilters({ status: "Cancelled" })}>
                  Cancelled
                </Menu.Item>
              </Menu>
            }
          >
            <Button icon={<FilterOutlined />} className="w-full md:w-auto">
              Filters
            </Button>
          </Dropdown>
        </div>

        {/* Table or Card Layout */}
        {screens.md ? (
          <Table
            columns={columns}
            dataSource={paginatedData}
            rowKey="key"
            pagination={false}
            bordered
            className="rounded-lg shadow-sm"
          />
        ) : (
          <div className="space-y-4">
            {paginatedData.map((item) => (
              <Card
                key={item.key}
                bordered
                className="rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <p>
                  <strong>Order ID:</strong> {item.orderId}
                </p>
                <p>
                  <strong>Customer:</strong> {item.customerName}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <Tag
                    color={
                      item.status === "Completed"
                        ? "green"
                        : item.status === "Pending"
                        ? "orange"
                        : item.status === "Cancelled"
                        ? "red"
                        : "gray"
                    }
                  >
                    {item.status}
                  </Tag>
                </p>
                <p>
                  <strong>Delivery Date:</strong> {item.deliveryDate}
                </p>
                <div className="flex justify-end space-x-2">
                  {/* View Action */}
                  <Popover
                    title="Order Details"
                    content={
                      <div>
                        <p>
                          <strong>Items:</strong>{" "}
                          {item.items.map((item, index) => (
                            <div key={index}>
                              {item.product} (Qty: {item.quantity}, Price: $
                              {item.price})
                            </div>
                          ))}
                        </p>
                      </div>
                    }
                  >
                    <Button
                      type="link"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      View
                    </Button>
                  </Popover>

                  {/* Complete Action */}
                  {item.status !== "Completed" && (
                    <Button
                      type="link"
                      className="text-green-500 hover:text-green-700"
                      onClick={() => handleCompleteOrder(item.orderId)}
                    >
                      Complete
                    </Button>
                  )}

                  {/* Cancel Action */}
                  {item.status !== "Cancelled" && (
                    <Button
                      type="link"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleCancelOrder(item.orderId)}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="mt-6 flex justify-center">
          <Pagination
            current={currentPage}
            total={filteredData.length}
            pageSize={pageSize}
            onChange={(page) => setCurrentPage(page)}
            showSizeChanger={false}
            className="rounded-lg shadow-sm"
          />
        </div>
      </Card>
    </div>
  );
};

export default Orders;