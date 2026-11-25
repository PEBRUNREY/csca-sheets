/* Sheet: Derivatives (CSCA Mathematics): rate of change, formulas, tangent lines, monotonicity, extrema. */
const SHEET = {
  key: 'csca-math-derivatives-v1',
  title: T('Investigation sheet: Derivatives', 'Исследовательский лист: производные'),
  sub: T('CSCA Mathematics · find each rule yourself, then read it', 'CSCA, математика · найдите каждое правило сами, потом прочитайте его'),
  stats: T('The syllabus asks for the definition of the derivative, its geometric meaning (the slope of a tangent) and simple uses: tangent lines, increasing and decreasing intervals, and largest and smallest values. Typical questions:',
           'Программа требует определение производной, её геометрический смысл (угловой коэффициент касательной) и простые применения: касательные, промежутки возрастания и убывания, наибольшие и наименьшие значения. Типичные вопросы:'),
  symbols: T('Symbols: f′(x) is the derivative of f, e ≈ 2.718, ln x = logₑ x. "h → 0" means h gets closer and closer to 0. The slope k of a line y = kx + b tells how much y changes when x grows by 1.',
             'Обозначения: f′(x) — производная f, e ≈ 2,718, ln x = logₑ x. «h → 0» значит, что h всё ближе к 0. Угловой коэффициент k прямой y = kx + b показывает, на сколько меняется y, когда x увеличивается на 1.')
};

SHEET.figs = ({ h, plot }) => ({
  tangent() {
    const s = plot({ label: 'y = x² with a secant line through (1, 1) and (2, 4) and the tangent line at (1, 1)', w: 420, h: 300, x0: -1.2, x1: 2.8, y0: -1.6, y1: 6,
      xt: [{ v: 1, l: '1' }, { v: 2, l: '2' }], yt: [{ v: 1, l: '1' }, { v: 4, l: '4' }],
      curves: [{ f: x => x * x, cls: 'c1' }, { f: x => 3 * x - 2, cls: 'c2', dash: true }, { f: x => 2 * x - 1, cls: 'c3' }],
      pts: [{ x: 1, y: 1, l: '(1, 1)', dx: 8, dy: 14 }, { x: 2, y: 4, l: '(2, 4)', anc: 'end', dx: -8 }],
      tx: [{ x: -1.1, y: 2.2, t: 'y = x²', cls: 'c1t' }] });
    return h('div', { class: 'figone', html: s });
  },
  cubic() {
    const s = plot({ label: 'y = x³ − 3x', w: 420, h: 280, x0: -2.4, x1: 2.4, y0: -3.2, y1: 3.2,
      xt: [-2, -1, 1, 2].map(v => ({ v, l: v < 0 ? '−' + (-v) : String(v) })), yt: [{ v: 2, l: '2' }, { v: -2, l: '−2' }],
      curves: [{ f: x => x * x * x - 3 * x, cls: 'c1' }], segs: [[-1, 2, 1, 2]], pts: [{ x: -1, y: 2, l: '(−1, 2)', anc: 'end', dx: -8 }, { x: 1, y: -2, l: '(1, −2)', dx: 8, dy: 16 }],
      tx: [{ x: 1.3, y: 2.6, t: 'y = x³ − 3x', cls: 'c1t' }] });
    return h('div', { class: 'figone', html: s });
  }
});

const SG = [{ k: 'p', en: '+', ru: '+' }, { k: '0', en: '0', ru: '0' }, { k: 'm', en: '−', ru: '−' }];
const UD = [{ k: 'up', en: 'increasing ↗', ru: 'возрастает ↗' }, { k: 'down', en: 'decreasing ↘', ru: 'убывает ↘' }];
const EXT = [{ k: 'max', en: 'maximum', ru: 'максимум' }, { k: 'min', en: 'minimum', ru: 'минимум' }, { k: 'none', en: 'not an extremum', ru: 'не экстремум' }];

const PARTS = [
/* ================= PART 1 ================= */
{ id: 1, title: T('From average speed to the derivative', 'От средней скорости к производной'),
  intro: T('The average rate of change of f between x₀ and x₀ + h is (f(x₀ + h) − f(x₀)) / h. Watch what happens when h becomes very small.',
           'Средняя скорость изменения f между x₀ и x₀ + h равна (f(x₀ + h) − f(x₀)) / h. Посмотрите, что происходит, когда h становится очень маленьким.'),
  items: [
  { t: 'task', id: '1.1', title: T('Shrink h', 'Уменьшайте h'),
    text: T('f(x) = x², x₀ = 1. In the figure the dashed line is a secant through (1, f(1)) and (1 + h, f(1 + h)) with h = 1; the solid green line is the tangent at (1, 1). Fill in the table.', 'f(x) = x², x₀ = 1. На рисунке пунктир — секущая через (1, f(1)) и (1 + h, f(1 + h)) при h = 1; сплошная зелёная прямая — касательная в точке (1, 1). Заполните таблицу.'),
    parts: [{ k: 'fig', id: 'tangent' },
      { k: 'table', head: ['h', '1', '0.1', '0.01', '0.001'], rows: [
        ['f(1 + h)', { a: '4' }, { a: '1.21' }, { a: '1.0201' }, { a: '1.002001' }],
        ['(f(1 + h) − f(1)) / h', { a: '3' }, { a: '2.1' }, { a: '2.01' }, { a: '2.001' }]] },
      { k: 'blanks', lines: [[T('As h → 0 the rate gets closer to ', 'При h → 0 скорость приближается к '), { a: '2', w: 3 }]] }],
    hint: T('1.1² = 1.21. Then (1.21 − 1) / 0.1 = 0.21 / 0.1.', '1,1² = 1,21. Тогда (1,21 − 1) / 0,1 = 0,21 / 0,1.') },
  { t: 'task', id: '1.2', title: T('Another point', 'Другая точка'),
    text: T('Same function f(x) = x², now at x₀ = 3.', 'Та же функция f(x) = x², теперь при x₀ = 3.'),
    parts: [{ k: 'table', head: ['h', '0.1', '0.01'], rows: [['(f(3 + h) − f(3)) / h', { a: '6.1' }, { a: '6.01' }]] },
      { k: 'blanks', lines: [[T('Limit at x₀ = 3: ', 'Предел при x₀ = 3: '), { a: '6', w: 3 }, T('.   Guess the limit at any x: ', '.   Угадайте предел при любом x: '), { a: '2x', sel: ['x', '2x', 'x²', '2'] }]] }],
    hint: T('3.1² = 9.61.', '3,1² = 9,61.') },
  { t: 'notice', id: 'n1', rule: T('The derivative 导数 is f′(x₀) = the limit of (f(x₀ + h) − f(x₀)) / h as h → 0. It is the instantaneous rate of change, and it is the slope of the tangent line to the graph at (x₀, f(x₀)). For f(x) = x², f′(x) = 2x.', 'Производная 导数 f′(x₀) — это предел (f(x₀ + h) − f(x₀)) / h при h → 0. Это мгновенная скорость изменения и угловой коэффициент касательной к графику в точке (x₀, f(x₀)). Для f(x) = x² f′(x) = 2x.') }
  ]},

/* ================= PART 2 ================= */
{ id: 2, title: T('Derivative formulas', 'Формулы производных'),
  intro: T('Nobody computes limits on the exam. You use a short table of formulas and four rules. First check the pattern for powers.', 'На экзамене пределы никто не вычисляет. Используют короткую таблицу формул и четыре правила. Сначала проверьте закономерность для степеней.'),
  items: [
  { t: 'task', id: '2.1', title: T('Powers', 'Степени'),
    text: T('Use h = 0.001 and round to a whole number. (A calculator helps here; on the exam you will use the formula.)', 'Возьмите h = 0,001 и округлите до целого. (Здесь поможет калькулятор; на экзамене вы будете пользоваться формулой.)'),
    parts: [{ k: 'table', head: ['f(x)', T('f′(1) ≈', 'f′(1) ≈'), T('f′(2) ≈', 'f′(2) ≈'), T('guess f′(x)', 'догадка f′(x)')], rows: [
      ['x²', '2', '4', '2x'],
      ['x³', { a: '3' }, { a: '12' }, { a: '3x²', sel: ['3x', '3x²', 'x²', '3x³'] }],
      ['x⁴', { a: '4' }, { a: '32' }, { a: '4x³', sel: ['4x', '4x³', 'x³', '4x⁴'] }]] }],
    hint: T('(1.001³ − 1)/0.001 = 3.003001. (2.001³ − 8)/0.001 ≈ 12.006.', '(1,001³ − 1)/0,001 = 3,003001. (2,001³ − 8)/0,001 ≈ 12,006.') },
  { t: 'notice', id: 'n2', rule: T('(xⁿ)′ = n·xⁿ⁻¹ for every real n. So (√x)′ = (x^½)′ = 1/(2√x) and (1/x)′ = (x⁻¹)′ = −1/x².', '(xⁿ)′ = n·xⁿ⁻¹ при любом действительном n. Поэтому (√x)′ = (x^½)′ = 1/(2√x) и (1/x)′ = (x⁻¹)′ = −1/x².') },
  { t: 'rule', label: T('Table of derivatives', 'Таблица производных'), text: T('C′ = 0 (C a constant).  (sin x)′ = cos x.  (cos x)′ = −sin x.  (eˣ)′ = eˣ.  (aˣ)′ = aˣ·ln a.  (ln x)′ = 1/x.  (logₐ x)′ = 1/(x ln a).', 'C′ = 0 (C — постоянная).  (sin x)′ = cos x.  (cos x)′ = −sin x.  (eˣ)′ = eˣ.  (aˣ)′ = aˣ·ln a.  (ln x)′ = 1/x.  (logₐ x)′ = 1/(x ln a).') },
  { t: 'rule', label: T('Four rules', 'Четыре правила'), text: T('(f ± g)′ = f′ ± g′.  (Cf)′ = C·f′.  (fg)′ = f′g + fg′.  (f/g)′ = (f′g − fg′)/g².  Inside a bracket: (f(ax + b))′ = a·f′(ax + b), for example (sin 2x)′ = 2 cos 2x.', '(f ± g)′ = f′ ± g′.  (Cf)′ = C·f′.  (fg)′ = f′g + fg′.  (f/g)′ = (f′g − fg′)/g².  Внутри скобки: (f(ax + b))′ = a·f′(ax + b), например (sin 2x)′ = 2 cos 2x.') },
  { t: 'task', id: '2.2', title: T('Use the table', 'Пользуйтесь таблицей'),
    text: T('Find f′(x) in your head or on paper, then put in the number.', 'Найдите f′(x) в уме или на бумаге, затем подставьте число.'),
    parts: [{ k: 'table', head: ['f(x)', T('value', 'значение'), T('answer', 'ответ')], rows: [
      ['x³ − 3x', 'f′(2)', { a: '9' }],
      ['√x', 'f′(4)', { a: '1/4' }],
      ['1/x', 'f′(2)', { a: '-1/4' }],
      ['x·eˣ', 'f′(0)', { a: '1' }],
      ['x·ln x', 'f′(1)', { a: '1' }],
      ['sin 2x', 'f′(0)', { a: '2' }],
      ['ln(2x + 1)', 'f′(0)', { a: '2' }],
      ['cos x', 'f′(π/2)', { a: '-1' }]] }],
    hint: T('x·eˣ: product rule gives eˣ + x·eˣ. x·ln x gives ln x + 1. ln(2x + 1) gives 2/(2x + 1).', 'x·eˣ: правило произведения даёт eˣ + x·eˣ. x·ln x даёт ln x + 1. ln(2x + 1) даёт 2/(2x + 1).') }
  ]},

/* ================= PART 3 ================= */
{ id: 3, title: T('Tangent lines', 'Касательные'),
  intro: T('The tangent line 切线 at (x₀, f(x₀)) has slope k = f′(x₀). With a point and a slope you can write the line: y − f(x₀) = f′(x₀)(x − x₀).', 'Касательная 切线 в точке (x₀, f(x₀)) имеет угловой коэффициент k = f′(x₀). Зная точку и угловой коэффициент, можно записать прямую: y − f(x₀) = f′(x₀)(x − x₀).'),
  items: [
  { t: 'task', id: '3.1', title: T('Tangent to y = x² at (1, 1)', 'Касательная к y = x² в точке (1, 1)'),
    text: T('Look at the green line in the figure of Part 1.', 'Посмотрите на зелёную прямую на рисунке в части 1.'),
    parts: [{ k: 'blanks', lines: [
      [T('Slope k = f′(1) = ', 'Угловой коэффициент k = f′(1) = '), { a: '2', w: 3 }],
      ['y − 1 = 2(x − 1), ', T('so y = 2x + ', 'поэтому y = 2x + '), '(', { a: '-1', w: 3 }, ')'],
      [T('Slope of the secant through (1, 1) and (2, 4): ', 'Угловой коэффициент секущей через (1, 1) и (2, 4): '), { a: '3', w: 3 }]] }],
    hint: T('Secant slope = (4 − 1)/(2 − 1).', 'Угловой коэффициент секущей = (4 − 1)/(2 − 1).') },
  { t: 'task', id: '3.2', title: T('Try it', 'Попробуйте сами'),
    text: T('Write each tangent line as y = kx + b.', 'Запишите каждую касательную в виде y = kx + b.'),
    parts: [{ k: 'table', head: [T('Curve and point', 'Кривая и точка'), 'k', 'b'], rows: [
      [T('y = eˣ at x = 0', 'y = eˣ при x = 0'), { a: '1' }, { a: '1' }],
      [T('y = ln x at x = 1', 'y = ln x при x = 1'), { a: '1' }, { a: '-1' }],
      [T('y = x³ − 2x at x = 1', 'y = x³ − 2x при x = 1'), { a: '1' }, { a: '-2' }],
      [T('y = x² + 1 at x = 1', 'y = x² + 1 при x = 1'), { a: '2' }, { a: '0' }]] }],
    hint: T('First find the point: e⁰ = 1, ln 1 = 0, 1 − 2 = −1. Then k = f′(x₀) and b = y₀ − k·x₀.', 'Сначала найдите точку: e⁰ = 1, ln 1 = 0, 1 − 2 = −1. Затем k = f′(x₀) и b = y₀ − k·x₀.') }
  ]},

/* ================= PART 4 ================= */
{ id: 4, title: T('Increasing, decreasing, maximum and minimum', 'Возрастание, убывание, максимум и минимум'),
  intro: T('The sign of f′ tells you the direction of the graph. This is how the exam finds monotonic intervals 单调区间 and extreme values 极值.', 'Знак f′ показывает направление графика. Так на экзамене находят промежутки монотонности 单调区间 и экстремумы 极值.'),
  items: [
  { t: 'task', id: '4.1', title: T('Compare f and f′', 'Сравните f и f′'),
    text: T('f(x) = x³ − 3x, so f′(x) = 3x² − 3. Fill in the table.', 'f(x) = x³ − 3x, поэтому f′(x) = 3x² − 3. Заполните таблицу.'),
    parts: [{ k: 'fig', id: 'cubic' },
      { k: 'table', head: ['x', '−2', '−1', '0', '1', '2'], rows: [
        ['f(x)', { a: '-2' }, { a: '2' }, { a: '0' }, { a: '-2' }, { a: '2' }],
        ['f′(x)', { a: '9' }, { a: '0' }, { a: '-3' }, { a: '0' }, { a: '9' }]] },
      { k: 'table', head: [T('interval', 'промежуток'), T('sign of f′', 'знак f′'), T('f is', 'f')], rows: [
        ['(−∞, −1)', { a: 'p', sel: SG }, { a: 'up', sel: UD }],
        ['(−1, 1)', { a: 'm', sel: SG }, { a: 'down', sel: UD }],
        ['(1, +∞)', { a: 'p', sel: SG }, { a: 'up', sel: UD }]] }],
    hint: T('f′(−2) = 3·4 − 3. Use the values of f′ inside each interval.', 'f′(−2) = 3·4 − 3. Используйте значения f′ внутри каждого промежутка.') },
  { t: 'notice', id: 'n4', rule: T('If f′(x) > 0 on an interval, f is increasing there; if f′(x) < 0, f is decreasing. Where f′ changes from + to −, f has a local maximum 极大值; from − to + a local minimum 极小值.', 'Если f′(x) > 0 на промежутке, f там возрастает; если f′(x) < 0 — убывает. Где f′ меняет знак с + на −, у f локальный максимум 极大值; с − на + — локальный минимум 极小值.') },
  { t: 'task', id: '4.2', title: T('Name the points', 'Назовите точки'),
    text: T('Use your table for f(x) = x³ − 3x, and also look at g(x) = x³ at x = 0 (g′(x) = 3x² is never negative).', 'Используйте таблицу для f(x) = x³ − 3x, а также посмотрите на g(x) = x³ при x = 0 (g′(x) = 3x² никогда не бывает отрицательной).'),
    parts: [{ k: 'table', head: [T('point', 'точка'), T('type', 'тип'), T('value', 'значение')], rows: [
      [T('f at x = −1', 'f при x = −1'), { a: 'max', sel: EXT }, { a: '2' }],
      [T('f at x = 1', 'f при x = 1'), { a: 'min', sel: EXT }, { a: '-2' }],
      [T('g at x = 0', 'g при x = 0'), { a: 'none', sel: EXT }, { a: '0' }]] }],
    hint: T('g′ is + on both sides of 0, so g keeps increasing.', 'g′ положительна по обе стороны от 0, поэтому g продолжает возрастать.') },
  { t: 'note', label: T('Careful', 'Осторожно'), text: T('f′(x₀) = 0 alone does not make an extremum: the sign of f′ must change. Always find the domain first (for ln x, x > 0).', 'Одно лишь f′(x₀) = 0 ещё не даёт экстремума: знак f′ должен меняться. Всегда сначала найдите область определения (для ln x — x > 0).') },
  { t: 'task', id: '4.3', title: T('Largest and smallest on a closed interval', 'Наибольшее и наименьшее на отрезке'),
    text: T('f(x) = x³ − 3x on [0, 3]. Compare the values at the ends and at the points where f′ = 0 inside the interval.', 'f(x) = x³ − 3x на [0, 3]. Сравните значения на концах и в точках внутри отрезка, где f′ = 0.'),
    parts: [{ k: 'table', head: ['x', '0', '1', '3'], rows: [['f(x)', { a: '0' }, { a: '-2' }, { a: '18' }]] },
      { k: 'blanks', lines: [[T('Largest value ', 'Наибольшее значение '), { a: '18', w: 3 }, T('   smallest value ', '   наименьшее значение '), { a: '-2', w: 3 }]] }],
    hint: T('Only x = 1 lies inside [0, 3]; x = −1 does not.', 'Внутри [0, 3] лежит только x = 1; x = −1 — нет.') },
  { t: 'task', id: '4.4', title: T('Try it', 'Попробуйте сами'),
    text: T('Use f′.', 'Используйте f′.'),
    parts: [
      { k: 'blanks', lines: [
        [T('(a) f(x) = x³ − 3x². f′(x) = 3x(x − 2) < 0 on the interval ( ', '(a) f(x) = x³ − 3x². f′(x) = 3x(x − 2) < 0 на промежутке ( '), { a: '0', w: 2 }, ' , ', { a: '2', w: 2 }, ' )'],
        [T('(b) f(x) = x³ + ax has an extreme value at x = 1. Then a = ', '(b) f(x) = x³ + ax имеет экстремум при x = 1. Тогда a = '), { a: '-3', w: 3 }]] },
      { k: 'mc', q: T('(c) f(x) = x² − 2 ln x is increasing on', '(c) f(x) = x² − 2 ln x возрастает на'), opts: ['(0, 1)', '(1, +∞)', '(−1, 1)', '(0, +∞)'], a: 1 }],
    hint: T('(b) f′(1) = 0. (c) Domain x > 0 and f′(x) = 2x − 2/x = 2(x² − 1)/x.', '(b) f′(1) = 0. (c) Область определения x > 0 и f′(x) = 2x − 2/x = 2(x² − 1)/x.') }
  ]}
];

const EXAM = [
  { part: 2, q: T('f(x) = x³. Then f′(2) =', 'f(x) = x³. Тогда f′(2) ='), o: ['8', '6', '12', '4'], a: 2 },
  { part: 2, q: T('The derivative of y = sin x + eˣ is', 'Производная функции y = sin x + eˣ —'), o: ['cos x + eˣ', '−cos x + eˣ', 'cos x + x·eˣ⁻¹', '−cos x + eˣ⁻¹'], a: 0 },
  { part: 2, q: T('f(x) = x ln x. Then f′(1) =', 'f(x) = x ln x. Тогда f′(1) ='), o: ['0', 'e', '2', '1'], a: 3 },
  { part: 3, q: T('The tangent line to y = x² + 1 at the point (1, 2) is', 'Касательная к y = x² + 1 в точке (1, 2) —'), o: ['y = 2x + 1', 'y = 2x', 'y = x + 1', 'y = 2x − 1'], a: 1 },
  { part: 3, q: T('The slope of the tangent line to y = eˣ at x = 0 is', 'Угловой коэффициент касательной к y = eˣ при x = 0 равен'), o: ['0', 'e', '1', '−1'], a: 2 },
  { part: 4, q: T('The increasing interval of f(x) = x² − 2 ln x is', 'Промежуток возрастания f(x) = x² − 2 ln x —'), o: ['(0, 1)', '(−1, 1)', '(0, +∞)', '(1, +∞)'], a: 3 },
  { part: 4, q: T('The local maximum value of f(x) = x³ − 3x is', 'Локальный максимум f(x) = x³ − 3x равен'), o: ['2', '−2', '0', '1'], a: 0 },
  { part: 4, q: T('The decreasing interval of f(x) = x³ − 3x² is', 'Промежуток убывания f(x) = x³ − 3x² —'), o: ['(−∞, 0)', '(0, 2)', '(2, +∞)', '(0, 3)'], a: 1 },
  { part: 4, q: T('f(x) = x³ + ax² has an extreme value at x = 2. Then a =', 'f(x) = x³ + ax² имеет экстремум при x = 2. Тогда a ='), o: ['3', '−6', '−3', '6'], a: 2 },
  { part: 1, q: T('f(x) = 3x². As h → 0, (f(1 + h) − f(1)) / h approaches', 'f(x) = 3x². При h → 0 (f(1 + h) − f(1)) / h стремится к'), o: ['3', '1', '0', '6'], a: 3 },
  { part: 2, q: T('The derivative of y = cos 2x is', 'Производная функции y = cos 2x —'), o: ['−2 sin 2x', '2 sin 2x', '−sin 2x', 'sin 2x'], a: 0 },
  { part: 4, q: T('The smallest value of f(x) = x³ − 3x on [0, 3] is', 'Наименьшее значение f(x) = x³ − 3x на [0, 3] равно'), o: ['0', '−2', '2', '−18'], a: 1 }
];

const TOPICS = [
  [T('Definition, rate of change 导数的概念', 'Определение, скорость изменения 导数的概念'), 1, '"lim (f(1 + Δx) − f(1))/Δx ="'],
  [T('Derivative formulas and rules 导数公式 / 运算法则', 'Формулы и правила 导数公式 / 运算法则'), 2, '"The derivative of the function y = … is"'],
  [T('Tangent lines 切线方程', 'Касательные 切线方程'), 3, '"The equation of the tangent line to the curve … at the point … is"'],
  [T('Monotonicity and extreme values 单调性 / 极值 / 最值', 'Монотонность и экстремумы 单调性 / 极值 / 最值'), 4, '"The increasing interval of f(x) is"; "the maximum value of f(x) on [a, b] is"']
];
