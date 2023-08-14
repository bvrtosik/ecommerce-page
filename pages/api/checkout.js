import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/model/Order";
import { Product } from "@/model/Product";
const stripe = require('stripe')(process.env.STRIPE_SECRET);

export default async function hanlder(req, res) {
  if (req.method !== "POST") {
    res.json("POST wymagany");
    return;
  }
  await mongooseConnect();
  const { name, email, city, postCode, street, numberHome, cartProducts } = req.body;
  const productsIds = cartProducts;
  const uniqueIds = [...new Set(productsIds)];
  const productsInfos = await Product.find({_id: uniqueIds});

  let line_items = [];
  for (const productId of uniqueIds) {
    const productInfo = productsInfos.find(p => p._id.toString() === productId);
    const quantity = productsIds.filter(id => id === productId)?.length || 0;
    if (quantity > 0 && productInfo) {
      line_items.push({
        quantity,
        price_data: {
          currency: 'PLN',
          product_data: {name: productInfo.title},
          unit_amount: quantity * productInfo.price * 100,
        },
      });
    }
  }
  
  const orderDoc = await Order.create({
    line_items,name,email,city,postCode,street,numberHome,paid:false,
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    customer_email: email,
    success_url: process.env.HOME_URL + '/cart?success=1',
    cancel_url: process.env.HOME_URL + '/cart?canceled=1',
    metadata: {orderId: orderDoc._id.toString()},
  });

  res.json({
    url:session.url,
  })
}


