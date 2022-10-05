import NewMongodbClient from "../package/mongodb/mongodb";

var mongo = require("mongodb");

const dbName = "users";
class User {
  constructor(first, last, email, password, phone) {
    this._id;
    this.firstName = first;
    this.lastName = last;
    this.email = email;
    this.password = password;
    this.phone = phone;
  }

  /**
   *
   * @param {User} user
   * @returns
   */
  Add = async (user) => {
    const client = await NewMongodbClient();
    const userData = await client.collection(dbName).insertOne(user);

    user._id = userData.insertedId;
    return user;
  };

  Get = async (id, email) => {
    const client = await NewMongodbClient();
    const filter = {};

    if (id) {
      filter._id = new mongo.ObjectId(id);
    }

    if (email) {
      filter.email = email;
    }

    return client.collection(dbName).find(filter).toArray();
  };
}

export default User;
