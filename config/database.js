import mongoose from "mongoose";
const localDBUrl = 'mongodb://mongo_USER:mongo_password@localhost:27017/';

// Connect to MongoDB
const connectToDB = async () => {
  try {
    await mongoose.connect(localDBUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
};

export default connectToDB