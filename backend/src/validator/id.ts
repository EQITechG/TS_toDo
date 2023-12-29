import {NextFunction, Request, Response} from "express";
import { v4 as uuidv4 } from 'uuid';
//ID Generator
const generateUUID = (req: Request, res: Response, next: NextFunction) => {
    req.body.id = uuidv4();
    next();
};

export default generateUUID;