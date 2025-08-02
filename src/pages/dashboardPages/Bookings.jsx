import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Bookings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [activeTab, setActiveTab] = useState('all');
  
  const { data: bookings, isLoading, refetch } = useQuery({
    queryKey: ['bookings', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`http://localhost:3000/bookings?email=${user?.email}`);
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
      
      axiosSecure.delete(`http://localhost:3000/bookings/${id}`)
          .then(res => {
            if (res.data.deletedCount) {
              Swal.fire('Cancelled!', 'Your booking has been cancelled.', 'success');
              refetch(); 
            }
          })
      // refresh the list
    } catch (error) {
      console.error('Failed to cancel booking:', error);
      Swal.fire('Error', error.response?.data?.message || 'Failed to cancel booking', 'error');
    }
  }
};


  const navigate = useNavigate();

  const handlePayment = (id) => {
    navigate(`/dashboard/payment/${id}`);
  };


  const filteredBookings = bookings?.filter(booking => 
  activeTab === 'all' ? true :
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
        className={`tab ${activeTab === 'all' ? 'tab-active' : ''}`}
        onClick={() => setActiveTab('all')}
      >
        All
      </button>
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
                  <td>BDT.{booking.price}</td>
                 <td>
                  <span className={`badge ${
                    booking.payment_status === 'paid' ? 'badge-success' :
                    booking.status === 'approved' ? 'badge-info' :
                    'badge-warning'
                  }`}>
                    {booking.payment_status === 'paid' ? 'confirmed' : booking.status}
                  </span>
                </td>

                 <td>
                  {booking.payment_status === 'paid' ? (
                    <span className="text-green-600 font-semibold">Paid</span>
                  ) : booking.status === 'approved' ? (
                    <button 
                      className="btn btn-primary btn-sm"
                      onClick={() => handlePayment(booking._id)}
                    >
                      Pay Now
                    </button>
                    ) : booking.status === 'pending' ? (
                      <button 
                        className="btn btn-error btn-sm"
                        onClick={() => handleCancelBooking(booking._id)}
                      >
                        Cancel
                      </button>
                    ) : null}
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