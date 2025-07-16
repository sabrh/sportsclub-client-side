import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const MakeAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [newAnnounce, setNewAnnounce] = useState('');

  const fetchAnnouncements = () => {
    axios.get('/announcements')
      .then(res => setAnnouncements(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleAdd = () => {
    axios.post('/announcements', { message: newAnnounce })
      .then(() => {
        Swal.fire('Success', 'Announcement added', 'success');
        setNewAnnounce('');
        fetchAnnouncements();
      })
      .catch(() => Swal.fire('Error', 'Failed to add announcement', 'error'));
  };

  const handleDelete = (id) => {
    axios.delete(`/announcements/${id}`)
      .then(() => {
        Swal.fire('Deleted!', 'Announcement removed', 'success');
        fetchAnnouncements();
      })
      .catch(() => Swal.fire('Error', 'Failed to delete', 'error'));
  };

  const handleUpdate = (id, oldMessage) => {
    Swal.fire({
      title: 'Update Announcement',
      input: 'text',
      inputValue: oldMessage,
      showCancelButton: true,
      confirmButtonText: 'Update'
    }).then(result => {
      if (result.isConfirmed && result.value) {
        axios.patch(`/announcements/${id}`, { message: result.value })
          .then(() => {
            Swal.fire('Updated!', 'Announcement updated', 'success');
            fetchAnnouncements();
          })
          .catch(() => Swal.fire('Error', 'Failed to update', 'error'));
      }
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Make Announcements</h2>

      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Enter announcement message"
          className="border px-3 py-2 w-full"
          value={newAnnounce}
          onChange={e => setNewAnnounce(e.target.value)}
        />
        <Button onClick={handleAdd}>Add</Button>
      </div>

      <ul className="space-y-2">
        {announcements.map(a => (
          <li key={a._id} className="border p-3 flex justify-between items-center">
            <span>{a.message}</span>
            <div className="space-x-2">
              <Button size="sm" onClick={() => handleUpdate(a._id, a.message)}>Update</Button>
              <Button size="sm" variant="destructive" onClick={() => handleDelete(a._id)}>Delete</Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MakeAnnouncements;
