import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();

    const goToLogin = () => {
        navigate('/login'); // Redirige a Login
    };

    return (
        <div className="landing-page">
            <h1 className="landing-title">Bienvenido a Nuestra Plataforma</h1>
            <p className="landing-subtitle">Accede a tu cuenta o descubre nuestros servicios</p>
            <button className="landing-button" onClick={goToLogin}>Iniciar Sesión</button>
        </div>
    );
};

export default LandingPage;
