import React, { useState } from 'react';

const InboxZeroPage = ({ setActivePage }) => {
  const [activeFolder, setActiveFolder] = useState('inbox');
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [appliedTemplate, setAppliedTemplate] = useState('');
  const [isSent, setIsSent] = useState(false);

  // Mock emails database representing task assignments
  const [emails, setEmails] = useState([
    {
      id: 1,
      sender: 'Agung Pratama (Supplier Kuliner)',
      subject: 'Penawaran Harga Bahan Baku Juni 2026',
      time: '08:45 AM',
      body: 'Halo Tim Warung Nusantara, saya ingin mengirimkan pembaruan daftar harga bahan baku ayam dan daging sapi untuk bulan Juni. Ada penyesuaian harga sekitar 3% dikarenakan biaya logistik. Mohon konfirmasi kontrak barunya.',
      folder: 'inbox',
      category: 'Supplier',
      replyTemplate: 'Halo Pak Agung,\n\nTerima kasih atas pembaruan harga Juni 2026. Laporan penyesuaian 3% sudah kami terima dan sedang ditinjau oleh tim operasional. Kami akan mengirimkan dokumen kontrak yang ditandatangani sore ini pukul 16:00 WIB.\n\nSalam hangat,\nAsisten Virtual Warung Nusantara'
    },
    {
      id: 2,
      sender: 'Sisca Indah (Pelanggan Toko)',
      subject: 'Pertanyaan Pengiriman Order #9914',
      time: '09:12 AM',
      body: 'Halo, saya memesan paket katering kemarin sore tapi nomor resi pengiriman belum aktif. Bisa tolong dicek status pengiriman pesanan saya?',
      folder: 'inbox',
      category: 'Customer',
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
      replyTemplate: 'Halo Pak Budi,\n\nTerima kasih atas undangannya. Kami telah mencocokkan jadwal Founder. Beliau tersedia untuk rapat evaluasi Q2 pada hari Selasa minggu depan pukul 10:00 WIB. Tautan Google Meet telah kami daftarkan ke kalender Anda.\n\nSalam hangat,\nAsisten Virtual Warung Nusantara'
    }
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
      // Remove sent email from inbox
      setEmails((prev) => prev.filter((e) => e.id !== selectedEmail.id));
      setSelectedEmail(null);
      setAppliedTemplate('');
      setIsSent(false);
    }, 1000);
  };

  const inboxCount = emails.filter((e) => e.folder === 'inbox').length;

  return (
    <div style={{ minHeight: '100vh', padding: '6rem 0 4rem 0', position: 'relative' }}>
      {/* Visual meshes */}
      <div className="ambient-glows">
        <div className="glow-bubble glow-bubble-1" style={{ top: '-100px', left: '10%' }}></div>
        <div className="glow-bubble glow-bubble-2" style={{ bottom: '10%', right: '-100px' }}></div>
      </div>

      <div className="container" style={{ maxWidth: '1100px' }}>
        {/* Back navigation header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
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
        <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <h2 className="section-title" style={{ marginBottom: '0.5rem' }}>
            Gmail <span className="text-gradient">Inbox Zero</span> Simulator
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>
            Observe how I manage client email volume. Filter incoming emails, apply automated canned templates, and send replies to achieve Inbox Zero.
          </p>
        </div>

        {/* Gmail Layout Frame */}
        <div 
          className="glass-panel"
          style={{
            display: 'grid',
            gridTemplateColumns: '240px 1fr',
            minHeight: '520px',
            borderRadius: '24px',
            overflow: 'hidden',
            border: '1px solid var(--glass-border)'
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
              ✓ Resolved / Sent
            </button>

            {/* Quick Stats Panel */}
            <div style={{
              marginTop: 'auto',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--glass-border)',
              borderRadius: '14px',
              padding: '1.25rem 1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.85rem'
            }}>
              <div>
                <h5 style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Response Time</h5>
                <p style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--accent-secondary)' }}>3 Hours Rta</p>
              </div>
              <div>
                <h5 style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Daily Volume</h5>
                <p style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--accent-secondary)' }}>80+ Sorted</p>
              </div>
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
              padding: '2rem',
              borderRight: selectedEmail ? '1px solid var(--glass-border)' : 'none',
              overflowY: 'auto'
            }}>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                {activeFolder === 'inbox' ? 'Active Incoming Mail' : 'Sent Transmissions'}
                <span className="project-tag" style={{ fontSize: '0.7rem' }}>Live Sandbox</span>
              </h3>

              {activeFolder === 'inbox' && emails.length === 0 ? (
                /* Inbox Zero State */
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '300px',
                  textAlign: 'center',
                  gap: '1rem'
                }}>
                  <span style={{ fontSize: '4.5rem', animation: 'float-slow 2s infinite alternate' }}>⚡</span>
                  <h4 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-secondary)' }}>
                    Inbox Zero Achieved!
                  </h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '350px' }}>
                    Outstanding work! Every customer query has been resolved, meetings registered, and supplier contracts confirmed.
                  </p>
                </div>
              ) : (
                /* List of Emails */
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {(activeFolder === 'inbox' ? emails : []).map((email) => (
                    <div
                      key={email.id}
                      onClick={() => handleSelectEmail(email)}
                      style={{
                        padding: '1.25rem',
                        background: selectedEmail?.id === email.id ? 'var(--bg-tertiary)' : 'var(--bg-secondary)',
                        border: '1px solid var(--glass-border)',
                        borderColor: selectedEmail?.id === email.id ? 'var(--accent)' : 'var(--glass-border)',
                        borderRadius: '14px',
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
                        <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)' }}>{email.sender}</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>{email.time}</span>
                      </div>
                      <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.35rem' }}>{email.subject}</h4>
                      <p style={{
                        fontSize: '0.85rem',
                        color: 'var(--text-muted)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        {email.body}
                      </p>
                      <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem' }}>
                        <span className="project-tag" style={{ fontSize: '0.65rem', padding: '0.15rem 0.5rem' }}>{email.category}</span>
                      </div>
                    </div>
                  ))}
                  {activeFolder === 'sent' && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '200px', textAlign: 'center', color: 'var(--text-muted)' }}>
                      <p>Simulation sent items cleared upon new mailbox loops.</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Email Detail Panel */}
            {selectedEmail && (
              <div style={{
                padding: '2rem',
                borderLeft: '1px solid var(--glass-border)',
                background: 'rgba(0,0,0,0.08)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                overflowY: 'auto'
              }}>
                <div>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>{selectedEmail.subject}</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                    From: <strong style={{ color: 'var(--text-main)' }}>{selectedEmail.sender}</strong> ({selectedEmail.time})
                  </p>
                </div>

                <div style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--glass-border)',
                  padding: '1.25rem',
                  borderRadius: '12px',
                  fontSize: '0.9rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.6
                }}>
                  {selectedEmail.body}
                </div>

                {/* Automation Actions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: 'auto' }}>
                  <button
                    onClick={handleApplyTemplate}
                    className="btn btn-secondary"
                    style={{ width: '100%', justifyContent: 'center', padding: '0.75rem 1rem', fontSize: '0.9rem' }}
                  >
                    ⚡ Apply Automated Reply SOP
                  </button>

                  {appliedTemplate && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      <textarea
                        value={appliedTemplate}
                        onChange={(e) => setAppliedTemplate(e.target.value)}
                        rows="6"
                        style={{
                          width: '100%',
                          padding: '1rem',
                          background: 'var(--bg-primary)',
                          border: '1px solid var(--accent)',
                          borderRadius: '10px',
                          color: 'var(--text-main)',
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.85rem',
                          lineHeight: 1.5,
                          resize: 'none'
                        }}
                      />
                      <button
                        onClick={handleSendReply}
                        className="btn btn-primary"
                        style={{ width: '100%', justifyContent: 'center', padding: '0.75rem 1rem', fontSize: '0.9rem' }}
                        disabled={isSent}
                      >
                        {isSent ? 'Transmitting Reply...' : 'Send Canned Response'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InboxZeroPage;
