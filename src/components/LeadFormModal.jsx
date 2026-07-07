import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLeadForm } from './LeadFormContext';
import { submitLead } from '../lib/supabase';

const initialForm = { name: '', phone: '', email: '', qualification: '', experience: '' };

export default function LeadFormModal() {
  const { isOpen, close, source } = useLeadForm();
  const [form, setForm]           = useState(initialForm);
  const [errors, setErrors]       = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  function update(field, value) { setForm((f) => ({ ...f, [field]: value })); }

  function validate() {
    const e = {};
    if (!form.name.trim() || form.name.trim().length < 2) e.name = 'Enter your full name';
    if (!/^[6-9]\d{9}$/.test(form.phone.trim())) e.phone = 'Enter a valid 10-digit mobile number';
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.qualification) e.qualification = 'Select your qualification';
    if (!form.experience) e.experience = 'Select your experience';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setServerError('');

    try {
      const result = await submitLead({
        name:          form.name,
        phone:         form.phone,
        email:         form.email,
        qualification: form.qualification,
        experience:    form.experience,
      });

      // Whether new or duplicate — show the same success screen.
      // The duplicate is silently skipped in the DB; the user still gets
      // a confirmation so they know we received their inquiry.
      if (result.skipped || !result.error) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error('Lead submission error:', err);
      setServerError('Something went wrong — please try again or WhatsApp us directly.');
    } finally {
      setSubmitting(false);
    }
  }

  function handleClose() {
    close();
    setTimeout(() => {
      setSubmitted(false);
      setForm(initialForm);
      setErrors({});
      setServerError('');
    }, 300);
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            className="modal-card"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <button className="modal-close" onClick={handleClose} aria-label="Close form">×</button>

            {!submitted ? (
              <>
                <span className="eyebrow">
                  {source === 'exit' ? 'Wait! Before you go' : 'Worth ₹999 — Free for you'}
                </span>
                <h3 className="modal-title">Get your free Germany eligibility check</h3>
                <p className="modal-sub">
                  Find out your salary estimate &amp; visa eligibility in 24 hours — no obligation, no cost.
                </p>

                <form onSubmit={handleSubmit} className="lead-form" noValidate>
                  <div className="field">
                    <label htmlFor="lf-name">Full name</label>
                    <input
                      id="lf-name" type="text" placeholder="e.g. Anjali Sharma"
                      value={form.name} onChange={(e) => update('name', e.target.value)}
                    />
                    {errors.name && <span className="field-error">{errors.name}</span>}
                  </div>

                  <div className="field">
                    <label htmlFor="lf-phone">Phone number</label>
                    <input
                      id="lf-phone" type="tel" inputMode="numeric"
                      placeholder="10-digit mobile number"
                      value={form.phone}
                      onChange={(e) => update('phone', e.target.value.replace(/\D/g, '').slice(0, 10))}
                    />
                    {errors.phone && <span className="field-error">{errors.phone}</span>}
                  </div>

                  <div className="field">
                    <label htmlFor="lf-email">Email (optional)</label>
                    <input
                      id="lf-email" type="email" placeholder="you@example.com"
                      value={form.email} onChange={(e) => update('email', e.target.value)}
                    />
                    {errors.email && <span className="field-error">{errors.email}</span>}
                  </div>

                  <div className="field-row">
                    <div className="field">
                      <label htmlFor="lf-qual">Qualification</label>
                      <select id="lf-qual" value={form.qualification}
                        onChange={(e) => update('qualification', e.target.value)}>
                        <option value="">Select</option>
                        <option>GNM</option>
                        <option>B.Sc Nursing</option>
                        <option>Post Basic B.Sc</option>
                        <option>M.Sc Nursing</option>
                        <option>Other</option>
                      </select>
                      {errors.qualification && <span className="field-error">{errors.qualification}</span>}
                    </div>

                    <div className="field">
                      <label htmlFor="lf-exp">Experience</label>
                      <select id="lf-exp" value={form.experience}
                        onChange={(e) => update('experience', e.target.value)}>
                        <option value="">Select</option>
                        <option>Fresher</option>
                        <option>0–1 years</option>
                        <option>1–3 years</option>
                        <option>3+ years</option>
                      </select>
                      {errors.experience && <span className="field-error">{errors.experience}</span>}
                    </div>
                  </div>

                  {serverError && (
                    <p className="field-error" style={{ textAlign: 'center', marginBottom: '8px' }}>
                      {serverError}
                    </p>
                  )}

                  <button type="submit" className="btn btn-primary form-submit" disabled={submitting}>
                    {submitting ? 'Submitting…' : 'Get My Free Salary Estimate →'}
                  </button>

                  <p className="form-disclaimer">
                    By submitting, you agree to be contacted by our team and to our{' '}
                    <a href="#/terms" onClick={handleClose}
                      style={{ color: 'inherit', textDecoration: 'underline' }}>
                      Terms &amp; Conditions
                    </a>.
                  </p>
                </form>
              </>
            ) : (
              <div className="thank-you">
                <div className="thank-you-icon">✓</div>
                <h3 className="modal-title">You're in!</h3>
                <p className="modal-sub">
                  Thanks, {form.name.split(' ')[0] || 'there'}. Your free eligibility check is on its
                  way — our counsellor will call you on +91&nbsp;{form.phone} within 24 hours.
                </p>
                <button className="btn btn-primary" onClick={handleClose}>Done</button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
