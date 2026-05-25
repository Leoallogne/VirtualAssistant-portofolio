import React, { useState } from 'react';

const InboxZeroPage = ({ setActivePage }) => {
  const [activeFolder, setActiveFolder] = useState('inbox');
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [appliedTemplate, setAppliedTemplate] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [flashingRowId, setFlashingRowId] = useState(null);

  // Mock emails database representing task assignments with advanced professional properties
  const [emails, setEmails] = useState([
    {
      id: 1,
      sender: 'Agung Pratama (Supplier)',
      subject: 'Penawaran Harga Bahan Baku Juni 2026',
      time: '08:45 AM',
      body: 'Halo Tim Warung Nusantara, saya ingin mengirimkan pembaruan daftar harga bahan baku ayam dan daging sapi untuk bulan Juni. Ada penyesuaian harga sekitar 3% dikarenakan biaya logistik. Mohon konfirmasi kontrak barunya.',
      folder: 'inbox',
      category: 'Supplier',
      priority: 'High',
      sopRule: 'SOP-SUPPLIER-01: Tinjau kenaikan di bawah 5%, laporkan ke operasional founder, dan draf kontrak sebelum pukul 16.00 WIB.',
      replyTemplate: 'Halo Pak Agung,\n\nTerima kasih atas pembaruan harga Juni 2026. Laporan penyesuaian 3% sudah kami terima dan sedang ditinjau oleh tim operasional. Kami akan mengirimkan dokumen kontrak yang ditandatangani sore ini pukul 16:00 WIB.\n\nSalam hangat,\nAsisten Virtual Warung Nusantara'
    },
    {
      id: 2,
      sender: 'Sisca Indah (Customer)',
      subject: 'Pertanyaan Pengiriman Order #9914',
      time: '09:12 AM',
      body: 'Halo, saya memesan paket katering kemarin sore tapi nomor resi pengiriman belum aktif. Bisa tolong dicek status pengiriman pesanan saya?',
      folder: 'inbox',
      category: 'Customer',
      priority: 'High',
      sopRule: 'SOP-CUST-99: Periksa resi kurir logistik di portal partner katering, ambil kode pelacakan aktif, dan berikan estimasi tiba.',
      replyTemplate: 'Halo Ibu Sisca,\n\nTerima kasih telah menghubungi kami. Kami telah memeriksa pesanan #9914 Anda. Kurir logistik baru saja melakukan pick-up pagi ini pukul 08:30 WIB. Resi pengiriman Anda sudah aktif sekarang dan pesanan diestimasikan tiba dalam 2 jam.\n\nSalam hangat,\nLayanan Pelanggan Warung Nusantara'
    },
    {
      id: 3,
      sender: 'Budi Santoso (Partner Bisnis)',
      subject: 'Undangan Rapat Evaluasi Kemitraan Q2',
      time: '10:30 AM',
      body: 'Selamat pagi, saya ingin mengundang founder Warung Nusantara untuk rapat evaluasi kemitraan Q2 minggu depan. Tersedia hari Selasa pukul 10:00 WIB atau Kamis pukul 14:00 WIB. Mohon koordinasikan jadwalnya.',
      folder: 'inbox',
      category: 'Meeting',
      priority: 'Medium',
      sopRule: 'SOP-SCHED-04: Cocokkan slot dengan Master Kalender, buat undangan Zoom/Meet, dan daftarkan sebagai slot hold.',
      replyTemplate: 'Halo Pak Budi,\n\nTerima kasih atas undangannya. Kami telah mencocokkan jadwal Founder. Beliau tersedia untuk rapat evaluasi Q2 pada hari Selasa minggu depan pukul 10:00 WIB. Tautan Google Meet telah kami daftarkan ke kalender Anda.\n\nSalam hangat,\nAsisten Virtual Warung Nusantara'
    }
  ]);

  // Google Sheets / Excel Live Tracker data
  const [sheetData, setSheetData] = useState([
    { id: 1, timestamp: '08:47 AM', sender: 'Agung Pratama (Supplier)', category: 'Supplier', status: 'PENDING', action: 'Awaiting triaged response' },
    { id: 2, timestamp: '09:15 AM', sender: 'Sisca Indah (Customer)', category: 'Customer', status: 'PENDING', action: 'Awaiting triaged response' },
    { id: 3, timestamp: '10:32 AM', sender: 'Budi Santoso (Partner)', category: 'Meeting', status: 'PENDING', action: 'Awaiting triaged response' },
    { id: 4, timestamp: 'Yesterday', sender: 'Joni Wijaya (Customer)', category: 'Customer', status: 'RESOLVED', action: 'Delivered food voucher #8812' },
    { id: 5, timestamp: 'Yesterday', sender: 'Diana Putri (Marketing)', category: 'Marketing', status: 'RESOLVED', action: 'Sent review brief document to influencer' }
  ]);

  const handleFolderChange = (folder) => {
    setActiveFolder(folder);
    setSelectedEmail(null);
    setAppliedTemplate('');
    setIsSent(false);
  };

  const handleSelectEmail = (email) => {
    setSelectedEmail(email);
    setAppliedTemplate('');
    setIsSent(false);
  };

  const handlePriorityChange = (emailId, newPriority) => {
    setEmails(prev => prev.map(e => e.id === emailId ? { ...e, priority: newPriority } : e));
    if (selectedEmail && selectedEmail.id === emailId) {
      setSelectedEmail(prev => ({ ...prev, priority: newPriority }));
    }
  };

  const handleApplyTemplate = () => {
    if (selectedEmail) {
      setAppliedTemplate(selectedEmail.replyTemplate);
    }
  };

  const handleSendReply = () => {
    if (!selectedEmail) return;

    setIsSent(true);

    // Simulate network delay
    setTimeout(() => {
      // 1. Remove sent email from inbox
      setEmails((prev) => prev.filter((e) => e.id !== selectedEmail.id));
      
      // 2. Automatically update corresponding Google Sheets tracker row
      setSheetData(prev => prev.map(row => {
        if (row.id === selectedEmail.id) {
          return {
            ...row,
            status: 'RESOLVED',
            action: `Sent automated reply (${selectedEmail.category} SOPapplied)`
          };
        }
        return row;
      }));

      // 3. Highlight the Excel row for visual feedback
      setFlashingRowId(selectedEmail.id);
      setTimeout(() => setFlashingRowId(null), 3000);

      // 4. Reset selection states
      setSelectedEmail(null);
      setAppliedTemplate('');
      setIsSent(false);
    }, 1000);
  };

  // Interactive toggle cell status in Excel directly
  const toggleSheetStatus = (rowId) => {
    const statuses = ['PENDING', 'RESOLVED', 'ESCALATED'];
    setSheetData(prev => prev.map(row => {
      if (row.id === rowId) {
        const nextIndex = (statuses.indexOf(row.status) + 1) % statuses.length;
        return {
          ...row,
          status: statuses[nextIndex],
          action: statuses[nextIndex] === 'RESOLVED' ? 'Manually closed in spreadsheet' : row.action
        };
      }
      return row;
    }));
  };

  // Direct cell editing simulation for action text
  const handleActionCellEdit = (rowId, newText) => {
    setSheetData(prev => prev.map(row => row.id === rowId ? { ...row, action: newText } : row));
  };

  const inboxCount = emails.length;
  const resolvedCount = sheetData.filter(row => row.status === 'RESOLVED').length;
  const totalVolume = sheetData.length;

  return (
    <div style={{ minHeight: '100vh', padding: '6rem 0 4rem 0', position: 'relative' }}>
      {/* Visual meshes */}
      <div className="ambient-glows">
        <div className="glow-bubble glow-bubble-1" style={{ top: '-100px', left: '10%' }}></div>
        <div className="glow-bubble glow-bubble-2" style={{ bottom: '10%', right: '-100px' }}></div>
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
          <div style={{ textAlign: 'right' }}>
            <span className="section-tag" style={{ marginBottom: 0 }}>Interactive Sandbox</span>
          </div>
        </div>

        {/* Page Title */}
        <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
          <h2 className="section-title" style={{ marginBottom: '0.5rem' }}>
            Gmail & <span className="text-gradient">Excel Escalation</span> Simulator
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>
            Observe how I manage email ticket volume. Categorize priorities, enforce strict company SOPs, and watch live tracking update dynamically into our corporate Excel Sheet tracker below.
          </p>
        </div>

        {/* 📊 Premium KPIs Metrics Deck */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2rem'
        }}>
          <div className="glass-panel" style={{ padding: '1.25rem', border: '1px solid var(--glass-border)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700 }}>Average Response Time</span>
            <span style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--accent-secondary)' }}>12 Mins Rta</span>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>⏱ Industry Standard: 24 Hours</span>
          </div>
          <div className="glass-panel" style={{ padding: '1.25rem', border: '1px solid var(--glass-border)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700 }}>Spreadsheet Sync Status</span>
            <span style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--accent)' }}>Live Active</span>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>🔄 Bidirectional event listening</span>
          </div>
          <div className="glass-panel" style={{ padding: '1.25rem', border: '1px solid var(--glass-border)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700 }}>Resolution Performance</span>
            <span style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--accent-secondary)' }}>{((resolvedCount / totalVolume) * 100).toFixed(1)}%</span>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>✅ {resolvedCount} of {totalVolume} emails resolved</span>
          </div>
          <div className="glass-panel" style={{ padding: '1.25rem', border: '1px solid var(--glass-border)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700 }}>Outstanding Inbound</span>
            <span style={{ fontSize: '1.65rem', fontWeight: 800, color: inboxCount > 0 ? 'var(--accent)' : 'var(--accent-secondary)' }}>{inboxCount} Pending</span>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>📬 Action required for Inbox Zero</span>
          </div>
        </div>

        {/* Gmail Layout Frame */}
        <div 
          className="glass-panel"
          style={{
            display: 'grid',
            gridTemplateColumns: '220px 1fr',
            minHeight: '520px',
            borderRadius: '20px',
            overflow: 'hidden',
            border: '1px solid var(--glass-border)',
            marginBottom: '3rem'
          }}
        >
          {/* 1. Gmail Sidebar */}
          <div style={{
            background: 'rgba(0,0,0,0.15)',
            borderRight: '1px solid var(--glass-border)',
            padding: '2rem 1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}>
            <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: '1.5rem', paddingLeft: '0.5rem' }}>
              Mailboxes
            </h4>
            
            <button
              onClick={() => handleFolderChange('inbox')}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: '10px',
                border: 'none',
                background: activeFolder === 'inbox' ? 'var(--accent-glow)' : 'transparent',
                color: activeFolder === 'inbox' ? 'var(--accent-secondary)' : 'var(--text-muted)',
                fontWeight: activeFolder === 'inbox' ? 700 : 500,
                fontSize: '0.95rem',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.3s ease'
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                ✉ Inbox
              </span>
              <span style={{
                background: inboxCount > 0 ? 'var(--accent-secondary)' : 'var(--bg-tertiary)',
                color: inboxCount > 0 ? 'var(--bg-primary)' : 'var(--text-muted)',
                padding: '0.1rem 0.5rem',
                borderRadius: '10px',
                fontSize: '0.75rem',
                fontWeight: 800
              }}>
                {inboxCount}
              </span>
            </button>

            <button
              onClick={() => handleFolderChange('sent')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: '10px',
                border: 'none',
                background: activeFolder === 'sent' ? 'var(--accent-glow)' : 'transparent',
                color: activeFolder === 'sent' ? 'var(--accent-secondary)' : 'var(--text-muted)',
                fontWeight: activeFolder === 'sent' ? 700 : 500,
                fontSize: '0.95rem',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.3s ease'
              }}
            >
              ✓ Sent Tracker
            </button>

            {/* Quick Helper SOP reference card */}
            <div style={{
              marginTop: 'auto',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--glass-border)',
              borderRadius: '12px',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}>
              <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 800 }}>⚡ VA Triage SOP</span>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                Enforce rapid responses. Assign email priority instantly and log outcomes immediately in Google Sheets.
              </p>
            </div>
          </div>

          {/* 2. Mailbox Workspace Content */}
          <div style={{
            background: 'var(--glass-bg)',
            display: 'grid',
            gridTemplateColumns: selectedEmail ? '1.1fr 0.9fr' : '1fr',
            transition: 'all 0.3s ease'
          }}>
            {/* List panel */}
            <div style={{
              padding: '1.75rem',
              borderRight: selectedEmail ? '1px solid var(--glass-border)' : 'none',
              overflowY: 'auto'
            }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                {activeFolder === 'inbox' ? 'Active Incoming Mail' : 'Canned Sent Logs'}
                <span className="project-tag" style={{ fontSize: '0.7rem' }}>Live Simulation</span>
              </h3>

              {activeFolder === 'inbox' && emails.length === 0 ? (
                /* Inbox Zero State */
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '320px',
                  textAlign: 'center',
                  gap: '1rem'
                }}>
                  <span style={{ fontSize: '4.5rem', animation: 'float-slow 2s infinite alternate' }}>⚡</span>
                  <h4 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-secondary)' }}>
                    Inbox Zero Achieved!
                  </h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '320px' }}>
                    Every outstanding business inquiry has been cataloged, resolved, and documented in the master Excel sheet below.
                  </p>
                </div>
              ) : (
                /* List of Emails */
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {(activeFolder === 'inbox' ? emails : []).map((email) => (
                    <div
                      key={email.id}
                      onClick={() => handleSelectEmail(email)}
                      style={{
                        padding: '1.15rem',
                        background: selectedEmail?.id === email.id ? 'var(--bg-tertiary)' : 'var(--bg-secondary)',
                        border: '1px solid var(--glass-border)',
                        borderColor: selectedEmail?.id === email.id ? 'var(--accent)' : 'var(--glass-border)',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        if (selectedEmail?.id !== email.id) {
                          e.currentTarget.style.borderColor = 'var(--accent-secondary)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedEmail?.id !== email.id) {
                          e.currentTarget.style.borderColor = 'var(--glass-border)';
                        }
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-main)' }}>{email.sender}</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>{email.time}</span>
                      </div>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.35rem' }}>{email.subject}</h4>
                      <p style={{
                        fontSize: '0.8rem',
                        color: 'var(--text-muted)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        {email.body}
                      </p>
                      <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <span className="project-tag" style={{ fontSize: '0.6rem', padding: '0.15rem 0.5rem' }}>{email.category}</span>
                        <span style={{ 
                          fontSize: '0.65rem', 
                          fontWeight: 700, 
                          color: email.priority === 'High' ? 'var(--accent)' : 'var(--text-muted)',
                          marginLeft: 'auto'
                        }}>
                          Priority: {email.priority}
                        </span>
                      </div>
                    </div>
                  ))}
                  {activeFolder === 'sent' && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '220px', textAlign: 'center', color: 'var(--text-muted)', gap: '0.5rem' }}>
                      <p style={{ fontSize: '0.9rem' }}>All historical communications logged directly in the spreadsheet ledger.</p>
                      <span className="project-tag" style={{ fontSize: '0.65rem' }}>Automated event logging active</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Email Detail Panel */}
            {selectedEmail && (
              <div style={{
                padding: '1.75rem',
                borderLeft: '1px solid var(--glass-border)',
                background: 'rgba(0,0,0,0.08)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
                overflowY: 'auto'
              }}>
                <div>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)' }}>{selectedEmail.subject}</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                    From: <strong style={{ color: 'var(--text-main)' }}>{selectedEmail.sender}</strong> ({selectedEmail.time})
                  </p>
                </div>

                {/* Priority & Escalation Selector Grid */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', background: 'var(--bg-secondary)', padding: '0.85rem', borderRadius: '10px', border: '1px solid var(--glass-border)' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Triage Operations</span>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {['Low', 'Medium', 'High'].map(p => (
                      <button
                        key={p}
                        onClick={() => handlePriorityChange(selectedEmail.id, p)}
                        style={{
                          flex: 1,
                          padding: '0.35rem 0.5rem',
                          borderRadius: '6px',
                          border: '1px solid var(--glass-border)',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          background: selectedEmail.priority === p ? 'var(--accent-glow)' : 'var(--bg-primary)',
                          color: selectedEmail.priority === p ? 'var(--accent-secondary)' : 'var(--text-muted)',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                {/* SOP Rule Card display */}
                <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.25)', padding: '0.85rem 1rem', borderRadius: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'hsl(142, 70%, 45%)', textTransform: 'uppercase' }}>✅ Enforced SOP Directive</span>
                  </div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                    {selectedEmail.sopRule}
                  </p>
                </div>

                <div style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--glass-border)',
                  padding: '1.15rem',
                  borderRadius: '10px',
                  fontSize: '0.85rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.55
                }}>
                  {selectedEmail.body}
                </div>

                {/* Automation Actions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: 'auto' }}>
                  <button
                    onClick={handleApplyTemplate}
                    className="btn btn-secondary"
                    style={{ width: '100%', justifyContent: 'center', padding: '0.7rem 1rem', fontSize: '0.85rem' }}
                  >
                    ⚡ Apply Automated Reply SOP
                  </button>

                  {appliedTemplate && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      <textarea
                        value={appliedTemplate}
                        onChange={(e) => setAppliedTemplate(e.target.value)}
                        rows="5"
                        style={{
                          width: '100%',
                          padding: '0.85rem',
                          background: 'var(--bg-primary)',
                          border: '1px solid var(--accent)',
                          borderRadius: '8px',
                          color: 'var(--text-main)',
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.8rem',
                          lineHeight: 1.45,
                          resize: 'none'
                        }}
                      />
                      <button
                        onClick={handleSendReply}
                        className="btn btn-primary"
                        style={{ width: '100%', justifyContent: 'center', padding: '0.7rem 1rem', fontSize: '0.85rem' }}
                        disabled={isSent}
                      >
                        {isSent ? 'Syncing & Dispatching...' : 'Send Canned Response'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 💻 Google Sheets / Excel Live Spreadsheet Simulator */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                <span>📊 Google Sheets Live Ledger</span>
                <span className="project-tag" style={{ fontSize: '0.65rem', background: 'var(--accent-glow)', color: 'var(--accent-secondary)' }}>Real-time updates</span>
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                All ticket states, triage categorization, and resolution times are logged automatically in this spreadsheets. Double-click status to toggle states.
              </p>
            </div>
            
            <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-secondary)' }}></span> Resolved: {resolvedCount}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)' }}></span> Pending: {totalVolume - resolvedCount}
              </span>
            </div>
          </div>

          <div style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--glass-border)',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: 'var(--premium-shadow)'
          }}>
            {/* Google Sheets Top Menu Bar */}
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
              <span style={{ color: '#63b3ed', fontWeight: 800 }}>📂 WARUNG_NUSANTARA_INBOUND_METRICS_2026.xlsx</span>
              <span>Formula active: =COUNTIF(E2:E6, "RESOLVED")</span>
            </div>

            {/* Spreadsheet Table Scroll Container */}
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
                    <th style={{ padding: '0.65rem 1rem', borderRight: '1px solid var(--glass-border)', color: 'var(--text-main)' }}>A (Timestamp)</th>
                    <th style={{ padding: '0.65rem 1rem', borderRight: '1px solid var(--glass-border)', color: 'var(--text-main)' }}>B (Sender Identity)</th>
                    <th style={{ padding: '0.65rem 1rem', borderRight: '1px solid var(--glass-border)', color: 'var(--text-main)' }}>C (Inbound Type)</th>
                    <th style={{ padding: '0.65rem 1rem', borderRight: '1px solid var(--glass-border)', color: 'var(--text-main)' }}>D (Operations Priority)</th>
                    <th style={{ padding: '0.65rem 1rem', borderRight: '1px solid var(--glass-border)', color: 'var(--text-main)' }}>E (Ticket Status)</th>
                    <th style={{ padding: '0.65rem 1rem', color: 'var(--text-main)' }}>F (VA Resolution Action Taken)</th>
                  </tr>
                </thead>
                <tbody>
                  {sheetData.map((row, index) => {
                    const isFlashing = flashingRowId === row.id;
                    const matchedEmail = emails.find(e => e.id === row.id);
                    const currentPriority = matchedEmail ? matchedEmail.priority : 'Low';
                    
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
                        <td style={{ padding: '0.65rem 1rem', borderRight: '1px solid var(--glass-border)', color: 'var(--text-muted)' }}>
                          {row.timestamp}
                        </td>
                        <td style={{ padding: '0.65rem 1rem', borderRight: '1px solid var(--glass-border)', color: 'var(--text-main)', fontWeight: 700 }}>
                          {row.sender}
                        </td>
                        <td style={{ padding: '0.65rem 1rem', borderRight: '1px solid var(--glass-border)', color: 'var(--text-muted)' }}>
                          <span style={{
                            padding: '0.15rem 0.4rem',
                            borderRadius: '4px',
                            background: 'rgba(255,255,255,0.06)',
                            fontSize: '0.7rem'
                          }}>
                            {row.category}
                          </span>
                        </td>
                        <td style={{ padding: '0.65rem 1rem', borderRight: '1px solid var(--glass-border)', color: 'var(--text-main)', textAlign: 'center' }}>
                          <span style={{
                            color: currentPriority === 'High' ? 'var(--accent)' : currentPriority === 'Medium' ? 'var(--accent-secondary)' : '#a0aec0',
                            fontWeight: 700
                          }}>
                            {currentPriority}
                          </span>
                        </td>
                        <td 
                          onClick={() => toggleSheetStatus(row.id)}
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
                            background: row.status === 'RESOLVED' 
                              ? 'rgba(16, 185, 129, 0.15)' 
                              : row.status === 'PENDING' 
                              ? 'rgba(245, 158, 11, 0.15)' 
                              : 'rgba(239, 68, 68, 0.15)',
                            color: row.status === 'RESOLVED' 
                              ? 'hsl(142, 70%, 45%)' 
                              : row.status === 'PENDING' 
                              ? 'hsl(38, 92%, 50%)' 
                              : 'hsl(0, 84%, 60%)',
                            border: '1px solid',
                            borderColor: row.status === 'RESOLVED' 
                              ? 'rgba(16, 185, 129, 0.3)' 
                              : row.status === 'PENDING' 
                              ? 'rgba(245, 158, 11, 0.3)' 
                              : 'rgba(239, 68, 68, 0.3)',
                          }}>
                            {row.status} ⇄
                          </span>
                        </td>
                        <td style={{ padding: '0.65rem 1rem' }}>
                          <input
                            type="text"
                            value={row.action}
                            onChange={(e) => handleActionCellEdit(row.id, e.target.value)}
                            style={{
                              width: '100%',
                              background: 'transparent',
                              border: 'none',
                              color: 'var(--text-main)',
                              fontFamily: 'monospace',
                              fontSize: '0.8rem',
                              outline: 'none'
                            }}
                          />
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
        @keyframes pulse-green {
          0% { background-color: rgba(16, 185, 129, 0); }
          50% { background-color: rgba(16, 185, 129, 0.3); }
          100% { background-color: rgba(16, 185, 129, 0); }
        }
      `}</style>
    </div>
  );
};

export default InboxZeroPage;
