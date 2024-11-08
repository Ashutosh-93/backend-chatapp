import mongoose from "mongoose";
const connectDB = async () => {
  try {
    mongoose.connect(`mongodb://localhost:27017/ChattingApp`).then(() => {
      console.log("database connected");
    });
  } catch (err) {
    console.log(`error in database: ${err}`);
  }
};

export default connectDB;
