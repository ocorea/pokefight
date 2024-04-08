const mongoose = require('mongoose');


// create the mongoose connection
//TODO: Check if connection exists
try{
    mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
    console.log('Mongoose connection created');
}catch(err){
    console.log('Error creating mongoose connection: ' + err);
}


module.exports = mongoose;