import { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const ManageCourts = () => {
  const axiosSecure = useAxiosSecure();
  const [courts, setCourts] = useState([]);
  const [form, setForm] = useState({ name: '', location: '', type: '', price: '' });
  const [editId, setEditId] = useState(null);

  const fetchCourts = async () => {
    const res = await axiosSecure.get('/admin/courts');
    setCourts(res.data);
  };

  useEffect(() => {
    fetchCourts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { type, price } = form;

    if (!type || !price) {
      Swal.fire('Error', 'All fields are required.', 'error');
      return;
    }

    try {
      if (editId) {
        await axiosSecure.patch(`/admin/courts/${editId}`, form);
        Swal.fire('Updated!', 'Court updated successfully.', 'success');
      } else {
        await axiosSecure.post('/admin/courts', form);
        Swal.fire('Added!', 'New court added successfully.', 'success');
      }
      fetchCourts();
      setForm({ type: '', price: '' });
      setEditId(null);
    } catch (err) {
        Swal.fire('Error', err.response?.data?.message || 'Something went wrong.', 'error');
      }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'This court will be deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
    });

    if (confirm.isConfirmed) {
      await axiosSecure.delete(`/admin/courts/${id}`);
      Swal.fire('Deleted!', 'Court has been deleted.', 'success');
      fetchCourts();
    }
  };

  const handleEdit = (court) => {
    setForm(court);
    setEditId(court._id);
  };

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Manage Courts</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          placeholder="Court Type"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          className="input input-bordered"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="input input-bordered"
          required
        />

        <button type="submit" className="btn btn-primary">
          {editId ? 'Update Court' : 'Add Court'}
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Court Type</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courts.length > 0 ? (
              courts.map((court) => (
                <tr key={court._id}>
                  <td>{court.type}</td>
                  <td>BDT {court.price}</td>
                  <td>
                    <button className="btn btn-sm btn-info mr-2" onClick={() => handleEdit(court)}>
                      Edit
                    </button>
                    <button className="btn btn-sm btn-error" onClick={() => handleDelete(court._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No courts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCourts;