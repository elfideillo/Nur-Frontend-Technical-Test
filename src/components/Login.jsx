import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, setAuthToken } from '../api/user.js';

const Login = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { token } = await loginUser({ email, password });
            setAuthToken(token); // Configura el token para futuras solicitudes
            onLoginSuccess(token); // Actualiza el estado de autenticación
            alert('¡Inicio de sesión exitoso!');
            navigate('/dashboard'); // Redirige al Dashboard
        } catch (err) {
            setError('Error al iniciar sesión: ' + (err.response?.data?.error || 'Error desconocido'));
        }
    };

    const goToLandingPage = () => {
        navigate('/'); // Redirige a LandingPage
    };

    return (
        <div className="login-container">
            <button className="back-button" onClick={goToLandingPage}>Volver a Landing Page</button>
            <h2 className="login-title">Iniciar Sesión</h2>
            {error && <p className="error-message">{error}</p>}
            <form className="login-form" onSubmit={handleLogin}>
                <label className="form-label">
                    Email:
                    <input
                        type="email"
                        className="form-input"
                        placeholder="Introduce tu correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label className="form-label">
                    Contraseña:
                    <input
                        type="password"
                        className="form-input"
                        placeholder="Introduce tu contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <button className="login-button" type="submit">Ingresar</button>
            </form>
        </div>
    );
};

export default Login;
