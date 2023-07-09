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
  offerId : {
    type: mongoose.Schema.Types.ObjectId,
   ref : "Offer",
   required: true
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: Number,
    required: true,
    default : 0
  },
  providerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model to reference the user
    required: true
  },
  Date: {
    type: Date,
     default : Date.now()
  },
  endTime: {
    type: String,
   required : true
  },
  startTime: {
    type: String,
   required : true

  }
});

const Reservation = mongoose.model('Reservation', ReservationSchema);

export default Reservation;
