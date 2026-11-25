# Project notes for Claude Code

Bilingual (EN/RU) interactive investigation sheets for CSCA preparation, organised by subject. Read README.md first.

- Engine lives in `engine/`; each subject is `subjects/<subject>/subject.json`; each topic is `subjects/<subject>/<topic>/content.js` + `meta.json`. Build with `python build.py`; output goes to `docs/` (served by GitHub Pages): `docs/index.html`, `docs/<subject>/index.html`, `docs/<subject>/<topic>.html`.
- Each built page must stay one self-contained HTML file: no external scripts, fonts or images, no service workers.
- Before saying a sheet is ready: verify every answer independently in `tools/verify/<topic>.py` (must print ALL OK), run `python build.py`, `node tools/check_content.js` (no ERRORS), run `tools/ui_pass.js` in the browser on the page (no problems, exam 12/12, no console errors), and look at screenshots at phone width (390 px) and desktop.
- Every string a student sees is `T('English', 'Русский')`. Keep the Chinese exam terms (定义域, 奇函数, …). Do not add Kazakh.
- Teaching style: tables and small tasks first so students discover the rule; the rule appears after "What I notice". Give hints, not full solutions.
- Question style copies the real CSCA papers (Mathematics: 48 questions, 60 minutes). Add exam-style questions at the end of each sheet and spread the correct letters over a–d.
- `SHEET.key` must be unique across all subjects (build.py stops otherwise); never change the key of a published sheet, or students lose their progress.
- Do not put personal data (names, phone numbers) in any sheet.
