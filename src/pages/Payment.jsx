import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import useAuth from '../hooks/useAuth';
import { useState } from 'react';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const PaymentForm = ({ booking, setDiscount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    
    setProcessing(true);
    setError(null);
    
    try {
      // Create payment intent
      const { data: { clientSecret } } = await axios.post('http://localhost:3000/create-payment-intent', {
        price: booking.price - (booking.discount || 0)
      });
      
      // Confirm payment
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        }
      });
      
      if (stripeError) {
        setError(stripeError.message);
        setProcessing(false);
        return;
      }
      
      if (paymentIntent.status === 'succeeded') {
        // Save payment to database
        await axios.post('http://localhost:3000/payments', {
          bookingId: booking._id,
          amount: paymentIntent.amount / 100,
          transactionId: paymentIntent.id,
          date: new Date().toISOString(),
          status: 'completed'
        });
        
        alert('Payment successful!');
        window.location.href = '/dashboard/bookings';
      }
    } catch (err) {
      setError(err.message);
      setProcessing(false);
    }
  };
  
  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    const couponCode = e.target.coupon.value;
    if (!couponCode) return;
    
    try {
      const { data: coupon } = await axios.get(`http://localhost:3000/coupons/${couponCode}`);
      if (coupon) {
        setDiscount(coupon.discount);
      } else {
        setError('Invalid coupon code');
      }
    } catch (err) {
      setError('Failed to apply coupon');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Payment Details</h2>
      
      <div className="mb-6">
        <h3 className="font-medium mb-2">Booking Summary</h3>
        <p>Court: {booking.courtType}</p>
        <p>Date: {new Date(booking.date).toLocaleDateString()}</p>
        <p>Slots: {booking.selectedSlots.join(', ')}</p>
        <p>Original Price: ${booking.price}</p>
        {booking.discount > 0 && <p>Discount: -${booking.discount}</p>}
        <p className="font-bold">Total: ${booking.price - (booking.discount || 0)}</p>
      </div>
      
      <form onSubmit={handleApplyCoupon} className="mb-4">
        <div className="flex gap-2">
          <input 
            type="text" 
            name="coupon" 
            placeholder="Coupon Code" 
            className="flex-1 input input-bordered" 
          />
          <button type="submit" className="btn btn-primary">Apply</button>
        </div>
      </form>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <CardElement className="p-2 border rounded" />
        </div>
        
        {error && <div className="text-red-500 mb-4">{error}</div>}
        
        <button 
          type="submit" 
          className="btn btn-primary w-full"
          disabled={!stripe || processing}
        >
          {processing ? 'Processing...' : `Pay $${booking.price - (booking.discount || 0)}`}
        </button>
      </form>
    </div>
  );
};

const Payment = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [discount, setDiscount] = useState(0);
  
  const { data: booking, isLoading } = useQuery({
    queryKey: ['booking', id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/bookings/${id}`);
      return res.data;
    }
  });

  if (isLoading) return <div>Loading...</div>;
  if (!booking || booking.userEmail !== user?.email) return <div>Invalid booking</div>;
  if (booking.status !== 'approved') return <div>This booking is not eligible for payment</div>;

  return (
    <div className="container mx-auto py-8">
      <Elements stripe={stripePromise}>
        <PaymentForm booking={{ ...booking, discount }} setDiscount={setDiscount} />
      </Elements>
    </div>
  );
};

export default Payment;