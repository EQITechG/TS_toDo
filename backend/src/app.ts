import express, {Request, Response} from "express";
import db from "./config/db.config";

db.sync().then(()=>{
    console.log('connected to database')
})

const app = express();

 app.get('/', (re: Request, res: Response) => {

    res.json({
        message: "Rest API using node"
    })
 })

export default app;

