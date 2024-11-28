import React, { useState, useEffect } from 'react';
import { updateUser, createUser, fetchUsers } from '../api/user.js';
import { useParams, useNavigate } from 'react-router-dom';

const UserForm = () => {
    const { id } = useParams(); // Captura el parámetro dinámico de la URL
    const navigate = useNavigate(); // Para redirigir después de guardar
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        type: '',
        password: '',
    });
    const [isEditing, setIsEditing] = useState(false); // Indica si estamos editando

    // Efecto para cargar datos del usuario si existe un ID
    useEffect(() => {
        if (id) {
            const fetchUserData = async () => {
                try {
                    const users = await fetchUsers();
                    const user = users.find((user) => user.id === parseInt(id));
                    if (user) {
                        setFormData({
                            name: user.name,
                            email: user.email,
                            type: user.type,
                            password: '', // La contraseña no se rellena por seguridad
                        });
                        setIsEditing(true);
                    } else {
                        console.error(`User with ID ${id} not found`);
                    }
                } catch (error) {
                    console.error('Error fetching user:', error);
                }
            };
            fetchUserData();
        }
    }, [id]); // Este efecto se ejecuta cuando cambia el ID

    // Manejo de cambios en el formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                // Actualizar usuario existente
                await updateUser(id, formData);
                alert('User updated successfully!');
            } else {
                // Crear un nuevo usuario
                await createUser(formData);
                alert('User created successfully!');
            }
            navigate('/users'); // Redirigir al listado de usuarios
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'An error occurred';
            alert(`Error: ${errorMessage}`);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{isEditing ? 'Edit User' : 'Add User'}</h2>

            <div>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label>Type:</label>
                <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Type</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                </select>
            </div>

            {!isEditing && ( // La contraseña solo se pide al crear un usuario
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
            )}

            <button type="submit">{isEditing ? 'Update User' : 'Add User'}</button>
        </form>
    );
};

export default UserForm;
