import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth(); // custom hook
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user?.email) {
      axios.get(`/users/admin/${user.email}`, {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
      }).then(res => {
        setIsAdmin(res.data.isAdmin);
      });
    }
  }, [user]);

  if (loading) return <span className="loading loading-spinner loading-xl"></span>;

  return user && isAdmin ? children : <Navigate to="/" />;
};
export default AdminRoute