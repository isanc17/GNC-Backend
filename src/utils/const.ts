export const updTarea = `UPDATE tareas SET usuario_asignado_id = ?, estado = ?, titulo = ?, descripcion = ?, fecha_vencimiento = ? WHERE tarea_id = ?`;
export const delTarea = `DELETE FROM tareas WHERE tarea_id = ?`;
export const insTarea = `INSERT INTO tareas (usuario_asignado_id, usuario_creador_id, estado, titulo, descripcion, fecha_vencimiento) VALUES (?, ?, ?, ?, ?, ?)`;
export const getUsersByStatus = `SELECT id, name, email, status, createdAt FROM users WHERE status = ?`;
export const getUsr = `SELECT usuario_id, nombre, usuario, estado FROM usuario`;
export const getOptByUser = `select o.name, o.path, o.icon, o.parent_id from roles_users rs join roles r on rs.role_id = r.id join roles_options ro on r.id = ro.role_id join options o on ro.option_id = o.id WHERE rs.user_id = ? group by o.id`;

