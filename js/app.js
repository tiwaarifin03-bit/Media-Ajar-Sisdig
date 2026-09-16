/**
 * app.js - Navigation, Theme Management & Routing for Media Ajar Sistem Digital
 * Features: 14 Weeks Navigation Tabs, Dual-Theme Engine (Cyber Dark & Clean Light),
 * Dynamic Content Router for Weeks 1 - 14.
 */

// ===== Week/Menu Data Structure (Minggu 1 - 14) =====
const weekData = [
  {
    id: 'minggu1',
    week: 1,
    shortTitle: 'Bilangan & Pecahan',
    title: 'Sistem Bilangan & Pecahan',
    desc: 'Konversi Desimal, Biner, Oktal, Heksadesimal serta bilangan pecahan/koma.',
    icon: '🔢',
    status: 'active',
    submenus: [
      { id: 'minggu1-konversi', title: 'Konversi Bilangan Bulat', icon: '🔄' },
      { id: 'minggu1-pecahan', title: 'Konversi Pecahan / Koma', icon: '➗' },
      { id: 'minggu1-latihan', title: 'Latihan Interaktif M1', icon: '🎯' }
    ]
  },
  {
    id: 'minggu2',
    week: 2,
    shortTitle: 'Negatif & 2\'s Comp',
    title: 'Bilangan Negatif & 2\'s Complement',
    desc: 'Representasi bertanda (Sign-Magnitude, 1\'s & 2\'s Complement), MSB visualizer, dan operasi pengurangan via penjumlahan.',
    icon: '➖',
    status: 'active',
    submenus: [
      { id: 'minggu2-materi', title: 'Representasi & 2\'s Complement', icon: '⭐' },
      { id: 'minggu2-aritmatika', title: 'Pengurangan via Penjumlahan', icon: '🧮' },
      { id: 'minggu2-latihan', title: 'Latihan Interaktif M2', icon: '🎯' }
    ]
  },
  {
    id: 'minggu3',
    week: 3,
    shortTitle: 'Gerbang Logika',
    title: 'Gerbang Logika Dasar',
    desc: 'Logika AND, OR, NOT, NAND, NOR, XOR, XNOR serta analisis Tabel Kebenaran.',
    icon: '⚡',
    status: 'coming-soon',
    submenus: [
      { id: 'minggu3-gerbang', title: 'Gerbang Dasar & Universal', icon: '🔌' },
      { id: 'minggu3-tabel', title: 'Simulator Tabel Kebenaran', icon: '📋' }
    ]
  },
  {
    id: 'minggu4',
    week: 4,
    shortTitle: 'Aljabar Boolean',
    title: 'Aljabar Boolean & Teorema',
    desc: 'Hukum De Morgan, identitas aljabar boolean, dan penyederhanaan fungsi.',
    icon: '📐',
    status: 'coming-soon',
    submenus: [
      { id: 'minggu4-hukum', title: 'Teorema & De Morgan', icon: '📖' },
      { id: 'minggu4-penyederhanaan', title: 'Penyederhanaan Logika', icon: '✂️' }
    ]
  },
  {
    id: 'minggu5',
    week: 5,
    shortTitle: 'SOP & POS',
    title: 'Bentuk Standar SOP & POS',
    desc: 'Minterm, Maxterm, Canonical Form, dan representasi standar logika digital.',
    icon: '🧩',
    status: 'coming-soon',
    submenus: [
      { id: 'minggu5-sop', title: 'Sum of Products (SOP)', icon: '📝' },
      { id: 'minggu5-minterm', title: 'Minterm & Maxterm', icon: '🔍' }
    ]
  },
  {
    id: 'minggu6',
    week: 6,
    shortTitle: 'K-Map Minimisasi',
    title: 'Peta Karnaugh (K-Map)',
    desc: 'Metode minimisasi grafis 2, 3, 4 variabel serta Don\'t Care condition.',
    icon: '🗺️',
    status: 'coming-soon',
    submenus: [
      { id: 'minggu6-kmap', title: 'K-Map 2, 3, 4 Variabel', icon: '📊' },
      { id: 'minggu6-dont', title: 'Don\'t Care (X) Minimisasi', icon: '❓' }
    ]
  },
  {
    id: 'minggu7',
    week: 7,
    shortTitle: 'Adder & Subtractor',
    title: 'Rangkaian Aritmatika Kombinasional',
    desc: 'Half Adder, Full Adder, Ripple Carry Adder, Subtractor, dan Komparator.',
    icon: '🔗',
    status: 'coming-soon',
    submenus: [
      { id: 'minggu7-adder', title: 'Half & Full Adder', icon: '➕' },
      { id: 'minggu7-subtractor', title: 'Subtractor & Komparator', icon: '➖' }
    ]
  },
  {
    id: 'minggu8',
    week: 8,
    shortTitle: 'UTS Evaluasi',
    title: 'UTS (Ujian Tengah Semester)',
    desc: 'Evaluasi komprehensif, evaluasi studi kasus, dan bank soal latihan Minggu 1-7.',
    icon: '📝',
    status: 'coming-soon',
    submenus: [
      { id: 'minggu8-review', title: 'Review Materi M1-M7', icon: '📚' },
      { id: 'minggu8-simulasi', title: 'Simulasi Ujian UTS', icon: '⏱️' }
    ]
  },
  {
    id: 'minggu9',
    week: 9,
    shortTitle: 'MUX & DEMUX',
    title: 'Multiplexer & Demultiplexer',
    desc: 'Data Selector MUX (2:1, 4:1, 8:1) dan Data Distributor DEMUX dalam sistem digital.',
    icon: '🔀',
    status: 'coming-soon',
    submenus: [
      { id: 'minggu9-mux', title: 'Multiplexer (Data Selector)', icon: '🔄' },
      { id: 'minggu9-demux', title: 'Demultiplexer (DEMUX)', icon: '↗️' }
    ]
  },
  {
    id: 'minggu10',
    week: 10,
    shortTitle: 'Encoder & Decoder',
    title: 'Encoder, Decoder & 7-Segment',
    desc: 'Priority Encoder, BCD to 7-Segment Decoder, dan teknik display digital.',
    icon: '🏷️',
    status: 'coming-soon',
    submenus: [
      { id: 'minggu10-encoder', title: 'Priority Encoder', icon: '🔐' },
      { id: 'minggu10-decoder', title: 'Decoder & 7-Segment LED', icon: '🖥️' }
    ]
  },
  {
    id: 'minggu11',
    week: 11,
    shortTitle: 'Flip-Flop Memori',
    title: 'Elemen Memori & Flip-Flop',
    desc: 'Latch SR, D Flip-Flop, JK Flip-Flop, T Flip-Flop, dan sinyal Clock / Triggering.',
    icon: '🔁',
    status: 'coming-soon',
    submenus: [
      { id: 'minggu11-sr', title: 'Latch & D Flip-Flop', icon: '🔲' },
      { id: 'minggu11-jkt', title: 'JK & T Flip-Flop Master-Slave', icon: '🔳' }
    ]
  },
  {
    id: 'minggu12',
    week: 12,
    shortTitle: 'Register & Counter',
    title: 'Register & Pencacah (Counter)',
    desc: 'Shift Register (SISO, SIPO, PISO, PIPO) dan Asynchronous / Synchronous Binary Counter.',
    icon: '⏱️',
    status: 'coming-soon',
    submenus: [
      { id: 'minggu12-register', title: 'Shift Register 4-Bit', icon: '↔️' },
      { id: 'minggu12-counter', title: 'Sync & Async Counter', icon: '⏲️' }
    ]
  },
  {
    id: 'minggu13',
    week: 13,
    shortTitle: 'FSM Sekuensial',
    title: 'Rangkaian Sekuensial & FSM',
    desc: 'Model Finite State Machine (Mealy & Moore), State Diagram, dan State Table.',
    icon: '📈',
    status: 'coming-soon',
    submenus: [
      { id: 'minggu13-fsm', title: 'Mealy vs Moore Machine', icon: '🔄' },
      { id: 'minggu13-diagram', title: 'State Diagram & Sintesis', icon: '📊' }
    ]
  },
  {
    id: 'minggu14',
    week: 14,
    shortTitle: 'Review UAS',
    title: 'Sintesis Sistem & Review UAS',
    desc: 'Integrasi sistem digital terintegrasi, studi kasus perancangan, dan persiapan UAS.',
    icon: '🎓',
    status: 'coming-soon',
    submenus: [
      { id: 'minggu14-review', title: 'Rangkuman Silabus Lengkap', icon: '📚' },
      { id: 'minggu14-latihan', title: 'Simulasi Latihan Soal UAS', icon: '🎯' }
    ]
  }
];

// ===== State Variables =====
let currentWeek = 'minggu1';
let currentSubmenu = 'minggu1-konversi';
let currentTheme = localStorage.getItem('sisdig_theme') || 'dark';

// ===== Theme Management Engine =====
function initTheme() {
  applyTheme(currentTheme);
}

function toggleTheme() {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('sisdig_theme', currentTheme);
  applyTheme(currentTheme);
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const themeBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = document.getElementById('theme-icon');
  const themeLabel = document.getElementById('theme-label');

  if (theme === 'light') {
    if (themeIcon) themeIcon.textContent = '☀️';
    if (themeLabel) themeLabel.textContent = 'Clean Light';
    if (themeBtn) themeBtn.setAttribute('title', 'Beralih ke Cyber Dark');
  } else {
    if (themeIcon) themeIcon.textContent = '🌙';
    if (themeLabel) themeLabel.textContent = 'Cyber Dark';
    if (themeBtn) themeBtn.setAttribute('title', 'Beralih ke Clean Light');
  }
}

// ===== DOM Builders =====

// 1. Sleek & Compact Horizontal Weeks Navigation Tab Bar (Minggu 1 - 14)
function buildWeeksTabBar() {
  const container = document.getElementById('weeks-tab-bar');
  if (!container) return;

  let html = '';
  weekData.forEach((w) => {
    const isActive = w.id === currentWeek;
    const isLive = w.status === 'active';

    html += `
      <button class="week-tab-btn ${isActive ? 'active' : ''}" 
              id="week-tab-${w.id}"
              onclick="selectWeekTab('${w.id}')"
              data-week="${w.id}"
              title="Minggu ${w.week}: ${w.title}">
        <span class="tab-badge-num">M${w.week}</span>
        <span class="tab-label-text">${w.shortTitle || w.title}</span>
        ${isLive ? '<span class="tab-live-dot" title="Modul Aktif"></span>' : ''}
      </button>
    `;
  });

  container.innerHTML = html;
  scrollActiveWeekTabIntoView();
}

function scrollActiveWeekTabIntoView() {
  const activeBtn = document.getElementById(`week-tab-${currentWeek}`);
  if (activeBtn) {
    activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }
}

// 2. Compact Submenu Pill Bar for active week
function buildSubmenuPillBar() {
  const container = document.getElementById('submenu-pill-bar');
  if (!container) return;

  const currentW = weekData.find(w => w.id === currentWeek);
  if (!currentW || !currentW.submenus || currentW.submenus.length === 0) {
    container.innerHTML = '';
    container.style.display = 'none';
    return;
  }

  container.style.display = 'flex';
  let html = `
    <span class="pill-week-indicator">Minggu ${currentW.week}</span>
    <div class="submenu-pill-list">
  `;

  currentW.submenus.forEach(sub => {
    const isActive = sub.id === currentSubmenu;
    html += `
      <button class="submenu-pill-btn ${isActive ? 'active' : ''}"
              onclick="navigateTo('${currentW.id}', '${sub.id}')"
              data-submenu="${sub.id}">
        <span class="pill-dot"></span>
        <span class="pill-text">${sub.title}</span>
      </button>
    `;
  });

  html += `</div>`;
  container.innerHTML = html;
}

// 3. Sidebar Navigation (Accordion style)
function buildSidebar() {
  const nav = document.getElementById('sidebar-nav');
  if (!nav) return;

  let html = '<div class="nav-section-label">Materi Perkuliahan (1-14)</div>';

  weekData.forEach((week) => {
    const isActive = week.id === currentWeek;
    const isExpanded = week.id === currentWeek;
    const badgeClass = week.status === 'active' ? 'active-badge' : 'coming-soon';
    const badgeText = week.status === 'active' ? 'Aktif' : 'Silabus';

    html += `
      <div class="nav-item ${isActive ? 'active' : ''} ${isExpanded ? 'expanded' : ''}" data-week="${week.id}">
        <div class="nav-item-header" onclick="toggleWeekMenu('${week.id}')">
          <span class="nav-item-weeknum">M${week.week}</span>
          <span class="nav-item-text">${week.title}</span>
          <span class="nav-item-badge ${badgeClass}">${badgeText}</span>
          <span class="nav-item-arrow">▶</span>
        </div>
        <div class="nav-submenu">
          ${week.submenus.map(sub => `
            <div class="nav-submenu-item ${sub.id === currentSubmenu ? 'active' : ''}" 
                 onclick="navigateTo('${week.id}', '${sub.id}')"
                 data-submenu="${sub.id}">
              <span class="submenu-bullet">•</span>
              <span>${sub.title}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  });

  nav.innerHTML = html;
}

function toggleWeekMenu(weekId) {
  const item = document.querySelector(`.nav-item[data-week="${weekId}"]`);
  if (!item) return;

  const targetWeek = weekData.find(w => w.id === weekId);
  if (targetWeek && currentWeek !== weekId) {
    selectWeekTab(weekId);
    return;
  }

  item.classList.toggle('expanded');
}

function selectWeekTab(weekId) {
  const week = weekData.find(w => w.id === weekId);
  if (!week) return;

  const defaultSubmenu = week.submenus && week.submenus.length > 0 ? week.submenus[0].id : `${weekId}-overview`;
  navigateTo(weekId, defaultSubmenu);
}

// Global Navigator
function navigateTo(weekId, submenuId) {
  currentWeek = weekId;
  currentSubmenu = submenuId;

  // Synchronize Horizontal Tabs
  document.querySelectorAll('.week-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.week === weekId);
  });
  scrollActiveWeekTabIntoView();

  // Synchronize Submenu Pill Bar
  buildSubmenuPillBar();

  // Synchronize Sidebar
  document.querySelectorAll('.nav-item').forEach(el => {
    const isThisWeek = el.dataset.week === weekId;
    el.classList.toggle('active', isThisWeek);
    if (isThisWeek) el.classList.add('expanded');
  });

  document.querySelectorAll('.nav-submenu-item').forEach(el => {
    el.classList.toggle('active', el.dataset.submenu === submenuId);
  });

  // Update Breadcrumb
  updateBreadcrumb(weekId, submenuId);

  // Render Content
  renderContent(weekId, submenuId);

  // Close mobile sidebar if open
  closeMobileSidebar();
}

function updateBreadcrumb(weekId, submenuId) {
  const week = weekData.find(w => w.id === weekId);
  const sub = week?.submenus.find(s => s.id === submenuId);

  const breadcrumb = document.getElementById('breadcrumb');
  if (breadcrumb && week) {
    const subTitle = sub ? sub.title : week.title;
    breadcrumb.innerHTML = `
      <span class="breadcrumb-item">Sistem Digital</span>
      <span class="breadcrumb-sep">›</span>
      <span class="breadcrumb-item">Minggu ${week.week}</span>
      <span class="breadcrumb-sep">›</span>
      <span class="breadcrumb-item current">${subTitle}</span>
    `;
  }
}

function renderContent(weekId, submenuId) {
  const contentBody = document.getElementById('content-body');
  if (!contentBody) return;

  const week = weekData.find(w => w.id === weekId);

  // Coming soon weeks (Minggu 3 - 14) with sleek syllabus cards
  if (week.status === 'coming-soon') {
    renderSyllabusPreview(contentBody, week);
    return;
  }

  // Week 1 Content
  if (weekId === 'minggu1') {
    if (submenuId === 'minggu1-pecahan') {
      if (typeof renderMinggu1Pecahan === 'function') {
        renderMinggu1Pecahan(contentBody);
      } else {
        contentBody.innerHTML = '<p>Memuat modul pecahan...</p>';
      }
    } else if (submenuId === 'minggu1-latihan') {
      if (typeof renderMinggu1Latihan === 'function') {
        renderMinggu1Latihan(contentBody);
      }
    } else {
      if (typeof renderMinggu1Konversi === 'function') {
        renderMinggu1Konversi(contentBody);
      }
    }
  }

  // Week 2 Content
  if (weekId === 'minggu2') {
    if (submenuId === 'minggu2-materi') {
      if (typeof renderMinggu2Materi === 'function') {
        renderMinggu2Materi(contentBody);
      }
    } else if (submenuId === 'minggu2-aritmatika') {
      if (typeof renderMinggu2Aritmatika === 'function') {
        renderMinggu2Aritmatika(contentBody);
      }
    } else if (submenuId === 'minggu2-latihan') {
      if (typeof renderMinggu2Latihan === 'function') {
        renderMinggu2Latihan(contentBody);
      }
    }
  }
}

// Render clean, professional syllabus card for weeks 3 to 14
function renderSyllabusPreview(container, week) {
  container.innerHTML = `
    <div class="week-hero">
      <div class="week-hero-content">
        <div class="week-badge-row">
          <span class="tag tag-blue">Minggu ke-${week.week}</span>
          <span class="tag tag-violet">Silabus Perkuliahan</span>
        </div>
        <h1>${week.title}</h1>
        <p>${week.desc}</p>
      </div>
    </div>

    <div class="glass-card mb-24">
      <div class="glass-card-header">
        <h3 class="glass-card-title">Rencana Pembelajaran Minggu ${week.week}</h3>
      </div>
      <div class="syllabus-grid">
        <div class="syllabus-info-box">
          <h4>Capaian Pembelajaran</h4>
          <p>Mahasiswa mampu menganalisis, merancang, dan menguji konsep <strong>${week.title}</strong> dalam implementasi rangkaian logika digital modern.</p>
        </div>
        <div class="syllabus-info-box">
          <h4>Sub-Topik Bahasan</h4>
          <ul class="syllabus-topic-list">
            ${week.submenus.map(s => `<li><span class="topic-dot"></span> ${s.title}</li>`).join('')}
          </ul>
        </div>
      </div>
      <div class="syllabus-callout">
        <div class="callout-text">
          <strong>Modul Interaktif Tersedia:</strong>
          Jelajahi materi interaktif lengkap pada 
          <a href="javascript:void(0)" onclick="navigateTo('minggu1', 'minggu1-pecahan')">Minggu 1 (Konversi Pecahan / Koma)</a> 
          dan 
          <a href="javascript:void(0)" onclick="navigateTo('minggu2', 'minggu2-materi')">Minggu 2 (Bilangan Negatif & 2's Complement)</a>.
        </div>
      </div>
    </div>
  `;
}

// ===== Mobile Sidebar Toggle =====
function toggleMobileSidebar() {
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.sidebar-overlay');
  if (sidebar) sidebar.classList.toggle('open');
  if (overlay) overlay.classList.toggle('show');
}

function closeMobileSidebar() {
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.sidebar-overlay');
  if (sidebar) sidebar.classList.remove('open');
  if (overlay) overlay.classList.remove('show');
}

// Expose globally to window
window.toggleTheme = toggleTheme;
window.selectWeekTab = selectWeekTab;
window.navigateTo = navigateTo;
window.toggleWeekMenu = toggleWeekMenu;
window.toggleMobileSidebar = toggleMobileSidebar;
window.closeMobileSidebar = closeMobileSidebar;

// ===== Initialize on DOM Ready =====
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  buildSidebar();
  buildWeeksTabBar();
  buildSubmenuPillBar();
  updateBreadcrumb(currentWeek, currentSubmenu);
  renderContent(currentWeek, currentSubmenu);
});
