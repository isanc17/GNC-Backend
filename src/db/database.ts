import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

// Conectar a la base de datos
export async function connectToDatabase(): Promise<
  Database<sqlite3.Database, sqlite3.Statement>
> {
  try {
    const db = await open({
      filename: "./database.db",
      driver: sqlite3.Database,
    });

    console.log(`Conectado`);
    return db;
  } catch (e){
    console.error("Error al conectar con la base de datos:", e);
    throw new Error("error de conexión a bd");
  }
}
