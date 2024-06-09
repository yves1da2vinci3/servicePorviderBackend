import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  pushToken: {
    type: String,
    required: true,
    default : 'token'
  },
  phoneNumber: {
    type: String,
    length : 10,
    required: true
  },
  photoUrl: {
    type: String,
    default: '' // You can set a default photo URL if needed
  },
  isServiceProvider: {
    type: Boolean,
    default: false
  }
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})
const User = mongoose.model('User', userSchema);

export default User;
