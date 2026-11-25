# CSCA preparation: investigation sheets

A small website for preparing for the CSCA (China Scholastic Competency Assessment).
Every topic is taught from the start in **investigation style**: students fill in tables, get instant checking,
write what they notice in their own words, and only then see the rule. Each topic ends with timed exam-style questions.
Bilingual (English / Russian), with the Chinese exam terms shown next to each idea.

Each page is **one self-contained HTML file**: no libraries, no fonts, no internet needed once it has loaded.
Progress is saved in the student's own browser (localStorage); nothing is sent anywhere.

```
subjects/                  one folder per subject
  math/subject.json        subject title, blurb, exam format (questions, minutes)
  math/<topic>/meta.json   topic title, order, one-line summary
  math/<topic>/content.js  all tasks, rules and exam questions of the topic
  physics/subject.json     subjects with no topics yet show as "coming soon"
engine/                    shared code: app.js (page, checking, graphs), ui.js (UI text, helpers), style.css
tools/                     check_content.js, verify/*.py, ui_pass.js, test_sheet.py
build.py                   python build.py  ->  writes docs/
docs/                      the built website (publish this folder)
```

## Mathematics: the 10 topics

| # | Topic | Covers |
|---|---|---|
| 1 | Sets and inequalities 集合与不等式 | sets, ∩ ∪ ∁, sufficient/necessary conditions, quadratic, fractional, absolute-value inequalities, the basic inequality |
| 2 | Functions 函数 | domain, odd/even, monotonicity, inverse, exponential and log functions, sin/cos/tan and periods |
| 3 | Trigonometry 三角恒等变换与解三角形 | radians, identities, reduction formulas, sum and double-angle formulas, graph shifts, laws of sines and cosines |
| 4 | Sequences 数列 | general term, aₙ from Sₙ, arithmetic and geometric sequences, recurrences, telescoping sums |
| 5 | Derivatives 导数 | definition, formulas and rules, tangent lines, monotonicity, extreme values |
| 6 | Vectors and complex numbers 平面向量与复数 | coordinates, dot product, ⊥ and ∥, i² = −1, conjugate, modulus |
| 7 | Lines and circles 直线与圆 | slope, forms of a line, distances, circles, line and circle |
| 8 | Ellipse, hyperbola, parabola 圆锥曲线 | distance definitions, a/b/c, foci, eccentricity, asymptotes, focus and directrix |
| 9 | Solid geometry 立体几何 | solids, volume and area, lines and planes, coordinates in space |
| 10 | Probability and statistics 概率与统计 | classical probability, complement/exclusive/independent, mean, variance, normal distribution |

The topic list follows the 2025 CSCA Mathematics syllabus as summarised publicly (sets and inequalities; functions
including trigonometry, sequences and derivatives; geometry and algebra; probability and statistics).

## Build and check

```
python build.py                         # builds every subject and topic into docs/
node tools/check_content.js             # every answer is readable, drop-downs and indices are valid, EN + RU present
python tools/verify/<topic>.py          # recomputes every answer of a sheet independently (prints ALL OK)
```

To test in a browser: open a sheet, press F12, paste `tools/ui_pass.js` into the console. It types every correct answer,
presses Check on every task and reports any task that does not complete. (Or `python tools/test_sheet.py docs/math/functions.html`
if you have Playwright.)

To try the site locally, open `docs/index.html` by double-clicking it.

## Put it online (GitHub Pages, free)

1. Create a free account at github.com and make a new **public** repository (for example `csca-sheets`).
2. On the repository page choose **Add file → Upload files** and drag in everything from this folder (keep the folder structure). Commit.
3. Open **Settings → Pages**. Under *Build and deployment* choose **Deploy from a branch**, branch `main`, folder `/docs`. Save.
4. After a minute or two the site is live at `https://YOUR-NAME.github.io/csca-sheets/`.

After you change anything, run `python build.py` and upload the changed files in `docs/` again.
The old address `.../functions.html` still works: it redirects to `math/functions.html`, and students keep their progress.

## Add a new topic to a subject

1. Copy a topic folder, e.g. `subjects/math/sequences` → `subjects/math/limits`.
2. Edit `meta.json`: `title_en`, `title_ru`, `zh`, `short_en`, `short_ru`, and `order` (its place in the list).
3. In `content.js` change `SHEET.key` (must be unique, e.g. `csca-math-limits-v1`), `title`, `sub`, `stats`, `symbols`,
   then replace `PARTS`, `EXAM`, `TOPICS` (and `SHEET.figs` if you need figures).
4. `python build.py`, then `node tools/check_content.js`. The topic appears on the subject page automatically,
   and the previous topic gets a "Next topic" link to it.

## Add a new subject (physics, chemistry, Chinese, …)

1. Make a folder `subjects/<subject>/` with a `subject.json`:

   ```json
   { "order": 2, "title_en": "Physics", "title_ru": "Физика", "zh": "物理",
     "blurb_en": "Mechanics, electricity, …", "blurb_ru": "Механика, электричество, …",
     "exam": { "questions": 48, "minutes": 60 } }
   ```

   `exam` sets the timer and the "75 seconds per question" advice on every sheet of that subject; check the real numbers for that test.
   Physics, Chemistry and Chinese already have a `subject.json` without `exam`: add it when you add their first topic.
2. Add topic folders inside it exactly as above. Use a `SHEET.key` that starts with the subject, e.g. `csca-physics-motion-v1`.
3. `python build.py`. The home page lists the subject as soon as it has one topic; with none it shows "coming soon".

The engine is not maths-specific: tables, drop-downs, multiple choice, free answers, "What I notice", rules and worked examples
work for any subject. Number checking understands fractions, decimals with a comma, √ and π.

## Content format (subjects/&lt;subject&gt;/&lt;topic&gt;/content.js)

Text that differs by language is written `T('English', 'Русский')`. Maths and Chinese terms are plain strings.
`**bold**` works inside text.

`PARTS` is a list of parts: `{ id, title, intro, items }`. Each item is one of:

| item | meaning |
|---|---|
| `{ t:'task', id:'2.1', title, text, parts:[…], hint }` | a task card with Check / Hint / Show answers |
| `{ t:'notice', id, rule }` | "What I notice" box; the rule unlocks after the student writes a sentence |
| `{ t:'rule', label, text }` | a rule shown straight away |
| `{ t:'worked', text }` / `{ t:'note', label, text }` | worked example / "Careful" box |

Inside a task, `parts` can be:

- `{ k:'table', head:[…], rows:[[label, cell, cell…]] }`. A cell is plain text (shown), `{ a:'1/2' }` (a number to type),
  `{ a:'none' }` (the student must write "none"/"нет"), or `{ a:'same', sel:SON }` (a drop-down).
- `{ k:'blanks', lines:[[text, {a:'4', w:3}, text…]] }` sentences with answer boxes; `sel:[…]` makes a drop-down.
- `{ k:'mc', q, opts:[…], a:index }` single-choice question.
- `{ k:'open', lines:[{ q, a }] }` free answer, compared with your answer text; the student ticks "I got it".
- `{ k:'html', html }` static text or small tables (`mini([...])`), `{ k:'fig', id:'parity' }` a figure from `SHEET.figs`.

Drop-down options are plain strings, or `{ k, en, ru }` objects for words that need translating. Ready-made lists in `engine/ui.js`:
`YN`, `SON`, `MON`, `LR` (left/right), `COND` (sufficient/necessary).

Numbers are checked by value, so `1/2`, `0.5`, `0,5` and `2/4` are all accepted, as are `√3/2`, `sqrt(3)/2` and `2pi`.
Answers that are not numbers (like `4n − 1`) are compared as text, so prefer a drop-down for them.

`EXAM` is the final exam-style multiple-choice list: `{ part, q, o:[options], a:index }`. Spread the correct letters over a–d.
`TOPICS` fills the "how the exam words it" table on the first screen.
`SHEET.figs` returns the figures: `plot({...})` draws curves, points and ticks as SVG; for geometry write inline SVG with `class="geo"`.

## Quality rules

- Every answer is checked by code (`tools/verify/*.py` and `tools/check_content.js`) and by the browser pass before publishing.
- English and Russian only; Chinese exam terms are shown next to each term. No Kazakh, because AI translations of maths terms are unreliable.
- Hints first, full answers only when the student presses "Show answers".
