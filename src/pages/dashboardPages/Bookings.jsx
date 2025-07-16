import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { useState } from 'react';
import { NavLink } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Bookings = () => {
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState('pending');
  
  const { data: bookings, isLoading, refetch } = useQuery({
    queryKey: ['bookings', user?.email],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/bookings?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email
  });

const handleCancelBooking = async (id) => {
  const confirm = await Swal.fire({
    title: 'Are you sure?',
    text: 'Do you want to cancel this booking?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Cancel!',
    cancelButtonText: 'Keep'
  });

  if (confirm.isConfirmed) {
    try {
      await axios.delete(`http://localhost:3000/bookings/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}` // Optional, for future JWT use
        }
      });
      Swal.fire('Cancelled!', 'Your booking has been cancelled.', 'success');
      refetch(); // refresh the list
    } catch (error) {
      console.error('Failed to cancel booking:', error);
      Swal.fire('Error', error.response?.data?.message || 'Failed to cancel booking', 'error');
    }
  }
};


  const handlePayment = (id) => {
    // Navigate to payment page
  };

  const filteredBookings = bookings?.filter(booking => 
    activeTab === 'pending' ? booking.status === 'pending' : 
    activeTab === 'approved' ? booking.status === 'approved' : 
    booking.status === 'confirmed'
  );

  if (isLoading) return <span className="loading loading-spinner loading-xl"></span>;

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">My Bookings</h2>
      
      <div className="tabs mb-6">
        <button 
          className={`tab ${activeTab === 'pending' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('pending')}
        >
          Pending
        </button>
        {user?.role === 'member' && (
          <>
            <button 
              className={`tab ${activeTab === 'approved' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('approved')}
            >
              Approved
            </button>
            <button 
              className={`tab ${activeTab === 'confirmed' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('confirmed')}
            >
              Confirmed
            </button>
          </>
        )}
      </div>
      
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
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
                      <button 
                        className="btn btn-error btn-sm"
                        onClick={() => handleCancelBooking(booking._id)}
                      >
                        Cancel
                      </button>
                    )}
                    {booking.status === 'approved' && user?.role === 'member' && (
                      <NavLink to='/payment/:id'>
                        <button 
                        className="btn btn-primary btn-sm"
                        onClick={() => handlePayment(booking._id)}
                      >
                        Pay Now
                      </button>
                      </NavLink>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">No bookings found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bookings;