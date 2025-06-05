import { Router } from "express";
import { login } from "../controllers/loginController";
import { handleValidationErrors } from "../middleware/validationHandler";
import { loginValidator } from "../middleware/loginValidator";

const router = Router();

// Ruta de login
router.post("/login", loginValidator, handleValidationErrors(true), login);

export default router;
