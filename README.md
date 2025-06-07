# Express + SQLite CRUD App
Este proyecto es un CRUD desarrollado con Express y SQLite utilizando TypeScript. Contiene lógica para inicializar la base de datos, poblarla con datos iniciales y ejecutar el servidor Express.
______________________________________________________________________________________________________

## Requisitos Previos
Node.js (versión 14 o superior)
npm (viene con Node.js)
Si no tienes Node.js instalado, puedes descargarlo desde https://nodejs.org.
______________________________________________________________________________________________________
## Definir variables de entorno
 **Crea un archivo `.env`** Para la configuración de los tokens (tal como en el .env.example); si usas la bd versionada las secrete key deben ser estas:

   ```bash
    JWT_SECRET=supersecreto123
    JWT_EXPIRES_IN=3600
   ```
______________________________________________________________________________________________________


## Instala las Dependencias

Ejecuta
npm install

______________________________________________________________________________________________________

## Estructura del Proyecto
database.db (se crea automáticamente)
src/
├── app.ts          (Archivo principal del servidor)
├── /db
├    ├── database.ts            (Conexión a la base de datos SQLite)
├    ├── seed.ts                (Datos iniciales para la base de datos)
├    ├── seed_roles.ts          (Datos iniciales para la base de datos)
├    ├── seed_options.ts        (Datos iniciales para la base de datos)
├    ├── seed_category.ts       (Datos iniciales para la base de datos)
├    └── initDb.ts              (Inicialización de la base de datos)
├── /middleware
├    ├── loginMiddleware.ts     (Busca y verifica los JWT)
├    ├── loginValidator.ts      (Valida los datos del request para login)
├    └── validationHandler.ts   (Revisa resultados de validators y retorna respuesta con base en ellos)
├── /models
├    ├── models.ts              (DTOs de la app)
├    └── user.ts                (Clase usuario)
├── /routes
├    ├── loginRoutes.ts         (Gestor de rutas para el modulo: Login)
├    ├── optiomsRoutes.ts       (Gestor de rutas para el modulo: Options)
├    └── userRoutes.ts          (Gestor de rutas para el modulo: User)
├── /utils
├    ├── const.ts               (Constantes del la app, generalmente querys)
├    ├── inserts.sql            (Inserts para cargar la bd)
├    ├── jwt.ts                 (Funciones para JWT)
├    └── response.ts            (Gestor de respuestas del api)
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
Crear las tablas dentro de la base de datos.
Insertar datos de ejemplo en las tablas.

## Ejecución del Servidor
    npm run start
Esto levantará el servidor en http://localhost:3000.

______________________________________________________________________________________________________
## Rutas Disponibles

login
    POST /login                 Obtener token de sesión

Usuarios
    GET /users/:status          Obtener todos los usuarios por status.
    GET /users                  Obtener todos los usuarios.
    POST /users                 Crear un nuevo usuario.
Opciones
    GET /options/all            Opciones disponibles desde el portal
    GET /options/byUser         Opciones de cada usuario para el menu
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

