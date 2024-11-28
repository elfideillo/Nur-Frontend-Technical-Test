import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = ({ onLogout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        if (onLogout) {
            onLogout();
        }
        navigate('/login'); // Redirige al login
    };

    return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
