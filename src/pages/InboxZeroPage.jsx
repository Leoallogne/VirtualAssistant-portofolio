import React, { useState, useContext, useEffect } from 'react';
import { LanguageContext } from '../context/LanguageContext';

const InboxZeroPage = ({ setActivePage }) => {
  const { language, t } = useContext(LanguageContext);
  
  const [activeFolder, setActiveFolder] = useState('inbox');
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [appliedTemplate, setAppliedTemplate] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [flashingRowId, setFlashingRowId] = useState(null);

  // Mock emails database representing task assignments with dual language support
  const [emails, setEmails] = useState([
    {
      id: 1,
      sender: 'Agung Pratama (Supplier)',
      subject_id: 'Penawaran Harga Bahan Baku Juni 2026',
      subject_en: 'June 2026 Raw Material Price Offering',
      time: '08:45 AM',
      body_id: 'Halo Tim Warung Nusantara, saya ingin mengirimkan pembaruan daftar harga bahan baku ayam dan daging sapi untuk bulan Juni. Ada penyesuaian harga sekitar 3% dikarenakan biaya logistik. Mohon konfirmasi kontrak barunya.',
      body_en: 'Hello Warung Nusantara Team, I would like to send the updated raw materials price list for chicken and beef for the month of June. There is a price adjustment of around 3% due to logistics. Please confirm the new contract.',
      folder: 'inbox',
      category_id: 'Pemasok',
      category_en: 'Supplier',
      priority: 'High',
      sopRule_id: 'SOP-SUPPLIER-01: Tinjau kenaikan di bawah 5%, laporkan ke operasional founder, dan draf kontrak sebelum pukul 16.00 WIB.',
      sopRule_en: 'SOP-SUPPLIER-01: Review increases under 5%, report to founder operations, and draft the contract before 16:00 WIB.',
      replyTemplate_id: 'Halo Pak Agung,\n\nTerima kasih atas pembaruan harga Juni 2026. Laporan penyesuaian 3% sudah kami terima dan sedang ditinjau oleh tim operasional. Kami akan mengirimkan dokumen kontrak yang ditandatangani sore ini pukul 16:00 WIB.\n\nSalam hangat,\nAsisten Virtual Warung Nusantara',
      replyTemplate_en: 'Hello Mr. Agung,\n\nThank you for the June 2026 price update. The 3% adjustment report has been received and is being reviewed by the operations team. We will send the signed contract document this afternoon at 16:00 WIB.\n\nBest regards,\nWarung Nusantara Virtual Assistant'
    },
    {
      id: 2,
      sender: 'Sisca Indah (Customer)',
      subject_id: 'Pertanyaan Pengiriman Order #9914',
      subject_en: 'Inquiry on Order Shipping #9914',
      time: '09:12 AM',
      body_id: 'Halo, saya memesan paket katering kemarin sore tapi nomor resi pengiriman belum aktif. Bisa tolong dicek status pengiriman pesanan saya?',
      body_en: 'Hello, I ordered a catering package yesterday afternoon but the shipping tracking number is not active yet. Could you please check the shipping status of my order?',
      folder: 'inbox',
      category_id: 'Pelanggan',
      category_en: 'Customer',
      priority: 'High',
      sopRule_id: 'SOP-CUST-99: Periksa resi kurir logistik di portal partner katering, ambil kode pelacakan aktif, dan berikan estimasi tiba.',
      sopRule_en: 'SOP-CUST-99: Check the courier tracking in the catering partner portal, retrieve the active tracking code, and provide an arrival ETA.',
      replyTemplate_id: 'Halo Ibu Sisca,\n\nTerima kasih telah menghubungi kami. Kami telah memeriksa pesanan #9914 Anda. Kurir logistik baru saja melakukan pick-up pagi ini pukul 08:30 WIB. Resi pengiriman Anda sudah aktif sekarang dan pesanan diestimasikan tiba dalam 2 jam.\n\nSalam hangat,\nLayanan Pelanggan Warung Nusantara',
      replyTemplate_en: 'Hello Mrs. Sisca,\n\nThank you for reaching out. We have checked your order #9914. The logistics courier just picked up the package this morning at 08:30 WIB. Your shipping receipt is now active and the order is estimated to arrive within 2 hours.\n\nBest regards,\nWarung Nusantara Customer Service'
    },
    {
      id: 3,
      sender: 'Budi Santoso (Partner Bisnis)',
      subject_id: 'Undangan Rapat Evaluasi Kemitraan Q2',
      subject_en: 'Q2 Partnership Evaluation Meeting Invite',
      time: '10:30 AM',
      body_id: 'Selamat pagi, saya ingin mengundang founder Warung Nusantara untuk rapat evaluasi kemitraan Q2 minggu depan. Tersedia hari Selasa pukul 10:00 WIB atau Kamis pukul 14:00 WIB. Mohon koordinasikan jadwalnya.',
      body_en: 'Good morning, I would like to invite the founder of Warung Nusantara for a Q2 partnership evaluation meeting next week. Available on Tuesday at 10:00 WIB or Thursday at 14:00 WIB. Please coordinate the schedule.',
      folder: 'inbox',
      category_id: 'Rapat',
      category_en: 'Meeting',
      priority: 'Medium',
      sopRule_id: 'SOP-SCHED-04: Cocokkan slot dengan Master Kalender, buat undangan Zoom/Meet, dan daftarkan sebagai slot hold.',
      sopRule_en: 'SOP-SCHED-04: Match slot with Master Calendar, create Zoom/Meet invites, and register as slot hold.',
      replyTemplate_id: 'Halo Pak Budi,\n\nTerima kasih atas undangannya. Kami telah mencocokkan jadwal Founder. Beliau tersedia untuk rapat evaluasi Q2 pada hari Selasa minggu depan pukul 10:00 WIB. Tautan Google Meet telah kami daftarkan ke kalender Anda.\n\nSalam hangat,\nAsisten Virtual Warung Nusantara',
      replyTemplate_en: 'Hello Mr. Budi,\n\nThank you for the invitation. We have aligned the Founder\'s schedule. He is available for the Q2 evaluation meeting next Tuesday at 10:00 WIB. The Google Meet link has been added to your calendar.\n\nBest regards,\nWarung Nusantara Virtual Assistant'
    }
  ]);

  // Google Sheets / Excel Live Tracker data with bilingual values
  const [sheetData, setSheetData] = useState([
    { 
      id: 1, 
      timestamp: '08:47 AM', 
      sender: 'Agung Pratama (Supplier)', 
      category_id: 'Pemasok',
      category_en: 'Supplier',
      status: 'PENDING', 
      action_id: 'Menunggu tanggapan triase',
      action_en: 'Awaiting triaged response'
    },
    { 
      id: 2, 
      timestamp: '09:15 AM', 
      sender: 'Sisca Indah (Customer)', 
      category_id: 'Pelanggan',
      category_en: 'Customer',
      status: 'PENDING', 
      action_id: 'Menunggu tanggapan triase',
      action_en: 'Awaiting triaged response'
    },
    { 
      id: 3, 
      timestamp: '10:32 AM', 
      sender: 'Budi Santoso (Partner)', 
      category_id: 'Rapat',
      category_en: 'Meeting',
      status: 'PENDING', 
      action_id: 'Menunggu tanggapan triase',
      action_en: 'Awaiting triaged response'
    },
    { 
      id: 4, 
      timestamp: 'Yesterday', 
      sender: 'Joni Wijaya (Customer)', 
      category_id: 'Pelanggan',
      category_en: 'Customer',
      status: 'RESOLVED', 
      action_id: 'Mengirimkan voucher makanan #8812',
      action_en: 'Delivered food voucher #8812'
    },
    { 
      id: 5, 
      timestamp: 'Yesterday', 
      sender: 'Diana Putri (Marketing)', 
      category_id: 'Pemasaran',
      category_en: 'Marketing',
      status: 'RESOLVED', 
      action_id: 'Mengirimkan dokumen ringkasan untuk influencer',
      action_en: 'Sent review brief document to influencer'
    }
  ]);

  // Sync selected email object with changes in array
  useEffect(() => {
    if (selectedEmail) {
      const updated = emails.find(e => e.id === selectedEmail.id);
      if (updated) setSelectedEmail(updated);
    }
  }, [emails]);

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
  };

  const handleApplyTemplate = () => {
    if (selectedEmail) {
      setAppliedTemplate(language === 'id' ? selectedEmail.replyTemplate_id : selectedEmail.replyTemplate_en);
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
          const category = language === 'id' ? selectedEmail.category_id : selectedEmail.category_en;
          return {
            ...row,
            status: 'RESOLVED',
            action_id: `Mengirim balasan otomatis (SOP ${category} diterapkan)`,
            action_en: `Sent automated reply (${category} SOP applied)`
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

  const toggleSheetStatus = (rowId) => {
    const statuses = ['PENDING', 'RESOLVED', 'ESCALATED'];
    setSheetData(prev => prev.map(row => {
      if (row.id === rowId) {
        const nextIndex = (statuses.indexOf(row.status) + 1) % statuses.length;
        const nextStatus = statuses[nextIndex];
        return {
          ...row,
          status: nextStatus,
          action_id: nextStatus === 'RESOLVED' ? 'Diselesaikan secara manual di spreadsheet' : row.action_id,
          action_en: nextStatus === 'RESOLVED' ? 'Manually closed in spreadsheet' : row.action_en
        };
      }
      return row;
    }));
  };

  const handleActionCellEdit = (rowId, newText) => {
    setSheetData(prev => prev.map(row => {
      if (row.id === rowId) {
        return language === 'id' 
          ? { ...row, action_id: newText }
          : { ...row, action_en: newText };
      }
      return row;
    }));
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
            {t.expBack}
          </button>
          <div style={{ textAlign: 'right' }}>
            <span className="section-tag" style={{ marginBottom: 0 }}>{t.expTag}</span>
          </div>
        </div>

        {/* Page Title */}
        <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
          <h2 className="section-title" style={{ marginBottom: '0.5rem' }}>
            {language === 'id' ? <>Simulator Inbox Zero & <span className="text-gradient">Escalation Excel</span></> : <>Inbox Zero & <span className="text-gradient">Excel Escalation</span> Simulator</>}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>
            {t.inboxSub}
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
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700 }}>{t.inboxKPIResponseTime}</span>
            <span style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--accent-secondary)' }}>{t.inboxKPIResponseVal}</span>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{t.inboxKPIResponseSub}</span>
          </div>
          <div className="glass-panel" style={{ padding: '1.25rem', border: '1px solid var(--glass-border)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700 }}>{t.inboxKPISyncStatus}</span>
            <span style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--accent)' }}>{t.inboxKPISyncVal}</span>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{t.inboxKPISyncSub}</span>
          </div>
          <div className="glass-panel" style={{ padding: '1.25rem', border: '1px solid var(--glass-border)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700 }}>{t.inboxKPIResolution}</span>
            <span style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--accent-secondary)' }}>{((resolvedCount / totalVolume) * 100).toFixed(1)}%</span>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>✅ {resolvedCount} {language === 'id' ? 'dari' : 'of'} {totalVolume} {t.inboxKPIResolutionSub}</span>
          </div>
          <div className="glass-panel" style={{ padding: '1.25rem', border: '1px solid var(--glass-border)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700 }}>{t.inboxKPIOutstanding}</span>
            <span style={{ fontSize: '1.65rem', fontWeight: 800, color: inboxCount > 0 ? 'var(--accent)' : 'var(--accent-secondary)' }}>{inboxCount} {language === 'id' ? 'Tertunda' : 'Pending'}</span>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{t.inboxKPIOutstandingSub}</span>
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
            background: 'rgba(0,0,0,0.06)',
            borderRight: '1px solid var(--glass-border)',
            padding: '2rem 1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}>
            <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: '1.5rem', paddingLeft: '0.5rem' }}>
              {t.inboxSidebarTitle}
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
                {t.inboxInbox}
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
              {t.inboxSent}
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
              <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 800 }}>{t.inboxSidebarSopTitle}</span>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                {t.inboxSidebarSopDesc}
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
                {activeFolder === 'inbox' ? t.inboxActiveMail : t.inboxSentLogs}
                <span className="project-tag" style={{ fontSize: '0.7rem' }}>{t.expLiveSandbox}</span>
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
                    {t.inboxZeroHeader}
                  </h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '320px' }}>
                    {t.inboxZeroDesc}
                  </p>
                </div>
              ) : (
                /* List of Emails */
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {(activeFolder === 'inbox' ? emails : []).map((email) => {
                    const subject = language === 'id' ? email.subject_id : email.subject_en;
                    const body = language === 'id' ? email.body_id : email.body_en;
                    const category = language === 'id' ? email.category_id : email.category_en;
                    
                    return (
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
                        <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.35rem' }}>{subject}</h4>
                        <p style={{
                          fontSize: '0.8rem',
                          color: 'var(--text-muted)',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}>
                          {body}
                        </p>
                        <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                          <span className="project-tag" style={{ fontSize: '0.6rem', padding: '0.15rem 0.5rem' }}>{category}</span>
                          <span style={{ 
                            fontSize: '0.65rem', 
                            fontWeight: 700, 
                            color: email.priority === 'High' ? 'var(--accent)' : 'var(--text-muted)',
                            marginLeft: 'auto'
                          }}>
                            {language === 'id' ? 'Prioritas' : 'Priority'}: {email.priority}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                  {activeFolder === 'sent' && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '220px', textAlign: 'center', color: 'var(--text-muted)', gap: '0.5rem' }}>
                      <p style={{ fontSize: '0.9rem' }}>{language === 'id' ? 'Semua komunikasi tercatat langsung di spreadsheet Excel bawah.' : 'All communications logged directly in the spreadsheet below.'}</p>
                      <span className="project-tag" style={{ fontSize: '0.65rem' }}>{t.expExcelSync}</span>
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
                background: 'rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
                overflowY: 'auto'
              }}>
                <div>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)' }}>{language === 'id' ? selectedEmail.subject_id : selectedEmail.subject_en}</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                    {language === 'id' ? 'Dari' : 'From'}: <strong style={{ color: 'var(--text-main)' }}>{selectedEmail.sender}</strong> ({selectedEmail.time})
                  </p>
                </div>

                {/* Priority & Escalation Selector Grid */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', background: 'var(--bg-secondary)', padding: '0.85rem', borderRadius: '10px', border: '1px solid var(--glass-border)' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>{t.inboxTriageOps}</span>
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
                    <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'hsl(142, 70%, 45%)', textTransform: 'uppercase' }}>{t.inboxSopDirective}</span>
                  </div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
                    {language === 'id' ? selectedEmail.sopRule_id : selectedEmail.sopRule_en}
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
                  {language === 'id' ? selectedEmail.body_id : selectedEmail.body_en}
                </div>

                {/* Automation Actions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: 'auto' }}>
                  <button
                    onClick={handleApplyTemplate}
                    className="btn btn-secondary"
                    style={{ width: '100%', justifyContent: 'center', padding: '0.7rem 1rem', fontSize: '0.85rem' }}
                  >
                    {t.inboxApplySop}
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
                        {isSent ? t.inboxSending : t.inboxSendCanned}
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
                <span>{t.inboxSheetTitle}</span>
                <span className="project-tag" style={{ fontSize: '0.65rem', background: 'var(--accent-glow)', color: 'var(--accent-secondary)' }}>{t.expExcelSync}</span>
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                {t.inboxSheetDesc}
              </p>
            </div>
            
            <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-secondary)' }}></span> {language === 'id' ? 'Teratasi' : 'Resolved'}: {resolvedCount}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)' }}></span> {language === 'id' ? 'Tertunda' : 'Pending'}: {totalVolume - resolvedCount}
              </span>
            </div>
          </div>

          <div style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--glass-border)',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-md)'
          }}>
            {/* Google Sheets Top Menu Bar - Responsive Theme Aware */}
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
              <span style={{ color: 'var(--accent-secondary)', fontWeight: 800 }}>📂 WARUNG_NUSANTARA_INBOUND_METRICS_2026.xlsx</span>
              <span>{t.inboxFormula}</span>
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
                  <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--glass-border)' }}>
                    <th style={{ padding: '0.5rem', width: '40px', background: 'var(--bg-tertiary)', borderRight: '1px solid var(--glass-border)', textAlign: 'center' }}></th>
                    <th style={{ padding: '0.65rem 1rem', borderRight: '1px solid var(--glass-border)', color: 'var(--text-main)' }}>A (Timestamp)</th>
                    <th style={{ padding: '0.65rem 1rem', borderRight: '1px solid var(--glass-border)', color: 'var(--text-main)' }}>B ({language === 'id' ? 'Identitas Pengirim' : 'Sender Identity'})</th>
                    <th style={{ padding: '0.65rem 1rem', borderRight: '1px solid var(--glass-border)', color: 'var(--text-main)' }}>C ({language === 'id' ? 'Tipe Pesan' : 'Inbound Type'})</th>
                    <th style={{ padding: '0.65rem 1rem', borderRight: '1px solid var(--glass-border)', color: 'var(--text-main)' }}>D ({language === 'id' ? 'Prioritas Operasional' : 'Operations Priority'})</th>
                    <th style={{ padding: '0.65rem 1rem', borderRight: '1px solid var(--glass-border)', color: 'var(--text-main)' }}>E ({language === 'id' ? 'Status Tiket' : 'Ticket Status'})</th>
                    <th style={{ padding: '0.65rem 1rem', color: 'var(--text-main)' }}>F ({language === 'id' ? 'Tindakan Resolusi VA' : 'VA Resolution Action Taken'})</th>
                  </tr>
                </thead>
                <tbody>
                  {sheetData.map((row, index) => {
                    const isFlashing = flashingRowId === row.id;
                    const matchedEmail = emails.find(e => e.id === row.id);
                    const currentPriority = matchedEmail ? matchedEmail.priority : 'Low';
                    
                    const category = language === 'id' ? row.category_id : row.category_en;
                    const action = language === 'id' ? row.action_id : row.action_en;

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
                            background: 'var(--bg-tertiary)',
                            fontSize: '0.7rem'
                          }}>
                            {category}
                          </span>
                        </td>
                        <td style={{ padding: '0.65rem 1rem', borderRight: '1px solid var(--glass-border)', color: 'var(--text-main)', textAlign: 'center' }}>
                          <span style={{
                            color: currentPriority === 'High' ? 'var(--accent)' : currentPriority === 'Medium' ? 'var(--accent-secondary)' : 'var(--text-muted)',
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
                            value={action}
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
