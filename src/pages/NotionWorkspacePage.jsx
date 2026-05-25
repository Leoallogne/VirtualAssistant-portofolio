import React, { useState, useContext, useEffect } from 'react';
import { LanguageContext } from '../context/LanguageContext';

const NotionWorkspacePage = ({ setActivePage }) => {
  const { language, t } = useContext(LanguageContext);

  const [openSop, setOpenSop] = useState(null);
  const [layoutView, setLayoutView] = useState('doc'); // 'doc' or 'kanban'
  const [webhookLog, setWebhookLog] = useState([]);
  const [flashingRowId, setFlashingRowId] = useState(null);

  // Mock tasks list for the checklists and Kanban board with bilingual text
  const [tasks, setTasks] = useState([
    { id: 1, text_id: 'Siapkan filter Gmail dan struktur label merek', text_en: 'Setup brand Gmail filters and label structures', status: 'COMPLETED' },
    { id: 2, text_id: 'Integrasikan slot jadwal Calendly lintas zona waktu', text_en: 'Integrate Calendly cross-timezone booking slots', status: 'COMPLETED' },
    { id: 3, text_id: 'Desain 30 bingkai visual Canva kustom Instagram', text_en: 'Design 30 culinary Instagram visual Canva frames', status: 'IN_PROGRESS' },
    { id: 4, text_id: 'Draf dokumen SOP layanan pelanggan harian', text_en: 'Draft daily customer service ticketing SOP documents', status: 'IN_PROGRESS' },
    { id: 5, text_id: 'Buat video tutorial Loom untuk anggota tim baru', text_en: 'Generate Loom onboarding tutorials for new team hires', status: 'TODO' }
  ]);

  // Google Sheets CRM Milestone Tracker with bilingual support
  const [sheetData, setSheetData] = useState([
    { id: 101, client: 'Warung Nusantara', niche_id: 'Restoran Kuliner', niche_en: 'F&B Restaurant', stage_id: 'Hari 6-7: Peluncuran', stage_en: 'Day 6-7: Launch', progress: '2/5', payment: 'PAID', assignee: 'Leo Syafiq (VA)' },
    { id: 102, client: 'Java Coffee Co.', niche_id: 'Pemanggangan Kopi', niche_en: 'Coffee Roastery', stage_id: 'Hari 3-5: Integrasi', stage_en: 'Day 3-5: Integration', progress: '4/5', payment: 'INVOICED', assignee: 'Leo Syafiq (VA)' },
    { id: 103, client: 'Karawang Catering', niche_id: 'Katering Acara', niche_en: 'Katering Event', stage_id: 'Hari 1-2: Persiapan', stage_en: 'Day 1-2: Setup', progress: '1/5', payment: 'INVOICED', assignee: 'Leo Syafiq (VA)' }
  ]);

  // Sync selected email object with changes in array
  useEffect(() => {
    // Generate initial webhook console logs based on locale
    triggerWebhookLog(language === 'id' 
      ? 'Notion Webhook: Sistem aktif terhubung dengan Slack.' 
      : 'Notion Webhook: System actively connected with Slack.'
    );
  }, [language]);

  const triggerWebhookLog = (message) => {
    const timestamp = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setWebhookLog(prev => [`[${timestamp} WIB] ${message}`, ...prev.slice(0, 4)]);
  };

  // Toggle tasks check
  const toggleTask = (id) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        const isNowCompleted = t.status !== 'COMPLETED';
        const nextStatus = isNowCompleted ? 'COMPLETED' : 'TODO';
        const text = language === 'id' ? t.text_id : t.text_en;
        
        // Trigger automated webhooks alert simulation
        if (language === 'id') {
          triggerWebhookLog(`Notion Webhook: Tugas "${text.substring(0, 20)}..." digeser ke ${nextStatus}.`);
          triggerWebhookLog(`Slack Webhook: Notifikasi dikirim ke saluran #operations.`);
        } else {
          triggerWebhookLog(`Notion Webhook: Task "${text.substring(0, 20)}..." shifted to ${nextStatus}.`);
          triggerWebhookLog(`Slack Webhook: Notification dispatched to #operations channel.`);
        }
        
        // Auto-update spreadsheet row for visual synchronization
        setSheetData(s => s.map(row => {
          if (row.client === 'Warung Nusantara') {
            const completedCount = prev.filter(x => x.id === id ? isNowCompleted : x.status === 'COMPLETED').length;
            
            // Flash row
            setFlashingRowId(101);
            setTimeout(() => setFlashingRowId(null), 1500);

            return { 
              ...row, 
              progress: `${completedCount}/5`, 
              stage_id: completedCount === 5 ? 'Operasional Aktif' : 'Hari 6-7: Peluncuran',
              stage_en: completedCount === 5 ? 'Active Operations' : 'Day 6-7: Launch'
            };
          }
          return row;
        }));

        return { ...t, status: nextStatus };
      }
      return t;
    }));
  };

  // Switch Kanban column manually on click
  const advanceKanbanTask = (id) => {
    const columns = ['TODO', 'IN_PROGRESS', 'COMPLETED'];
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        const nextIdx = (columns.indexOf(t.status) + 1) % columns.length;
        const nextStatus = columns[nextIdx];
        const text = language === 'id' ? t.text_id : t.text_en;

        if (language === 'id') {
          triggerWebhookLog(`Kanban Update: "${text.substring(0, 20)}..." digeser ke ${nextStatus}.`);
          if (nextStatus === 'COMPLETED') {
            triggerWebhookLog(`Slack Webhook: Peringatan dikirim ke pendiri.`);
          }
        } else {
          triggerWebhookLog(`Kanban Update: "${text.substring(0, 20)}..." moved to ${nextStatus}.`);
          if (nextStatus === 'COMPLETED') {
            triggerWebhookLog(`Slack Webhook: Alert dispatched to founder.`);
          }
        }

        // Auto-update spreadsheet progress
        setSheetData(s => s.map(row => {
          if (row.client === 'Warung Nusantara') {
            const completedCount = prev.filter(x => x.id === id ? nextStatus === 'COMPLETED' : x.status === 'COMPLETED').length;
            return { ...row, progress: `${completedCount}/5` };
          }
          return row;
        }));

        return { ...t, status: nextStatus };
      }
      return t;
    }));
  };

  // Direct edit spreadsheet status dropdown
  const toggleSheetPayment = (rowId) => {
    const payments = ['INVOICED', 'PAID', 'UNPAID'];
    setSheetData(prev => prev.map(row => {
      if (row.id === rowId) {
        const nextIndex = (payments.indexOf(row.payment) + 1) % payments.length;
        const nextPayment = payments[nextIndex];

        if (language === 'id') {
          triggerWebhookLog(`Pembaruan CRM: Status faktur untuk ${row.client} berubah menjadi ${nextPayment}.`);
        } else {
          triggerWebhookLog(`CRM Update: Invoice status for ${row.client} changed to ${nextPayment}.`);
        }

        setFlashingRowId(rowId);
        setTimeout(() => setFlashingRowId(null), 1500);

        return { ...row, payment: nextPayment };
      }
      return row;
    }));
  };

  const handleSheetCellEdit = (rowId, field, newText) => {
    setSheetData(prev => prev.map(row => {
      if (row.id === rowId) {
        if (field === 'client') return { ...row, client: newText };
        if (field === 'niche') {
          return language === 'id' 
            ? { ...row, niche_id: newText }
            : { ...row, niche_en: newText };
        }
      }
      return row;
    }));
  };

  const completedCount = tasks.filter(t => t.status === 'COMPLETED').length;
  const progressPercent = Math.round((completedCount / tasks.length) * 100);

  const sops = [
    {
      id: 'CS-01',
      title_id: 'CS-01: Prosedur Kotak Masuk & Respon',
      title_en: 'CS-01: Customer Inbox & Response SOP',
      desc_id: 'Protokol penanganan surat masuk pelanggan toko katering.',
      desc_en: 'Inbound message handling protocols for catering store customers.',
      steps_id: [
        'Periksa inbox Gmail utama setiap pukul 09:00 WIB, 13:00 WIB, dan 17:00 WIB.',
        'Saring pesan masuk berdasarkan 3 label otomatis: Urgent (Komplain), Supplier, dan General.',
        'Gunakan Template Balasan Gmail kustom untuk membalas pertanyaan katering umum kurang dari 3 jam.',
        'Pindahkan email yang telah dibalas ke dalam folder Arsip/Resolved untuk menjaga Inbox Zero.'
      ],
      steps_en: [
        'Check primary Gmail inbox daily at 09:00 WIB, 13:00 WIB, and 17:00 WIB.',
        'Filter inbound emails using 3 automated label directories: Urgent, Supplier, and General.',
        'Apply custom Gmail Canned Templates to reply to generic inquiries under 3 hours.',
        'Archive triaged/replied emails to maintain absolute Inbox Zero.'
      ]
    },
    {
      id: 'CAL-02',
      title_id: 'CAL-02: Penjadwalan Kalender Eksekutif Lintas Zona Waktu',
      title_en: 'CAL-02: Executive Timezone Scheduling SOP',
      desc_id: 'Protokol koordinasi agenda founder lintas zona waktu.',
      desc_en: 'Cross-timezone schedule coordination protocols for the founder.',
      steps_id: [
        'Pastikan Google Calendar founder terintegrasi dengan Calendly dengan reminder 24 jam.',
        'Ketika klien baru memesan jadwal, periksa bentrok rapat penting dengan slide warning.',
        'Kirimkan reminder via Slack kepada founder 2 jam sebelum pertemuan dimulai.',
        'Lakukan audit jadwal setiap Sabtu sore untuk menghindari tabrakan agenda.'
      ],
      steps_en: [
        'Integrate Google Calendar with Calendly with an automated 24-hr reminder threshold.',
        'When booking slots are requested, review double-booking warning markers carefully.',
        'Dispatch active Slack reminders to the founder 2 hours before meetings begin.',
        'Run calendar audits every Saturday evening to ensure zero overlapping roster states.'
      ]
    },
    {
      id: 'MKT-03',
      title_id: 'MKT-03: Pemasaran Media Sosial UMKM',
      title_en: 'MKT-03: MSME Social Media Marketing SOP',
      desc_id: 'Protokol penyusunan konten dan jadwal posting Instagram.',
      desc_en: 'Content development and Instagram posting scheduler SOPs.',
      steps_id: [
        'Desain visual menggunakan template Canva kustom di bawah brand style kit.',
        'Tulis caption menggunakan formula AIDA (Attention, Interest, Desire, Action).',
        'Sertakan 15-20 hashtag tertarget berdasarkan tren kuliner mingguan.',
        'Atur jadwal rilis postingan via Buffer setiap hari Selasa & Jumat.'
      ],
      steps_en: [
        'Develop visual assets using custom Canva grids governed by the brand kit.',
        'Formulate persuasive caption copy applying the AIDA framework.',
        'Incorporate 15-20 target hashtags matching weekly culinary trends.',
        'Schedule release posts via Buffer weekly on Tuesdays and Fridays.'
      ]
    }
  ];

  return (
    <div style={{ minHeight: '100vh', padding: '6rem 0 4rem 0', position: 'relative' }}>
      {/* Background visual spheres */}
      <div className="ambient-glows">
        <div className="glow-bubble glow-bubble-1" style={{ top: '-80px', right: '15%' }}></div>
        <div className="glow-bubble glow-bubble-2" style={{ bottom: '10%', left: '-150px' }}></div>
      </div>

      <div className="container" style={{ maxWidth: '1200px' }}>
        {/* Back navigation header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <button 
            onClick={() => setActivePage('home')}
            className="btn btn-secondary"
            style={{ padding: '0.6rem 1.25rem', fontSize: '0.9rem', borderRadius: '10px' }}
          >
            {t.expBack}
          </button>
          <div>
            <span className="section-tag" style={{ marginBottom: 0 }}>{t.expTag}</span>
          </div>
        </div>

        {/* Title */}
        <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
          <h2 className="section-title" style={{ marginBottom: '0.5rem' }}>
            {language === 'id' ? <>Workspace Notion & <span className="text-gradient">CRM Excel</span></> : <>Notion Workspace & <span className="text-gradient">CRM Excel</span> Simulator</>}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>
            {t.notionSub}
          </p>
        </div>

        {/* 📊 Layout Views Switcher Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 800 }}>{t.notionBoardTitle}</span>
          
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => setLayoutView('doc')}
              style={{
                padding: '0.45rem 0.85rem',
                borderRadius: '6px',
                border: '1px solid var(--glass-border)',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
                background: layoutView === 'doc' ? 'var(--accent-glow)' : 'var(--bg-secondary)',
                color: layoutView === 'doc' ? 'var(--accent-secondary)' : 'var(--text-muted)'
              }}
            >
              {t.notionTabDoc}
            </button>
            <button
              onClick={() => setLayoutView('kanban')}
              style={{
                padding: '0.45rem 0.85rem',
                borderRadius: '6px',
                border: '1px solid var(--glass-border)',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
                background: layoutView === 'kanban' ? 'var(--accent-glow)' : 'var(--bg-secondary)',
                color: layoutView === 'kanban' ? 'var(--accent-secondary)' : 'var(--text-muted)'
              }}
            >
              {t.notionTabKanban}
            </button>
          </div>
        </div>

        {/* Main interactive area split */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2rem',
          alignItems: 'start',
          marginBottom: '3rem'
        }}>
          {/* Left panel: Doc Outline / Kanban Columns */}
          {layoutView === 'doc' ? (
            /* Standard SOP accordion outline */
            <div className="glass-panel" style={{ padding: '2rem', border: '1px solid var(--glass-border)', background: 'var(--bg-secondary)' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{t.notionSopLibrary}</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                {t.notionSopDesc}
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {sops.map((sop) => {
                  const isOpen = openSop === sop.id;
                  const title = language === 'id' ? sop.title_id : sop.title_en;
                  const desc = language === 'id' ? sop.desc_id : sop.desc_en;
                  const steps = language === 'id' ? sop.steps_id : sop.steps_en;

                  return (
                    <div key={sop.id} style={{ border: '1px solid var(--glass-border)', borderRadius: '10px', overflow: 'hidden' }}>
                      <div
                        onClick={() => setOpenSop(isOpen ? null : sop.id)}
                        style={{
                          padding: '1rem',
                          background: isOpen ? 'var(--accent-glow)' : 'rgba(255,255,255,0.02)',
                          cursor: 'pointer',
                          display: 'flex',
                          justifyContent: 'space-between',
                          color: isOpen ? 'var(--accent-secondary)' : 'var(--text-main)',
                          fontWeight: 700,
                          fontSize: '0.85rem'
                        }}
                      >
                        <span>{title}</span>
                        <span>{isOpen ? '▲' : '▼'}</span>
                      </div>
                      {isOpen && (
                        <div style={{ padding: '1.15rem', background: 'rgba(0,0,0,0.03)', borderTop: '1px solid var(--glass-border)', animation: 'fade-in 0.2s ease' }}>
                          <p style={{ fontSize: '0.75rem', fontStyle: 'italic', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>{language === 'id' ? 'Tujuan' : 'Objective'}: {desc}</p>
                          <ol style={{ paddingLeft: '1.15rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                            {steps.map((st, idx) => <li key={idx} style={{ lineHeight: 1.4 }}>{st}</li>)}
                          </ol>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Agile Kanban Board columns */
            <div className="glass-panel" style={{ padding: '2rem', border: '1px solid var(--glass-border)', background: 'var(--bg-secondary)', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', minHeight: '340px' }}>
              {/* TODO Column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.25rem', display: 'block' }}>📋 TO DO</span>
                {tasks.filter(t => t.status === 'TODO').map(task => {
                  const text = language === 'id' ? task.text_id : task.text_en;
                  return (
                    <div
                      key={task.id}
                      onClick={() => advanceKanbanTask(task.id)}
                      style={{ padding: '0.65rem', background: 'var(--bg-primary)', border: '1px solid var(--glass-border)', borderRadius: '6px', fontSize: '0.75rem', color: 'var(--text-main)', cursor: 'pointer', transition: 'all 0.2s' }}
                      title="Click to shift progress"
                    >
                      {text}
                    </div>
                  );
                })}
              </div>

              {/* IN PROGRESS Column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--accent)', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.25rem', display: 'block' }}>⚡ PROGRESS</span>
                {tasks.filter(t => t.status === 'IN_PROGRESS').map(task => {
                  const text = language === 'id' ? task.text_id : task.text_en;
                  return (
                    <div
                      key={task.id}
                      onClick={() => advanceKanbanTask(task.id)}
                      style={{ padding: '0.65rem', background: 'var(--bg-primary)', border: '1px solid var(--accent)', borderRadius: '6px', fontSize: '0.75rem', color: 'var(--text-main)', cursor: 'pointer', transition: 'all 0.2s' }}
                      title="Click to shift progress"
                    >
                      {text}
                    </div>
                  );
                })}
              </div>

              {/* COMPLETED Column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--accent-secondary)', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.25rem', display: 'block' }}>✅ RESOLVED</span>
                {tasks.filter(t => t.status === 'COMPLETED').map(task => {
                  const text = language === 'id' ? task.text_id : task.text_en;
                  return (
                    <div
                      key={task.id}
                      onClick={() => advanceKanbanTask(task.id)}
                      style={{ padding: '0.65rem', background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '6px', fontSize: '0.75rem', color: 'var(--text-muted)', textDecoration: 'line-through', cursor: 'pointer' }}
                      title="Click to loop back"
                    >
                      {text}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Right panel: Checklist / Webhook Console Log */}
          <div className="glass-panel" style={{ padding: '2rem', border: '1px solid var(--glass-border)', background: 'var(--bg-secondary)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{t.notionChecklistTitle}</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t.notionChecklistDesc}</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', maxHeight: '180px', overflowY: 'auto' }}>
              {tasks.map(task => {
                const isCompleted = task.status === 'COMPLETED';
                const text = language === 'id' ? task.text_id : task.text_en;
                return (
                  <div
                    key={task.id}
                    onClick={() => toggleTask(task.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.75rem',
                      background: 'var(--bg-primary)',
                      border: '1px solid var(--glass-border)',
                      borderColor: isCompleted ? 'var(--accent-secondary)' : 'var(--glass-border)',
                      borderRadius: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{
                      width: '16px',
                      height: '16px',
                      borderRadius: '4px',
                      border: '2px solid var(--text-muted)',
                      borderColor: isCompleted ? 'var(--accent-secondary)' : 'var(--text-muted)',
                      background: isCompleted ? 'var(--accent-secondary)' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--bg-primary)',
                      fontSize: '0.65rem',
                      fontWeight: 900
                    }}>
                      {isCompleted && '✓'}
                    </div>
                    <span style={{
                      fontSize: '0.85rem',
                      color: isCompleted ? 'var(--text-muted)' : 'var(--text-main)',
                      textDecoration: isCompleted ? 'line-through' : 'none'
                    }}>{text}</span>
                  </div>
                );
              })}
            </div>

            {/* Completion rate bar */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                <span>{t.notionProgressTitle}</span>
                <span style={{ color: 'var(--accent-secondary)' }}>{progressPercent}%</span>
              </div>
              <div style={{ width: '100%', height: '5px', background: 'var(--bg-primary)', borderRadius: '10px', overflow: 'hidden' }}>
                <div style={{ height: '100%', background: 'var(--gradient-primary)', width: `${progressPercent}%`, transition: 'width 0.4s ease' }} />
              </div>
            </div>

            {/* 🤖 Automated Webhook Console Logger */}
            <div style={{
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--glass-border)',
              borderRadius: '8px',
              padding: '0.75rem',
              fontFamily: 'monospace',
              fontSize: '0.7rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem',
              minHeight: '85px'
            }}>
              <span style={{ color: 'var(--text-main)', fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', display: 'block', marginBottom: '0.15rem' }}>{t.notionConsoleTitle}</span>
              {webhookLog.length === 0 ? (
                <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>{t.notionConsoleIdle}</span>
              ) : (
                webhookLog.map((log, idx) => (
                  <div key={idx} style={{ color: log.includes('Slack') ? '#38ef7d' : 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {log}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* 💻 Google Sheets / Excel Live Spreadsheet Simulator */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                <span>{t.notionSheetTitle}</span>
                <span className="project-tag" style={{ fontSize: '0.65rem', background: 'var(--accent-glow)', color: 'var(--accent-secondary)' }}>{t.expExcelSync}</span>
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                {t.notionSheetDesc}
              </p>
            </div>
            
            <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
              {t.notionFormula}
            </div>
          </div>

          <div style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--glass-border)',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-md)'
          }}>
            {/* Excel top menu bar - Theme Aware */}
            <div style={{
              background: 'var(--bg-tertiary)',
              borderBottom: '1px solid var(--glass-border)',
              padding: '0.5rem 1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              fontFamily: 'monospace'
            }}>
              <span style={{ color: 'var(--accent-secondary)', fontWeight: 800 }}>📂 CORPORATE_OPERATIONS_CRM_LEDGER.xlsx</span>
              <span>{language === 'id' ? 'Baris CRM' : 'CRM Rows'}: {sheetData.length} {language === 'id' ? 'klien aktif' : 'active clients'}</span>
            </div>

            {/* Spreadsheet Table */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '0.8rem',
                fontFamily: 'Consolas, Monaco, monospace',
                textAlign: 'left'
              }}>
                <thead>
                  <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--glass-border)' }}>
                    <th style={{ padding: '0.5rem', width: '40px', background: 'var(--bg-tertiary)', borderRight: '1px solid var(--glass-border)', textAlign: 'center' }}></th>
                    <th style={{ padding: '0.65rem 1rem', borderRight: '1px solid var(--glass-border)', color: 'var(--text-main)' }}>A ({language === 'id' ? 'Identitas Klien' : 'Client Identity'})</th>
                    <th style={{ padding: '0.65rem 1rem', borderRight: '1px solid var(--glass-border)', color: 'var(--text-main)' }}>B ({language === 'id' ? 'Niche Pasar' : 'Market Niche'})</th>
                    <th style={{ padding: '0.65rem 1rem', borderRight: '1px solid var(--glass-border)', color: 'var(--text-main)' }}>C ({language === 'id' ? 'Tahap Milestones SOP Aktif' : 'Active SOP Milestones Stage'})</th>
                    <th style={{ padding: '0.65rem 1rem', borderRight: '1px solid var(--glass-border)', color: 'var(--text-main)', textAlign: 'center' }}>D ({language === 'id' ? 'Tugas Selesai' : 'Tasks Checked'})</th>
                    <th style={{ padding: '0.65rem 1rem', borderRight: '1px solid var(--glass-border)', color: 'var(--text-main)', textAlign: 'center' }}>E ({language === 'id' ? 'Status Faktur CRM' : 'CRM Invoice Status'})</th>
                    <th style={{ padding: '0.65rem 1rem', color: 'var(--text-main)' }}>F (VA Lead Assignee)</th>
                  </tr>
                </thead>
                <tbody>
                  {sheetData.map((row, index) => {
                    const isFlashing = flashingRowId === row.id;
                    const niche = language === 'id' ? row.niche_id : row.niche_en;
                    const stage = language === 'id' ? row.stage_id : row.stage_en;
                    
                    return (
                      <tr
                        key={row.id}
                        style={{
                          borderBottom: '1px solid var(--glass-border)',
                          background: isFlashing 
                            ? 'rgba(16, 185, 129, 0.2)' 
                            : index % 2 === 0 
                            ? 'rgba(0,0,0,0.02)' 
                            : 'transparent',
                          transition: 'background 0.5s ease'
                        }}
                      >
                        <td style={{
                          padding: '0.5rem',
                          background: 'var(--bg-tertiary)',
                          borderRight: '1px solid var(--glass-border)',
                          textAlign: 'center',
                          color: 'var(--text-muted)',
                          fontWeight: 700
                        }}>
                          {index + 1}
                        </td>
                        <td style={{ padding: '0.65rem 1rem', borderRight: '1px solid var(--glass-border)', color: 'var(--text-main)', fontWeight: 700 }}>
                          <input
                            type="text"
                            value={row.client}
                            onChange={(e) => handleSheetCellEdit(row.id, 'client', e.target.value)}
                            style={{ width: '100%', background: 'transparent', border: 'none', color: 'var(--text-main)', fontFamily: 'monospace', outline: 'none' }}
                          />
                        </td>
                        <td style={{ padding: '0.65rem 1rem', borderRight: '1px solid var(--glass-border)', color: 'var(--text-muted)' }}>
                          <input
                            type="text"
                            value={niche}
                            onChange={(e) => handleSheetCellEdit(row.id, 'niche', e.target.value)}
                            style={{ width: '100%', background: 'transparent', border: 'none', color: 'var(--text-muted)', fontFamily: 'monospace', outline: 'none' }}
                          />
                        </td>
                        <td style={{ padding: '0.65rem 1rem', borderRight: '1px solid var(--glass-border)', color: 'var(--text-main)' }}>
                          <span style={{ color: stage.includes('Launch') || stage.includes('Peluncuran') || stage.includes('Active') || stage.includes('Aktif') ? 'var(--accent-secondary)' : stage.includes('Integration') || stage.includes('Integrasi') ? '#3b82f6' : 'hsl(38,92%,50%)', fontWeight: 700 }}>
                            {stage}
                          </span>
                        </td>
                        <td style={{ padding: '0.65rem 1rem', borderRight: '1px solid var(--glass-border)', color: 'var(--text-main)', textAlign: 'center', fontWeight: 800 }}>
                          {row.progress}
                        </td>
                        <td 
                          onClick={() => toggleSheetPayment(row.id)}
                          style={{
                            padding: '0.65rem 1rem',
                            borderRight: '1px solid var(--glass-border)',
                            cursor: 'pointer',
                            textAlign: 'center',
                            userSelect: 'none'
                          }}
                        >
                          <span style={{
                            padding: '0.2rem 0.5rem',
                            borderRadius: '6px',
                            fontWeight: 800,
                            fontSize: '0.7rem',
                            background: row.payment === 'PAID' 
                              ? 'rgba(16, 185, 129, 0.15)' 
                              : row.payment === 'INVOICED' 
                              ? 'rgba(245, 158, 11, 0.15)' 
                              : 'rgba(239, 68, 68, 0.15)',
                            color: row.payment === 'PAID' 
                              ? 'hsl(142, 70%, 45%)' 
                              : row.payment === 'INVOICED' 
                              ? 'hsl(38, 92%, 50%)' 
                              : 'hsl(0, 84%, 60%)',
                            border: '1px solid',
                            borderColor: row.payment === 'PAID' 
                              ? 'rgba(16, 185, 129, 0.3)' 
                              : row.payment === 'INVOICED' 
                              ? 'rgba(245, 158, 11, 0.3)' 
                              : 'rgba(239, 68, 68, 0.3)',
                          }}>
                            {row.payment} ⇄
                          </span>
                        </td>
                        <td style={{ padding: '0.65rem 1rem', color: 'var(--text-muted)' }}>
                          {row.assignee}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default NotionWorkspacePage;
