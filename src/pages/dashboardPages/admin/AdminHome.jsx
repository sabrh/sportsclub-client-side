import { useEffect, useState } from 'react';
import axios from 'axios';

const AdminHome = () => {
  const [summary, setSummary] = useState({
    totalCourts: 0,
    totalUsers: 0,
    totalMembers: 0
  });

  useEffect(() => {
    axios.get('/admin-summary')
      .then(res => setSummary(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Welcome, Admin 👋</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-blue-100 shadow-xl">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-blue-700">Total Courts</h3>
            <p className="text-4xl font-bold">{summary.totalCourts}</p>
          </CardContent>
        </Card>

        <Card className="bg-green-100 shadow-xl">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-green-700">Total Users</h3>
            <p className="text-4xl font-bold">{summary.totalUsers}</p>
          </CardContent>
        </Card>

        <Card className="bg-purple-100 shadow-xl">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-purple-700">Total Members</h3>
            <p className="text-4xl font-bold">{summary.totalMembers}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminHome;
