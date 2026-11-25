/* Sheet: Lines and circles (CSCA Mathematics, plane analytic geometry part 1). */
const SHEET = {
  key: 'csca-math-lines-circles-v1',
  title: T('Investigation sheet: Lines and circles', 'Исследовательский лист: прямые и окружности'),
  sub: T('CSCA Mathematics · find each rule yourself, then read it', 'CSCA, математика · найдите каждое правило сами, потом прочитайте его'),
  stats: T('Analytic geometry 解析几何 turns pictures into equations. On the exam, line and circle questions are short: a slope, a distance, a centre and radius, or "how many common points". Typical questions:',
           'Аналитическая геометрия 解析几何 превращает рисунки в уравнения. На экзамене вопросы о прямых и окружностях короткие: угловой коэффициент, расстояние, центр и радиус или «сколько общих точек». Типичные вопросы:'),
  symbols: T('Symbols: k is the slope 斜率, α the angle of inclination 倾斜角 (0 ≤ α < π), d a distance, r a radius. A line can be written y = kx + b or Ax + By + C = 0. Type √2 as sqrt(2).',
             'Обозначения: k — угловой коэффициент 斜率, α — угол наклона 倾斜角 (0 ≤ α < π), d — расстояние, r — радиус. Прямую можно записать как y = kx + b или Ax + By + C = 0. √2 вводите как sqrt(2).')
};

SHEET.figs = ({ h, plot }) => ({
  tangentline() {
    const r = Math.SQRT2, top = x => Math.sqrt(Math.max(0, 2 - x * x)), bot = x => -Math.sqrt(Math.max(0, 2 - x * x));
    const s = plot({ label: 'Circle x² + y² = 2, the line x + y − 2 = 0 touching it at (1, 1), and the distance from the centre to the line', w: 360, h: 330, x0: -2.4, x1: 3, y0: -2.2, y1: 3,
      xt: [{ v: 1, l: '1' }, { v: 2, l: '2' }], yt: [{ v: 1, l: '1' }, { v: 2, l: '2' }],
      curves: [{ f: top, cls: 'c1', x0: -r, x1: r }, { f: bot, cls: 'c1', x0: -r, x1: r }, { f: x => 2 - x, cls: 'c2' }],
      segs: [[0, 0, 1, 1]], pts: [{ x: 1, y: 1, l: '(1, 1)', dx: 8, dy: -8 }, { x: 0, y: 0 }],
      tx: [{ x: -2.3, y: 1.6, t: 'x² + y² = 2', cls: 'c1t' }, { x: 2.9, y: 0.4, t: 'x + y − 2 = 0', cls: 'c2t', anc: 'end' }, { x: 0.25, y: 0.75, t: 'd' }] });
    return h('div', { class: 'figone', html: s });
  }
});

const POS = [{ k: 'in', en: 'inside', ru: 'внутри' }, { k: 'on', en: 'on the circle', ru: 'на окружности' }, { k: 'out', en: 'outside', ru: 'снаружи' }];
const REL = [{ k: 'par', en: 'parallel', ru: 'параллельны' }, { k: 'perp', en: 'perpendicular', ru: 'перпендикулярны' }, { k: 'neither', en: 'neither', ru: 'ни то, ни другое' }];
const LC = [{ k: '2', en: 'cross (2 points)', ru: 'пересекаются (2 точки)' }, { k: '1', en: 'touch (1 point)', ru: 'касаются (1 точка)' }, { k: '0', en: 'miss (0 points)', ru: 'не пересекаются (0 точек)' }];

const PARTS = [
/* ================= PART 1 ================= */
{ id: 1, title: T('Slope and the equation of a line', 'Угловой коэффициент и уравнение прямой'),
  intro: T('The slope k tells how steep a line is: how much y changes when x grows by 1. Through two points (x₁, y₁), (x₂, y₂): k = (y₂ − y₁)/(x₂ − x₁).', 'Угловой коэффициент k показывает крутизну прямой: на сколько меняется y, когда x увеличивается на 1. Через две точки (x₁, y₁), (x₂, y₂): k = (y₂ − y₁)/(x₂ − x₁).'),
  items: [
  { t: 'task', id: '1.1', title: T('Slopes from points', 'Угловые коэффициенты по точкам'),
    text: T('Write "none" if the slope does not exist.', 'Если углового коэффициента нет, напишите «нет».'),
    parts: [{ k: 'table', head: [T('points', 'точки'), 'k'], rows: [['(1, 2), (3, 6)', { a: '2' }], ['(0, 1), (2, 0)', { a: '-1/2' }], ['(−1, 4), (2, 4)', { a: '0' }], ['(1, 3), (1, 5)', { a: 'none' }]] }],
    hint: T('In the last row x₂ − x₁ = 0: the line is vertical.', 'В последней строке x₂ − x₁ = 0: прямая вертикальна.') },
  { t: 'task', id: '1.2', title: T('Slope and angle', 'Угловой коэффициент и угол'),
    text: T('The angle of inclination α is measured from the positive x-axis, and k = tan α. Find α (in radians).', 'Угол наклона α отсчитывается от положительного направления оси x, и k = tan α. Найдите α (в радианах).'),
    parts: [{ k: 'table', head: ['k', '1', '√3', '−1', '0'], rows: [['α', { a: 'π/4' }, { a: 'π/3' }, { a: '3π/4' }, { a: '0' }]] }],
    hint: T('tan(π/4) = 1, tan(π/3) = √3. A negative slope means an angle between π/2 and π.', 'tan(π/4) = 1, tan(π/3) = √3. Отрицательный угловой коэффициент означает угол между π/2 и π.') },
  { t: 'rule', label: T('Forms of a line', 'Виды уравнения прямой'), text: T('Point-slope 点斜式: y − y₀ = k(x − x₀). Slope-intercept 斜截式: y = kx + b (b is where it meets the y-axis). General form 一般式: Ax + By + C = 0, with slope −A/B when B ≠ 0. A vertical line is x = a and has no slope.', 'С точкой и угловым коэффициентом 点斜式: y − y₀ = k(x − x₀). С угловым коэффициентом 斜截式: y = kx + b (b — точка пересечения с осью y). Общий вид 一般式: Ax + By + C = 0, угловой коэффициент −A/B при B ≠ 0. Вертикальная прямая x = a не имеет углового коэффициента.') },
  { t: 'task', id: '1.3', title: T('Write the line', 'Запишите прямую'),
    text: T('Write each line as y = kx + b.', 'Запишите каждую прямую в виде y = kx + b.'),
    parts: [{ k: 'table', head: [T('line', 'прямая'), 'k', 'b'], rows: [
      [T('through (1, 2) with slope 3', 'через (1, 2) с k = 3'), { a: '3' }, { a: '-1' }],
      [T('through (1, 2) and (3, 6)', 'через (1, 2) и (3, 6)'), { a: '2' }, { a: '0' }],
      ['2x − 3y + 6 = 0', { a: '2/3' }, { a: '2' }]] }],
    hint: T('y − 2 = 3(x − 1). For the last one solve for y: 3y = 2x + 6.', 'y − 2 = 3(x − 1). В последней выразите y: 3y = 2x + 6.') }
  ]},

/* ================= PART 2 ================= */
{ id: 2, title: T('Parallel and perpendicular lines', 'Параллельные и перпендикулярные прямые'),
  intro: T('A line y = kx + b has direction vector (1, k). Use what you know about vectors to compare two lines.', 'У прямой y = kx + b направляющий вектор (1, k). Используйте знания о векторах, чтобы сравнить две прямые.'),
  items: [
  { t: 'task', id: '2.1', title: T('Compare the slopes', 'Сравните угловые коэффициенты'),
    text: T('For each pair: the dot product of (1, k₁) and (1, k₂) is 1 + k₁k₂. Fill in, then decide.', 'Для каждой пары скалярное произведение (1, k₁) и (1, k₂) равно 1 + k₁k₂. Заполните и решите.'),
    parts: [{ k: 'table', head: ['k₁', 'k₂', 'k₁·k₂', '1 + k₁k₂', T('lines are', 'прямые')], rows: [
      ['2', '−1/2', { a: '-1' }, { a: '0' }, { a: 'perp', sel: REL }],
      ['3', '3', { a: '9' }, { a: '10' }, { a: 'par', sel: REL }],
      ['1', '−1', { a: '-1' }, { a: '0' }, { a: 'perp', sel: REL }],
      ['2', '1', { a: '2' }, { a: '3' }, { a: 'neither', sel: REL }]] }],
    hint: T('Dot product 0 means perpendicular. Equal slopes mean the same direction (if b is different, the lines are parallel).', 'Скалярное произведение 0 означает перпендикулярность. Равные угловые коэффициенты — одно направление (если b различны, прямые параллельны).') },
  { t: 'notice', id: 'n2', rule: T('Two lines with slopes k₁, k₂: parallel ⇔ k₁ = k₂ (and different b); perpendicular ⇔ k₁·k₂ = −1. In general form: A₁x + B₁y + C₁ = 0 ⊥ A₂x + B₂y + C₂ = 0 ⇔ A₁A₂ + B₁B₂ = 0.', 'Две прямые с угловыми коэффициентами k₁, k₂: параллельны ⇔ k₁ = k₂ (и b различны); перпендикулярны ⇔ k₁·k₂ = −1. В общем виде: A₁x + B₁y + C₁ = 0 ⊥ A₂x + B₂y + C₂ = 0 ⇔ A₁A₂ + B₁B₂ = 0.') },
  { t: 'task', id: '2.2', title: T('Try it', 'Попробуйте сами'),
    text: T('Use the rule.', 'Используйте правило.'),
    parts: [{ k: 'blanks', lines: [
      [T('(a) The line through (1, 1) perpendicular to y = 2x + 3 is y = kx + b with k = ', '(a) Прямая через (1, 1), перпендикулярная y = 2x + 3, — это y = kx + b, где k = '), { a: '-1/2', w: 4 }, ', b = ', { a: '3/2', w: 4 }],
      [T('(b) ax + 2y + 1 = 0 is parallel to x + y − 1 = 0. Then a = ', '(b) ax + 2y + 1 = 0 параллельна x + y − 1 = 0. Тогда a = '), { a: '2', w: 3 }],
      [T('(c) ax + 2y + 1 = 0 is perpendicular to x + y − 1 = 0. Then a = ', '(c) ax + 2y + 1 = 0 перпендикулярна x + y − 1 = 0. Тогда a = '), { a: '-2', w: 3 }]] }],
    hint: T('(b) Slopes −a/2 and −1 must be equal. (c) a·1 + 2·1 = 0.', '(b) Угловые коэффициенты −a/2 и −1 должны быть равны. (c) a·1 + 2·1 = 0.') }
  ]},

/* ================= PART 3 ================= */
{ id: 3, title: T('Distances', 'Расстояния'),
  intro: T('The distance from a point to a line is measured along the perpendicular. There is a formula; check it first on a case you can see.', 'Расстояние от точки до прямой измеряется по перпендикуляру. Для него есть формула; сначала проверьте её на наглядном случае.'),
  items: [
  { t: 'task', id: '3.1', title: T('A case you can see', 'Наглядный случай'),
    text: T('The figure shows the line x + y − 2 = 0. The perpendicular from O(0, 0) meets it at (1, 1).', 'На рисунке прямая x + y − 2 = 0. Перпендикуляр из O(0, 0) пересекает её в точке (1, 1).'),
    parts: [{ k: 'fig', id: 'tangentline' },
      { k: 'blanks', lines: [
        [T('Distance from O to (1, 1): ', 'Расстояние от O до (1, 1): '), { a: '√2', w: 4 }],
        [T('Formula: ∣A·0 + B·0 + C∣ / √(A² + B²) = ∣−2∣ / √2 = ', 'Формула: ∣A·0 + B·0 + C∣ / √(A² + B²) = ∣−2∣ / √2 = '), { a: '√2', w: 4 }, T('. Same? ', '. Совпадает? '), { a: 'yes', sel: YN }]] }],
    hint: T('√(1² + 1²) = √2. And 2/√2 = √2.', '√(1² + 1²) = √2. И 2/√2 = √2.') },
  { t: 'rule', label: T('Rule', 'Правило'), text: T('Distance from (x₀, y₀) to Ax + By + C = 0: d = ∣Ax₀ + By₀ + C∣ / √(A² + B²). Distance between parallel lines Ax + By + C₁ = 0 and Ax + By + C₂ = 0: d = ∣C₁ − C₂∣ / √(A² + B²) (same A and B first!).', 'Расстояние от (x₀, y₀) до Ax + By + C = 0: d = ∣Ax₀ + By₀ + C∣ / √(A² + B²). Расстояние между параллельными прямыми Ax + By + C₁ = 0 и Ax + By + C₂ = 0: d = ∣C₁ − C₂∣ / √(A² + B²) (сначала сделайте A и B одинаковыми!).') },
  { t: 'task', id: '3.2', title: T('Try it', 'Попробуйте сами'),
    text: T('Compute the distances.', 'Вычислите расстояния.'),
    parts: [{ k: 'table', head: [T('from', 'от'), T('to', 'до'), 'd'], rows: [
      ['(3, 4)', '3x + 4y − 5 = 0', { a: '4' }],
      ['(1, 2)', '3x + 4y − 1 = 0', { a: '2' }],
      ['3x + 4y − 5 = 0', '3x + 4y + 5 = 0', { a: '2' }],
      ['x + y − 1 = 0', '2x + 2y + 1 = 0', { a: '3√2/4' }]] }],
    hint: T('√(3² + 4²) = 5. In the last row first write 2x + 2y − 2 = 0, so C₁ = −2, C₂ = 1 and √(4 + 4) = 2√2.', '√(3² + 4²) = 5. В последней строке сначала запишите 2x + 2y − 2 = 0: C₁ = −2, C₂ = 1, и √(4 + 4) = 2√2.') }
  ]},

/* ================= PART 4 ================= */
{ id: 4, title: T('Circles', 'Окружности'),
  intro: T('A circle 圆 is all points at distance r from a centre (a, b). By Pythagoras that gives its equation.', 'Окружность 圆 — это все точки на расстоянии r от центра (a, b). Теорема Пифагора даёт её уравнение.'),
  items: [
  { t: 'task', id: '4.1', title: T('Inside, on or outside?', 'Внутри, на или снаружи?'),
    text: T('The circle has centre O(0, 0) and radius 5. Compute x² + y² for each point and compare it with 5² = 25.', 'Окружность с центром O(0, 0) и радиусом 5. Вычислите x² + y² для каждой точки и сравните с 5² = 25.'),
    parts: [{ k: 'table', head: [T('point', 'точка'), 'x² + y²', T('position', 'положение')], rows: [
      ['(3, 4)', { a: '25' }, { a: 'on', sel: POS }],
      ['(1, 2)', { a: '5' }, { a: 'in', sel: POS }],
      ['(5, 5)', { a: '50' }, { a: 'out', sel: POS }],
      ['(0, −5)', { a: '25' }, { a: 'on', sel: POS }]] }],
    hint: T('x² + y² is the squared distance from O.', 'x² + y² — квадрат расстояния до O.') },
  { t: 'notice', id: 'n4', rule: T('Standard equation 标准方程: (x − a)² + (y − b)² = r², centre (a, b), radius r. General equation 一般方程: x² + y² + Dx + Ey + F = 0; complete the squares to find the centre and radius (it is a circle only if D² + E² − 4F > 0).', 'Каноническое уравнение 标准方程: (x − a)² + (y − b)² = r², центр (a, b), радиус r. Общее уравнение 一般方程: x² + y² + Dx + Ey + F = 0; выделите полные квадраты, чтобы найти центр и радиус (это окружность, только если D² + E² − 4F > 0).') },
  { t: 'task', id: '4.2', title: T('Complete the squares', 'Выделите полные квадраты'),
    text: T('x² + y² − 4x + 6y − 3 = 0. Group: (x² − 4x + 4) + (y² + 6y + 9) = 3 + 4 + 9.', 'x² + y² − 4x + 6y − 3 = 0. Сгруппируйте: (x² − 4x + 4) + (y² + 6y + 9) = 3 + 4 + 9.'),
    parts: [{ k: 'blanks', lines: [
      ['(x − 2)² + (y + 3)² = ', { a: '16', w: 3 }],
      [T('Centre ( ', 'Центр ( '), { a: '2', w: 2 }, ' , ', { a: '-3', w: 2 }, T(' ),  radius ', ' ),  радиус '), { a: '4', w: 2 }],
      [T('The circle with centre (1, −2) through the origin has r² = ', 'Окружность с центром (1, −2), проходящая через начало координат, имеет r² = '), { a: '5', w: 2 }]] }],
    hint: T('y + 3 = y − (−3), so b = −3.', 'y + 3 = y − (−3), поэтому b = −3.') },
  { t: 'task', id: '4.3', title: T('A line and a circle', 'Прямая и окружность'),
    text: T('The line is always x + y − 2 = 0, so the distance from O to it is d = √2 (task 3.1). Change the circle x² + y² = r².', 'Прямая всегда x + y − 2 = 0, поэтому расстояние от O до неё d = √2 (задание 3.1). Меняйте окружность x² + y² = r².'),
    parts: [{ k: 'table', head: [T('circle', 'окружность'), 'r', T('compare d and r', 'сравните d и r'), T('the line and the circle', 'прямая и окружность')], rows: [
      ['x² + y² = 4', { a: '2' }, { a: '<', sel: ['<', '=', '>'] }, { a: '2', sel: LC }],
      ['x² + y² = 2', { a: '√2' }, { a: '=', sel: ['<', '=', '>'] }, { a: '1', sel: LC }],
      ['x² + y² = 1', { a: '1' }, { a: '>', sel: ['<', '=', '>'] }, { a: '0', sel: LC }]] }],
    hint: T('Compare √2 ≈ 1.41 with r. Look at the figure for the middle row.', 'Сравните √2 ≈ 1,41 с r. Для средней строки посмотрите на рисунок.') },
  { t: 'notice', id: 'n4b', rule: T('Let d be the distance from the centre to the line. d < r: two common points (相交). d = r: tangent (相切). d > r: no common points (相离). A chord cut by the line has length 2√(r² − d²).', 'Пусть d — расстояние от центра до прямой. d < r: две общие точки (相交). d = r: касание (相切). d > r: общих точек нет (相离). Хорда, которую отсекает прямая, имеет длину 2√(r² − d²).') },
  { t: 'task', id: '4.4', title: T('Try it', 'Попробуйте сами'),
    text: T('Use the rules.', 'Используйте правила.'),
    parts: [{ k: 'blanks', lines: [
      [T('(a) The line x + y − 2 = 0 cuts a chord from x² + y² = 4 of length ', '(a) Прямая x + y − 2 = 0 отсекает от x² + y² = 4 хорду длиной '), { a: '2√2', w: 4 }],
      [T('(b) The tangent to x² + y² = 5 at (1, 2) is perpendicular to the radius, whose slope is ', '(b) Касательная к x² + y² = 5 в точке (1, 2) перпендикулярна радиусу, угловой коэффициент которого '), { a: '2', w: 3 }, T('. So the tangent has slope ', '. Значит, угловой коэффициент касательной '), { a: '-1/2', w: 4 }, T(' and is x + 2y − ', ', и она имеет вид x + 2y − '), { a: '5', w: 2 }, ' = 0']] }],
    hint: T('(a) d = √2, r = 2: 2√(4 − 2). (b) Put (1, 2) into x + 2y.', '(a) d = √2, r = 2: 2√(4 − 2). (b) Подставьте (1, 2) в x + 2y.') }
  ]}
];

const EXAM = [
  { part: 1, q: T('The angle of inclination of the line x − y + 1 = 0 is', 'Угол наклона прямой x − y + 1 = 0 равен'), o: ['π/6', 'π/4', 'π/3', '3π/4'], a: 1 },
  { part: 1, q: T('The slope of the line through (1, 2) and (3, 6) is', 'Угловой коэффициент прямой через (1, 2) и (3, 6) равен'), o: ['2', '1/2', '4', '−2'], a: 0 },
  { part: 2, q: T('The line through (1, 1) perpendicular to x − 2y + 1 = 0 is', 'Прямая через (1, 1), перпендикулярная x − 2y + 1 = 0, —'), o: ['x − 2y + 1 = 0', '2x − y − 1 = 0', '2x + y − 3 = 0', 'x + 2y − 3 = 0'], a: 2 },
  { part: 2, q: T('The lines ax + 2y + 1 = 0 and x + y − 1 = 0 are parallel. Then a =', 'Прямые ax + 2y + 1 = 0 и x + y − 1 = 0 параллельны. Тогда a ='), o: ['−2', '1', '−1', '2'], a: 3 },
  { part: 3, q: T('The distance from (1, 2) to the line 3x + 4y − 1 = 0 is', 'Расстояние от (1, 2) до прямой 3x + 4y − 1 = 0 равно'), o: ['2', '10', '12/5', '1'], a: 0 },
  { part: 3, q: T('The distance between 3x + 4y − 5 = 0 and 3x + 4y + 5 = 0 is', 'Расстояние между 3x + 4y − 5 = 0 и 3x + 4y + 5 = 0 равно'), o: ['10', '2', '1', '0'], a: 1 },
  { part: 4, q: T('The centre and radius of x² + y² − 4x + 6y − 3 = 0 are', 'Центр и радиус окружности x² + y² − 4x + 6y − 3 = 0 —'), o: [T('(−2, 3), 4', '(−2, 3), 4'), T('(2, −3), 16', '(2, −3), 16'), T('(2, −3), 4', '(2, −3), 4'), T('(−2, 3), 16', '(−2, 3), 16')], a: 2 },
  { part: 4, q: T('The line x + y − 2 = 0 and the circle x² + y² = 2 are', 'Прямая x + y − 2 = 0 и окружность x² + y² = 2'), o: [T('crossing, through the centre', 'пересекаются, проходя через центр'), T('crossing, not through the centre', 'пересекаются, не проходя через центр'), T('not meeting', 'не пересекаются'), T('tangent', 'касаются')], a: 3 },
  { part: 4, q: T('The chord cut from x² + y² = 4 by x + y − 2 = 0 has length', 'Хорда, отсекаемая от x² + y² = 4 прямой x + y − 2 = 0, имеет длину'), o: ['√2', '2', '2√2', '4'], a: 2 },
  { part: 4, q: T('The tangent line to x² + y² = 5 at the point (1, 2) is', 'Касательная к x² + y² = 5 в точке (1, 2) —'), o: ['x + 2y − 5 = 0', '2x + y − 4 = 0', 'x − 2y + 3 = 0', '2x − y = 0'], a: 0 },
  { part: 4, q: T('The circle with centre (1, −2) that passes through the origin is', 'Окружность с центром (1, −2), проходящая через начало координат, —'), o: ['(x + 1)² + (y − 2)² = 5', '(x − 1)² + (y + 2)² = 5', '(x − 1)² + (y + 2)² = √5', '(x − 1)² + (y + 2)² = 25'], a: 1 },
  { part: 1, q: T('The line 2x − 3y + 6 = 0 meets the y-axis at y =', 'Прямая 2x − 3y + 6 = 0 пересекает ось y при y ='), o: ['−2', '3', '−3', '2'], a: 3 }
];

const TOPICS = [
  [T('Slope, angle, equation of a line 斜率 / 倾斜角 / 直线方程', 'Угловой коэффициент, угол, уравнение прямой 斜率 / 倾斜角 / 直线方程'), 1, '"The angle of inclination of the line … is"'],
  [T('Parallel and perpendicular 平行 / 垂直', 'Параллельность и перпендикулярность 平行 / 垂直'), 2, '"If the two lines are parallel, then a ="'],
  [T('Distances 点到直线的距离', 'Расстояния 点到直线的距离'), 3, '"The distance from the point … to the line … is"'],
  [T('Circles, line and circle 圆 / 直线与圆的位置关系', 'Окружности, прямая и окружность 圆 / 直线与圆的位置关系'), 4, '"The centre and radius of the circle … are"; "the positional relationship of the line and the circle is"']
];
