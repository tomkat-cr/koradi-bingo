import dotenv from 'dotenv';
dotenv.config();

export const env = {
  PORT: process.env.PORT || 4000,
  MONGO_URI: process.env.MONGO_URI,
  CORS_ORIGIN: process.env.CORS_ORIGIN || '*',
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
  ORG_NAME: process.env.ORG_NAME || 'Fundación Koradi',
  GOAL_MIN: Number(process.env.GOAL_MIN || 21100000),
  GOAL_MAX: Number(process.env.GOAL_MAX || 24100000),
  BINGO_PRICE: Number(process.env.BINGO_PRICE || 30000)
};