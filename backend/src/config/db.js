const mongoose = require("mongoose");

let isConnected = false;

const connectDB = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URI) {
    return console.log("MONGODB_URI is not defined");
  }

  if (isConnected) {
    console.log("=> using existing database connection");
    return;
  }

  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/nk-skilledge`);
    
    isConnected = !!connectionInstance.connections[0].readyState;
    console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("MONGODB connection FAILED ", error);
    process.exit(1);
  }
};

module.exports = connectDB;
