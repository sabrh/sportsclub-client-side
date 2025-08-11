import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const {id} = useParams();   
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const [error, setError] =useState('');

    const { isPending, data: bookingInfo={} } = useQuery({
        queryKey: ['bookings', id],
        queryFn: async () => {
        const res = await axiosSecure.get(`/bookings/${id}`);
        //console.log('Booking Info Response:', res.data);  
        return res.data;
        }
    })

    if (isPending){
        return <span className="loading loading-spinner loading-xl"></span>;
    }

    const amount = bookingInfo.price;
    const amountInPoisa = amount*100;

    const handleSubmit = async (e) =>{
        e.preventDefault();
        if (!stripe || !elements){
            return;
        }

        const card = elements.getElement(CardElement);

        if (!card){
            return;
        }

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error){
            setError(error.message);
        }
        else{
            setError('');
            //console.log('payment method', paymentMethod)
        }

        // create payment intent
        const res = await axiosSecure.post('/create-payment-intent', {
            amountInPoisa,
            id
        })

        const clientSecret = res.data.clientSecret;
        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: user.displayName,
                    email: user.email
                }
            }
        })

        if (result.error){
            setError(result.error.message)
        } else{
            setError('');
            if (result.paymentIntent.status === 'succeeded') {
                //console.log('Payment succeeded!')
                const transactionId=result.paymentIntent.id;
                const paymentData = {
                    id, 
                    email: user.email,
                    amount, 
                    transactionId: transactionId,
                    paymentMethod: result.paymentIntent.payment_method_types,
                }

                const paymentRes = await axiosSecure.post('/payments', paymentData);
                if(paymentRes.data.insertedId){
                    await Swal.fire({
                        icon: 'success',
                        title: 'Payment Successful !', 
                        html: `<strong>Transaction ID:</strong> <code>${transactionId}</code>`,
                        confirmButtonText: 'Go to My Bookings',
                    })

                    navigate('/dashboard/bookings');
                }
            }
        }       
    }

  return (
    <div className="w-full max-w-md mx-auto p-6 rounded-xl shadow-md bg-base-100">
        <h2 className="text-xl font-semibold mb-4 text-center">Complete Payment</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
        <div>
            <label className="label">Email</label>
            <input
            type="text"
            readOnly
            value={user.email}
            className="input input-bordered w-full"
            />
        </div>
        <div>
            <label className="label">Court Type</label>
            <input
            type="text"
            readOnly
            value={bookingInfo?.courtType || 'N/A'}
            className="input input-bordered w-full"
            />
        </div>
        <div>
            <label className="label">Slots</label>
            <input
            type="text"
            readOnly
            value={bookingInfo?.selectedSlots?.join(', ') || 'N/A'}
            className="input input-bordered w-full"
            />
        </div>
        <div>
            <label className="label">Price</label>
            <input
            type="text"
            readOnly
            value={`BDT ${bookingInfo?.price}`}
            className="input input-bordered w-full"
            />
        </div>
        <div>
            <label className="label">Date</label>
            <input
            type="text"
            readOnly
            value={bookingInfo?.date ? new Date(bookingInfo.date).toLocaleDateString() : 'N/A'}
            className="input input-bordered w-full"
            />
        </div>

        <div>
            <label className="label">Card Details</label>
            <div className="p-2 border rounded">
            <CardElement />
            </div>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={!stripe}
        >
            Pay BDT {amount}
        </button>
        </form>
    </div>
);

};

export default PaymentForm;
