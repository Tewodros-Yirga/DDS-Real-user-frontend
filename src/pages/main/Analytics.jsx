import React from "react";
import { Card, Row, Col, DatePicker } from "antd";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const data = [
  { name: "Jan", uv: 4000, pv: 2400 },
  { name: "Feb", uv: 3000, pv: 1398 },
  { name: "Mar", uv: 2000, pv: 9800 },
  { name: "Apr", uv: 2780, pv: 3908 },
  { name: "May", uv: 1890, pv: 4800 },
];

const COLORS = ["#3498db", "#2ecc71", "#f1c40f", "#e74c3c"];

const Analytics = () => {
  return (
    <div
      className="p-6 bg-gray-50 custom-scrollbar dashboard-container"
      style={{ overflowY: "auto", height: "calc(100vh - 64px)" }} // Add this style
    >
      <Row gutter={[16, 16]}>
        {/* Top Two Charts */}
        <Col xs={24} lg={12}>
          <Card title="Sales Trend">
            <div style={{ height: "200px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="Monthly Revenue">
            <div style={{ height: "200px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="pv" fill="#2ecc71" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>

        {/* Bottom Row: Pie Chart and Date Filter */}
        <Col xs={24} lg={12}>
          <Card title="Revenue Distribution">
            <div style={{ height: "200px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    dataKey="uv"
                    cx="50%"
                    cy="50%"
                    outerRadius={70}
                    label
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="Filter by Date">
            <DatePicker.RangePicker style={{ width: "100%" }} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Analytics;