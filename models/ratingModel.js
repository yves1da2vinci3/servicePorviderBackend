import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
  user : {
    type:mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model to reference the user
    required: true
  },
  comment: {
    type: String,
    required: true,
  },
  photoUrl: {
    type:String ,
    required: true
  },

  offer: {
    type:  mongoose.Schema.Types.ObjectId,
    ref : "Offer",
    default: false
  },
});

const Rating = mongoose.model('Rating', ratingSchema);

export default Rating;
