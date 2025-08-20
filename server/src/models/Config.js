import mongoose from 'mongoose';

const configSchema = new mongoose.Schema({
  key: { type: String, index: true },
  value: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Config', configSchema);