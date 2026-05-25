import React, { createContext, useState, useEffect } from 'react';

export const LanguageContext = createContext();

export const translations = {
  id: {
    // Navbar
    navHome: "Beranda",
    navAbout: "Tentang",
    navProjects: "Portofolio",
    navServices: "Layanan",
    navContact: "Kontak",
    
    // Hero
    heroWelcome: "Selamat Datang di Portofolio Saya",
    heroIntro: "Halo, saya",
    heroDesc: "Membantu bisnis dan individu bekerja lebih efisien dari jarak jauh. Spesialis manajemen administrasi, email, jadwal, dan operasional harian — sehingga Anda bisa fokus pada hal yang lebih penting.",
    heroBtnExplore: "Lihat Layanan Saya",
    heroBtnContact: "Hubungi Saya",
    heroRoles: [
      "Virtual Assistant Profesional",
      "Spesialis Admin & Email",
      "Pengelola Jadwal & Proyek",
      "VA Social Media"
    ],

    // Tech stack carousel title
    techTitle: "Tools Yang Saya Kuasai",

    // About
    aboutTag: "Kenalan Dengan Saya",
    aboutTitle: "Tentang",
    aboutDesc: "VA berpengalaman yang membantu klien lokal dan internasional mengelola operasional bisnis harian secara remote. Teliti, responsif, dan proaktif.",
    aboutPhilosophyTitle: "Pendekatan Kerja Saya",
    aboutPhilosophyDesc: "Saya percaya bahwa seorang VA yang baik bukan hanya mengerjakan tugas — tapi memahami prioritas klien dan mengantisipasi kebutuhan sebelum diminta. Saya bekerja dengan standar komunikasi tinggi, selalu on-time, dan terbuka untuk beradaptasi dengan workflow klien.",
    aboutStatsExp: "Tahun Pengalaman",
    aboutStatsDone: "Tugas Diselesaikan",
    aboutStatsClients: "Klien Puas",
    aboutCapabilities: "Kemampuan Utama",
    aboutBtnResume: "Unduh CV & Diskusi",
    aboutTimeline: [
      {
        date: "2024 - Sekarang",
        title: "Virtual Assistant Freelance",
        org: "Klien Internasional (Upwork)",
        desc: "Mengelola inbox email, jadwal meeting, riset data, dan koordinasi proyek untuk 3–5 klien aktif secara bersamaan menggunakan Notion, Trello, dan Google Workspace."
      },
      {
        date: "2023 - 2024",
        title: "Admin & Social Media VA",
        org: "Klien Lokal (Fiverr)",
        desc: "Membantu UMKM dan personal brand mengelola konten media sosial, membuat caption, scheduling posting, serta membalas pesan dan komentar."
      },
      {
        date: "2022 - 2023",
        title: "Administrasi & Customer Service",
        org: "Pengalaman Kerja Offline",
        desc: "Pengalaman kerja di bidang administrasi kantor, pengelolaan data, dan layanan pelanggan — yang menjadi fondasi kuat untuk karier VA remote."
      }
    ],

    // Services
    servicesTag: "Apa Yang Saya Tawarkan",
    servicesTitle: "Layanan",
    servicesTitleBold: "Saya",
    servicesDesc: "Paket layanan VA yang fleksibel, disesuaikan dengan kebutuhan bisnis Anda — dari tugas harian hingga dukungan penuh operasional remote.",
    servicesData: [
      {
        title: "Manajemen Email & Jadwal",
        desc: "Mengelola inbox email, menyortir prioritas, membalas pesan rutin, dan mengatur jadwal meeting menggunakan Google Calendar atau Calendly. Pastikan tidak ada agenda yang terlewat."
      },
      {
        title: "Admin & Data Entry",
        desc: "Input data, pembuatan laporan, pengelolaan spreadsheet, riset online, dan dokumentasi. Rapi, akurat, dan tepat waktu menggunakan Google Sheets atau Microsoft Excel."
      },
      {
        title: "Social Media Management",
        desc: "Membuat konten, caption, dan jadwal posting untuk Instagram, Facebook, atau TikTok. Menggunakan Canva untuk desain visual dan Buffer/Hootsuite for scheduling."
      },
      {
        title: "Manajemen Proyek & Koordinasi",
        desc: "Membuat dan mengelola board tugas di Notion atau Trello, follow-up tim, membuat meeting notes, dan memastikan proyek berjalan sesuai timeline."
      }
    ],

    // Projects
    projectsTag: "Portofolio Kerja",
    projectsTitle: "Contoh",
    projectsTitleBold: "Pekerjaan",
    projectsDesc: "Contoh tugas nyata dan simulasi yang menggambarkan kemampuan saya sebagai VA — dari manajemen email hingga pengelolaan proyek.",
    projectsBtnView: "Lihat Detail",
    projectsFilterAll: "Semua",
    projectsFilterFrontend: "Admin",
    projectsFilterBackend: "Riset",
    projectsFilterDesign: "Social Media",
    projectsData: [
      {
        title: "Sistem Inbox Zero untuk Klien E-Commerce",
        desc: "Mengelola 80+ email masuk per hari, menyortir prioritas, membalas template standar, dan membuat laporan mingguan ringkasan komunikasi klien.",
        longDesc: "Klien memiliki toko online dengan volume email tinggi dari supplier, pelanggan, dan partner. Saya membangun sistem label, filter otomatis, dan template balasan di Gmail. Hasilnya inbox selalu bersih, response time turun dari 2 hari menjadi 3 jam.",
        role: "Email Management VA",
        client: "Toko Online (Klien Upwork)",
        duration: "3 Bulan",
        stack: "Gmail, Google Sheets, Notion",
        features: [
          "Setup sistem label dan filter otomatis Gmail",
          "Pembuatan 15+ template balasan email standar",
          "Laporan mingguan ringkasan volume dan kategori email",
          "Response time rata-rata turun 85%"
        ]
      },
      {
        title: "Pengelolaan Kalender Eksekutif",
        desc: "Mengatur jadwal meeting, panggilan klien, dan deadline proyek untuk seorang founder startup — zero double-booking selama 6 bulan.",
        longDesc: "Founder kesulitan mengatur jadwal karena meeting dari 3 zona waktu berbeda. Saya mengintegrasikan Google Calendar dengan Calendly, membuat sistem booking otomatis, dan mengirimkan reminder 24 jam sebelum setiap meeting.",
        role: "Executive VA",
        client: "Startup Founder (Remote)",
        duration: "6 Bulan",
        stack: "Google Calendar, Calendly, Slack, Zoom",
        features: [
          "Integrasi Calendly dengan Google Calendar lintas timezone",
          "Sistem reminder otomatis via email dan Slack",
          "Pengelolaan agenda harian dan mingguan",
          "Zero missed meeting selama 6 bulan penugasan"
        ]
      },
      {
        title: "Konten & Jadwal Social Media UMKM",
        desc: "Membuat 30 konten per bulan, desain visual di Canva, dan mengatur jadwal posting untuk bisnis kuliner lokal — follower naik 40% dalam 3 bulan.",
        longDesc: "UMKM kuliner tidak punya tim marketing. Saya mengambil alih pengelolaan Instagram dan Facebook, termasuk riset tren, pembuatan caption, desain konten di Canva, dan scheduling via Buffer. Engagement meningkat signifikan karena konsistensi posting.",
        role: "Social Media VA",
        client: "UMKM Kuliner, Karawang",
        duration: "3 Bulan",
        stack: "Canva, Buffer, Instagram, Facebook",
        features: [
          "30 konten/bulan: feed, story, dan reels",
          "Desain visual konsisten sesuai brand guide",
          "Riset hashtag dan tren mingguan",
          "Laporan performa bulanan (reach, engagement, follower growth)"
        ]
      },
      {
        title: "Setup Workspace & SOP Bisnis Online",
        desc: "Membantu bisnis online baru membangun sistem operasional dari nol — Notion workspace, SOP tertulis, dan template dokumen siap pakai.",
        longDesc: "Klien baru memulai bisnis dan butuh sistem yang terorganisir. Saya membangun Notion workspace lengkap dengan database klien, tracker proyek, SOP operasional, dan template email/dokumen. Hasilnya klien bisa onboard karyawan baru 3x lebih cepat.",
        role: "Operations VA",
        client: "Bisnis Jasa Digital (Baru Berdiri)",
        duration: "1 Bulan",
        stack: "Notion, Google Workspace, Canva, Loom",
        features: [
          "Notion workspace dengan 8 database terintegrasi",
          "10+ SOP tertulis untuk operasional harian",
          "Template email, invoice, dan proposal klien",
          "Video tutorial Loom untuk setiap proses utama"
        ]
      }
    ],

    // Certifications
    certsTag: "Sertifikasi & Kursus",
    certsTitle: "Kredensial",
    certsTitleBold: "Saya",
    certsDesc: "Sertifikat resmi dari kursus dan pelatihan yang membuktikan kompetensi saya sebagai Virtual Assistant profesional.",
    certsVerifyBtn: "Lihat Sertifikat",

    // Testimonials
    testiTag: "Kata Klien Saya",
    testiTitle: "Ulasan &",
    testiTitleBold: "Testimoni",
    testiDesc: "Feedback dari klien yang sudah pernah bekerja sama dengan saya.",

    // Blog
    blogTag: "Tips & Insight",
    blogTitle: "Artikel",
    blogTitleBold: "VA",
    blogDesc: "Berbagi tips produktivitas, cara kerja remote yang efektif, dan tools terbaik untuk Virtual Assistant.",
    blogReadTime: "Menit Baca",
    blogBtnRead: "Baca Selengkapnya",

    // Contact
    contactTag: "Siap Bekerja Sama?",
    contactTitle: "Hubungi",
    contactTitleBold: "Saya",
    contactDesc: "Punya tugas yang perlu didelegasikan? Butuh VA untuk membantu bisnis Anda? Kirim pesan dan saya akan balas dalam 2–4 jam.",
    contactDetailsTitle: "Info Kontak",
    contactDetailsDesc: "Hubungi saya via email atau WhatsApp. Tersedia Senin–Sabtu, pukul 08.00–21.00 WIB. Siap mulai dalam 1–2 hari kerja.",
    contactFormTitle: "Kirim Pesan",
    contactFormNameLabel: "Nama Lengkap",
    contactFormEmailLabel: "Alamat Email",
    contactFormSubjectLabel: "Kebutuhan Anda",
    contactFormMsgLabel: "Ceritakan tugas atau proyek yang ingin Anda delegasikan",
    contactFormBtnSend: "Kirim Pesan",
    contactFormBtnSending: "Mengirim...",
    contactFormSuccessTitle: "Pesan Terkirim!",
    contactFormSuccessDesc: "Terima kasih! Saya akan membalas dalam 2–4 jam.",

    // Footer
    footerRights: "Hak Cipta Dilindungi. Virtual Assistant Profesional dari Indonesia."
  },
  en: {
    // Navbar
    navHome: "Home",
    navAbout: "About",
    navProjects: "Portfolio",
    navServices: "Services",
    navContact: "Contact",
    
    // Hero
    heroWelcome: "Welcome to my portfolio",
    heroIntro: "Hello, I am",
    heroDesc: "Helping businesses and individuals work smarter remotely. Specializing in admin management, email, scheduling, and daily operations — so you can focus on what matters most.",
    heroBtnExplore: "View My Services",
    heroBtnContact: "Contact Me",
    heroRoles: [
      "Professional Virtual Assistant",
      "Admin & Email Specialist",
      "Schedule & Project Manager",
      "Social Media VA"
    ],

    // Tech stack carousel title
    techTitle: "Tools I Master",

    // About
    aboutTag: "Get to Know Me",
    aboutTitle: "About",
    aboutDesc: "An experienced VA helping local and international clients manage daily remote business operations. Detail-oriented, responsive, and proactive.",
    aboutPhilosophyTitle: "My Work Approach",
    aboutPhilosophyDesc: "I believe a good VA doesn't just do tasks — but understands client priorities and anticipates needs before being asked. I work with high communication standards, always on time, and open to adapting to the client's workflow.",
    aboutStatsExp: "Years Exp.",
    aboutStatsDone: "Tasks Resolved",
    aboutStatsClients: "Happy Clients",
    aboutCapabilities: "Core Capabilities",
    aboutBtnResume: "Download CV & Discuss",
    aboutTimeline: [
      {
        date: "2024 - Present",
        title: "Freelance Virtual Assistant",
        org: "International Clients (Upwork)",
        desc: "Managing email inboxes, meeting schedules, data research, and project coordination for 3–5 active clients simultaneously using Notion, Trello, and Google Workspace."
      },
      {
        date: "2023 - 2024",
        title: "Admin & Social Media VA",
        org: "Local Clients (Fiverr)",
        desc: "Helping MSMEs and personal brands manage social media content, creating captions, scheduling posts, and replying to messages and comments."
      },
      {
        date: "2022 - 2023",
        title: "Administration & Customer Service",
        org: "Offline Experience",
        desc: "Office administration, data management, and customer service experience — forming a strong foundation for a remote VA career."
      }
    ],

    // Services
    servicesTag: "What I Offer",
    servicesTitle: "My",
    servicesTitleBold: "Services",
    servicesDesc: "Flexible VA services packages customized to your business needs — from daily tasks to full remote operations support.",
    servicesData: [
      {
        title: "Email & Calendar Management",
        desc: "Manage email inboxes, sort priorities, reply to routine messages, and organize meeting schedules using Google Calendar or Calendly. Ensure no agenda is missed."
      },
      {
        title: "Admin & Data Entry",
        desc: "Data input, report generation, spreadsheet management, online research, and documentation. Neat, accurate, and on-time using Google Sheets or Microsoft Excel."
      },
      {
        title: "Social Media Management",
        desc: "Create content, captions, and posting schedules for Instagram, Facebook, or TikTok. Using Canva for visual design and Buffer/Hootsuite for scheduling."
      },
      {
        title: "Project Management & Coordination",
        desc: "Create and manage task boards in Notion or Trello, follow-up with the team, make meeting notes, and ensure projects run according to timeline."
      }
    ],

    // Projects
    projectsTag: "Work Portfolio",
    projectsTitle: "Work",
    projectsTitleBold: "Examples",
    projectsDesc: "Real and simulated task examples reflecting my capabilities as a VA — from email management to project coordination.",
    projectsBtnView: "View Details",
    projectsFilterAll: "All",
    projectsFilterFrontend: "Admin",
    projectsFilterBackend: "Research",
    projectsFilterDesign: "Social Media",
    projectsData: [
      {
        title: "Inbox Zero System for E-Commerce Client",
        desc: "Managing 80+ incoming emails per day, sorting priorities, replying to standard templates, and compiling weekly client communication summary reports.",
        longDesc: "Client had an online store with high email volume from suppliers, customers, and partners. I built a system of labels, automated filters, and reply templates in Gmail. As a result, the inbox remained clean, and response times fell from 2 days to 3 hours.",
        role: "Email Management VA",
        client: "Online Store (Upwork Client)",
        duration: "3 Months",
        stack: "Gmail, Google Sheets, Notion",
        features: [
          "Setup Gmail label system and automatic filters",
          "Created 15+ standard email reply templates",
          "Weekly report summarizing email volume and categories",
          "Average response time decreased by 85%"
        ]
      },
      {
        title: "Executive Calendar Management",
        desc: "Arranging meeting schedules, client calls, and project deadlines for a startup founder — zero double-bookings for 6 months.",
        longDesc: "Founder struggled to manage schedules because of meetings across 3 different time zones. I integrated Google Calendar with Calendly, created an automated booking system, and sent 24-hour reminders before each meeting.",
        role: "Executive VA",
        client: "Startup Founder (Remote)",
        duration: "6 Months",
        stack: "Google Calendar, Calendly, Slack, Zoom",
        features: [
          "Cross-timezone Calendly and Google Calendar integration",
          "Automated reminders via email and Slack",
          "Daily and weekly agenda management",
          "Zero missed meetings during 6 months of assignment"
        ]
      },
      {
        title: "MSME Social Media Content & Scheduling",
        desc: "Creating 30 content posts per month, designing visuals in Canva, and scheduling posts for a local culinary business — followers increased by 40% in 3 months.",
        longDesc: "Culinary MSME had no marketing team. I took over Instagram and Facebook management, including trend research, caption creation, content design in Canva, and scheduling via Buffer. Engagement increased significantly due to posting consistency.",
        role: "Social Media VA",
        client: "Culinary MSME, Karawang",
        duration: "3 Months",
        stack: "Canva, Buffer, Instagram, Facebook",
        features: [
          "30 content posts/month: feeds, stories, and reels",
          "Consistent visual designs matching brand guides",
          "Weekly hashtag and trend research",
          "Monthly performance reports (reach, engagement, follower growth)"
        ]
      },
      {
        title: "Workspace Setup & Online Business SOPs",
        desc: "Helping a new online business build operational systems from scratch — Notion workspace, written SOPs, and ready-to-use document templates.",
        longDesc: "Client was launching a business and needed an organized system. I built a complete Notion workspace containing client databases, project trackers, operational SOPs, and email/document templates. The client was able to onboard new employees 3x faster.",
        role: "Operations VA",
        client: "Digital Service Business (Newly Founded)",
        duration: "1 Month",
        stack: "Notion, Google Workspace, Canva, Loom",
        features: [
          "Notion workspace with 8 integrated databases",
          "10+ written SOPs for daily operations",
          "Email, invoice, and client proposal templates",
          "Loom video tutorials for each primary process"
        ]
      }
    ],

    // Certifications
    certsTag: "Certifications & Courses",
    certsTitle: "My",
    certsTitleBold: "Credentials",
    certsDesc: "Official certificates from courses and training demonstrating my competence as a professional Virtual Assistant.",
    certsVerifyBtn: "View Certificate",

    // Testimonials
    testiTag: "Client Endorsements",
    testiTitle: "Reviews &",
    testiTitleBold: "Testimonials",
    testiDesc: "Feedback from clients who have collaborated with me.",

    // Blog
    blogTag: "Tips & Insights",
    blogTitle: "VA",
    blogTitleBold: "Articles",
    blogDesc: "Sharing productivity tips, effective remote work methods, and the best tools for Virtual Assistants.",
    blogReadTime: "Min Read",
    blogBtnRead: "Read More",

    // Contact
    contactTag: "Ready to Collaborate?",
    contactTitle: "Contact",
    contactTitleBold: "Me",
    contactDesc: "Have tasks to delegate? Need a VA to support your business? Send a message and I'll reply within 2–4 hours.",
    contactDetailsTitle: "Contact Info",
    contactDetailsDesc: "Contact me via email or WhatsApp. Available Monday–Saturday, 08:00–21:00 WIB. Ready to start in 1–2 business days.",
    contactFormTitle: "Send Message",
    contactFormNameLabel: "Full Name",
    contactFormEmailLabel: "Email Address",
    contactFormSubjectLabel: "Your Needs",
    contactFormMsgLabel: "Tell me about the tasks or project you want to delegate",
    contactFormBtnSend: "Send Message",
    contactFormBtnSending: "Sending...",
    contactFormSuccessTitle: "Message Sent!",
    contactFormSuccessDesc: "Thank you! I will reply within 2–4 hours.",

    // Footer
    footerRights: "All Rights Reserved. Professional Virtual Assistant from Indonesia."
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
