# React Frontend para Administración de Usuarios

Este proyecto es un frontend desarrollado en **React** con **Vite** que permite gestionar usuarios, incluyendo la creación, edición, eliminación y visualización. Incluye autenticación y protección de rutas.

## Funcionalidades

- **Inicio de sesión**: Autenticación por token persistido en `localStorage`.
- **Panel de control (Dashboard)**: Acceso rápido a las funcionalidades principales.
- **Administración de usuarios**:
  - Listado de usuarios.
  - Creación de nuevos usuarios.
  - Edición de usuarios existentes.
  - Eliminación de usuarios.
- **Protección de rutas**: Solo usuarios autenticados pueden acceder a las secciones protegidas.
- **Interfaz interactiva**: Uso de estilos responsivos y dinámicos para mejorar la experiencia del usuario.

## Tecnologías Utilizadas

### Dependencias Principales
- [React](https://reactjs.org/) ^18.3.1
- [React Router DOM](https://reactrouter.com/) ^7.0.1
- [Axios](https://axios-http.com/) ^1.7.8

### Dependencias de Desarrollo
- [Vite](https://vitejs.dev/) ^6.0.1
- ESLint con plugins para React y React Hooks.

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/elfideillo/tu-repositorio.git
 
## 2. Instalar Node.js y npm

Asegúrate de tener **Node.js** y **npm** instalados en tu sistema. Puedes verificarlo con los siguientes comandos:

```bash
node -v
npm -v

## 3. Instalar las dependencias del proyecto

Ejecuta el siguiente comando para instalar todas las dependencias definidas en `package.json`:

```bash
npm install

## 4. Configurar el proxy de desarrollo (opcional)

Si tu proyecto requiere conectarse a un backend local, configura el proxy en el archivo `vite.config.js`. Asegúrate de que la dirección del backend sea correcta:

```javascript
server: {
    proxy: {
        '/api': {
            target: 'http://localhost:4000',
            changeOrigin: true,
        },
    },
},

## 5. Instalar ESLint  

Si deseas verificar el código con **ESLint**, asegúrate de tenerlo configurado. Ya está incluido como dependencia en el proyecto. 

Ejecuta el siguiente comando para verificar la calidad del código:

```bash
npm run lint

## 6. Iniciar el servidor de desarrollo

Ejecuta el siguiente comando para iniciar el servidor de desarrollo con **Vite**:

```bash
npm run dev

## 7. Generar el build para producción (opcional)

Si necesitas un build optimizado para producción, ejecuta el siguiente comando:

```bash
npm run build


## Scripts Disponibles

- **`npm run dev`**: Inicia el servidor de desarrollo con Vite.
- **`npm run build`**: Genera los archivos optimizados para producción.
- **`npm run preview`**: Previsualiza el build de producción.
- **`npm run lint`**: Ejecuta ESLint para verificar la calidad del código.

## Estructura del Proyecto

```plaintext
├── src/
│   ├── components/       # Componentes reutilizables (LandingPage, Login, Dashboard, etc.)
│   ├── api/              # Funciones para interactuar con la API
│   ├── App.jsx           # Componente principal de la aplicación
│   ├── index.jsx         # Punto de entrada de la aplicación
│   └── index.css         # Estilos globales
├── public/               # Recursos públicos (favicon, imágenes, etc.)
├── vite.config.js        # Configuración de Vite
└── package.json          # Configuración del proyecto



