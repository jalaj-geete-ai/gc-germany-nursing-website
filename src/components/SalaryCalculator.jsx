import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLeadForm } from './LeadFormContext';

const baseByQualification = {
  GNM: 2600,
  'B.Sc Nursing': 2800,
  'Post Basic / M.Sc': 3100,
};
const experienceBonus = {
  Fresher: 0,
  '1–3 years': 150,
  '3+ years': 350,
};

export default function SalaryCalculator() {
  const { open } = useLeadForm();
  const [qualification, setQualification] = useState('B.Sc Nursing');
  const [experience, setExperience] = useState('1–3 years');

  const eur = baseByQualification[qualification] + experienceBonus[experience];
  const inr = Math.round((eur * 95) / 1000) * 1000;

  return (
    <div className="salary-calc-card">
      <div className="salary-calc-inputs">
        <div className="calc-field">
          <label>Qualification</label>
          <div className="calc-pill-group">
            {Object.keys(baseByQualification).map((q) => (
              <button key={q} className={`calc-pill ${qualification === q ? 'calc-pill-active' : ''}`} onClick={() => setQualification(q)}>{q}</button>
            ))}
          </div>
        </div>
        <div className="calc-field">
          <label>Experience</label>
          <div className="calc-pill-group">
            {Object.keys(experienceBonus).map((e) => (
              <button key={e} className={`calc-pill ${experience === e ? 'calc-pill-active' : ''}`} onClick={() => setExperience(e)}>{e}</button>
            ))}
          </div>
        </div>
      </div>

      <motion.div
        className="salary-calc-result"
        key={eur}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <span className="salary-calc-label">Your estimated monthly salary in Germany</span>
        <span className="salary-calc-value mono">€{eur.toLocaleString()} <span className="salary-calc-inr">≈ ₹{inr.toLocaleString('en-IN')}</span></span>
        <span className="salary-calc-rate-note">Indicative estimate only. INR conversion at approx. ₹95/€; actual salary depends on employer, location and recognition status.</span>
        <button className="btn btn-primary salary-calc-cta" onClick={() => open('salary-calculator')}>
          Get My Personalised Plan
        </button>
      </motion.div>
    </div>
  );
}
