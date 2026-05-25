import React, { useState, useContext, useEffect } from 'react';
import { LanguageContext } from '../context/LanguageContext';

const SocialMediaPage = ({ setActivePage }) => {
  const { language, t } = useContext(LanguageContext);

  const [selectedPost, setSelectedPost] = useState(null);
  const [layoutView, setLayoutView] = useState('grid'); // 'grid' or 'calendar'
  const [flashingRowId, setFlashingRowId] = useState(null);

  // Mock post contents with bilingual properties
  const [posts, setPosts] = useState([
    {
      id: 1,
      title_id: 'Nasi Goreng Kampung Premium',
      title_en: 'Premium Kampung Fried Rice',
      likes: '512',
      comments: '42',
      reach: '4,230',
      engagementRate: '8.9%',
      tag_id: 'Konten Kuliner',
      tag_en: 'Culinary Post',
      color: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
      day_id: 'Senin',
      day_en: 'Monday',
      date: '2026-05-25',
      visualType_id: 'Post Komidi Putar (Carousel)',
      visualType_en: 'Carousel Post',
      status: 'PUBLISHED',
      caption_id: '🔥 MENU BARU! Nikmati kehangatan rempah otentik dalam sepiring Nasi Goreng Kampung Premium khas Warung Nusantara. Dibuat dengan resep warisan, bumbu segar, dan cinta. Tersedia di GoFood & GrabFood sekarang juga! 🛵✨\n\n#kulinerkarawang #nasigorengkampung #warungnusantara #kulinernusantara #makananindonesia #foodiesindonesia',
      caption_en: '🔥 NEW MENU ALERT! Savor the warmth of authentic spices in a plate of Premium Kampung Fried Rice by Warung Nusantara. Crafted from heritage recipes, fresh ingredients, and love. Available on GoFood & GrabFood now! 🛵✨\n\n#kulinerkarawang #nasigorengkampung #warungnusantara #kulinernusantara #makananindonesia #foodiesindonesia',
      designGuide_id: 'Panduan Visual: Palet warna brand yang hangat, tipografi Outfit, pusat foto makanan dengan kontras tinggi, border kaca tipis.',
      designGuide_en: 'Visual Layout: Brand guidelines warm palette, Outfit typography, high-contrast food center, thin glass borders.'
    },
    {
      id: 2,
      title_id: 'Sate Ayam Madura Legit',
      title_en: 'Legit Madura Chicken Satay',
      likes: '480',
      comments: '35',
      reach: '3,890',
      engagementRate: '7.8%',
      tag_id: 'Konten Promosi',
      tag_en: 'Promo Post',
      color: 'linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%)',
      day_id: 'Rabu',
      day_en: 'Wednesday',
      date: '2026-05-27',
      visualType_id: 'Gambar Tunggal',
      visualType_en: 'Single Image',
      status: 'SCHEDULED',
      caption_id: '🍢 SATE AYAM MADURA PROMO BELI 2 GRATIS 1! Potongan daging ayam tebal, bumbu kacang gurih legit yang melimpah, disajikan hangat dengan lontong daun segar. Khusus pemesanan via WA hari ini! Jangan sampai kehabisan ya Sahabat Kuliner! 🚀❤\n\n#sateayam #satemadura #promokuliner #karawangfood #kulinerlokal #makanansedap #jajanankarawang',
      caption_en: '🍢 BUY 2 GET 1 FREE MADURA CHICKEN SATAY! Thick chicken chunks, rich savory peanut sauce, served warm with fresh leaf lontong. WhatsApp orders only today! Don\'t miss out, food lovers! 🚀❤\n\n#sateayam #satemadura #promokuliner #karawangfood #kulinerlokal #makanansedap #jajanankarawang',
      designGuide_id: 'Panduan Visual: Spanduk pita diskon dinamis, pendaran ungu tebal, penempatan logo WhatsApp sebagai panggilan aksi.',
      designGuide_en: 'Visual Layout: Dynamic discount ribbon banner, bold violet glow, call-to-action WhatsApp logo placement.'
    },
    {
      id: 3,
      title_id: 'Es Cendol Durian Segar',
      title_en: 'Fresh Durian Cendol Ice',
      likes: '620',
      comments: '58',
      reach: '5,120',
      engagementRate: '10.2%',
      tag_id: 'Tips & Edukasi',
      tag_en: 'Tips/Educational',
      color: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
      day_id: 'Jumat',
      day_en: 'Friday',
      date: '2026-05-29',
      visualType_id: 'Video Reels',
      visualType_en: 'Reels Video',
      status: 'SCHEDULED',
      caption_id: '☀ KEPANASAN SIANG HARI? Segarkan harimu dengan Es Cendol Durian premium! Cendol pandan alami kenyal, kuah santan gurih, gula jawa asli, ditambah topping daging buah durian montong yang legit manis. Dijamin langsung melek! 🤤🍧\n\n#escendol #cendoldurian #durianmontong #minumansegar #kulinersegar #cendolpremium #esnusantara',
      caption_en: '☀ SWEATING IN THE HEAT? Refresh your day with Premium Durian Cendol! Natural pandan cendol, savory coconut milk, real palm sugar, topped with rich sweet montong durian. Guaranteed to wake you up! 🤤🍧\n\n#escendol #cendoldurian #durianmontong #minumansegar #kulinersegar #cendolpremium #esnusantara',
      designGuide_id: 'Panduan Visual: Gradasi warna hijau organik segar, overlay vektor elemen tropis kustom, format video reels frame rate tinggi.',
      designGuide_en: 'Visual Layout: Fresh organic green gradients, custom tropical elements vector overlay, high-frame rate reels.'
    },
    {
      id: 4,
      title_id: 'Tumpeng Mini Nusantara',
      title_en: 'Mini Nusantara Tumpeng',
      likes: '420',
      comments: '28',
      reach: '3,210',
      engagementRate: '6.5%',
      tag_id: 'Konten Kuliner',
      tag_en: 'Culinary Grid',
      color: 'linear-gradient(135deg, #f12711 0%, #f5af19 100%)',
      day_id: 'Sabtu',
      day_en: 'Saturday',
      date: '2026-05-30',
      visualType_id: 'Post Komidi Putar (Carousel)',
      visualType_en: 'Carousel Post',
      status: 'DRAFT',
      caption_id: '🎉 SYUKURAN LEBIH BERMAKNA! Tumpeng Mini Nusantara siap mendampingi momen spesial ulang tahun, arisan, atau gathering Anda. Disusun higienis dengan lauk lengkap cita rasa otentik yang lezat. Pesan H-2 via Direct Message! 🍱✨\n\n#tumpengmini #tumpengkarawang #syukuran #nasitumpeng #kateringkarawang #nasiboxkarawang #tumpengmurah',
      caption_en: '🎉 MAKE CELEBRATIONS MORE MEANINGFUL! Mini Nusantara Tumpeng is ready for birthdays, gatherings, or meetings. Hygienically prepared with complete authentic side dishes. Order 2 days in advance via DM! 🍱✨\n\n#tumpengmini #tumpengkarawang #syukuran #nasitumpeng #kateringkarawang #nasiboxkarawang #tumpengmurah',
      designGuide_id: 'Panduan Visual: Kemewahan border emas, presentasi penataan makanan kuliner premium, checklist linimasa pesanan standar.',
      designGuide_en: 'Visual Layout: Gold border elegance, high-end culinary plating presentation focal, standard order timeline checklist.'
    }
  ]);

  // Google Sheets content scheduling tracker data with bilingual fields
  const [sheetData, setSheetData] = useState([
    { id: 1, date: '2026-05-25', topic_id: 'Nasi Goreng Kampung Premium', topic_en: 'Premium Kampung Fried Rice', type_id: 'Carousel', type_en: 'Carousel', reach: '4,230', status: 'PUBLISHED', engagement: '8.9%' },
    { id: 2, date: '2026-05-27', topic_id: 'Promo Sate Ayam Madura', topic_en: 'Madura Chicken Satay Promo', type_id: 'Gambar Tunggal', type_en: 'Single Image', reach: '3,890', status: 'SCHEDULED', engagement: '7.8%' },
    { id: 3, date: '2026-05-29', topic_id: 'Es Cendol Durian Segar', topic_en: 'Fresh Durian Cendol Ice', type_id: 'Video Reels', type_en: 'Reels Video', reach: '5,120', status: 'SCHEDULED', engagement: '10.2%' },
    { id: 4, date: '2026-05-30', topic_id: 'Tumpeng Mini Nusantara', topic_en: 'Mini Nusantara Tumpeng', type_id: 'Carousel', type_en: 'Carousel', reach: '3,210', status: 'DRAFT', engagement: '6.5%' }
  ]);

  // Sync selected email object with changes in array
  useEffect(() => {
    if (selectedPost) {
      const updated = posts.find(p => p.id === selectedPost.id);
      if (updated) setSelectedPost(updated);
    }
  }, [posts]);

  const toggleSheetStatus = (rowId) => {
    const statuses = ['DRAFT', 'SCHEDULED', 'PUBLISHED'];
    setSheetData(prev => prev.map(row => {
      if (row.id === rowId) {
        const nextIndex = (statuses.indexOf(row.status) + 1) % statuses.length;
        const nextStatus = statuses[nextIndex];
        
        // Also update the matching visual post status
        setPosts(p => p.map(post => post.id === rowId ? { ...post, status: nextStatus } : post));
        
        // Flash row
        setFlashingRowId(rowId);
        setTimeout(() => setFlashingRowId(null), 1500);

        return { ...row, status: nextStatus };
      }
      return row;
    }));
  };

  const handleSheetCellEdit = (rowId, field, newText) => {
    setSheetData(prev => prev.map(row => {
      if (row.id === rowId) {
        if (field === 'topic') {
          return language === 'id' 
            ? { ...row, topic_id: newText }
            : { ...row, topic_en: newText };
        }
        if (field === 'date') return { ...row, date: newText };
      }
      return row;
    }));
    setPosts(prev => prev.map(post => {
      if (post.id === rowId) {
        if (field === 'topic') {
          return language === 'id' 
            ? { ...post, title_id: newText }
            : { ...post, title_en: newText };
        }
        if (field === 'date') return { ...post, date: newText };
      }
      return post;
    }));
  };

  return (
    <div style={{ minHeight: '100vh', padding: '6rem 0 4rem 0', position: 'relative' }}>
      {/* Background visual spheres */}
      <div className="ambient-glows">
        <div className="glow-bubble glow-bubble-3" style={{ top: '-80px', left: '15%' }}></div>
        <div className="glow-bubble glow-bubble-1" style={{ bottom: '10%', right: '-150px' }}></div>
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
            {language === 'id' ? <>Simulator Konten Sosial & <span className="text-gradient">Excel Planner</span></> : <>Social Content & <span className="text-gradient">Planner Excel</span> Simulator</>}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>
            {t.socSub}
          </p>
        </div>

        {/* 📊 Marketing Analytics & Brand Kit Dashboard */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          gap: '2rem',
          marginBottom: '2rem',
          alignItems: 'stretch'
        }}>
          {/* Growth Analytics Graph SVG */}
          <div className="glass-panel" style={{ padding: '1.5rem', border: '1px solid var(--glass-border)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--accent-secondary)' }}>{t.socGrowthAnalytics}</span>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{t.socEngagementRate}</span>
            </div>
            <div style={{ height: '140px', position: 'relative', marginTop: '0.5rem' }}>
              {/* Custom SVG Line Chart */}
              <svg viewBox="0 0 500 100" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                <defs>
                  <linearGradient id="chart-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--accent-secondary)" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="var(--accent-secondary)" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {/* Grid Lines */}
                <line x1="0" y1="80" x2="500" y2="80" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                <line x1="0" y1="40" x2="500" y2="40" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                {/* Area Gradient */}
                <path d="M 0 90 L 125 50 L 250 65 L 375 25 L 500 10 L 500 90 Z" fill="url(#chart-grad)" />
                {/* Chart Line */}
                <path d="M 0 90 Q 125 45, 250 65 T 500 10" fill="none" stroke="var(--accent-secondary)" strokeWidth="3" strokeLinecap="round" />
                {/* Glowing Nodes */}
                <circle cx="125" cy="50" r="5" fill="var(--accent)" />
                <circle cx="250" cy="65" r="5" fill="var(--accent)" />
                <circle cx="375" cy="25" r="5" fill="var(--accent)" />
                <circle cx="500" cy="10" r="5" fill="var(--accent-secondary)" />
              </svg>
              {/* X Axis Labels */}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                <span>Week 1 (4.2k)</span>
                <span>Week 2 (5.8k)</span>
                <span>Week 3 (8.9k)</span>
                <span>Week 4 (12.4k Reach)</span>
              </div>
            </div>
          </div>

          {/* Brand Asset Kit Drawer */}
          <div className="glass-panel" style={{ padding: '1.5rem', border: '1px solid var(--glass-border)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--accent)' }}>{t.socBrandKitTitle}</span>
            
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: '#FF6B6B', border: '1px solid var(--glass-border)' }} title="Warm Red"></div>
              <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: '#FF8E53', border: '1px solid var(--glass-border)' }} title="Golden Orange"></div>
              <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: '#38ef7d', border: '1px solid var(--glass-border)' }} title="Organic Green"></div>
              <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: '#1b2a47', border: '1px solid var(--glass-border)' }} title="Corporate Navy"></div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: '0.75rem' }}>
              <span style={{ color: 'var(--text-main)', fontWeight: 700 }}>{t.socBrandVoice}<span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>{t.socBrandVoiceVal}</span></span>
              <span style={{ color: 'var(--text-main)', fontWeight: 700 }}>{t.socTypography}<span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>Outfit (Headings) / Inter (Captions)</span></span>
            </div>
          </div>
        </div>

        {/* Instagram Interface Mockup Layout */}
        <div 
          className="glass-panel"
          style={{
            maxWidth: '1000px',
            margin: '0 auto 3rem auto',
            borderRadius: '20px',
            overflow: 'hidden',
            border: '1px solid var(--glass-border)',
            padding: '2rem'
          }}
        >
          {/* Mock Instagram Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2.5rem',
            borderBottom: '1px solid var(--glass-border)',
            paddingBottom: '1.5rem',
            marginBottom: '1.5rem',
            flexWrap: 'wrap'
          }}>
            {/* Avatar */}
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'var(--gradient-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2.5rem',
              boxShadow: 'var(--shadow-md)'
            }}>
              🍱
            </div>

            {/* Profile Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>warung.nusantara</h3>
                <span className="project-tag" style={{ fontSize: '0.65rem' }}>{t.inboxLiveSyncVal || 'Business VA Managed'}</span>
              </div>
              <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.85rem' }}>
                <span><strong>240</strong> {language === 'id' ? 'postingan' : 'posts'}</span>
                <span><strong>12.4k</strong> {language === 'id' ? 'pengikut' : 'followers'}</span>
                <span><strong>320</strong> {language === 'id' ? 'mengikuti' : 'following'}</span>
              </div>
              <div style={{ fontSize: '0.85rem' }}>
                <strong style={{ display: 'block' }}>Warung Nusantara Culinary</strong>
                <span style={{ color: 'var(--text-muted)' }}>{language === 'id' ? 'Ekspansi strategi konten digital & Kalender Konten yang dikelola secara profesional oleh VA' : 'Digital expansion strategy & Content Calendar managed professionally by VA'}</span>
              </div>
            </div>

            {/* View Switcher Toggles */}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => setLayoutView('grid')}
                style={{
                  padding: '0.45rem 0.85rem',
                  borderRadius: '6px',
                  border: '1px solid var(--glass-border)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  background: layoutView === 'grid' ? 'var(--accent-glow)' : 'var(--bg-secondary)',
                  color: layoutView === 'grid' ? 'var(--accent-secondary)' : 'var(--text-muted)'
                }}
              >
                {language === 'id' ? 'Tampilan Grid' : 'Grid Layout'}
              </button>
              <button
                onClick={() => setLayoutView('calendar')}
                style={{
                  padding: '0.45rem 0.85rem',
                  borderRadius: '6px',
                  border: '1px solid var(--glass-border)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  background: layoutView === 'calendar' ? 'var(--accent-glow)' : 'var(--bg-secondary)',
                  color: layoutView === 'calendar' ? 'var(--accent-secondary)' : 'var(--text-muted)'
                }}
              >
                {language === 'id' ? 'Jadwal Mingguan' : 'Weekly Planner'}
              </button>
            </div>
          </div>

          {/* Grid Content / Post Details split */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: selectedPost ? '1fr 1fr' : '1fr',
            gap: '2rem',
            transition: 'all 0.3s ease'
          }}>
            {/* Visual layouts */}
            <div>
              <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '1rem', fontWeight: 700 }}>
                {layoutView === 'grid' ? t.socGridHeader : t.socPlannerHeader}
              </h4>

              {layoutView === 'grid' ? (
                /* Grid feeds view */
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '0.85rem'
                }}>
                  {posts.map((post) => {
                    const title = language === 'id' ? post.title_id : post.title_en;
                    return (
                      <div
                        key={post.id}
                        onClick={() => setSelectedPost(post)}
                        style={{
                          height: '140px',
                          borderRadius: '10px',
                          background: post.color,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          position: 'relative',
                          overflow: 'hidden',
                          transition: 'all 0.3s ease',
                          border: selectedPost?.id === post.id ? '3px solid var(--accent-secondary)' : '1px solid var(--glass-border)'
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.02)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                      >
                        <div style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          padding: '0.4rem',
                          background: 'rgba(0, 0, 0, 0.7)',
                          color: '#ffffff',
                          fontSize: '0.7rem',
                          textAlign: 'center',
                          fontWeight: 700
                        }}>
                          {title} ({post.status})
                        </div>
                        <span style={{ fontSize: '2.5rem' }}>
                          {post.id === 1 ? '🍛' : post.id === 2 ? '🍢' : post.id === 3 ? '🍧' : '🍱'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* Planner Calendar View */
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {posts.map(post => {
                    const title = language === 'id' ? post.title_id : post.title_en;
                    const day = language === 'id' ? post.day_id : post.day_en;
                    const type = language === 'id' ? post.visualType_id : post.visualType_en;
                    
                    return (
                      <div
                        key={post.id}
                        onClick={() => setSelectedPost(post)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.85rem',
                          background: 'var(--bg-secondary)',
                          border: '1px solid var(--glass-border)',
                          borderColor: selectedPost?.id === post.id ? 'var(--accent-secondary)' : 'var(--glass-border)',
                          borderRadius: '10px',
                          cursor: 'pointer'
                        }}
                      >
                        <div>
                          <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--accent)', marginRight: '0.5rem' }}>{day.toUpperCase()}</span>
                          <strong style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>{title}</strong>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{type}</span>
                          <span style={{
                            padding: '0.15rem 0.4rem',
                            borderRadius: '4px',
                            fontSize: '0.65rem',
                            fontWeight: 700,
                            background: post.status === 'PUBLISHED' ? 'rgba(16,185,129,0.15)' : 'rgba(245,158,11,0.15)',
                            color: post.status === 'PUBLISHED' ? 'hsl(142,70%,45%)' : 'hsl(38,92%,50%)'
                          }}>{post.status}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Post Detail Inspector */}
            {selectedPost && (
              <div style={{
                background: 'rgba(0,0,0,0.03)',
                border: '1px solid var(--glass-border)',
                borderRadius: '16px',
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                animation: 'fade-in 0.3s ease'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-main)' }}>
                    {t.socVisualCopywriting}
                  </h4>
                  <button
                    onClick={() => setSelectedPost(null)}
                    style={{ background: 'transparent', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontWeight: 700 }}
                  >
                    &times; {language === 'id' ? 'Tutup' : 'Close'}
                  </button>
                </div>

                {/* Canva Template Specs */}
                <div>
                  <h5 style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--accent-secondary)', fontWeight: 800, marginBottom: '0.2rem' }}>
                    {t.socCanvaSpecs}
                  </h5>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.35 }}>
                    {language === 'id' ? selectedPost.designGuide_id : selectedPost.designGuide_en}
                  </p>
                </div>

                {/* Copywriting Caption */}
                <div>
                  <h5 style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--accent-secondary)', fontWeight: 800, marginBottom: '0.2rem' }}>
                    {t.socMarketingCaption}
                  </h5>
                  <div style={{
                    background: 'var(--bg-primary)',
                    border: '1px solid var(--glass-border)',
                    padding: '0.85rem',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.4,
                    maxHeight: '120px',
                    overflowY: 'auto',
                    whiteSpace: 'pre-line'
                  }}>
                    {language === 'id' ? selectedPost.caption_id : selectedPost.caption_en}
                  </div>
                </div>

                {/* Performance analytics metrics */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '0.5rem',
                  borderTop: '1px solid var(--glass-border)',
                  paddingTop: '0.75rem'
                }}>
                  <div style={{ background: 'var(--bg-secondary)', padding: '0.4rem', borderRadius: '6px', textAlign: 'center', border: '1px solid var(--glass-border)' }}>
                    <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)' }}>{t.socLikesComments}</span>
                    <strong style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>♥ {selectedPost.likes} / 💬 {selectedPost.comments}</strong>
                  </div>
                  <div style={{ background: 'var(--bg-secondary)', padding: '0.4rem', borderRadius: '6px', textAlign: 'center', border: '1px solid var(--glass-border)' }}>
                    <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)' }}>{t.socEstReach}</span>
                    <strong style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>🎯 {selectedPost.reach} | {selectedPost.engagementRate}</strong>
                  </div>
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
                <span>{t.socSheetTitle}</span>
                <span className="project-tag" style={{ fontSize: '0.65rem', background: 'var(--accent-glow)', color: 'var(--accent-secondary)' }}>{t.expExcelSync}</span>
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                {t.socSheetDesc}
              </p>
            </div>
            
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
              {t.socFormula}
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
              <span style={{ color: 'var(--accent-secondary)', fontWeight: 800 }}>📂 WARUNG_NUSANTARA_CONTENT_CALENDAR_2026.xlsx</span>
              <span>{language === 'id' ? 'Total terjadwal' : 'Total scheduled'}: {sheetData.filter(r => r.status !== 'DRAFT').length} {language === 'id' ? 'item' : 'items'}</span>
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
                    <th style={{ padding: '0.65rem 1rem', borderRight: '1px solid var(--glass-border)', color: 'var(--text-main)' }}>A ({language === 'id' ? 'Tanggal Rilis' : 'Schedule Date'})</th>
                    <th style={{ padding: '0.65rem 1rem', borderRight: '1px solid var(--glass-border)', color: 'var(--text-main)' }}>B ({language === 'id' ? 'Topik Konten' : 'Content Topic'})</th>
                    <th style={{ padding: '0.65rem 1rem', borderRight: '1px solid var(--glass-border)', color: 'var(--text-main)' }}>C ({language === 'id' ? 'Aset Saluran Visual' : 'Visual Channel Asset'})</th>
                    <th style={{ padding: '0.65rem 1rem', borderRight: '1px solid var(--glass-border)', color: 'var(--text-main)' }}>D ({language === 'id' ? 'Est. Jangkauan' : 'Est. Reach'})</th>
                    <th style={{ padding: '0.65rem 1rem', borderRight: '1px solid var(--glass-border)', color: 'var(--text-main)', textAlign: 'center' }}>E ({language === 'id' ? 'Status Konten' : 'Content Status'})</th>
                    <th style={{ padding: '0.65rem 1rem', color: 'var(--text-main)', textAlign: 'center' }}>F ({language === 'id' ? 'Rasio Interaksi' : 'Engagement Ratio'})</th>
                  </tr>
                </thead>
                <tbody>
                  {sheetData.map((row, index) => {
                    const isFlashing = flashingRowId === row.id;
                    const topic = language === 'id' ? row.topic_id : row.topic_en;
                    const type = language === 'id' ? row.type_id : row.type_en;
                    
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
                          <input
                            type="text"
                            value={row.date}
                            onChange={(e) => handleSheetCellEdit(row.id, 'date', e.target.value)}
                            style={{ width: '100%', background: 'transparent', border: 'none', color: 'var(--text-muted)', fontFamily: 'monospace', outline: 'none' }}
                          />
                        </td>
                        <td style={{ padding: '0.65rem 1rem', borderRight: '1px solid var(--glass-border)', color: 'var(--text-main)', fontWeight: 700 }}>
                          <input
                            type="text"
                            value={topic}
                            onChange={(e) => handleSheetCellEdit(row.id, 'topic', e.target.value)}
                            style={{ width: '100%', background: 'transparent', border: 'none', color: 'var(--text-main)', fontFamily: 'monospace', outline: 'none' }}
                          />
                        </td>
                        <td style={{ padding: '0.65rem 1rem', borderRight: '1px solid var(--glass-border)', color: 'var(--text-muted)' }}>
                          {type}
                        </td>
                        <td style={{ padding: '0.65rem 1rem', borderRight: '1px solid var(--glass-border)', color: 'var(--text-muted)' }}>
                          {row.reach}
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
                            background: row.status === 'PUBLISHED' 
                              ? 'rgba(16, 185, 129, 0.15)' 
                              : row.status === 'SCHEDULED' 
                              ? 'rgba(59, 130, 246, 0.15)' 
                              : 'rgba(245, 158, 11, 0.15)',
                            color: row.status === 'PUBLISHED' 
                              ? 'hsl(142, 70%, 45%)' 
                              : row.status === 'SCHEDULED' 
                              ? '#3b82f6' 
                              : 'hsl(38, 92%, 50%)',
                            border: '1px solid',
                            borderColor: row.status === 'PUBLISHED' 
                              ? 'rgba(16, 185, 129, 0.3)' 
                              : row.status === 'SCHEDULED' 
                              ? 'rgba(59, 130, 246, 0.3)' 
                              : 'rgba(245, 158, 11, 0.3)',
                          }}>
                            {row.status} ⇄
                          </span>
                        </td>
                        <td style={{ padding: '0.65rem 1rem', color: 'var(--accent-secondary)', fontWeight: 800, textAlign: 'center' }}>
                          {row.engagement}
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

export default SocialMediaPage;
