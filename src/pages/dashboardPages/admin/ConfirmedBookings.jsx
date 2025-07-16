import { useEffect, useState } from 'react';
import axios from 'axios';

const ConfirmedBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get('/confirmed-bookings')
      .then(res => setBookings(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Confirmed Bookings</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Court Type</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Slots</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((b) => (
            <TableRow key={b._id}>
              <TableCell>{b.courtType}</TableCell>
              <TableCell>{b.email}</TableCell>
              <TableCell>{b.slots.join(", ")}</TableCell>
              <TableCell>{b.date}</TableCell>
              <TableCell>${b.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ConfirmedBookings;
