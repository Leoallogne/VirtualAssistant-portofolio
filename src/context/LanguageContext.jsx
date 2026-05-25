import React, { createContext, useState, useEffect } from 'react';

export const LanguageContext = createContext();

export const translations = {
  id: {
    // Navbar
    navHome: "Beranda",
    navAbout: "Tentang",
    navProjects: "Proyek",
    navServices: "Layanan",
    navContact: "Kontak",
    
    // Hero
    heroWelcome: "Selamat Datang di Portofolio Saya",
    heroIntro: "Hai, saya",
    heroDesc: "Membangun aplikasi web berperforma tinggi, elegan, dan menakjubkan secara visual. Memadukan arsitektur kode yang bersih dengan interaksi UI/UX modern kelas premium.",
    heroBtnExplore: "Eksplorasi Karya",
    heroBtnContact: "Hubungi Saya",
    heroRoles: [
      "Fullstack Developer Kreatif",
      "Spesialis UI/UX",
      "Pemecah Masalah Inovatif"
    ],

    // Tech stack carousel title
    techTitle: "Spesialisasi Teknologi",

    // About
    aboutTag: "Sekilas Tentang Perjalanan Saya",
    aboutTitle: "Tentang",
    aboutDesc: "Seorang kreator yang menjembatani keandalan performa teknis dengan estetika visual yang halus. Saya membangun perangkat lunak yang bekerja cepat dan terlihat memukau.",
    aboutPhilosophyTitle: "Filosofi Kreatif",
    aboutPhilosophyDesc: "Saya percaya bahwa desain hebat bukan sekadar bagaimana sesuatu terlihat, melainkan bagaimana ia berfungsi dan dirasakan. Setiap milidetik latensi yang dihemat dan setiap mikro-animasi yang ditambahkan meningkatkan pengalaman digital secara keseluruhan, meninggalkan impresi positif bagi pengguna.",
    aboutStatsExp: "Tahun Pengalaman",
    aboutStatsDone: "Proyek Selesai",
    aboutStatsClients: "Klien Puas",
    aboutCapabilities: "Kapabilitas Utama",
    aboutBtnResume: "Unduh Resume & Obrol",
    aboutTimeline: [
      {
        date: "2024 - Sekarang",
        title: "Developer Frontend Senior",
        org: "Vanguard Systems Lab",
        desc: "Merancang sistem desain glassmorphic mutakhir, mengoptimalkan kinerja aplikasi React, dan memimpin tim pengembang beranggotakan 6 orang untuk lini produk inti."
      },
      {
        date: "2022 - 2024",
        title: "Software Engineer Fullstack",
        org: "PixelPerfect Solutions",
        desc: "Membangun integrasi awan kustom, layanan mikro RESTful backend, dan antarmuka dasbor interaktif menggunakan Node.js, Express, dan React."
      },
      {
        date: "2019 - 2022",
        title: "Ilmu Komputer & Rekayasa Perangkat Lunak",
        org: "Universitas Nusantara",
        desc: "Lulus dengan predikat sangat memuaskan. Spesialisasi dalam antarmuka manusia-komputer, alur rendering visual, dan arsitektur perangkat lunak tingkat lanjut."
      }
    ],

    // Services
    servicesTag: "Spesialisasi Kunci",
    servicesTitle: "Apa Yang Saya",
    servicesTitleBold: "Berikan",
    servicesDesc: "Menyediakan layanan rekayasa web ujung-ke-ujung (end-to-end) yang menyelaraskan skalabilitas teknis dengan tata letak visual modern.",
    servicesData: [
      {
        title: "Rekayasa Frontend",
        desc: "Merancang Aplikasi Halaman Tunggal (SPA) berkinerja tinggi menggunakan React. Berfokus pada pengelolaan state yang bersih, komponen modular, dan kecepatan muat maksimal."
      },
      {
        title: "Integrasi API Fullstack",
        desc: "Mengembangkan infrastruktur server yang tangguh, gerbang RESTful/GraphQL yang aman, serta kueri database berlatensi rendah dengan Node.js, Express, SQL, dan NoSQL."
      },
      {
        title: "Keamanan & Autentikasi",
        desc: "Menerapkan JSON Web Tokens (JWT), tingkat akses berbasis peran, pelindung CSRF, serta enkripsi database untuk melindungi seluruh titik sensitif aplikasi."
      },
      {
        title: "Optimasi Kinerja (SEO)",
        desc: "Mengoptimalkan bundel aset, memisahkan bundel kode, menerapkan kompresi gambar modern, dan optimasi SEO guna meraih skor Lighthouse 100/100."
      }
    ],

    // Projects
    projectsTag: "Galeri Portofolio",
    projectsTitle: "Proyek",
    projectsTitleBold: "Pilihan",
    projectsDesc: "Kumpulan platform siap produksi pilihan, berfokus pada konsistensi visual, responsivitas, dan animasi antarmuka mutakhir.",
    projectsBtnView: "Lihat Spesifikasi",
    projectsFilterAll: "Semua Proyek",
    projectsFilterFrontend: "Frontend",
    projectsFilterBackend: "Backend",
    projectsFilterDesign: "Desain UI/UX",
    projectsData: [
      {
        title: 'Platform E-Commerce Nova',
        desc: 'Platform belanja e-commerce super cepat dengan kartu grid glassmorphic dinamis, animasi item yang mulus, dan fitur keranjang belanja lengkap.',
        longDesc: 'Nova Commerce adalah etalase web canggih yang dirancang untuk memberikan kinerja belanja desktop dan seluler terbaik. Mengintegrasikan tema CSS variabel responsif, wadah mesh gradien HSL yang halus, dan transisi cair untuk menjaga keterlibatan pengguna, mendorong nilai web vitals ke angka sempurna 100.',
        role: 'Pimpinan Pengembang UI/UX',
        client: 'NovaRetail Inc.',
        duration: '4 Bulan (2025)',
        stack: 'React, Vite, Sistem HSL-CSS, Redux Toolkit',
        features: [
          'Mesin pencarian & penyortiran katalog kustom sub-milidetik',
          'Checkout bilah sisi glassmorphism dinamis dengan integrasi kanvas fluid',
          'Sinkronisasi state terpadu untuk kalkulasi harga dan pajak instan',
          'Mode terang dan gelap responsif yang menyesuaikan pengaturan sistem operasi pengguna'
        ]
      },
      {
        title: 'Manajemen Tugas Chronos',
        desc: 'Perencana tugas kolaboratif real-time yang dibangun dengan instans server WebSocket persisten dan kartu modular.',
        longDesc: 'Chronos menjembatani kesenjangan antara perencanaan proyek dan pelacakan langsung dengan fidelitas tinggi. Beroperasi pada kluster WebSocket yang sangat cepat, mengirimkan pembaruan muatan instan untuk menjaga semua pemangku kepentingan tetap sinkron tanpa perlu memuat ulang halaman secara manual.',
        role: 'Arsitek Fullstack',
        client: 'ChronosLabs Inc.',
        duration: '5 Bulan (2024)',
        stack: 'React, WebSockets, Node.js, Express, MongoDB',
        features: [
          'Penyiaran data WebSocket real-time dengan pemulihan koneksi otomatis',
          'Papan kanban seret-dan-lepas kustom menggunakan pembungkus API HTML5 asli',
          'Izin pengguna granular dan skema otorisasi JSON Web Token yang aman',
          'Layar metrik interaktif yang menampilkan indikator pencapaian tugas kanvas dinamis'
        ]
      },
      {
        title: 'Aplikasi Meditasi Aura',
        desc: 'Platform kebugaran mental yang memukau, mengutamakan tata letak yang menenangkan, latar belakang mesh HSL yang halus, dan siklus pernapasan interaktif.',
        longDesc: 'Aura dirancang untuk memaksimalkan ketenangan mental melalui perangkat lunak. Dibangun di atas kerangka kerja tata letak visual ketat yang mengutamakan ruang kosong mutlak, latar belakang gradien hangat kustom, dan sistem bantuan pernapasan melingkar yang sinkron menggunakan pengatur waktu requestAnimationFrame.',
        role: 'Desainer & Pembuat Prototipe Tunggal',
        client: 'Aura Health LLC',
        duration: '3 Bulan (2024)',
        stack: 'Token Desain Figma, React Hooks, Keyframes CSS',
        features: [
          'Latar belakang mesh animasi HSL kustom yang cocok dengan pola diurnal (pagi, sore, malam)',
          'Alat bantu gelembung pernapasan dengan loop transisi audio-visual yang presisi',
          'Dasbor widget kustom yang menunjukkan tolok ukur kemajuan meditasi pengguna',
          'Paket ikon kustom yang disimpan sebagai definisi SVG inline React yang bersih'
        ]
      },
      {
        title: 'Dasbor Analitik Vortex',
        desc: 'Layar telemetri futuristik dengan grafik bercahaya dinamis dan visualisasi metrik prediksi ML real-time.',
        longDesc: 'Vortex mengurai aliran data bervolume tinggi untuk menyajikan prediksi pembelajaran mesin yang jelas. Merender grafik visual SVG yang cantik dan sepenuhnya responsif secara asli, mempertahankan kinerja ekstrem tanpa membebani peramban dengan pustaka grafik yang besar.',
        role: 'Developer Senior',
        client: 'Vortex Data Science Group',
        duration: '6 Bulan (2025)',
        stack: 'React, Algoritma bagan SVG Inline, Integrasi REST API',
        features: [
          'Penggambaran grafik SVG ringan kustom yang mendukung pembesaran dan titik fokus',
          'Pengumpulan data berlatensi rendah yang berjalan di dalam Web Workers HTML5 yang dioptimalkan',
          'Tata letak yang sepenuhnya dapat disesuaikan dengan komponen modular dasbor yang dikelola pengguna',
          'Vektor cahaya dinamis yang memetakan anomali data dan pergeseran struktural secara instan'
        ]
      }
    ],

    // Certifications
    certsTag: "Sertifikasi Profesional",
    certsTitle: "Kredensial",
    certsTitleBold: "Terverifikasi",
    certsDesc: "Daftar kompetensi resmi dan spesialisasi teknologi yang dikeluarkan oleh lembaga industri terpercaya.",
    certsVerifyBtn: "Verifikasi Kredensial",

    // Testimonials
    testiTag: "Rekomendasi Klien",
    testiTitle: "Apa Kata",
    testiTitleBold: "Klien",
    testiDesc: "Ulasan dari rekan kerja dan klien mengenai kolaborasi rekayasa perangkat lunak dan manajemen proyek.",

    // Blog
    blogTag: "Catatan & Gagasan",
    blogTitle: "Artikel",
    blogTitleBold: "Teknologi",
    blogDesc: "Berbagi pemikiran tentang performa frontend, optimasi arsitektur sistem, dan inovasi visual.",
    blogReadTime: "Menit Membaca",
    blogBtnRead: "Baca Artikel Lengkap",

    // Contact
    contactTag: "Mari Berkolaborasi",
    contactTitle: "Hubungi",
    contactTitleBold: "Saya",
    contactDesc: "Memiliki konsep proyek yang menarik, lowongan posisi kerja, atau ingin berdiskusi teknologi? Kirim pesan dan mari kita bangun bersama.",
    contactDetailsTitle: "Detail Kontak",
    contactDetailsDesc: "Silakan hubungi saya melalui email atau hubungkan dengan saya di berbagai jejaring sosial profesional. Saya biasanya membalas dalam waktu 24 jam.",
    contactFormTitle: "Kirim Pesan",
    contactFormNameLabel: "Nama Lengkap",
    contactFormEmailLabel: "Alamat Email",
    contactFormSubjectLabel: "Subjek",
    contactFormMsgLabel: "Detail Pesan",
    contactFormBtnSend: "Kirim Transmisi",
    contactFormBtnSending: "Mengirim Transmisi...",
    contactFormSuccessTitle: "Pesan Terkirim!",
    contactFormSuccessDesc: "Terima kasih! Saya akan segera menghubungi Anda.",

    // Footer
    footerRights: "Hak Cipta Dilindungi. Warisan Indonesia & Teknologi."
  },
  en: {
    // Navbar
    navHome: "Home",
    navAbout: "About",
    navProjects: "Projects",
    navServices: "Services",
    navContact: "Contact",
    
    // Hero
    heroWelcome: "Welcome to my portfolio",
    heroIntro: "Hi, I am",
    heroDesc: "Crafting elegant, high-performance, and visually outstanding web applications. Combining clean, robust architecture with premium modern UI/UX interactions.",
    heroBtnExplore: "Explore Work",
    heroBtnContact: "Get In Touch",
    heroRoles: [
      "Creative Fullstack Developer",
      "UI/UX Specialist",
      "Innovative Problem Solver"
    ],

    // Tech stack carousel title
    techTitle: "Tech Specializations",

    // About
    aboutTag: "A Glance at My Journey",
    aboutTitle: "About",
    aboutDesc: "A passionate builder bridging the gap between rigorous technical performance and refined visual aesthetics. I create software that runs quickly and looks gorgeous.",
    aboutPhilosophyTitle: "Creative Philosophy",
    aboutPhilosophyDesc: "I believe that great design is not just how something looks, but how it works and feels. Every millisecond of latency saved and every micro-animation added improves the overall digital experience, creating a lasting positive impression for users.",
    aboutStatsExp: "Years Exp.",
    aboutStatsDone: "Completed Projects",
    aboutStatsClients: "Happy Clients",
    aboutCapabilities: "Core Capabilities",
    aboutBtnResume: "Get Resume & Chat",
    aboutTimeline: [
      {
        date: "2024 - Present",
        title: "Senior Frontend Developer",
        org: "Vanguard Systems Lab",
        desc: "Architecting cutting-edge glassmorphic design systems, refining React application performance, and spearheading a team of 6 engineers on core product lines."
      },
      {
        date: "2022 - 2024",
        title: "Fullstack Software Engineer",
        org: "PixelPerfect Solutions",
        desc: "Built custom cloud integrations, RESTful backend microservices, and interactive dashboard frontends using Node.js, Express, and React."
      },
      {
        date: "2019 - 2022",
        title: "Computer Science & Software Engineering",
        org: "Nusantara University",
        desc: "Graduated with high honors. Specialized in human-computer interfaces, visual rendering pipelines, and advanced software architectures."
      }
    ],

    // Services
    servicesTag: "Key Specialities",
    servicesTitle: "What I",
    servicesTitleBold: "Deliver",
    servicesDesc: "Providing robust end-to-end web engineering that matches technical scalability with highly refined, visual interface design layouts.",
    servicesData: [
      {
        title: "Frontend Engineering",
        desc: "Architecting high-scale, fully responsive Single Page Applications (SPAs) in React. Focusing on clean state management, modular components, and fast rendering speeds."
      },
      {
        title: "Fullstack API Integrations",
        desc: "Developing robust server infrastructures, secure RESTful/GraphQL gateways, and low-latency database queries in Node.js, Express, SQL, and NoSQL databases."
      },
      {
        title: "Security & Authentication",
        desc: "Implementing JSON Web Tokens (JWT), role-based access levels, CSRF shielding, security measures, and database encryption models to safeguard all application points."
      },
      {
        title: "Performance Tuning (SEO)",
        desc: "Optimizing resource bundles, configuring lazy loads, caching architectures, and implementing SEO meta hierarchies to achieve perfect 100/100 Lighthouse benchmark ratings."
      }
    ],

    // Projects
    projectsTag: "Showcase portfolio",
    projectsTitle: "Featured",
    projectsTitleBold: "Projects",
    projectsDesc: "A handpicked selection of production-ready platforms, focusing on visual consistency, responsiveness, and state-of-the-art animations.",
    projectsBtnView: "View Specifications",
    projectsFilterAll: "All Projects",
    projectsFilterFrontend: "Frontend",
    projectsFilterBackend: "Backend",
    projectsFilterDesign: "UI/UX Design",
    projectsData: [
      {
        title: 'Nova Commerce Platform',
        desc: 'An ultra-fast e-commerce shopping platform featuring stunning dynamic glassmorphic card grids, fluid item animations, and full basket functionalities.',
        longDesc: 'Nova Commerce is a state-of-the-art web storefront conceptualized to deliver unmatched desktop and mobile shopping performance. It integrates responsive CSS variable themes, smooth HSL gradient mesh containers, and fluid transitions to keep users highly engaged, pushing web vitals score to a perfect 100.',
        role: 'Lead UI/UX Developer',
        client: 'NovaRetail Inc.',
        duration: '4 Months (2025)',
        stack: 'React, Vite, HSL-CSS System, Redux Toolkit',
        features: [
          'Sub-millisecond custom catalog search & sorting engines',
          'Dynamic glassmorphism sidebar checkout with fluid canvas integrations',
          'Unified context-state synchronizer for instant price and tax re-calculations',
          'Responsive light and dark modes custom tailored to user OS settings'
        ]
      },
      {
        title: 'Chronos Task Management',
        desc: 'Real-time collaborative task planner built with persistent WebSocket server instances and modular cards.',
        longDesc: 'Chronos bridges the gap between project planning and high-fidelity live tracking. It operates on a lightning-fast WebSocket cluster, sending instantaneous payload updates to keep all logged-in stakeholders synchronized without requesting manual database refreshes.',
        role: 'Fullstack Architect',
        client: 'ChronosLabs Inc.',
        duration: '5 Months (2024)',
        stack: 'React, WebSockets, Node.js, Express, MongoDB',
        features: [
          'Real-time WebSocket data broadcast with automatic reconnect fallbacks',
          'Custom drag-and-drop kanban boards using native HTML5 API wrappers',
          'Granular user permissions and secure JSON Web Token authorization schemas',
          'Interactive metrics screen featuring dynamic canvas task accomplishment indicators'
        ]
      },
      {
        title: 'Aura Meditation App',
        desc: 'A gorgeous mental wellness landing platform prioritizing calming layouts, smooth HSL mesh backdrops, and interactive breathing loops.',
        longDesc: 'Aura is designed to maximize mental calm through software. Built on a strict visual layout framework prioritizing absolute white space, custom warm gradient mesh backgrounds, and a circular breathing assist system that synchronizes using requestAnimationFrame timers.',
        role: 'Sole Designer & Prototyper',
        client: 'Aura Health LLC',
        duration: '3 Months (2024)',
        stack: 'Figma Design Tokens, React Hooks, CSS Keyframes',
        features: [
          'Custom HSL animated mesh background matching diurnal patterns (morning, evening, night)',
          'Breathing bubble helper with precise audio-visual transition loops',
          'Highly custom dashboard widgets showing user progress benchmarks',
          'Bespoke, scalable icon design kit saved as clean react-inline SVG definitions'
        ]
      },
      {
        title: 'Vortex Analytics Dashboard',
        desc: 'Futuristic telemetry screen featuring dynamic glowing graphs and real-time ML prediction metrics visualization.',
        longDesc: 'Vortex parses high-volume data streams to present clear machine learning predictions. It renders gorgeous, fully responsive SVG visual graphs natively, maintaining extreme performance without loading high-overhead charting libraries.',
        role: 'Senior Developer',
        client: 'Vortex Data Science Group',
        duration: '6 Months (2025)',
        stack: 'React, Inline SVG charting algorithms, REST integrations',
        features: [
          'Bespoke lightweight SVG chart rendering supporting zoom and focal points',
          'Low-latency data pooling running inside optimized HTML5 Web Workers',
          'Fully customizable layouts with user-managed dashboard modular components',
          'Dynamic glow vectors mapping data anomalies and structural shifts instantly'
        ]
      }
    ],

    // Certifications
    certsTag: "Professional Credentials",
    certsTitle: "Verified",
    certsTitleBold: "Certifications",
    certsDesc: "Official validations of technical engineering capacities and visual system proficiencies.",
    certsVerifyBtn: "Verify Credential",

    // Testimonials
    testiTag: "Client Recommendations",
    testiTitle: "Testimonials &",
    testiTitleBold: "Feedback",
    testiDesc: "Endorsements from engineering peers, managers, and clients detailing successful product collaborations.",

    // Blog
    blogTag: "Thoughts & Notes",
    blogTitle: "Recent",
    blogTitleBold: "Articles",
    blogDesc: "Sharing design ideas, systems engineering findings, and deep dives into CSS performance configurations.",
    blogReadTime: "Min Read",
    blogBtnRead: "Read Full Article",

    // Contact
    contactTag: "Let's Collaborate",
    contactTitle: "Get In",
    contactTitleBold: "Touch",
    contactDesc: "Have a exciting project blueprint, a role opening, or simply want to exchange ideas? Send a message and let's craft something premium together.",
    contactDetailsTitle: "Contact Details",
    contactDetailsDesc: "Feel free to reach out via email or connect with me across my professional handles. I usually respond within 24 hours.",
    contactFormTitle: "Send Message",
    contactFormNameLabel: "Full Name",
    contactFormEmailLabel: "Email Address",
    contactFormSubjectLabel: "Subject",
    contactFormMsgLabel: "Message Details",
    contactFormBtnSend: "Submit Form",
    contactFormBtnSending: "Sending Transmission...",
    contactFormSuccessTitle: "Message Transmitted!",
    contactFormSuccessDesc: "Thank you! I will get in touch with you shortly.",

    // Footer
    footerRights: "All rights reserved. Indonesian Heritage & Technology."
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  // Detect and set default language from settings on load
  useEffect(() => {
    const savedLang = localStorage.getItem('language');
    if (savedLang) {
      setLanguage(savedLang);
    } else {
      const browserLang = navigator.language || navigator.userLanguage;
      if (browserLang.startsWith('id')) {
        setLanguage('id');
      } else {
        setLanguage('en');
      }
    }
  }, []);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
