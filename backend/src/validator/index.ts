import { body, param, query } from "express-validator";
//Data Validation
class TodoValidator {
  checkCreateTodo() {
    return [
      body("id")
        .optional()
        .isUUID(4)
        .withMessage("The value should be UUID v4"),
      body("title").notEmpty().withMessage("Title must have a value"),
      body("description")
        .notEmpty()
        .withMessage("Description must have a value"),
      body("dueDate")
        .notEmpty()
        .withMessage("Due Date must have value")
        .isISO8601()
        .toDate()
        .withMessage("Invalid date format"),
      body("ordinal")
        .notEmpty()
        .withMessage("Ordinal must have a value")
        .isNumeric()
        .withMessage("Ordinal must be a number"),
      body("status")
        .optional()
        .isBoolean()
        .withMessage("Status value sould be a boolean")
        .isIn([0, false])
        .withMessage("Boolean value should be false"),
    ];
  }
  checkReadTodo() {
    return [
      query("id")
        .notEmpty()
        .withMessage("Query requires ID")
        .isUUID(4)
        .withMessage("The value should be UUID v4"),
    ];
  }
  checkIdParams() {
    return [
      param("id")
        .notEmpty()
        .withMessage("The value should not be empty")
        .isUUID(4)
        .withMessage("The value should be UUID v4"),
    ];
  }
  checkTodo() {
    return [
      query("id")
        .notEmpty()
        .withMessage("Query requires ID")
        .isUUID(4)
        .withMessage("The value should be UUID v4"),
    ];
  }
  checkQuery() {

    return [
      query("query")
        .notEmpty()
        .withMessage("Query Can't be empty"),
    ];
  }
}

export default new TodoValidator();
