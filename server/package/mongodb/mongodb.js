// mongodb.js

import { MongoClient } from "mongodb";

const NewMongodbClient = async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error("Add Mongo URI to .env.local");
  }

  const uri = process.env.DATABASE_URL;
  const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  };

  let client;
  let clientPromise;

  client = new MongoClient(uri, options);
  clientPromise = (await client.connect()).db(process.env.DATABASE_NAME);
  return clientPromise;
};

export default NewMongodbClient;
