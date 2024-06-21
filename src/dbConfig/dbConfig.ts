import mongoose from "mongoose";

export async function connect(){
  try {
    mongoose.connect(process.env.MONGO_URI!)
    const connection = mongoose.connection
    connection.on('connected' , () =>{
      console.log('connected to Mongo DB')
    })

    connection.on('error' , (err) =>{
      console.log('Error connecting to Mongo DB', err);
      process.exit(1);
    })

  } catch (error) {
    console.log("Something went wrong in Connecting Database");
    console.log(error)
  }
}