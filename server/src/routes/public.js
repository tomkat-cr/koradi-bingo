import { Router } from 'express';
import Donation from '../models/Donation.js';
import BingoCard from '../models/BingoCard.js';
import DrawState from '../models/DrawState.js';
import User from '../models/User.js';
import Config from '../models/Config.js';
import { createCheckoutSession } from '../services/payments.js';
import { env } from '../config/env.js';
import { checkBingo } from '../services/bingo.js';
import { generateIntegrityHash } from '../utils/boldPaymentsServer.js';
import { debug } from '../utils/utilities.js';

const router = Router();

router.get('/health', (req,res)=>res.json({ ok:true }));

router.get('/progress', async (req,res)=>{
  const agg = await Donation.aggregate([
    { $match: { status: 'succeeded' } },
    { $group: { _id: null, total: { $sum: '$amount' } } }
  ]);
  const total = agg[0]?.total || 0; // COP (sin decimales)
  res.json({ total, goalMin: env.GOAL_MIN, goalMax: env.GOAL_MAX });
});

router.post('/checkout', async (req,res,next)=>{
  try{
    const { email, name, phone, documentType, documentNumber, type, amount, currency, paymentProvider, orderId } = req.body;
    const url = await createCheckoutSession({ email, name, phone, documentType, documentNumber, type, amount, currency, paymentProvider, orderId });
    res.json({ url });
  }catch(e){ next(e); }
});

router.post('/bold-hash', async (req,res,next)=>{
  try{
    const { orderId, amount, currency } = req.body;
    const hash = await generateIntegrityHash(orderId, amount, currency);
    if (debug) console.log('>> bold-hash result:', hash);
    res.json({ hash: hash, error: false, error_message: '' });
  }catch(e){ 
    if (debug) console.log('>> bold-hash error:', e);
    res.json({ hash: '', error: true, error_message: e.message });
    next(e); 
  }
});

router.get('/my-card', async (req,res)=>{
  const email = req.query.email;
  if(!email) return res.status(400).json({ error: 'email requerido' });
  const user = await User.findOne({ email });
  if(!user) return res.status(404).json({ error: 'Usuario no encontrado' });
  const card = await BingoCard.findOne({ assignedTo: user._id });
  if(!card) return res.status(404).json({ error: 'No hay cartón asignado aún' });
  res.json({ card });
});

router.get('/live-url', async (req,res)=>{
  let config = await Config.findOne({ key: 'live_url' });
  // if(!config) return res.status(404).json({ error: 'URL de transmisión no configurada' });
  if(!config) {
    await Config.create({
      key: 'live_url',
      value: 'https://www.youtube.com/embed/live_stream?channel=UCxxxxxxxx'
    });
    config = await Config.findOne({ key: 'live_url' });
  }
  // const url = "";
  const url = {
    url: config.value
  };
  res.json({ url });
});

// Reclamo de BINGO y verificación automática
router.post('/claim-bingo', async (req,res)=>{
  const { email } = req.body;
  if(!email) return res.status(400).json({ error: 'email requerido' });
  const user = await User.findOne({ email });
  if(!user) return res.status(404).json({ error: 'Usuario no encontrado' });
  const card = await BingoCard.findOne({ assignedTo: user._id });
  if(!card) return res.status(404).json({ error: 'No hay cartón para este usuario' });
  const state = await DrawState.findOne({}) || await DrawState.create({});
  const isWinner = checkBingo(card, state.drawnNumbers || []);
  if(isWinner){
    // Notificar en tiempo real al staff
    req.io.emit('bingo:claim', { email, cardCode: card.code });
  }
  res.json({ winner: isWinner, drawn: state.drawnNumbers });
});

router.get('/draw/state', async (req,res)=>{
  const state = await DrawState.findOne({}) || await DrawState.create({});
  res.json({ drawn: state.drawnNumbers, last: state.lastNumber });
});

export default router;