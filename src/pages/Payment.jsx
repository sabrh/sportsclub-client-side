import { useLoaderData, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const PaymentPage = () => {
  const booking = useLoaderData();
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const navigate = useNavigate();

  const priceAfterDiscount = booking.price - (booking.price * discount / 100);

  const applyCoupon = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/coupons/${couponCode}`);
      setDiscount(res.data.discount);
      Swal.fire('Coupon applied!', `You saved ${res.data.discount}%`, 'success');
    } catch {
      Swal.fire('Invalid coupon', '', 'error');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payment = {
      bookingId: booking._id,
      email: booking.userEmail,
      courtType: booking.courtType,
      slots: booking.selectedSlots,
      price: priceAfterDiscount,
      date: booking.date,
      paidAt: new Date()
    };
    await axios.post('http://localhost:3000/payments', payment);
    Swal.fire('Payment successful!', '', 'success');
    navigate('/dashboard/bookings');
  };

   return (
    <div className="p-6 bg-white max-w-lg mx-auto rounded-lg">
      <h2 className="text-xl font-bold mb-4">Complete Payment</h2>
      <div className="flex mb-4 gap-2">
        <input className="border px-2 py-1 rounded w-full" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} placeholder="Enter coupon code" />
        <button onClick={applyCoupon} className="btn btn-sm btn-outline">Apply</button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="w-full border p-2 rounded" value={booking.userEmail} readOnly />
        <input className="w-full border p-2 rounded" value={booking.courtType} readOnly />
        <input className="w-full border p-2 rounded" value={booking.selectedSlots.join(', ')} readOnly />
        <input className="w-full border p-2 rounded" value={booking.date} readOnly />
        <input className="w-full border p-2 rounded" value={`BDT ${priceAfterDiscount}`} readOnly />
        <button type="submit" className="btn btn-primary w-full">Pay</button>
      </form>
    </div>
  );
};

export default PaymentPage;