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
        "✍️ Writing highly engaging marketing captions with hashtags...",
        "📅 Scheduling content pieces across Meta Business Suite planner..."
      ]
    }
  ];

  const [activeScenarioIdx, setActiveScenarioIdx] = useState(0);
  const [customPrompt, setCustomPrompt] = useState('');
  const [logs, setLogs] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState('');
  const [activeTab, setActiveTab] = useState('terminal'); // 'terminal' or 'dashboard'
  const [isCustomRun, setIsCustomRun] = useState(false);
  
  const terminalBodyRef = useRef(null);
  const activeScenario = scenarios[activeScenarioIdx];

  // Auto scroll terminal log window
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [logs]);

  // Dynamic Custom Prompt Heuristic Parser
  const parseCustomTask = (promptText) => {
    const text = promptText.toLowerCase();
    const isIndo = language === 'id';
    let taskLogs = [];
    let savedTime = isIndo ? "1.5 Jam" : "1.5 Hrs";

    if (text.includes('email') || text.includes('kirim') || text.includes('send') || text.includes('reply') || text.includes('balas') || text.includes('inbox') || text.includes('surat')) {
      savedTime = isIndo ? "1.5 Jam" : "1.5 Hrs";
      taskLogs = isIndo ? [
        `🔍 Membaca instruksi kustom: "${promptText}"`,
        `📝 Menyiapkan draf email terpesonalisasi sesuai dengan SOP korespondensi...`,
        `📧 Mengirim email secara aman via SMTP server & mengarsipkan salinan...`,
        `📊 Mencatat laporan aktivitas pengiriman email di Master Excel Ledger...`
      ] : [
        `🔍 Parsing custom instructions: "${promptText}"`,
        `📝 Preparing personalized email drafts aligned with communications SOP...`,
        `📧 Dispatching email safely via SMTP server & archiving transcripts...`,
        `📊 Logging transaction receipt data inside the Master Excel Ledger...`
      ];
    } else if (text.includes('jadwal') || text.includes('rapat') || text.includes('meeting') || text.includes('calendar') || text.includes('calendly') || text.includes('book') || text.includes('jam')) {
      savedTime = isIndo ? "2.0 Jam" : "2.0 Hrs";
      taskLogs = isIndo ? [
        `🔍 Membaca instruksi kustom: "${promptText}"`,
        `📅 Memvalidasi bentrokan jadwal di Google Calendar Founder...`,
        `🌐 Menentukan kecocokan zona waktu & menjadwalkan slot Calendly...`,
        `📨 Mengirimkan notifikasi undangan rapat terotomatisasi ke Slack & email...`
      ] : [
        `🔍 Parsing custom instructions: "${promptText}"`,
        `📅 Validating schedule conflicts in Founder Google Calendar...`,
        `🌐 Resolving timezone differences & booking Calendly slots...`,
        `📨 Dispatching automated meeting notifications to Slack & email...`
      ];
    } else if (text.includes('leads') || text.includes('scrap') || text.includes('data') || text.includes('excel') || text.includes('sheet') || text.includes('tabel') || text.includes('database') || text.includes('riset') || text.includes('research')) {
      savedTime = isIndo ? "3.0 Jam" : "3.0 Hrs";
      taskLogs = isIndo ? [
        `🔍 Membaca instruksi kustom: "${promptText}"`,
        `🕵️ Melakukan riset web & scraping data prospek sesuai kriteria bisnis...`,
        `📋 Memvalidasi integritas alamat email & data kontak aktif...`,
        `📊 Menyusun data rapi ke dalam tabel database Google Sheet CRM...`
      ] : [
        `🔍 Parsing custom instructions: "${promptText}"`,
        `🕵️ Conducting web research & scraping leads based on business criteria...`,
        `📋 Verifying active email addresses & contact information integrity...`,
        `📊 Structuring records neatly into Google Sheet CRM database...`
      ];
    } else if (text.includes('notion') || text.includes('trello') || text.includes('sop') || text.includes('workspace') || text.includes('board') || text.includes('atur') || text.includes('operasional')) {
      savedTime = isIndo ? "2.5 Jam" : "2.5 Hrs";
      taskLogs = isIndo ? [
        `🔍 Membaca instruksi kustom: "${promptText}"`,
        `📁 Memetakan struktur alur kerja & membuat dokumen SOP baru...`,
        `📌 Membuat kartu tugas Kanban interaktif di Notion / Trello board...`,
        `🔄 Memicu sinkronisasi webhook otomatis & mengirim alert log Slack...`
      ] : [
        `🔍 Parsing custom instructions: "${promptText}"`,
        `📁 Mapping operational structure & drafting new SOP guidelines...`,
        `📌 Generating interactive task cards inside the Notion / Trello board...`,
        `🔄 Triggering autogenerated API webhooks & dispatching Slack alerts...`
      ];
    } else if (text.includes('canva') || text.includes('desain') || text.includes('instagram') || text.includes('feed') || text.includes('post') || text.includes('sosmed') || text.includes('social') || text.includes('konten') || text.includes('design')) {
      savedTime = isIndo ? "4.0 Jam" : "4.0 Hrs";
      taskLogs = isIndo ? [
        `🔍 Membaca instruksi kustom: "${promptText}"`,
        `🎨 Menyiapkan kanvas & mendesain grafis media sosial di Canva...`,
        `✍️ Menulis salinan caption copywriter persuasif lengkap dengan hashtag...`,
        `📅 Menjadwalkan postingan di Meta Business Suite secara berkala...`
      ] : [
        `🔍 Parsing custom instructions: "${promptText}"`,
        `🎨 Setting up canvas & designing social graphics templates in Canva...`,
        `✍️ Writing highly engaging marketing captions with targeted hashtags...`,
        `📅 Scheduling content pieces across Meta Business Suite planner...`
      ];
    } else {
      savedTime = isIndo ? "1.5 Jam" : "1.5 Hrs";
      taskLogs = isIndo ? [
        `🔍 Membaca instruksi kustom: "${promptText}"`,
        `⚙️ Menyesuaikan parameter operasional & menganalisis alur kerja...`,
        `⚡ Mengeksekusi tugas administratif terstandarisasi secara remote...`,
        `📁 Menyusun hasil pekerjaan dan merekam audit log di spreadsheet...`
      ] : [
        `🔍 Parsing custom instructions: "${promptText}"`,
        `⚙️ Configuring operational parameters & analyzing workflow flow...`,
        `⚡ Executing standardized remote virtual assistant administrative tasks...`,
        `📁 Compiling deliverables & documenting audit logs in the spreadsheet...`
      ];
    }

    return { logs: taskLogs, timeSaved: savedTime };
  };

  // Handle running simulation
  const runSimulation = (isCustom = false) => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    setShowSuccess(false);
    setActiveTab('terminal'); // Force back to terminal log view to watch output
    setIsCustomRun(isCustom);
    setLogs([]);

    // Decide which logs to run
    let selectedLogs = [];
    let savedTime = "";

    if (isCustom) {
      const parsed = parseCustomTask(customPrompt);
      selectedLogs = parsed.logs;
      savedTime = parsed.timeSaved;
    } else {
      selectedLogs = activeScenario.logs;
      savedTime = activeScenario.timeSaved;
    }

    setLastSavedTime(savedTime);
    let currentStep = 0;

    // Terminal command mock typing at the beginning
    const commandText = isCustom ? `run-task --custom "${customPrompt}"` : `run-task --preset ${activeScenario.id}`;
    setLogs([{ text: `muhammad-syafiq@va-core:~$ ${commandText}`, status: 'command' }]);

    const processStep = () => {
      if (currentStep >= selectedLogs.length) {
        setShowSuccess(true);
        setIsProcessing(false);
        // Wait 1.1 seconds, then smoothly flip view to visual Live Dashboard
        setTimeout(() => {
          setActiveTab('dashboard');
        }, 1100);
        return;
      }

      // Add current step as loading
      const loadingLog = { text: selectedLogs[currentStep], status: 'loading' };
      setLogs((prev) => [...prev, loadingLog]);

      // Resolve to success after 900ms and trigger next
      setTimeout(() => {
        setLogs((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { ...updated[updated.length - 1], status: 'success' };
          return updated;
        });
        currentStep++;
        setTimeout(processStep, 300);
      }, 900);
    };

    // Delay start of execution to let the command prompt load
    setTimeout(processStep, 600);
  };

  // Render Visual Live Dashboard View Widget
  const renderDashboardView = () => {
    const isIndo = language === 'id';
    
    // Idle/Waiting system state
    if (logs.length === 0 && !isProcessing) {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>
          <div className="loader-dots" style={{ width: '12px', height: '12px', marginBottom: '1.5rem', background: 'var(--accent-secondary)' }}></div>
          <h4 style={{ color: 'var(--text-main)', fontSize: '1rem', fontWeight: 700, marginBottom: '0.25rem' }}>
            {isIndo ? 'Menunggu Aktivasi Tugas' : 'Awaiting Task Activation'}
          </h4>
          <p style={{ fontSize: '0.8rem', maxWidth: '300px', margin: 0, lineHeight: 1.5 }}>
            {isIndo 
              ? 'Silakan jalankan simulasi salah satu skenario untuk memicu visualisasi dashboard.'
              : 'Please trigger a simulation scenario to populate this interactive operations panel.'}
          </p>
        </div>
      );
    }

    // Active executing state
    if (isProcessing) {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>
          <span className="spinner-indicator" style={{
            display: 'inline-block',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: '3px solid rgba(0,210,255,0.1)',
            borderTopColor: 'var(--accent-secondary)',
            animation: 'spin 0.8s linear infinite',
            marginBottom: '1rem'
          }}></span>
          <h4 style={{ color: 'var(--text-main)', fontSize: '1rem', fontWeight: 700, marginBottom: '0.25rem' }}>
            {isIndo ? 'Mengeksekusi Alur Kerja Kerja...' : 'Executing Operational Flow...'}
          </h4>
          <p style={{ fontSize: '0.8rem', margin: 0 }}>
            {isIndo ? 'Menganalisis SOP & mencatat data di terminal...' : 'Analyzing SOPs & compiling terminal logs...'}
          </p>
        </div>
      );
    }

    // Success state - display scenario-specific widget dashboard
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', height: '100%', animation: 'fadeIn 0.5s ease' }}>
        
        {/* Dashboard Grid Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.75rem' }}>
          <span style={{ fontSize: '0.72rem', color: '#ffb86c', fontWeight: 800, fontFamily: 'monospace' }}>
            🤖 {isIndo ? 'THREAD AGEN OPERASIONAL: AKTIF' : 'OPERATIONAL AGENT WORKSPACE: ACTIVE'}
          </span>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
            Latency: 24ms | Error: 0.0%
          </span>
        </div>

        {/* Matrix boxes */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.25fr', gap: '1rem' }}>
          {/* Circular Savings Gauge */}
          <div className="glass-panel" style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', border: '1px solid rgba(255,255,255,0.04)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <div style={{ position: 'relative', width: '70px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.5rem' }}>
              {/* Mock Circle Progress Track */}
              <svg width="70" height="70" viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)' }}>
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--accent-secondary)" strokeDasharray="100, 100" strokeWidth="3" style={{ strokeLinecap: 'round', animation: 'dash 1.5s ease-out' }} />
              </svg>
              <span style={{ position: 'absolute', fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-main)', fontFamily: 'monospace' }}>100%</span>
            </div>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{isIndo ? 'Status Akurasi' : 'Accuracy Status'}</span>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#57f287' }}>{isIndo ? 'Sesuai SOP ✓' : 'SOP Compliant ✓'}</span>
          </div>

          {/* Key Metrics block */}
          <div className="glass-panel" style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', border: '1px solid rgba(255,255,255,0.04)', display: 'flex', flexDirection: 'column', gap: '0.65rem', justifyContent: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.25rem' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{isIndo ? 'Waktu Terhemat:' : 'Time Saved:'}</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--accent-secondary)', fontWeight: 800, fontFamily: 'monospace' }}>{lastSavedTime}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.25rem' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{isIndo ? 'Ledger Sync:' : 'Ledger Sync:'}</span>
              <span style={{ fontSize: '0.75rem', color: '#57f287', fontWeight: 800, fontFamily: 'monospace' }}>SUCCESS 🟢</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{isIndo ? 'Audit Log:' : 'Audit Log:'}</span>
              <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.8)', fontWeight: 700, fontFamily: 'monospace' }}>UPDATED 📁</span>
            </div>
          </div>
        </div>

        {/* Dynamic Scenario visual output area */}
        <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          
          {/* Case A: Timezone meetings block */}
          {!isCustomRun && activeScenarioIdx === 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-main)', fontWeight: 700, marginBottom: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                📅 {isIndo ? 'Konfirmasi Roster Agenda Founder:' : 'Founder Booking Agenda Confirmed:'}
              </span>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', padding: '0.65rem 0.85rem', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-main)', fontWeight: 700 }}>Alice Vance (Venture Lead)</span>
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Subject: Q2 Investment Pitch Outline</span>
                  </div>
                  <span className="project-tag" style={{ fontSize: '0.65rem', background: 'rgba(0,210,255,0.05)', color: 'var(--accent-secondary)' }}>10:00 AM EST 🇺🇸</span>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', padding: '0.65rem 0.85rem', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-main)', fontWeight: 700 }}>Budi Harjo (Operations Lead)</span>
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Subject: Weekly Warehouse Triage SOP</span>
                  </div>
                  <span className="project-tag" style={{ fontSize: '0.65rem', background: 'rgba(139,92,246,0.05)', color: 'var(--accent)' }}>03:00 PM WIB 🇮🇩</span>
                </div>
              </div>
            </div>
          )}

          {/* Case B: Leads pipeline list */}
          {!isCustomRun && activeScenarioIdx === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-main)', fontWeight: 700, marginBottom: '0.2rem' }}>
                📋 {isIndo ? 'Ledger Database Prospek CRM (Scraped):' : 'Scraped Database Leads Pipeline:'}
              </span>
              <div style={{ overflowX: 'auto', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '10px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.7rem', fontFamily: 'monospace' }}>
                  <thead>
                    <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <th style={{ padding: '0.5rem 0.75rem', color: 'var(--text-main)' }}>Name</th>
                      <th style={{ padding: '0.5rem 0.75rem', color: 'var(--text-main)' }}>Niche</th>
                      <th style={{ padding: '0.5rem 0.75rem', color: 'var(--text-main)' }}>Email status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '0.5rem 0.75rem', color: 'var(--text-muted)' }}>Alice Vance</td>
                      <td style={{ padding: '0.5rem 0.75rem', color: 'var(--text-muted)' }}>Food Culinary</td>
                      <td style={{ padding: '0.5rem 0.75rem', color: '#57f287' }}>📧 Draft Ready</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '0.5rem 0.75rem', color: 'var(--text-muted)' }}>Sisca Indah</td>
                      <td style={{ padding: '0.5rem 0.75rem', color: 'var(--text-muted)' }}>MSME Catering</td>
                      <td style={{ padding: '0.5rem 0.75rem', color: '#57f287' }}>📧 Draft Ready</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Case C: Instagram feed layout */}
          {!isCustomRun && activeScenarioIdx === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-main)', fontWeight: 700, marginBottom: '0.2rem' }}>
                🎨 {isIndo ? 'Feed Grid Instagram (Meta Suite Sync):' : 'Instagram Visual Feed Grid (Meta Suite Sync):'}
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                <div style={{ aspectRatio: '1/1', background: 'linear-gradient(135deg, #1b2845 0%, #274060 100%)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0.35rem', textAlign: 'center' }}>
                  <span style={{ fontSize: '0.62rem', color: '#ffffff', fontWeight: 'bold' }}>Visual Es Krim</span>
                  <span style={{ fontSize: '0.55rem', color: '#57f287', marginTop: '0.25rem' }}>🟢 Published</span>
                </div>
                <div style={{ aspectRatio: '1/1', background: 'linear-gradient(135deg, #1b2845 0%, #274060 100%)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0.35rem', textAlign: 'center' }}>
                  <span style={{ fontSize: '0.62rem', color: '#ffffff', fontWeight: 'bold' }}>Tips Kuliner</span>
                  <span style={{ fontSize: '0.55rem', color: 'var(--accent-secondary)', marginTop: '0.25rem' }}>🔵 Scheduled</span>
                </div>
                <div style={{ aspectRatio: '1/1', background: 'linear-gradient(135deg, #1b2845 0%, #274060 100%)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0.35rem', textAlign: 'center' }}>
                  <span style={{ fontSize: '0.62rem', color: '#ffffff', fontWeight: 'bold' }}>Promo Merdeka</span>
                  <span style={{ fontSize: '0.55rem', color: '#ffbd2e', marginTop: '0.25rem' }}>🟡 Draft</span>
                </div>
              </div>
            </div>
          )}

          {/* Case D: Custom Prompt flow map */}
          {isCustomRun && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-main)', fontWeight: 700, marginBottom: '0.2rem' }}>
                🔄 {isIndo ? 'Visualisasi Alur Kerja Kerja Kustom Agent:' : 'Custom Agent Work Orchestrator Path:'}
              </span>
              
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', padding: '0.75rem 1rem', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.72rem' }}>
                  <span style={{ color: 'var(--accent-secondary)', fontWeight: 'bold' }}>Input:</span>
                  <span style={{ color: 'var(--text-main)', fontFamily: 'monospace' }}>"{customPrompt}"</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'space-between', fontSize: '0.7rem', marginTop: '0.25rem', fontFamily: 'monospace' }}>
                  <span style={{ color: '#57f287' }}>Parser ➔ OK 🟢</span>
                  <span style={{ color: '#57f287' }}>SMTP Sync ➔ OK 🟢</span>
                  <span style={{ color: '#57f287' }}>Spreadsheet ➔ OK 🟢</span>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    );
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)', marginBottom: '0.25rem', fontWeight: 700 }}>
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
                  setActiveTab('terminal');
                }}
                style={{
                  padding: '1.25rem 1.5rem',
                  cursor: isProcessing ? 'not-allowed' : 'pointer',
                  border: activeScenarioIdx === idx ? '2px solid var(--accent)' : '1px solid var(--glass-border)',
                  boxShadow: activeScenarioIdx === idx ? '0 0 20px var(--accent-glow)' : 'var(--shadow-sm)',
                  transition: 'all 0.3s ease',
                  opacity: isProcessing && activeScenarioIdx !== idx ? 0.5 : 1
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span className="project-tag" style={{ fontSize: '0.65rem', padding: '0.2rem 0.6rem' }}>
                    {sc.title}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--accent-secondary)', fontWeight: 700 }}>
                    {t.simTimeSaved}: {sc.timeSaved}
                  </span>
                </div>
                <p style={{ fontSize: '0.85rem', color: activeScenarioIdx === idx ? 'var(--text-main)' : 'var(--text-muted)', fontWeight: 600, lineHeight: 1.4, margin: 0 }}>
                  {sc.desc}
                </p>
              </div>
            ))}

            {/* Run Preset Button */}
            <button 
              className="btn btn-primary"
              onClick={() => runSimulation(false)}
              disabled={isProcessing}
              style={{
                justifyContent: 'center',
                padding: '1rem',
                fontSize: '0.95rem',
                fontWeight: 700,
                borderRadius: '14px',
                opacity: isProcessing ? 0.75 : 1
              }}
            >
              {isProcessing && logs.length > 0 && logs[0].status === 'command' && !logs[0].text.includes('--custom') ? (
                <>
                  <span className="loader-dots" style={{ display: 'inline-block', marginRight: '8px' }}></span>
                  {t.simBtnRunning}
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}>
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                  {t.simBtnRun}
                </>
              )}
            </button>

            {/* OR Divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: '0.25rem 0' }}>
              <div style={{ flexGrow: 1, height: '1px', background: 'var(--glass-border)' }}></div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {language === 'id' ? 'Atau' : 'Or'}
              </span>
              <div style={{ flexGrow: 1, height: '1px', background: 'var(--glass-border)' }}></div>
            </div>

            {/* Interactive Custom Task Box */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-main)', fontWeight: 700 }}>
                {t.simCustomLabel}
              </label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input 
                  type="text" 
                  value={customPrompt} 
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder={t.simCustomPlaceholder}
                  disabled={isProcessing}
                  style={{
                    flexGrow: 1,
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '12px',
                    padding: '0.75rem 1rem',
                    fontSize: '0.82rem',
                    color: 'var(--text-main)',
                    outline: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && customPrompt.trim() && !isProcessing) {
                      runSimulation(true);
                    }
                  }}
                />
                <button 
                  className="btn btn-secondary"
                  onClick={() => runSimulation(true)}
                  disabled={isProcessing || !customPrompt.trim()}
                  style={{
                    padding: '0.75rem 1.25rem',
                    borderRadius: '12px',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    cursor: isProcessing || !customPrompt.trim() ? 'not-allowed' : 'pointer'
                  }}
                >
                  {isProcessing && logs.length > 0 && logs[0].text.includes('--custom') ? (
                    t.simBtnRunning.split(' ')[0]
                  ) : (
                    language === 'id' ? 'Kirim' : 'Submit'
                  )}
                </button>
              </div>
            </div>

          </div>

          {/* Terminal / Dashboard Tabbed container */}
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
              height: '450px'
            }}
          >
            {/* Terminal Window Tab Header Bar */}
            <div 
              style={{ 
                background: '#111625', 
                padding: '0.5rem 1.25rem', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                borderBottom: '1px solid rgba(255,255,255,0.03)'
              }}
            >
              {/* Traffic light close/min/max circles */}
              <div style={{ display: 'flex', gap: '6px' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56', display: 'inline-block' }}></span>
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e', display: 'inline-block' }}></span>
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f', display: 'inline-block' }}></span>
              </div>
              
              {/* Dashboard Navigation Tabs */}
              <div style={{ display: 'flex', gap: '0.5rem', background: '#0a0d16', padding: '2px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.03)' }}>
                <button 
                  onClick={() => setActiveTab('terminal')}
                  style={{
                    background: activeTab === 'terminal' ? '#111625' : 'transparent',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '0.35rem 0.75rem',
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    color: activeTab === 'terminal' ? 'var(--accent-secondary)' : 'var(--text-muted)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {t.simTabTerminal}
                </button>
                <button 
                  onClick={() => setActiveTab('dashboard')}
                  style={{
                    background: activeTab === 'dashboard' ? '#111625' : 'transparent',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '0.35rem 0.75rem',
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    color: activeTab === 'dashboard' ? 'var(--accent-secondary)' : 'var(--text-muted)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {t.simTabDashboard}
                </button>
              </div>

              <div style={{ width: '42px' }}></div>
            </div>

            {/* Dynamic tabs window render content */}
            <div style={{ flexGrow: 1, padding: '1.5rem', overflowY: 'auto' }}>
              
              {/* TAB 1: Console logs view */}
              {activeTab === 'terminal' ? (
                <div 
                  ref={terminalBodyRef}
                  style={{ 
                    fontFamily: 'Consolas, Monaco, monospace', 
                    fontSize: '0.8rem', 
                    color: '#57f287',
                    lineHeight: 1.7,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    height: '100%'
                  }}
                >
                  {/* Idle state */}
                  {logs.length === 0 && !isProcessing && (
                    <div style={{ color: 'rgba(255,255,255,0.3)', textAlign: 'center', margin: 'auto' }}>
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '1rem', opacity: 0.3 }}>
                        <polyline points="4 17 10 11 4 5"></polyline>
                        <line x1="12" y1="19" x2="20" y2="19"></line>
                      </svg>
                      <p style={{ margin: 0, fontSize: '0.85rem' }}>
                        {language === 'id' 
                          ? '[Siap] Pilih skenario atau ketik tugas khusus, lalu jalankan.' 
                          : '[Ready] Choose a scenario or type a custom task, then run.'}
                      </p>
                    </div>
                  )}

                  {/* Logs mapping */}
                  {logs.map((log, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                      {log.status === 'command' ? (
                        <span style={{ color: '#00d2ff', fontWeight: 700 }}>{log.text}</span>
                      ) : (
                        <>
                          {log.status === 'loading' && (
                            <span className="spinner-indicator" style={{
                              display: 'inline-block',
                              width: '12px',
                              height: '12px',
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
                        </>
                      )}
                    </div>
                  ))}

                  {/* Final success badge */}
                  {showSuccess && (
                    <div 
                      className="terminal-success"
                      style={{
                        background: 'rgba(39,201,63,0.06)',
                        border: '1px dashed rgba(39,201,63,0.3)',
                        borderRadius: '12px',
                        padding: '1.15rem',
                        marginTop: '0.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem',
                        animation: 'fadeIn 0.4s ease'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: '#27c93f', fontWeight: 'bold', fontSize: '0.85rem' }}>
                          🟢 {t.simSuccessBadge}
                        </span>
                        <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.7rem' }}>
                          {language === 'id' ? 'Proses Otomatis' : 'Automated'}
                        </span>
                      </div>
                      <p style={{ color: 'rgba(255,255,255,0.85)', margin: 0, fontSize: '0.78rem', lineHeight: 1.4 }}>
                        {language === 'id' 
                          ? `Semua sub-tugas selesai secara aman. Estimasi waktu operasional yang Anda hemat: ${lastSavedTime}!` 
                          : `All sub-tasks successfully executed. Total saved operational hours: ${lastSavedTime}!`}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                /* TAB 2: Graphical visual dashboard view */
                renderDashboardView()
              )}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default TaskSimulator;
