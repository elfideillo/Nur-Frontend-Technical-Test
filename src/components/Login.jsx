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
            alert('Login successful!');
            navigate('/dashboard'); // Redirige al Dashboard
        } catch (err) {
            setError('Login failed: ' + (err.response?.data?.error || 'Unknown error'));
        }
    };

    const goToLandingPage = () => {
        navigate('/'); // Redirige a LandingPage
    };

    return (
        <div>
            <button onClick={goToLandingPage}> Volver a Landing Page</button> {/* Botón para regresar */} <br/>
            <h2>Iniciar Sesión</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleLogin}>
                <label>
                    Email:
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Ingresar</button>
            </form>
   
        </div>
    );
};

export default Login;
