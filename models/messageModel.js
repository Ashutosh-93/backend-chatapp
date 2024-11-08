import mongoose from "mongoose";


const messageModel = mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    recieverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    message: {
      type: String
    }
  },
  {timestamps:true}
);
export default mongoose.model("Message", messageModel);
