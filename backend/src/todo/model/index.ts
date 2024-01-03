import { Model, DataTypes } from "sequelize";
import db from "../../config/db.config";
//Initialise Model Schema
interface Todo {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  ordinal: number;
  status: boolean;
}
export class TodoInstance extends Model<Todo> {}

TodoInstance.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    ordinal: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize: db,
    tableName: "todos",
  }
);
