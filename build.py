#!/usr/bin/env python3
"""Build the whole CSCA site into docs/.

    subjects/<subject>/subject.json            one folder per subject (maths, physics, ...)
    subjects/<subject>/<topic>/meta.json        one folder per topic sheet
    subjects/<subject>/<topic>/content.js

Output:
    docs/index.html                      home page: every subject
    docs/<subject>/index.html            the subject's topics, in order, with each student's progress
    docs/<subject>/<topic>.html          one self-contained sheet per topic

Usage:  python3 build.py
GitHub Pages can then serve the docs/ folder."""
import json, re, html, shutil
from pathlib import Path

root = Path(__file__).parent
read = lambda p: Path(p).read_text(encoding='utf-8')
css = read(root / 'engine/style.css')
ui = read(root / 'engine/ui.js')
app = read(root / 'engine/app.js')
out = root / 'docs'
if out.exists():
    shutil.rmtree(out)
out.mkdir()
esc = html.escape
js = lambda o: json.dumps(o, ensure_ascii=False).replace('</', '<\\/')

# ---------- collect subjects and topics ----------
subjects = []
for sd in sorted((root / 'subjects').iterdir()):
    if not (sd / 'subject.json').exists():
        continue
    s = json.loads(read(sd / 'subject.json'))
    s['id'] = sd.name
    s['topics'] = []
    for td in sd.iterdir():
        if (td / 'content.js').exists() and (td / 'meta.json').exists():
            m = json.loads(read(td / 'meta.json'))
            m['id'] = td.name
            m['content'] = read(td / 'content.js')
            k = re.search(r"key:\s*'([^']+)'", m['content'])
            if not k:
                raise SystemExit(f'{td}: SHEET.key not found in content.js')
            m['key'] = k.group(1)
            s['topics'].append(m)
    s['topics'].sort(key=lambda m: (m.get('order', 99), m['id']))
    subjects.append(s)
subjects.sort(key=lambda s: (s.get('order', 99), s['id']))

keys = [t['key'] for s in subjects for t in s['topics']]
dup = {k for k in keys if keys.count(k) > 1}
if dup:
    raise SystemExit(f'SHEET.key used by more than one sheet: {dup}')

# ---------- topic pages ----------
for s in subjects:
    if s['topics']:
        (out / s['id']).mkdir()
    subj_info = {k: s[k] for k in ('id', 'title_en', 'title_ru', 'exam') if k in s}
    for i, m in enumerate(s['topics']):
        nxt = s['topics'][i + 1] if i + 1 < len(s['topics']) else None
        nav = {'home': '../index.html', 'subject': 'index.html',
               'next': {'href': nxt['id'] + '.html', 'title': {'en': nxt['title_en'], 'ru': nxt['title_ru']}} if nxt else None}
        page = f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{esc(m['title_en'])}</title>
<style>
{css}
</style>
</head>
<body>
<div id="app"></div>
<noscript>This page needs JavaScript. / Для этой страницы нужен JavaScript.</noscript>
<script>
const SUBJECT = {js(subj_info)};
const NAV = {js(nav)};
{ui}
{m['content']}
</script>
<script>
{app}
</script>
</body>
</html>
'''
        (out / s['id'] / f"{m['id']}.html").write_text(page, encoding='utf-8')
        print(f"built docs/{s['id']}/{m['id']}.html ({len(page)//1024} KB)")

# ---------- index pages (home + one per subject) ----------
INDEX_CSS = '''
:root{--bg:#f6f5f1;--surface:#fff;--ink:#1b2430;--muted:#5b6674;--line:#d9d6cc;--accent:#2457a6;--accent-soft:#e0e9f7;--good:#17803d;
--font:system-ui,-apple-system,"Segoe UI",Roboto,"Noto Sans","PingFang SC","Noto Sans SC","Microsoft YaHei",sans-serif;color-scheme:light}
@media(prefers-color-scheme:dark){:root:not([data-theme="light"]){--bg:#12171e;--surface:#1b222c;--ink:#e8edf3;--muted:#9aa7b6;--line:#2e3846;--accent:#7fb0ff;--accent-soft:#1e2f4d;--good:#5fd38a;color-scheme:dark}}
:root[data-theme="dark"]{--bg:#12171e;--surface:#1b222c;--ink:#e8edf3;--muted:#9aa7b6;--line:#2e3846;--accent:#7fb0ff;--accent-soft:#1e2f4d;--good:#5fd38a;color-scheme:dark}
*{box-sizing:border-box}[hidden]{display:none!important}body{margin:0;background:var(--bg);color:var(--ink);font:400 17px/1.5 var(--font)}
.wrap{max-width:760px;margin:0 auto;padding:18px 16px 70px}
.top{display:flex;align-items:center;gap:10px;justify-content:space-between;flex-wrap:wrap}
.crumb{font-weight:600;text-decoration:none;color:var(--accent)}
h1{font-size:clamp(1.6rem,5.5vw,2.2rem);line-height:1.15;margin:22px 0 6px;text-wrap:balance}
.lead{color:var(--muted);margin:0 0 18px;max-width:62ch}
.seg{display:inline-flex;border:1px solid var(--line);border-radius:8px;overflow:hidden;background:var(--surface);margin-left:auto}
.seg button{font:inherit;border:0;background:transparent;padding:5px 12px;font-weight:700;font-size:.85rem;color:var(--muted);cursor:pointer}
.seg button[aria-pressed=true]{background:var(--accent-soft);color:var(--ink)}
ol,ul{list-style:none;padding:0;margin:0}
.card{display:block;position:relative;background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:14px 16px;margin:10px 0;text-decoration:none;color:var(--ink)}
a.card:hover{border-color:var(--accent)}
.card b{font-size:1.08rem;color:var(--accent)}
.card .zh{color:var(--muted);font-weight:400;margin-left:6px}
.card p{margin:3px 0 0;color:var(--muted);font-size:.93rem}
.card .num{position:absolute;left:-2px;top:14px;transform:translateX(-100%);color:var(--muted);font-weight:700;font-variant-numeric:tabular-nums;padding-right:8px}
@media(max-width:820px){.card .num{position:static;transform:none;padding:0 6px 0 0}}
.soon{opacity:.65}.soon b{color:var(--ink)}
.tag{display:inline-block;font-size:.75rem;font-weight:700;border:1px solid var(--line);border-radius:999px;padding:0 8px;margin-left:8px;color:var(--muted);vertical-align:2px}
.pg{display:flex;align-items:center;gap:10px;margin-top:8px;font-size:.82rem;color:var(--muted);font-variant-numeric:tabular-nums}
.pg .bar{flex:1;max-width:220px;height:6px;background:var(--line);border-radius:3px;overflow:hidden}
.pg .bar span{display:block;height:100%;background:var(--good)}
.how{background:var(--accent-soft);border-radius:12px;padding:12px 16px;margin:18px 0;font-size:.95rem}
.how p{margin:4px 0}
footer{margin-top:30px;color:var(--muted);font-size:.85rem}
:focus-visible{outline:3px solid var(--accent);outline-offset:2px;border-radius:6px}
'''
INDEX_JS = '''
(function(){
  var lang='en';
  try{var g=localStorage.getItem('csca-lang');if(g==='en'||g==='ru')lang=g;else if(/^ru|^kk|^uk|^be/i.test(navigator.language||''))lang='ru';}catch(e){}
  function apply(){
    document.documentElement.lang=lang;
    document.querySelectorAll('[data-en]').forEach(function(el){el.textContent=el.getAttribute('data-'+lang)||el.getAttribute('data-en');});
    document.querySelectorAll('.seg button').forEach(function(b){b.setAttribute('aria-pressed',String(b.value===lang));});
    document.querySelectorAll('[data-key]').forEach(function(el){
      var k=el.getAttribute('data-key').split(' '),done=0,total=0,seen=0;
      k.forEach(function(key){try{var p=JSON.parse(localStorage.getItem('csca-progress:'+key)||'null');if(p){done+=p.done;total+=p.total;seen++;}}catch(e){}});
      if(!seen){el.hidden=true;return;}
      el.hidden=false;
      el.querySelector('span span').style.width=Math.round(done/total*100)+'%';
      el.querySelector('.t').textContent=(lang==='ru'?'Выполнено заданий: ':'Tasks done: ')+done+' / '+total;
    });
  }
  document.querySelectorAll('.seg button').forEach(function(b){b.addEventListener('click',function(){lang=b.value;try{localStorage.setItem('csca-lang',lang);}catch(e){}apply();});});
  apply();
})();
'''


def t(en, ru, tag='span', cls=None):
    c = f' class="{cls}"' if cls else ''
    return f'<{tag}{c} data-en="{esc(en)}" data-ru="{esc(ru)}">{esc(en)}</{tag}>'


def page(title, body):
    return f'''<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>{esc(title)}</title><style>{INDEX_CSS}</style></head>
<body><main class="wrap">
{body}
</main><script>{INDEX_JS}</script></body></html>
'''


SEG = '<div class="seg" role="group" aria-label="Language"><button type="button" value="en">EN</button><button type="button" value="ru">RU</button></div>'
PG = '<div class="pg" data-key="{}" hidden><span class="bar"><span></span></span><span class="t"></span></div>'

# home
cards = []
for s in subjects:
    zh = f'<span class="zh">{esc(s["zh"])}</span>' if s.get('zh') else ''
    if s['topics']:
        n = len(s['topics'])
        cards.append(f'''<li><a class="card" href="{s['id']}/index.html">{t(s['title_en'], s['title_ru'], 'b')}{zh}
{t(s.get('blurb_en', ''), s.get('blurb_ru', ''), 'p')}
{t(f"{n} topics", f"Тем: {n}", 'p')}
{PG.format(' '.join(m['key'] for m in s['topics']))}</a></li>''')
    else:
        cards.append(f'''<li><div class="card soon">{t(s['title_en'], s['title_ru'], 'b')}{zh}{t('coming soon', 'скоро', 'span', 'tag')}
{t(s.get('blurb_en', ''), s.get('blurb_ru', ''), 'p')}</div></li>''')
home = f'''<div class="top"><span></span>{SEG}</div>
<h1>{t('CSCA preparation', 'Подготовка к CSCA')}</h1>
{t('Investigation sheets for the China Scholastic Competency Assessment (CSCA). Every topic is taught from the start: you fill in tables, notice the pattern, write it in your own words, and only then read the rule. Each topic ends with exam-style questions.',
   'Исследовательские листы для подготовки к CSCA (China Scholastic Competency Assessment). Каждая тема объясняется с самого начала: вы заполняете таблицы, замечаете закономерность, записываете её своими словами и только потом читаете правило. В конце каждой темы есть вопросы в формате экзамена.', 'p', 'lead')}
<ul>
{chr(10).join(cards)}
</ul>
<footer>{t('Progress is saved in this browser only. Nothing is sent anywhere.', 'Прогресс сохраняется только в этом браузере. Никакие данные никуда не отправляются.')}</footer>'''
(out / 'index.html').write_text(page('CSCA preparation', home), encoding='utf-8')
print('built docs/index.html')

for s in subjects:
    if not s['topics']:
        continue
    items = []
    for i, m in enumerate(s['topics'], 1):
        zh = f'<span class="zh">{esc(m["zh"])}</span>' if m.get('zh') else ''
        items.append(f'''<li><a class="card" href="{m['id']}.html"><span class="num">{i}</span>{t(m['title_en'], m['title_ru'], 'b')}{zh}
{t(m.get('short_en', ''), m.get('short_ru', ''), 'p')}
{PG.format(m['key'])}</a></li>''')
    ex = s.get('exam')
    exam_line = t(f"The real exam: {ex['questions']} single-choice questions in {ex['minutes']} minutes.",
                  f"Настоящий экзамен: {ex['questions']} вопросов с одним верным ответом за {ex['minutes']} минут.", 'p') if ex else ''
    body = f'''<div class="top"><a class="crumb" href="../index.html">← {t('All subjects', 'Все предметы')}</a>{SEG}</div>
<h1>{t(s['title_en'], s['title_ru'])} <span style="color:var(--muted);font-weight:400">{esc(s.get('zh', ''))}</span></h1>
{t(s.get('blurb_en', ''), s.get('blurb_ru', ''), 'p', 'lead')}
<div class="how">{exam_line}{t('Work through the topics in order: later topics use earlier ones. Inside a topic, do the tasks before you read the rules.', 'Проходите темы по порядку: следующие темы опираются на предыдущие. Внутри темы сначала выполняйте задания, потом читайте правила.', 'p')}</div>
<ol>
{chr(10).join(items)}
</ol>'''
    (out / s['id'] / 'index.html').write_text(page(s['title_en'] + ' · CSCA', body), encoding='utf-8')
    print(f"built docs/{s['id']}/index.html")

# old address of the first sheet (before subjects existed) -> keep links that were already shared working
(out / 'functions.html').write_text('<!DOCTYPE html><meta charset="utf-8"><title>Moved</title><meta http-equiv="refresh" content="0; url=math/functions.html"><a href="math/functions.html">math/functions.html</a>', encoding='utf-8')
