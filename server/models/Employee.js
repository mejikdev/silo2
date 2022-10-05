import NewMongodbClient from "../package/mongodb/mongodb";
import microgen from "../package/sdk/microgen";
var mongo = require("mongodb");

const dbName = "employees";
class Employee {
  constructor(name, title, department, salary, dateOfHired, _id) {
    this._id = _id;
    this.name = name;
    this.department = department;
    this.salary = salary;
    this.dateOfHired = dateOfHired;
    this.title = title;
  }

  /**
   *
   * @param {Employees} employees
   * @returns
   */
  Add = async (employees) => {
    const client = await NewMongodbClient();

    if (employees._id) {
      employees._id = mongo.ObjectId(employees._id);
    }

    const employeesData = await client.collection(dbName).insertOne(employees);

    employees._id = employeesData.insertedId;
    return employees;
  };

  Get = async (id, objectFilter) => {
    const client = await NewMongodbClient();
    let filter = {};

    if (objectFilter) {
      filter = removeEmpty(objectFilter);
    }

    if (id) {
      filter._id = new mongo.ObjectId(id);
    }

    return client.collection(dbName).find(filter).toArray();
  };

  /**
   *
   * @param {Employees} employees
   * @returns
   */
  Update = async (id, employee) => {
    const client = await NewMongodbClient();

    const newObj = removeEmpty(employee);

    const employeesData = await client.collection(dbName).updateOne(
      {
        _id: new mongo.ObjectId(id),
      },
      {
        $set: newObj,
      }
    );

    return employeesData.modifiedCount;
  };

  Delete = async (id) => {
    const client = await NewMongodbClient();

    const res = await client.collection(dbName).deleteOne({
      _id: new mongo.ObjectId(id),
    });

    return res.deletedCount;
  };
}

function removeEmpty(obj) {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => {
      return (
        v != null &&
        v != 0 &&
        v != "" &&
        v != undefined &&
        typeof v != "function"
      );
    })
  );
}

export default Employee;
