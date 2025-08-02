import React from "react";
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from "@tanstack/react-query";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const formatDate = (iso) => new Date(iso).toLocaleString();

  const { isPending, data: payments = [] } = useQuery({
    queryKey: ['payments', user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    }
  });

  if (isPending) {
    return <span className="loading loading-spinner loading-xl"></span>;
  }

  return (
    <div className="overflow-x-auto shadow-md rounded-xl">
      <table className="table table-zebra w-full">
        <thead className="bg-base-200 text-base font-semibold">
          <tr>
            <th>#</th>
            <th>Booking ID</th>
            <th>Email</th>
            <th>Amount</th>
            <th>Method</th>
            <th>Transaction</th>
            <th>Paid At</th>
          </tr>
        </thead>
        <tbody>
          {payments?.length > 0 ? (
            payments.map((p, index) => (
              <tr key={p.transactionId}>
                <td>{index + 1}</td>
                <td title={p.id}>{p.id}</td>
                <td>{p.email}</td>
                <td>BDT. {p.amount}</td>
                <td className="capitalize">{p.paymentMethod}</td>
                <td className="font-mono text-sm"><span>{p.transactionId}</span></td>
                <td>{formatDate(p.paid_at_string)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center text-gray-500 py-6">
                No Payment History Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
