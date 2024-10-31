import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import AuthService from '../services/AuthService';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
    const Auth = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userDetails = await AuthService.login({ username, password });
            Auth.userLogin(userDetails);
            navigate('/');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="container mt-5">
            <form onSubmit={handleLogin} className="border p-4 rounded">
                <h2 className="mb-4">Connexion</h2>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Nom d'utilisateur</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Nom d'utilisateur"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Mot de passe</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Mot de passe"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Connexion</button>
                {error && <div className="alert alert-danger mt-3">{error}</div>}
            </form>
        </div>
    );
};

export default Login;