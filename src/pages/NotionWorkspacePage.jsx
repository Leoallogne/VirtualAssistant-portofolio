import React, { useState } from 'react';

const NotionWorkspacePage = ({ setActivePage }) => {
  const [openSop, setOpenSop] = useState(null);
  const [layoutView, setLayoutView] = useState('doc'); // 'doc' or 'kanban'
  const [webhookLog, setWebhookLog] = useState([]);
  const [flashingRowId, setFlashingRowId] = useState(null);

  // Mock tasks list for the checklists and Kanban board
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Setup brand Gmail filters and label structures', status: 'COMPLETED' },
    { id: 2, text: 'Integrate Calendly cross-timezone booking slots', status: 'COMPLETED' },
    { id: 3, text: 'Design 30 culinary Instagram visual Canva frames', status: 'IN_PROGRESS' },
    { id: 4, text: 'Draft daily customer service ticketing SOP documents', status: 'IN_PROGRESS' },
    { id: 5, text: 'Generate Loom onboarding tutorials for new team hires', status: 'TODO' }
  ]);

  // Google Sheets CRM Milestone Tracker
  const [sheetData, setSheetData] = useState([
    { id: 101, client: 'Warung Nusantara', niche: 'F&B Restaurant', stage: 'Day 6-7: Launch', progress: '2/5', payment: 'PAID', assignee: 'Leo Syafiq (VA)' },
    { id: 102, client: 'Java Coffee Co.', niche: 'Coffee Roastery', stage: 'Day 3-5: Integration', progress: '4/5', payment: 'INVOICED', assignee: 'Leo Syafiq (VA)' },
    { id: 103, client: 'Karawang Catering', niche: 'Katering Event', stage: 'Day 1-2: Setup', progress: '1/5', payment: 'INVOICED', assignee: 'Leo Syafiq (VA)' }
  ]);

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
        
        // Trigger automated webhooks alert simulation
        triggerWebhookLog(`Notion Webhook: Task "${t.text.substring(0, 20)}..." shifted to ${nextStatus}.`);
        triggerWebhookLog(`Slack Webhook: Notification dispatched to #operations channel.`);
        
        // Auto-update spreadsheet row for visual synchronization
        setSheetData(s => s.map(row => {
          if (row.client === 'Warung Nusantara') {
            const completedCount = prev.filter(x => x.id === id ? isNowCompleted : x.status === 'COMPLETED').length;
            
            // Flash row
            setFlashingRowId(101);
            setTimeout(() => setFlashingRowId(null), 1500);

            return { ...row, progress: `${completedCount}/5`, stage: completedCount === 5 ? 'Active Operations' : 'Day 6-7: Launch' };
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

        triggerWebhookLog(`Kanban Update: "${t.text.substring(0, 20)}..." moved to ${nextStatus}.`);
        if (nextStatus === 'COMPLETED') {
          triggerWebhookLog(`Slack Webhook: Alert dispatched to founder.`);
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
        
        triggerWebhookLog(`CRM Update: Invoice status for ${row.client} changed to ${payments[nextIndex]}.`);

        setFlashingRowId(rowId);
        setTimeout(() => setFlashingRowId(null), 1500);

        return { ...row, payment: payments[nextIndex] };
      }
      return row;
    }));
  };

  const handleSheetCellEdit = (rowId, field, newText) => {
    setSheetData(prev => prev.map(row => row.id === rowId ? { ...row, [field]: newText } : row));
  };

  const completedCount = tasks.filter(t => t.status === 'COMPLETED').length;
  const progressPercent = Math.round((completedCount / tasks.length) * 100);

  const sops = [
    {
      id: 'CS-01',
      title: 'CS-01: Customer Inbox & Response SOP',
      desc: 'Protokol penanganan surat masuk pelanggan toko katering.',
      steps: [
        'Periksa inbox Gmail utama setiap pukul 09:00 WIB, 13:00 WIB, dan 17:00 WIB.',
        'Saring pesan masuk berdasarkan 3 label otomatis: Urgent (Komplain), Supplier, dan General.',
        'Gunakan Template Balasan Gmail kustom untuk membalas pertanyaan katering umum kurang dari 3 jam.',
        'Pindahkan email yang telah dibalas ke dalam folder Arsip/Resolved untuk menjaga Inbox Zero.'
      ]
    },
    {
      id: 'CAL-02',
      title: 'CAL-02: Executive Timezone Scheduling SOP',
      desc: 'Protokol koordinasi agenda founder lintas zona waktu.',
      steps: [
        'Pastikan Google Calendar founder terintegrasi dengan Calendly dengan reminder 24 jam.',
        'Ketika klien baru memesan jadwal, periksa bentrok rapat penting dengan slide warning.',
        'Kirimkan reminder via Slack kepada founder 2 jam sebelum pertemuan dimulai.',
        'Lakukan audit jadwal setiap Sabtu sore untuk menghindari tabrakan agenda.'
      ]
    },
    {
      id: 'MKT-03',
      title: 'MKT-03: MSME Social Media Marketing SOP',
      desc: 'Protokol penyusunan konten dan jadwal posting Instagram.',
      steps: [
        'Desain visual menggunakan template Canva kustom di bawah brand style kit.',
        'Tulis caption menggunakan formula AIDA (Attention, Interest, Desire, Action).',
        'Sertakan 15-20 hashtag tertarget berdasarkan tren kuliner mingguan.',
        'Atur jadwal rilis postingan via Buffer setiap hari Selasa & Jumat.'
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
            ← Back to Portfolio
          </button>
          <div>
            <span className="section-tag" style={{ marginBottom: 0 }}>Interactive Sandbox</span>
          </div>
        </div>

        {/* Title */}
        <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
          <h2 className="section-title" style={{ marginBottom: '0.5rem' }}>
            Notion Workspace & <span className="text-gradient">CRM Excel</span> Simulator
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>
            Enforce operational workflows. Switch checklists to Kanban columns, trigger simulated Slack webhooks, and sync milestone CRM databases with the master Excel sheet below.
          </p>
        </div>

        {/* 📊 Layout Views Switcher Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 800 }}>📌 Notion Operations Board</span>
          
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
              Doc Outline & Checklist
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
              Agile Kanban Board
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
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>🚀 Business SOP Library</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                Expanding active SOP models detailing operational rules for businesses. Click row header to toggle details:
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {sops.map((sop) => {
                  const isOpen = openSop === sop.id;
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
                        <span>{sop.title}</span>
                        <span>{isOpen ? '▲' : '▼'}</span>
                      </div>
                      {isOpen && (
                        <div style={{ padding: '1.15rem', background: 'rgba(0,0,0,0.1)', borderTop: '1px solid var(--glass-border)', animation: 'fade-in 0.2s ease' }}>
                          <p style={{ fontSize: '0.75rem', fontStyle: 'italic', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>Objective: {sop.desc}</p>
                          <ol style={{ paddingLeft: '1.15rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                            {sop.steps.map((st, idx) => <li key={idx} style={{ lineHeight: 1.4 }}>{st}</li>)}
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
                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)', borderBottom: '1px solid var(--glass-border)', pb: '0.25rem', display: 'block' }}>📋 TO DO</span>
                {tasks.filter(t => t.status === 'TODO').map(task => (
                  <div
                    key={task.id}
                    onClick={() => advanceKanbanTask(task.id)}
                    style={{ padding: '0.65rem', background: 'var(--bg-primary)', border: '1px solid var(--glass-border)', borderRadius: '6px', fontSize: '0.75rem', color: 'var(--text-main)', cursor: 'pointer', transition: 'all 0.2s' }}
                    title="Click to shift progress"
                  >
                    {task.text}
                  </div>
                ))}
              </div>

              {/* IN PROGRESS Column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--accent)', borderBottom: '1px solid var(--glass-border)', pb: '0.25rem', display: 'block' }}>⚡ PROGRESS</span>
                {tasks.filter(t => t.status === 'IN_PROGRESS').map(task => (
                  <div
                    key={task.id}
                    onClick={() => advanceKanbanTask(task.id)}
                    style={{ padding: '0.65rem', background: 'var(--bg-primary)', border: '1px solid var(--accent)', borderRadius: '6px', fontSize: '0.75rem', color: 'var(--text-main)', cursor: 'pointer', transition: 'all 0.2s' }}
                    title="Click to shift progress"
                  >
                    {task.text}
                  </div>
                ))}
              </div>

              {/* COMPLETED Column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--accent-secondary)', borderBottom: '1px solid var(--glass-border)', pb: '0.25rem', display: 'block' }}>✅ RESOLVED</span>
                {tasks.filter(t => t.status === 'COMPLETED').map(task => (
                  <div
                    key={task.id}
                    onClick={() => advanceKanbanTask(task.id)}
                    style={{ padding: '0.65rem', background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '6px', fontSize: '0.75rem', color: 'var(--text-muted)', textDecoration: 'line-through', cursor: 'pointer' }}
                    title="Click to loop back"
                  >
                    {task.text}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Right panel: Checklist / Webhook Console Log */}
          <div className="glass-panel" style={{ padding: '2rem', border: '1px solid var(--glass-border)', background: 'var(--bg-secondary)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>☑ Operations Trello Checklist</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Toggle checklist checkboxes to simulate real-time operations:</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', maxHeight: '180px', overflowY: 'auto' }}>
              {tasks.map(task => {
                const isCompleted = task.status === 'COMPLETED';
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
                    }}>{task.text}</span>
                  </div>
                );
              })}
            </div>

            {/* Completion rate bar */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                <span>Milestone Onboarding progress</span>
                <span style={{ color: 'var(--accent-secondary)' }}>{progressPercent}%</span>
              </div>
              <div style={{ width: '100%', height: '5px', background: 'var(--bg-primary)', borderRadius: '10px', overflow: 'hidden' }}>
                <div style={{ height: '100%', background: 'var(--gradient-primary)', width: `${progressPercent}%`, transition: 'width 0.4s ease' }} />
              </div>
            </div>

            {/* 🤖 Automated Webhook Console Logger */}
            <div style={{
              background: '#0e1626',
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
              <span style={{ color: '#a0aec0', fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', display: 'block', mb: '0.15rem' }}>🔄 Simulated Webhooks Log Console</span>
              {webhookLog.length === 0 ? (
                <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>[Idle] Toggle checklists to dispatch simulated REST API logs.</span>
              ) : (
                webhookLog.map((log, idx) => (
                  <div key={idx} style={{ color: log.includes('Slack') ? '#38ef7d' : '#e2e8f0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
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
                <span>📊 Operations CRM & SOP Milestones Sheets</span>
                <span className="project-tag" style={{ fontSize: '0.65rem', background: 'var(--accent-glow)', color: 'var(--accent-secondary)' }}>Live Milestones Ledger</span>
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                Master Client CRM Sheet detailing operational stages. Toggling tasks in the Notion Operations tracker dynamically updates Warung Nusantara progress. Double-click Payment Status to toggle.
              </p>
            </div>
            
            <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
              =COUNTIF(E2:E4, "PAID")
            </div>
          </div>

          <div style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--glass-border)',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: 'var(--premium-shadow)'
          }}>
            {/* Excel top menu bar */}
            <div style={{
              background: '#1b2a47',
              borderBottom: '1px solid var(--glass-border)',
              padding: '0.5rem 1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.75rem',
              color: '#a0aec0',
              fontFamily: 'monospace'
            }}>
              <span style={{ color: '#ebf8ff', fontWeight: 800 }}>📂 CORPORATE_OPERATIONS_CRM_LEDGER.xlsx</span>
              <span>CRM Rows: {sheetData.length} active clients</span>
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
                  <tr style={{ background: 'rgba(255,255,255,0.06)', borderBottom: '1px solid var(--glass-border)' }}>
                    <th style={{ padding: '0.5rem', width: '40px', background: 'rgba(0,0,0,0.2)', borderRight: '1px solid var(--glass-border)', textAlign: 'center' }}></th>
                    <th style={{ padding: '0.65rem 1rem', borderRight: '1px solid var(--glass-border)', color: 'var(--text-main)' }}>A (Client Identity)</th>
                    <th style={{ padding: '0.65rem 1rem', borderRight: '1px solid var(--glass-border)', color: 'var(--text-main)' }}>B (Market Niche)</th>
                    <th style={{ padding: '0.65rem 1rem', borderRight: '1px solid var(--glass-border)', color: 'var(--text-main)' }}>C (Active SOP Milestones Stage)</th>
                    <th style={{ padding: '0.65rem 1rem', borderRight: '1px solid var(--glass-border)', color: 'var(--text-main)', textAlign: 'center' }}>D (Tasks Checked)</th>
                    <th style={{ padding: '0.65rem 1rem', borderRight: '1px solid var(--glass-border)', color: 'var(--text-main)', textAlign: 'center' }}>E (CRM Invoice Status)</th>
                    <th style={{ padding: '0.65rem 1rem', color: 'var(--text-main)' }}>F (VA Lead Assignee)</th>
                  </tr>
                </thead>
                <tbody>
                  {sheetData.map((row, index) => {
                    const isFlashing = flashingRowId === row.id;
                    
                    return (
                      <tr
                        key={row.id}
                        style={{
                          borderBottom: '1px solid var(--glass-border)',
                          background: isFlashing 
                            ? 'rgba(16, 185, 129, 0.2)' 
                            : index % 2 === 0 
                            ? 'rgba(0,0,0,0.1)' 
                            : 'transparent',
                          transition: 'background 0.5s ease'
                        }}
                      >
                        <td style={{
                          padding: '0.5rem',
                          background: 'rgba(0,0,0,0.2)',
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
                            value={row.niche}
                            onChange={(e) => handleSheetCellEdit(row.id, 'niche', e.target.value)}
                            style={{ width: '100%', background: 'transparent', border: 'none', color: 'var(--text-muted)', fontFamily: 'monospace', outline: 'none' }}
                          />
                        </td>
                        <td style={{ padding: '0.65rem 1rem', borderRight: '1px solid var(--glass-border)', color: 'var(--text-main)' }}>
                          <span style={{ color: row.stage.includes('Launch') || row.stage.includes('Active') ? 'var(--accent-secondary)' : row.stage.includes('Integration') ? '#3b82f6' : 'hsl(38,92%,50%)', fontWeight: 700 }}>
                            {row.stage}
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
