import { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Announcements = () => {
  const axiosSecure = useAxiosSecure();
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await axiosSecure.get('/announcements');
      setAnnouncements(res.data);
    };
    fetch();
  }, []);

  return (
    <div className="p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Club Announcements</h2>
      <ul className="list-disc pl-5 space-y-3">
        {announcements.map((a) => (
          <li key={a._id}>
            <p className="font-semibold">{a.title}</p>
            <p>{a.message}</p>
            <p className="text-sm text-gray-500">{new Date(a.date).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Announcements;
