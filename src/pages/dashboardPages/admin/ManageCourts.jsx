import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const ManageCourts = () => {
  const [courts, setCourts] = useState([]);
  const [newCourt, setNewCourt] = useState({ type: '', price: '', image: '' });

  const fetchCourts = () => {
    axios.get('/courts')
      .then(res => setCourts(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchCourts();
  }, []);

  const handleDelete = (id) => {
    axios.delete(`/courts/${id}`)
      .then(() => {
        Swal.fire('Deleted', 'Court removed successfully', 'success');
        fetchCourts();
      })
      .catch(() => Swal.fire('Error', 'Failed to delete court', 'error'));
  };

  const handleAdd = () => {
    if (!newCourt.type || !newCourt.price || !newCourt.image) return;
    axios.post('/courts', newCourt)
      .then(() => {
        Swal.fire('Added', 'Court added successfully', 'success');
        setNewCourt({ type: '', price: '', image: '' });
        fetchCourts();
      })
      .catch(() => Swal.fire('Error', 'Failed to add court', 'error'));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Courts</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Court Type"
          className="border p-2 mr-2"
          value={newCourt.type}
          onChange={(e) => setNewCourt({ ...newCourt, type: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          className="border p-2 mr-2"
          value={newCourt.price}
          onChange={(e) => setNewCourt({ ...newCourt, price: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL"
          className="border p-2 mr-2"
          value={newCourt.image}
          onChange={(e) => setNewCourt({ ...newCourt, image: e.target.value })}
        />
        <Button onClick={handleAdd}>Add Court</Button>
      </div>

      <table className="table w-full">
        <thead>
          <tr className="bg-gray-100">
            <th>Type</th>
            <th>Price</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {courts.map(court => (
            <tr key={court._id}>
              <td>{court.type}</td>
              <td>${court.price}</td>
              <td><img src={court.image} alt={court.type} className="w-20 h-12 object-cover" /></td>
              <td>
                <Button onClick={() => handleDelete(court._id)} variant="destructive">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageCourts;
