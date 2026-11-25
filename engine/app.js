/* Engine for every CSCA investigation sheet. No external dependencies.
   Globals set by build.py: SUBJECT (subject.json), NAV (links). Set by the sheet: SHEET, PARTS, EXAM, TOPICS. */
(function () {
  const KEY = SHEET.key;
  let state = { lang: null, notices: {}, tasks: {}, inputs: {}, quiz: { ans: {}, checked: false } };
  try { const s = JSON.parse(localStorage.getItem(KEY) || 'null'); if (s) state = Object.assign(state, s); } catch (e) {}
  /* saved exam answers are option indices: if the questions or option order change, start the exam fresh */
  const EXAMSIG = (() => { let x = 5381; const t = EXAM.map(q => q.a + ':' + q.o.map(o => typeof o === 'string' ? o : o.en).join('|')).join('#');
    for (let i = 0; i < t.length; i++) x = (x * 33 + t.charCodeAt(i)) >>> 0; return x.toString(36); })();
  if (state.quiz.sig !== EXAMSIG) state.quiz = { ans: {}, checked: false, sig: EXAMSIG };
  const SUBJ = (typeof SUBJECT !== 'undefined' && SUBJECT) || {};
  const LINKS = (typeof NAV !== 'undefined' && NAV) || {};
  function save() {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
      localStorage.setItem('csca-lang', state.lang);
      const total = tasksIndex.length, done = tasksIndex.filter(t => state.tasks[t.id] && state.tasks[t.id].done).length;
      if (total) localStorage.setItem('csca-progress:' + KEY, JSON.stringify({ done, total, quiz: state.quiz.checked ? state.quiz.score : null, n: EXAM.length }));
    } catch (e) {}
  }
  try { const g = localStorage.getItem('csca-lang'); if (g === 'en' || g === 'ru') state.lang = g; } catch (e) {}
  if (!state.lang) state.lang = /^ru|^kk|^uk|^be/i.test(navigator.language || '') ? 'ru' : 'en';
  let lang = state.lang;
  const ui = () => UI[lang];
  const tr = (v) => (v == null ? '' : typeof v === 'string' ? v : (v[lang] != null ? v[lang] : v.en));

  /* ---------- tiny DOM helpers ---------- */
  function h(tag, attrs, ...kids) {
    const el = document.createElement(tag);
    if (attrs) for (const k in attrs) {
      const v = attrs[k];
      if (v == null || v === false) continue;
      if (k === 'class') el.className = v;
      else if (k === 'html') el.innerHTML = v;
      else if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
      else el.setAttribute(k, v === true ? '' : v);
    }
    for (const c of kids.flat()) { if (c == null || c === false) continue; el.append(c.nodeType ? c : document.createTextNode(c)); }
    return el;
  }
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const fmt = (s) => esc(tr(s)).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
  const P = (s, cls) => h('p', { class: cls, html: fmt(s) });

  /* ---------- answer checking ---------- */
  const NONE = /^(none|no value|undefined|undef|dne|n\/a|нет|нет значения|не существует|не определено|нет ответа|∅|—|–|x|✗)$/i;
  function num(raw) {
    let s = String(raw).toLowerCase().trim()
      .replace(/[−–—]/g, '-').replace(/[×·]/g, '*').replace(/÷/g, '/')
      .replace(/(\d),(\d)/g, '$1.$2').replace(/\s+/g, '');
    if (!s) return NaN;
    s = s.replace(/π|pi/g, 'P').replace(/√|sqrt/g, 'S');
    s = s.replace(/S(\d+(\.\d+)?|P)/g, 'Math.sqrt($1)').replace(/S\(/g, 'Math.sqrt(');
    s = s.replace(/P/g, 'Math.PI');
    s = s.replace(/(\d|\))(?=Math|\()/g, '$1*');
    if (!/^[0-9+\-*/().]*$/.test(s.replace(/Math\.sqrt|Math\.PI/g, '1'))) return NaN;
    try { const v = Function('"use strict";return (' + s + ')')(); return typeof v === 'number' && isFinite(v) ? v : NaN; } catch (e) { return NaN; }
  }
  const norm = (s) => String(s).toLowerCase().replace(/[−–—]/g, '-').replace(/\s+/g, '').replace(/[()]/g, '');
  function isCorrect(f, val) {
    val = String(val == null ? '' : val).trim();
    if (!val) return false;
    if (f.sel) return val === f.exp;
    if (f.exp === 'none') return NONE.test(val);
    if (NONE.test(val)) return false;
    const e = num(f.exp), v = num(val);
    if (!isNaN(e) && !isNaN(v)) return Math.abs(e - v) < 1e-3;
    return norm(val) === norm(f.exp);
  }

  /* ---------- figures (inline SVG) ---------- */
  function plot(o) {
    const W = o.w || 360, H = o.h || 250, m = { l: 30, r: 12, t: 14, b: 26 };
    const X = (x) => m.l + (x - o.x0) / (o.x1 - o.x0) * (W - m.l - m.r);
    const Y = (y) => H - m.b - (y - o.y0) / (o.y1 - o.y0) * (H - m.t - m.b);
    let s = `<svg viewBox="0 0 ${W} ${H}" class="plot" role="img" aria-label="${esc(o.label || 'graph')}">`;
    const ax0 = Y(Math.max(o.y0, Math.min(0, o.y1))), ay0 = X(Math.max(o.x0, Math.min(0, o.x1)));
    s += `<line class="ax" x1="${m.l}" y1="${ax0}" x2="${W - m.r}" y2="${ax0}"/><line class="ax" x1="${ay0}" y1="${m.t}" x2="${ay0}" y2="${H - m.b}"/>`;
    (o.xt || []).forEach(t => { const x = X(t.v);
      if (o.xlow) s += `<line class="grid" x1="${x}" y1="${m.t}" x2="${x}" y2="${H - m.b}"/><text class="tl" x="${x}" y="${H - 8}" text-anchor="middle">${t.l}</text>`;
      else s += `<line class="tk" x1="${x}" y1="${ax0 - 3}" x2="${x}" y2="${ax0 + 3}"/><text class="tl" x="${x}" y="${ax0 + 15}" text-anchor="middle">${t.l}</text>`; });
    (o.yt || []).forEach(t => { const y = Y(t.v); s += `<line class="tk" x1="${ay0 - 3}" y1="${y}" x2="${ay0 + 3}" y2="${y}"/><text class="tl" x="${ay0 - 6}" y="${y + 4}" text-anchor="end">${t.l}</text>`; });
    (o.vlines || []).forEach(v => { s += `<line class="asy" x1="${X(v)}" y1="${m.t}" x2="${X(v)}" y2="${H - m.b}"/>`; });
    (o.curves || []).forEach(c => {
      let d = '', pen = false, py = null; const N = 500;
      for (let i = 0; i <= N; i++) {
        const x = c.x0 != null ? c.x0 + (c.x1 - c.x0) * i / N : o.x0 + (o.x1 - o.x0) * i / N, y = c.f(x);
        const bad = !isFinite(y) || y < o.y0 - 0.5 || y > o.y1 + 0.5 || (py != null && Math.abs(y - py) > (o.y1 - o.y0) * 0.6);
        if (bad) { pen = false; py = null; continue; }
        d += (pen ? 'L' : 'M') + X(x).toFixed(1) + ' ' + Y(y).toFixed(1); pen = true; py = y;
      }
      s += `<path d="${d}" class="cv ${c.cls || 'c1'}" ${c.dash ? 'stroke-dasharray="5 4"' : ''}/>`;
    });
    (o.segs || []).forEach(g => { s += `<line class="asy" x1="${X(g[0])}" y1="${Y(g[1])}" x2="${X(g[2])}" y2="${Y(g[3])}"/>`; });
    (o.pts || []).forEach(p => {
      s += `<circle cx="${X(p.x)}" cy="${Y(p.y)}" r="4.5" class="${p.hollow ? 'pt hol' : 'pt'}"/>`;
      if (p.l) s += `<text class="pl" x="${X(p.x) + (p.dx || 7)}" y="${Y(p.y) + (p.dy || -7)}" text-anchor="${p.anc || 'start'}">${p.l}</text>`;
    });
    (o.tx || []).forEach(t => { s += `<text class="cl ${t.cls || ''}" x="${X(t.x)}" y="${Y(t.y)}" text-anchor="${t.anc || 'start'}">${t.t}</text>`; });
    return s + '</svg>';
  }
  const piT = (a, b) => { const r = []; for (let k = a; k <= b; k++) if (k) r.push({ v: k * Math.PI, l: (k === 1 ? '' : k === -1 ? '−' : k) + 'π' }); return r; };
  const FIGS = SHEET.figs ? SHEET.figs({ h, plot, piT, esc }) : {};

  /* ---------- rendering ---------- */
  const root = document.getElementById('app');
  const EXAMID = PARTS.length + 1;
  let tasksIndex = [];     // {id, el, ctx}
  let uid = 0;

  function selOptions(opts) { return opts.map(o => typeof o === 'string' ? { v: o, t: o } : o.en != null ? { v: o.k, t: tr(o) } : { v: o.k, t: ui().opt[o.k] }); }

  function buildTask(it) {
    const ctx = { id: it.id, fields: [], opens: [], el: null, msg: null };
    const st = (state.tasks[it.id] = state.tasks[it.id] || {});
    const key = (pi, n) => `${it.id}|${pi}|${n}`;
    const card = h('article', { class: 'card task', id: 't' + it.id.replace('.', '-') });
    ctx.el = card;
    const head = h('div', { class: 'thead' }, h('span', { class: 'tnum' }, ui().task + ' ' + it.id), h('span', { class: 'ttitle' }, tr(it.title)), h('span', { class: 'tdone', 'aria-hidden': 'true' }, '✓'));
    card.append(head, P(it.text, 'ttext'));

    const mkField = (pi, n, spec, extra) => {
      const k = key(pi, n);
      let el, f;
      if (spec.sel) {
        const opts = selOptions(spec.sel);
        el = h('select', { class: 'fld sel', 'aria-label': 'answer' }, h('option', { value: '' }, '—'), opts.map(o => h('option', { value: o.v }, o.t)));
        f = { el, exp: spec.a, sel: true };
      } else {
        el = h('input', { class: 'fld', type: 'text', inputmode: 'text', autocomplete: 'off', autocapitalize: 'off', spellcheck: 'false', style: spec.w ? `width:${spec.w + 1.2}em` : null, 'aria-label': 'answer' });
        f = { el, exp: spec.a };
      }
      el.value = state.inputs[k] || '';
      el.addEventListener('input', () => { state.inputs[k] = el.value; el.classList.remove('ok', 'bad'); st.checked = false; save(); });
      el.addEventListener('change', () => { state.inputs[k] = el.value; el.classList.remove('ok', 'bad'); save(); });
      f.key = k; ctx.fields.push(f);
      return el;
    };

    it.parts.forEach((part, pi) => {
      let n = 0;
      if (part.k === 'html') card.append(h('div', { html: typeof part.html === 'string' ? part.html : tr(part.html) }));
      else if (part.k === 'fig') card.append(FIGS[part.id]());
      else if (part.k === 'table') {
        const tbl = h('table', { class: 'tbl' });
        tbl.append(h('thead', null, h('tr', null, part.head.map(c => h('th', null, tr(c))))));
        const tb = h('tbody');
        part.rows.forEach(r => tb.append(h('tr', null, r.map((c, ci) => ci === 0 ? h('th', { scope: 'row' }, tr(c)) : (typeof c === 'string' ? h('td', null, c) : h('td', null, mkField(pi, n++, c)))))));
        tbl.append(tb); card.append(h('div', { class: 'tw' }, tbl));
      } else if (part.k === 'blanks') {
        part.lines.forEach(line => card.append(h('p', { class: 'bl' }, line.map(seg => typeof seg === 'string' ? seg : seg.en != null ? tr(seg) : mkField(pi, n++, seg)))));
      } else if (part.k === 'mc') {
        const k = key(pi, 0), box = h('div', { class: 'mc' });
        box.append(P(part.q, 'mcq'));
        const f = { key: k, mc: true, exp: String(part.a), btns: [] };
        part.opts.forEach((o, i) => {
          const b = h('button', { type: 'button', class: 'opt', 'aria-pressed': 'false' }, h('span', { class: 'lab' }, 'abcd'[i] + ')'), h('span', null, tr(o)));
          b.addEventListener('click', () => { state.inputs[k] = String(i); f.btns.forEach((x, j) => { x.setAttribute('aria-pressed', String(i === j)); x.classList.remove('ok', 'bad'); }); st.checked = false; save(); });
          if (state.inputs[k] === String(i)) b.setAttribute('aria-pressed', 'true');
          f.btns.push(b); box.append(b);
        });
        ctx.fields.push(f); card.append(box);
      } else if (part.k === 'open') {
        part.lines.forEach((ln, li) => {
          const k = key(pi, 'o' + li);
          const ta = h('textarea', { class: 'ta', rows: 2, placeholder: ui().mine, 'aria-label': ui().mine });
          ta.value = state.inputs[k] || '';
          ta.addEventListener('input', () => { state.inputs[k] = ta.value; save(); });
          const ans = h('div', { class: 'ref', hidden: true }, h('b', null, ui().ref + ': '), h('span', { html: fmt(ln.a) }));
          card.append(h('div', { class: 'open' }, P(ln.q, 'oq'), ta, ans));
          ctx.opens.push({ ans, k: key(pi, 'o' + li) });
        });
      }
    });

    const msg = h('div', { class: 'msg', role: 'status', 'aria-live': 'polite' });
    ctx.msg = msg;
    const tickRow = h('div', { class: 'tick', hidden: true });
    const tickBtn = h('button', { type: 'button', class: 'btn tickbtn' });
    const updTick = () => { const on = st.self; tickBtn.textContent = on ? '✓ ' + ui().gotItOn : ui().gotIt; tickBtn.setAttribute('aria-pressed', String(!!on)); };
    tickBtn.addEventListener('click', () => { st.self = !st.self; updTick(); recalc(it, ctx); save(); });
    tickRow.append(tickBtn); updTick();
    ctx.tickRow = tickRow;

    const hintBox = h('div', { class: 'hintbox', hidden: true }, h('b', null, ui().hint + ': '), tr(it.hint));
    const bar = h('div', { class: 'acts' },
      h('button', { type: 'button', class: 'btn primary', onclick: () => doCheck(it, ctx) }, ui().check),
      it.hint ? h('button', { type: 'button', class: 'btn', onclick: () => { hintBox.hidden = !hintBox.hidden; } }, ui().hint) : null,
      h('button', { type: 'button', class: 'btn ghost', onclick: () => doShow(it, ctx) }, ui().showAns));
    card.append(bar, hintBox, msg, tickRow);
    if (st.checked) { applyMarks(ctx, false); revealOpens(ctx); }
    else if (st.revealed) revealOpens(ctx);
    if (st.done) card.classList.add('done');
    return card;
  }

  function applyMarks(ctx, say) {
    let good = 0, total = ctx.fields.length, empty = 0;
    ctx.fields.forEach(f => {
      if (f.mc) {
        const v = state.inputs[f.key]; if (v == null) { empty++; return; }
        const ok = v === f.exp; if (ok) good++;
        f.btns.forEach((b, i) => { b.classList.remove('ok', 'bad'); if (String(i) === v) b.classList.add(ok ? 'ok' : 'bad'); if (ok && String(i) === v) b.classList.add('ok'); });
        return;
      }
      const v = state.inputs[f.key] || '';
      if (!v.trim()) { empty++; f.el.classList.remove('ok'); f.el.classList.add('bad'); return; }
      const ok = isCorrect(f, v); if (ok) good++;
      f.el.classList.toggle('ok', ok); f.el.classList.toggle('bad', !ok);
    });
    return { good, total, empty };
  }
  function revealOpens(ctx) { ctx.opens.forEach(o => { o.ans.hidden = false; }); if (ctx.opens.length) ctx.tickRow.hidden = false; }

  function doCheck(it, ctx) {
    const st = state.tasks[it.id];
    const r = applyMarks(ctx, true);
    st.checked = true; st.revealed = true; revealOpens(ctx);
    st.auto = ctx.fields.length === 0 ? true : r.good === r.total;
    if (ctx.fields.length) {
      if (r.empty && r.good < r.total && r.empty === r.total - r.good) ctx.msg.textContent = ui().fill;
      else ctx.msg.textContent = r.good === r.total ? ui().allGood : ui().some(r.good, r.total);
      ctx.msg.className = 'msg ' + (r.good === r.total ? 'good' : 'warn');
    } else { ctx.msg.textContent = ''; }
    recalc(it, ctx); save();
  }
  function doShow(it, ctx) {
    const st = state.tasks[it.id];
    ctx.fields.forEach(f => {
      if (f.mc) { state.inputs[f.key] = f.exp; f.btns.forEach((b, i) => { b.setAttribute('aria-pressed', String(String(i) === f.exp)); b.classList.remove('bad'); b.classList.toggle('ok', String(i) === f.exp); }); return; }
      const shown = f.sel ? f.exp : (f.exp === 'none' ? ui().none : f.exp.replace(/^-/, '−'));
      f.el.value = f.sel ? f.exp : shown; state.inputs[f.key] = f.el.value;
      f.el.classList.remove('bad'); f.el.classList.add('ok');
    });
    st.checked = true; st.revealed = true; st.shown = true; revealOpens(ctx);
    ctx.msg.textContent = ''; save();
  }
  function recalc(it, ctx) {
    const st = state.tasks[it.id];
    const hasOpen = ctx.opens.length > 0, hasAuto = ctx.fields.length > 0;
    const ok = (!hasAuto || (st.auto && !st.shown)) && (!hasOpen || st.self);
    st.done = !!ok;
    ctx.el.classList.toggle('done', st.done);
    updateProgress(); save();
  }

  function buildNotice(it) {
    const st = (state.notices[it.id] = state.notices[it.id] || { text: '', open: false });
    const card = h('article', { class: 'card notice' });
    const ta = h('textarea', { class: 'ta', rows: 2, placeholder: ui().noticePh, 'aria-label': ui().notice });
    ta.value = st.text || '';
    const ruleBox = h('div', { class: 'rulebox' }, h('b', null, ui().rule + '. '), h('span', { html: fmt(it.rule) }));
    const btn = h('button', { type: 'button', class: 'btn primary' }, '🔒 ' + ui().showRule);
    const stuck = h('button', { type: 'button', class: 'linkbtn' }, ui().stuck);
    const sync = () => { const open = st.open || (ta.value.trim().length >= 8); ruleBox.hidden = !open; btn.disabled = open; btn.hidden = open; stuck.hidden = open; };
    ta.addEventListener('input', () => { st.text = ta.value; if (ta.value.trim().length >= 8) st.open = true; sync(); save(); });
    btn.addEventListener('click', () => { st.open = true; sync(); save(); });
    stuck.addEventListener('click', () => { st.open = true; sync(); save(); });
    btn.disabled = true;
    card.append(h('div', { class: 'nlabel' }, '✎ ' + ui().notice), ta, h('div', { class: 'acts' }, stuck), ruleBox);
    // before the writing is long enough the "show" button stays hidden; students can still press the link below the box
    sync();
    return card;
  }

  function buildExam() {
    const sec = h('section', { class: 'part', id: 'part-' + EXAMID });
    sec.append(h('h2', null, `${EXAMID}. ${ui().exam}`));
    const ex = SUBJ.exam || { questions: 48, minutes: 60 };
    const per = Math.round(ex.minutes * 60 / ex.questions);
    const mins = Math.max(1, Math.ceil(EXAM.length * per / 60)), full = mins * 60;
    sec.append(P(ui().examIntro(ex.minutes, ex.questions, per, mins, EXAM.length)));
    const mm = String(mins).padStart(2, '0') + ':00';
    const timer = h('span', { class: 'timer', role: 'timer' }, mm);
    let tick = null, left = full;
    const tbtn = h('button', { type: 'button', class: 'btn' }, ui().start(mm));
    const drawT = () => { timer.textContent = String(Math.floor(left / 60)).padStart(2, '0') + ':' + String(left % 60).padStart(2, '0'); timer.classList.toggle('low', left < 60); };
    tbtn.addEventListener('click', () => {
      if (tick) { clearInterval(tick); tick = null; tbtn.textContent = ui().start(mm); return; }
      left = full; drawT(); tbtn.textContent = ui().stop;
      tick = setInterval(() => { left--; drawT(); if (left <= 0) { clearInterval(tick); tick = null; tbtn.textContent = ui().start(mm); timer.textContent = ui().timeUp; } }, 1000);
    });
    sec.append(h('div', { class: 'timerrow' }, tbtn, timer));
    const qs = state.quiz;
    const cards = [];
    EXAM.forEach((q, i) => {
      const card = h('article', { class: 'card q' });
      card.append(h('div', { class: 'qq' }, h('span', { class: 'qn' }, (i + 1) + '.'), h('span', null, tr(q.q)), h('span', { class: 'qpart' }, `(${ui().part.toLowerCase()} ${q.part})`)));
      const opts = h('div', { class: 'qopts' }); const btns = [];
      q.o.forEach((o, j) => {
        const b = h('button', { type: 'button', class: 'opt', 'aria-pressed': String(qs.ans[i] === j) }, h('span', { class: 'lab' }, 'abcd'[j] + ')'), h('span', null, tr(o)));
        b.addEventListener('click', () => { qs.ans[i] = j; qs.checked = false; btns.forEach((x, k) => { x.setAttribute('aria-pressed', String(k === j)); x.classList.remove('ok', 'bad'); }); fb.textContent = ''; result.textContent = ''; save(); });
        btns.push(b); opts.append(b);
      });
      const fb = h('div', { class: 'qfb' });
      card.append(opts, fb); cards.push({ btns, fb, q, i }); sec.append(card);
    });
    const result = h('div', { class: 'result', role: 'status', 'aria-live': 'polite' });
    const mark = () => {
      let sc = 0;
      cards.forEach(({ btns, fb, q, i }) => {
        const a = qs.ans[i]; btns.forEach(b => b.classList.remove('ok', 'bad'));
        if (a == null) { fb.textContent = lang === 'ru' ? 'Нет ответа' : 'No answer'; fb.className = 'qfb bad'; return; }
        if (a === q.a) { sc++; btns[a].classList.add('ok'); fb.textContent = '✓'; fb.className = 'qfb good'; }
        else { btns[a].classList.add('bad'); fb.className = 'qfb bad'; fb.innerHTML = `✗ ${ui().review}: <a href="#part-${q.part}">${lang === 'ru' ? 'часть' : 'Part'} ${q.part}</a>`; }
      });
      result.textContent = ui().score(sc, EXAM.length); qs.checked = true; qs.score = sc; save();
    };
    const go = h('button', { type: 'button', class: 'btn primary', onclick: mark }, ui().checkAll);
    const again = h('button', { type: 'button', class: 'btn', onclick: () => { qs.ans = {}; qs.checked = false; save(); render(); document.getElementById('part-' + EXAMID).scrollIntoView(); } }, ui().again);
    sec.append(h('div', { class: 'acts' }, go, again), result);
    if (qs.checked) mark();
    return sec;
  }

  function updateProgress() {
    const total = tasksIndex.length, done = tasksIndex.filter(t => state.tasks[t.id] && state.tasks[t.id].done).length;
    const pct = total ? Math.round(done / total * 100) : 0;
    const b = document.getElementById('pbar'); if (b) b.style.width = pct + '%';
    const t = document.getElementById('ptxt'); if (t) t.textContent = `${done} / ${total}`;
  }

  function render() {
    document.documentElement.lang = lang;
    document.title = tr(SHEET.title);
    tasksIndex = [];
    root.textContent = '';
    /* top bar */
    const langSeg = h('div', { class: 'seg', role: 'group', 'aria-label': 'Language' }, ['en', 'ru'].map(l => h('button', { type: 'button', 'aria-pressed': String(l === lang), onclick: () => { lang = state.lang = l; save(); render(); } }, l === 'en' ? 'EN' : 'RU')));
    let rs = false, rt = null;
    const resetBtn = h('button', { type: 'button', class: 'btn ghost small' }, ui().reset);
    resetBtn.addEventListener('click', () => {
      if (!rs) { rs = true; resetBtn.textContent = ui().resetSure; rt = setTimeout(() => { rs = false; resetBtn.textContent = ui().reset; }, 3500); return; }
      clearTimeout(rt); state = { lang, notices: {}, tasks: {}, inputs: {}, quiz: { ans: {}, checked: false, sig: EXAMSIG } }; save(); render(); window.scrollTo(0, 0);
    });
    const top = h('header', { class: 'topbar' }, h('div', { class: 'topin' },
      LINKS.subject ? h('a', { class: 'back', href: LINKS.subject, 'aria-label': ui().back }, '← ' + ui().topics) : null,
      h('div', { class: 'brand' }, h('span', { class: 'bt' }, tr(SHEET.title))),
      h('div', { class: 'prog', 'aria-label': ui().progress }, h('div', { class: 'ptxtrow' }, h('span', null, ui().progress), h('span', { id: 'ptxt' }, '0 / 0')), h('div', { class: 'bar' }, h('span', { id: 'pbar' }))),
      langSeg, resetBtn),
      h('nav', { class: 'chips', 'aria-label': ui().parts }, PARTS.map(p => h('a', { href: '#part-' + p.id }, p.id + '')), h('a', { href: '#part-' + EXAMID }, String(EXAMID))));
    root.append(top);
    const wrap = h('main', { class: 'wrap' });
    wrap.append(h('h1', null, tr(SHEET.title)), h('p', { class: 'sub' }, tr(SHEET.sub)));
    /* how to use */
    const how = h('section', { class: 'card how' }, h('h2', null, ui().howTitle), h('ol', null, ui().steps.map(s => h('li', { html: fmt(s) }))), P(SHEET.stats));
    const tt = h('table', { class: 'tbl' }, h('thead', null, h('tr', null, h('th', null, ui().topic), h('th', null, ui().partCol), h('th', null, ui().wording))),
      h('tbody', null, TOPICS.map(r => h('tr', null, h('td', null, tr(r[0])), h('td', null, h('a', { href: '#part-' + r[1] }, r[1] + '')), h('td', { class: 'wd' }, r[2])))));
    how.append(h('div', { class: 'tw' }, tt), P(SHEET.symbols, 'small'), P(ui().photoNote, 'small'));
    wrap.append(how);
    PARTS.forEach(p => {
      const sec = h('section', { class: 'part', id: 'part-' + p.id }, h('h2', null, h('span', { class: 'pn' }, ui().part + ' ' + p.id + '.'), ' ' + tr(p.title)), P(p.intro, 'intro'));
      p.items.forEach(it => {
        if (it.t === 'task') { const el = buildTask(it); tasksIndex.push({ id: it.id }); sec.append(el); }
        else if (it.t === 'notice') sec.append(buildNotice(it));
        else if (it.t === 'rule') sec.append(h('div', { class: 'rulebox plain' }, h('b', null, tr(it.label) + '. '), h('span', { html: fmt(it.text) })));
        else if (it.t === 'worked') sec.append(h('div', { class: 'worked' }, h('b', null, ui().worked + '. '), h('span', { html: fmt(it.text) })));
        else if (it.t === 'note') sec.append(h('div', { class: 'careful' }, h('b', null, tr(it.label) + '. '), h('span', { html: fmt(it.text) })));
      });
      wrap.append(sec);
    });
    wrap.append(buildExam());
    if (LINKS.next) wrap.append(h('p', { class: 'nextlink' }, h('a', { href: LINKS.next.href }, ui().next + ': ' + tr(LINKS.next.title) + ' →')));
    root.append(wrap);
    updateProgress();
  }
  render();
  save();
  if (window.__FN_TEST) window.__fnt = { num, isCorrect };
})();
