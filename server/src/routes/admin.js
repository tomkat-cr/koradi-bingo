import { Router } from 'express';
import DrawState from '../models/DrawState.js';
import Config from '../models/Config.js';
import { env } from '../config/env.js';
import { debug } from '../utils/utilities.js';

const router = Router();

// sorteo: sacar siguiente número
router.post('/draw/next', async (req,res)=>{
  const state = await DrawState.findOne({}) || await DrawState.create({});
  const all = Array.from({length:75}, (_,i)=>i+1);
  const pool = all.filter(n=>!state.drawnNumbers.includes(n));
  if(!pool.length) return res.status(400).json({ error: 'No quedan números' });
  const next = pool[Math.floor(Math.random()*pool.length)];
  state.drawnNumbers.push(next);
  state.lastNumber = next;
  await state.save();
  // Emitir a todos vía socket
  req.io.emit('number:drawn', { number: next, drawn: state.drawnNumbers });
  res.json({ next, drawn: state.drawnNumbers });
});

// sorteo: actualizar websocket
router.post('/draw/update', async (req,res)=>{
  const state = await DrawState.findOne({}) || await DrawState.create({});
  req.io.emit('number:drawn', { drawn: state.drawnNumbers, last: state.lastNumber });
  res.json({ drawn: state.drawnNumbers, last: state.lastNumber });
});

router.post('/draw/reset', async (req,res)=>{
  const state = await DrawState.findOne({});
  if(state){ state.drawnNumbers=[]; state.lastNumber=null; await state.save(); }
  req.io.emit('draw:reset', {});
  res.json({ ok: true });
});

router.post('/login', async (req,res)=>{
  const { username, password } = req.body;
  if(username !== env.ADMIN_USERNAME || password !== env.ADMIN_PASSWORD) return res.status(401).json({ error: 'Credenciales inválidas' });
  res.json({ ok: true });
});

router.post('/set-live-url', async (req,res)=>{
  const { url } = req.body;
  if (debug) console.log('Received URL:', url);
  const config = await Config.findOne({ key: 'live_url' });
  if(!config) {
    await Config.create({
      key: 'live_url',
      value: url
    });
    if (debug) console.log('Live URL created:', url);
  } else {
    config.value = url;
    await config.save();
    if (debug) console.log('Live URL updated:', url);
  }
  res.json({ ok: true });
});

export default router;
