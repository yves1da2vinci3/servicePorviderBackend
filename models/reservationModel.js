import mongoose from "mongoose";

const ReservationSchema = new mongoose.Schema({
  askerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model to reference the user
    required: true
  },
  location: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: Number,
    required: true,
  },
  providerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model to reference the user
    required: true
  },

  isServiceProvider: {
    type: Boolean,
    default: false
  },
  endTime: {
    type: Date,
   
  },
  startTime: {
    type: Date,
  }
});

const Reservation = mongoose.model('Reservation', ReservationSchema);

export default Reservation;
