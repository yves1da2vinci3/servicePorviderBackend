import mongoose from "mongoose";

const FavouriteItemSchema = new mongoose.Schema({
  offer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Offer', // Assuming you have a User model to reference the user
    required: true
  },
  status : {
    type :Boolean,
    required :  true,
    default : 0  
  }
});
const userFavouriteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model to reference the user
    required: true
  },
 
  Favourites: [FavouriteItemSchema]
});

const UserFavourite = mongoose.model('UserFavourite', userFavouriteSchema);

export default UserFavourite;
