/**
 * minggu2.js - Media Ajar Interaktif: Representasi Bilangan Negatif & Operasi Bilangan Biner
 * Compact, Professional & Clean Layout
 */

// Global State for Minggu 2
let animState = {
  activeStep: 0,
  maxSteps: 3,
  intervalId: null,
  speed: 1200, // ms
  val: 13,
  binAbs: '00001101',
  ones: '11110010',
  twos: '11110011'
};

let msbInteractiveBits = [0, 0, 0, 0, 1, 1, 0, 1]; // 8-bit default (+13)

// =========================================================================
// SUBMENU 1: MATERI REPRESENTASI BILANGAN NEGATIF & 2'S COMPLEMENT
// =========================================================================
function renderMinggu2Materi(container) {
  container.innerHTML = `
    <!-- Hero Section -->
    <div class="week-hero">
      <div class="week-hero-content">
        <div class="week-badge-row">
          <span class="tag tag-pink">Minggu 2</span>
          <span class="tag tag-blue">Signed Binary</span>
        </div>
        <h1>Bilangan Negatif &amp; 2's Complement</h1>
        <p>Sistem digital hanya mengenal 0 dan 1. Pelajari bagaimana komputer menyimpan bilangan bertanda melalui bit tanda (MSB) dan mengapa <strong>2's Complement</strong> menjadi standar prosesor modern.</p>
        <div class="week-hero-tags">
          <span class="tag tag-green">MSB: Bit Tanda (+ / -)</span>
          <span class="tag tag-yellow">2's Complement Standar CPU</span>
          <span class="tag tag-purple">Animasi Step-by-Step</span>
        </div>
      </div>
    </div>

    <!-- 1. Interactive MSB Visualizer Strip -->
    <div class="glass-card mb-24">
      <div class="glass-card-header">
        <h3 class="glass-card-title">Visualizer Interaktif: Kenali Bit Tanda (MSB)</h3>
        <span class="badge-tag">8-Bit Signed</span>
      </div>
      <p style="color: var(--text-secondary); margin-bottom: 16px; font-size: 0.88rem;">
        Bit paling kiri disebut <strong>MSB (Most Significant Bit)</strong> dan berfungsi sebagai <strong>Tanda Bilangan</strong>: <span class="text-green font-weight-bold">0 = Positif (+)</span> dan <span class="text-red font-weight-bold">1 = Negatif (-)</span>. Klik setiap kotak bit atau ketik angka desimal:
      </p>

      <div class="msb-visualizer-container">
        <!-- Control Bar -->
        <div class="msb-control-bar">
          <div class="msb-input-wrap">
            <label class="input-label">Desimal (-128 s.d 127):</label>
            <div class="msb-input-row">
              <input type="number" id="msb-dec-input" class="input-field compact-input" value="13" min="-128" max="127" oninput="onMsbDecInputChange()">
              <button class="preset-chip" onclick="setMsbPreset(-13)">-13</button>
              <button class="preset-chip" onclick="setMsbPreset(25)">+25</button>
              <button class="preset-chip" onclick="setMsbPreset(-42)">-42</button>
            </div>
          </div>
          <div class="msb-legend-badges">
            <span class="legend-badge legend-pos">Bit 0 = Positif (+)</span>
            <span class="legend-badge legend-neg">Bit 1 = Negatif (-)</span>
          </div>
        </div>

        <!-- 8-Bit Visual Display Box -->
        <div class="bit-register-display mt-16">
          <div class="bit-register-labels">
            <span class="msb-badge-indicator" id="msb-role-badge">MSB = 0 [POSITIF]</span>
            <span class="mag-label">7 Bit Nilai (Magnitude)</span>
          </div>

          <div class="bit-boxes-row" id="msb-bit-boxes-row">
            <!-- Populated by updateMsbVisualizerUI() -->
          </div>

          <div class="bit-weights-row">
            <span class="weight-item weight-msb">-128</span>
            <span class="weight-item">64</span>
            <span class="weight-item">32</span>
            <span class="weight-item">16</span>
            <span class="weight-item">8</span>
            <span class="weight-item">4</span>
            <span class="weight-item">2</span>
            <span class="weight-item">1</span>
          </div>
        </div>

        <!-- Compact Summary Box -->
        <div class="msb-status-summary mt-16" id="msb-status-summary">
          <!-- Populated by updateMsbVisualizerUI() -->
        </div>
      </div>
    </div>

    <!-- 2. "2's Complement: Jagoan Utama CPU" Showcase -->
    <div class="glass-card mb-24 champion-highlight-card">
      <div class="glass-card-header">
        <h3 class="glass-card-title">Mengapa 2's Complement Menjadi Standar Utama CPU?</h3>
        <span class="badge-tag tag-gold">Standar Industri</span>
      </div>
      <p style="color: var(--text-secondary); margin-bottom: 16px; font-size: 0.88rem;">
        Seluruh arsitektur prosesor modern (x86, ARM, RISC-V) mengadopsi <strong>2's Complement</strong> karena efisiensi hardware yang luar biasa:
      </p>

      <div class="champion-reasons-grid">
        <div class="champion-reason-card">
          <div class="reason-badge">01</div>
          <div class="reason-body">
            <h4>Hanya Satu Nilai Nol (Unik)</h4>
            <p>Pada <em>Sign-Magnitude</em> dan <em>1's Complement</em> terdapat dua nilai nol: <strong>+0</strong> dan <strong>-0</strong>. 2's Complement hanya memiliki satu representasi nol (<code class="inline-code">00000000</code>), menghilangkan ambiguitas logika CPU.</p>
          </div>
        </div>

        <div class="champion-reason-card">
          <div class="reason-badge">02</div>
          <div class="reason-body">
            <h4>Sirkuit Adder Melakukan Pengurangan</h4>
            <p>Komputer tidak memerlukan sirkuit subtractor khusus. Operasi pengurangan <code class="inline-code">A - B</code> langsung dieksekusi dengan adder yang sama melalui <code class="inline-code">A + (~B + 1)</code>, menghemat jutaan transistor.</p>
          </div>
        </div>
      </div>

      <!-- Compact Perbandingan Table -->
      <div class="table-responsive mt-16">
        <table class="cheat-table" style="width: 100%;">
          <thead>
            <tr>
              <th>Skema</th>
              <th>Rentang (8-bit)</th>
              <th>Angka Nol</th>
              <th>Efisiensi Aritmatika</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Sign-Magnitude</td>
              <td>-127 s.d +127</td>
              <td>Ganda (+0 &amp; -0)</td>
              <td>Perlu sirkuit pengurangan khusus</td>
            </tr>
            <tr>
              <td>1's Complement</td>
              <td>-127 s.d +127</td>
              <td>Ganda (+0 &amp; -0)</td>
              <td>Perlu end-around carry</td>
            </tr>
            <tr class="row-champion">
              <td><strong>2's Complement</strong></td>
              <td><strong>-128 s.d +127</strong></td>
              <td><span class="text-green font-weight-bold">Tunggal (00000000)</span></td>
              <td><strong class="text-cyan">Standar CPU (Adder = Subtractor)</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 3. Studio Animasi Step-by-Step Konversi Negatif -->
    <div class="glass-card mb-24">
      <div class="glass-card-header">
        <h3 class="glass-card-title">Animasi Step-by-Step: Pembentukan 2's Complement</h3>
        <span class="badge-tag">Pelan &amp; Jelas</span>
      </div>
      <p style="color: var(--text-secondary); margin-bottom: 16px; font-size: 0.88rem;">
        Konversi bilangan positif ke negatif dilakukan dalam dua tahap: <strong>1's Complement (NOT inversi semua bit)</strong>, lalu <strong>ditambah 1 pada LSB</strong>.
      </p>

      <!-- Animation Control Bar -->
      <div class="anim-control-card">
        <div class="anim-input-cluster">
          <label class="input-label">Pilih Angka Positif (+X):</label>
          <div class="anim-input-row">
            <input type="number" id="anim-target-input" class="input-field compact-input" value="13" min="1" max="127" style="width: 70px;">
            <button class="convert-btn compact-btn" onclick="applyAnimInput()">Terapkan</button>
            <button class="preset-chip" onclick="setAnimVal(13)">+13</button>
            <button class="preset-chip" onclick="setAnimVal(25)">+25</button>
            <button class="preset-chip" onclick="setAnimVal(42)">+42</button>
          </div>
        </div>

        <div class="anim-playback-cluster mt-12">
          <button class="anim-btn-play" id="anim-play-btn" onclick="toggleAnimPlayback()">
            <span id="anim-play-icon">▶</span>
            <span id="anim-play-text">Putar</span>
          </button>
          <button class="anim-btn-step" onclick="stepAnimPrev()">Mundur</button>
          <button class="anim-btn-step" onclick="stepAnimNext()">Berikutnya</button>
          <button class="anim-btn-step" onclick="resetAnim()">Reset</button>

          <div class="speed-toggle">
            <span>Kecepatan:</span>
            <select id="anim-speed-select" class="input-field compact-select" onchange="changeAnimSpeed(this.value)">
              <option value="1500" selected>Pelan (1.5s)</option>
              <option value="900">Normal (0.9s)</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Animation Stage Container -->
      <div class="anim-stage-container mt-16" id="anim-stage-container">
        <!-- Populated by renderAnimStage() -->
      </div>
    </div>
  `;

  updateMsbVisualizerUI();
  initAnimState();
}

// MSB Visualizer Logic
function setMsbPreset(val) {
  const input = document.getElementById('msb-dec-input');
  if (input) {
    input.value = val;
    onMsbDecInputChange();
  }
}

function onMsbDecInputChange() {
  const input = document.getElementById('msb-dec-input');
  if (!input) return;
  let val = parseInt(input.value);
  if (isNaN(val)) return;

  if (val < -128) val = -128;
  if (val > 127) val = 127;

  let byteVal = val >= 0 ? val : (256 + val);
  let binStr = byteVal.toString(2).padStart(8, '0');
  msbInteractiveBits = binStr.split('').map(b => parseInt(b));

  updateMsbVisualizerUI(val);
}

function toggleInteractiveBit(index) {
  msbInteractiveBits[index] = msbInteractiveBits[index] === 1 ? 0 : 1;
  let binStr = msbInteractiveBits.join('');
  let uint = parseInt(binStr, 2);
  let signedVal = uint >= 128 ? uint - 256 : uint;

  const input = document.getElementById('msb-dec-input');
  if (input) input.value = signedVal;

  updateMsbVisualizerUI(signedVal);
}

function updateMsbVisualizerUI(signedVal = null) {
  const boxesRow = document.getElementById('msb-bit-boxes-row');
  const roleBadge = document.getElementById('msb-role-badge');
  const summaryBox = document.getElementById('msb-status-summary');
  if (!boxesRow) return;

  if (signedVal === null) {
    let uint = parseInt(msbInteractiveBits.join(''), 2);
    signedVal = uint >= 128 ? uint - 256 : uint;
  }

  const isPositive = msbInteractiveBits[0] === 0;

  if (roleBadge) {
    if (isPositive) {
      roleBadge.className = 'msb-badge-indicator badge-positive';
      roleBadge.textContent = 'MSB = 0 [POSITIF (+)]';
    } else {
      roleBadge.className = 'msb-badge-indicator badge-negative';
      roleBadge.textContent = 'MSB = 1 [NEGATIF (-)]';
    }
  }

  let boxesHtml = '';
  msbInteractiveBits.forEach((bit, i) => {
    if (i === 0) {
      const msbClass = bit === 1 ? 'bit-box-msb-neg' : 'bit-box-msb-pos';
      boxesHtml += `
        <div class="bit-box-wrap" onclick="toggleInteractiveBit(${i})" title="Klik untuk membalik bit tanda MSB">
          <div class="bit-pos-tag">MSB</div>
          <div class="bit-box ${msbClass}">
            <span class="bit-num">${bit}</span>
          </div>
          <div class="bit-sub-label ${bit === 1 ? 'text-red' : 'text-green'}">${bit === 1 ? 'Tanda (-)' : 'Tanda (+)'}</div>
        </div>
      `;
    } else {
      boxesHtml += `
        <div class="bit-box-wrap" onclick="toggleInteractiveBit(${i})" title="Klik untuk membalik bit ${7 - i}">
          <div class="bit-pos-tag">b${7 - i}</div>
          <div class="bit-box ${bit === 1 ? 'bit-box-one' : 'bit-box-zero'}">
            <span class="bit-num">${bit}</span>
          </div>
          <div class="bit-sub-label">${Math.pow(2, 7 - i)}</div>
        </div>
      `;
    }
  });

  boxesRow.innerHTML = boxesHtml;

  if (summaryBox) {
    summaryBox.innerHTML = `
      <div class="summary-inline">
        <div class="summary-val-wrap">
          <span class="summary-caption">Nilai Desimal:</span>
          <strong class="font-mono ${isPositive ? 'text-green' : 'text-red'}" style="font-size:1.15rem;">${signedVal >= 0 ? '+' : ''}${signedVal}₁₀</strong>
        </div>
        <div class="summary-sep">|</div>
        <div class="summary-bin-wrap">
          <span class="summary-caption">Format 2's Complement:</span>
          <span class="font-mono" style="font-size:1.05rem;">
            <strong class="${isPositive ? 'text-green' : 'text-red'}">${msbInteractiveBits[0]}</strong>${msbInteractiveBits.slice(1).join('')}₂
          </span>
        </div>
        <div class="summary-desc">
          ${isPositive ? 
            `<span class="text-green">✓ MSB bernilai 0: Positif</span>` : 
            `<span class="text-red">✓ MSB bernilai 1: Negatif (Bobot MSB = -128)</span>`
          }
        </div>
      </div>
    `;
  }
}

// Animation Engine
function setAnimVal(val) {
  const input = document.getElementById('anim-target-input');
  if (input) {
    input.value = val;
    applyAnimInput();
  }
}

function applyAnimInput() {
  const input = document.getElementById('anim-target-input');
  if (!input) return;
  let val = parseInt(input.value);
  if (isNaN(val) || val < 1 || val > 127) {
    alert("Masukkan angka desimal positif antara 1 hingga 127.");
    return;
  }

  animState.val = val;
  animState.binAbs = val.toString(2).padStart(8, '0');
  animState.ones = animState.binAbs.split('').map(b => b === '0' ? '1' : '0').join('');
  let num2s = (~val + 1) & 255;
  animState.twos = num2s.toString(2).padStart(8, '0');
  resetAnim();
}

function initAnimState() {
  applyAnimInput();
}

function resetAnim() {
  stopAnimPlayback();
  animState.activeStep = 0;
  renderAnimStage();
}

function changeAnimSpeed(spd) {
  animState.speed = parseInt(spd);
  if (animState.intervalId) {
    stopAnimPlayback();
    startAnimPlayback();
  }
}

function toggleAnimPlayback() {
  if (animState.intervalId) {
    stopAnimPlayback();
  } else {
    startAnimPlayback();
  }
}

function startAnimPlayback() {
  const playIcon = document.getElementById('anim-play-icon');
  const playText = document.getElementById('anim-play-text');
  if (playIcon) playIcon.textContent = '⏸';
  if (playText) playText.textContent = 'Jeda';

  animState.intervalId = setInterval(() => {
    if (animState.activeStep < animState.maxSteps - 1) {
      animState.activeStep++;
      renderAnimStage();
    } else {
      stopAnimPlayback();
    }
  }, animState.speed);
}

function stopAnimPlayback() {
  if (animState.intervalId) {
    clearInterval(animState.intervalId);
    animState.intervalId = null;
  }
  const playIcon = document.getElementById('anim-play-icon');
  const playText = document.getElementById('anim-play-text');
  if (playIcon) playIcon.textContent = '▶';
  if (playText) playText.textContent = 'Putar';
}

function stepAnimNext() {
  stopAnimPlayback();
  if (animState.activeStep < animState.maxSteps - 1) {
    animState.activeStep++;
    renderAnimStage();
  }
}

function stepAnimPrev() {
  stopAnimPlayback();
  if (animState.activeStep > 0) {
    animState.activeStep--;
    renderAnimStage();
  }
}

function renderAnimStage() {
  const stage = document.getElementById('anim-stage-container');
  if (!stage) return;

  const currentStep = animState.activeStep;
  const val = animState.val;
  const binAbs = animState.binAbs;
  const ones = animState.ones;
  const twos = animState.twos;

  let stepCardsHtml = '';

  // Step 1: Positif Asli
  stepCardsHtml += `
    <div class="anim-step-card ${currentStep >= 0 ? 'card-active' : ''}">
      <div class="anim-step-header">
        <span class="step-badge ${currentStep === 0 ? 'badge-current' : 'badge-done'}">Langkah 1</span>
        <h4 class="step-title">Tulis Angka Positif (+${val}) dalam 8-bit</h4>
      </div>
      <div class="anim-bits-row mt-8">
        ${renderBitsRowWithMsb(binAbs, 'pos')}
      </div>
      <div class="step-note mt-6">
        Biner Asli: <strong class="font-mono text-cyan">${binAbs}₂</strong> (MSB = 0, bernilai positif)
      </div>
    </div>
  `;

  // Step 2: 1's Complement
  if (currentStep >= 1) {
    stepCardsHtml += `
      <div class="anim-step-card card-active anim-step-enter mt-12">
        <div class="anim-step-header">
          <span class="step-badge ${currentStep === 1 ? 'badge-current' : 'badge-done'}">Langkah 2</span>
          <h4 class="step-title">Inversi Semua Bit (NOT Operator) &rarr; 1's Complement</h4>
        </div>
        <div class="anim-bits-row mt-8">
          ${renderBitsRowWithMsb(ones, 'inv')}
        </div>
        <div class="step-note mt-6">
          Hasil 1's Complement: <strong class="font-mono text-purple">${ones}₂</strong> (Setiap bit 0 &harr; 1)
        </div>
      </div>
    `;
  }

  // Step 3: 2's Complement
  if (currentStep >= 2) {
    stepCardsHtml += `
      <div class="anim-step-card card-active card-gold-border anim-step-enter mt-12">
        <div class="anim-step-header">
          <span class="step-badge badge-gold">Langkah 3</span>
          <h4 class="step-title">Tambahkan 1 pada LSB &rarr; 2's Complement Final!</h4>
        </div>

        <div class="math-compact-row mt-8">
          <span class="font-mono">${ones}</span>
          <span class="text-cyan font-mono">&plus; 1</span>
          <span class="math-eq">&equals;</span>
          <span class="font-mono text-green font-weight-bold" style="font-size:1.1rem;">${twos}</span>
        </div>

        <div class="anim-bits-row mt-8">
          ${renderBitsRowWithMsb(twos, 'final')}
        </div>

        <div class="step-final-note mt-8">
          Hasil Akhir 2's Complement dari <strong>-${val}</strong> adalah: <strong class="font-mono text-green" style="font-size:1.1rem;">${twos}₂</strong>
          <span class="sub-text">(MSB = 1 menandakan bilangan negatif)</span>
        </div>
      </div>
    `;
  }

  stage.innerHTML = stepCardsHtml;
}

function renderBitsRowWithMsb(binStr, styleType) {
  let html = '';
  const bits = binStr.split('');
  bits.forEach((b, idx) => {
    if (idx === 0) {
      const msbColor = b === '1' ? 'res-msb-neg' : 'res-msb-pos';
      html += `
        <div class="compact-bit-cell ${msbColor}" title="MSB (Tanda)">
          <span class="cell-val">${b}</span>
          <span class="cell-label">MSB</span>
        </div>
      `;
    } else {
      html += `
        <div class="compact-bit-cell ${b === '1' ? 'cell-one' : 'cell-zero'}">
          <span class="cell-val">${b}</span>
          <span class="cell-label">b${7 - idx}</span>
        </div>
      `;
    }
  });
  return html;
}


// =========================================================================
// SUBMENU 2: PENGURANGAN VIA PENJUMLAHAN & ARITMATIKA BINER
// =========================================================================
function renderMinggu2Aritmatika(container) {
  container.innerHTML = `
    <!-- Hero Section -->
    <div class="week-hero">
      <div class="week-hero-content">
        <div class="week-badge-row">
          <span class="tag tag-blue">Minggu 2</span>
          <span class="tag tag-pink">Aritmatika Digital</span>
        </div>
        <h1>Pengurangan via Penjumlahan: $A - B = A + (\\text{C2 dari } B)$</h1>
        <p>Arsitektur ALU prosesor menghitung pengurangan dengan menyulap bilangan pengurang $B$ menjadi bentuk 2's Complement terlebih dahulu, lalu menjumlahkannya.</p>
      </div>
    </div>

    <!-- Sleek Formula Banner -->
    <div class="formula-master-card mb-20">
      <div class="formula-latex-display">
        <span class="f-box f-a">A</span>
        <span class="f-op">&minus;</span>
        <span class="f-box f-b">B</span>
        <span class="f-eq">&equals;</span>
        <span class="f-box f-a">A</span>
        <span class="f-plus">&plus;</span>
        <span class="f-box f-c2">2's Complement(B)</span>
      </div>
    </div>

    <!-- Interactive Subtraction / Addition Studio -->
    <div class="glass-card mb-24">
      <div class="glass-card-header">
        <h3 class="glass-card-title">Studio Operasi Biner</h3>
        <span class="badge-tag">Kalkulator Digital</span>
      </div>

      <!-- Presets -->
      <div class="fraction-presets mb-12">
        <span style="font-size: 0.8rem; color: var(--text-muted);">Preset:</span>
        <button class="preset-chip" onclick="setArithPreset(18, 25, '-')">18 - 25</button>
        <button class="preset-chip" onclick="setArithPreset(45, 20, '-')">45 - 20</button>
        <button class="preset-chip" onclick="setArithPreset(12, 30, '-')">12 - 30</button>
        <button class="preset-chip" onclick="setArithPreset(70, 40, '+')">70 + 40</button>
        <button class="preset-chip" onclick="setArithPreset(100, 60, '+')">100 + 60</button>
      </div>

      <!-- Controls -->
      <div class="arith-input-grid">
        <div class="input-group">
          <label class="input-label">Bilangan A:</label>
          <input type="number" id="arith-input-a" class="input-field compact-input" value="18" oninput="calculateBinaryArithmetic()">
        </div>

        <div class="input-group" style="max-width: 100px;">
          <label class="input-label">Operasi:</label>
          <select id="arith-op" class="input-field compact-select" onchange="calculateBinaryArithmetic()">
            <option value="-" selected>&minus; (Kurang)</option>
            <option value="+">&plus; (Tambah)</option>
          </select>
        </div>

        <div class="input-group">
          <label class="input-label">Bilangan B:</label>
          <input type="number" id="arith-input-b" class="input-field compact-input" value="25" oninput="calculateBinaryArithmetic()">
        </div>

        <button class="convert-btn compact-btn" onclick="calculateBinaryArithmetic()" style="height:36px; align-self:flex-end;">
          Hitung
        </button>
      </div>

      <!-- Output Container -->
      <div class="arith-output-container mt-16" id="arith-output-container">
        <!-- Filled by calculateBinaryArithmetic() -->
      </div>
    </div>
  `;

  calculateBinaryArithmetic();
}

function setArithPreset(a, b, op) {
  const inputA = document.getElementById('arith-input-a');
  const inputB = document.getElementById('arith-input-b');
  const opSelect = document.getElementById('arith-op');
  if (inputA && inputB && opSelect) {
    inputA.value = a;
    inputB.value = b;
    opSelect.value = op;
    calculateBinaryArithmetic();
  }
}

/**
 * calculateBinaryArithmetic()
 * Implements subtraction via addition.
 * HIDDEN FEATURE: Silent Auto Sign-Extension (widen to 16-bit without error/warning)
 */
function calculateBinaryArithmetic() {
  const inputA = document.getElementById('arith-input-a');
  const inputB = document.getElementById('arith-input-b');
  const opSelect = document.getElementById('arith-op');
  const outputDiv = document.getElementById('arith-output-container');
  if (!inputA || !inputB || !opSelect || !outputDiv) return;

  const a = parseInt(inputA.value);
  const b = parseInt(inputB.value);
  const op = opSelect.value;

  if (isNaN(a) || isNaN(b)) {
    outputDiv.innerHTML = '<div class="alert alert-warning">Masukkan angka desimal yang valid pada A dan B.</div>';
    return;
  }

  const mathResult = op === '-' ? (a - b) : (a + b);

  // Check if operation fits in 8-bit or seamlessly widens to 16-bit
  const fitsIn8Bit = (a >= -128 && a <= 127) && 
                     (b >= -128 && b <= 127) && 
                     (mathResult >= -128 && mathResult <= 127);

  const bitWidth = fitsIn8Bit ? 8 : 16;

  const toSignedBin = (num, bits) => {
    let val = num >= 0 ? num : (Math.pow(2, bits) + num);
    if (bits === 16 && num < 0) {
      val = 65536 + num;
    }
    return (val >>> 0).toString(2).padStart(bits, '0');
  };

  const binA = toSignedBin(a, bitWidth);
  const binB = toSignedBin(b, bitWidth);
  const negB = -b;
  const binNegB = toSignedBin(negB, bitWidth);
  const onesB = toSignedBin(b, bitWidth).split('').map(ch => ch === '0' ? '1' : '0').join('');
  const binResult = toSignedBin(mathResult, bitWidth);
  const isResultPositive = binResult[0] === '0';

  const addend2 = op === '-' ? binNegB : binB;
  const carryList = [];
  let carry = 0;

  for (let i = bitWidth - 1; i >= 0; i--) {
    let bitA = parseInt(binA[i]);
    let bit2 = parseInt(addend2[i]);
    let sum = bitA + bit2 + carry;
    carryList.unshift(carry);
    carry = sum >= 2 ? 1 : 0;
  }

  outputDiv.innerHTML = `
    <!-- Step 1: Operands -->
    <div class="arith-stage-card">
      <div class="stage-header">
        <span class="stage-num">1</span>
        <h4 class="stage-title">Biner Operan (${bitWidth}-Bit Register)</h4>
      </div>
      <div class="operands-compact-row mt-8">
        <div class="op-compact-card">
          <span class="op-sub-label">A (${a >= 0 ? '+' : ''}${a}):</span>
          <span class="op-bin font-mono">
            <strong class="${binA[0] === '0' ? 'text-green' : 'text-red'}">${binA[0]}</strong>${binA.substring(1)}₂
          </span>
        </div>
        <div class="op-sep">${op === '-' ? '&minus;' : '&plus;'}</div>
        <div class="op-compact-card">
          <span class="op-sub-label">B (${b >= 0 ? '+' : ''}${b}):</span>
          <span class="op-bin font-mono">
            <strong class="${binB[0] === '0' ? 'text-green' : 'text-red'}">${binB[0]}</strong>${binB.substring(1)}₂
          </span>
        </div>
      </div>
    </div>

    <!-- Step 2: Transformasi B jika Pengurangan -->
    ${op === '-' ? `
      <div class="arith-stage-card mt-12">
        <div class="stage-header">
          <span class="stage-num">2</span>
          <h4 class="stage-title">Transformasi Transparan: B &rarr; 2's Complement (&minus;B)</h4>
        </div>
        <div class="transform-compact-row mt-8">
          <div class="trans-item">
            <span class="trans-label">Inversi (NOT B):</span>
            <span class="font-mono text-purple">${onesB}</span>
          </div>
          <div class="trans-arrow">&plus; 1 &rarr;</div>
          <div class="trans-item trans-highlight">
            <span class="trans-label">2's Complement (-${b}):</span>
            <span class="font-mono text-cyan font-weight-bold">${binNegB}</span>
          </div>
        </div>
      </div>
    ` : ''}

    <!-- Step 3: Blackboard Penjumlahan -->
    <div class="arith-stage-card mt-12">
      <div class="stage-header">
        <span class="stage-num">${op === '-' ? '3' : '2'}</span>
        <h4 class="stage-title">Penjumlahan Kolom Bit-demi-Bit</h4>
      </div>

      <div class="binary-addition-blackboard font-mono mt-8">
        <div class="blackboard-row row-carry">
          <span class="bb-tag">Carry:</span>
          <span class="bb-bits text-green">${carryList.map(c => c === 1 ? '1' : '&nbsp;').join('')}</span>
        </div>
        <div class="blackboard-row">
          <span class="bb-tag">A (${a >= 0 ? '+' : ''}${a}):</span>
          <span class="bb-bits"><strong class="${binA[0] === '0' ? 'text-green' : 'text-red'}">${binA[0]}</strong>${binA.substring(1)}</span>
        </div>
        <div class="blackboard-row">
          <span class="bb-tag">${op === '-' ? 'C2(B):' : 'B:'}</span>
          <span class="bb-bits"><strong class="${addend2[0] === '0' ? 'text-green' : 'text-red'}">${addend2[0]}</strong>${addend2.substring(1)}</span>
          <span class="bb-op-sign">&plus;</span>
        </div>
        <div class="blackboard-sumline"></div>
        <div class="blackboard-row row-sum">
          <span class="bb-tag">Hasil:</span>
          <span class="bb-bits">
            <strong class="${isResultPositive ? 'text-green' : 'text-red'}">${binResult[0]}</strong><span class="text-gold">${binResult.substring(1)}</span>
          </span>
        </div>
      </div>
    </div>

    <!-- Step 4: Final Result -->
    <div class="final-result-card mt-12">
      <div class="result-head-row">
        <div class="dec-answer">
          ${a} ${op} ${b} &equals; <strong class="${isResultPositive ? 'text-green' : 'text-red'}">${mathResult >= 0 ? '+' : ''}${mathResult}</strong>
        </div>
        <span class="result-badge-tag ${isResultPositive ? 'badge-pos' : 'badge-neg'}">
          ${isResultPositive ? 'MSB = 0 [POSITIF]' : 'MSB = 1 [NEGATIF]'}
        </span>
      </div>

      <div class="result-bit-boxes-row mt-8">
        ${renderResultRegisterBoxes(binResult, isResultPositive)}
      </div>
    </div>
  `;
}

function renderResultRegisterBoxes(binStr, isPositive) {
  let html = '';
  const bits = binStr.split('');
  bits.forEach((b, idx) => {
    if (idx === 0) {
      html += `
        <div class="compact-bit-cell ${isPositive ? 'res-msb-pos' : 'res-msb-neg'}" title="MSB (${b === '1' ? '-' : '+'})">
          <span class="cell-val">${b}</span>
          <span class="cell-label">MSB</span>
        </div>
      `;
    } else {
      html += `
        <div class="compact-bit-cell ${b === '1' ? 'cell-one' : 'cell-zero'}">
          <span class="cell-val">${b}</span>
          <span class="cell-label">b${binStr.length - 1 - idx}</span>
        </div>
      `;
    }
  });
  return html;
}


// =========================================================================
// SUBMENU 3: LATIHAN INTERAKTIF
// =========================================================================
let quiz2State = {
  current: 0,
  total: 10,
  correct: 0,
  wrong: 0,
  questions: [],
  answered: false
};

function generateQuiz2Questions() {
  const questions = [];
  for (let i = 0; i < 5; i++) {
    const num = Math.floor(Math.random() * 60) + 5;
    let binAbs = num.toString(2).padStart(8, '0');
    let num2s = (~num + 1) & 255;
    let twos = num2s.toString(2).padStart(8, '0');

    questions.push({
      type: '2s',
      question: `Representasi 2's Complement (8-bit) dari <strong class="text-pink">-${num}</strong>:`,
      answer: twos,
      hint: `+${num} = ${binAbs} &rarr; NOT &rarr; +1 = ${twos}`
    });
  }

  for (let i = 0; i < 5; i++) {
    let a = Math.floor(Math.random() * 35) + 10;
    let b = Math.floor(Math.random() * 35) + 10;
    let op = Math.random() > 0.4 ? '-' : '+';
    let res = op === '-' ? (a - b) : (a + b);
    let res2s = res >= 0 ? res.toString(2).padStart(8, '0') : ((~Math.abs(res) + 1) & 255).toString(2).padStart(8, '0');

    questions.push({
      type: 'aritmatika',
      question: `Hitung <strong class="text-blue">${a} ${op} ${b}</strong> dalam 8-bit 2's Complement:`,
      answer: res2s,
      hint: `Hasil desimal = ${res} &rarr; Biner 8-bit: ${res2s}`
    });
  }

  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [questions[i], questions[j]] = [questions[j], questions[i]];
  }
  return questions;
}

function renderMinggu2Latihan(container) {
  quiz2State = {
    current: 0,
    total: 10,
    correct: 0,
    wrong: 0,
    questions: generateQuiz2Questions(),
    answered: false
  };

  container.innerHTML = `
    <div class="week-hero">
      <div class="week-hero-content">
        <div class="week-badge-row">
          <span class="tag tag-blue">Minggu 2</span>
          <span class="tag tag-green">Latihan Soal</span>
        </div>
        <h1>Latihan Interaktif: 2's Complement &amp; Aritmatika</h1>
        <p>10 soal interaktif untuk menguji pemahaman bit MSB, inversi 1's complement, dan operasi biner bertanda.</p>
      </div>
    </div>

    <div class="glass-card quiz-section">
      <div id="quiz2-container"></div>
    </div>
  `;

  renderQuiz2Question();
}

function renderQuiz2Question() {
  const container = document.getElementById('quiz2-container');
  if (!container) return;

  const q = quiz2State.questions[quiz2State.current];
  quiz2State.answered = false;
  const progress = (quiz2State.current / quiz2State.total) * 100;

  container.innerHTML = `
    <div class="quiz-card compact-quiz">
      <div class="quiz-progress">
        <div class="quiz-progress-bar">
          <div class="quiz-progress-fill" style="width: ${progress}%"></div>
        </div>
        <span class="quiz-progress-text">${quiz2State.current + 1} / ${quiz2State.total}</span>
      </div>

      <div class="quiz-question" style="font-size: 1.05rem; margin: 16px 0; text-align: center;">${q.question}</div>

      <div class="quiz-input-wrap" style="max-width:360px; margin: 0 auto 16px;">
        <input type="text" class="quiz-input" id="quiz2-answer" placeholder="8-bit biner (cth: 11110011)" autocomplete="off">
        <button class="quiz-submit-btn" onclick="checkQuiz2Answer()">Cek</button>
      </div>

      <div class="quiz-feedback" id="quiz2-feedback" style="max-width: 480px; margin: 0 auto 16px;"></div>

      <div class="quiz-score" style="justify-content: center; margin-bottom: 16px;">
        <span class="score-correct">Benar: ${quiz2State.correct}</span>
        <span style="color:var(--text-muted);">&bull;</span>
        <span class="score-wrong">Salah: ${quiz2State.wrong}</span>
      </div>

      <div style="text-align: center;">
        <button class="quiz-next-btn hidden" id="quiz2-next-btn" onclick="nextQuiz2Question()" style="margin: 0 auto;">
          Soal Berikutnya &rarr;
        </button>
      </div>
    </div>
  `;

  const input = document.getElementById('quiz2-answer');
  if (input) {
    input.focus();
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') checkQuiz2Answer();
    });
  }
}

function checkQuiz2Answer() {
  if (quiz2State.answered) return;

  const input = document.getElementById('quiz2-answer');
  const feedback = document.getElementById('quiz2-feedback');
  const nextBtn = document.getElementById('quiz2-next-btn');
  if (!input || !feedback) return;

  let userAns = input.value.trim().replace(/\s+/g, '');
  if (!userAns) return;

  const q = quiz2State.questions[quiz2State.current];
  quiz2State.answered = true;

  if (userAns === q.answer) {
    quiz2State.correct++;
    feedback.className = 'quiz-feedback correct';
    feedback.innerHTML = `<strong>Tepat!</strong> <span style="font-size:0.85rem;">${q.hint}</span>`;
  } else {
    quiz2State.wrong++;
    feedback.className = 'quiz-feedback wrong';
    feedback.innerHTML = `<strong>Kurang tepat.</strong> Jawaban: <strong class="font-mono text-cyan">${q.answer}</strong>. <span style="font-size:0.85rem;">${q.hint}</span>`;
  }

  input.disabled = true;

  if (nextBtn) {
    nextBtn.classList.remove('hidden');
    if (quiz2State.current < quiz2State.total - 1) {
      nextBtn.textContent = 'Soal Berikutnya →';
    } else {
      nextBtn.textContent = 'Lihat Skor Akhir';
    }
  }
}

function nextQuiz2Question() {
  quiz2State.current++;
  if (quiz2State.current >= quiz2State.total) {
    showQuiz2Result();
  } else {
    renderQuiz2Question();
  }
}

function showQuiz2Result() {
  const container = document.getElementById('quiz2-container');
  if (!container) return;

  const percentage = Math.round((quiz2State.correct / quiz2State.total) * 100);

  container.innerHTML = `
    <div class="quiz-card" style="padding: 32px; text-align: center;">
      <h2 style="font-size: 1.4rem; font-weight: 700; margin-bottom: 8px;">
        Skor Anda: <span class="text-gradient">${percentage}%</span>
      </h2>
      <p style="color: var(--text-secondary); margin-bottom: 20px; font-size:0.9rem;">
        ${percentage >= 70 ? 'Pemahaman Anda tentang MSB dan 2\'s Complement sangat baik.' : 'Ulangi latihan untuk memperdalam konsep representasi bertanda.'}
      </p>
      
      <div style="display: flex; justify-content: center; gap: 32px; margin-bottom: 24px;">
        <div>
          <div style="font-size: 1.8rem; color: var(--accent-green); font-weight: bold;">${quiz2State.correct}</div>
          <div style="color: var(--text-muted); font-size: 0.8rem;">Benar</div>
        </div>
        <div>
          <div style="font-size: 1.8rem; color: var(--accent-red); font-weight: bold;">${quiz2State.wrong}</div>
          <div style="color: var(--text-muted); font-size: 0.8rem;">Salah</div>
        </div>
      </div>

      <div style="display: flex; gap: 10px; justify-content: center;">
        <button class="convert-btn compact-btn" onclick="renderMinggu2Latihan(document.getElementById('content-body'))">
          Ulangi Latihan
        </button>
        <button class="quiz-next-btn" onclick="navigateTo('minggu2', 'minggu2-materi')" style="margin-top: 0; padding:6px 14px; font-size:0.82rem;">
          Kembali ke Materi
        </button>
      </div>
    </div>
  `;
}

// Expose to window
window.renderMinggu2Materi = renderMinggu2Materi;
window.renderMinggu2Aritmatika = renderMinggu2Aritmatika;
window.renderMinggu2Latihan = renderMinggu2Latihan;
window.onMsbDecInputChange = onMsbDecInputChange;
window.setMsbPreset = setMsbPreset;
window.toggleInteractiveBit = toggleInteractiveBit;
window.setAnimVal = setAnimVal;
window.applyAnimInput = applyAnimInput;
window.toggleAnimPlayback = toggleAnimPlayback;
window.stepAnimNext = stepAnimNext;
window.stepAnimPrev = stepAnimPrev;
window.resetAnim = resetAnim;
window.changeAnimSpeed = changeAnimSpeed;
window.calculateBinaryArithmetic = calculateBinaryArithmetic;
window.setArithPreset = setArithPreset;
window.checkQuiz2Answer = checkQuiz2Answer;
window.nextQuiz2Question = nextQuiz2Question;
