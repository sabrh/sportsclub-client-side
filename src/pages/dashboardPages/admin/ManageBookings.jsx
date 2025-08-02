import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const ManageBookings = () => {
  const axiosSecure = useAxiosSecure();

  const { data: pendingBookings = [], isLoading, refetch } = useQuery({
    queryKey: ['pendingBookings'],
    queryFn: async () => {
      const res = await axiosSecure.get('/bookings/pending');
      return res.data;
    }
  });

  const handleApprove = async (booking) => {
    try {
      const res = await axiosSecure.patch(`/bookings/approve/${booking._id}`, {
        userEmail: booking.userEmail,
      });

      if (res.data.modifiedCount > 0) {
        Swal.fire('Approved!', 'Booking approved and user is now a member.', 'success');
        refetch();
      }
    } catch (error) {
      Swal.fire('Error', error.message || 'Failed to approve booking', 'error');
    }
  };

  const handleReject = async (bookingId) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to reject this booking?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Reject',
      cancelButtonText: 'No, Cancel'
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/bookings/${bookingId}`);
        if (res.data.deletedCount > 0) {
          Swal.fire('Rejected!', 'Booking has been rejected and deleted.', 'success');
          refetch();
        }
      } catch (error) {
        Swal.fire('Error', error.message || 'Failed to reject booking', 'error');
      }
    }
  };

  if (isLoading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Manage pending Bookings</h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Email</th>
              <th>Court</th>
              <th>Date</th>
              <th>Slots</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingBookings.length > 0 ? (
              pendingBookings.map((booking) => (
                <tr key={booking._id}>
                  <td>{booking.userEmail}</td>
                  <td>{booking.courtType}</td>
                  <td>{new Date(booking.date).toLocaleDateString()}</td>
                  <td>{booking.selectedSlots.join(', ')}</td>
                  <td>BDT.{booking.price}</td>
                  <td>
                    <span className="badge badge-warning">Pending</span>
                  </td>
                  <td className="space-x-2">
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => handleApprove(booking)}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-error btn-sm"
                      onClick={() => handleReject(booking._id)}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No pending bookings
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBookings;