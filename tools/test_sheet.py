"""Checks a built sheet in a real browser: types every correct answer into every task and confirms each task completes.
Usage: python3 tools/test_sheet.py docs/math/functions.html   (needs: pip install playwright; playwright install chromium)
No Python? Open the page, press F12, paste tools/ui_pass.js into the console: it does the same check."""
from playwright.sync_api import sync_playwright
import json
with sync_playwright() as p:
    b=p.chromium.launch(args=['--no-sandbox'])
    pg=b.new_page(viewport={'width':1100,'height':900})
    errs=[]
    pg.on('console',lambda m: errs.append(m.text) if m.type=='error' else None)
    pg.on('pageerror',lambda e: errs.append(str(e)))
    pg.add_init_script("window.__FN_TEST=true")
    pg.goto('file://'+__import__('os').path.abspath(__import__('sys').argv[1])); pg.wait_for_timeout(500)
    # checker unit tests
    t=pg.evaluate("""()=>{const {num,isCorrect}=window.__fnt;const T=(exp,val)=>isCorrect({exp},val);
    return {
     a:T('-1/2','−1/2'), b:T('-1/2','-0,5'), c:T('√3/2','sqrt(3)/2'), d:T('√3/2','0.866'), e:T('√3/3','1/√3'),
     f:T('π/2','pi/2'), g:T('2π','2pi'), h:T('2π','2π'), i:T('none','нет'), j:T('none','0'), k:T('0','none'), l:T('1/2','2/4'), m:T('6π','6 π'),
     n:T('-√3/3','-sqrt3/3'), o:T('3','3x'), p:T('1','1);alert(1)'), q:T('4π','4*pi'), r:T('π','π/1')}}""")
    print(t)
    # full UI pass
    res=pg.evaluate("""()=>{
      const out=[];
      const cards=[...document.querySelectorAll('article.task')];
      const specs=[];
      PARTS.forEach(pt=>pt.items.forEach(it=>{ if(it.t!=='task')return; const f=[]; it.parts.forEach(part=>{
         if(part.k==='table') part.rows.forEach(r=>r.forEach((c,ci)=>{if(ci>0&&typeof c!=='string')f.push(c)}));
         else if(part.k==='blanks') part.lines.forEach(l=>l.forEach(sg=>{ if(typeof sg!=='string' && sg.en==null) f.push(sg)}));
         else if(part.k==='mc') f.push({mc:true,a:part.a});
        }); specs.push({id:it.id,f,open:it.parts.some(x=>x.k==='open')}); }));
      cards.forEach((c,i)=>{ const sp=specs[i]; const inputs=[...c.querySelectorAll('input.fld,select.fld')]; const mcs=[...c.querySelectorAll('.mc')];
         let ii=0,mi=0; sp.f.forEach(s=>{ if(s.mc){ mcs[mi++].querySelectorAll('button.opt')[s.a].click(); return;} const el=inputs[ii++];
            if(el.tagName==='SELECT'){ el.value=s.a; el.dispatchEvent(new Event('change')); } else { el.value=(s.a==='none'?'none':String(s.a).replace(/^-/,'−')); el.dispatchEvent(new Event('input')); } });
         c.querySelector('.acts .btn.primary').click();
         const bad=c.querySelectorAll('.fld.bad').length+c.querySelectorAll('.opt.bad').length;
         if(sp.open){ const tb=c.querySelector('.tickbtn'); if(tb) tb.click(); }
         out.push({id:sp.id,fields:sp.f.length,inputs:inputs.length+mcs.length,bad,done:c.classList.contains('done')});
      });
      return out;}""")
    for r in res:
        flag='' if (r['bad']==0 and r['done'] and r['fields']==r['inputs']) else '  <-- PROBLEM'
        print(r['id'],r['fields'],r['inputs'],'bad',r['bad'],'done',r['done'],flag)
    print('progress',pg.inner_text('#ptxt'))
    print('ERRORS',errs)
    b.close()
