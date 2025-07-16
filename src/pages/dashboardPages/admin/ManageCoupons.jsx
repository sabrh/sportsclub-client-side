import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const ManageCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [form, setForm] = useState({ code: '', discount: '' });

  const fetchCoupons = () => {
    axios.get('/coupons')
      .then(res => setCoupons(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleAdd = () => {
    axios.post('/coupons', form)
      .then(() => {
        Swal.fire('Success', 'Coupon added', 'success');
        setForm({ code: '', discount: '' });
        fetchCoupons();
      })
      .catch(() => Swal.fire('Error', 'Failed to add coupon', 'error'));
  };

  const handleDelete = (id) => {
    axios.delete(`/coupons/${id}`)
      .then(() => {
        Swal.fire('Deleted!', 'Coupon removed', 'success');
        fetchCoupons();
      })
      .catch(() => Swal.fire('Error', 'Failed to delete coupon', 'error'));
  };

  const handleUpdate = (id, discount) => {
    Swal.fire({
      title: 'Update Discount',
      input: 'number',
      inputValue: discount,
      showCancelButton: true,
      confirmButtonText: 'Update'
    }).then(result => {
      if (result.isConfirmed && result.value) {
        axios.patch(`/coupons/${id}`, { discount: result.value })
          .then(() => {
            Swal.fire('Updated!', 'Coupon discount updated', 'success');
            fetchCoupons();
          })
          .catch(() => Swal.fire('Error', 'Failed to update coupon', 'error'));
      }
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Coupons</h2>

      <div className="mb-4 flex gap-2 flex-wrap">
        <input
          type="text"
          placeholder="Coupon Code"
          value={form.code}
          onChange={e => setForm({ ...form, code: e.target.value })}
          className="border px-3 py-2"
        />
        <input
          type="number"
          placeholder="Discount %"
          value={form.discount}
          onChange={e => setForm({ ...form, discount: e.target.value })}
          className="border px-3 py-2"
        />
        <Button onClick={handleAdd}>Add Coupon</Button>
      </div>

      <table className="table w-full">
        <thead>
          <tr className="bg-gray-100">
            <th>Code</th>
            <th>Discount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map(coupon => (
            <tr key={coupon._id}>
              <td>{coupon.code}</td>
              <td>{coupon.discount}%</td>
              <td className="space-x-2">
                <Button onClick={() => handleUpdate(coupon._id, coupon.discount)} size="sm" className="bg-blue-500">Update</Button>
                <Button onClick={() => handleDelete(coupon._id)} size="sm" variant="destructive">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageCoupons;
