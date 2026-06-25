// Admin API — update order status
const { createClient } = require('@supabase/supabase-js');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const adminSecret = process.env.ADMIN_SECRET;
  if (adminSecret) {
    const auth = req.headers.authorization || '';
    if (auth !== `Bearer ${adminSecret}`) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  }

  const { id, status } = req.body;
  if (!id || !status) return res.status(400).json({ error: 'id and status required' });

  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
  const { error } = await supabase.from('orders').update({ status }).eq('id', id);

  if (error) return res.status(500).json({ error: 'Database error' });
  return res.status(200).json({ success: true });
};
