import mongoose from 'mongoose';

const cellSchema = new mongoose.Schema({
  col: Number, // 0..4
  value: Number // número del bingo en esa columna
}, { _id: false });

const bingoCardSchema = new mongoose.Schema({
  code: { type: String, unique: true }, // identificador único del cartón
  cells: [cellSchema], // 24 celdas, centro libre implícito
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  purchased: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('BingoCard', bingoCardSchema);