-- Run this in your Supabase SQL Editor to create the orders table

CREATE TABLE IF NOT EXISTS orders (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email       TEXT NOT NULL,
  theme       TEXT NOT NULL,
  title       TEXT DEFAULT '',
  polygon_type TEXT NOT NULL,
  face_icons  JSONB NOT NULL DEFAULT '{}',
  order_type  TEXT NOT NULL DEFAULT 'physical',  -- 'digital' | 'physical'
  order_time  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  lang        TEXT DEFAULT 'zh',
  status      TEXT DEFAULT 'pending',             -- 'pending' | 'paid' | 'sent'
  stripe_session_id TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast lookups by email and status
CREATE INDEX IF NOT EXISTS orders_email_idx  ON orders (email);
CREATE INDEX IF NOT EXISTS orders_status_idx ON orders (status);

-- Row Level Security: only service role can read/write
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role only" ON orders
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');
