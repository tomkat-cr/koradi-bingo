import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: { type: Number, required: true }, // en centavos de COP si viene de Stripe
  currency: { type: String, default: 'COP' },
  type: { type: String, enum: ['donation', 'card'], default: 'donation' },
  provider: String, // stripe, paypal, manual
  providerId: String, // id de pago (charge/payment_intent)
  status: { type: String, enum: ['succeeded', 'pending', 'failed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Donation', donationSchema);