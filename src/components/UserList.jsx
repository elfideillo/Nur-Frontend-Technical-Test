import React, { useState, useEffect } from 'react';
import { fetchUsers } from '../api/user.js';
import { Link, useNavigate } from 'react-router-dom';

const UserList = ({ onLogout }) => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5; // Número de usuarios por página
    const navigate = useNavigate();

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const data = await fetchUsers();
                setUsers(data);
                setFilteredUsers(data);
            } catch (err) {
                if (err.response && err.response.status === 403) {
                    navigate('/login');
                } else {
                    setError('Failed to fetch users');
                }
            } finally {
                setLoading(false);
            }
        };

        loadUsers();
    }, [navigate]);

    useEffect(() => {
        const results = users.filter(user =>
            `${user.name} ${user.type} ${user.email}`.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(results);
        setCurrentPage(1); // Reiniciar a la primera página cuando se filtran los usuarios
    }, [searchTerm, users]);

    const goToDashboard = () => {
        navigate('/dashboard');
    };

    const goToNewUser = () => {
        navigate('/users/new');
    };

    // Cálculo de paginación
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    if (loading) return <div>Loading users...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="user-list-container">
            <button onClick={onLogout}>Cerrar Sesión</button>&nbsp;
            <button onClick={goToDashboard}>Volver a Dashboard</button> <br />
            <h2>Lista de Usuarios</h2>
            <button onClick={goToNewUser}>Crear Nuevo Usuario</button> <br /><br />

            {/* Cuadro de búsqueda */}
            <input
                type="text"
                placeholder="Buscar por nombre, tipo o email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />

            <div className="vertical-list">
                {currentUsers.map((user) => (
                    <div key={user.id} className="vertical-list-item">
                        <Link to={`/users/${user.id}`}>
                            <strong>{user.name}</strong> - {user.type} - {user.email}
                        </Link>
                    </div>
                ))}
                {currentUsers.length === 0 && <p>No se encontraron usuarios.</p>}
            </div>

            {/* Controles de paginación */}
            {filteredUsers.length > usersPerPage && (
                <div className="pagination-controls">
                    <button onClick={goToPreviousPage} disabled={currentPage === 1}>
                        Anterior
                    </button>
                    <span>
                        Página {currentPage} de {totalPages}
                    </span>
                    <button onClick={goToNextPage} disabled={currentPage === totalPages}>
                        Siguiente
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserList;
