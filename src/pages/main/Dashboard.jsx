import React from "react";
import { Card, Statistic, Row, Col, List, Avatar } from "antd";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FiPackage, FiDollarSign, FiClock } from "react-icons/fi";

const data = [
  { name: "Jan", revenue: 4000, deliveries: 240 },
  { name: "Feb", revenue: 3000, deliveries: 200 },
  { name: "Mar", revenue: 5000, deliveries: 280 },
  { name: "Apr", revenue: 4500, deliveries: 260 },
];

const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-50 custom-scrollbar dashboard-container">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">Welcome to your admin panel</p>
      </div>

      {/* Metrics Row */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} lg={8}>
          <Card className="bg-gradient-to-r from-blue-500 to-blue-400 text-white">
            <Statistic
              title="Total Deliveries"
              value={1500}
              prefix={<FiPackage />}
              valueStyle={{ color: "white" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card className="bg-gradient-to-r from-green-500 to-green-400 text-white">
            <Statistic
              title="Revenue Generated"
              value={75000}
              prefix={<FiDollarSign />}
              suffix="USD"
              valueStyle={{ color: "white" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-white">
            <Statistic
              title="Average Delivery Time"
              value={15}
              suffix="mins"
              prefix={<FiClock />}
              valueStyle={{ color: "white" }}
            />
          </Card>
        </Col>
      </Row>

      {/* Charts and Recent Transactions */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card title="Revenue Trend">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3498db"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Recent Orders">
            <List
              itemLayout="horizontal"
              dataSource={[
                { id: 1, customer: "John Doe", date: "2024-12-05", status: "Delivered" },
                { id: 2, customer: "Jane Smith", date: "2024-12-05", status: "In Transit" },
                { id: 3, customer: "Alex Johnson", date: "2024-12-04", status: "Pending" },
              ]}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={<FiPackage />} />}
                    title={item.customer}
                    description={`Date: ${item.date} | Status: ${item.status}`}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
