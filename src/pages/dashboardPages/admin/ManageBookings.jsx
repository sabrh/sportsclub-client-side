import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

const ManageBookings = () => {
  const [statusFilter, setStatusFilter] = useState('pending');
  
  const { data: bookings, isLoading, refetch } = useQuery({
    queryKey: ['bookings', 'admin'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:3000/bookings');
      return res.data;
    }
  });

  const handleUpdateStatus = async (id, status) => {
    try {
      await axios.patch(`http://localhost:3000/bookings/${id}`, { status });
      refetch();
    } catch (error) {
      console.error('Failed to update booking:', error);
    }
  };

  const filteredBookings = bookings?.filter(booking => 
    statusFilter === 'all' ? true : booking.status === statusFilter
  );

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Manage Bookings</h2>
      
      <div className="flex justify-between items-center mb-6">
        <div className="tabs">
          <button 
            className={`tab ${statusFilter === 'pending' ? 'tab-active' : ''}`}
            onClick={() => setStatusFilter('pending')}
          >
            Pending
          </button>
          <button 
            className={`tab ${statusFilter === 'approved' ? 'tab-active' : ''}`}
            onClick={() => setStatusFilter('approved')}
          >
            Approved
          </button>
          <button 
            className={`tab ${statusFilter === 'confirmed' ? 'tab-active' : ''}`}
            onClick={() => setStatusFilter('confirmed')}
          >
            Confirmed
          </button>
          <button 
            className={`tab ${statusFilter === 'all' ? 'tab-active' : ''}`}
            onClick={() => setStatusFilter('all')}
          >
            All
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>User</th>
              <th>Court</th>
              <th>Date</th>
              <th>Slots</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings?.length > 0 ? (
              filteredBookings.map(booking => (
                <tr key={booking._id}>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="avatar">
                        <div className="w-8 rounded-full">
                          <img src={booking.userImage || '/default-user.png'} alt={booking.userName} />
                        </div>
                      </div>
                      <div>
                        <p>{booking.userName}</p>
                        <p className="text-xs text-gray-500">{booking.userEmail}</p>
                      </div>
                    </div>
                  </td>
                  <td>{booking.courtType}</td>
                  <td>{new Date(booking.date).toLocaleDateString()}</td>
                  <td>{booking.selectedSlots.join(', ')}</td>
                  <td>${booking.price}</td>
                  <td>
                    <span className={`badge ${
                      booking.status === 'pending' ? 'badge-warning' :
                      booking.status === 'approved' ? 'badge-info' :
                      'badge-success'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                  <td>
                    {booking.status === 'pending' && (
                      <div className="flex gap-2">
                        <button 
                          className="btn btn-success btn-sm"
                          onClick={() => handleUpdateStatus(booking._id, 'approved')}
                        >
                          Approve
                        </button>
                        <button 
                          className="btn btn-error btn-sm"
                          onClick={() => handleUpdateStatus(booking._id, 'rejected')}
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">No bookings found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBookings;