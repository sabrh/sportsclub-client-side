import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const ManageMembers = () => {
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState('');

  const fetchMembers = () => {
    axios.get('/members')
      .then(res => setMembers(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/members/${id}`)
          .then(() => {
            Swal.fire('Deleted!', 'Member has been removed.', 'success');
            fetchMembers();
          })
          .catch(() => Swal.fire('Error', 'Failed to delete member', 'error'));
      }
    });
  };

  const filtered = members.filter(member =>
    member.name?.toLowerCase().includes(search.toLowerCase()) ||
    member.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Members</h2>

      <input
        type="text"
        placeholder="Search by name or email"
        className="border px-3 py-2 mb-4 w-full max-w-md"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-100">
              <th>Name</th>
              <th>Email</th>
              <th>Joined At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(member => (
              <tr key={member._id}>
                <td>{member.name || 'N/A'}</td>
                <td>{member.email}</td>
                <td>{new Date(member.memberSince).toLocaleDateString()}</td>
                <td>
                  <Button onClick={() => handleDelete(member._id)} variant="destructive">Remove</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageMembers;
