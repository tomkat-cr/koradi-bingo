import Stripe from 'stripe';
import Donation from '../models/Donation.js';
import User from '../models/User.js';
import { env } from '../config/env.js';
import { isBoldEnabled } from '../utils/boldPaymentsServer.js';
import { debug } from '../utils/utilities.js';
import { assignNewCard } from './bingo.js';

const stripe = new Stripe(env.STRIPE_SECRET_KEY);

/**
 * Nota Stripe (COP): moneda sin decimales en Stripe. `unit_amount` y `amount_total`
 * están expresados en pesos (no centavos).
 */
export async function createCheckoutSession({ email, name, phone, documentType, documentNumber, type, amount, currency, paymentProvider, orderId }){
  // type: 'card' (comprar cartón) | 'donation' (donación libre)
  const isCard = type === 'card';
  const finalAmount = isCard ? Number(amount || env.BINGO_PRICE) : Number(amount || 0);

  const line_items = [{
    price_data: {
      currency: currency,
      product_data: { name: isCard ? `Cartón de Bingo – ${env.ORG_NAME}` : `Donación – ${env.ORG_NAME}` },
      unit_amount: finalAmount,
    },
    quantity: 1,
  }];

  if (debug) console.log('createCheckoutSession', { email, name, phone, documentType, documentNumber, type, amount, finalAmount, currency, paymentProvider, orderId, isCard });

  if (isBoldEnabled && paymentProvider === 'bold'){

    const user = await User.findOneAndUpdate({ email }, { email, name, phone }, { upsert: true, new: true });
    await Donation.create({ user: user._id, amount: finalAmount, currency: currency, type, provider: 'bold', providerId: orderId, status: 'succeeded' });
    if (isCard) await assignNewCard(user, true);
    return 'bold_ok'

  } else {

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items,
      phone_number_collection: { enabled: true },
      customer_email: email,
      success_url: `${env.CORS_ORIGIN}/donation_result?stripe-order-id=${orderId}&stripe-tx-status=approved`,
      cancel_url: `${env.CORS_ORIGIN}/donation_result?stripe-order-id=${orderId}&stripe-tx-status=failed`,
      metadata: { type, name, phone }
    });
  
    // registrar intento
    const user = await User.findOneAndUpdate({ email }, { email, name, phone }, { upsert: true, new: true });
    await Donation.create({ user: user._id, amount: finalAmount, currency: currency, type, provider: 'stripe', providerId: session.id, status: 'pending' });
  
    return session.url;    
  }
}

export async function handleStripeWebhook(sig, payload){
  const event = stripe.webhooks.constructEvent(payload, sig, env.STRIPE_WEBHOOK_SECRET);
  if(event.type === 'checkout.session.completed'){
    const session = event.data.object;
    const email = session.customer_details.email;
    const user = await User.findOneAndUpdate(
      { email },
      { email, name: session.metadata?.name, phone: session.metadata?.phone },
      { upsert: true, new: true }
    );

    // Stripe en COP (sin decimales)
    const amount_total = session.amount_total; // pesos
    const type = session.metadata?.type || 'donation';

    await Donation.findOneAndUpdate(
      { provider: 'stripe', providerId: session.id },
      { status: 'succeeded', amount: amount_total },
      { new: true }
    );

    if(type === 'card'){
      // asignar cartón único
      await assignNewCard(user, true);
    }
  }
  return { received: true };
}