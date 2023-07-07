import mongoose from "mongoose";

const OfferSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model to reference the user
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: Number,
    required: true
  },
  photoUrl: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    default : 0
  },
  reservationNumber: {
    type: Number,
    required: false,
    default : 0
  },
  hourRate: {
    type: Number,
    required: true
  },
 
});

const Offer = mongoose.model('Offer', OfferSchema);

export default Offer;
