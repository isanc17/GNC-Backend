import dotenv from "dotenv";
dotenv.config();

import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import usuarioRoutes from "./routes/usersRoutes";
import loginRoutes from "./routes/loginRoutes";
import { autenticarToken } from "./middleware/loginMiddleware";
import { NextFunction } from "express";
import optionsRoutes from "./routes/optionsRoutes";

const app: Application = express();
const PORT = 3000;
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(loginRoutes);

app.use(autenticarToken as (req: Request, res: Response, next: NextFunction) => void);
app.use("/users", usuarioRoutes);
app.use("/options", optionsRoutes);


app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Ruta no encontrada.",
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
