import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { authContext } from './AuthContext';

// role="user": any signed-in citizen (officers are sent to their own dashboard).
// role="gov":  only accounts that have an admins/{uid} document.
const RequireAuth = ({ role, children }) => {
    const { currentUser, isGov, authLoading } = useContext(authContext);

    if (authLoading) {
        return null;
    }
    if (!currentUser) {
        return <Navigate to="/Login" replace />;
    }
    if (role === 'gov' && !isGov) {
        return <Navigate to="/UserHomePage" replace />;
    }
    if (role === 'user' && isGov) {
        return <Navigate to="/GovHome" replace />;
    }
    return children;
};

export default RequireAuth;
