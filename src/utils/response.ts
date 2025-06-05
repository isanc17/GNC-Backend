import { Response } from 'express';

/**
 * Respuesta estandar
 * @param res 
 * @param statusCode 
 * @param status 
 * @param message 
 * @param data 
 */
export function sendResponse(
  res: Response,
  statusCode: number,
  status: 'success' | 'error',
  message: string,
  data?: any
) {
  res.status(statusCode).json({
    status,
    message,
    data: data || null,
  });
}