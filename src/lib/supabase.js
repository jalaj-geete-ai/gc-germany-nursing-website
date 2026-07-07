import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL  = 'https://lrcimdchhbsgbnvdmpwd.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxyY2ltZGNoaGJzZ2JudmRtcHdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0MzAwMzcsImV4cCI6MjA5MDAwNjAzN30.1MfNvTNGTUNuUIL-lN3vZH7Kpcn6t1naiq07KTUEDEk';

export const db = createClient(SUPABASE_URL, SUPABASE_ANON);

/**
 * Normalises a phone string to 10 digits (strips +91, spaces, dashes).
 */
function normalisePhone(raw = '') {
  let p = raw.replace(/\D/g, '');
  if (p.startsWith('91') && p.length === 12) p = p.slice(2);
  return p;
}

/**
 * Submits a website lead.
 *
 * Behaviour:
 *  - source is always stored as "website" → shows as "website" in the
 *    📥 Social Media Leads tab of the BD dashboard.
 *  - Dedup rule 1: if phone already exists in form_leads → skip (return
 *    { skipped: true, reason: 'form_leads' }).
 *  - Dedup rule 2: if phone already exists in the users table (CRM v2 /
 *    video funnel) → skip (return { skipped: true, reason: 'users' }).
 *  - New lead → round-robin BD assignment via bd_counter, then insert.
 */
export async function submitLead({ name, phone, email, qualification, experience }) {
  const cleanPhone = normalisePhone(phone);

  // ── 1. Dedup: check form_leads AND users (CRM v2) in parallel ──────────
  const [flRes, usersRes] = await Promise.all([
    db.from('form_leads')
      .select('id, lead_phone, bd_name')
      .eq('lead_phone', cleanPhone)
      .maybeSingle(),

    db.from('users')
      .select('id, phone')
      .eq('phone', cleanPhone)
      .maybeSingle(),
  ]);

  if (flRes.data) {
    // Already in Social Media / Form Leads — skip silently (no duplicate)
    return { skipped: true, reason: 'form_leads', bd: flRes.data.bd_name };
  }

  if (usersRes.data) {
    // Already in CRM v2 (video funnel users table) — skip silently
    return { skipped: true, reason: 'users' };
  }

  // ── 2. Round-robin BD assignment (mirrors bd_dashboard logic) ──────────
  const [bdRes, ctrRes] = await Promise.all([
    db.from('bd_members').select('name').eq('is_active', true).order('name'),
    db.from('bd_counter').select('next_idx').eq('id', 1).single(),
  ]);

  const BDS    = (bdRes.data || []).map((b) => b.name);
  const idx    = ctrRes.data?.next_idx ?? 0;
  const bdName = BDS.length ? BDS[idx % BDS.length] : null;

  // ── 3. Build payload ───────────────────────────────────────────────────
  const notes = [
    `Qualification: ${qualification}`,
    `Experience: ${experience}`,
  ].join(' | ');

  const payload = {
    lead_name:          name.trim(),
    lead_phone:         cleanPhone,
    lead_email:         email?.trim() || null,
    source:             'website',          // shows as "website" in the dashboard
    notes,
    bd_name:            bdName,
    call_status:        'not_called',
    lead_status:        'pending',
    call_duration_mins: 0,
    uploaded_at:        new Date().toISOString(),
    updated_at:         new Date().toISOString(),
  };

  const { data, error } = await db
    .from('form_leads')
    .insert(payload)
    .select()
    .single();

  if (error) throw error;

  // ── 4. Advance the round-robin counter ─────────────────────────────────
  if (BDS.length) {
    await db
      .from('bd_counter')
      .update({ next_idx: (idx + 1) % BDS.length })
      .eq('id', 1);
  }

  return { skipped: false, data };
}
