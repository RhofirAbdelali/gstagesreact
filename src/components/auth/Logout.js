import React from 'react';
import { useAuth } from './AuthContext';
import AuthService from '../services/AuthService';
import { Navigate } from 'react-router-dom';

export const Logout = () => {
    const Auth = useAuth();
    AuthService.logout().then(() => {
        Auth.userLogout();
    });
    return <Navigate to="/login" />;
};
export default Logout