import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = () => {
    axios.get('/pending-bookings')
      .then(res => setBookings(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleAction = (id, status) => {
    axios.patch(`/bookings/${id}`, { status })
      .then(() => {
        Swal.fire('Success', `Booking ${status}`, 'success');
        fetchBookings();
      })
      .catch(() => Swal.fire('Error', 'Could not update booking', 'error'));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Pending Bookings</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-100">
              <th>User</th>
              <th>Court</th>
              <th>Date</th>
              <th>Slots</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(b => (
              <tr key={b._id}>
                <td>{b.userEmail}</td>
                <td>{b.courtType}</td>
                <td>{b.date}</td>
                <td>{b.slots.join(', ')}</td>
                <td>${b.price}</td>
                <td className="space-x-2">
                  <Button onClick={() => handleAction(b._id, 'approved')} size="sm" className="bg-green-500 hover:bg-green-600">Accept</Button>
                  <Button onClick={() => handleAction(b._id, 'rejected')} size="sm" variant="destructive">Reject</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBookings;

