import { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const ManageMembers = () => {
  const axiosSecure = useAxiosSecure();
  const [members, setMembers] = useState([]);
  const [searchText, setSearchText] = useState('');

  const fetchMembers = async (name = '') => {
    try {
      const res = await axiosSecure.get(`/members?name=${name}`);
      setMembers(res.data);
    } catch (error) {
      console.error('Failed to fetch members:', error);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleSearch = () => {
    fetchMembers(searchText);
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to remove this member?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/members/${id}`);
        if (res.data.deletedCount) {
          Swal.fire('Deleted!', 'Member has been removed.', 'success');
          fetchMembers(searchText);
        }
      } catch (error) {
        console.error('Failed to delete member:', error);
        Swal.fire('Error', 'Failed to delete member', 'error');
      }
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Manage Members</h2>

      <div className="flex mb-4 gap-2">
        <input 
          type="text" 
          placeholder="Search by name..." 
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
              <th>Joined</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {members.length > 0 ? (
              members.map(member => (
                <tr key={member._id}>
                  <td>{member.userName}</td>
                  <td>{member.userEmail}</td>
                  <td>{new Date(member.date).toLocaleDateString()}</td>
                  <td>
                    <button 
                      className="btn btn-error btn-sm"
                      onClick={() => handleDelete(member._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4">No members found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageMembers;