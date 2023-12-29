import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import db from "./config/db.config";
import router from "./routes";








db.sync().then(() => {
  console.log("connected to database");
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);



export default app;