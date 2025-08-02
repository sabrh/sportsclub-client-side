import { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const MakeAnnouncement = () => {
  const axiosSecure = useAxiosSecure();
  const [announcements, setAnnouncements] = useState([]);
  const [form, setForm] = useState({ title: '', message: '', date: '' });
  const [editId, setEditId] = useState(null);

  const fetchAnnouncements = async () => {
    const res = await axiosSecure.get('/announcements');
    setAnnouncements(res.data);
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axiosSecure.patch(`/announcements/${editId}`, form);
        Swal.fire('Updated!', 'Announcement updated successfully.', 'success');
      } else {
        await axiosSecure.post('/announcements', form);
        Swal.fire('Created!', 'Announcement added successfully.', 'success');
      }
      fetchAnnouncements();
      setForm({ title: '', message: '', date: '' });
      setEditId(null);
    } catch (err) {
        Swal.fire('Error', err.response?.data?.message || 'Something went wrong.', 'error');
      }

  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'This announcement will be deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
    });

    if (confirm.isConfirmed) {
      await axiosSecure.delete(`/announcements/${id}`);
      Swal.fire('Deleted!', 'Announcement deleted.', 'success');
      fetchAnnouncements();
    }
  };

  const handleEdit = (announcement) => {
    setForm(announcement);
    setEditId(announcement._id);
  };

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Make Announcement</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="input input-bordered"
          required
        />
        <input
          type="text"
          placeholder="Message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="input input-bordered"
          required
        />
        <input
          type="datetime-local"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="input input-bordered"
          required
        />
        <button type="submit" className="btn btn-primary col-span-full">
          {editId ? 'Update Announcement' : 'Add Announcement'}
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Message</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {announcements.map((a) => (
              <tr key={a._id}>
                <td>{a.title}</td>
                <td>{a.message}</td>
                <td>{new Date(a.date).toLocaleString()}</td>
                <td>
                  <button className="btn btn-sm btn-info mr-2" onClick={() => handleEdit(a)}>
                    Edit
                  </button>
                  <button className="btn btn-sm btn-error" onClick={() => handleDelete(a._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MakeAnnouncement;