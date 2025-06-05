import { body, ValidationChain, query } from "express-validator";

export const loginValidator: ValidationChain[] = [
  body("email")
    .isString()
    .notEmpty()
    .withMessage("El email es obligatorio y debe ser una cadena de texto."),
  body("password")
    .isString()
    .notEmpty()
    .withMessage("La contraseña es obligatoria y debe ser una cadena de texto."),
];
