import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { TokenService } from '../../api/authen';

const PrivateRoute = () => {
    const isAuthenticated = !!TokenService.getAccessToken(); // Check if user is logged in

    return isAuthenticated ? <Outlet /> : <Navigate to="/account/login" />;
};

export default PrivateRoute;
