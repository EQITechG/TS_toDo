import { Request, Response, query } from "express";
import { TodoInstance } from "../model";



//Crud controller
class ToDoController {
  async create(req: Request, res: Response) {
    try {
      const entry = await TodoInstance.create({ ...req.body });
      return res.json({ entry, msg: "Successfully created todo" });
    } catch (e) {
      return res.json({
        msg: "failed to create todo",
        status: 500,
        route: "/create",
        error: e,
      });
    }
  }
  async readAll(req: Request, res: Response) {
    try {
      const toDoRecords = await TodoInstance.findAll({ where: {} });
      return res.json(toDoRecords);
    } catch (e) {
      return res.json({
        msg: "failed to read todo",
        status: 500,
        route: "/read",
        error: e,
      });
    }
  }

  async inComplete(req: Request, res: Response) {
    try {
      const activeToDoRecords = await TodoInstance.findAll({
        where: { status: false },
        order: [["dueDate", "ASC"]],
      });
      return res.json(activeToDoRecords);
    } catch (e) {
      return res.json({
        msg: "failed to read incomplete todo",
        status: 500,
        route: "/read",
        error: e,
      });
    }
  }
  async complete(req: Request, res: Response) {
    try {
      const inActiveToDoRecords = await TodoInstance.findAll({
        where: { status: true },
        order: [["dueDate", "ASC"]],
      });
      return res.json(inActiveToDoRecords);
    } catch (e) {
      return res.json({
        msg: "failed to read completed todo",
        status: 500,
        route: "/read",
        error: e,
      });
    }
  }

  //Change status boolean

  async  status(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const toDoRecords = await TodoInstance.findOne({ where: { id } });
      if (!toDoRecords) {
        return res.json({ msg: "Cannot find todo ID" });
      }
      const changeToDoStatus = await toDoRecords.update({
        status: !toDoRecords.getDataValue("status"),
      });
      return res.json(changeToDoStatus);
    } catch (e) {
      return res.json({
        msg: "Failed to update todo",
        status: 500,
        route: "/status/:id",
        error: e,
      });
    }
  }
  //update toDo records

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const toDoRecords = await TodoInstance.findOne({ where: { id } });
      if (!toDoRecords) {
        return res.json({ msg: "Cannot find todo ID" });
      }
      const updatedToDoRecord = await toDoRecords.update({ ...req.body });
      return res.json(updatedToDoRecord);
    } catch (e) {
      return res.json({
        msg: "Failed to update todo",
        status: 500,
        route: "/update/:id",
        error: e,
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const toDoRecords = await TodoInstance.findOne({ where: { id } });
      if (!toDoRecords) {
        return res.json({ msg: "Cannot find todo ID" });
      }
      const deletedToDORecord = await toDoRecords.destroy();
      return res.json(deletedToDORecord);
    } catch (e) {
      return res.json({
        msg: "Failed to delete todo",
        status: 500,
        route: "/delete/:id",
        error: e,
      });
    }
  }

  sendAll(req: Request, res: Response) {

    const stringQuery = req.params.toString();
    console.log(stringQuery)
    // if (stringQuery !== ""){
      if (stringQuery !== 'completed' || 'read' || 'incomplete' || 'create' || 'delete' || 'status' || 'update'){
      return res.json({ 
        msg:"Please enter a valid query route", 
        status: 404, 

      });
    }
    // else {
    //   return res.send("Status: 200");
    // }
   
    //if empty = enter router
    // if route is entered do something
    //if route is wrong say there is no such route


  }
  checkAll(req: Request, res: Response) {
    
    const stringQuery = JSON.stringify(req.params[0]);
    console.log(JSON.stringify(req.params[0]))

    // if (JSON.stringify(req.query) === '{}'){
    //     return res.json({
    //       Status:"200",
    //       Message: "Server is running\n Enter a Route",
    //   })
    //   }
      
       if (stringQuery !== 'completed' || 'read' || 'incomplete' || 'create' || 'delete' || 'status' || 'update'){
        
        return res.json({
          Status:"200",
          Message: "Not a valid route",
      })

      }else if (JSON.stringify(req.params[0]) === ''){
            return res.json({
              Status:"200",
              Message: "Server is running\n Enter a Route",
          })
          }


      // else if (JSON.stringify(req.query) === '{}'){

      // }

   



    // console.log(req.query)
    // if (JSON.stringify(req.query) === '{}'){
    //   return res.send("Status:200")
    // }
    // return res.json({
    //   Status: 200,
    //   msg: 'Server is active, enter desired route'
    // })
   
  }
}

export default new ToDoController();
