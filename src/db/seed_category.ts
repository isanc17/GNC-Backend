
import { connectToDatabase } from './database';
import { OptionAttr,  } from '../models/models';

const Options: OptionAttr[] = [
    { name: 'Crear Usuarios', path: '/users', icon: 'ico-avatar-man', parent_id: null },
    { name: 'Ver Inventario', path: '/storage', icon: 'ico-shopping', parent_id: null },
    { name: 'Asignar Computador', path: '/asign', icon: 'ico-job', parent_id: null }
    ,
    { name: 'Asignar Options', path: '/options', icon: 'ico-card-id', parent_id: null }
  ];
  
export async function seedOptions() {
  const db = await connectToDatabase();

  console.log('Verificando si existen usuarios...');

  const existingUsers = await db.get(`SELECT COUNT(*) as count FROM options`);
  if (existingUsers.count > 0) {
    console.log('Opciones ya existentes. No se necesita seeding.');
    return;
  }

  console.log('Cargando opciones inicial...');

  for(const option of Options){
  
    const insertQuery = `
    INSERT INTO roles (name, path, icon, parent_id)
    VALUES (?, ?, ?, ?)`;

    await db.run(insertQuery, [
      option.name,
      option.path,
      option.icon,
      option.parent_id
    ]);
  }

  console.log('opciones cargados.');
  await db.close();
}


seedOptions().catch((error) => {
  console.error('Seeding no encuentra la bd');
});