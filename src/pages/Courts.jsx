import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth'
import { useNavigate } from 'react-router';
import { BiArrowFromLeft } from 'react-icons/bi';

const Courts = () => {
  const [courts, setCourts] = useState([]);
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [date, setDate] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const {user, loading} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://sports-club-server-side.vercel.app/courts")
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then(data => setCourts(data))
      .catch(err => console.error("Fetch error:", err));
  }, []);

  const handleBookNow = (court) => {
    if (!loading && !user) {
      return navigate('/login');
    }
    setSelectedCourt(court);
    setSelectedSlots([]);
    setDate('');
    setModalOpen(true);
  };

  const handleSubmitBooking = async (e) => {
    e.preventDefault();
    if (!selectedCourt || !date || selectedSlots.length === 0) return;

    const booking = {
      courtId: selectedCourt._id,
      courtType: selectedCourt.type,
      userEmail: user.email,
      userName: user.displayName || 'Anonymous',
      selectedSlots,
      date,
      price: selectedSlots.length * selectedCourt.price,
      status: "pending",
    };

    const res = await fetch("https://sports-club-server-side.vercel.app/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(booking)
    });

    if (res.ok) {
      alert("Booking request submitted!");
      setModalOpen(false);
    } else {
      alert("Booking failed.");
    }

  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {courts.map(court => (
        <div key={court._id} className="p-4 shadow">
          <img src={court.image} alt="" className="w-full h-40 object-cover" />
          <h2 className="text-xl font-semibold">{court.type}</h2>
          <p>Available Slots: </p>
          <select className='p-2 bg-white rounded-lg mb-2'>
            {court.slots.map((slot, idx) => (
                <option key={idx} value={slot}>{slot}</option>
            ))}
          </select>
          <p>Price: {court.price} BDT per Session</p>
          <button onClick={() => handleBookNow(court)} className="mt-2 btn btn-soft text-blue-600 px-4 py-2 rounded">
            Book Now <BiArrowFromLeft/>
          </button>
        </div>
      ))}

        {modalOpen && selectedCourt && (
            <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
          <form onSubmit={handleSubmitBooking} className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-2">Booking: {selectedCourt.type}</h2>
            <p className="text-sm text-gray-600 mb-1">User: {user?.displayName}</p>
            <p className="text-sm text-gray-600 mb-3">Court ID: {selectedCourt._id}</p>

            <label className="block mb-2">Select Slot(s)</label>
            <div className="grid grid-cols-2 gap-2 mb-4">
            {selectedCourt.slots.map((slot, idx) => (
                <label key={idx} className="flex items-center gap-2">
                <input
                    type="checkbox"
                    value={slot}
                    checked={selectedSlots.includes(slot)}
                    onChange={(e) => {
                    if (e.target.checked) {
                        setSelectedSlots([...selectedSlots, slot]);
                    } else {
                        setSelectedSlots(selectedSlots.filter(s => s !== slot));
                    }
                    }}
                />
                {slot}
                </label>
            ))}
            </div>

            <label className="block mb-2">Select Date</label>
            <input 
              type="date" 
              value={date} 
              onChange={e => setDate(e.target.value)}
              className="w-full border p-2 rounded mb-4"
              required
            />

            <p>Total Price: {selectedSlots.length * selectedCourt.price} BDT</p>

            <div className="flex justify-end gap-2 mt-4">
              <button type="button" onClick={() => setModalOpen(false)} className="btn btn-outline">Cancel</button>
              <button type="submit" className="btn btn-neutral">Submit</button>
            </div>
          </form>
        </div>
      )}
      
    </div>
  );
};

export default Courts;
