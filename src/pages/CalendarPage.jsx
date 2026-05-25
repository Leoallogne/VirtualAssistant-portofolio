import React, { useState } from 'react';

const CalendarPage = ({ setActivePage }) => {
  const [selectedTimezone, setSelectedTimezone] = useState('GMT+7');
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookingForm, setBookingForm] = useState({ name: '', email: '', subject: '' });
  const [isBooked, setIsBooked] = useState(false);
  const [bookedMeetings, setBookedMeetings] = useState([
    { id: 1, name: 'Robert Chen', subject: 'Strategic Partner Discussion', time: '11:00 AM', tz: 'EST (New York)' },
    { id: 2, name: 'Siti Aminah', subject: 'UMKM Marketing Setup', time: '02:30 PM', tz: 'WIB (Jakarta)' }
  ]);

  // Available slots base (WIB / GMT+7)
  const baseSlots = [
    { id: 'slot-1', wib: '09:00 AM', est: '10:00 PM (-1d)', bst: '03:00 AM' },
    { id: 'slot-2', wib: '10:30 AM', est: '11:30 PM (-1d)', bst: '04:30 AM' },
    { id: 'slot-3', wib: '02:00 PM', est: '03:00 AM', bst: '08:00 AM' },
    { id: 'slot-4', wib: '04:30 PM', est: '05:30 AM', bst: '10:30 AM' }
  ];

  const handleTimezoneChange = (tz) => {
    setSelectedTimezone(tz);
    setSelectedSlot(null);
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    setIsBooked(false);
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

    const newMeeting = {
      id: Date.now(),
      name: bookingForm.name,
      subject: bookingForm.subject || 'Discovery Consultation',
      time: slotTime,
      tz: tzLabel
    };

    setIsBooked(true);

    // Simulate scheduling delay
    setTimeout(() => {
      setBookedMeetings((prev) => [newMeeting, ...prev]);
      setBookingForm({ name: '', email: '', subject: '' });
      setSelectedSlot(null);
      setIsBooked(false);
    }, 1200);
  };

  return (
    <div style={{ minHeight: '100vh', padding: '6rem 0 4rem 0', position: 'relative' }}>
      {/* Background blobs */}
      <div className="ambient-glows">
        <div className="glow-bubble glow-bubble-2" style={{ top: '-120px', right: '10%' }}></div>
        <div className="glow-bubble glow-bubble-3" style={{ bottom: '5%', left: '-150px' }}></div>
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
            Executive <span className="text-gradient">Calendar Booking</span> Simulator
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>
            Test drive my timezone-aware scheduling widget. Select your timezone, book a slot, and observe the live dashboard synchronization.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.1fr 0.9fr',
          gap: '2.5rem',
          alignItems: 'start'
        }}>
          {/* Booking Widget Panel */}
          <div className="glass-panel" style={{ padding: '2.5rem', border: '1px solid var(--glass-border)' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>📅 Calendar Scheduler</span>
            </h3>

            {/* Timezone Switcher */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.65rem', textTransform: 'uppercase' }}>
                Select Timezone / Pilih Zona Waktu
              </label>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => handleTimezoneChange('GMT+7')}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    border: '1px solid var(--glass-border)',
                    background: selectedTimezone === 'GMT+7' ? 'var(--accent-glow)' : 'var(--bg-secondary)',
                    color: selectedTimezone === 'GMT+7' ? 'var(--accent-secondary)' : 'var(--text-muted)',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  Jakarta (WIB / GMT+7)
                </button>
                <button
                  onClick={() => handleTimezoneChange('GMT-5')}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    border: '1px solid var(--glass-border)',
                    background: selectedTimezone === 'GMT-5' ? 'var(--accent-glow)' : 'var(--bg-secondary)',
                    color: selectedTimezone === 'GMT-5' ? 'var(--accent-secondary)' : 'var(--text-muted)',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  New York (EST / GMT-5)
                </button>
                <button
                  onClick={() => handleTimezoneChange('GMT+1')}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    border: '1px solid var(--glass-border)',
                    background: selectedTimezone === 'GMT+1' ? 'var(--accent-glow)' : 'var(--bg-secondary)',
                    color: selectedTimezone === 'GMT+1' ? 'var(--accent-secondary)' : 'var(--text-muted)',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  London (BST / GMT+1)
                </button>
              </div>
            </div>

            {/* Time-slot grid */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.65rem', textTransform: 'uppercase' }}>
                Select Available Slot / Pilih Slot Waktu
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
                        padding: '0.8rem',
                        borderRadius: '10px',
                        border: '1px solid var(--glass-border)',
                        background: isSelected ? 'var(--gradient-primary)' : 'var(--bg-secondary)',
                        color: isSelected ? 'var(--text-inverse)' : 'var(--text-main)',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        boxShadow: isSelected ? '0 0 10px var(--accent-glow)' : 'none'
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) e.currentTarget.style.borderColor = 'var(--accent)';
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) e.currentTarget.style.borderColor = 'var(--glass-border)';
                      }}
                    >
                      {displayTime}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Booking Form Overlay */}
            {selectedSlot && (
              <form onSubmit={handleBookMeeting} style={{
                background: 'rgba(0,0,0,0.12)',
                border: '1px solid var(--glass-border)',
                borderRadius: '16px',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                animation: 'fade-in 0.3s ease'
              }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--accent-secondary)' }}>
                  Confirm Booking details:
                </h4>
                
                <div>
                  <label className="form-label" style={{ fontSize: '0.8rem', marginBottom: '0.25rem' }}>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={bookingForm.name}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter name"
                    required
                  />
                </div>

                <div>
                  <label className="form-label" style={{ fontSize: '0.8rem', marginBottom: '0.25rem' }}>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={bookingForm.email}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter email"
                    required
                  />
                </div>

                <div>
                  <label className="form-label" style={{ fontSize: '0.8rem', marginBottom: '0.25rem' }}>Meeting Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={bookingForm.subject}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="E.g., Discovery Discussion"
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center', padding: '0.7rem 1rem', fontSize: '0.9rem', marginTop: '0.5rem' }}
                  disabled={isBooked}
                >
                  {isBooked ? 'Scheduling Slot...' : 'Confirm Appointment'}
                </button>
              </form>
            )}
          </div>

          {/* Active Schedule Panel */}
          <div className="glass-panel" style={{ padding: '2.5rem', border: '1px solid var(--glass-border)', height: '100%' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>🗓️ Executive Schedule Dashboard</span>
            </h3>
            
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
              Meetings registered in the current active simulation state (Timezone adjusted):
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {bookedMeetings.map((meeting) => (
                <div
                  key={meeting.id}
                  style={{
                    padding: '1.2rem',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '12px',
                    position: 'relative'
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: '1.2rem',
                    right: '1.2rem',
                    background: 'rgba(16, 185, 129, 0.15)',
                    color: 'hsl(142, 70%, 45%)',
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    padding: '0.15rem 0.5rem',
                    borderRadius: '20px',
                    border: '1px solid rgba(16, 185, 129, 0.3)'
                  }}>
                    Scheduled
                  </div>

                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.25rem', width: '70%' }}>
                    {meeting.subject}
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.4rem' }}>
                    Attendee: {meeting.name}
                  </p>
                  <div style={{ fontSize: '0.75rem', color: 'var(--accent-secondary)', fontWeight: 700 }}>
                    ⌚ Time: {meeting.time} ({meeting.tz})
                  </div>
                </div>
              ))}
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

export default CalendarPage;
