import { MongoClient, ServerApiVersion } from 'mongodb'; //this is mandatory   
const { MONGODB_URI, MONGODB_Database } = process.env;


//define the client
const client = new MongoClient(MONGODB_URI,{
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});


  try {
    //connect the client to the server
    await client.connect();
    //send a ping
    await client.db().command({ ping: 1 });
    console.log('Pinged your deployment.... You successfully connected to MongoDB!');
  } catch(err) {
    console.error(err);
  }



export const db = client.db(MONGODB_Database);