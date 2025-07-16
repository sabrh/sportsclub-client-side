import React, { useState, useContext } from "react";
import axios from "axios";
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../context/AuthContext'; 

const PaymentHistory = () => {
  const { user } = useContext(AuthContext);
  const [layout, setLayout] = useState('table');

  const { data: payments = [] } = useQuery(['payments', user?.email], async () => {
    const res = await axios.get(`/payments/${user.email}`);
    return res.data;
  });

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <button onClick={() => setLayout('card')} className="btn">Card View</button>
        <button onClick={() => setLayout('table')} className="btn">Table View</button>
      </div>

      {layout === 'table' ? (
        <table className="table">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Date</th>
              <th>Price</th>
              <th>Court Type</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(p => (
              <tr key={p._id}>
                <td>{p.transactionId}</td>
                <td>{p.date}</td>
                <td>৳{p.price}</td>
                <td>{p.courtType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {payments.map(p => (
            <div key={p._id} className="p-4 shadow-lg border rounded-md">
              <h2 className="text-lg font-semibold">{p.courtType}</h2>
              <p>Date: {p.date}</p>
              <p>Price: ৳{p.price}</p>
              <p>Txn ID: {p.transactionId}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
