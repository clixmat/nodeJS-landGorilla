# API REST con Express y TypeScript

Este proyecto es una API REST construida con Node.js, Express y TypeScript para la gestión de usuarios. Implementa autenticación con JWT, validación de datos con Joi y manejo adecuado de errores.

## Estructura del proyecto

```
/nodeJS-landGorilla
│── /src
│   ├── controllers
│   │   ├── userController.ts
│   ├── middlewares
│   │   ├── authMiddleware.ts
│   ├── models
│   │   ├── userModel.ts
│   ├── routes
│   │   ├── userRoutes.ts
│   ├── types
│   │   ├── express.d.ts
│   │   ├── user.ts
│   ├── validators
│   │   ├── userValidator.ts
│   ├── app.ts
│   ├── server.ts
│── /node_modules
│── .env
│── package.json
│── tsconfig.json
│── .gitignore
│── README.md
```

## Características principales
- Operaciones CRUD para usuarios.
- Middleware de autenticación con JWT.
- Validación de datos con Joi.
- Manejo centralizado de errores.
- Implementación de rutas bajo el prefijo `/api/v1`.

## Instalación y Configuración

1. Clona el repositorio:
   ```sh
   git clone https://github.com/clixmat/nodeJS-landGorilla
   cd nodeJS-landGorilla
   ```
2. Instala las dependencias:
   ```sh
   npm install
   ```
3. Configura las variables de entorno creando un archivo `.env`:
   ```env
   JWT_SECRET=KEY
   PORT=3000
   ```
4. Inicia el servidor:
   ```sh
   npm run dev
   ```

## Endpoints

### Autenticación

#### `POST /api/v1/register`
**Descripción:** Registra un nuevo usuario.
- **Request:**
  ```json
  {
    "username": "usuario123",
    "password": "passwordSegura"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Usuario registrado"
  }
  ```

#### `POST /api/v1/login`
**Descripción:** Inicia sesión y obtiene un token JWT.
- **Request:**
  ```json
  {
    "username": "usuario123",
    "password": "passwordSegura"
  }
  ```
- **Response:**
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

### Usuarios (Requiere autenticación)

#### `GET /api/v1/users`
**Descripción:** Obtiene la lista de usuarios.
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <token>"
  }
  ```
- **Response:**
  ```json
  [
    { "username": "usuario123" },
    { "username": "usuario456" }
  ]
  ```

#### `PUT /api/v1/users/:username`
**Descripción:** Actualiza un usuario.
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <token>"
  }
  ```
- **Request:**
  ```json
  {
    "username": "nuevoUsuario",
    "password": "nuevaPassword"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Usuario actualizado exitosamente"
  }
  ```

#### `DELETE /api/v1/users/:username`
**Descripción:** Elimina un usuario.
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <token>"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Usuario eliminado exitosamente"
  }
  ```

## Seguridad y Validación

### Seguridad
- Se usa JWT para manejar la autenticación.
- El middleware `authenticateJWT` verifica los tokens antes de acceder a rutas protegidas.
- Todas las rutas están bajo el prefijo `/api/v1` para facilitar futuras versiones.

### Validación de Datos
- Joi se usa para validar los datos enviados en `register` y `updateUser`.
- Se requiere un `username` de al menos 3 caracteres y una `password` de al menos 6 caracteres.

## Manejo de Errores
- Se captura y maneja cualquier error con un middleware centralizado para evitar respuestas inesperadas.
- Se retornan códigos de estado adecuados (400 para validaciones, 401 para no autenticado, 403 para token inválido, 404 para usuario no encontrado, etc.).

## Configuración del Prefijo `/api/v1`
Para definir el prefijo de las rutas, en `server.ts` o `app.ts` se usa:

```ts
app.use('/api/v1', userRoutes);
```

Esto asegura que todas las rutas definidas en `userRoutes.ts` estén bajo `/api/v1`.
Por ejemplo, si en `userRoutes.ts` se define:
```ts
router.post('/register', register);
```
La ruta accesible será:
```
POST /api/v1/register
```

## Cómo Compilar y Utilizar

### Compilar el Proyecto
Si deseas compilar el código TypeScript a JavaScript, ejecuta:
```sh
npm run build
```

Para ejecutar la API en modo producció:
```sh
npm start
```

