import React, { useState, useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';

const ROICalculator = () => {
  const { language, t } = useContext(LanguageContext);
  
  // Slider states
  const [hoursPerWeek, setHoursPerWeek] = useState(15);
  const [currency, setCurrency] = useState('USD'); // USD or IDR
  const [hourlyRate, setHourlyRate] = useState(35); // Default rate in USD

  // Conversion rate: $1 = Rp 15.000
  const CONVERSION_RATE = 15000;

  // Toggle currency and convert value
  const handleCurrencyToggle = (newCurrency) => {
    if (newCurrency === currency) return;
    
    if (newCurrency === 'IDR') {
      setHourlyRate(hourlyRate * CONVERSION_RATE);
    } else {
      setHourlyRate(Math.round(hourlyRate / CONVERSION_RATE));
    }
    setCurrency(newCurrency);
  };

  // Determine rate limits based on currency
  const minRate = currency === 'USD' ? 15 : 225000;
  const maxRate = currency === 'USD' ? 120 : 1800000;
  const rateStep = currency === 'USD' ? 5 : 75000;

  // Calculations
  const hoursSavedPerMonth = hoursPerWeek * 4;
  const monthlySavings = hoursSavedPerMonth * hourlyRate;
  const yearlySavings = monthlySavings * 12;

  // Formatter helper
  const formatCurrency = (value) => {
    if (currency === 'USD') {
      return `$${value.toLocaleString('en-US')}`;
    } else {
      return `Rp ${value.toLocaleString('id-ID')}`;
    }
  };

  return (
    <section id="roi-calculator" style={{ padding: '6rem 0', position: 'relative' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="section-tag">{language === 'id' ? 'ROI Kalkulator' : 'ROI Calculator'}</span>
          <h2 className="section-title">
            {t.roiTitle.split('&')[0]} & <span className="text-gradient">{t.roiTitle.split('&')[1]}</span>
          </h2>
          <p className="section-desc" style={{ margin: '0 auto' }}>
            {t.roiSubtitle}
          </p>
        </div>

        <div className="about-grid" style={{ gridTemplateColumns: '1.1fr 0.9fr', gap: '3rem' }}>
          
          {/* Sliders Control Panel */}
          <div className="glass-panel" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            
            {/* Currency Selector Toggle */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-main)' }}>{t.roiToggleCurrency}</span>
              <div className="lang-toggle-container" style={{ width: '90px' }} className={`lang-toggle-container ${currency === 'IDR' ? 'en-active' : ''}`} onClick={() => handleCurrencyToggle(currency === 'USD' ? 'IDR' : 'USD')}>
                <div className="lang-toggle-slider" style={{ width: '42px', transform: currency === 'IDR' ? 'translate3d(42px, 0, 0)' : 'translate3d(0, 0, 0)' }}></div>
                <button className={`lang-toggle-btn ${currency === 'USD' ? 'active' : ''}`} style={{ fontSize: '0.68rem' }}>USD</button>
                <button className={`lang-toggle-btn ${currency === 'IDR' ? 'active' : ''}`} style={{ fontSize: '0.68rem' }}>IDR</button>
              </div>
            </div>

            {/* Slider 1: Hours / Week */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <label style={{ fontSize: '0.95rem', color: 'var(--text-muted)', fontWeight: 600 }}>{t.roiHoursLabel}</label>
                <span className="text-gradient" style={{ fontSize: '1.8rem', fontWeight: 800 }}>
                  {hoursPerWeek} <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{language === 'id' ? 'Jam' : 'Hrs'}</span>
                </span>
              </div>
              <input 
                type="range" 
                min="5" 
                max="40" 
                step="1"
                value={hoursPerWeek} 
                onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                className="roi-slider"
                style={{
                  width: '100%',
                  height: '6px',
                  borderRadius: '3px',
                  outline: 'none',
                  WebkitAppearance: 'none',
                  background: 'var(--bg-tertiary)'
                }}
              />
            </div>

            {/* Slider 2: Hourly Rate */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <label style={{ fontSize: '0.95rem', color: 'var(--text-muted)', fontWeight: 600 }}>{t.roiRateLabel}</label>
                <span className="text-gradient" style={{ fontSize: '1.8rem', fontWeight: 800 }}>
                  {formatCurrency(hourlyRate)}<span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>/{language === 'id' ? 'jam' : 'hr'}</span>
                </span>
              </div>
              <input 
                type="range" 
                min={minRate} 
                max={maxRate} 
                step={rateStep}
                value={hourlyRate} 
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="roi-slider"
                style={{
                  width: '100%',
                  height: '6px',
                  borderRadius: '3px',
                  outline: 'none',
                  WebkitAppearance: 'none',
                  background: 'var(--bg-tertiary)'
                }}
              />
            </div>

            {/* Micro value details bullet */}
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', background: 'rgba(var(--glow-rgb), 0.03)', border: '1px solid var(--glass-border)', padding: '1rem', borderRadius: '12px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-secondary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                {language === 'id' 
                  ? 'Kalkulasi di atas berdasarkan rata-rata efisiensi kerja operasional terstandarisasi.' 
                  : 'Calculations are based on average standardized operational workplace efficiency.'}
              </p>
            </div>
          </div>

          {/* Results Visual Panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', justifyContent: 'space-between' }}>
            
            {/* Box 1: Hours Saved */}
            <div className="glass-panel" style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.25rem' }}>{t.roiResultHours}</p>
                <h4 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  {hoursSavedPerMonth} <span style={{ fontSize: '1rem', color: 'var(--accent-secondary)' }}>{language === 'id' ? 'Jam / Bulan' : 'Hrs / Mo'}</span>
                </h4>
              </div>
              <div style={{ padding: '1rem', borderRadius: '16px', background: 'var(--bg-tertiary)', border: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
            </div>

            {/* Box 2: Monthly Value */}
            <div className="glass-panel" style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.25rem' }}>{t.roiResultSavings}</p>
                <h4 className="text-gradient" style={{ fontSize: '2.5rem', fontWeight: 800 }}>
                  {formatCurrency(monthlySavings)}
                </h4>
              </div>
              <div style={{ padding: '1rem', borderRadius: '16px', background: 'var(--bg-tertiary)', border: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="1" x2="12" y2="23"></line>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </div>
            </div>

            {/* Box 3: Yearly Savings */}
            <div className="glass-panel" style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '2px solid var(--accent-secondary-glow)' }}>
              <div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.25rem' }}>{t.roiResultYearly}</p>
                <h4 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent-secondary)' }}>
                  {formatCurrency(yearlySavings)}
                </h4>
              </div>
              <div style={{ padding: '1rem', borderRadius: '16px', background: 'rgba(var(--glow-rgb), 0.05)', border: '1px solid var(--accent-secondary-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                  <path d="M2 17l10 5 10-5"></path>
                  <path d="M2 12l10 5 10-5"></path>
                </svg>
              </div>
            </div>

            {/* Contact Redirect Button */}
            <a 
              href="#contact" 
              className="btn btn-primary"
              style={{
                width: '100%',
                justifyContent: 'center',
                padding: '1.15rem',
                fontSize: '1.05rem',
                fontWeight: 700,
                borderRadius: '16px'
              }}
            >
              {t.roiCTA}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>

          </div>

        </div>

      </div>
    </section>
  );
};

export default ROICalculator;
