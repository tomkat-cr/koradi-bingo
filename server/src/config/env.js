import dotenv from 'dotenv';
dotenv.config();

export const env = {
  PORT: process.env.PORT || 4000,
  MONGO_URI: process.env.MONGO_URI,
  MONGO_DATABASE: process.env.MONGO_DATABASE,
  APP_DOMAIN_NAME: process.env.APP_DOMAIN_NAME || 'localhost',
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'bad_origin',
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
  BOLD_PRIVATE_KEY: process.env.BOLD_PRIVATE_KEY,
  ORG_NAME: process.env.ORG_NAME || 'Fundación Koradi',
  GOAL_MIN: Number(process.env.GOAL_MIN || 21100000),
  GOAL_MAX: Number(process.env.GOAL_MAX || 24100000),
  BINGO_PRICE: Number(process.env.BINGO_PRICE || 30000),
  ADMIN_USERNAME: process.env.ADMIN_USERNAME,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  SERVER_DEBUG: process.env.SERVER_DEBUG || '0',
};

if (env.SERVER_DEBUG === '1') console.log('Server | env:', env);
