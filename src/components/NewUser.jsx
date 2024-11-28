import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser, fetchUsers } from '../api/user.js'; // Asegúrate de que estas funciones existan

const NewUser = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        type: '',
        password: '',
        confirmPassword: '', // Campo adicional para confirmar contraseña
    });
    const [error, setError] = useState(null);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setEmailError('');
        setPasswordError('');

        // Validación de contraseñas coincidentes
        if (formData.password !== formData.confirmPassword) {
            setPasswordError('Las contraseñas no coinciden.');
            return;
        }

        try {
            // Verificar duplicidad de correo
            const existingUsers = await fetchUsers();
            const emailExists = existingUsers.some(user => user.email === formData.email);

            if (emailExists) {
                setEmailError('El correo electrónico ya está registrado.');
                return;
            }

            // Crear usuario
            await createUser({
                name: formData.name,
                email: formData.email,
                type: formData.type,
                password: formData.password,
            });

            alert('Usuario creado exitosamente!');
            navigate('/users'); // Redirige automáticamente a la lista de usuarios
        } catch (error) {
            setError('Error al crear el usuario. Inténtalo de nuevo.');
        }
    };

    const goBack = () => {
        navigate('/users'); // Regresa a la lista de usuarios
    };

    return (
        <div>
            <button onClick={goBack}>Administración de Usuarios</button> <br />
            <h2>Crear Nuevo Usuario</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Nombre:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br /><br />

                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </label>
                {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
                <br /><br />

                <label>
                    Tipo:
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Seleccionar Tipo</option>
                        <option value="admin">Admin</option>
                        <option value="user">Usuario</option>
                    </select>
                </label>
                <br /><br />

                <label>
                    Contraseña:
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br /><br />

                <label>
                    Confirmar Contraseña:
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </label>
                {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
                <br /><br />

                <button type="submit">Crear Usuario</button>
            </form>
        </div>
    );
};

export default NewUser;
