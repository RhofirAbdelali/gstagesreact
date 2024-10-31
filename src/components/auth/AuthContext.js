import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        setUser(storedUser);
    }, []);

    const userLogin = (details) => {
        localStorage.setItem('user', JSON.stringify(details));
        setUser(details);
    };

    const userLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    const userIsAuthenticated = () => !!user;
    const userHasRole = (role) => user?.roles.includes(role);

    return (
        <AuthContext.Provider value={{ user, userLogin, userLogout, userIsAuthenticated, userHasRole }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);