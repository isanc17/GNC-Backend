import { Request, Response, NextFunction } from 'express';
import { sendResponse } from '../utils/response';
import { verifyToken } from '../utils/jwt';

export function  autenticarToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return sendResponse(res, 401, 'error', 'Token de autenticación requerido.');
  }

  const token = authHeader.split(' ')[1];

  try {
    const user = verifyToken(token);
    (req as any).user = user;

    next();
  } catch (error) {
    console.error('Error al verificar el token:', error);
    return res.status(403).json({ message: "Token inválido o expirado" });
  }
};
