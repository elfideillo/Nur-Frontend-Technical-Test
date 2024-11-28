import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchUsers, deleteUser } from '../api/user.js';

const ShowUser = () => {
    const { id } = useParams(); // Obtiene el parámetro dinámico de la URL
    const navigate = useNavigate(); // Hook para redirigir
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const users = await fetchUsers();
                const selectedUser = users.find((u) => u.id === parseInt(id, 10));
                if (selectedUser) {
                    setUser(selectedUser);
                } else {
                    setError('Usuario No encontrado');
                }
            } catch (err) {
                setError('Failed to fetch user details');
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, [id]);

    const handleEdit = () => {
        navigate(`/users/edit/${id}`); // Redirige a la vista EDIT
    };

    const handleDelete = async () => {
        try {
            await deleteUser(id); // Llama a la API para eliminar el usuario
            alert('Usuario Eliminado correctamente!');
            navigate('/users'); // Redirige a la lista de usuarios tras eliminar
        } catch (error) {
            alert('Error al eliminar el usuario');
        }
    };

    const goBack = () => {
        navigate('/users'); // Regresa a la lista de usuarios
    };

    if (loading) return <div>Loading user details...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <button onClick={goBack}>Volver a Administración de Usuario</button> <br/>
            <h2>Datos de Usuario &nbsp;
            <button onClick={handleEdit}>Modificar Usuario</button> {/* Botón para editar */}
            <button onClick={handleDelete}>Eliminar Usuario</button> {/* Botón para eliminar */}
            </h2>
            
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Type:</strong> {user.type}</p>
   
          
        </div>
    );
};

export default ShowUser;
