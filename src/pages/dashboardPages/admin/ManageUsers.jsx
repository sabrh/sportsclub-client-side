import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import Swal from 'sweetalert2';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    axios.get('/users')
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const promote = (email, role) => {
    axios.patch(`/users/${email}`, { role })
      .then(() => {
        Swal.fire('Success', `${email} promoted to ${role}`, 'success');
        fetchUsers();
      })
      .catch(() => Swal.fire('Error', 'Promotion failed', 'error'));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-100">
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Promote</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.name || 'N/A'}</td>
                <td>{user.email}</td>
                <td>{user.role || 'user'}</td>
                <td className="space-x-2">
                  <Button onClick={() => promote(user.email, 'admin')} size="sm" className="bg-blue-500">Make Admin</Button>
                  <Button onClick={() => promote(user.email, 'member')} size="sm" className="bg-green-500">Make Member</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
