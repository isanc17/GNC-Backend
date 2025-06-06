import { Request, Response } from "express";
import { connectToDatabase } from "../db/database";
import { sendResponse } from "../utils/response";
import { getUsr, getUsersByStatus, getOptByUser } from "../utils/const";
import { User, UserCreationAttr } from "../models/user";

export const getAllOptions = async (
    _req: Request,
    res: Response
): Promise<void> => {
    try {
        const db = await connectToDatabase();
        const options = await db.all("SELECT * FROM options");
        
        await db.close();

        console.log("Opciones obtenidas:", options);

        sendResponse(
        res,
        200,
        "success",
        "Opciones obtenidas exitosamente.",
        options
        );
    } catch (error) {
        console.error("Error al obtener opciones:", error);
        sendResponse(res, 500, "error", "Error interno al obtener las opciones.");
    }
}

export const getOptionsByUser = async (
    _req: Request,
    res: Response
): Promise<void> => {
    try {
        const db = await connectToDatabase();
        // console.log("ID de usuario:", _req.query.user_id);
        const options = await db.all(getOptByUser, [_req.query.user_id]);

        await db.close();
        
        if (!options) {
            return sendResponse(
                res,
                404,
                "error",
                "No se encontraron opciones para el usuario especificado."
            );
        }
        //console.log("Opciones obtenidas:", options);
    
        sendResponse(
        res,
        200,
        "success",
        "Opciones activas obtenidas exitosamente.",
        options
        );
    } catch (error) {
        console.error("Error al obtener opciones:", error);
        sendResponse(res, 500, "error", "Error interno al obtener las opciones.");
    }
};