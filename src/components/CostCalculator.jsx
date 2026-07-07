import { useState } from 'react';
import { useLeadForm } from './LeadFormContext';

const cityData = {
  Berlin: { rent: 550, salary: 2900 },
  Munich: { rent: 750, salary: 3100 },
  Hamburg: { rent: 600, salary: 2950 },
};

const lifestyleMultiplier = {
  Budget: 0.8,
  Comfortable: 1,
  Premium: 1.3,
};

export default function CostCalculator() {
  const { open } = useLeadForm();
  const [city, setCity] = useState('Berlin');
  const [lifestyle, setLifestyle] = useState('Comfortable');

  const { rent, salary } = cityData[city];
  const livingCost = Math.round((rent + 550) * lifestyleMultiplier[lifestyle]);
  const savings = salary - livingCost;
  const savingsPct = Math.round((savings / salary) * 100);

  return (
    <div className="calc-card">
      <div className="calc-inputs">
        <div className="calc-field">
          <label>City</label>
          <div className="calc-pill-group">
            {Object.keys(cityData).map((c) => (
              <button
                key={c}
                className={`calc-pill ${city === c ? 'calc-pill-active' : ''}`}
                onClick={() => setCity(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="calc-field">
          <label>Lifestyle</label>
          <div className="calc-pill-group">
            {Object.keys(lifestyleMultiplier).map((l) => (
              <button
                key={l}
                className={`calc-pill ${lifestyle === l ? 'calc-pill-active' : ''}`}
                onClick={() => setLifestyle(l)}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="calc-preview">
        <div className="calc-bar-row">
          <span>Monthly salary</span>
          <div className="calc-bar"><div className="calc-bar-fill calc-bar-salary" style={{ width: '100%' }} /></div>
          <span className="mono">€{salary}</span>
        </div>
        <div className="calc-bar-row">
          <span>Living cost</span>
          <div className="calc-bar"><div className="calc-bar-fill calc-bar-cost" style={{ width: `${(livingCost / salary) * 100}%` }} /></div>
          <span className="mono">€{livingCost}</span>
        </div>
        <div className="calc-bar-row calc-bar-row-highlight calc-bar-row-blurred">
          <span>Estimated savings</span>
          <div className="calc-bar"><div className="calc-bar-fill calc-bar-savings" style={{ width: `${savingsPct}%` }} /></div>
          <span className="mono">€{savings} ({savingsPct}%)</span>
        </div>
      </div>

      <div className="calc-unlock-row">
        <p>See your full personalised breakdown — rent, groceries, transport, savings in ₹ &amp; €</p>
        <button className="btn btn-primary" onClick={() => open('cost-calculator')}>
          Unlock My Full Report
        </button>
      </div>
    </div>
  );
}
