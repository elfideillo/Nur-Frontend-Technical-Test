import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();

    const goToLogin = () => {
        navigate('/login'); // Redirige a Login
    };

    return (
        <div>
            <button onClick={goToLogin}>Iniciar Sesión</button> <br/>
            <h1>Landingpage</h1>
       
        </div>
    );
};

export default LandingPage;
