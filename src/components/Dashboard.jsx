import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = ({ onLogout }) => {
    const navigate = useNavigate();

    const goToUsers = () => {
        navigate('/users'); // Redirige a la lista de usuarios
    };

    return (
        <div>      
            <button onClick={onLogout}>Cerrar Sesión</button> <br/>
            <h1>Dashboard</h1>
            <button onClick={goToUsers}>Administración de Usuarios</button>
      
        </div>
    );
};

export default Dashboard;
