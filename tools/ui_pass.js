/* Paste into the browser console on a built sheet (or run through tools/test_sheet.py).
   Types every correct answer into every task, presses Check, and reports any task that does not complete. */
(() => {
  const out = [], specs = [];
  PARTS.forEach(pt => pt.items.forEach(it => {
    if (it.t !== 'task') return; const f = [];
    it.parts.forEach(part => {
      if (part.k === 'table') part.rows.forEach(r => r.forEach((c, ci) => { if (ci > 0 && typeof c !== 'string') f.push(c); }));
      else if (part.k === 'blanks') part.lines.forEach(l => l.forEach(sg => { if (typeof sg !== 'string' && sg.en == null) f.push(sg); }));
      else if (part.k === 'mc') f.push({ mc: true, a: part.a });
    });
    specs.push({ id: it.id, f, open: it.parts.some(x => x.k === 'open') });
  }));
  const cards = [...document.querySelectorAll('article.task')];
  cards.forEach((c, i) => {
    const sp = specs[i], inputs = [...c.querySelectorAll('input.fld,select.fld')], mcs = [...c.querySelectorAll('.mc')];
    let ii = 0, mi = 0;
    sp.f.forEach(s => {
      if (s.mc) { mcs[mi++].querySelectorAll('button.opt')[s.a].click(); return; }
      const el = inputs[ii++];
      if (el.tagName === 'SELECT') { el.value = s.a; el.dispatchEvent(new Event('change')); }
      else { el.value = s.a === 'none' ? 'none' : String(s.a).replace(/^-/, '−'); el.dispatchEvent(new Event('input')); }
    });
    c.querySelector('.acts .btn.primary').click();
    const bad = c.querySelectorAll('.fld.bad').length + c.querySelectorAll('.opt.bad').length;
    if (sp.open) { const tb = c.querySelector('.tickbtn'); if (tb) tb.click(); }
    const done = c.classList.contains('done');
    if (bad || !done || sp.f.length !== inputs.length + mcs.length) out.push({ id: sp.id, fields: sp.f.length, inputs: inputs.length + mcs.length, bad, done });
  });
  EXAM.forEach((q, i) => document.querySelectorAll('article.q')[i].querySelectorAll('button.opt')[q.a].click());
  [...document.querySelectorAll('.part .acts .btn.primary')].pop().click();
  return { tasks: cards.length, problems: out, progress: document.getElementById('ptxt').textContent, exam: document.querySelector('.result').textContent };
})()
