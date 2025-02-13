import React from "react";
import {
  Table,
  Card,
  Button,
  Space,
  Tag,
  Grid,
  Popover,
  Dropdown,
  Menu,
} from "antd";
import { useGetAllOrdersQuery } from "../../features/orders/orderApiSlice";
import {
  selectDeliveryZoneById,
  useGetDeliveryZonesQuery,
} from "../../features/landingPage/deliveryZonesApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/auth/authSlice"; // Adjust the import path as needed


const { useBreakpoint } = Grid;

const History = () => {
  const screens = useBreakpoint();
  // Get the logged-in user's ID
  const currentUser = useSelector(selectCurrentUser);
  const userId = currentUser?.id; // Assuming the user ID is stored in `_id`

  // Fetch orders for the current user
  const {
    data: ordersData,
    isLoading: isOrderLoading,
    isError: isOrdersError,
    error: ordersError,
  } = useGetAllOrdersQuery({
    status: "", // Add filters if needed
    customer: "", // Replace with the current user's ID if needed
    pilot: "",
    page: 1,
    limit: 10,
  });

  // Fetch delivery zones
  const {
    data: deliveryZones,
    isLoading: isDeliveryZonesLoading,
    isError: isDeliveryZonesError,
    error: deliveryZonesError,
  } = useGetDeliveryZonesQuery();

  // Use useSelector at the top level to get the normalized delivery zones data
  const deliveryZoneMap = useSelector((state) => {
    const zones = {};
    if (deliveryZones?.ids) {
      deliveryZones.ids.forEach((id) => {
        const zone = selectDeliveryZoneById(state, id);
        if (zone) {
          zones[id] = zone.zoneName;
        }
      });
    }
    return zones;
  });

  // Handle loading and error states
  if (isOrderLoading || isDeliveryZonesLoading) return <div>Loading...</div>;
  if (isOrdersError) return <div>Error: {ordersError.message}</div>;
  if (isDeliveryZonesError)
    return <div>Error: {deliveryZonesError.message}</div>;


  const filteredOrders = ordersData?.docs?.filter(order => order.customer._id === userId);

// Transform the filtered data to match the table structure
const data = filteredOrders?.map((order) => ({
  key: order._id,
  orderId: order.orderNumber,
  customerName: order.customer.username,
  date: new Date(order.deliveryDate).toLocaleDateString(),
  amount: order.totalAmount,
  status: order.status,
  deliveryZone: deliveryZoneMap[order.deliveryZone] || "N/A", // Use the delivery zone name
  items: order.items,
  deliveryDate: new Date(order.deliveryDate).toLocaleDateString(),
  completed: order.completed ? "Yes" : "No",
  deliveryAddress: order.deliveryAddress,
  rescheduledDate: order.rescheduledDate,
  cancellationReason: order.cancellationReason,
  refundPercentage: order.refundPercentage,
  pilot: order.pilot,
  quadcopter: order.quadcopter,
}));

  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Delivery Zone",
      dataIndex: "deliveryZone",
      key: "deliveryZone",
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
          <Button type="link">View Items</Button>
        </Dropdown>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Completed" ? "green" : "blue"}>{status}</Tag>
      ),
    },
    {
      title: "Delivery Date",
      dataIndex: "deliveryDate",
      key: "deliveryDate",
    },
    {
      title: "Completed",
      dataIndex: "completed",
      key: "completed",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Popover
            title="Order Details"
            content={
              <div>
                <p>
                  <strong>Delivery Address:</strong>{" "}
                  {record.deliveryAddress?.coordinates
                    ? `Lat: ${record.deliveryAddress.coordinates[0]}, Lng: ${record.deliveryAddress.coordinates[1]}`
                    : "N/A"}
                </p>
                <p>
                  <strong>Rescheduled Date:</strong>{" "}
                  {record.rescheduledDate
                    ? new Date(record.rescheduledDate).toLocaleDateString()
                    : "N/A"}
                </p>
                <p>
                  <strong>Cancellation Reason:</strong>{" "}
                  {record.cancellationReason || "N/A"}
                </p>
                <p>
                  <strong>Refund Percentage:</strong>{" "}
                  {record.refundPercentage
                    ? `${record.refundPercentage}%`
                    : "N/A"}
                </p>
                <p>
                  <strong>Pilot:</strong> {record.pilot?.username || "N/A"}
                </p>
                <p>
                  <strong>Quadcopter:</strong>{" "}
                  {record.quadcopter?.name || "N/A"}
                </p>
              </div>
            }
          >
            <Button type="link">View</Button>
          </Popover>
        </Space>
      ),
    },
  ];

  return (
    <div
      className="bg-gray-100 p-4"
      style={{ overflowY: "auto", height: "calc(100vh - 64px)" }}
    >
      <Card
        title={<h2 className="text-lg font-bold text-gray-800">Order History</h2>}
        className="border shadow-sm"
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
                className="rounded-lg bg-white shadow-sm"
              >
                <p>
                  <strong>Order Id:</strong> {item.orderId}
                </p>
                <p>
                  <strong>Delivery Zone:</strong> {item.deliveryZone}
                </p>
                <p>
                  <strong>Items:</strong>{" "}
                  <Dropdown
                    overlay={
                      <Menu>
                        {item.items.map((item, index) => (
                          <Menu.Item key={index}>
                            {item.product} (Qty: {item.quantity}, Price: $
                            {item.price})
                          </Menu.Item>
                        ))}
                      </Menu>
                    }
                  >
                    <Button type="link">View Items</Button>
                  </Dropdown>
                </p>
                <p>
                  <strong>Status:</strong> {item.status}
                </p>
                <p>
                  <strong>Delivery Date:</strong> {item.deliveryDate}
                </p>
                <p>
                  <strong>Completed:</strong> {item.completed}
                </p>
                <div className="flex space-x-2">
                  <Popover
                    title="Order Details"
                    content={
                      <div>
                        <p>
                          <strong>Delivery Address:</strong>{" "}
                          {item.deliveryAddress?.coordinates
                            ? `Lat: ${item.deliveryAddress.coordinates[0]}, Lng: ${item.deliveryAddress.coordinates[1]}`
                            : "N/A"}
                        </p>
                        <p>
                          <strong>Rescheduled Date:</strong>{" "}
                          {item.rescheduledDate
                            ? new Date(item.rescheduledDate).toLocaleDateString()
                            : "N/A"}
                        </p>
                        <p>
                          <strong>Cancellation Reason:</strong>{" "}
                          {item.cancellationReason || "N/A"}
                        </p>
                        <p>
                          <strong>Refund Percentage:</strong>{" "}
                          {item.refundPercentage
                            ? `${item.refundPercentage}%`
                            : "N/A"}
                        </p>
                        <p>
                          <strong>Pilot:</strong> {item.pilot?.username || "N/A"}
                        </p>
                        <p>
                          <strong>Quadcopter:</strong>{" "}
                          {item.quadcopter?.name || "N/A"}
                        </p>
                      </div>
                    }
                  >
                    <Button type="link">View</Button>
                  </Popover>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default History;