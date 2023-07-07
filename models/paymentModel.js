import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model to reference the user
    required: true
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model to reference the user
    required: true
  },

  amount: {
    type: Number,
    default: 0
  },
  type: {
    type: Number,
    default: 1
  }
});

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;
