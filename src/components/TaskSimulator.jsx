import React, { useState, useEffect, useContext, useRef } from 'react';
import { LanguageContext } from '../context/LanguageContext';

const TaskSimulator = () => {
  const { language, t } = useContext(LanguageContext);
  
  const scenarios = [
    {
      id: 0,
      title: language === 'id' ? '📅 Rapat Lintas Zona Waktu' : '📅 Cross-Timezone Booking',
      desc: t.simTaskA,
      timeSaved: language === 'id' ? '1.5 Jam' : '1.5 Hrs',
      logs: language === 'id' ? [
        "🔍 Menganalisis zona waktu masing-masing klien (EST, GMT, WIB, SGT)...",
        "📅 Sinkronisasi ketersediaan jadwal Founder di Google Calendar...",
        "📧 Menyiapkan link Zoom unik & mengirimkan undangan email terpesonalisasi...",
        "📁 Mencatat jadwal final ke dalam Master Excel Log..."
      ] : [
        "🔍 Analyzing client timezones (EST, GMT, WIB, SGT)...",
        "📅 Syncing Founder schedule availability in Google Calendar...",
        "📧 Setting up unique Zoom links & sending personalized email invites...",
        "📁 Documenting final schedules in the Master Excel Log..."
      ]
    },
    {
      id: 1,
      title: language === 'id' ? '📋 Leads Scraping & Outreach' : '📋 Leads Scraping & Outreach',
      desc: t.simTaskB,
      timeSaved: language === 'id' ? '2.5 Jam' : '2.5 Hrs',
      logs: language === 'id' ? [
        "🔍 Scraping 10 leads teratas berdasarkan kriteria industri MSME...",
        "📋 Validasi alamat email aktif & struktur data perusahaan...",
        "📊 Mengimpor data ke tab 'Escalation Tracker' Google Sheet...",
        "📝 Menulis draf email penawaran terpesonalisasi di Inbox Zero Hub..."
      ] : [
        "🔍 Scraping top 10 leads based on MSME industry criteria...",
        "📋 Validating active email addresses & corporate company profiles...",
        "📊 Importing validated data to the 'Escalation Tracker' Google Sheet...",
        "📝 Drafting personalized outreach emails inside the Inbox Zero Hub..."
      ]
    },
    {
      id: 2,
      title: language === 'id' ? '🎨 Canva Design & Scheduling' : '🎨 Canva Design & Scheduling',
      desc: t.simTaskC,
      timeSaved: language === 'id' ? '4.0 Jam' : '4.0 Hrs',
      logs: language === 'id' ? [
        "🎨 Mendesain 6 aset visual di Canva berdasarkan guidelines brand...",
        "✍️ Menulis copy caption persuasif dengan hashtag relevan (ID/EN)...",
        "📅 Menjadwalkan postingan di Meta Business Suite untuk Q3..."
      ] : [
        "🎨 Designing 6 visual assets in Canva matching brand guidelines...",
        "✍️ Writing highly persuasive copywriting captions with hashtags...",
        "📅 Scheduling content pieces across Meta Business Suite for Q3..."
      ]
    }
  ];

  const [activeScenarioIdx, setActiveScenarioIdx] = useState(0);
  const [logs, setLogs] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const terminalEndRef = useRef(null);
  const activeScenario = scenarios[activeScenarioIdx];

  // Auto scroll terminal log window
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  // Handle running simulation
  const runSimulation = () => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    setShowSuccess(false);
    setLogs([]);

    const selectedLogs = activeScenario.logs;
    let currentStep = 0;

    const processStep = () => {
      if (currentStep >= selectedLogs.length) {
        setShowSuccess(true);
        setIsProcessing(false);
        return;
      }

      // 1. Add current step as loading
      const loadingLog = { text: selectedLogs[currentStep], status: 'loading' };
      setLogs((prev) => [...prev, loadingLog]);

      // 2. Resolve to success after 900ms and trigger next
      setTimeout(() => {
        setLogs((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { ...updated[updated.length - 1], status: 'success' };
          return updated;
        });
        currentStep++;
        setTimeout(processStep, 300); // 300ms pause before starting next step
      }, 900);
    };

    processStep();
  };

  return (
    <section id="task-simulator" style={{ padding: '6rem 0', background: 'var(--bg-secondary)', position: 'relative' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="section-tag">{language === 'id' ? 'Simulator Tugas' : 'Task Simulator'}</span>
          <h2 className="section-title">
            {t.simTitle.split(' ').slice(0, 3).join(' ')} <span className="text-gradient">{t.simTitle.split(' ').slice(3).join(' ')}</span>
          </h2>
          <p className="section-desc" style={{ margin: '0 auto' }}>
            {t.simSubtitle}
          </p>
        </div>

        <div className="about-grid" style={{ gridTemplateColumns: '0.85fr 1.15fr', gap: '3rem' }}>
          
          {/* Scenario selector columns */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)', marginBottom: '0.5rem', fontWeight: 700 }}>
              {t.simSelectTask}
            </h3>

            {scenarios.map((sc, idx) => (
              <div 
                key={sc.id}
                className={`glass-panel ${activeScenarioIdx === idx ? 'active-scenario-card' : ''}`}
                onClick={() => {
                  if (isProcessing) return;
                  setActiveScenarioIdx(idx);
                  setLogs([]);
                  setShowSuccess(false);
                }}
                style={{
                  padding: '1.5rem',
                  cursor: isProcessing ? 'not-allowed' : 'pointer',
                  border: activeScenarioIdx === idx ? '2px solid var(--accent)' : '1px solid var(--glass-border)',
                  boxShadow: activeScenarioIdx === idx ? '0 0 20px var(--accent-glow)' : 'var(--shadow-sm)',
                  transition: 'all 0.3s ease',
                  opacity: isProcessing && activeScenarioIdx !== idx ? 0.5 : 1
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span className="project-tag" style={{ fontSize: '0.7rem' }}>
                    {sc.title}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--accent-secondary)', fontWeight: 700 }}>
                    {t.simTimeSaved}: {sc.timeSaved}
                  </span>
                </div>
                <p style={{ fontSize: '0.88rem', color: activeScenarioIdx === idx ? 'var(--text-main)' : 'var(--text-muted)', fontWeight: 600, lineHeight: 1.5, margin: 0 }}>
                  {sc.desc}
                </p>
              </div>
            ))}

            {/* Run Button */}
            <button 
              className="btn btn-primary"
              onClick={runSimulation}
              disabled={isProcessing}
              style={{
                marginTop: '1rem',
                justifyContent: 'center',
                padding: '1.1rem',
                fontSize: '1rem',
                fontWeight: 700,
                borderRadius: '16px',
                opacity: isProcessing ? 0.75 : 1
              }}
            >
              {isProcessing ? (
                <>
                  <span className="loader-dots" style={{ display: 'inline-block', marginRight: '8px' }}></span>
                  {t.simBtnRunning}
                </>
              ) : (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}>
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                  {t.simBtnRun}
                </>
              )}
            </button>
          </div>

          {/* Terminal output window */}
          <div 
            className="glass-panel" 
            style={{ 
              background: '#0a0d16', 
              borderRadius: '24px', 
              overflow: 'hidden', 
              border: '1px solid rgba(255,255,255,0.05)',
              boxShadow: 'var(--shadow-lg), 0 10px 40px rgba(0,0,0,0.5)',
              display: 'flex',
              flexDirection: 'column',
              height: '380px'
            }}
          >
            {/* Terminal Window Header Bar */}
            <div 
              style={{ 
                background: '#111625', 
                padding: '0.85rem 1.25rem', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                borderBottom: '1px solid rgba(255,255,255,0.03)'
              }}
            >
              <div style={{ display: 'flex', gap: '6px' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56', display: 'inline-block' }}></span>
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e', display: 'inline-block' }}></span>
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f', display: 'inline-block' }}></span>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace', fontWeight: 600 }}>
                {t.simTerminalTitle}
              </span>
              <div style={{ width: '42px' }}></div>
            </div>

            {/* Terminal Screen Console Body */}
            <div 
              className="terminal-body"
              style={{ 
                padding: '1.5rem', 
                flexGrow: 1, 
                overflowY: 'auto', 
                fontFamily: 'Consolas, Monaco, monospace', 
                fontSize: '0.85rem', 
                color: '#57f287',
                lineHeight: 1.7,
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}
            >
              {/* Idle screen state */}
              {logs.length === 0 && !isProcessing && (
                <div style={{ color: 'rgba(255,255,255,0.3)', textAlign: 'center', margin: 'auto' }}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '1rem', opacity: 0.3 }}>
                    <polyline points="4 17 10 11 4 5"></polyline>
                    <line x1="12" y1="19" x2="20" y2="19"></line>
                  </svg>
                  <p style={{ margin: 0 }}>
                    {language === 'id' ? '[Siap] Klik Jalankan Simulasi untuk mulai.' : '[Ready] Click Run Simulation to start.'}
                  </p>
                </div>
              )}

              {/* Displaying logs step by step */}
              {logs.map((log, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  
                  {/* Status symbol indicator */}
                  {log.status === 'loading' && (
                    <span className="spinner-indicator" style={{
                      display: 'inline-block',
                      width: '14px',
                      height: '14px',
                      borderRadius: '50%',
                      border: '2px solid rgba(87,242,135,0.3)',
                      borderTopColor: '#57f287',
                      animation: 'spin 0.6s linear infinite',
                      marginTop: '4px'
                    }}></span>
                  )}
                  {log.status === 'success' && (
                    <span style={{ color: '#27c93f', fontWeight: 'bold' }}>✓</span>
                  )}

                  <span style={{ color: log.status === 'loading' ? 'rgba(255,255,255,0.7)' : '#ffffff' }}>
                    {log.text}
                  </span>
                </div>
              ))}

              {/* Final Success Panel Banner */}
              {showSuccess && (
                <div 
                  className="terminal-success"
                  style={{
                    background: 'rgba(39,201,63,0.06)',
                    border: '1px dashed rgba(39,201,63,0.3)',
                    borderRadius: '12px',
                    padding: '1.25rem',
                    marginTop: '0.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    animation: 'fadeIn 0.4s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#27c93f', fontWeight: 'bold', fontSize: '0.9rem' }}>
                      🟢 {t.simSuccessBadge}
                    </span>
                    <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem' }}>
                      {language === 'id' ? 'Proses Otomatis' : 'Automated'}
                    </span>
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.85)', margin: 0, fontSize: '0.8rem' }}>
                    {language === 'id' 
                      ? `Semua sub-task selesai dengan sempurna. Total penghematan waktu operasional Anda: ${activeScenario.timeSaved}!` 
                      : `All sub-tasks successfully executed. Total saved operational hours: ${activeScenario.timeSaved}!`}
                  </p>
                </div>
              )}

              <div ref={terminalEndRef} />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default TaskSimulator;
