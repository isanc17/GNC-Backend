import { User, UserCreationAttr } from "../models/user";
import bcrypt from "bcrypt";
import { connectToDatabase } from "./database";

const users: UserCreationAttr[] = [
  { name: "Admin", email: "admin", password: "admin", department_id: 1 },
  { name: "Admin2", email: "admin2", password: "admin", department_id: 1 },
];

export async function seed() {
  const db = await connectToDatabase();

  console.log("Verificando si existen areas...");
  const existingDepartaments = await db.get(
    `SELECT COUNT(*) as count FROM department`
  );

  if (existingDepartaments.count == 0) {
    const insertQuery = `
    INSERT INTO department (code, name) 
      VALUES
        ('TI', 'Tecnología de la Información'),
        ('HR', 'Recursos Humanos'),
        ('FIN', 'Finanzas'),
        ('QUALITY', 'Calidad'),
        ('TRAINING', 'Capacitación')`;

    await db.run(insertQuery);
    return;
  }

  console.log("Verificando si existen usuarios...");

  const existingUsers = await db.get(`SELECT COUNT(*) as count FROM users`);
  if (existingUsers.count > 0) {
    console.log("Usuarios ya existentes. No se necesita seeding.");
    return;
  }

  console.log("Cargando usuario inicial...");

  for (const user of users) {
    const userCreate = await User.create(user);

    const insertQuery = `
    INSERT INTO users (name, email, password, department_id)
    VALUES (?, ?, ?, ?)`;

    await db.run(insertQuery, [
      userCreate.name,
      userCreate.email,
      userCreate.password,
      userCreate.department_id,
    ]);
  }

  console.log("Usuarios iniciales cargados.");
  await db.close();
}

seed().catch((error) => {
  console.error("Seeding no encuentra la bd");
});
