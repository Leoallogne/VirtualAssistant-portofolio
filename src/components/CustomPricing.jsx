import React, { useState } from 'react';

const CustomPricing = () => {
  const [hours, setHours] = useState(20);
  const [addons, setAddons] = useState({
    socialMedia: false,
    emailManagement: false,
    crmSetup: false
  });

  const baseRate = 25; // Base hourly rate in USD

  const addonPrices = {
    socialMedia: 200,
    emailManagement: 150,
    crmSetup: 300
  };

  const handleToggleAddon = (addon) => {
    setAddons(prev => ({ ...prev, [addon]: !prev[addon] }));
  };

  const calculateTotal = () => {
    let total = hours * 4 * baseRate; // Assuming 4 weeks a month
    if (addons.socialMedia) total += addonPrices.socialMedia;
    if (addons.emailManagement) total += addonPrices.emailManagement;
    if (addons.crmSetup) total += addonPrices.crmSetup;
    return total;
  };

  return (
    <section className="section-padding" style={{ padding: '4rem 2rem' }}>
      <div className="section-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
          Build Your <span style={{ color: 'var(--accent)' }}>Own Package</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
          Transparent pricing tailored to your exact needs. Use the slider to estimate your monthly retainer.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        {/* Left Col: Controls */}
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <div style={{ marginBottom: '3rem' }}>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between' }}>
              <span>Hours per week</span>
              <span style={{ color: 'var(--accent)' }}>{hours} hrs</span>
            </h4>
            <input 
              type="range" 
              min="10" 
              max="40" 
              step="5"
              value={hours} 
              onChange={(e) => setHours(parseInt(e.target.value))}
              style={{
                width: '100%',
                cursor: 'pointer',
                accentColor: 'var(--accent)'
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              <span>10 hrs</span>
              <span>40 hrs</span>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Add-on Services</h4>
            
            <label style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={addons.socialMedia}
                onChange={() => handleToggleAddon('socialMedia')}
                style={{ width: '20px', height: '20px', accentColor: 'var(--accent)' }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '600' }}>Social Media Management</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>+${addonPrices.socialMedia}/mo</div>
              </div>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={addons.emailManagement}
                onChange={() => handleToggleAddon('emailManagement')}
                style={{ width: '20px', height: '20px', accentColor: 'var(--accent)' }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '600' }}>Inbox & Email Triage</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>+${addonPrices.emailManagement}/mo</div>
              </div>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={addons.crmSetup}
                onChange={() => handleToggleAddon('crmSetup')}
                style={{ width: '20px', height: '20px', accentColor: 'var(--accent)' }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '600' }}>CRM / Notion Setup</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>+${addonPrices.crmSetup}/mo</div>
              </div>
            </label>
          </div>
        </div>

        {/* Right Col: Summary */}
        <div className="glass-panel" style={{ 
          padding: '2rem', 
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'center',
          background: 'var(--gradient-primary)',
          color: 'white',
          border: 'none',
          boxShadow: '0 10px 30px var(--accent-glow)'
        }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '2rem', opacity: 0.9 }}>Estimated Monthly Retainer</h3>
          
          <div style={{ 
            fontSize: '4rem', 
            fontWeight: '800', 
            marginBottom: '1rem',
            textShadow: '0 2px 10px rgba(0,0,0,0.2)'
          }}>
            ${calculateTotal().toLocaleString()}
          </div>
          
          <ul style={{ 
            listStyle: 'none', 
            padding: 0, 
            marginBottom: '2rem',
            opacity: 0.9,
            lineHeight: '1.8'
          }}>
            <li>✓ {hours * 4} hours total per month</li>
            {addons.socialMedia && <li>✓ Social Media Management</li>}
            {addons.emailManagement && <li>✓ Inbox & Email Triage</li>}
            {addons.crmSetup && <li>✓ CRM / Notion Setup</li>}
            <li>✓ Weekly check-in meetings</li>
            <li>✓ 24-hour response time</li>
          </ul>

          <a href="#contact" style={{
            background: 'white',
            color: 'var(--text-inverse)',
            textAlign: 'center',
            padding: '1rem',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 'bold',
            transition: 'transform 0.2s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            Start Your Trial
          </a>
        </div>
      </div>
    </section>
  );
};

export default CustomPricing;
