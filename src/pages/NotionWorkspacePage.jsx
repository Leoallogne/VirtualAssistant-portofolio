import React, { useState } from 'react';

const NotionWorkspacePage = ({ setActivePage }) => {
  const [openSop, setOpenSop] = useState(null);
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Setup brand Gmail filters and label structures', completed: true },
    { id: 2, text: 'Integrate Calendly cross-timezone booking slots', completed: true },
    { id: 3, text: 'Design 30 culinary Instagram visual Canva frames', completed: false },
    { id: 4, text: 'Draft daily customer service ticketing SOP documents', completed: false },
    { id: 5, text: 'Generate Loom onboarding tutorials for new team hires', completed: false }
  ]);

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleSopToggle = (sopId) => {
    setOpenSop(openSop === sopId ? null : sopId);
  };

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
      desc: 'Protokol koordinasi agenda lintas zona waktu untuk Founder.',
      steps: [
        'Pastikan Google Calendar founder terintegrasi dengan Calendly dengan ambang reminder otomatis 24 jam.',
        'Ketika klien baru melakukan booking, cocokkan zona waktu pengirim dengan zona waktu founder.',
        'Kirimkan reminder via Slack & email otomatis kepada founder 2 jam sebelum pertemuan dimulai.',
        'Lakukan audit jadwal setiap Sabtu sore untuk menghindari tabrakan agenda (double-booking).'
      ]
    },
    {
      id: 'MKT-03',
      title: 'MKT-03: MSME Social Media Marketing SOP',
      desc: 'Protokol penyusunan konten dan jadwal posting Instagram.',
      steps: [
        'Desain visual menggunakan template Canva kustom Warung Nusantara di bawah koordinasi brand guide.',
        'Tulis caption persuasif menggunakan formula AIDA (Attention, Interest, Desire, Action).',
        'Sertakan 15-20 hashtag tertarget berdasarkan tren kuliner mingguan.',
        'Atur jadwal rilis postingan via Buffer setiap hari Selasa & Jumat pukul 12:00 WIB.'
      ]
    }
  ];

  return (
    <div style={{ minHeight: '100vh', padding: '6rem 0 4rem 0', position: 'relative' }}>
      {/* Visual background glows */}
      <div className="ambient-glows">
        <div className="glow-bubble glow-bubble-1" style={{ top: '-80px', right: '15%' }}></div>
        <div className="glow-bubble glow-bubble-2" style={{ bottom: '10%', left: '-150px' }}></div>
      </div>

      <div className="container" style={{ maxWidth: '1050px' }}>
        {/* Back navigation header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
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
        <div style={{ marginBottom: '3.5rem', textAlign: 'center' }}>
          <h2 className="section-title" style={{ marginBottom: '0.5rem' }}>
            Notion Business <span className="text-gradient">SOP & Tasks</span> Sandbox
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>
            Interact with my customized Notion Operations Board. Click task check-boxes to complete checklists, and toggle operational Standard Operating Procedures.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2.5rem',
          alignItems: 'start'
        }}>
          {/* Notion SOP panel */}
          <div 
            className="glass-panel" 
            style={{ 
              padding: '2.5rem', 
              border: '1px solid var(--glass-border)',
              background: 'var(--bg-secondary)'
            }}
          >
            <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>🚀 Business Operations SOPs</span>
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
              Standard Operating Procedures built to organize online businesses from scratch. Click to expand and read details:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {sops.map((sop) => {
                const isOpen = openSop === sop.id;

                return (
                  <div
                    key={sop.id}
                    style={{
                      border: '1px solid var(--glass-border)',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {/* Accordion Trigger Header */}
                    <div
                      onClick={() => handleSopToggle(sop.id)}
                      style={{
                        padding: '1.2rem',
                        background: isOpen ? 'var(--accent-glow)' : 'rgba(255,255,255,0.02)',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontWeight: 700,
                        color: isOpen ? 'var(--accent-secondary)' : 'var(--text-main)',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        if (!isOpen) e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                      }}
                      onMouseLeave={(e) => {
                        if (!isOpen) e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                      }}
                    >
                      <span style={{ fontSize: '0.95rem' }}>{sop.title}</span>
                      <span style={{ fontSize: '0.8rem' }}>{isOpen ? '▲' : '▼'}</span>
                    </div>

                    {/* Accordion Content Steps */}
                    {isOpen && (
                      <div style={{
                        padding: '1.5rem',
                        background: 'rgba(0,0,0,0.12)',
                        borderTop: '1px solid var(--glass-border)',
                        animation: 'fade-in 0.3s ease'
                      }}>
                        <p style={{ fontSize: '0.85rem', fontStyle: 'italic', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                          Objective: {sop.desc}
                        </p>
                        <ol style={{
                          paddingLeft: '1.25rem',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.75rem',
                          fontSize: '0.9rem',
                          color: 'var(--text-muted)'
                        }}>
                          {sop.steps.map((step, idx) => (
                            <li key={idx} style={{ lineHeight: 1.5 }}>{step}</li>
                          ))}
                        </ol>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive Checklist board */}
          <div className="glass-panel" style={{ padding: '2.5rem', border: '1px solid var(--glass-border)', background: 'var(--bg-secondary)' }}>
            <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>☑ Interactive Operations Checklist</span>
            </h3>
            
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
              Checklist of operational tasks built for a newly founded service business. Toggle checkboxes to mark tasks as completed:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1rem 1.25rem',
                    background: 'var(--bg-primary)',
                    border: '1px solid var(--glass-border)',
                    borderColor: task.completed ? 'var(--accent)' : 'var(--glass-border)',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent-secondary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = task.completed ? 'var(--accent)' : 'var(--glass-border)';
                  }}
                >
                  {/* Notion Checkbox Box */}
                  <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '4px',
                    border: '2px solid var(--text-muted)',
                    borderColor: task.completed ? 'var(--accent-secondary)' : 'var(--text-muted)',
                    background: task.completed ? 'var(--accent-secondary)' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--bg-primary)',
                    fontSize: '0.8rem',
                    fontWeight: 900,
                    transition: 'all 0.3s ease',
                    flexShrink: 0
                  }}>
                    {task.completed && '✓'}
                  </div>

                  {/* Task Text */}
                  <span style={{
                    fontSize: '0.95rem',
                    color: task.completed ? 'var(--text-muted)' : 'var(--text-main)',
                    textDecoration: task.completed ? 'line-through' : 'none',
                    fontWeight: 500,
                    lineHeight: 1.4,
                    transition: 'all 0.3s ease'
                  }}>
                    {task.text}
                  </span>
                </div>
              ))}
            </div>
            
            {/* Completion rate bar */}
            <div style={{ marginTop: '2.5rem', borderTop: '1px solid var(--glass-border)', paddingTop: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                <span>Operations Progress</span>
                <span style={{ color: 'var(--accent-secondary)' }}>
                  {Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100)}%
                </span>
              </div>
              <div style={{ width: '100%', height: '6px', background: 'var(--bg-primary)', borderRadius: '10px', overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  background: 'var(--gradient-primary)',
                  width: `${(tasks.filter(t => t.completed).length / tasks.length) * 100}%`,
                  transition: 'width 0.4s ease'
                }} />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default NotionWorkspacePage;
