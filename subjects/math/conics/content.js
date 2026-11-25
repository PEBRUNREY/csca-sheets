/* Sheet: Conic sections (CSCA Mathematics): ellipse, hyperbola, parabola. */
const SHEET = {
  key: 'csca-math-conics-v1',
  title: T('Investigation sheet: Ellipse, hyperbola, parabola', 'Исследовательский лист: эллипс, гипербола, парабола'),
  sub: T('CSCA Mathematics · find each rule yourself, then read it', 'CSCA, математика · найдите каждое правило сами, потом прочитайте его'),
  stats: T('Each conic section 圆锥曲线 is defined by distances. Once you know a, b, c for an equation, most exam questions are one line: foci, eccentricity, asymptotes, focus and directrix. Typical questions:',
           'Каждое коническое сечение 圆锥曲线 определяется через расстояния. Если вы знаете a, b, c для уравнения, большинство экзаменационных вопросов решаются в одну строку: фокусы, эксцентриситет, асимптоты, фокус и директриса. Типичные вопросы:'),
  symbols: T('Symbols: F₁, F₂ are the foci 焦点, a, b, c are lengths with a, b, c > 0, e is the eccentricity 离心率. ∣PF₁∣ is the distance from P to F₁. Type √5 as sqrt(5), fractions like 9/5.',
             'Обозначения: F₁, F₂ — фокусы 焦点, a, b, c — длины, a, b, c > 0, e — эксцентриситет 离心率. ∣PF₁∣ — расстояние от P до F₁. √5 вводите как sqrt(5), дроби как 9/5.')
};

SHEET.figs = ({ h, plot }) => ({
  ellipse() {
    const up = x => 3 * Math.sqrt(Math.max(0, 1 - x * x / 25)), dn = x => -up(x);
    const s = plot({ label: 'Ellipse x²/25 + y²/9 = 1 with foci (−4, 0) and (4, 0) and a point P(4, 9/5)', w: 420, h: 260, x0: -6, x1: 6, y0: -3.8, y1: 3.8,
      xt: [{ v: -5, l: '−5' }, { v: 5, l: '5' }], yt: [{ v: 3, l: '3' }, { v: -3, l: '−3' }],
      curves: [{ f: up, cls: 'c1', x0: -5, x1: 5 }, { f: dn, cls: 'c1', x0: -5, x1: 5 }],
      segs: [[-4, 0, 4, 1.8], [4, 0, 4, 1.8]],
      pts: [{ x: -4, y: 0, l: 'F₁(−4, 0)', dy: -9, dx: 4 }, { x: 4, y: 0, l: 'F₂(4, 0)', dy: 18, anc: 'end', dx: 4 }, { x: 4, y: 1.8, l: 'P', dx: 6, dy: -6 }],
      tx: [{ x: -5.9, y: 3.4, t: 'x²/25 + y²/9 = 1', cls: 'c1t' }] });
    return h('div', { class: 'figone', html: s });
  },
  hyperbola() {
    const r = x => 4 * Math.sqrt(Math.max(0, x * x / 9 - 1));
    const s = plot({ label: 'Hyperbola x²/9 − y²/16 = 1 with foci (−5, 0) and (5, 0) and asymptotes y = ±4x/3', w: 420, h: 300, x0: -8, x1: 8, y0: -7, y1: 7,
      xt: [{ v: -3, l: '−3' }, { v: 3, l: '3' }], yt: [{ v: 4, l: '4' }, { v: -4, l: '−4' }],
      curves: [{ f: r, cls: 'c2', x0: 3, x1: 8 }, { f: x => -r(x), cls: 'c2', x0: 3, x1: 8 }, { f: r, cls: 'c2', x0: -8, x1: -3 }, { f: x => -r(x), cls: 'c2', x0: -8, x1: -3 },
        { f: x => 4 * x / 3, cls: 'c3', dash: true }, { f: x => -4 * x / 3, cls: 'c3', dash: true }],
      pts: [{ x: -5, y: 0, l: 'F₁(−5, 0)', dy: -9, anc: 'middle', dx: 0 }, { x: 5, y: 0, l: 'F₂(5, 0)', dy: -9, anc: 'middle', dx: 0 }, { x: 3, y: 0 }, { x: -3, y: 0 }],
      tx: [{ x: 7.9, y: 6.2, t: 'y = 4x/3', cls: 'c3t', anc: 'end' }, { x: -7.9, y: -2.6, t: 'x²/9 − y²/16 = 1', cls: 'c2t' }] });
    return h('div', { class: 'figone', html: s });
  },
  parabola() {
    const s = plot({ label: 'Parabola y² = 4x with focus (1, 0) and directrix x = −1', w: 380, h: 300, x0: -2.2, x1: 6, y0: -5.2, y1: 5.2,
      xt: [{ v: -1, l: '−1' }, { v: 1, l: '1' }, { v: 4, l: '4' }], yt: [{ v: 2, l: '2' }, { v: 4, l: '4' }],
      vlines: [-1], curves: [{ f: x => 2 * Math.sqrt(x), cls: 'c1', x0: 0, x1: 6 }, { f: x => -2 * Math.sqrt(x), cls: 'c1', x0: 0, x1: 6 }],
      segs: [[1, 0, 4, 4], [-1, 4, 4, 4]],
      pts: [{ x: 1, y: 0, l: 'F', dy: 16 }, { x: 4, y: 4, l: 'P(4, 4)', dx: 6, dy: 16 }],
      tx: [{ x: -1.1, y: -4.6, t: 'x = −1', anc: 'end' }, { x: 5.9, y: -3.6, t: 'y² = 4x', cls: 'c1t', anc: 'end' }] });
    return h('div', { class: 'figone', html: s });
  }
});

const AX = [{ k: 'x', en: 'the x-axis', ru: 'оси x' }, { k: 'y', en: 'the y-axis', ru: 'оси y' }];

const PARTS = [
/* ================= PART 1 ================= */
{ id: 1, title: T('The ellipse', 'Эллипс'),
  intro: T('Measure the distances from points of an ellipse 椭圆 to two fixed points F₁(−4, 0) and F₂(4, 0). Something stays the same.', 'Измерьте расстояния от точек эллипса 椭圆 до двух фиксированных точек F₁(−4, 0) и F₂(4, 0). Кое-что остаётся неизменным.'),
  items: [
  { t: 'task', id: '1.1', title: T('Two distances', 'Два расстояния'),
    text: T('All four points lie on x²/25 + y²/9 = 1. Fill in the table.', 'Все четыре точки лежат на x²/25 + y²/9 = 1. Заполните таблицу.'),
    parts: [{ k: 'fig', id: 'ellipse' },
      { k: 'table', head: ['P', '∣PF₁∣', '∣PF₂∣', '∣PF₁∣ + ∣PF₂∣'], rows: [
        ['(5, 0)', { a: '9' }, { a: '1' }, { a: '10' }],
        ['(0, 3)', { a: '5' }, { a: '5' }, { a: '10' }],
        ['(4, 9/5)', { a: '41/5' }, { a: '9/5' }, { a: '10' }],
        ['(−5, 0)', { a: '1' }, { a: '9' }, { a: '10' }]] }],
    hint: T('(0, 3) to (4, 0): √(16 + 9). (4, 9/5) to (−4, 0): √(64 + 81/25) = √(1681/25).', '(0, 3) до (4, 0): √(16 + 9). (4, 9/5) до (−4, 0): √(64 + 81/25) = √(1681/25).') },
  { t: 'notice', id: 'n1', rule: T('An ellipse is the set of points P with ∣PF₁∣ + ∣PF₂∣ = 2a (a constant bigger than ∣F₁F₂∣ = 2c). Equation x²/a² + y²/b² = 1 (a > b > 0), foci (±c, 0), with a² = b² + c². Here a = 5, b = 3, c = 4. If the bigger number is under y², the foci are on the y-axis. Eccentricity e = c/a, and 0 < e < 1.', 'Эллипс — множество точек P, для которых ∣PF₁∣ + ∣PF₂∣ = 2a (постоянная больше ∣F₁F₂∣ = 2c). Уравнение x²/a² + y²/b² = 1 (a > b > 0), фокусы (±c, 0), причём a² = b² + c². Здесь a = 5, b = 3, c = 4. Если большее число стоит под y², фокусы лежат на оси y. Эксцентриситет e = c/a, и 0 < e < 1.') },
  { t: 'task', id: '1.2', title: T('Read a, b, c', 'Найдите a, b, c'),
    text: T('a² is always the bigger denominator.', 'a² — это всегда больший знаменатель.'),
    parts: [{ k: 'table', head: [T('ellipse', 'эллипс'), 'a', 'b', 'c', T('foci on', 'фокусы на'), 'e'], rows: [
      ['x²/4 + y²/3 = 1', { a: '2' }, { a: '√3' }, { a: '1' }, { a: 'x', sel: AX }, { a: '1/2' }],
      ['x²/16 + y²/25 = 1', { a: '5' }, { a: '4' }, { a: '3' }, { a: 'y', sel: AX }, { a: '3/5' }],
      ['x²/9 + y²/5 = 1', { a: '3' }, { a: '√5' }, { a: '2' }, { a: 'x', sel: AX }, { a: '2/3' }]] }],
    hint: T('c = √(a² − b²). For the second row 25 > 16, so a² = 25 is under y².', 'c = √(a² − b²). Во второй строке 25 > 16, поэтому a² = 25 стоит под y².') },
  { t: 'task', id: '1.3', title: T('Use the definition', 'Используйте определение'),
    text: T('Ellipse x²/25 + y²/9 = 1, foci F₁ and F₂.', 'Эллипс x²/25 + y²/9 = 1, фокусы F₁ и F₂.'),
    parts: [{ k: 'blanks', lines: [
      [T('(a) P is on the ellipse and ∣PF₁∣ = 3. Then ∣PF₂∣ = ', '(a) P лежит на эллипсе и ∣PF₁∣ = 3. Тогда ∣PF₂∣ = '), { a: '7', w: 3 }],
      [T('(b) A line through F₁ meets the ellipse at A and B. The perimeter of △ABF₂ is ', '(b) Прямая через F₁ пересекает эллипс в точках A и B. Периметр △ABF₂ равен '), { a: '20', w: 3 }],
      [T('(c) The major axis 长轴 has length 2a = ', '(c) Большая ось 长轴 имеет длину 2a = '), { a: '10', w: 3 }, T(', the minor axis 短轴 2b = ', ', малая ось 短轴 2b = '), { a: '6', w: 3 }]] }],
    hint: T('(b) The perimeter is (∣AF₁∣ + ∣AF₂∣) + (∣BF₁∣ + ∣BF₂∣) = 2a + 2a.', '(b) Периметр равен (∣AF₁∣ + ∣AF₂∣) + (∣BF₁∣ + ∣BF₂∣) = 2a + 2a.') }
  ]},

/* ================= PART 2 ================= */
{ id: 2, title: T('The hyperbola', 'Гипербола'),
  intro: T('Now the foci are F₁(−5, 0) and F₂(5, 0), and the curve is the hyperbola 双曲线 x²/9 − y²/16 = 1. Try the same measurements.', 'Теперь фокусы F₁(−5, 0) и F₂(5, 0), а кривая — гипербола 双曲线 x²/9 − y²/16 = 1. Проведите те же измерения.'),
  items: [
  { t: 'task', id: '2.1', title: T('Sum or difference?', 'Сумма или разность?'),
    text: T('Fill in the distances.', 'Заполните расстояния.'),
    parts: [{ k: 'fig', id: 'hyperbola' },
      { k: 'table', head: ['P', '∣PF₁∣', '∣PF₂∣', '∣PF₁∣ + ∣PF₂∣', '∣PF₁∣ − ∣PF₂∣'], rows: [
        ['(3, 0)', { a: '8' }, { a: '2' }, { a: '10' }, { a: '6' }],
        ['(5, 16/3)', { a: '34/3' }, { a: '16/3' }, { a: '50/3' }, { a: '6' }],
        ['(−3, 0)', { a: '2' }, { a: '8' }, { a: '10' }, { a: '-6' }]] },
      { k: 'blanks', lines: [[T('What stays the same? ', 'Что остаётся неизменным? '), { a: 'd', sel: [{ k: 's', en: 'the sum', ru: 'сумма' }, { k: 'd', en: 'the difference, without its sign', ru: 'разность, без учёта знака' }] }]] }],
    hint: T('(5, 16/3) to (−5, 0): √(100 + 256/9) = √(1156/9) = 34/3.', '(5, 16/3) до (−5, 0): √(100 + 256/9) = √(1156/9) = 34/3.') },
  { t: 'notice', id: 'n2', rule: T('A hyperbola is the set of points with ∣∣PF₁∣ − ∣PF₂∣∣ = 2a (smaller than 2c). Equation x²/a² − y²/b² = 1, foci (±c, 0), with c² = a² + b² (now c is the biggest). Asymptotes 渐近线 y = ±(b/a)x. Eccentricity e = c/a > 1. If the minus sign is in front of x², the foci are on the y-axis.', 'Гипербола — множество точек, для которых ∣∣PF₁∣ − ∣PF₂∣∣ = 2a (меньше 2c). Уравнение x²/a² − y²/b² = 1, фокусы (±c, 0), причём c² = a² + b² (теперь c — наибольшее). Асимптоты 渐近线 y = ±(b/a)x. Эксцентриситет e = c/a > 1. Если минус стоит перед x², фокусы лежат на оси y.') },
  { t: 'task', id: '2.2', title: T('Read a, b, c', 'Найдите a, b, c'),
    text: T('For hyperbolas a² is the denominator of the positive term (not necessarily the bigger one).', 'Для гиперболы a² — знаменатель положительного слагаемого (не обязательно больший).'),
    parts: [{ k: 'table', head: [T('hyperbola', 'гипербола'), 'a', 'b', 'c', 'e', T('asymptote slope b/a', 'наклон асимптоты b/a')], rows: [
      ['x²/9 − y²/16 = 1', { a: '3' }, { a: '4' }, { a: '5' }, { a: '5/3' }, { a: '4/3' }],
      ['x²/4 − y² = 1', { a: '2' }, { a: '1' }, { a: '√5' }, { a: '√5/2' }, { a: '1/2' }],
      ['x² − y² = 1', { a: '1' }, { a: '1' }, { a: '√2' }, { a: '√2' }, { a: '1' }]] }],
    hint: T('c = √(a² + b²). y² means y²/1, so b = 1.', 'c = √(a² + b²). y² означает y²/1, поэтому b = 1.') },
  { t: 'task', id: '2.3', title: T('Ellipse or hyperbola: do not mix them up', 'Эллипс или гипербола: не перепутайте'),
    text: T('Choose the right relation and the right range for e.', 'Выберите верное соотношение и верный промежуток для e.'),
    parts: [{ k: 'table', head: ['', T('relation', 'соотношение'), T('eccentricity', 'эксцентриситет')], rows: [
      [T('ellipse', 'эллипс'), { a: 'a² = b² + c²', sel: ['a² = b² + c²', 'c² = a² + b²'] }, { a: '0 < e < 1', sel: ['0 < e < 1', 'e > 1', 'e = 1'] }],
      [T('hyperbola', 'гипербола'), { a: 'c² = a² + b²', sel: ['a² = b² + c²', 'c² = a² + b²'] }, { a: 'e > 1', sel: ['0 < e < 1', 'e > 1', 'e = 1'] }]] }],
    hint: T('Look at your tables in 1.2 and 2.2: which letter is the biggest?', 'Посмотрите на таблицы в 1.2 и 2.2: какая буква наибольшая?') }
  ]},

/* ================= PART 3 ================= */
{ id: 3, title: T('The parabola', 'Парабола'),
  intro: T('A parabola 抛物线 has one focus F and one straight line, the directrix 准线. Compare the distance from each point to F with its distance to the directrix.', 'У параболы 抛物线 один фокус F и одна прямая — директриса 准线. Сравните расстояние от каждой точки до F с расстоянием до директрисы.'),
  items: [
  { t: 'task', id: '3.1', title: T('Focus and directrix', 'Фокус и директриса'),
    text: T('y² = 4x, F(1, 0), directrix x = −1. The distance from (x, y) to the line x = −1 is x + 1.', 'y² = 4x, F(1, 0), директриса x = −1. Расстояние от (x, y) до прямой x = −1 равно x + 1.'),
    parts: [{ k: 'fig', id: 'parabola' },
      { k: 'table', head: ['P', T('distance to F', 'расстояние до F'), T('distance to x = −1', 'расстояние до x = −1')], rows: [
        ['(1, 2)', { a: '2' }, { a: '2' }], ['(4, 4)', { a: '5' }, { a: '5' }], ['(9, 6)', { a: '10' }, { a: '10' }]] }],
    hint: T('(4, 4) to (1, 0): √(9 + 16).', '(4, 4) до (1, 0): √(9 + 16).') },
  { t: 'notice', id: 'n3', rule: T('A parabola is the set of points equally far from the focus and the directrix. y² = 2px (p > 0): focus (p/2, 0), directrix x = −p/2, and for a point P(x₀, y₀) on it ∣PF∣ = x₀ + p/2. x² = 2py: focus (0, p/2), directrix y = −p/2.', 'Парабола — множество точек, равноудалённых от фокуса и директрисы. y² = 2px (p > 0): фокус (p/2, 0), директриса x = −p/2, и для точки P(x₀, y₀) на ней ∣PF∣ = x₀ + p/2. x² = 2py: фокус (0, p/2), директриса y = −p/2.') },
  { t: 'task', id: '3.2', title: T('Find the focus and the directrix', 'Найдите фокус и директрису'),
    text: T('First match the equation with 2p. A minus sign flips the parabola.', 'Сначала сопоставьте уравнение с 2p. Знак минус переворачивает параболу.'),
    parts: [{ k: 'table', head: [T('parabola', 'парабола'), T('focus x', 'фокус x'), T('focus y', 'фокус y'), T('directrix', 'директриса')], rows: [
      ['y² = 8x', { a: '2' }, { a: '0' }, { a: 'x = −2', sel: ['x = −2', 'x = 2', 'y = −2', 'x = −4'] }],
      ['x² = 4y', { a: '0' }, { a: '1' }, { a: 'y = −1', sel: ['y = −1', 'y = 1', 'x = −1', 'y = −2'] }],
      ['y² = −4x', { a: '-1' }, { a: '0' }, { a: 'x = 1', sel: ['x = −1', 'x = 1', 'y = 1', 'x = 2'] }]] }],
    hint: T('y² = 8x means 2p = 8, p = 4, p/2 = 2.', 'y² = 8x означает 2p = 8, p = 4, p/2 = 2.') },
  { t: 'task', id: '3.3', title: T('Try it', 'Попробуйте сами'),
    text: T('Use "distance to focus = distance to directrix".', 'Используйте «расстояние до фокуса = расстояние до директрисы».'),
    parts: [{ k: 'blanks', lines: [
      [T('(a) P is on y² = 4x and its x-coordinate is 3. ∣PF∣ = ', '(a) P лежит на y² = 4x, её абсцисса равна 3. ∣PF∣ = '), { a: '4', w: 3 }],
      [T('(b) P is on y² = 8x and ∣PF∣ = 5. The x-coordinate of P is ', '(b) P лежит на y² = 8x и ∣PF∣ = 5. Абсцисса P равна '), { a: '3', w: 3 }]] }],
    hint: T('(b) ∣PF∣ = x₀ + 2.', '(b) ∣PF∣ = x₀ + 2.') }
  ]}
];

const EXAM = [
  { part: 1, q: T('The foci of the ellipse x²/25 + y²/9 = 1 are', 'Фокусы эллипса x²/25 + y²/9 = 1 —'), o: ['(±5, 0)', '(±4, 0)', '(0, ±4)', '(±3, 0)'], a: 1 },
  { part: 1, q: T('The eccentricity of the ellipse x²/4 + y²/3 = 1 is', 'Эксцентриситет эллипса x²/4 + y²/3 = 1 равен'), o: ['√3/2', '1/4', '1/2', '2'], a: 2 },
  { part: 1, q: T('P is on x²/25 + y²/9 = 1 and ∣PF₁∣ = 3. Then ∣PF₂∣ =', 'P лежит на x²/25 + y²/9 = 1 и ∣PF₁∣ = 3. Тогда ∣PF₂∣ ='), o: ['2', '3', '5', '7'], a: 3 },
  { part: 1, q: T('The length of the major axis of x²/16 + y²/25 = 1 is', 'Длина большой оси эллипса x²/16 + y²/25 = 1 равна'), o: ['10', '8', '5', '4'], a: 0 },
  { part: 2, q: T('The asymptotes of x²/9 − y²/16 = 1 are', 'Асимптоты гиперболы x²/9 − y²/16 = 1 —'), o: ['y = ±(3/4)x', 'y = ±(4/3)x', 'y = ±(9/16)x', 'y = ±(16/9)x'], a: 1 },
  { part: 2, q: T('The eccentricity of x² − y² = 1 is', 'Эксцентриситет гиперболы x² − y² = 1 равен'), o: ['1', '2', '√2', '√2/2'], a: 2 },
  { part: 2, q: T('The foci of the hyperbola x²/4 − y²/5 = 1 are', 'Фокусы гиперболы x²/4 − y²/5 = 1 —'), o: ['(±1, 0)', '(0, ±3)', '(±√5, 0)', '(±3, 0)'], a: 3 },
  { part: 3, q: T('The focus of the parabola y² = 8x is', 'Фокус параболы y² = 8x —'), o: ['(2, 0)', '(4, 0)', '(0, 2)', '(8, 0)'], a: 0 },
  { part: 3, q: T('The directrix of the parabola x² = 4y is', 'Директриса параболы x² = 4y —'), o: ['x = −1', 'y = −1', 'y = 1', 'y = −2'], a: 1 },
  { part: 3, q: T('P is on y² = 4x and its x-coordinate is 3. The distance from P to the focus is', 'P лежит на y² = 4x, её абсцисса 3. Расстояние от P до фокуса равно'), o: ['3', '2', '4', '5'], a: 2 },
  { part: 1, q: T('The ellipse with foci (±1, 0) and a = 2 is', 'Эллипс с фокусами (±1, 0) и a = 2 —'), o: ['x²/4 + y² = 1', 'x²/4 + y²/5 = 1', 'x²/3 + y²/4 = 1', 'x²/4 + y²/3 = 1'], a: 3 },
  { part: 2, q: T('A hyperbola has foci on the x-axis, a = 1 and asymptotes y = ±2x. Its equation is', 'Фокусы гиперболы на оси x, a = 1, асимптоты y = ±2x. Её уравнение —'), o: ['x² − y²/4 = 1', 'x² − y²/2 = 1', 'x²/4 − y² = 1', 'y² − x²/4 = 1'], a: 0 }
];

const TOPICS = [
  [T('Ellipse 椭圆', 'Эллипс 椭圆'), 1, '"The foci of the ellipse … are"; "the eccentricity of the ellipse is"'],
  [T('Hyperbola 双曲线', 'Гипербола 双曲线'), 2, '"The equations of the asymptotes of the hyperbola … are"'],
  [T('Parabola 抛物线', 'Парабола 抛物线'), 3, '"The coordinates of the focus of the parabola … are"; "the equation of the directrix is"']
];
