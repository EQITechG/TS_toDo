import express, {Request, Response} from "express";
import bodyParser from "body-parser";
import { v4 as uuidv4 } from 'uuid';
import db from "./config/db.config";
import { TodoInstance } from "./model";

db.sync().then(()=>{
    console.log('connected to database')
})

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

 app.post('/create', async(req: Request, res: Response) => {
    const id = uuidv4();

    console.log(req.body, id);
    return res.send("Success");
    try{
    const entry = await TodoInstance.create({... req.body, id})
    
    console.log(req.body);
    return res.json({entry,msg: 'Todo created successfully'});
    }catch(e){
        return res.json({msg: "failed to create todo", status:500, route: "/create"})
    }
 });







 app.get('/', (req: Request, res: Response) => {
    return res.send('Status: 200')
 });

export default app;

