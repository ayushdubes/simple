import 'dotenv/config';
import { db } from './libs/dbConnect.js';

const users = [{
    username:'ayush',
    email: 'ayush@gmail.com',	
    password: 'boom',
    avatar: 'someUrl',  
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
},{
    username:'boomer',
    email: 'boomer2@gmail.com',	
    password: 'yo yo',
    avatar: 'someurl',  
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
},
];

const tasks = [{
    name:'learn mern stack',
    description: 'description description',
    priority: 'urgent',	
    due: new Date().toISOString(),  
    status: 'open',  
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
},{
    name:'learn mean stack',
    description: 'description description description',
    priority: ' not so urgent',	
    due: new Date().toISOString(),  
    status: 'closed',  
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
},];

try {
    //seeding users
    let collection = await db.collection('users');
    console.log('[seed], seeding users started...  ');
    const result = await collection.insertMany(users);    
    console.log(result.insertedIds);
    console.log('[seed], seeding users completed...  ');

    //seeding tasks
    tasks[0].owner = result.insertedIds[0];
    tasks[1].owner = result.insertedIds[1];
    
    collection = await db.collection('tasks');
    console.log('[seed], seeding tasks started...  ');
    await collection.insertMany(tasks);
    console.log('[seed], seeding tasks completed...  ');
        
} catch (err) {
    console.error('Error creating users:', err);
}

process.exit();