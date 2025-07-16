import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';

const Profile = () => {
  const { user } = useAuth();
  
  const { data: userData, isLoading } = useQuery({
    queryKey: ['user', user?.email],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/users/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email
  });

  if (isLoading) return <span className="loading loading-spinner loading-xl"></span>;

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      <div className="flex items-center gap-4 mb-6">
        <img 
          src={user?.photoURL || '/default-user.png'} 
          alt="Profile" 
          className="w-20 h-20 rounded-full object-cover"
        />
        <div>
          <h3 className="text-xl font-semibold">{user?.displayName || 'No Name'}</h3>
          <p className="text-gray-600">{user?.email}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded">
          <h4 className="font-medium mb-2">Account Information</h4>
          <p><span className="font-medium">Member Since:</span> {new Date(userData?.createdAt).toLocaleDateString()}</p>
          <p><span className="font-medium">Role:</span> {user?.role || 'user'}</p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded">
          <h4 className="font-medium mb-2">Membership Status</h4>
          <p>{userData?.isMember ? 'Active Member' : 'Regular User'}</p>
          {userData?.memberSince && (
            <p><span className="font-medium">Member Since:</span> {new Date(userData.memberSince).toLocaleDateString()}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;