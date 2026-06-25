// Vercel Serverless Function — create Stripe Checkout session
const Stripe = require('stripe');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  if (!process.env.STRIPE_SECRET_KEY) {
    return res.status(503).json({ error: 'Stripe not configured' });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' });
  const { orderData } = req.body;
  const origin = req.headers.origin || process.env.APP_URL || 'http://localhost:3000';

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: {
          name: 'CipherOptics 数字高清图',
          description: `主题: ${orderData.theme} | 多面体: ${orderData.polygon} | 5000×5000 WebP 300DPI`,
        },
        unit_amount: 999, // $9.99
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: `${origin}/success.html?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}`,
    metadata: {
      theme: orderData.theme,
      polygon: orderData.polygon,
      title: orderData.title || '',
      faceIcons: JSON.stringify(orderData.faceIcons),
      orderTime: orderData.orderTime,
    },
  });

  return res.status(200).json({ url: session.url });
};
