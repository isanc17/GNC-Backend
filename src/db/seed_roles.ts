
import { User } from '../models/user';
import { connectToDatabase } from './database';
import { OptionAttr, RoleCreationAttr } from '../models/models';

const Roles: RoleCreationAttr[] = [
    { name: 'Admin', description: 'Administrador del sistema', department_id: 1 },
    { name: 'TI', description: 'Equipo de inventario',  department_id: 1 },
    { name: 'Líder de equipo', description: 'Lider y asignador de equipos', department_id: 1 },
  ];


  
export async function seedRoles() {
  const db = await connectToDatabase();

  console.log('Verificando si existen roles...');

  const existingUsers = await db.get(`SELECT COUNT(*) as count FROM roles`);
  if (existingUsers.count > 0) {
    console.log('Roles ya existentes. No se necesita seeding.');
    return;
  }

  console.log('Cargando roles inicial...');

  for(const rol of Roles){
  
    const insertQuery = `
    INSERT INTO roles (name, description, department_id)
    VALUES (?, ?, ?)`;

    await db.run(insertQuery, [
      rol.name,
      rol.description, 
      rol.department_id
    ]);
  }

  console.log('Roles cargados.');
  await db.close();
}


seedRoles().catch((error) => {
  console.error('Seeding no encuentra la bd');
});