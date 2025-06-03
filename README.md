# Express + SQLite CRUD App
Este proyecto es un CRUD desarrollado con Express y SQLite utilizando TypeScript. Contiene lógica para inicializar la base de datos, poblarla con datos iniciales y ejecutar el servidor Express.
______________________________________________________________________________________________________

## Requisitos Previos
Node.js (versión 14 o superior)
npm (viene con Node.js)
Si no tienes Node.js instalado, puedes descargarlo desde https://nodejs.org.
_____________________________________________________________________

## Instala las Dependencias

Ejecuta
npm install

______________________________________________________________________________________________________

## Estructura del Proyecto
/db
  └── tareas.db (se crea automáticamente)
src/
  ├── app.ts            (Archivo principal del servidor)
  ├── database.ts       (Conexión a la base de datos SQLite)
  ├── seed.ts           (Datos iniciales para la base de datos)
  └── initDb.ts         (Inicialización de la base de datos)
package.json
tsconfig.json
jest.config.js
______________________________________________________________________________________________________

## Inicialización de la Base de Datos
### Antes de ejecutar el servidor, debes crear la base de datos y poblarla con los datos iniciales.

Crear la Base de Datos y las Tablas

    npm run init-db

Este comando hará lo siguiente:

Verificar si la carpeta db existe. Si no, se creará automáticamente.
Crear la base de datos tareas.db si no existe.
Crear las tablas usuario y tareas dentro de la base de datos.
Insertar datos de ejemplo en las tablas.

## Ejecución del Servidor
    npm run start
Esto levantará el servidor en http://localhost:3000.

______________________________________________________________________________________________________
## Rutas Disponibles

login
    GET /login                Obtener token de sesión

Usuarios
    GET /usuarios/activos     Obtener todos los usuarios.
    POST /usuarios            Crear un nuevo usuario.
Tareas
    GET /tasks                Obtener todas las tareas.
    POST /tasks               Crear una nueva tarea.
    PUT /tasks/:id            Actualizar una tarea existente.
    DELETE /tasks/:id         Eliminar una tarea.
______________________________________________________________________________________________________

## Pruebas
npm run test
Configuración del Proyecto
Si necesitas modificar la configuración del proyecto, asegúrate de revisar el archivo tsconfig.json y los scripts definidos en package.json.

______________________________________________________________________________________________________
## Este proyecto te permite:

Crear, leer, actualizar y eliminar usuarios y tareas.
Inicializar y poblar la base de datos automáticamente.
Levantar un servidor Express con TypeScript para manejar las operaciones CRUD.
Si tienes alguna duda o problema, siéntete libre de crear un issue en el repositorio o contribuir con mejoras.

## Postman Collection

Puedes encontrar la colección de Postman para este proyecto en el archivo:

`/docs/postman-collection.json`

### Importar la Colección

1. Abre Postman.
2. Ve a **File > Import**.
3. Selecciona el archivo `postman-collection.json`.
4. Ahora puedes probar las rutas del API.

# Licencia
Este proyecto está bajo la licencia MIT.

