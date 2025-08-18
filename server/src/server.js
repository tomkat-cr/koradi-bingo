import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import http from 'http';
import { Server } from 'socket.io';
import { connectDB } from './config/db.js';
import { env } from './config/env.js';
import publicRoutes from './routes/public.js';
import adminRoutes from './routes/admin.js';
import { handleStripeWebhook } from './services/payments.js';

const app = express();

// 🔔 Webhook de Stripe: debe ir ANTES de express.json()
app.post('/api/stripe/webhook', express.raw({ type: 'application/json' }), async (req,res)=>{
  try{
    const sig = req.headers['stripe-signature'];
    const result = await handleStripeWebhook(sig, req.body);
    res.json(result);
  }catch(err){
    console.error(err);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
});

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: env.CORS_ORIGIN, methods: ['GET','POST'] } });

// Middlewares
app.use(morgan('dev'));
app.use(cors({ origin: env.CORS_ORIGIN }));
app.use(express.json());

// Inyectar io en req para rutas
app.use((req,res,next)=>{ req.io = io; next(); });

// Rutas
app.use('/api', publicRoutes);
app.use('/api/admin', adminRoutes);

// Socket.IO eventos básicos
io.on('connection', (socket)=>{
  console.log('🟢 Cliente conectado', socket.id);
  socket.on('disconnect', ()=> console.log('🔴 Cliente desconectado', socket.id));
});

// Arranque
await connectDB();
server.listen(env.PORT, ()=>{
  console.log(`🚀 API en http://localhost:${env.PORT}`);
});