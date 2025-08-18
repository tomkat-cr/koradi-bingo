import mongoose from 'mongoose';

const drawStateSchema = new mongoose.Schema({
  active: { type: Boolean, default: true },
  drawnNumbers: { type: [Number], default: [] },
  lastNumber: Number,
  startedAt: { type: Date, default: Date.now }
});

export default mongoose.model('DrawState', drawStateSchema);