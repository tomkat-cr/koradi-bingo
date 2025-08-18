import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, index: true },
  name: String,
  phone: String,
  country: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('User', userSchema);