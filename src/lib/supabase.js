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
 * Qualifications the Germany Nursing Program currently caters to.
 * Anything outside this list (e.g. "Other") is politely turned away.
 */
const QUALIFIED_QUALIFICATIONS = ['GNM', 'B.Sc Nursing', 'Post Basic B.Sc', 'M.Sc Nursing'];

export function isQualified(qualification) {
  return QUALIFIED_QUALIFICATIONS.includes((qualification || '').trim());
}

/**
 * Submits a website eligibility-form lead.
 *
 * Behaviour:
 *  - Qualification gate: if the qualification is not a recognised nursing
 *    qualification, the lead is NOT stored and NOT assigned. Returns
 *    { qualified: false } so the UI can show a polite "we only cater to a
 *    specific audience — we'll reach out if that changes" message. The user
 *    should therefore not expect a call.
 *  - Qualified lead: inserted into v2_staging with source = "website" and
 *    status = "pending". The BD Team Lead assigns these to BDs from the
 *    staging queue (source 'website' is auto_assign=false in
 *    v2_pipeline_config, i.e. manual assignment).
 *  - Duplicate detection against the live CRM (v2_leads, by phone) is handled
 *    automatically by the BEFORE INSERT trigger trg_v2_staging_dedup, which
 *    marks the row status='duplicate' / duplicate_of. No client-side dedup or
 *    round-robin is needed.
 */
export async function submitLead({ name, phone, email, qualification, experience }) {
  // ── 1. Qualification gate ──────────────────────────────────────────────
  if (!isQualified(qualification)) {
    return { qualified: false };
  }

  // ── 2. Ingest into V2 staging for manual TL assignment ─────────────────
  const payload = {
    name:   name.trim(),
    phone:  normalisePhone(phone),
    source: 'website',
    status: 'pending',
    source_detail: {
      email:         email?.trim() || null,
      qualification,
      experience,
      form:          'germany_nursing_eligibility',
    },
  };

  const { data, error } = await db
    .from('v2_staging')
    .insert(payload)
    .select()
    .single();

  if (error) throw error;

  return { qualified: true, data };
}
