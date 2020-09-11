//MongoDB connection
const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

//Contectin through mongoose, using the db URI
//Gives back a promise
//Use try/catch when using async await
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //Parameters suggested when ran for the first time for deprecated parts
    });
    console.log("MongoDB Connected...");
  } catch (error) {
    console.error(error.message);
    //Exit process with failure
    process.exit(1);
  }
};
//node js, export self contained unit "module"
module.exports = connectDB;
