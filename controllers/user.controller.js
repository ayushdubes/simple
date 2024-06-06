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
      
      const query = {_id:new ObjectId(req.params.id)};
      const user = await collection.findOne(query);

      if(!user){
        return next({status:404,message:'user not found'});
      }
    res.status(200).json(user);
    } catch (error){
      console.error(`Error fetching user: ${error.message}`); // Logging the error

      next({status:500, error});
    }
};

// updateUser function                        
export const updateUser = async (req, res, next) =>{
  try{
    //check if password is present and then hash it using salt
    if(req.body.password){
      req.body.password = await bcrypt.hash(req.body.password,10);
    }
    //find out the query - which user to update
    const query = {_id: new ObjectId(req.params.id)}

    // set the data to be updated
    const data = {
      $set: {
        ...req.body,
        updatedAt: new Date().toISOString()
      },
    }
    // option of when to retirn the updated document

    const options = {
      returnDocument: 'after',
    }
    // update the document

    const updatedUser = await collection.findOneAndUpdate(query,data,options);

    //spread the document entries and hide sensitive information

    const{password:pass, updatedAt, createdAt, ...rest} = uupdatedUser;
    res.status(200).json(updatedUser);
    
  } catch(error){
    next({status:500, error});
  } 
}


export const deleteUser = async(req,res,next) =>{
  try{
    //find the user to be deleted
    const query = {_id: new ObjectId(req.params.id)};
    const user = await collection.findOne(query);

    if(!user){
      return res.status(404).json({message: 'user not found'});
    }
    //delete the user
    await collection.deleteOne(query);
    res.status(200).json({message: 'user deleted'});
  } catch(error){
    next({status:500, error});
  }
}