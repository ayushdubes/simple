import {db} from '../libs/dbConnect.js';
import {ObjectId} from 'mongodb';	
const collection = db.collection('users');

export const test = async (req, res) =>{
  try {
    //finding everything in collection users and putting it in an array
    const result = await collection.find({}).toArray();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
}

// getUser function 

export const getUser = async (req, res, next) =>{
    try{
      const id = req.params.id;
      console.log(`Received ID: ${id}`); // Logging the received ID
      
      const query = {_id: new ObjectId(req.params.id)};
      const user = await collection.findOne(query);

      if(!user){
        return res.status(404).json({message: 'user not found'});
      }
    res.status(200).json(user);
    } catch (error){
      console.error(`Error fetching user: ${error.message}`); // Logging the error

      next({status:500, error});
    }
};

// updateUser function                        
