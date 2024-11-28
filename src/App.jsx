import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import UserList from './components/UserList';
import ShowUser from './components/ShowUser';
import EditUser from './components/EditUser';
import NewUser from './components/NewUser';
import { setAuthToken } from './api/user';


const App = () => {
    // Carga el token inicial desde localStorage
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    // Configura Axios con el token al cargar la app
    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            setAuthToken(savedToken); // Configura Axios con el token
            setToken(savedToken); // Guarda el token en el estado
        }
    }, []);

    // Manejar el inicio de sesión exitoso
    const handleLoginSuccess = (token) => {
        localStorage.setItem('token', token); // Persistir el token
        setAuthToken(token); // Configurar el token en Axios
        setToken(token); // Actualizar el estado local
    };

    // Manejar el cierre de sesión
    const handleLogout = () => {
        localStorage.removeItem('token'); // Eliminar el token de localStorage
        setAuthToken(null); // Quitar el token de Axios
        setToken(null); // Limpiar el estado local
    };

    // Componente para proteger rutas privadas
    const PrivateRoute = ({ children }) => {
        return token ? children : <Navigate to="/login" replace />;
    };

    return (
        <Router>
            <Routes>
                {/* Ruta Raíz */}
                <Route
                    path="/"
                    element={token ? <Navigate to="/dashboard" replace /> : <LandingPage />}
                />

                {/* Ruta de Login */}
                <Route
                    path="/login"
                    element={token ? <Navigate to="/dashboard" replace /> : <Login onLoginSuccess={handleLoginSuccess} />}
                />

                {/* Ruta de Dashboard (Protegida) */}
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <Dashboard onLogout={handleLogout} />
                        </PrivateRoute>
                    }
                />

                {/* Ruta de Lista de Usuarios (Protegida) */}
                <Route
                    path="/users"
                    element={
                        <PrivateRoute>
                            <UserList onLogout={handleLogout} />
                        </PrivateRoute>
                    }
                />

                {/* Ruta de Detalle de Usuario (Protegida) */}
                <Route
                    path="/users/:id"
                    element={
                        <PrivateRoute>
                            <ShowUser />
                        </PrivateRoute>
                    }
                />

                {/* Ruta de Edición de Usuario (Protegida) */}
                <Route
                    path="/users/edit/:id"
                    element={
                        <PrivateRoute>
                            <EditUser />
                        </PrivateRoute>
                    }
                />

                {/* Ruta de Creación de Usuario (Protegida) */}
                <Route
                    path="/users/new"
                    element={
                        <PrivateRoute>
                            <NewUser />
                        </PrivateRoute>
                    }
                />

                {/* Redirección para rutas no válidas */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
};

export default App;
