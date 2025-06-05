import { connectToDatabase } from "./database";
import { seed } from "./seed";
import { seedOptions } from "./seed_options";
import { seedRoles } from "./seed_roles";

async function createTables(db: any): Promise<void> {
  try {
    //
    console.log('Creando tabla "department"...');
    await db.exec(`
      CREATE TABLE IF NOT EXISTS department (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        code TEXT NOT NULL UNIQUE,
        name TEXT NOT NULL,
        createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Tabla "department" creada.');

    //
    console.log('Creando tabla "users"...');
    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        department_id INTEGER NOT NULL,
        status BOOLEAN NOT NULL DEFAULT 0,
        createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (department_id) REFERENCES department(id)
      );
    `);
    console.log('Tabla "users" creada.');

    //
    await db.exec(`
      CREATE TABLE IF NOT EXISTS roles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        description TEXT,
        department_id INTEGER NOT NULL,
        createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (department_id) REFERENCES department(id)
      );
    `);
    console.log('Tabla "roles" creada.');

    //
    console.log('Creando "roles_users"...');
    await db.exec(`
      CREATE TABLE IF NOT EXISTS roles_users (
        user_id INTEGER NOT NULL,
        role_id INTEGER NOT NULL,
        createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (user_id, role_id),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
      );
    `);
    console.log('Tabla "roles_users" creada.');

    //
    console.log('Creando tabla "options"...');
    await db.exec(`
      CREATE TABLE IF NOT EXISTS options (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        path TEXT,
        icon TEXT,
        parent_id INTEGER,
        createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (parent_id) REFERENCES options(id)
      );
    `);
    console.log('Tabla "options" creada.');

    //
    console.log('Creando "roles_options "...');
    await db.exec(`
      CREATE TABLE IF NOT EXISTS roles_options (
        role_id INTEGER NOT NULL,
        option_id INTEGER NOT NULL,
        createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (role_id, option_id),
        FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
        FOREIGN KEY (option_id) REFERENCES options(id) ON DELETE CASCADE
      );
    `);
    console.log('Tabla "roles_options " creada.');

    //
    console.log('Creando tabla "category"...');
    await db.exec(`
      CREATE TABLE IF NOT EXISTS category (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Tabla "category" creada.');

    //
    console.log('Creando "product"...');
    await db.exec(`
      CREATE TABLE IF NOT EXISTS product (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          type TEXT NOT NULL,
          serial_number TEXT NOT NULL,
          category_id INTEGER NOT NULL,
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (category_id) REFERENCES category(id)
      );
    `);
    console.log('Tabla "product" creada.');

    //
    console.log('Creando "product_movement"...');
    await db.exec(`
      CREATE TABLE IF NOT EXISTS product_movement (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER NOT NULL,
          product_id INTEGER NOT NULL,
          status TEXT NOT NULL CHECK(status IN ('ENTREGADO', 'DEVUELTO', 'DISPONIBLE')),
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id),
          FOREIGN KEY (product_id) REFERENCES product(id)
      );
    `);
    console.log('Tabla "product_movement" creada.');

    //
    console.log('Creando "request"...');
    await db.exec(`
      CREATE TABLE IF NOT EXISTS request (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          status TEXT NOT NULL DEFAULT 'PENDIENTE' CHECK(status IN ('PENDIENTE', 'APROBADO','RECHAZADO')),
          requester_id INTEGER NOT NULL,
          resolutor_id INTEGER,
          solution_date TIMESTAMP,
          user_id INTEGER,
          rol_user_id INTEGER,
          product_movement_id INTEGER,
          payload TEXT NOT NULL, --JSON detalles de la solicitud
          description TEXT,
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (requester_id) REFERENCES users(id),
          FOREIGN KEY (resolutor_id) REFERENCES users(id),
          FOREIGN KEY (user_id) REFERENCES users(id),
          FOREIGN KEY (rol_user_id) REFERENCES roles_users(id),
          FOREIGN KEY (product_movement_id) REFERENCES product_movement(id)
      );
    `);
    console.log('Tabla "request" creada.');

    
  } catch (error) {
    console.error("Error al crear las tablas:", error);
    throw error;
  }
}

async function initializeDatabase() {
  try {
    const db = await connectToDatabase();
    await createTables(db).then(async () => {});

    console.log("Iniciando seeding...");
    await seed();
    await seedRoles();
    await seedOptions();
    console.log("Seeding completado.");
    await db.close();
    console.log("Base de datos cerrada correctamente.");
  } catch (error) {
    console.error("Error durante la inicialización:", error);
  }
}

initializeDatabase().catch((error) => {
  console.error("Error fatal:", error);
});
