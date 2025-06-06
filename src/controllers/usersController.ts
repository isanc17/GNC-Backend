import { Request, Response } from "express";
import { connectToDatabase } from "../db/database";
import { sendResponse } from "../utils/response";
import { getUsr, getUsersByStatus } from "../utils/const";
import { User, UserAttr, UserCreationAttr } from "../models/user";

export const getUsuariosByStatus = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const db = await connectToDatabase();
    const status = _req.params.status;
    console.log("Status de consulta:", status);
    const usuarios = await db.all(getUsersByStatus, [status]);

    await db.close();

    sendResponse(
      res,
      200,
      "success",
      "Usuarios activos obtenidos exitosamente.",
      usuarios
    );
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    sendResponse(res, 500, "error", "Error interno al obtener los usuarios.");
  }
};

export const getUsuarios = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const db = await connectToDatabase();

    const usuarios = await db.all(getUsr);

    await db.close();

    sendResponse(
      res,
      200,
      "success",
      "Usuarios obtenidos exitosamente.",
      usuarios
    );
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    sendResponse(res, 500, "error", "Error interno al obtener los usuarios.");
  }
};

export const findUserByEmail = async (email: string): Promise<UserAttr | undefined> => {
  const db = await connectToDatabase();
  const user = await db.get("SELECT * FROM users WHERE email = ?", [email]);
  await db.close();

    if (!user) {
    throw new Error("Usuario no encontrado");
  }

  return user as UserAttr;
};

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const user: UserCreationAttr = req.body;

  if (!user.name || !user.email || !user.password) {
    return sendResponse(
      res,
      400,
      "error",
      "Nombre, email y contraseña son requeridos."
    );
  }

  const existingUser = await findUserByEmail(user.email);
  if (existingUser) {
    return sendResponse(res, 400, "error", "El email ya está en uso.");
  }

  try {
    const userCreate = await User.create(user);

    const db = await connectToDatabase();
    const result = await db.run(
      "INSERT INTO users (name, email, password, department_id) VALUES (?, ?, ?, ?)",
      [
        userCreate.name,
        userCreate.email,
        userCreate.password,
        userCreate.department_id,
      ]
    );

    await db.close();

    sendResponse(res, 201, "success", "Usuario creado exitosamente.", {
      id: result.lastID,
    });
  } catch (error) {
    console.error("Error al crear usuario:", error);
    sendResponse(res, 500, "error", "Error interno al crear el usuario.");
  }
};
