import { Request, Response } from "express";
import { sendResponse } from "../utils/response";
import { connectToDatabase } from "../db/database";
import { User, UserAttr } from "../models/user";
import { generateToken } from "../utils/jwt";
import { findUserByEmail } from "./usersController";

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

    const userData: UserAttr | undefined = await findUserByEmail(email as string);

    await db.close();

    if (!userData) {
      console.log("Usuario no encontrado");
      return sendResponse(res, 401, "error", "Credenciales inválidas");
    }

    if(userData.status == 0) {
      return sendResponse(res, 401, "error", "Usuario inactivo, comuniquese con el administrador");
    }

    const user = new User();
    user.id = userData.id;
    user.name = userData.name;
    user.email = userData.email;
    user.password = userData.password;

    const passwordMatch = await user.validPassword(password as string);

    if (!passwordMatch) {
      console.log("Contraseña inválida");
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
