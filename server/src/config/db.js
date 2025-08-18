import mongoose from 'mongoose';
import { env } from './env.js';

const debug = true;

export async function connectDB(){
  mongoose.set('strictQuery', true);
  if(debug) console.log('\nMongoDB URI:', env.MONGO_URI);
  if(debug) console.log('MongoDB Database:', env.MONGO_DATABASE, '\n');
  await mongoose.connect(env.MONGO_URI, { dbName: env.MONGO_DATABASE });
  console.log('\n✅ MongoDB conectado');
}