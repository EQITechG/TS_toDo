import express from "express";
import bodyParser from "body-parser";
import db from "./config/db.config";
import toDoRouter from "./todo/routes";
//connecting to database
db.sync().then(() => {
  console.log("connected to database");
});
//server, parser and route initialisation 
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/todos",toDoRouter);

export default app;
