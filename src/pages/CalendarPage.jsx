import React, { useState, useContext, useEffect } from 'react';
import { LanguageContext } from '../context/LanguageContext';

const CalendarPage = ({ setActivePage }) => {
  const { language, t } = useContext(LanguageContext);

  const [selectedTimezone, setSelectedTimezone] = useState('GMT+7');
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookingForm, setBookingForm] = useState({ name: '', email: '', subject: '', platform: 'Zoom', notes: '' });
  const [isBooked, setIsBooked] = useState(false);
  const [showConflictNotice, setShowConflictNotice] = useState(false);
  const [flashingRowId, setFlashingRowId] = useState(null);

  // Available slots base (WIB / GMT+7) with bilingual support
  const baseSlots = [
    { id: 'slot-1', wib: '09:00 AM', est: '10:00 PM (-1d)', bst: '03:00 AM', isConflict: false },
    { id: 'slot-2', wib: '10:30 AM', est: '11:30 PM (-1d)', bst: '04:30 AM', isConflict: false },
    { 
      id: 'slot-3', 
      wib: '02:00 PM', 
      est: '03:00 AM', 
      bst: '08:00 AM', 
      isConflict: true, 
      conflictReason_id: 'Founder dijadwalkan menjadi pembicara utama di Webinar Nasional Kuliner UMKM.',
      conflictReason_en: 'Founder is presenting at MSME Culinary National Webinar.' 
    },
    { id: 'slot-4', wib: '04:30 PM', est: '05:30 AM', bst: '10:30 AM', isConflict: false }
  ];

  // Active bookings list with bilingual properties
  const [bookedMeetings, setBookedMeetings] = useState([
    { 
      id: 1, 
      name: 'Robert Chen', 
      subject_id: 'Diskusi Kemitraan Strategis', 
      subject_en: 'Strategic Partner Discussion', 
      time: '11:00 AM', 
      tz_id: 'EST (New York)', 
      tz_en: 'EST (New York)', 
      link: 'https://zoom.us/j/88921104', 
      status: 'CONFIRMED' 
    },
    { 
      id: 2, 
      name: 'Siti Aminah', 
      subject_id: 'Persiapan Marketing UMKM', 
      subject_en: 'UMKM Marketing Setup', 
      time: '02:30 PM', 
      tz_id: 'WIB (Jakarta)', 
      tz_en: 'WIB (Jakarta)', 
      link: 'https://zoom.us/j/99148810', 
      status: 'CONFIRMED' 
    }
  ]);

  // Master Spreadsheet Log data with bilingual fields
  const [sheetData, setSheetData] = useState([
    { 
      id: 1, 
      client: 'Robert Chen', 
      time: '11:00 AM', 
      tz_id: 'EST (New York)', 
      tz_en: 'EST (New York)', 
      subject_id: 'Diskusi Kemitraan Strategis', 
      subject_en: 'Strategic Partner Discussion', 
      link: 'https://zoom.us/j/88921104', 
      status: 'CONFIRMED' 
    },
    { 
      id: 2, 
      client: 'Siti Aminah', 
      time: '02:30 PM', 
      tz_id: 'WIB (Jakarta)', 
      tz_en: 'WIB (Jakarta)', 
      subject_id: 'Persiapan Marketing UMKM', 
      subject_en: 'UMKM Marketing Setup', 
      link: 'https://zoom.us/j/99148810', 
      status: 'CONFIRMED' 
    }
  ]);

  const handleTimezoneChange = (tz) => {
    setSelectedTimezone(tz);
    setSelectedSlot(null);
    setShowConflictNotice(false);
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    setIsBooked(false);
    if (slot.isConflict) {
      setShowConflictNotice(true);
    } else {
      setShowConflictNotice(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBookMeeting = (e) => {
    e.preventDefault();
    if (!bookingForm.name || !bookingForm.email || !selectedSlot) return;

    // Get selected slot text based on timezone
    const slotTime = selectedTimezone === 'GMT+7' 
      ? selectedSlot.wib 
      : selectedTimezone === 'GMT-5' 
      ? selectedSlot.est 
      : selectedSlot.bst;

    const tzLabel = selectedTimezone === 'GMT+7' 
      ? 'WIB (Jakarta)' 
      : selectedTimezone === 'GMT-5' 
      ? 'EST (New York)' 
      : 'BST (London)';

    const meetingId = Date.now();
    const generatedLink = `https://${bookingForm.platform.toLowerCase()}.us/j/${Math.floor(10000000 + Math.random() * 90000000)}`;

    const newMeeting = {
      id: meetingId,
      name: bookingForm.name,
      subject_id: bookingForm.subject || 'Konsultasi Perkenalan',
      subject_en: bookingForm.subject || 'Discovery Consultation',
      time: slotTime,
      tz_id: tzLabel,
      tz_en: tzLabel,
      link: generatedLink,
      status: selectedSlot.isConflict ? 'TENTATIVE HOLD' : 'CONFIRMED'
    };

    setIsBooked(true);

    // Simulate scheduling delay
    setTimeout(() => {
      // 1. Add to active dashboard
      setBookedMeetings((prev) => [newMeeting, ...prev]);

      // 2. Automatically log in Excel Spreadsheet tracker
      const newSheetRow = {
        id: meetingId,
        client: bookingForm.name,
        time: slotTime,
        tz_id: tzLabel,
        tz_en: tzLabel,
        subject_id: bookingForm.subject || 'Konsultasi Perkenalan',
        subject_en: bookingForm.subject || 'Discovery Consultation',
        link: generatedLink,
        status: selectedSlot.isConflict ? 'TENTATIVE' : 'CONFIRMED'
      };
      setSheetData(prev => [newSheetRow, ...prev]);

      // 3. Trigger spreadsheet row flashing
      setFlashingRowId(meetingId);
      setTimeout(() => setFlashingRowId(null), 3000);

      // 4. Clear fields
      setBookingForm({ name: '', email: '', subject: '', platform: 'Zoom', notes: '' });
      setSelectedSlot(null);
      setIsBooked(false);
      setShowConflictNotice(false);
    }, 1200);
  };

  const toggleSheetStatus = (rowId) => {
    const statuses = ['CONFIRMED', 'TENTATIVE', 'CANCELLED'];
    setSheetData(prev => prev.map(row => {
      if (row.id === rowId) {
        const nextIndex = (statuses.indexOf(row.status) + 1) % statuses.length;
        return { ...row, status: statuses[nextIndex] };
      }
      return row;
    }));
  };

  const handleSheetCellEdit = (rowId, field, newText) => {
    setSheetData(prev => prev.map(row => {
      if (row.id === rowId) {
        if (field === 'client') return { ...row, client: newText };
        if (field === 'subject') {
          return language === 'id' 
            ? { ...row, subject_id: newText }
            : { ...row, subject_en: newText };
        }
        if (field === 'link') return { ...row, link: newText };
      }
      return row;
    }));
  };

  return (
    <div style={{ minHeight: '100vh', padding: '6rem 0 4rem 0', position: 'relative' }}>
      {/* Background blobs */}
      <div className="ambient-glows">
        <div className="glow-bubble glow-bubble-2" style={{ top: '-120px', right: '10%' }}></div>
        <div className="glow-bubble glow-bubble-3" style={{ bottom: '5%', left: '-150px' }}></div>
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
            {language === 'id' ? <>Simulator Kalender Eksekutif & <span className="text-gradient">Log Konflik</span></> : <>Executive Calendar & <span className="text-gradient">Conflict Log</span> Simulator</>}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>
            {t.calSub}
          </p>
        </div>

        {/* 📊 Active Scheduler Panels */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.1fr 0.9fr',
          gap: '2.5rem',
          alignItems: 'start',
          marginBottom: '3rem'
        }}>
          {/* Booking Widget Panel */}
          <div className="glass-panel" style={{ padding: '2.25rem', border: '1px solid var(--glass-border)' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>{t.calBookingTitle}</span>
            </h3>

            {/* Timezone Switcher */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.6rem', textTransform: 'uppercase' }}>
                {t.calSelectTz}
              </label>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {['GMT+7', 'GMT-5', 'GMT+1'].map(tz => {
                  const label = tz === 'GMT+7' ? 'Jakarta (WIB)' : tz === 'GMT-5' ? 'New York (EST)' : 'London (BST)';
                  return (
                    <button
                      key={tz}
                      onClick={() => handleTimezoneChange(tz)}
                      style={{
                        padding: '0.5rem 0.85rem',
                        borderRadius: '8px',
                        border: '1px solid var(--glass-border)',
                        background: selectedTimezone === tz ? 'var(--accent-glow)' : 'var(--bg-secondary)',
                        color: selectedTimezone === tz ? 'var(--accent-secondary)' : 'var(--text-muted)',
                        fontWeight: 600,
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time-slot grid */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.6rem', textTransform: 'uppercase' }}>
                {t.calSelectSlot}
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                {baseSlots.map((slot) => {
                  const displayTime = selectedTimezone === 'GMT+7' 
                    ? slot.wib 
                    : selectedTimezone === 'GMT-5' 
                    ? slot.est 
                    : slot.bst;
                  
                  const isSelected = selectedSlot?.id === slot.id;

                  return (
                    <button
                      key={slot.id}
                      onClick={() => handleSlotSelect(slot)}
                      style={{
                        padding: '0.75rem',
                        borderRadius: '8px',
                        border: '1px solid var(--glass-border)',
                        background: isSelected 
                          ? 'var(--gradient-primary)' 
                          : slot.isConflict 
                          ? 'rgba(239,68,68,0.06)' 
                          : 'var(--bg-secondary)',
                        color: isSelected 
                          ? 'var(--text-inverse)' 
                          : slot.isConflict 
                          ? 'var(--accent)' 
                          : 'var(--text-main)',
                        fontWeight: 600,
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: isSelected ? '0 0 10px var(--accent-glow)' : 'none',
                        position: 'relative'
                      }}
                    >
                      {displayTime}
                      {slot.isConflict && (
                        <span style={{
                          position: 'absolute',
                          top: '-4px',
                          right: '6px',
                          background: 'var(--accent)',
                          color: 'var(--bg-primary)',
                          fontSize: '0.55rem',
                          fontWeight: 800,
                          padding: '0.05rem 0.25rem',
                          borderRadius: '4px'
                        }}>
                          CONFLICT
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Smart Conflict Resolution Notice Banner */}
            {showConflictNotice && (
              <div style={{
                background: 'rgba(239, 68, 68, 0.08)',
                border: '1px solid rgba(239, 68, 68, 0.25)',
                padding: '1rem',
                borderRadius: '10px',
                marginBottom: '1.5rem',
                animation: 'fade-in 0.3s ease'
              }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent)', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>
                  {t.calConflictAlert}
                </span>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
                  {t.calConflictDesc}
                </p>
              </div>
            )}

            {/* Booking Form Intake */}
            {selectedSlot && (
              <form onSubmit={handleBookMeeting} style={{
                background: 'rgba(0,0,0,0.06)',
                border: '1px solid var(--glass-border)',
                borderRadius: '12px',
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.85rem',
                animation: 'fade-in 0.3s ease'
              }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--accent-secondary)' }}>
                  {t.calIntakeForm}
                </span>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.25rem', fontWeight: 700 }}>{t.calClientName}</label>
                    <input
                      type="text"
                      name="name"
                      value={bookingForm.name}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '0.5rem', background: 'var(--bg-secondary)', border: '1px solid var(--glass-border)', borderRadius: '6px', color: 'var(--text-main)', fontSize: '0.8rem' }}
                      placeholder={t.calClientPlaceholder}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.25rem', fontWeight: 700 }}>{t.calEmailAddress}</label>
                    <input
                      type="email"
                      name="email"
                      value={bookingForm.email}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '0.5rem', background: 'var(--bg-secondary)', border: '1px solid var(--glass-border)', borderRadius: '6px', color: 'var(--text-main)', fontSize: '0.8rem' }}
                      placeholder={t.calEmailPlaceholder}
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.25rem', fontWeight: 700 }}>{t.calMeetingAgenda}</label>
                    <input
                      type="text"
                      name="subject"
                      value={bookingForm.subject}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '0.5rem', background: 'var(--bg-secondary)', border: '1px solid var(--glass-border)', borderRadius: '6px', color: 'var(--text-main)', fontSize: '0.8rem' }}
                      placeholder={t.calMeetingPlaceholder}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.25rem', fontWeight: 700 }}>{t.calPlatformLink}</label>
                    <select
                      name="platform"
                      value={bookingForm.platform}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '0.5rem', background: 'var(--bg-secondary)', border: '1px solid var(--glass-border)', borderRadius: '6px', color: 'var(--text-main)', fontSize: '0.8rem' }}
                    >
                      <option value="Zoom">Zoom Meeting</option>
                      <option value="GoogleMeet">Google Meet</option>
                      <option value="MicrosoftTeams">MS Teams</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center', padding: '0.65rem 1rem', fontSize: '0.85rem' }}
                  disabled={isBooked}
                >
                  {isBooked ? t.calBtnSubmitting : t.calBtnSubmit}
                </button>
              </form>
            )}
          </div>

          {/* Active Schedule Panel */}
          <div className="glass-panel" style={{ padding: '2.25rem', border: '1px solid var(--glass-border)', height: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>{t.calActiveRoster}</span>
            </h3>
            
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', margin: 0 }}>
              {t.calRosterDesc}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '310px', overflowY: 'auto', paddingRight: '0.25rem' }}>
              {bookedMeetings.map((meeting) => {
                const isConflictState = meeting.status.includes('HOLD') || meeting.status.includes('TENTATIVE');
                
                const subject = language === 'id' ? meeting.subject_id : meeting.subject_en;
                const tz = language === 'id' ? meeting.tz_id : meeting.tz_en;

                return (
                  <div
                    key={meeting.id}
                    style={{
                      padding: '1rem',
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--glass-border)',
                      borderRadius: '10px',
                      position: 'relative'
                    }}
                  >
                    <div style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      background: isConflictState ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                      color: isConflictState ? 'hsl(0, 84%, 60%)' : 'hsl(142, 70%, 45%)',
                      fontSize: '0.65rem',
                      fontWeight: 800,
                      padding: '0.15rem 0.4rem',
                      borderRadius: '10px',
                      border: '1px solid',
                      borderColor: isConflictState ? 'rgba(239,68,68,0.3)' : 'rgba(16, 185, 129, 0.3)'
                    }}>
                      {isConflictState ? (language === 'id' ? 'Konflik Teratasi' : 'Conflict Resolved') : (language === 'id' ? 'Terkonfirmasi' : 'Confirmed')}
                    </div>

                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.25rem', width: '65%' }}>
                      {subject}
                    </h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.25rem' }}>
                      {language === 'id' ? 'Peserta' : 'Attendee'}: {meeting.name}
                    </p>
                    <div style={{ fontSize: '0.75rem', color: 'var(--accent-secondary)', fontWeight: 700 }}>
                      ⌚ {meeting.time} ({tz}) | <a href={meeting.link} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>{language === 'id' ? 'Gabung Rapat' : 'Join Room'}</a>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* SOP checklist follow-up panel */}
            <div style={{
              background: 'rgba(16, 185, 129, 0.04)',
              border: '1px solid rgba(16, 185, 129, 0.15)',
              borderRadius: '10px',
              padding: '0.85rem'
            }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'hsl(142, 70%, 45%)', textTransform: 'uppercase', display: 'block', marginBottom: '0.35rem' }}>
                {t.calChecklistSop}
              </span>
              <ul style={{ paddingLeft: '1rem', margin: 0, fontSize: '0.7rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <li>{t.calChecklist1}</li>
                <li>{t.calChecklist2}</li>
                <li>{t.calChecklist3}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 💻 Google Sheets / Excel Live Spreadsheet Simulator */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                <span>{t.calSheetTitle}</span>
                <span className="project-tag" style={{ fontSize: '0.65rem', background: 'var(--accent-glow)', color: 'var(--accent-secondary)' }}>{t.expExcelSync}</span>
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                {t.calSheetDesc}
              </p>
            </div>
            
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
              {t.calFormula}
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
              <span style={{ color: 'var(--accent-secondary)', fontWeight: 800 }}>📂 FOUNDER_MASTER_APPOINTMENT_LOG_2026.xlsx</span>
              <span>{language === 'id' ? 'Baris Aktif' : 'Grid Rows'}: {sheetData.length} {language === 'id' ? 'item' : 'active'}</span>
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
                    <th style={{ padding: '0.65rem 1rem', borderRight: '1px solid var(--glass-border)', color: 'var(--text-main)' }}>B ({language === 'id' ? 'Slot Waktu' : 'Time Slot'})</th>
                    <th style={{ padding: '0.65rem 1rem', borderRight: '1px solid var(--glass-border)', color: 'var(--text-main)' }}>C ({language === 'id' ? 'Zona Waktu' : 'Timezone'})</th>
                    <th style={{ padding: '0.65rem 1rem', borderRight: '1px solid var(--glass-border)', color: 'var(--text-main)' }}>D ({language === 'id' ? 'Detail Rencana Rapat' : 'Agenda Details'})</th>
                    <th style={{ padding: '0.65rem 1rem', borderRight: '1px solid var(--glass-border)', color: 'var(--text-main)' }}>E (Platform Link)</th>
                    <th style={{ padding: '0.65rem 1rem', color: 'var(--text-main)', textAlign: 'center' }}>F ({language === 'id' ? 'Status Rapat' : 'Roster Status'})</th>
                  </tr>
                </thead>
                <tbody>
                  {sheetData.map((row, index) => {
                    const isFlashing = flashingRowId === row.id;
                    const subject = language === 'id' ? row.subject_id : row.subject_en;
                    const tz = language === 'id' ? row.tz_id : row.tz_en;
                    
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
                          {row.time}
                        </td>
                        <td style={{ padding: '0.65rem 1rem', borderRight: '1px solid var(--glass-border)', color: 'var(--text-muted)' }}>
                          {tz}
                        </td>
                        <td style={{ padding: '0.65rem 1rem', borderRight: '1px solid var(--glass-border)', color: 'var(--text-main)' }}>
                          <input
                            type="text"
                            value={subject}
                            onChange={(e) => handleSheetCellEdit(row.id, 'subject', e.target.value)}
                            style={{ width: '100%', background: 'transparent', border: 'none', color: 'var(--text-main)', fontFamily: 'monospace', outline: 'none' }}
                          />
                        </td>
                        <td style={{ padding: '0.65rem 1rem', borderRight: '1px solid var(--glass-border)', color: 'var(--accent)' }}>
                          <input
                            type="text"
                            value={row.link}
                            onChange={(e) => handleSheetCellEdit(row.id, 'link', e.target.value)}
                            style={{ width: '100%', background: 'transparent', border: 'none', color: 'var(--accent)', fontFamily: 'monospace', outline: 'none' }}
                          />
                        </td>
                        <td 
                          onClick={() => toggleSheetStatus(row.id)}
                          style={{
                            padding: '0.65rem 1rem',
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
                            background: row.status === 'CONFIRMED' 
                              ? 'rgba(16, 185, 129, 0.15)' 
                              : row.status === 'TENTATIVE' 
                              ? 'rgba(245, 158, 11, 0.15)' 
                              : 'rgba(239, 68, 68, 0.15)',
                            color: row.status === 'CONFIRMED' 
                              ? 'hsl(142, 70%, 45%)' 
                              : row.status === 'TENTATIVE' 
                              ? 'hsl(38, 92%, 50%)' 
                              : 'hsl(0, 84%, 60%)',
                            border: '1px solid',
                            borderColor: row.status === 'CONFIRMED' 
                              ? 'rgba(16, 185, 129, 0.3)' 
                              : row.status === 'TENTATIVE' 
                              ? 'rgba(245, 158, 11, 0.3)' 
                              : 'rgba(239, 68, 68, 0.3)',
                          }}>
                            {row.status} ⇄
                          </span>
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

export default CalendarPage;
