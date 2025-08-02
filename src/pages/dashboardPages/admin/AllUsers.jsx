import { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState('');

  const fetchUsers = async (query = '') => {
    try {
      const res = await axiosSecure.get(`/all-users?search=${query}`);
      setUsers(res.data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = () => {
    fetchUsers(searchText);
  };

  return (
    <div className="p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">All Users (via Bookings)</h2>

      <div className="flex mb-4 gap-2">
        <input 
          type="text" 
          placeholder="Search by name or email..." 
          className="input input-bordered w-full max-w-sm"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSearch}>Search</button>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Registered At</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map(user => (
                <tr key={user.email}>
                  <td>{user.name || '—'}</td>
                  <td>{user.email}</td>
                  <td>{user.registeredAt ? new Date(user.registeredAt).toLocaleDateString() : '—'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;