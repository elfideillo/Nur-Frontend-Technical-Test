import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchUsers, updateUser } from '../api/user.js';

const EditUser = () => {
    const { id } = useParams(); // Obtiene el ID del usuario a editar
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        type: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const users = await fetchUsers();
                const selectedUser = users.find((u) => u.id === parseInt(id, 10));
                if (selectedUser) {
                    setFormData({
                        name: selectedUser.name,
                        email: selectedUser.email,
                        type: selectedUser.type,
                    });
                } else {
                    setError('Usuario No encontrado');
                }
            } catch (err) {
                setError('Error al buscar al usuario');
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateUser(id, formData); // Llama a la API para actualizar
            alert('Usuario Modificado correctamente!');
            navigate(`/users/${id}`); // Redirige a la vista SHOW
        } catch (error) {
            alert('Error al modificar usuario');
        }
    };

    const goToUserShow = () => {
        navigate(`/users/${id}`); // Redirige a la vista de detalles del usuario
    };

    if (loading) return <div>Loading user details...</div>;
    if (error) return <div>{error}</div>;

    return (<>
        
        <button type="button" onClick={goToUserShow}>Volver a Datos de Usuario</button> <br/>
        
        <form onSubmit={handleSubmit}>
            <h2>Modificar Usuario</h2>
            <label>
                Name:
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </label><br/><br/>
            
            <label>
                Email:
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </label><br/><br/>
            
            <label>
                Type:
                <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                </select>
            </label><br/><br/>
            <button type="submit">Actualizar Usuario</button>
        </form>
    </>);
};

export default EditUser;
