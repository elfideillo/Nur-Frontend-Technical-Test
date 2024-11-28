import axios from 'axios'


const API_BASE_URL = 'https://nur-backend.elficos.com/api/v1/users';

// https://nur-backend.elficos.com/api/v1/users 
// http://localhost:4000/api/v1/users

// Configura Axios con cabecera Authorization nur-backend.elficos.com
const api = axios.create({
    
    baseURL: API_BASE_URL,
    
});


export const setAuthToken = (token) => {
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};


export const loginUser = async (credentials) => {
    const response = await api.post('/login', credentials); // Ruta del backend
    return response.data;
};


// Solicitudes a la API
export const fetchUsers = async () => {
    try {
        const response = await api.get('/'); // Solicitud al backend
        return response.data.users;
    } catch (error) {
        throw error; // Manejo del error en los componentes
    }
};

export const updateUser = async (id, data) => {
    const response = await api.put(`/${id}`, data);
    return response.data;
};

export const deleteUser = async (id) => {
    const response = await api.delete(`/${id}`);
    return response.data;
};

export const createUser = async (data) => {
    const response = await api.post('/register', data); // Asegúrate de que el endpoint sea correcto
    return response.data;
};
