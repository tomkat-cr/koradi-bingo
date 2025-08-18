import { Router } from 'express';
import DrawState from '../models/DrawState.js';

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

router.post('/draw/reset', async (req,res)=>{
  const state = await DrawState.findOne({});
  if(state){ state.drawnNumbers=[]; state.lastNumber=null; await state.save(); }
  req.io.emit('draw:reset', {});
  res.json({ ok: true });
});

export default router;