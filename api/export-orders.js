// Admin CSV export endpoint
// GET /api/export-orders?secret=YOUR_ADMIN_SECRET
const { createClient } = require('@supabase/supabase-js');

function toCSV(rows) {
  if (!rows.length) return '';
  const cols = ['id', 'email', 'theme', 'title', 'polygon_type',
    'face_icons', 'order_type', 'order_time', 'lang', 'status', 'created_at'];
  const esc = v => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const header = cols.join(',');
  const body = rows.map(r =>
    cols.map(c => c === 'face_icons' ? esc(JSON.stringify(r[c])) : esc(r[c])).join(',')
  ).join('\n');
  return `${header}\n${body}`;
}

module.exports = async (req, res) => {
  // Simple secret-key protection (set ADMIN_SECRET in Vercel env vars)
  const secret = process.env.ADMIN_SECRET;
  if (secret && req.query.secret !== secret) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
    return res.status(503).json({ error: 'Supabase not configured' });
  }

  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

  const statusFilter = req.query.status; // e.g. ?status=pending
  let query = supabase.from('orders').select('*').order('created_at', { ascending: false });
  if (statusFilter) query = query.eq('status', statusFilter);

  const { data, error } = await query;
  if (error) return res.status(500).json({ error: error.message });

  const csv = toCSV(data);
  const filename = `orders_${new Date().toISOString().slice(0, 10)}.csv`;

  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  res.send('﻿' + csv); // BOM for Excel UTF-8 compatibility
};
