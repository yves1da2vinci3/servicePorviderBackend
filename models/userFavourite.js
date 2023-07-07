import mongoose from "mongoose";

const userFavouriteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model to reference the user
    required: true
  },
 
  Favourites: {
    type: Array,
  }
});

const UserFavourite = mongoose.model('UserFavourite', userFavouriteSchema);

export default UserFavourite;
