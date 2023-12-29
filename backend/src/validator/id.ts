import express, {NextFunction, Request, Response} from "express";
import { v4 as uuidv4 } from 'uuid';

const generateUUID = (req: Request, res: Response, next: NextFunction) => {
    req.body.id = uuidv4();
    next();
};

export default generateUUID;