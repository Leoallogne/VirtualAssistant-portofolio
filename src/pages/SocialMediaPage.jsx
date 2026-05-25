import React, { useState } from 'react';

const SocialMediaPage = ({ setActivePage }) => {
  const [selectedPost, setSelectedPost] = useState(null);

  const posts = [
    {
      id: 1,
      title: 'Nasi Goreng Kampung Premium',
      likes: '512',
      comments: '42',
      reach: '4,230',
      engagement: '890',
      tag: 'Food Post',
      color: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
      caption: '🔥 NEW MENU ALERT! Nikmati kehangatan rempah otentik dalam sepiring Nasi Goreng Kampung Premium khas Warung Nusantara. Dibuat dengan resep warisan, bumbu segar, dan cinta. Tersedia di GoFood & GrabFood sekarang juga! 🛵✨\n\n#kulinerkarawang #nasigorengkampung #warungnusantara #kulinernusantara #makananindonesia #foodiesindonesia',
      designGuide: 'Visual Layout: Brand guidelines warm palette, bold Outfit font, high-contrast culinary photo center, thin glass borders.'
    },
    {
      id: 2,
      title: 'Sate Ayam Madura Legit',
      likes: '480',
      comments: '35',
      reach: '3,890',
      engagement: '780',
      tag: 'Promo Post',
      color: 'linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%)',
      caption: '🍢 SATE AYAM MADURA PROMO BELI 2 GRATIS 1! Potongan daging ayam tebal, bumbu kacang gurih legit yang melimpah, disajikan hangat dengan lontong daun segar. Khusus pemesanan via WA hari ini! Jangan sampai kehabisan ya Sahabat Kuliner! 🚀❤\n\n#sateayam #satemadura #promokuliner #karawangfood #kulinerlokal #makanansedap #jajanankarawang',
      designGuide: 'Visual Layout: Dynamic discount ribbon banner, bold violet glow, call-to-action WhatsApp logo placement, product close-up overlay.'
    },
    {
      id: 3,
      title: 'Es Cendol Durian Segar',
      likes: '620',
      comments: '58',
      reach: '5,120',
      engagement: '1,020',
      tag: 'Desert Post',
      color: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
      caption: '☀ KEPANASAN SIANG HARI? Segarkan harimu dengan Es Cendol Durian premium! Cendol pandan alami kenyal, kuah santan gurih, gula jawa asli, ditambah topping daging buah durian montong yang legit manis. Dijamin langsung melek! 🤤🍧\n\n#escendol #cendoldurian #durianmontong #minumansegar #kulinersegar #cendolpremium #esnusantara',
      designGuide: 'Visual Layout: Fresh organic green gradients, custom tropical elements vector overlay, drop-shadow textual headings, summer vibe layout.'
    },
    {
      id: 4,
      title: 'Tumpeng Mini Nusantara',
      likes: '420',
      comments: '28',
      reach: '3,210',
      engagement: '650',
      tag: 'Event Post',
      color: 'linear-gradient(135deg, #f12711 0%, #f5af19 100%)',
      caption: '🎉 SYUKURAN LEBIH BERMAKNA! Tumpeng Mini Nusantara siap mendampingi momen spesial ulang tahun, arisan, atau gathering Anda. Disusun higienis dengan lauk lengkap cita rasa otentik yang lezat. Pesan H-2 via Direct Message! 🍱✨\n\n#tumpengmini #tumpengkarawang #syukuran #nasitumpeng #kateringkarawang #nasiboxkarawang #tumpengmurah',
      designGuide: 'Visual Layout: Gold border elegance, high-end culinary plating presentation focal, standard order timeline checklist infographic.'
    }
  ];

  return (
    <div style={{ minHeight: '100vh', padding: '6rem 0 4rem 0', position: 'relative' }}>
      {/* Background visual spheres */}
      <div className="ambient-glows">
        <div className="glow-bubble glow-bubble-3" style={{ top: '-80px', left: '15%' }}></div>
        <div className="glow-bubble glow-bubble-1" style={{ bottom: '10%', right: '-150px' }}></div>
      </div>

      <div className="container" style={{ maxWidth: '1000px' }}>
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
            Social Media <span className="text-gradient">Content Grid</span> Simulator
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>
            Explore my marketing work for "Warung Nusantara". Click on any post card to inspect Canva visual templates, captions, and hashtag strategies.
          </p>
        </div>

        {/* Instagram Interface Mockup Layout */}
        <div 
          className="glass-panel"
          style={{
            maxWidth: '850px',
            margin: '0 auto',
            borderRadius: '24px',
            overflow: 'hidden',
            border: '1px solid var(--glass-border)',
            padding: '2.5rem'
          }}
        >
          {/* Mock Instagram Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '3rem',
            borderBottom: '1px solid var(--glass-border)',
            paddingBottom: '2rem',
            marginBottom: '2rem',
            flexWrap: 'wrap'
          }}>
            {/* Avatar */}
            <div style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: 'var(--gradient-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '3rem',
              boxShadow: 'var(--shadow-md)'
            }}>
              🍱
            </div>

            {/* Profile Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>warung.nusantara</h3>
                <span className="project-tag" style={{ fontSize: '0.75rem' }}>Business VA Managed</span>
              </div>
              <div style={{ display: 'flex', gap: '2rem', fontSize: '0.95rem' }}>
                <span><strong>240</strong> posts</span>
                <span><strong>12.4k</strong> followers</span>
                <span><strong>320</strong> following</span>
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '0.95rem' }}>Warung Nusantara Culinary</strong>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Managed by Virtual Assistant &bull; Growth: +40% Reach in 3 Months</span>
              </div>
            </div>
          </div>

          {/* Grid Content / Post Details split */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: selectedPost ? '1fr 1fr' : '1fr',
            gap: '2.5rem',
            transition: 'all 0.3s ease'
          }}>
            {/* Instagram Post Grid */}
            <div>
              <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '1.25rem', fontWeight: 700 }}>
                Visual Feed Grid / Klik Post untuk Detail
              </h4>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1rem'
              }}>
                {posts.map((post) => (
                  <div
                    key={post.id}
                    onClick={() => setSelectedPost(post)}
                    style={{
                      height: '160px',
                      borderRadius: '12px',
                      background: post.color,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'transform 0.3s ease',
                      border: selectedPost?.id === post.id ? '3px solid var(--accent-secondary)' : '1px solid var(--glass-border)'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.03)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                  >
                    <div style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: '0.5rem',
                      background: 'rgba(0, 0, 0, 0.65)',
                      color: '#ffffff',
                      fontSize: '0.75rem',
                      textAlign: 'center',
                      fontWeight: 700
                    }}>
                      {post.title}
                    </div>
                    <span style={{ fontSize: '3rem' }}>
                      {post.id === 1 ? '🍛' : post.id === 2 ? '🍢' : post.id === 3 ? '🍧' : '🍱'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Post Detail Inspector */}
            {selectedPost && (
              <div style={{
                background: 'rgba(0,0,0,0.12)',
                border: '1px solid var(--glass-border)',
                borderRadius: '16px',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
                animation: 'fade-in 0.3s ease'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)' }}>
                    🔎 Post Copy Inspector
                  </h4>
                  <button
                    onClick={() => setSelectedPost(null)}
                    style={{ background: 'transparent', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontWeight: 700, fontSize: '0.8rem' }}
                  >
                    Close &times;
                  </button>
                </div>

                {/* Canva Template Specs */}
                <div>
                  <h5 style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--accent-secondary)', fontWeight: 800, marginBottom: '0.25rem' }}>
                    Canva Graphics Specs
                  </h5>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                    {selectedPost.designGuide}
                  </p>
                </div>

                {/* Localized Copywriting Caption */}
                <div>
                  <h5 style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--accent-secondary)', fontWeight: 800, marginBottom: '0.25rem' }}>
                    Copywriting Caption
                  </h5>
                  <div style={{
                    background: 'var(--bg-primary)',
                    border: '1px solid var(--glass-border)',
                    padding: '1rem',
                    borderRadius: '10px',
                    fontSize: '0.85rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.5,
                    maxHeight: '140px',
                    overflowY: 'auto',
                    whiteSpace: 'pre-line'
                  }}>
                    {selectedPost.caption}
                  </div>
                </div>

                {/* Performance analytics metrics */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '0.75rem',
                  borderTop: '1px solid var(--glass-border)',
                  paddingTop: '1rem'
                }}>
                  <div style={{ background: 'var(--bg-secondary)', padding: '0.5rem', borderRadius: '8px', textAlign: 'center', border: '1px solid var(--glass-border)' }}>
                    <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Likes / Comments</span>
                    <strong style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>♥ {selectedPost.likes} / 💬 {selectedPost.comments}</strong>
                  </div>
                  <div style={{ background: 'var(--bg-secondary)', padding: '0.5rem', borderRadius: '8px', textAlign: 'center', border: '1px solid var(--glass-border)' }}>
                    <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Est. Post Reach</span>
                    <strong style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>🎯 {selectedPost.reach}</strong>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaPage;
