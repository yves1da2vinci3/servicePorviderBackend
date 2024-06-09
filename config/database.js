import mongoose from "mongoose";
const localDBUrl = 'mongodb://mongo_USER:mongo_password@localhost:27017/';
import dotenv from 'dotenv'
dotenv.config()
// Connect to MongoDB
const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MongoUri || localDBUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
};

export default connectToDB