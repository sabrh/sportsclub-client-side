// src/hooks/useAdmin.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from './useAuth'; 

const useAdmin = () => {
  const { user } = useAuth(); 
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminLoading, setIsAdminLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user?.email) {
        setIsAdmin(false);
        setIsAdminLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `https://sports-club-server-side.vercel.app/users/admin/${user.email}`,
          { withCredentials: true }
        );
        setIsAdmin(response.data.isAdmin);
      } catch (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
      } finally {
        setIsAdminLoading(false);
      }
    };

    checkAdminStatus();
  }, [user?.email]);

  return { isAdmin, isAdminLoading };
};

export default useAdmin;