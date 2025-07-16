import React from "react";

const Dashboard = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Upcoming Bookings</h3>
          <p className="text-3xl font-bold">7</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Pending Approvals</h3>
          <p className="text-3xl font-bold"></p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Recent Payments</h3>
          <p className="text-3xl font-bold">BDT.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;