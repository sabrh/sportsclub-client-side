import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';
import axios from 'axios';

const PaymentForm = ({ booking }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');
  const [error, setError] = useState('');
  const [transactionId, setTransactionId] = useState('');

  useEffect(() => {
    // Get client secret from backend
    axios.post('/create-payment-intent', { price: booking.price })
      .then(res => setClientSecret(res.data.clientSecret));
  }, [booking]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      setError(error.message);
      return;
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          email: booking.email,
        },
      },
    });

    if (confirmError) {
      setError(confirmError.message);
      return;
    }

    if (paymentIntent.status === 'succeeded') {
      setTransactionId(paymentIntent.id);
      // Save to DB
      axios.post('/payments', {
        email: booking.email,
        bookingId: booking._id,
        courtType: booking.courtType,
        date: booking.date,
        slots: booking.slots,
        price: booking.price,
        transactionId: paymentIntent.id,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>Pay</button>
      {error && <p className="text-red-500">{error}</p>}
      {transactionId && <p className="text-green-500">Payment successful! ID: {transactionId}</p>}
    </form>
  );
};

export default PaymentForm;
