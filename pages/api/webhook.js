import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/model/Order";
const stripe = require('stripe')(process.env.STRIPE_SECRET);
import {buffer} from 'micro';

const endpointSecret = "whsec_1579062bea29111a1362c133c26bbe3c348eebf8aaebd260ae16d50677c35112";

export default async function handler(req, res) {
    await mongooseConnect();
    const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(await buffer(req), sig, endpointSecret);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const paymentIntentSucceeded = event.data.object;
      const orderId = paymentIntentSucceeded.metadata.orderId;
      const paid = paymentIntentSucceeded.payment_status === 'paid';
      if (orderId && paid) {
        await Order.findByIdAndUpdate(orderId, {
            paid:true,
        })
      }

      // Then define and call a function to handle the event payment_intent.succeeded
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).send('ok')
}

export const config = {
    api: {bodyParser: false,}
}

///good-salute-trust-glitz

// acct_1NdxjBDNnuCOxQta