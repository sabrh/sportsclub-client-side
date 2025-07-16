import { useContext, useMemo } from 'react';
import { AuthContext } from '../context/AuthContext';

const useAuth = () => {
    const authInfo = useContext(AuthContext);
    if (!authInfo) throw new Error('useAuth must be used within AuthProvider');
    return useMemo(() => authInfo, [authInfo.user, authInfo.loading]);
};

export default useAuth;