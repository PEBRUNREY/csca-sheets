/* Sheet: Trigonometry (CSCA Mathematics): radians, identities, sum and double-angle formulas, graph shifts, solving triangles. */
const SHEET = {
  key: 'csca-math-trigonometry-v1',
  title: T('Investigation sheet: Trigonometry', 'Исследовательский лист: тригонометрия'),
  sub: T('CSCA Mathematics · find each rule yourself, then read it', 'CSCA, математика · найдите каждое правило сами, потом прочитайте его'),
  stats: T('The Functions sheet covers the graphs, periods and exact values of sin, cos and tan. This sheet adds what the exam asks next: radians, identities, the sum and double-angle formulas, moving graphs, and triangles. Typical questions:',
           'Лист «Функции» охватывает графики, периоды и точные значения sin, cos и tan. Этот лист добавляет то, что экзамен спрашивает дальше: радианы, тождества, формулы суммы и двойного угла, сдвиги графиков и треугольники. Типичные вопросы:'),
  symbols: T('Symbols: π ≈ 3.14. In a triangle ABC the side a is opposite the angle A, b is opposite B, c is opposite C. Type π as pi and √ as sqrt, for example sqrt(3)/2. Angles in degrees: type just the number, 120.',
             'Обозначения: π ≈ 3,14. В треугольнике ABC сторона a лежит напротив угла A, b — напротив B, c — напротив C. π вводите как pi, √ как sqrt, например sqrt(3)/2. Углы в градусах — только число: 120.')
};

SHEET.figs = ({ h, plot }) => ({
  circle() {
    return h('div', { html: `<svg class="geo" viewBox="0 0 350 260" role="img" aria-label="Unit circle with the four quadrants and the signs of sin and cos">
      <line x1="20" y1="130" x2="280" y2="130" style="stroke:var(--muted)"/><line x1="150" y1="10" x2="150" y2="250" style="stroke:var(--muted)"/>
      <circle cx="150" cy="130" r="100"/>
      <line x1="150" y1="130" x2="236.6" y2="80" class="acc"/><circle cx="236.6" cy="80" r="4" class="dot"/>
      <line x1="236.6" y1="80" x2="236.6" y2="130" class="hid"/>
      <text x="240" y="74">(cos α, sin α)</text><text x="176" y="124" class="mt">α</text>
      <text x="196" y="40">I</text><text x="92" y="40">II</text><text x="88" y="230">III</text><text x="196" y="230">IV</text>
      <text x="254" y="148" class="mt">1</text><text x="30" y="148" class="mt">−1</text><text x="156" y="26" class="mt">1</text><text x="156" y="246" class="mt">−1</text>
    </svg>` });
  },
  shift() {
    const s = plot({ label: 'sin x and sin(x − π/3)', xlow: true, w: 460, h: 210, x0: -0.6, x1: 2 * Math.PI + 1.4, y0: -1.4, y1: 1.5,
      xt: [{ v: Math.PI / 3, l: 'π/3' }, { v: Math.PI / 2, l: 'π/2' }, { v: 5 * Math.PI / 6, l: '5π/6' }, { v: Math.PI, l: 'π' }, { v: 2 * Math.PI, l: '2π' }], yt: [{ v: 1, l: '1' }, { v: -1, l: '−1' }],
      curves: [{ f: Math.sin, cls: 'c1' }, { f: x => Math.sin(x - Math.PI / 3), cls: 'c2' }],
      pts: [{ x: Math.PI / 2, y: 1 }, { x: 5 * Math.PI / 6, y: 1 }],
      tx: [{ x: 0.1, y: 1.25, t: 'y = sin x', cls: 'c1t' }, { x: 3.2, y: 1.25, t: 'y = sin(x − π/3)', cls: 'c2t' }] });
    return h('div', { class: 'figstack', html: s });
  },
  tri() {
    return h('div', { html: `<svg class="geo" viewBox="0 0 320 190" role="img" aria-label="Triangle ABC with side a opposite A, b opposite B, c opposite C">
      <polygon points="30,165 290,165 200,30" class="acc"/>
      <text x="14" y="180">A</text><text x="294" y="180">B</text><text x="200" y="22">C</text>
      <text x="152" y="184" class="mt">c</text><text x="252" y="96" class="mt">a</text><text x="100" y="92" class="mt">b</text>
    </svg>` });
  }
});

const R = (k, en, ru) => ({ k, en, ru });
const PM = [R('p', '+', '+'), R('m', '−', '−')];
const RED = [R('s', 'sin α', 'sin α'), R('-s', '−sin α', '−sin α'), R('c', 'cos α', 'cos α'), R('-c', '−cos α', '−cos α')];

const PARTS = [
/* ================= PART 1 ================= */
{ id: 1, title: T('Radians and the unit circle', 'Радианы и единичная окружность'),
  intro: T('Exam answers use radians 弧度, not degrees. An angle α on the unit circle 单位圆 sends a point to (cos α, sin α).',
           'В ответах экзамена используются радианы 弧度, а не градусы. Угол α на единичной окружности 单位圆 переводит точку в (cos α, sin α).'),
  items: [
  { t: 'task', id: '1.1', title: T('Degrees to radians', 'Градусы в радианы'),
    text: T('A full turn is 360°, and it is also 2π radians. Fill in the table.', 'Полный оборот — это 360°, и это же 2π радиан. Заполните таблицу.'),
    parts: [
      { k: 'table', head: [T('degrees', 'градусы'), '360°', '180°', '90°', '60°', '45°', '30°', '120°'], rows: [[T('radians', 'радианы'), '2π', { a: 'π' }, { a: 'π/2' }, { a: 'π/3' }, { a: 'π/4' }, { a: 'π/6' }, { a: '2π/3' }]] },
      { k: 'table', head: [T('radians', 'радианы'), '3π/4', '5π/6', '3π/2'], rows: [[T('degrees', 'градусы'), { a: '135' }, { a: '150' }, { a: '270' }]] }],
    hint: T('Half a turn: 180° = π. So 60° is one third of π.', 'Пол-оборота: 180° = π. Значит, 60° — это треть π.') },
  { t: 'rule', label: T('Rule', 'Правило'), text: T('180° = π rad. Degrees → radians: multiply by π/180. Radians → degrees: multiply by 180/π. On a circle of radius r, an angle α (in radians) cuts an arc of length l = αr and a sector of area S = ½αr² = ½lr.', '180° = π рад. Градусы → радианы: умножьте на π/180. Радианы → градусы: умножьте на 180/π. На окружности радиуса r угол α (в радианах) отсекает дугу длины l = αr и сектор площади S = ½αr² = ½lr.') },
  { t: 'task', id: '1.2', title: T('Signs in the four quadrants', 'Знаки в четырёх четвертях'),
    text: T('The point for α is (cos α, sin α). Decide the sign of each value from the quadrant 象限 where the point lands.', 'Точка для α — это (cos α, sin α). Определите знак каждого значения по четверти 象限, в которую попадает точка.'),
    parts: [{ k: 'fig', id: 'circle' },
      { k: 'table', head: ['α', T('quadrant', 'четверть'), 'sin α', 'cos α', 'tan α'], rows: [
        ['π/3', 'I', { a: 'p', sel: PM }, { a: 'p', sel: PM }, { a: 'p', sel: PM }],
        ['2π/3', 'II', { a: 'p', sel: PM }, { a: 'm', sel: PM }, { a: 'm', sel: PM }],
        ['4π/3', 'III', { a: 'm', sel: PM }, { a: 'm', sel: PM }, { a: 'p', sel: PM }],
        ['5π/3', 'IV', { a: 'm', sel: PM }, { a: 'p', sel: PM }, { a: 'm', sel: PM }]] }],
    hint: T('sin is the height (y), cos is the left-right position (x), and tan = sin / cos.', 'sin — это высота (y), cos — положение влево-вправо (x), а tan = sin / cos.') },
  { t: 'notice', id: 'n1', rule: T('Quadrant I: all positive. II: only sin positive. III: only tan positive. IV: only cos positive. (Chinese memory line: 一全正，二正弦，三正切，四余弦.)', 'I четверть: все положительны. II: положителен только sin. III: только tan. IV: только cos. (Китайская запоминалка: 一全正，二正弦，三正切，四余弦.)') },
  { t: 'task', id: '1.3', title: T('Arc and sector', 'Дуга и сектор'),
    text: T('A sector has radius 2 and central angle π/3.', 'У сектора радиус 2 и центральный угол π/3.'),
    parts: [{ k: 'blanks', lines: [[T('Arc length l = ', 'Длина дуги l = '), { a: '2π/3', w: 4 }, T('   area S = ', '   площадь S = '), { a: '2π/3', w: 4 }]] }],
    hint: T('l = αr, S = ½lr.', 'l = αr, S = ½lr.') }
  ]},

/* ================= PART 2 ================= */
{ id: 2, title: T('Identities and reduction formulas', 'Тождества и формулы приведения'),
  intro: T('Two identities link sin, cos and tan of the same angle. The reduction formulas 诱导公式 turn the angle π − α, π + α or π/2 − α back into α.',
           'Два тождества связывают sin, cos и tan одного угла. Формулы приведения 诱导公式 сводят углы π − α, π + α и π/2 − α к углу α.'),
  items: [
  { t: 'task', id: '2.1', title: T('Square and add', 'Возведите в квадрат и сложите'),
    text: T('Fill in the table.', 'Заполните таблицу.'),
    parts: [{ k: 'table', head: ['α', 'π/6', 'π/4', 'π/3', '2π/3'], rows: [
      ['sin²α', { a: '1/4' }, { a: '1/2' }, { a: '3/4' }, { a: '3/4' }],
      ['cos²α', { a: '3/4' }, { a: '1/2' }, { a: '1/4' }, { a: '1/4' }],
      ['sin²α + cos²α', { a: '1' }, { a: '1' }, { a: '1' }, { a: '1' }]] }],
    hint: T('sin π/6 = 1/2, so sin²(π/6) = 1/4. cos(2π/3) = −1/2, and its square is positive.', 'sin π/6 = 1/2, поэтому sin²(π/6) = 1/4. cos(2π/3) = −1/2, а его квадрат положителен.') },
  { t: 'notice', id: 'n2', rule: T('sin²α + cos²α = 1 and tan α = sin α / cos α. (The point (cos α, sin α) lies on a circle of radius 1.)', 'sin²α + cos²α = 1 и tan α = sin α / cos α. (Точка (cos α, sin α) лежит на окружности радиуса 1.)') },
  { t: 'task', id: '2.2', title: T('One value gives the others', 'Одно значение даёт остальные'),
    text: T('sin α = 3/5 and α is in quadrant II (π/2 < α < π).', 'sin α = 3/5, и α лежит во II четверти (π/2 < α < π).'),
    parts: [{ k: 'blanks', lines: [
      ['cos²α = 1 − 9/25 = ', { a: '16/25', w: 4 }],
      [T('In quadrant II cos α is negative, so cos α = ', 'Во II четверти cos α отрицателен, поэтому cos α = '), { a: '-4/5', w: 4 }],
      ['tan α = ', { a: '-3/4', w: 4 }]] }],
    hint: T('Take the square root of 16/25, then choose the sign from the quadrant.', 'Извлеките корень из 16/25, затем выберите знак по четверти.') },
  { t: 'task', id: '2.3', title: T('Only tan is given', 'Дан только tan'),
    text: T('tan α = 2. Find (sin α + cos α) / (sin α − cos α) without finding α. Divide the top and the bottom by cos α.', 'tan α = 2. Найдите (sin α + cos α) / (sin α − cos α), не находя α. Разделите числитель и знаменатель на cos α.'),
    parts: [{ k: 'blanks', lines: [[T('It becomes (tan α + 1)/(tan α − 1) = ', 'Получается (tan α + 1)/(tan α − 1) = '), { a: '3', w: 3 }]] }],
    hint: T('sin α / cos α = tan α and cos α / cos α = 1.', 'sin α / cos α = tan α, а cos α / cos α = 1.') },
  { t: 'task', id: '2.4', title: T('Related angles', 'Связанные углы'),
    text: T('Take α = π/6, so sin α = 1/2 and cos α = √3/2. Compute each value, then compare it with sin α or cos α.', 'Возьмите α = π/6: sin α = 1/2, cos α = √3/2. Вычислите каждое значение и сравните его с sin α или cos α.'),
    parts: [{ k: 'table', head: [T('Expression', 'Выражение'), T('angle', 'угол'), T('value', 'значение'), T('equals', 'равно')], rows: [
      ['sin(π − α)', '5π/6', { a: '1/2' }, { a: 's', sel: RED }],
      ['cos(π − α)', '5π/6', { a: '-√3/2' }, { a: '-c', sel: RED }],
      ['sin(π + α)', '7π/6', { a: '-1/2' }, { a: '-s', sel: RED }],
      ['sin(−α)', '−π/6', { a: '-1/2' }, { a: '-s', sel: RED }],
      ['cos(π/2 − α)', 'π/3', { a: '1/2' }, { a: 's', sel: RED }],
      ['sin(π/2 + α)', '2π/3', { a: '√3/2' }, { a: 'c', sel: RED }]] }],
    hint: T('Use the unit circle: 5π/6 is in quadrant II, 7π/6 in quadrant III.', 'Используйте единичную окружность: 5π/6 лежит во II четверти, 7π/6 — в III.') },
  { t: 'notice', id: 'n2b', rule: T('With π ± α or −α the function keeps its name (sin stays sin). With π/2 ± α the name swaps (sin ↔ cos). The sign is the sign of the original function in the quadrant where the new angle lies, taking α as a small angle. (奇变偶不变，符号看象限.)', 'При π ± α и −α функция сохраняет название (sin остаётся sin). При π/2 ± α название меняется (sin ↔ cos). Знак — это знак исходной функции в той четверти, где лежит новый угол, если считать α маленьким углом. (奇变偶不变，符号看象限.)') }
  ]},

/* ================= PART 3 ================= */
{ id: 3, title: T('Sum and double-angle formulas', 'Формулы суммы и двойного угла'),
  intro: T('Is sin(a + b) the same as sin a + sin b? Test it before you trust it.', 'Равно ли sin(a + b) сумме sin a + sin b? Проверьте, прежде чем верить.'),
  items: [
  { t: 'task', id: '3.1', title: T('Test a guess', 'Проверьте догадку'),
    text: T('Take a = π/6 and b = π/3, so a + b = π/2.', 'Возьмите a = π/6 и b = π/3, тогда a + b = π/2.'),
    parts: [{ k: 'blanks', lines: [
      ['sin(a + b) = sin(π/2) = ', { a: '1', w: 3 }],
      ['sin a + sin b = 1/2 + √3/2 ≈ ', { a: '1.37', w: 4 }, T('. Equal? ', '. Равно? '), { a: 'no', sel: YN }],
      ['sin a cos b + cos a sin b = 1/2 · 1/2 + √3/2 · √3/2 = ', { a: '1', w: 3 }, T('. Equal to sin(a + b)? ', '. Равно sin(a + b)? '), { a: 'yes', sel: YN }]] }],
    hint: T('√3/2 ≈ 0.87. 1/4 + 3/4 = 1.', '√3/2 ≈ 0,87. 1/4 + 3/4 = 1.') },
  { t: 'rule', label: T('Sum formulas 两角和差公式', 'Формулы суммы 两角和差公式'), text: T('sin(a ± b) = sin a cos b ± cos a sin b.  cos(a ± b) = cos a cos b ∓ sin a sin b (note the opposite sign).  tan(a ± b) = (tan a ± tan b) / (1 ∓ tan a tan b).', 'sin(a ± b) = sin a cos b ± cos a sin b.  cos(a ± b) = cos a cos b ∓ sin a sin b (обратите внимание на противоположный знак).  tan(a ± b) = (tan a ± tan b) / (1 ∓ tan a tan b).') },
  { t: 'task', id: '3.2', title: T('Angles that are not in the table', 'Углы, которых нет в таблице'),
    text: T('75° = 45° + 30° and 15° = 45° − 30°. You may type sqrt(6) for √6.', '75° = 45° + 30° и 15° = 45° − 30°. √6 можно вводить как sqrt(6).'),
    parts: [{ k: 'blanks', lines: [
      ['sin 75° = ', { a: '(√6+√2)/4', w: 7 }],
      ['cos 75° = ', { a: '(√6−√2)/4', w: 7 }],
      ['tan(π/4 + π/4) ', T('has no value, because 1 − tan(π/4)·tan(π/4) = ', 'не существует, потому что 1 − tan(π/4)·tan(π/4) = '), { a: '0', w: 2 }]] }],
    hint: T('sin 45° = cos 45° = √2/2, sin 30° = 1/2, cos 30° = √3/2. √2 · √3 = √6.', 'sin 45° = cos 45° = √2/2, sin 30° = 1/2, cos 30° = √3/2. √2 · √3 = √6.') },
  { t: 'task', id: '3.3', title: T('Put b = a', 'Положите b = a'),
    text: T('Use the sum formulas with b = a to get the double-angle formulas 二倍角公式. Then use them with sin α = 3/5, cos α = −4/5 (from task 2.2).', 'Подставьте b = a в формулы суммы и получите формулы двойного угла 二倍角公式. Затем примените их при sin α = 3/5, cos α = −4/5 (из задания 2.2).'),
    parts: [
      { k: 'open', lines: [{ q: T('Write sin 2a and cos 2a in terms of sin a and cos a.', 'Запишите sin 2a и cos 2a через sin a и cos a.'), a: T('sin 2a = 2 sin a cos a.  cos 2a = cos²a − sin²a = 2cos²a − 1 = 1 − 2sin²a.', 'sin 2a = 2 sin a cos a.  cos 2a = cos²a − sin²a = 2cos²a − 1 = 1 − 2sin²a.') }] },
      { k: 'blanks', lines: [['sin 2α = ', { a: '-24/25', w: 5 }, '   cos 2α = ', { a: '7/25', w: 5 }]] }],
    hint: T('sin 2α = 2 · (3/5) · (−4/5). cos 2α = 1 − 2 · (3/5)².', 'sin 2α = 2 · (3/5) · (−4/5). cos 2α = 1 − 2 · (3/5)².') },
  { t: 'task', id: '3.4', title: T('Two terms become one', 'Два слагаемых становятся одним'),
    text: T('The exam often gives a sum like sin x + √3 cos x and asks for its period or largest value. Turn it into one sine.', 'Экзамен часто даёт сумму вида sin x + √3 cos x и спрашивает её период или наибольшее значение. Превратите её в один синус.'),
    parts: [{ k: 'blanks', lines: [
      ['sin x + √3 cos x = 2(½ sin x + (√3/2) cos x) = 2 sin(x + ', { a: 'π/3', w: 4 }, ')'],
      [T('Largest value: ', 'Наибольшее значение: '), { a: '2', w: 3 }, T('   period: ', '   период: '), { a: '2π', w: 3 }],
      ['sin x cos x = ½ sin 2x. ', T('Period: ', 'Период: '), { a: 'π', w: 3 }, T('   largest value: ', '   наибольшее значение: '), { a: '1/2', w: 3 }],
      ['cos²x − sin²x = cos 2x. ', T('Period: ', 'Период: '), { a: 'π', w: 3 }]] }],
    hint: T('½ = cos(π/3) and √3/2 = sin(π/3), so the bracket is sin x cos(π/3) + cos x sin(π/3).', '½ = cos(π/3) и √3/2 = sin(π/3), поэтому скобка равна sin x cos(π/3) + cos x sin(π/3).') },
  { t: 'rule', label: T('Rule (auxiliary angle 辅助角)', 'Правило (вспомогательный угол 辅助角)'), text: T('a sin x + b cos x = √(a² + b²) · sin(x + φ), where cos φ = a/√(a² + b²) and sin φ = b/√(a² + b²). Its largest value is √(a² + b²).', 'a sin x + b cos x = √(a² + b²) · sin(x + φ), где cos φ = a/√(a² + b²) и sin φ = b/√(a² + b²). Его наибольшее значение равно √(a² + b²).') }
  ]},

/* ================= PART 4 ================= */
{ id: 4, title: T('Moving the graph of y = A sin(ωx + φ)', 'Сдвиги графика y = A sin(ωx + φ)'),
  intro: T('Changing the formula moves or stretches the graph. The exam asks "how do you get graph 2 from graph 1?" (图象平移).', 'Изменение формулы сдвигает или растягивает график. Экзамен спрашивает: «как получить график 2 из графика 1?» (图象平移).'),
  items: [
  { t: 'task', id: '4.1', title: T('Where did the peak go?', 'Куда ушла вершина?'),
    text: T('Compare y = sin x and y = sin(x − π/3). The peak of sin x is where the inside equals π/2.', 'Сравните y = sin x и y = sin(x − π/3). Вершина синуса там, где выражение внутри равно π/2.'),
    parts: [{ k: 'fig', id: 'shift' },
      { k: 'blanks', lines: [
        [T('Peak of sin x: x = ', 'Вершина sin x: x = '), { a: 'π/2', w: 4 }, T('.   Peak of sin(x − π/3): x − π/3 = π/2, so x = ', '.   Вершина sin(x − π/3): x − π/3 = π/2, поэтому x = '), { a: '5π/6', w: 4 }],
        [T('The graph moved ', 'График сдвинулся '), { a: 'right', sel: LR }, T(' by π/3.', ' на π/3.')]] }],
    hint: T('π/2 + π/3 = 3π/6 + 2π/6.', 'π/2 + π/3 = 3π/6 + 2π/6.') },
  { t: 'notice', id: 'n4', rule: T('y = f(x − c) is the graph of f moved **right** by c; y = f(x + c) is moved **left** by c ("left add, right subtract": 左加右减). The change acts on x itself.', 'y = f(x − c) — это график f, сдвинутый **вправо** на c; y = f(x + c) — сдвинутый **влево** на c («влево — плюс, вправо — минус»: 左加右减). Изменение действует на сам x.') },
  { t: 'task', id: '4.2', title: T('The trap with ω', 'Ловушка с ω'),
    text: T('y = sin(2x + π/3) = sin 2(x + π/6). Start from y = sin 2x.', 'y = sin(2x + π/3) = sin 2(x + π/6). Начните с y = sin 2x.'),
    parts: [
      { k: 'blanks', lines: [[T('The graph of y = sin 2x moves ', 'График y = sin 2x сдвигается '), { a: 'left', sel: LR }, T(' by ', ' на '), { a: 'π/6', w: 4 }]] },
      { k: 'open', lines: [{ q: T('Why not π/3?', 'Почему не на π/3?'), a: T('The shift acts on x itself. Take 2 out of the bracket: 2x + π/3 = 2(x + π/6), so x is replaced by x + π/6.', 'Сдвиг действует на сам x. Вынесите 2 за скобку: 2x + π/3 = 2(x + π/6), значит, x заменяется на x + π/6.') }] }],
    hint: T('Take the number in front of x out of the bracket first.', 'Сначала вынесите число перед x за скобку.') },
  { t: 'task', id: '4.3', title: T('Read A, ω and φ', 'Найдите A, ω и φ'),
    text: T('y = 3 sin(2x − π/4) + 1.', 'y = 3 sin(2x − π/4) + 1.'),
    parts: [{ k: 'blanks', lines: [
      [T('Largest value ', 'Наибольшее значение '), { a: '4', w: 3 }, T('   smallest value ', '   наименьшее значение '), { a: '-2', w: 3 }, T('   period ', '   период '), { a: 'π', w: 3 }],
      [T('The first peak to the right of 0 is where 2x − π/4 = π/2, so x = ', 'Первая вершина справа от 0 там, где 2x − π/4 = π/2, поэтому x = '), { a: '3π/8', w: 4 }]] }],
    hint: T('3 sin(…) lies between −3 and 3; then add 1. Period = 2π/ω.', '3 sin(…) лежит между −3 и 3; затем прибавьте 1. Период = 2π/ω.') }
  ]},

/* ================= PART 5 ================= */
{ id: 5, title: T('Solving triangles', 'Решение треугольников'),
  intro: T('In any triangle ABC, two laws connect the sides and the angles: the law of sines 正弦定理 and the law of cosines 余弦定理. Find both from examples.', 'В любом треугольнике ABC стороны и углы связывают две теоремы: теорема синусов 正弦定理 и теорема косинусов 余弦定理. Найдите обе на примерах.'),
  items: [
  { t: 'task', id: '5.1', title: T('Divide each side by the sine of its angle', 'Разделите сторону на синус противолежащего угла'),
    text: T('Two right triangles. Compute side ÷ sine of the opposite angle.', 'Два прямоугольных треугольника. Вычислите сторону ÷ синус противолежащего угла.'),
    parts: [{ k: 'fig', id: 'tri' },
      { k: 'table', head: [T('Triangle', 'Треугольник'), 'a / sin A', 'b / sin B', 'c / sin C'], rows: [
        [T('A = 30°, B = 60°, C = 90°; a = 1, b = √3, c = 2', 'A = 30°, B = 60°, C = 90°; a = 1, b = √3, c = 2'), { a: '2' }, { a: '2' }, { a: '2' }],
        [T('A = 45°, B = 45°, C = 90°; a = 1, b = 1, c = √2', 'A = 45°, B = 45°, C = 90°; a = 1, b = 1, c = √2'), { a: '√2' }, { a: '√2' }, { a: '√2' }]] }],
    hint: T('1 ÷ (1/2) = 2. 1 ÷ (√2/2) = 2/√2 = √2.', '1 ÷ (1/2) = 2. 1 ÷ (√2/2) = 2/√2 = √2.') },
  { t: 'notice', id: 'n5', rule: T('Law of sines: a / sin A = b / sin B = c / sin C = 2R, where R is the radius of the circumscribed circle. Use it when you know two angles and a side, or two sides and the angle opposite one of them.', 'Теорема синусов: a / sin A = b / sin B = c / sin C = 2R, где R — радиус описанной окружности. Применяйте её, когда известны два угла и сторона или две стороны и угол напротив одной из них.') },
  { t: 'task', id: '5.2', title: T('Pythagoras with a correction', 'Пифагор с поправкой'),
    text: T('Pythagoras works only when C = 90°. Measure how far off it is for other angles.', 'Теорема Пифагора верна только при C = 90°. Измерьте, насколько она ошибается при других углах.'),
    parts: [{ k: 'table', head: ['a, b, C', 'c', 'a² + b²', 'c²', 'a² + b² − c²', '2ab·cos C'], rows: [
      ['3, 4, 90°', '5', { a: '25' }, { a: '25' }, { a: '0' }, { a: '0' }],
      ['1, 1, 60°', '1', { a: '2' }, { a: '1' }, { a: '1' }, { a: '1' }],
      ['1, 1, 120°', '√3', { a: '2' }, { a: '3' }, { a: '-1' }, { a: '-1' }]] }],
    hint: T('cos 60° = 1/2 and cos 120° = −1/2. (√3)² = 3.', 'cos 60° = 1/2 и cos 120° = −1/2. (√3)² = 3.') },
  { t: 'notice', id: 'n5b', rule: T('Law of cosines: c² = a² + b² − 2ab·cos C, or cos C = (a² + b² − c²) / (2ab). Use it when you know three sides, or two sides and the angle between them.', 'Теорема косинусов: c² = a² + b² − 2ab·cos C, или cos C = (a² + b² − c²) / (2ab). Применяйте её, когда известны три стороны или две стороны и угол между ними.') },
  { t: 'task', id: '5.3', title: T('Try it', 'Попробуйте сами'),
    text: T('Choose the right law each time. Angles in radians.', 'Каждый раз выберите нужную теорему. Углы — в радианах.'),
    parts: [{ k: 'blanks', lines: [
      [T('(a) a = 3, b = 5, C = 2π/3. Then c² = ', '(a) a = 3, b = 5, C = 2π/3. Тогда c² = '), { a: '49', w: 3 }, ', c = ', { a: '7', w: 3 }],
      [T('(b) The sides are 3, 5 and 7. The largest angle is opposite 7; its cosine is ', '(b) Стороны равны 3, 5 и 7. Наибольший угол лежит напротив 7; его косинус равен '), { a: '-1/2', w: 4 }, T(', so the angle is ', ', значит, угол равен '), { a: '2π/3', w: 4 }],
      [T('(c) A = π/4, B = π/3, a = 2. Then b = ', '(c) A = π/4, B = π/3, a = 2. Тогда b = '), { a: '√6', w: 4 }],
      [T('(d) Area: a = 4, b = 5, C = π/6. S = ½ab·sin C = ', '(d) Площадь: a = 4, b = 5, C = π/6. S = ½ab·sin C = '), { a: '5', w: 3 }]] }],
    hint: T('(a) cos(2π/3) = −1/2, so −2ab·cos C = +15. (c) b = a·sin B / sin A.', '(a) cos(2π/3) = −1/2, поэтому −2ab·cos C = +15. (c) b = a·sin B / sin A.') },
  { t: 'note', label: T('Careful', 'Осторожно'), text: T('The largest side is opposite the largest angle. If cos C < 0, the angle C is obtuse. A + B + C = π, so sin(A + B) = sin C.', 'Наибольшая сторона лежит напротив наибольшего угла. Если cos C < 0, угол C тупой. A + B + C = π, поэтому sin(A + B) = sin C.') }
  ]}
];

const EXAM = [
  { part: 1, q: T('2π/3 radians in degrees is', '2π/3 радиан в градусах —'), o: ['60°', '120°', '135°', '150°'], a: 1 },
  { part: 2, q: T('sin α = 4/5 and π/2 < α < π. Then tan α =', 'sin α = 4/5 и π/2 < α < π. Тогда tan α ='), o: ['4/3', '3/4', '−4/3', '−3/4'], a: 2 },
  { part: 2, q: T('tan α = 3. Then (sin α + cos α)/(sin α − cos α) =', 'tan α = 3. Тогда (sin α + cos α)/(sin α − cos α) ='), o: ['2', '−2', '1/2', '4'], a: 0 },
  { part: 2, q: T('sin α = 1/3. Then cos(π/2 + α) =', 'sin α = 1/3. Тогда cos(π/2 + α) ='), o: ['1/3', '2√2/3', '−2√2/3', '−1/3'], a: 3 },
  { part: 3, q: 'sin 15° · cos 15° =', o: ['1/2', '1/4', '√3/4', '√3/2'], a: 1 },
  { part: 3, q: 'cos²(π/8) − sin²(π/8) =', o: ['√2/2', '1/2', '−√2/2', '1'], a: 0 },
  { part: 3, q: T('The largest value of y = sin x + √3 cos x is', 'Наибольшее значение y = sin x + √3 cos x равно'), o: ['1 + √3', '√3', '4', '2'], a: 3 },
  { part: 3, q: T('The minimum positive period of y = sin x cos x is', 'Наименьший положительный период y = sin x cos x равен'), o: ['π/2', '2π', 'π', '4π'], a: 2 },
  { part: 4, q: T('To get the graph of y = sin(2x + π/3) from the graph of y = sin 2x, move it', 'Чтобы получить график y = sin(2x + π/3) из графика y = sin 2x, его нужно сдвинуть'), o: [T('left by π/3', 'влево на π/3'), T('left by π/6', 'влево на π/6'), T('right by π/6', 'вправо на π/6'), T('right by π/3', 'вправо на π/3')], a: 1 },
  { part: 5, q: T('In △ABC, a = 3, b = 5, c = 7. Then C =', 'В △ABC a = 3, b = 5, c = 7. Тогда C ='), o: ['π/3', 'π/6', '5π/6', '2π/3'], a: 3 },
  { part: 5, q: T('In △ABC, A = 30°, B = 45°, a = 1. Then b =', 'В △ABC A = 30°, B = 45°, a = 1. Тогда b ='), o: ['√2', '√2/2', '√3', '2'], a: 0 },
  { part: 5, q: T('In △ABC, a = 2, b = 3, C = 60°. The area is', 'В △ABC a = 2, b = 3, C = 60°. Площадь равна'), o: ['3', '3√3', '3√3/2', '3/2'], a: 2 }
];

const TOPICS = [
  [T('Radians, signs by quadrant 弧度制 / 象限', 'Радианы, знаки по четвертям 弧度制 / 象限'), 1, '"Convert 120° to radians"; "the terminal side of α is in quadrant …"'],
  [T('sin² + cos² = 1, reduction formulas 同角关系 / 诱导公式', 'sin² + cos² = 1, формулы приведения 同角关系 / 诱导公式'), 2, '"Given sin α = 3/5, α ∈ (π/2, π), then tan α ="'],
  [T('Sum and double angle 两角和差 / 二倍角', 'Сумма и двойной угол 两角和差 / 二倍角'), 3, '"sin 15° cos 15° ="; "the maximum value of the function … is"'],
  [T('Graph shifts 图象平移', 'Сдвиги графиков 图象平移'), 4, '"To obtain the graph of …, shift the graph of … to the left by"'],
  [T('Laws of sines and cosines 正弦定理 / 余弦定理', 'Теоремы синусов и косинусов 正弦定理 / 余弦定理'), 5, '"In △ABC, a = …, b = …, c = …, then C ="']
];
