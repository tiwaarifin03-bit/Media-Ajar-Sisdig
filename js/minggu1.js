/**
 * minggu1.js - Interactive Number Conversion with Binary as Central Hub
 * Covers: Decimal, Binary, Octal, Hexadecimal conversions
 */

// ===== Conversion Utilities =====

function decimalToBinary(decimal) {
  if (decimal === 0) return { binary: '0', steps: [{ dividend: 0, divisor: 2, quotient: 0, remainder: 0 }] };
  const steps = [];
  let num = decimal;
  while (num > 0) {
    steps.push({ dividend: num, divisor: 2, quotient: Math.floor(num / 2), remainder: num % 2 });
    num = Math.floor(num / 2);
  }
  const binary = steps.map(s => s.remainder).reverse().join('');
  return { binary, steps };
}

function binaryToDecimal(binary) {
  let result = 0;
  const bits = binary.split('').reverse();
  const positions = bits.map((bit, i) => ({
    position: i,
    bit: parseInt(bit),
    power: Math.pow(2, i),
    value: parseInt(bit) * Math.pow(2, i)
  }));
  result = positions.reduce((sum, p) => sum + p.value, 0);
  return { decimal: result, positions: positions.reverse() };
}

function binaryToHex(binary) {
  // Pad to multiple of 4
  while (binary.length % 4 !== 0) binary = '0' + binary;
  const groups = [];
  for (let i = 0; i < binary.length; i += 4) {
    const group = binary.substring(i, i + 4);
    const value = parseInt(group, 2);
    const hex = value.toString(16).toUpperCase();
    groups.push({ bits: group, value, hex });
  }
  return { hex: groups.map(g => g.hex).join(''), groups };
}

function binaryToOctal(binary) {
  // Pad to multiple of 3
  while (binary.length % 3 !== 0) binary = '0' + binary;
  const groups = [];
  for (let i = 0; i < binary.length; i += 3) {
    const group = binary.substring(i, i + 3);
    const value = parseInt(group, 2);
    groups.push({ bits: group, value: value.toString() });
  }
  return { octal: groups.map(g => g.value).join(''), groups };
}

function hexToBinary(hex) {
  const mapping = {
    '0': '0000', '1': '0001', '2': '0010', '3': '0011',
    '4': '0100', '5': '0101', '6': '0110', '7': '0111',
    '8': '1000', '9': '1001', 'A': '1010', 'B': '1011',
    'C': '1100', 'D': '1101', 'E': '1110', 'F': '1111'
  };
  let binary = '';
  const groups = [];
  for (const ch of hex.toUpperCase()) {
    const bits = mapping[ch];
    if (!bits) return null;
    binary += bits;
    groups.push({ hex: ch, bits });
  }
  // Remove leading zeros
  binary = binary.replace(/^0+/, '') || '0';
  return { binary, groups };
}

function octalToBinary(octal) {
  const mapping = {
    '0': '000', '1': '001', '2': '010', '3': '011',
    '4': '100', '5': '101', '6': '110', '7': '111'
  };
  let binary = '';
  const groups = [];
  for (const ch of octal) {
    const bits = mapping[ch];
    if (!bits) return null;
    binary += bits;
    groups.push({ octal: ch, bits });
  }
  binary = binary.replace(/^0+/, '') || '0';
  return { binary, groups };
}

// Validate input based on base
function validateInput(value, base) {
  if (!value || value.trim() === '') return false;
  value = value.trim().toUpperCase();
  switch (base) {
    case 2:  return /^[01]+$/.test(value);
    case 8:  return /^[0-7]+$/.test(value);
    case 10: return /^\d+$/.test(value) && parseInt(value) >= 0;
    case 16: return /^[0-9A-F]+$/.test(value);
    default: return false;
  }
}

// ===== Render: Minggu 1 - Konversi Bilangan =====
function renderMinggu1Konversi(container) {
  container.innerHTML = `
    <!-- Hero Section -->
    <div class="week-hero">
      <div class="week-hero-content">
        <h1>🔢 Sistem Bilangan & Konversi</h1>
        <p>Pelajari konversi antar sistem bilangan dengan metode Biner sebagai pusat. Semua bilangan dikonversi ke biner terlebih dahulu, kemudian dikelompokkan untuk menghasilkan format lain.</p>
        <div class="week-hero-tags">
          <span class="tag tag-blue">Biner (Base-2)</span>
          <span class="tag tag-violet">Heksadesimal (Base-16)</span>
          <span class="tag tag-green">Oktal (Base-8)</span>
          <span class="tag tag-orange">Desimal (Base-10)</span>
        </div>
      </div>
    </div>

    <!-- Central Hub Diagram -->
    <div class="glass-card mb-32">
      <div class="glass-card-header">
        <h3 class="glass-card-title">🌐 Diagram Konversi - Biner sebagai Pusat</h3>
      </div>
      <p style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 8px; text-align: center;">
        Semua konversi melewati <strong style="color: var(--accent-blue);">Biner</strong> sebagai titik sentral
      </p>
      <div class="hub-diagram">
        <div class="hub-container">
          <!-- Connection lines -->
          <div class="hub-line hub-line-decimal"></div>
          <div class="hub-line hub-line-hex"></div>
          <div class="hub-line hub-line-octal"></div>
          <div class="hub-line hub-line-input"></div>
          
          <!-- Center node: Binary -->
          <div class="hub-center">
            <div class="hub-center-label">BINER</div>
            <div class="hub-center-sub">Base-2</div>
          </div>
          
          <!-- Surrounding nodes -->
          <div class="hub-node hub-node-decimal" onclick="scrollToConverter()">
            <div class="hub-node-label">DESIMAL</div>
            <div class="hub-node-sub">Base-10</div>
          </div>
          
          <div class="hub-node hub-node-hex" onclick="scrollToConverter()">
            <div class="hub-node-label">HEKSA</div>
            <div class="hub-node-sub">Base-16 (4-bit)</div>
          </div>
          
          <div class="hub-node hub-node-octal" onclick="scrollToConverter()">
            <div class="hub-node-label">OKTAL</div>
            <div class="hub-node-sub">Base-8 (3-bit)</div>
          </div>
          
          <div class="hub-node hub-node-input" onclick="scrollToConverter()">
            <div class="hub-node-label">INPUT</div>
            <div class="hub-node-sub">Masukkan Angka</div>
          </div>
        </div>
      </div>
      <div style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; font-size: 0.75rem; color: var(--text-muted);">
        <span>📐 Kelompok <strong style="color: var(--accent-violet);">4-bit</strong> → Heksa</span>
        <span>📐 Kelompok <strong style="color: var(--accent-green);">3-bit</strong> → Oktal</span>
        <span>📐 Jumlahkan <strong style="color: var(--accent-pink);">2ⁿ</strong> → Desimal</span>
      </div>
    </div>

    <!-- Converter Tool -->
    <div class="glass-card mb-32" id="converter-tool">
      <div class="glass-card-header">
        <h3 class="glass-card-title">🔄 Konverter Bilangan Interaktif</h3>
      </div>
      
      <div class="converter-section">
        <div class="converter-input-panel">
          <div class="input-group">
            <label class="input-label">📥 Pilih Basis Input</label>
            <div class="base-selector">
              <button class="base-btn active" data-base="10" onclick="selectBase(10)">Desimal (10)</button>
              <button class="base-btn" data-base="2" onclick="selectBase(2)">Biner (2)</button>
              <button class="base-btn" data-base="8" onclick="selectBase(8)">Oktal (8)</button>
              <button class="base-btn" data-base="16" onclick="selectBase(16)">Heksa (16)</button>
            </div>
          </div>
          <div class="input-group">
            <label class="input-label">✏️ Masukkan Angka</label>
            <input type="text" class="input-field" id="converter-input" placeholder="Contoh: 156" autocomplete="off">
          </div>
          <button class="convert-btn" onclick="performConversion()">
            <span>⚡</span>
            <span>Konversi Sekarang</span>
          </button>
        </div>
        
        <div class="result-cards" id="result-cards">
          <div class="result-card result-card-decimal">
            <div class="result-card-label">Desimal (Base-10)</div>
            <div class="result-card-value" id="result-decimal">—</div>
          </div>
          <div class="result-card result-card-binary">
            <div class="result-card-label">Biner (Base-2)</div>
            <div class="result-card-value" id="result-binary">—</div>
          </div>
          <div class="result-card result-card-octal">
            <div class="result-card-label">Oktal (Base-8)</div>
            <div class="result-card-value" id="result-octal">—</div>
          </div>
          <div class="result-card result-card-hex">
            <div class="result-card-label">Heksadesimal (Base-16)</div>
            <div class="result-card-value" id="result-hex">—</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Step-by-Step Visualization -->
    <div class="glass-card mb-32" id="steps-section" style="display: none;">
      <div class="glass-card-header">
        <h3 class="glass-card-title">📊 Visualisasi Langkah-demi-Langkah</h3>
      </div>
      
      <div class="step-tabs" id="step-tabs"></div>
      <div id="step-contents"></div>
    </div>

    <!-- Cheat Sheet -->
    <div class="glass-card mb-32 cheat-sheet">
      <div class="glass-card-header">
        <h3 class="glass-card-title">📋 Tabel Referensi Cepat (0-15)</h3>
      </div>
      <div style="overflow-x: auto;">
        <table class="cheat-table">
          <thead>
            <tr>
              <th>Desimal</th>
              <th>Biner</th>
              <th>Oktal</th>
              <th>Heksa</th>
            </tr>
          </thead>
          <tbody id="cheat-table-body"></tbody>
        </table>
      </div>
    </div>
  `;

  // Build cheat sheet
  buildCheatSheet();

  // Add enter key listener
  const input = document.getElementById('converter-input');
  if (input) {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') performConversion();
    });
  }
}

function scrollToConverter() {
  const el = document.getElementById('converter-tool');
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ===== Converter State =====
let selectedBase = 10;

function selectBase(base) {
  selectedBase = base;
  document.querySelectorAll('.base-btn').forEach(btn => {
    btn.classList.toggle('active', parseInt(btn.dataset.base) === base);
  });

  const input = document.getElementById('converter-input');
  const placeholders = {
    2: 'Contoh: 10011100',
    8: 'Contoh: 234',
    10: 'Contoh: 156',
    16: 'Contoh: 9C'
  };
  if (input) input.placeholder = placeholders[base] || '';
}

function performConversion() {
  const input = document.getElementById('converter-input');
  if (!input) return;

  const value = input.value.trim().toUpperCase();

  if (!validateInput(value, selectedBase)) {
    input.style.borderColor = 'var(--accent-red)';
    input.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.15)';
    setTimeout(() => {
      input.style.borderColor = '';
      input.style.boxShadow = '';
    }, 1500);
    return;
  }

  // Step 1: Convert to binary first (binary is central)
  let binaryStr;
  let toBinarySteps = null;

  switch (selectedBase) {
    case 2:
      binaryStr = value;
      break;
    case 8:
      const octResult = octalToBinary(value);
      binaryStr = octResult.binary;
      toBinarySteps = { type: 'octal-to-binary', data: octResult };
      break;
    case 10:
      const decNum = parseInt(value);
      if (decNum === 0) {
        binaryStr = '0';
        toBinarySteps = { type: 'decimal-to-binary', data: { binary: '0', steps: [{ dividend: 0, divisor: 2, quotient: 0, remainder: 0 }] } };
      } else {
        const decResult = decimalToBinary(decNum);
        binaryStr = decResult.binary;
        toBinarySteps = { type: 'decimal-to-binary', data: decResult };
      }
      break;
    case 16:
      const hexResult = hexToBinary(value);
      binaryStr = hexResult.binary;
      toBinarySteps = { type: 'hex-to-binary', data: hexResult };
      break;
  }

  // Step 2: From binary, convert to all formats
  const toDecimal = binaryToDecimal(binaryStr);
  const toHex = binaryToHex(binaryStr);
  const toOctal = binaryToOctal(binaryStr);

  // Display results
  animateResult('result-decimal', toDecimal.decimal.toString());
  animateResult('result-binary', binaryStr);
  animateResult('result-octal', toOctal.octal);
  animateResult('result-hex', toHex.hex);

  // Show step-by-step
  showSteps(toBinarySteps, binaryStr, toDecimal, toHex, toOctal);
}

function animateResult(elementId, value) {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.style.opacity = '0';
  el.style.transform = 'translateY(5px)';
  setTimeout(() => {
    el.textContent = value;
    el.style.transition = 'all 0.3s ease';
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  }, 100);
}

// ===== Step-by-Step Visualization =====
function showSteps(toBinarySteps, binaryStr, toDecimal, toHex, toOctal) {
  const section = document.getElementById('steps-section');
  const tabsContainer = document.getElementById('step-tabs');
  const contentsContainer = document.getElementById('step-contents');

  if (!section || !tabsContainer || !contentsContainer) return;

  section.style.display = 'block';
  section.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  const tabs = [];
  const contents = [];

  // Tab 1: To Binary (if not already binary)
  if (toBinarySteps) {
    tabs.push({ id: 'step-to-binary', label: '① Konversi ke Biner' });
    contents.push({ id: 'step-to-binary', html: renderToBinaryStep(toBinarySteps, binaryStr) });
  }

  // Tab 2: Binary to Hex (grouped by 4)
  tabs.push({ id: 'step-to-hex', label: '② Biner → Heksa (4-bit)' });
  contents.push({ id: 'step-to-hex', html: renderBinaryToHexStep(binaryStr, toHex) });

  // Tab 3: Binary to Octal (grouped by 3)
  tabs.push({ id: 'step-to-octal', label: '③ Biner → Oktal (3-bit)' });
  contents.push({ id: 'step-to-octal', html: renderBinaryToOctalStep(binaryStr, toOctal) });

  // Tab 4: Binary to Decimal (sum of powers)
  tabs.push({ id: 'step-to-decimal', label: '④ Biner → Desimal (2ⁿ)' });
  contents.push({ id: 'step-to-decimal', html: renderBinaryToDecimalStep(binaryStr, toDecimal) });

  // Render tabs
  tabsContainer.innerHTML = tabs.map((tab, i) =>
    `<button class="step-tab ${i === 0 ? 'active' : ''}" onclick="switchStepTab('${tab.id}')">${tab.label}</button>`
  ).join('');

  // Render contents
  contentsContainer.innerHTML = contents.map((c, i) =>
    `<div class="step-content ${i === 0 ? 'active' : ''}" id="${c.id}">${c.html}</div>`
  ).join('');
}

function switchStepTab(tabId) {
  document.querySelectorAll('.step-tab').forEach(tab => tab.classList.remove('active'));
  document.querySelectorAll('.step-content').forEach(content => content.classList.remove('active'));

  event.currentTarget.classList.add('active');
  const content = document.getElementById(tabId);
  if (content) content.classList.add('active');
}

// ===== Render Step: To Binary =====
function renderToBinaryStep(toBinarySteps, binaryStr) {
  if (toBinarySteps.type === 'decimal-to-binary') {
    const data = toBinarySteps.data;
    let html = `
      <div class="step-detail" style="text-align: center;">
        <h4 class="step-title" style="justify-content: center;">✨ Trik Cepat: Desimal → Biner</h4>
        <p class="step-description">
          Bagi dua terus menerus! Tulis sisanya dari bawah ke atas.
        </p>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 10px; margin: 20px 0;">
    `;
    data.steps.forEach((step, i) => {
      html += `
        <div style="display: flex; align-items: center; gap: 15px; font-size: 1.1rem; animation: fadeInStep 0.3s ease forwards; animation-delay: ${i * 0.1}s; opacity: 0;">
          <div style="background: var(--bg-secondary); padding: 8px 16px; border-radius: 8px; width: 80px; text-align: right;">${step.dividend}</div>
          <div style="color: var(--text-muted);">÷ 2 =</div>
          <div style="background: var(--bg-tertiary); padding: 8px 16px; border-radius: 8px; width: 60px;">${step.quotient}</div>
          <div style="color: var(--text-muted);">sisa</div>
          <div style="background: ${step.remainder ? 'rgba(0, 212, 255, 0.2)' : 'rgba(255, 255, 255, 0.05)'}; border: 1px solid ${step.remainder ? 'var(--accent-blue)' : 'var(--border-subtle)'}; color: ${step.remainder ? 'var(--accent-blue)' : 'var(--text-muted)'}; padding: 8px 16px; border-radius: 8px; font-weight: bold; width: 40px;">${step.remainder}</div>
        </div>
      `;
    });
    html += `
        </div>
        <div style="color: var(--accent-blue); font-size: 1.5rem; margin-top: 10px;">↑ Baca ke Atas ↑</div>
        <div style="font-size: 2rem; font-weight: 900; color: white; margin-top: 10px; letter-spacing: 4px;">${binaryStr}</div>
      </div>
    `;
    return html;
  } else if (toBinarySteps.type === 'hex-to-binary' || toBinarySteps.type === 'octal-to-binary') {
    const isHex = toBinarySteps.type === 'hex-to-binary';
    const data = toBinarySteps.data;
    const color = isHex ? 'var(--accent-violet)' : 'var(--accent-green)';
    const bitCount = isHex ? 4 : 3;
    
    let html = `
      <div class="step-detail" style="text-align: center;">
        <h4 class="step-title" style="justify-content: center; color: ${color};">✨ Trik Cepat: ${isHex ? 'Heksa' : 'Oktal'} → Biner</h4>
        <p class="step-description">Pecah setiap angka menjadi <strong>${bitCount} digit biner</strong> secara langsung!</p>
        <div style="display: flex; justify-content: center; gap: 20px; margin: 30px 0;">
    `;
    
    data.groups.forEach((g, i) => {
      const val = isHex ? g.hex : g.octal;
      html += `
        <div style="display: flex; flex-direction: column; align-items: center; gap: 10px; animation: fadeInStep 0.3s ease forwards; animation-delay: ${i * 0.15}s; opacity: 0;">
          <div style="font-size: 2rem; font-weight: bold; color: ${color}; background: rgba(255,255,255,0.05); width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 12px; border: 2px solid ${color}; opacity: 0.8;">${val}</div>
          <div style="color: var(--text-muted);">↓</div>
          <div style="font-size: 1.5rem; letter-spacing: 2px; font-family: var(--font-mono); font-weight: bold; padding: 10px 15px; background: var(--bg-tertiary); border-radius: 8px;">${g.bits}</div>
        </div>
      `;
    });
    
    html += `
        </div>
        <div style="color: var(--text-muted); margin-bottom: 10px;">Gabungkan Semuanya:</div>
        <div style="font-size: 2rem; font-weight: 900; color: white; letter-spacing: 2px;">${binaryStr}</div>
      </div>
    `;
    return html;
  }
  return '';
}

// ===== Render Step: Binary to Hex / Octal =====
function renderBinaryToHexStep(binaryStr, toHex) { return renderGroupingShortcut(binaryStr, toHex, 4, 'Heksa', 'var(--accent-violet)'); }
function renderBinaryToOctalStep(binaryStr, toOctal) { return renderGroupingShortcut(binaryStr, toOctal, 3, 'Oktal', 'var(--accent-green)'); }

function renderGroupingShortcut(binaryStr, data, bitCount, targetName, color) {
  let padded = binaryStr;
  while (padded.length % bitCount !== 0) padded = '0' + padded;
  
  const resultStr = targetName === 'Heksa' ? data.hex : data.octal;

  let html = `
    <div class="step-detail" style="text-align: center;">
      <h4 class="step-title" style="justify-content: center; color: ${color};">✨ Trik Cepat: Biner → ${targetName}</h4>
      <p class="step-description">Potong biner menjadi kelompok <strong>${bitCount} angka</strong> dari kanan, lalu ubah langsung.</p>
      
      <div style="font-size: 1.2rem; letter-spacing: 4px; color: var(--text-muted); margin: 20px 0;">${padded}</div>
      <div style="color: var(--text-muted); margin-bottom: 20px;">↓ Potong dari kanan ↓</div>
      
      <div style="display: flex; justify-content: center; gap: 15px; margin-bottom: 30px; flex-wrap: wrap;">
  `;

  data.groups.forEach((g, i) => {
    const val = targetName === 'Heksa' ? g.hex : g.value;
    html += `
      <div style="display: flex; flex-direction: column; align-items: center; gap: 10px; animation: fadeInStep 0.3s ease forwards; animation-delay: ${i * 0.15}s; opacity: 0;">
        <div style="font-size: 1.5rem; letter-spacing: 2px; font-family: var(--font-mono); font-weight: bold; padding: 10px 15px; background: var(--bg-tertiary); border-radius: 8px;">${g.bits}</div>
        <div style="color: var(--text-muted);">↓</div>
        <div style="font-size: 2rem; font-weight: bold; color: ${color}; background: rgba(255,255,255,0.05); width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 12px; border: 2px solid ${color}; opacity: 0.8;">${val}</div>
      </div>
    `;
  });

  html += `
      </div>
      <div style="color: var(--text-muted); margin-bottom: 10px;">Hasil Gabungan:</div>
      <div style="font-size: 2.5rem; font-weight: 900; color: ${color};">${resultStr}</div>
    </div>
  `;
  return html;
}

// ===== Render Step: Binary to Decimal =====
function renderBinaryToDecimalStep(binaryStr, toDecimal) {
  const positions = toDecimal.positions;
  
  let html = `
    <div class="step-detail" style="text-align: center;">
      <h4 class="step-title" style="justify-content: center; color: var(--accent-pink);">✨ Trik Cepat: Biner → Desimal</h4>
      <p class="step-description">Tulis deret angka sakti <strong>(1, 2, 4, 8, 16...)</strong> dari kanan. Tambahkan angka yang punya biner <strong>1</strong>!</p>
      
      <div style="display: flex; justify-content: center; gap: 8px; margin: 30px 0; flex-wrap: wrap;">
  `;

  positions.forEach((p, i) => {
    const isActive = p.bit === 1;
    html += `
      <div style="display: flex; flex-direction: column; align-items: center; gap: 5px; animation: fadeInStep 0.3s ease forwards; animation-delay: ${i * 0.05}s; opacity: 0;">
        <div style="font-size: 1.2rem; font-weight: bold; color: ${isActive ? 'var(--accent-pink)' : 'var(--text-muted)'}; opacity: ${isActive ? '1' : '0.3'}; padding: 5px;">${p.power}</div>
        <div style="font-size: 1.5rem; font-weight: bold; font-family: var(--font-mono); color: ${isActive ? 'white' : 'var(--text-muted)'}; background: ${isActive ? 'rgba(236, 72, 153, 0.2)' : 'var(--bg-tertiary)'}; border: 1px solid ${isActive ? 'var(--accent-pink)' : 'var(--border-subtle)'}; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">${p.bit}</div>
      </div>
    `;
  });

  html += `
      </div>
      <div style="background: rgba(0,0,0,0.2); padding: 20px; border-radius: 12px; display: inline-block;">
        <div style="color: var(--text-muted); margin-bottom: 10px; font-size: 0.9rem;">Tambahkan yang bernilai 1:</div>
  `;

  const activePositions = positions.filter(p => p.bit === 1);
  if (activePositions.length > 0) {
    html += `<div style="font-size: 1.2rem; color: white;">` + activePositions.map(p => `<span style="color: var(--accent-pink); font-weight: bold;">${p.power}</span>`).join(' + ') + `</div>`;
    html += `<div style="font-size: 2.5rem; font-weight: 900; color: white; margin-top: 10px;">= ${toDecimal.decimal}</div>`;
  } else {
    html += `<div style="font-size: 2.5rem; font-weight: 900; color: white; margin-top: 10px;">0</div>`;
  }

  html += `
      </div>
    </div>
  `;
  return html;
}

// ===== Cheat Sheet =====
function buildCheatSheet() {
  const tbody = document.getElementById('cheat-table-body');
  if (!tbody) return;

  let html = '';
  for (let i = 0; i <= 15; i++) {
    const bin = i.toString(2).padStart(4, '0');
    const oct = i.toString(8);
    const hex = i.toString(16).toUpperCase();
    html += `
      <tr>
        <td>${i}</td>
        <td>${bin}</td>
        <td>${oct}</td>
        <td>${hex}</td>
      </tr>
    `;
  }
  tbody.innerHTML = html;
}

// ===== Render: Minggu 1 - Latihan Interaktif (Quiz) =====

let quizState = {
  current: 0,
  total: 10,
  correct: 0,
  wrong: 0,
  questions: [],
  answered: false
};

function generateQuizQuestions() {
  const questions = [];
  const conversions = [
    { from: 'Desimal', to: 'Biner', fromBase: 10, toBase: 2 },
    { from: 'Biner', to: 'Desimal', fromBase: 2, toBase: 10 },
    { from: 'Desimal', to: 'Heksa', fromBase: 10, toBase: 16 },
    { from: 'Biner', to: 'Heksa', fromBase: 2, toBase: 16 },
    { from: 'Desimal', to: 'Oktal', fromBase: 10, toBase: 8 },
    { from: 'Biner', to: 'Oktal', fromBase: 2, toBase: 8 },
    { from: 'Heksa', to: 'Biner', fromBase: 16, toBase: 2 },
    { from: 'Oktal', to: 'Biner', fromBase: 8, toBase: 2 },
    { from: 'Heksa', to: 'Desimal', fromBase: 16, toBase: 10 },
    { from: 'Oktal', to: 'Desimal', fromBase: 8, toBase: 10 },
  ];

  for (let i = 0; i < 10; i++) {
    const conv = conversions[i % conversions.length];
    const decVal = Math.floor(Math.random() * 200) + 5;
    const inputVal = decVal.toString(conv.fromBase).toUpperCase();
    const answer = decVal.toString(conv.toBase).toUpperCase();

    questions.push({
      from: conv.from,
      to: conv.to,
      fromBase: conv.fromBase,
      toBase: conv.toBase,
      input: inputVal,
      answer: answer
    });
  }

  // Shuffle
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [questions[i], questions[j]] = [questions[j], questions[i]];
  }

  return questions;
}

function renderMinggu1Latihan(container) {
  // Reset quiz state
  quizState = {
    current: 0,
    total: 10,
    correct: 0,
    wrong: 0,
    questions: generateQuizQuestions(),
    answered: false
  };

  container.innerHTML = `
    <div class="week-hero">
      <div class="week-hero-content">
        <h1>🎯 Latihan Interaktif</h1>
        <p>Uji pemahaman Anda tentang konversi bilangan. Jawab 10 soal konversi antar basis bilangan secara interaktif.</p>
        <div class="week-hero-tags">
          <span class="tag tag-blue">10 Soal</span>
          <span class="tag tag-green">Feedback Langsung</span>
          <span class="tag tag-violet">Skor Otomatis</span>
        </div>
      </div>
    </div>

    <div class="glass-card quiz-section">
      <div id="quiz-container"></div>
    </div>
  `;

  renderQuizQuestion();
}

function renderQuizQuestion() {
  const container = document.getElementById('quiz-container');
  if (!container) return;

  const q = quizState.questions[quizState.current];
  quizState.answered = false;

  const progress = ((quizState.current) / quizState.total) * 100;

  container.innerHTML = `
    <div class="quiz-card">
      <div class="quiz-progress">
        <div class="quiz-progress-bar">
          <div class="quiz-progress-fill" style="width: ${progress}%"></div>
        </div>
        <span class="quiz-progress-text">${quizState.current + 1} / ${quizState.total}</span>
      </div>

      <div class="quiz-question">Konversikan bilangan berikut:</div>
      <div class="quiz-prompt">
        <span class="from-base">${q.input}</span>
        <span style="color: var(--text-muted); font-size: 1rem; margin: 0 8px;">(${q.from})</span>
        <span style="color: var(--text-muted); font-size: 1.2rem;">→</span>
        <span class="to-base"> ?</span>
        <span style="color: var(--text-muted); font-size: 1rem; margin-left: 8px;">(${q.to})</span>
      </div>

      <div class="quiz-input-wrap">
        <input type="text" class="quiz-input" id="quiz-answer" placeholder="Jawaban Anda..." autocomplete="off">
        <button class="quiz-submit-btn" onclick="checkQuizAnswer()">Cek ✓</button>
      </div>

      <div class="quiz-feedback" id="quiz-feedback"></div>

      <div class="quiz-score">
        <div class="quiz-score-item">
          <span class="score-correct">✅ Benar: ${quizState.correct}</span>
        </div>
        <div class="quiz-score-item">
          <span class="score-wrong">❌ Salah: ${quizState.wrong}</span>
        </div>
      </div>

      <button class="quiz-next-btn hidden" id="quiz-next-btn" onclick="nextQuizQuestion()">
        Soal Berikutnya →
      </button>
    </div>
  `;

  const quizInput = document.getElementById('quiz-answer');
  if (quizInput) {
    quizInput.focus();
    quizInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') checkQuizAnswer();
    });
  }
}

function checkQuizAnswer() {
  if (quizState.answered) return;

  const input = document.getElementById('quiz-answer');
  const feedback = document.getElementById('quiz-feedback');
  const nextBtn = document.getElementById('quiz-next-btn');
  if (!input || !feedback) return;

  const userAnswer = input.value.trim().toUpperCase();
  const q = quizState.questions[quizState.current];

  if (!userAnswer) return;

  quizState.answered = true;

  if (userAnswer === q.answer) {
    quizState.correct++;
    feedback.className = 'quiz-feedback correct';
    feedback.textContent = `✅ Benar! ${q.input} (${q.from}) = ${q.answer} (${q.to})`;
  } else {
    quizState.wrong++;
    feedback.className = 'quiz-feedback wrong';
    feedback.textContent = `❌ Salah. Jawaban yang benar: ${q.answer} (${q.to}). Anda menjawab: ${userAnswer}`;
  }

  input.disabled = true;

  if (nextBtn) {
    if (quizState.current < quizState.total - 1) {
      nextBtn.classList.remove('hidden');
      nextBtn.textContent = 'Soal Berikutnya →';
    } else {
      nextBtn.classList.remove('hidden');
      nextBtn.textContent = 'Lihat Hasil Akhir 🏆';
    }
  }
}

function nextQuizQuestion() {
  quizState.current++;

  if (quizState.current >= quizState.total) {
    showQuizResult();
    return;
  }

  renderQuizQuestion();
}

function showQuizResult() {
  const container = document.getElementById('quiz-container');
  if (!container) return;

  const percentage = Math.round((quizState.correct / quizState.total) * 100);
  let emoji, message;

  if (percentage >= 90) { emoji = '🏆'; message = 'Luar Biasa! Anda menguasai konversi bilangan!'; }
  else if (percentage >= 70) { emoji = '👏'; message = 'Bagus! Terus berlatih untuk hasil sempurna!'; }
  else if (percentage >= 50) { emoji = '💪'; message = 'Cukup baik! Pelajari kembali materi dan coba lagi.'; }
  else { emoji = '📚'; message = 'Perlu latihan lebih. Review materi konversi bilangan terlebih dahulu.'; }

  container.innerHTML = `
    <div class="quiz-card" style="padding: 48px;">
      <div style="font-size: 72px; margin-bottom: 24px;">${emoji}</div>
      <h2 style="font-family: var(--font-heading); font-size: 1.8rem; font-weight: 800; margin-bottom: 8px;">
        Skor Anda: <span class="text-gradient">${percentage}%</span>
      </h2>
      <p style="color: var(--text-secondary); margin-bottom: 24px;">${message}</p>
      
      <div style="display: flex; justify-content: center; gap: 32px; margin-bottom: 32px;">
        <div style="text-align: center;">
          <div style="font-size: 2rem; font-weight: 800; color: var(--accent-green);">${quizState.correct}</div>
          <div style="font-size: 0.8rem; color: var(--text-muted);">Benar</div>
        </div>
        <div style="text-align: center;">
          <div style="font-size: 2rem; font-weight: 800; color: var(--accent-red);">${quizState.wrong}</div>
          <div style="font-size: 0.8rem; color: var(--text-muted);">Salah</div>
        </div>
        <div style="text-align: center;">
          <div style="font-size: 2rem; font-weight: 800; color: var(--accent-blue);">${quizState.total}</div>
          <div style="font-size: 0.8rem; color: var(--text-muted);">Total</div>
        </div>
      </div>

      <div style="display: flex; gap: 12px; justify-content: center;">
        <button class="convert-btn" onclick="renderMinggu1Latihan(document.getElementById('content-body'))">
          🔄 Coba Lagi
        </button>
        <button class="quiz-next-btn" onclick="navigateTo('minggu1', 'minggu1-konversi')" style="margin-top: 0;">
          📖 Kembali ke Materi
        </button>
      </div>
    </div>
  `;
}

// =========================================================================
// ===== FITUR KONVERSI BILANGAN PECAHAN / KOMA (MINGGU 1) =====
// =========================================================================

// State for interactive fraction bit switcher
let fractionBitsState = [1, 0, 1, 0, 0, 0, 0, 0]; // Represents 0.10100000_2 = 0.625_10

function renderMinggu1Pecahan(container) {
  container.innerHTML = `
    <!-- Hero Section -->
    <div class="week-hero">
      <div class="week-hero-content">
        <div class="week-badge-row">
          <span class="tag tag-blue">Minggu 1</span>
          <span class="tag tag-green">Bilangan Pecahan / Koma</span>
        </div>
        <h1>Konversi Bilangan Pecahan (Radix Point)</h1>
        <p>Representasi angka di belakang koma: konversi desimal ke biner pecahan menggunakan perkalian beruntun (&times;2) serta pembobotan pangkat negatif ($2^{-n}$).</p>
      </div>
    </div>

    <!-- Converter Section 1: Desimal Pecahan ke Biner/Oktal/Hex -->
    <div class="glass-card mb-24">
      <div class="glass-card-header">
        <h3 class="glass-card-title">Konverter Desimal Koma &rarr; Biner, Oktal &amp; Heksadesimal</h3>
        <span class="badge-tag">Mendukung Koma (,) &amp; Titik (.)</span>
      </div>

      <div class="fraction-presets mb-12">
        <span style="font-size: 0.8rem; color: var(--text-muted);">Preset:</span>
        <button class="preset-chip" onclick="setPresetFraction('0.625')">0.625</button>
        <button class="preset-chip" onclick="setPresetFraction('12.375')">12.375</button>
        <button class="preset-chip" onclick="setPresetFraction('0.125')">0.125</button>
        <button class="preset-chip" onclick="setPresetFraction('25.8125')">25.8125</button>
        <button class="preset-chip" onclick="setPresetFraction('7,5')">7,5</button>
      </div>

      <div class="converter-input-wrap">
        <div class="input-group" style="flex: 1; max-width: 480px;">
          <label class="input-label">Angka Desimal (Bulat + Koma):</label>
          <div style="display: flex; gap: 8px;">
            <input type="text" class="input-field compact-input" id="input-fraction-dec" 
                   placeholder="Contoh: 12.625 atau 0,375" value="12.625"
                   autocomplete="off" oninput="calculateDecimalFraction()">
            <button class="convert-btn compact-btn" onclick="calculateDecimalFraction()">
              Hitung
            </button>
          </div>
        </div>
      </div>

      <!-- Result Cards Grid -->
      <div class="fraction-result-grid mt-16" id="fraction-results-container">
        <!-- Filled by calculateDecimalFraction() -->
      </div>

      <!-- Step by Step Calculation Visualizer -->
      <div id="fraction-steps-container" class="mt-16">
        <!-- Detailed steps for integer & fraction -->
      </div>
    </div>

    <!-- Converter Section 2: Interactive Binary Fraction Bit Switcher -->
    <div class="glass-card mb-24">
      <div class="glass-card-header">
        <h3 class="glass-card-title">Simulator Papan Bit Pecahan ($2^{-n}$)</h3>
        <span class="badge-tag">Klik Bit Interaktif</span>
      </div>
      <p style="color: var(--text-secondary); margin-bottom: 12px; font-size: 0.85rem;">
        Klik kotak bit untuk menghidupkan/mematikan bit koma (<code class="inline-code">0.b₁b₂b₃...</code>) dan amati akumulasi desimalnya:
      </p>

      <div class="interactive-fraction-board">
        <div class="radix-point-indicator">
          <span class="radix-zero">0</span><span class="radix-dot">.</span>
        </div>
        <div class="fraction-bits-list" id="fraction-bits-list">
          <!-- Populated by renderInteractiveFractionBits() -->
        </div>
      </div>

      <!-- Accumulation Breakdown -->
      <div class="fraction-calc-breakdown mt-12" id="fraction-calc-breakdown">
        <!-- Populated by updateFractionAccumulation() -->
      </div>
    </div>

    <!-- Cheat Sheet Table: Negative Powers of 2 -->
    <div class="glass-card mb-24">
      <div class="glass-card-header">
        <h3 class="glass-card-title">Tabel Referensi Bobot Pangkat Negatif ($2^{-n}$)</h3>
      </div>
      <div class="table-responsive">
        <table class="cheat-table" style="width: 100%;">
          <thead>
            <tr>
              <th>Posisi Bit</th>
              <th>Pangkat</th>
              <th>Pecahan</th>
              <th>Nilai Desimal</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Bit 1</td>
              <td><code>2⁻¹</code></td>
              <td>1/2</td>
              <td><strong class="text-blue">0.5</strong></td>
            </tr>
            <tr>
              <td>Bit 2</td>
              <td><code>2⁻²</code></td>
              <td>1/4</td>
              <td><strong class="text-cyan">0.25</strong></td>
            </tr>
            <tr>
              <td>Bit 3</td>
              <td><code>2⁻³</code></td>
              <td>1/8</td>
              <td><strong class="text-green">0.125</strong></td>
            </tr>
            <tr>
              <td>Bit 4</td>
              <td><code>2⁻⁴</code></td>
              <td>1/16</td>
              <td><strong style="color: var(--accent-orange);">0.0625</strong></td>
            </tr>
            <tr>
              <td>Bit 5</td>
              <td><code>2⁻⁵</code></td>
              <td>1/32</td>
              <td><strong class="text-purple">0.03125</strong></td>
            </tr>
            <tr>
              <td>Bit 6</td>
              <td><code>2⁻⁶</code></td>
              <td>1/64</td>
              <td><strong class="text-pink">0.015625</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `;

  calculateDecimalFraction();
  renderInteractiveFractionBits();
}

function setPresetFraction(val) {
  const input = document.getElementById('input-fraction-dec');
  if (input) {
    input.value = val;
    calculateDecimalFraction();
  }
}

// Convert Decimal (Integer + Fraction) with steps
function calculateDecimalFraction() {
  const input = document.getElementById('input-fraction-dec');
  const resultsContainer = document.getElementById('fraction-results-container');
  const stepsContainer = document.getElementById('fraction-steps-container');
  if (!input || !resultsContainer || !stepsContainer) return;

  // Normalize Indonesian comma to dot
  let rawVal = input.value.trim().replace(',', '.');
  if (rawVal === '' || isNaN(parseFloat(rawVal))) {
    resultsContainer.innerHTML = '<div class="alert alert-warning">Masukkan angka desimal yang valid (contoh: 12.625 atau 0,375).</div>';
    stepsContainer.innerHTML = '';
    return;
  }

  const num = parseFloat(rawVal);
  if (num < 0) {
    resultsContainer.innerHTML = '<div class="alert alert-warning">Fitur konversi ini untuk bilangan positif bertanda koma. Untuk bilangan negatif, silakan buka menu Minggu 2.</div>';
    stepsContainer.innerHTML = '';
    return;
  }

  const intPart = Math.floor(num);
  let fracPart = num - intPart;

  // 1. Integer conversion
  const intBin = intPart.toString(2);
  const intOct = intPart.toString(8);
  const intHex = intPart.toString(16).toUpperCase();

  // 2. Fractional conversion using multiplication by 2
  const fracSteps = [];
  let currentFrac = fracPart;
  let fracBits = '';
  const maxPrecision = 10;
  let isExact = false;

  for (let i = 0; i < maxPrecision; i++) {
    if (currentFrac === 0) {
      isExact = true;
      break;
    }
    const mult = currentFrac * 2;
    const bit = Math.floor(mult);
    const nextFrac = mult - bit;
    fracSteps.push({
      step: i + 1,
      input: currentFrac.toFixed(6).replace(/\.?0+$/, ''),
      product: mult.toFixed(6).replace(/\.?0+$/, ''),
      bit: bit,
      remainder: nextFrac.toFixed(6).replace(/\.?0+$/, '')
    });
    fracBits += bit;
    currentFrac = Math.round(nextFrac * 100000000) / 100000000;
  }

  if (fracBits === '') fracBits = '0';

  const fullBinary = `${intBin}.${fracBits}`;

  // Fractional Octal & Hexadecimal approx
  // Multiply fraction by 8
  let fracOctSteps = [];
  let curOctFrac = fracPart;
  let fracOctDigits = '';
  for (let i = 0; i < 4; i++) {
    if (curOctFrac === 0) break;
    let mult = curOctFrac * 8;
    let digit = Math.floor(mult);
    fracOctDigits += digit;
    curOctFrac = mult - digit;
  }
  const fullOctal = `${intOct}${fracOctDigits ? '.' + fracOctDigits : ''}`;

  // Multiply fraction by 16
  let curHexFrac = fracPart;
  let fracHexDigits = '';
  for (let i = 0; i < 4; i++) {
    if (curHexFrac === 0) break;
    let mult = curHexFrac * 16;
    let digit = Math.floor(mult);
    fracHexDigits += digit.toString(16).toUpperCase();
    curHexFrac = mult - digit;
  }
  const fullHex = `${intHex}${fracHexDigits ? '.' + fracHexDigits : ''}`;

  // Render Result Cards
  resultsContainer.innerHTML = `
    <div class="result-card-glow result-card-bin">
      <div class="result-header">
        <span class="result-badge">Biner (Basis 2)</span>
        <span class="result-icon">⚡</span>
      </div>
      <div class="result-value-main font-mono">
        <span class="int-part">${intBin}</span><span class="radix-dot-highlight">.</span><span class="frac-part">${fracBits}</span>₂
      </div>
      <div class="result-desc">Bagian Bulat: <strong>${intBin}</strong> | Pecahan: <strong>.${fracBits}</strong></div>
    </div>

    <div class="result-card-glow result-card-oct">
      <div class="result-header">
        <span class="result-badge">Oktal (Basis 8)</span>
        <span class="result-icon">📦</span>
      </div>
      <div class="result-value-main font-mono">
        ${fullOctal}₈
      </div>
      <div class="result-desc">Dikelompokkan 3 bit dari koma</div>
    </div>

    <div class="result-card-glow result-card-hex">
      <div class="result-header">
        <span class="result-badge">Heksadesimal (Basis 16)</span>
        <span class="result-icon">💎</span>
      </div>
      <div class="result-value-main font-mono">
        ${fullHex}₁₆
      </div>
      <div class="result-desc">Dikelompokkan 4 bit dari koma</div>
    </div>
  `;

  // Render Step-by-Step Explanation
  let fracTableRows = '';
  if (fracSteps.length === 0) {
    fracTableRows = `<tr><td colspan="4" style="text-align:center; padding:12px; color:var(--text-muted);">Tidak ada bagian pecahan (nilai koma = 0).</td></tr>`;
  } else {
    fracSteps.forEach((s) => {
      fracTableRows += `
        <tr>
          <td style="padding:10px; font-family:var(--font-mono);">${s.input} &times; 2</td>
          <td style="padding:10px; font-family:var(--font-mono); font-weight:600; color:var(--text-primary);">${s.product}</td>
          <td style="padding:10px; text-align:center;">
            <span class="bit-tag ${s.bit === 1 ? 'bit-tag-one' : 'bit-tag-zero'}">${s.bit}</span>
          </td>
          <td style="padding:10px; font-family:var(--font-mono); color:var(--text-muted);">${s.remainder}</td>
        </tr>
      `;
    });
  }

  stepsContainer.innerHTML = `
    <div class="fraction-method-box">
      <h4 style="color: var(--accent-blue); margin-bottom: 12px; display:flex; align-items:center; gap:8px;">
        <span>📖</span> Penjelasan Langkah Demi Langkah: Konversi ${rawVal}
      </h4>
      <div class="method-steps-grid">
        <!-- Bagian Bulat -->
        <div class="method-col">
          <div class="method-title">1. Bagian Bulat (${intPart}) &rarr; Pembagian Beruntun (&divide; 2)</div>
          <p style="font-size:0.9rem; color:var(--text-secondary); margin-bottom:12px;">
            Bagi ${intPart} dengan 2 berulang kali sampai hasil bagi 0, lalu baca sisa bagi dari bawah ke atas:
          </p>
          <div class="code-box-inline font-mono">
            ${intPart}₁₀ = <strong style="color:var(--accent-blue);">${intBin}₂</strong>
          </div>
        </div>

        <!-- Bagian Pecahan -->
        <div class="method-col">
          <div class="method-title">2. Bagian Pecahan (0.${fracPart.toString().split('.')[1] || '0'}) &rarr; Perkalian Beruntun (&times; 2)</div>
          <p style="font-size:0.9rem; color:var(--text-secondary); margin-bottom:12px;">
            Kalikan bagian pecahan dengan 2. Ambil angka di depan koma (0 atau 1) sebagai bit pecahan, lalu baca dari <strong>ATAS KE BAWAH</strong>:
          </p>
          <div style="overflow-x:auto;">
            <table class="cheat-table" style="width:100%; font-size:0.85rem;">
              <thead>
                <tr>
                  <th>Operasi (&times; 2)</th>
                  <th>Hasil</th>
                  <th style="text-align:center;">Bit Diambil</th>
                  <th>Sisa Koma</th>
                </tr>
              </thead>
              <tbody>
                ${fracTableRows}
              </tbody>
            </table>
          </div>
          <div class="code-box-inline font-mono mt-16">
            Hasil Pecahan = <strong style="color:var(--accent-green);">0.${fracBits}₂</strong>
            ${isExact ? '<span style="color:var(--accent-green); font-size:0.8rem; margin-left:8px;">✓ Tepat (Sisa 0)</span>' : '<span style="color:var(--accent-orange); font-size:0.8rem; margin-left:8px;">(Aproksimasi)</span>'}
          </div>
        </div>
      </div>

      <!-- Hasil Akhir -->
      <div class="final-formula-card mt-16">
        <div>💡 <strong>Hasil Gabungan:</strong> ${intBin} (bulat) + .${fracBits} (pecahan) = <span style="color:var(--accent-blue); font-family:var(--font-mono); font-size:1.2rem; font-weight:700;">${fullBinary}₂</span></div>
      </div>
    </div>
  `;
}

// Interactive Fraction Bit Switcher
function renderInteractiveFractionBits() {
  const container = document.getElementById('fraction-bits-list');
  if (!container) return;

  let html = '';
  const weights = [0.5, 0.25, 0.125, 0.0625, 0.03125, 0.015625, 0.0078125, 0.00390625];
  const powerLabels = ['2⁻¹', '2⁻²', '2⁻³', '2⁻⁴', '2⁻⁵', '2⁻⁶', '2⁻⁷', '2⁻⁸'];

  fractionBitsState.forEach((bit, idx) => {
    const isActive = bit === 1;
    html += `
      <div class="fraction-bit-col" onclick="toggleFractionBit(${idx})">
        <div class="bit-weight-label">${powerLabels[idx]}</div>
        <div class="fraction-bit-box ${isActive ? 'bit-active' : 'bit-inactive'}">
          ${bit}
        </div>
        <div class="bit-dec-label">${weights[idx]}</div>
      </div>
    `;
  });

  container.innerHTML = html;
  updateFractionAccumulation();
}

function toggleFractionBit(index) {
  fractionBitsState[index] = fractionBitsState[index] === 1 ? 0 : 1;
  renderInteractiveFractionBits();
}

function updateFractionAccumulation() {
  const container = document.getElementById('fraction-calc-breakdown');
  if (!container) return;

  const weights = [0.5, 0.25, 0.125, 0.0625, 0.03125, 0.015625, 0.0078125, 0.00390625];
  const powerLabels = ['2⁻¹', '2⁻²', '2⁻³', '2⁻⁴', '2⁻⁵', '2⁻⁶', '2⁻⁷', '2⁻⁸'];

  let sum = 0;
  const activeTerms = [];
  const bitString = fractionBitsState.join('');

  fractionBitsState.forEach((bit, idx) => {
    if (bit === 1) {
      sum += weights[idx];
      activeTerms.push(`(${powerLabels[idx]} = ${weights[idx]})`);
    }
  });

  const formulaStr = activeTerms.length > 0 ? activeTerms.join(' + ') : '0';

  container.innerHTML = `
    <div class="breakdown-inner">
      <div class="breakdown-formula">
        <strong>Rumus Akumulasi:</strong>
        <span class="font-mono" style="color:var(--text-secondary); margin-left:8px;">${formulaStr}</span>
      </div>
      <div class="breakdown-result-row">
        <div class="bin-display">
          <span>Biner:</span>
          <strong class="font-mono" style="color:var(--accent-blue); font-size:1.3rem;">0.${bitString}₂</strong>
        </div>
        <div class="arrow-sym">&harr;</div>
        <div class="dec-display">
          <span>Nilai Desimal:</span>
          <strong class="font-mono" style="color:var(--accent-green); font-size:1.5rem;">${sum.toFixed(8).replace(/\.?0+$/, '')}₁₀</strong>
        </div>
      </div>
    </div>
  `;
}

// Expose to window
window.renderMinggu1Pecahan = renderMinggu1Pecahan;
window.setPresetFraction = setPresetFraction;
window.calculateDecimalFraction = calculateDecimalFraction;
window.toggleFractionBit = toggleFractionBit;
