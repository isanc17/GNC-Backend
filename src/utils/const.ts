export const getUsersByStatus = `SELECT id, name, email, status FROM users WHERE status = ?`;

export const getUsr = `SELECT u.name as username, email, d.name as department, u.status,  u.createdAt FROM  users u join department d on u.department_id = d.id`;

export const getOptByUser = `select o.icon,o.name as label,o.path, o.parent_id from roles_users rs join roles r on rs.role_id = r.id join roles_options ro on r.id = ro.role_id join options o on ro.option_id = o.id WHERE rs.user_id = ? group by o.id`;
