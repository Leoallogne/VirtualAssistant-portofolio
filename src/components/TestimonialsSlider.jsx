import React, { useState, useEffect, useContext, useRef } from 'react';
import { LanguageContext } from '../context/LanguageContext';

const TestimonialsSlider = () => {
  const { t } = useContext(LanguageContext);
  const [activeIndex, setActiveIndex] = useState(0);
  const isHovered = useRef(false);

  const testimonials = [
    {
      name: 'Sarah Kurniawan',
      role: 'VP of Engineering',
      org: 'Vanguard Systems Lab',
      stars: 5,
      comment: {
        id: 'Leo adalah developer frontend terbaik yang pernah bekerja bersama saya. Kodenya sangat terstruktur, kecepatannya luar biasa, dan perhatiannya terhadap detail animasi micro-interaction membuat seluruh produk kami terasa premium.',
        en: 'Leo is hands down the best frontend engineer I have worked with. His code architecture is clean, execution is extremely fast, and his focus on minor micro-animations makes our entire web application feel premium.'
      }
    },
    {
      name: 'David Miller',
      role: 'Product Director',
      org: 'PixelPerfect Solutions',
      stars: 5,
      comment: {
        id: 'Kami mempekerjakan Leo untuk mendesain ulang dasbor telemetri kami. Dia merampungkannya lebih cepat dari jadwal, menghasilkan skor Lighthouse 100/100, dan pengguna kami sangat menyukai antarmuka glassmorphic baru yang dibuatnya.',
        en: 'We hired Leo to build our telemetry analytics dashboard. He finished ahead of schedule, achieved a perfect 100/100 Lighthouse score, and our enterprise users absolutely adore the new fluid glassmorphic interfaces.'
      }
    },
    {
      name: 'Rian Prasetya',
      role: 'Founder & CEO',
      org: 'Aura Health LLC',
      stars: 5,
      comment: {
        id: 'Leo menggabungkan sisi teknis rekayasa kode dengan cita rasa desain kelas atas secara sempurna. Dia mandiri, komunikatif, dan mampu menerjemahkan konsep visual rumit menjadi kode React yang sangat responsif.',
        en: 'Leo perfectly bridges high-performance code engineering with world-class design taste. He is highly proactive, extremely communicative, and translates abstract visual designs into fluid, responsive React components.'
      }
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      // Auto cycle index only when user is NOT hovering
      if (!isHovered.current) {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section id="testimonials" style={{ background: 'var(--bg-secondary)', position: 'relative', overflow: 'hidden' }}>
      {/* Decorative ambient bubble background */}
      <div className="ambient-glows">
        <div className="glow-bubble glow-bubble-1" style={{ bottom: '-100px', left: '10%' }}></div>
      </div>

      <div className="container" style={{ maxWidth: '800px' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="section-tag">{t.testiTag}</span>
          <h2 className="section-title">
            {t.testiTitle} <span className="text-gradient">{t.testiTitleBold}</span>
          </h2>
          <p className="section-desc" style={{ margin: '0 auto' }}>
            {t.testiDesc}
          </p>
        </div>

        {/* Carousel slide box */}
        <div 
          className="glass-panel"
          style={{
            padding: '3rem',
            borderRadius: '24px',
            textAlign: 'center',
            position: 'relative',
            cursor: 'default',
            boxShadow: 'var(--shadow-lg), 0 0 20px var(--accent-glow)',
            border: '1px solid var(--glass-border)'
          }}
          onMouseEnter={() => { isHovered.current = true; }}
          onMouseLeave={() => { isHovered.current = false; }}
        >
          {/* Quote Mark Visual Icon */}
          <div style={{
            fontSize: '5rem',
            lineHeight: 1,
            fontFamily: 'var(--font-heading)',
            color: 'var(--accent)',
            opacity: 0.15,
            position: 'absolute',
            top: '1rem',
            left: '2rem',
            userSelect: 'none'
          }}>
            “
          </div>

          {/* Active testimony display with CSS fade transitions */}
          <div style={{ minHeight: '140px', transition: 'all 0.5s ease' }}>
            {/* Stars rating */}
            <div style={{ display: 'flex', gap: '0.25rem', justifyContent: 'center', marginBottom: '1.5rem' }}>
              {Array.from({ length: testimonials[activeIndex].stars }).map((_, i) => (
                <span key={i} style={{ color: '#F59E0B', fontSize: '1.25rem' }}>★</span>
              ))}
            </div>

            <p style={{
              fontSize: '1.15rem',
              lineHeight: 1.7,
              color: 'var(--text-main)',
              fontStyle: 'italic',
              marginBottom: '2rem'
            }}>
              "{t.contactFormSuccessTitle.includes('Terkirim') ? testimonials[activeIndex].comment.id : testimonials[activeIndex].comment.en}"
            </p>

            <h3 style={{
              fontSize: '1.25rem',
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              color: 'var(--text-main)',
              marginBottom: '0.25rem'
            }}>
              {testimonials[activeIndex].name}
            </h3>

            <p style={{
              fontSize: '0.9rem',
              fontWeight: 600,
              color: 'var(--accent-secondary)'
            }}>
              {testimonials[activeIndex].role} &mdash; <span style={{ color: 'var(--text-muted)' }}>{testimonials[activeIndex].org}</span>
            </p>
          </div>

          {/* Carousel selectors dots */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.75rem',
            marginTop: '2.5rem'
          }}>
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                aria-label={`Show testimony ${index + 1}`}
                style={{
                  width: activeIndex === index ? '28px' : '10px',
                  height: '10px',
                  borderRadius: '10px',
                  backgroundColor: activeIndex === index ? 'var(--accent)' : 'var(--bg-tertiary)',
                  border: '1px solid var(--glass-border)',
                  cursor: 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: activeIndex === index ? '0 0 10px var(--accent-glow)' : 'none'
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSlider;
