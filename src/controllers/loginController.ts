import { Request, Response } from "express";
import { sendResponse } from "../utils/response";
import { connectToDatabase } from "../db/database";
import { User } from "../models/user";
import { generateToken } from "../utils/jwt";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log("Datos de login:", { email, password });
  if (!email || !password) {
    return sendResponse(
      res,
      400,
      "error",
      "Usuario y contraseña son requeridos"
    );
  }

  try {
    const db = await connectToDatabase();

    const userData = await db.get(
      `SELECT id, name, email, password FROM users WHERE email = ?`,
      [email]
    );

    await db.close();

    const user = new User();
    user.id = userData.id;
    user.name = userData.name;
    user.email = userData.email;
    user.password = userData.password;

    const passwordMatch = await user.validPassword(password as string);

    if (!userData || !passwordMatch) {
      console.log("Usuario no encontrado o sin contraseña");
      return sendResponse(res, 401, "error", "Credenciales inválidas");
    }

    const tokenPayload = user.toJSON();
    const token = generateToken(tokenPayload);

    sendResponse(res, 200, "success", "Inicio de sesión exitoso", {
      token,
      user: user.toJSON(),
    });
  } catch (error) {
    console.error("Error en el login:", error);
    sendResponse(res, 500, "error", "Error interno en el servidor");
  }
};
