import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth'

const Courts = () => {
  const [courts, setCourts] = useState([]);
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [date, setDate] = useState('');
  const user = useAuth();

  useEffect(() => {
  fetch("http://localhost:3000/courts")
    .then(res => {
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    })
    .then(data => setCourts(data))
    .catch(err => console.error("Fetch error:", err));
}, []);



  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {courts.map(court => (
        <div key={court._id} className="bg-gray-200 p-4 shadow rounded">
          <img src={court.image} alt="" className="w-full h-40 object-cover rounded" />
          <h2 className="text-xl font-semibold">{court.type}</h2>
          <p>Available Slots: </p>
          <select className='p-2 bg-white rounded-lg mb-2'>
            {court.slots.map((slot, idx) => (
                <option key={idx} value={slot}>{slot}</option>
            ))}
          </select>
          <p>Price: {court.price} BDT per Session</p>
          <button onClick={() => handleBookNow(court)} className="mt-2 btn btn-neutral px-4 py-2 rounded">
            Book Now
          </button>
        </div>
      ))}

      
    </div>
  );
};

export default Courts;
