// Vercel Serverless Function — collect physical orders to Supabase
const { createClient } = require('@supabase/supabase-js');

// Simple in-memory rate limit (resets on cold start, good enough for low traffic)
const ipHits = new Map();
function isRateLimited(ip) {
  const now = Date.now();
  const hits = ipHits.get(ip) || [];
  const recent = hits.filter(t => now - t < 60_000); // 1 minute window
  if (recent.length >= 5) return true; // max 5 per minute per IP
  ipHits.set(ip, [...recent, now]);
  return false;
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const ip = req.headers['x-forwarded-for']?.split(',')[0] || 'unknown';
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many requests' });
  }

  const { email, theme, title, polygon, faceIcons, orderTime, lang, orderType } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email required' });
  }
  if (!theme || !polygon) {
    return res.status(400).json({ error: 'theme and polygon are required' });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

  console.log('[DEBUG] SUPABASE_URL length:', supabaseUrl ? supabaseUrl.length : 0);
  console.log('[DEBUG] SUPABASE_SERVICE_KEY length:', supabaseKey ? supabaseKey.length : 0);

  if (!supabaseUrl || !supabaseKey) {
    console.log('[DEV] Order received:', { email, theme, polygon, faceIcons, orderTime });
    return res.status(200).json({ success: true, dev: true });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const { error } = await supabase.from('orders').insert({
    email,
    theme,
    title: title || '',
    polygon_type: polygon,
    face_icons: faceIcons,
    order_type: orderType || 'physical',
    order_time: orderTime || new Date().toISOString(),
    lang: lang || 'zh',
    status: 'pending',
  });

  if (error) {
    console.error('Supabase insert error:', error);
    return res.status(500).json({ error: 'Database error' });
  }

  return res.status(200).json({ success: true });
};
