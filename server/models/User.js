import NewMongodbClient from "../package/mongodb/mongodb";

const dbName = "users";
class User {
  constructor(first, last, email, phoneNumber) {
    this._id;
    this.firstName = first;
    this.lastName = last;
    this.email = email;
    this.phoneNumber = phoneNumber;
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
      filter._id = id;
    }

    if (email) {
      filter.email = email;
    }

    return client.collection(dbName).find(filter).toArray();
  };
}

export default User;
