import express, {NextFunction, Request, Response} from "express";
import bodyParser from "body-parser";
import { v4 as uuidv4 } from 'uuid';
import db from "./config/db.config";
import { TodoInstance } from "./model";
import TodoValidator from "./validator";
import Middleware from "./middleware";
import generateUUID from "./validator/id";



db.sync().then(()=>{
    console.log('connected to database')
})

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

 // Route to create  ToDo records
 app.post('/create', 
generateUUID,
 TodoValidator.checkCreateTodo(),
 Middleware.validationErrorHandler,
 async (req: Request, res: Response) => {
    // const id = uuidv4();
    try {
        const entry = await TodoInstance.create({...req.body});
        return res.json({entry, msg: "Successfully created todo" });
    } catch (e) {
        return res.json({ msg: "failed to create todo", status: 500, route: "/create", error: e} );
    }

 });


 app.get('/read', async (req: Request, res: Response) => {
    try {
        const toDoRecords = await TodoInstance.findAll({where:{}});
        return res.json(toDoRecords);
      
    } catch (e) {
        return res.json({ msg: "failed to read todo", status: 500, route: "/read", error: e} );
    }

 });

 // Route to return incomplete ToDo records in ascending order of their dates for ordinals
 app.get('/incomplete', async (req: Request, res: Response) => {
    try {
        const activeToDoRecords = await TodoInstance.findAll({
            where:{status : false},
            order: [['dueDate', 'ASC']],
        });
        return res.json(activeToDoRecords);
      
    } catch (e) {
        return res.json({ msg: "failed to read incomplete todo", status: 500, route: "/read", error: e} );
    }

 });

  // Route to return completed ToDo records in ascending order of their dates for ordinals
 app.get('/completed', async (req: Request, res: Response) => {
    try {
        const inActiveToDoRecords = await TodoInstance.findAll({
            where:{status : true},
            order: [['dueDate', 'ASC']],
        });
        return res.json(inActiveToDoRecords);
      
    } catch (e) {
        return res.json({ msg: "failed to read completed todo", status: 500, route: "/read", error: e} );
    }

 });

 //Route to change status boolean
 app.put('/status/:id', TodoValidator.checkIdParams(),  Middleware.validationErrorHandler, async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const toDoRecords = await TodoInstance.findOne({where:{id}});
        if (!toDoRecords){
            return res.json({msg: 'Cannot find todo ID'})
        }
        const changeToDoStatus = await toDoRecords.update({ status: !toDoRecords.getDataValue("status")})
        return res.json(changeToDoStatus);
      
    } catch (e) {
        return res.json({ msg: "Failed to update todo", status: 500, route: "/status/:id", error: e} );
    }

 });
 //Route to update toDo records
 app.put('/update/:id', 
 TodoValidator.checkIdParams(),  
 Middleware.validationErrorHandler, 
 async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const toDoRecords = await TodoInstance.findOne({where:{id}});
        if (!toDoRecords){
            return res.json({msg: 'Cannot find todo ID'})
        }
        const updatedToDORecord = await toDoRecords.update({...req.body})
        return res.json(updatedToDORecord);
      
    } catch (e) {
        return res.json({ msg: "Failed to update todo", status: 500, route: "/update/:id", error: e} );
    }

 });


 //Route to delete toDo records
 app.delete('/delete/:id', 
 TodoValidator.checkIdParams(),  
 Middleware.validationErrorHandler, 
 async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const toDoRecords = await TodoInstance.findOne({where:{id}});
        if (!toDoRecords){
            return res.json({msg: 'Cannot find todo ID'})
        }
        const deletedToDORecord = await toDoRecords.destroy()
        return res.json(deletedToDORecord);
      
    } catch (e) {
        return res.json({ msg: "Failed to delete todo", status: 500, route: "/delete/:id", error: e} );
    }

 });


 app.get('/', (req: Request, res: Response) => {
    return res.send('Status: 200')
 });

export default app;

