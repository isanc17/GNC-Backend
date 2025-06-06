import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { sendResponse } from '../utils/response';


export const handleValidationErrors =
(returnUnauthorized = false) => (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  // console.log(errors);
  if (!errors.isEmpty()) {
    const status = returnUnauthorized ? 401 : 400;
    return sendResponse(res, status, 'error', 'Datos inválidos.', errors.array());
  }
  next();
};