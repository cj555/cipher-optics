// Vercel Serverless Function — collect physical orders to Supabase
const { createClient } = require('@supabase/supabase-js');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email, theme, title, polygon, faceIcons, orderTime, lang, orderType } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email required' });
  }
  if (!theme || !polygon) {
    return res.status(400).json({ error: 'theme and polygon are required' });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    // Dev mode: log and return success
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
