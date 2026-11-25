/* Static check of every sheet, no browser needed:  node tools/check_content.js [subject/topic ...]
   - every typed answer can be read by the checker, and "Show answers" text is accepted as correct
   - every drop-down answer is one of its options, every multiple-choice answer index exists
   - task ids are unique, exam questions point to real parts, every T() has English and Russian
   Uses the real num()/isCorrect() code from engine/app.js. */
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.join(__dirname, '..');
const app = fs.readFileSync(path.join(root, 'engine/app.js'), 'utf8');
const ui = fs.readFileSync(path.join(root, 'engine/ui.js'), 'utf8');
const checker = app.slice(app.indexOf('  const NONE ='), app.indexOf('  /* ---------- figures'));
let sheets = process.argv.slice(2);
if (!sheets.length) for (const s of fs.readdirSync(path.join(root, 'subjects')))
  { const d = path.join(root, 'subjects', s); if (fs.statSync(d).isDirectory()) for (const t of fs.readdirSync(d)) if (fs.existsSync(path.join(d, t, 'content.js'))) sheets.push(s + '/' + t); }
let bad = 0;
for (const sh of sheets) {
  const errs = [], warns = [];
  const ctx = {}; vm.createContext(ctx);
  const src = fs.readFileSync(path.join(root, 'subjects', sh, 'content.js'), 'utf8');
  try { vm.runInContext(ui + '\n' + src + '\n' + checker + '\nthis.__ = {SHEET, PARTS, EXAM, TOPICS, UI, num, isCorrect};', ctx); }
  catch (e) { console.log(`${sh}: LOAD ERROR ${e.message}`); bad++; continue; }
  const { SHEET, PARTS, EXAM, TOPICS, UI, num, isCorrect } = ctx.__;
  const ids = new Set(), partIds = new Set(PARTS.map(p => p.id));
  const optVal = (o) => typeof o === 'string' ? o : o.k;
  const walkT = (v, where) => { if (v && typeof v === 'object') { if ('en' in v && 'ru' in v && Object.keys(v).length <= 3) { if (!v.en || !v.ru || typeof v.en !== 'string' || typeof v.ru !== 'string') errs.push(`${where}: T() missing a language`); else if (/[а-яё]/i.test(v.en)) warns.push(`${where}: Cyrillic in English text: ${v.en.slice(0, 50)}`); else if (!/[а-яё]/i.test(v.ru) && /[a-z]{4,}/i.test(v.ru.replace(/log|sin|cos|tan|lim|max|min/g, ''))) warns.push(`${where}: Russian text looks untranslated: ${v.ru.slice(0, 50)}`); } else for (const k in v) walkT(v[k], where); } };
  let fields = 0;
  const field = (f, where) => {
    fields++;
    if (f.sel) { const vals = f.sel.map(optVal); if (!vals.includes(f.a)) errs.push(`${where}: answer "${f.a}" not among options ${JSON.stringify(vals)}`); return; }
    if (typeof f.a !== 'string') { errs.push(`${where}: answer must be a string`); return; }
    const shown = f.a === 'none' ? UI.en.none : f.a.replace(/^-/, '−');
    if (!isCorrect({ exp: f.a }, shown)) errs.push(`${where}: the shown answer "${shown}" is not accepted`);
    if (f.a !== 'none' && isNaN(num(f.a))) warns.push(`${where}: "${f.a}" is checked as exact text, not as a number`);
  };
  PARTS.forEach(p => {
    walkT(p.title, `part ${p.id} title`); walkT(p.intro, `part ${p.id} intro`);
    p.items.forEach(it => {
      const id = it.id || '';
      if (it.id) { if (ids.has(it.id)) errs.push(`duplicate id ${it.id}`); ids.add(it.id); }
      walkT(it, `item ${id || it.t}`);
      if (it.t === 'task') {
        if (!it.hint) warns.push(`task ${id}: no hint`);
        if (!String(id).startsWith(p.id + '.')) warns.push(`task ${id} is in part ${p.id}`);
        it.parts.forEach((pt, pi) => {
          const w = `task ${id} part ${pi}`;
          if (pt.k === 'table') pt.rows.forEach((r, ri) => { if (r.length !== pt.head.length) errs.push(`${w} row ${ri}: ${r.length} cells but ${pt.head.length} headings`); r.forEach((c, ci) => { if (ci > 0 && typeof c !== 'string') field(c, `${w} row ${ri} col ${ci}`); }); });
          else if (pt.k === 'blanks') pt.lines.forEach((l, li) => l.forEach(sg => { if (typeof sg !== 'string' && sg.en == null) field(sg, `${w} line ${li}`); }));
          else if (pt.k === 'mc') { fields++; if (!(pt.a >= 0 && pt.a < pt.opts.length)) errs.push(`${w}: mc answer index out of range`); }
          else if (pt.k === 'fig') { if (!SHEET.figs || !(SHEET.figs({ h: () => 0, plot: () => '', piT: () => [], esc: x => x })[pt.id])) errs.push(`${w}: figure "${pt.id}" missing`); }
          else if (!['html', 'open'].includes(pt.k)) errs.push(`${w}: unknown part kind ${pt.k}`);
        });
      }
    });
  });
  EXAM.forEach((q, i) => {
    walkT(q, `exam ${i + 1}`);
    if (!partIds.has(q.part)) errs.push(`exam ${i + 1}: part ${q.part} does not exist`);
    if (!(q.a >= 0 && q.a < q.o.length)) errs.push(`exam ${i + 1}: answer index out of range`);
    const txt = q.o.map(o => typeof o === 'string' ? o : o.en); if (new Set(txt).size !== txt.length) errs.push(`exam ${i + 1}: two options are the same`);
  });
  TOPICS.forEach((r, i) => { if (!partIds.has(r[1])) errs.push(`TOPICS row ${i + 1}: part ${r[1]} does not exist`); });
  const ntask = PARTS.reduce((a, p) => a + p.items.filter(i => i.t === 'task').length, 0);
  const counts = EXAM.reduce((a, q) => (a[q.a] = (a[q.a] || 0) + 1, a), {});
  console.log(`${sh}: ${PARTS.length} parts, ${ntask} tasks, ${fields} checked answers, ${EXAM.length} exam questions (answers a/b/c/d: ${[0,1,2,3].map(k => counts[k] || 0).join('/')})` + (errs.length ? `, ${errs.length} ERRORS` : ', OK'));
  errs.forEach(e => console.log('   ERROR ' + e)); warns.forEach(e => console.log('   warn  ' + e));
  if (errs.length) bad++;
}
process.exit(bad ? 1 : 0);
