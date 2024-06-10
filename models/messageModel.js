import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming you have a User model to reference the user
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  reservationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Reservation", // Assuming you have a User model to reference the user
    required: true,
  },
  read: { type: Boolean, default: false },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model("Message", messageSchema);

export default Message;
