import express from "express";
import TodoValidator from "../../validator";
import Middleware from "../../middleware";
import ToDoController from "../controller";
import generateUUID from "../../validator/id";
const router = express.Router();

// Route to create  ToDo records
router.post(
  "/create",
  generateUUID,
  TodoValidator.checkCreateTodo(),
  Middleware.validationErrorHandler,
  ToDoController.create
);

router.get("/read", ToDoController.readAll);

// Route to return incomplete ToDo records in ascending order of their dates for ordinals
router.get("/incomplete", ToDoController.inComplete);

// Route to return completed ToDo records in ascending order of their dates for ordinals
router.get("/completed", ToDoController.complete);

//Route to change status boolean
router.put(
  "/status/:id",
  TodoValidator.checkIdParams(),
  Middleware.validationErrorHandler,
  ToDoController.status
);
//Route to update toDo records
router.put(
  "/update/:id",
  TodoValidator.checkIdParams(),
  Middleware.validationErrorHandler,
  ToDoController.update
);

//Route to delete toDo records
router.delete(
  "/delete/:id",
  TodoValidator.checkIdParams(),
  Middleware.validationErrorHandler,
  ToDoController.delete
);

router.get("/", ToDoController.sendAll);


export default router;
