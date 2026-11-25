/* Sheet: Plane vectors and complex numbers (CSCA Mathematics). */
const SHEET = {
  key: 'csca-math-vectors-complex-v1',
  title: T('Investigation sheet: Vectors and complex numbers', 'Исследовательский лист: векторы и комплексные числа'),
  sub: T('CSCA Mathematics · find each rule yourself, then read it', 'CSCA, математика · найдите каждое правило сами, потом прочитайте его'),
  stats: T('Vector and complex-number questions are quick calculations with coordinates. Typical questions:',
           'Вопросы по векторам и комплексным числам — быстрые вычисления в координатах. Типичные вопросы:'),
  symbols: T('Symbols: a = (x, y) is a vector, ∣a∣ its length, a·b the dot product, a ⊥ b "perpendicular", a ∥ b "parallel". i is the imaginary unit, i² = −1. For a complex number a + bi: a is the real part, b the imaginary part. Type √5 as sqrt(5).',
             'Обозначения: a = (x, y) — вектор, ∣a∣ — его длина, a·b — скалярное произведение, a ⊥ b «перпендикулярны», a ∥ b «параллельны». i — мнимая единица, i² = −1. Для комплексного числа a + bi: a — действительная часть, b — мнимая. √5 вводите как sqrt(5).')
};

SHEET.figs = ({ h }) => ({
  vec() {
    const O = [40, 210], s = 40, P = (x, y) => [O[0] + x * s, O[1] - y * s];
    const ar = (x0, y0, x1, y1, cls) => { const [a, b] = P(x0, y0), [c, d] = P(x1, y1); return `<line x1="${a}" y1="${b}" x2="${c}" y2="${d}" class="${cls}" marker-end="url(#ah)"/>`; };
    return h('div', { html: `<svg class="geo" viewBox="0 0 260 240" role="img" aria-label="Vectors a = (2, 1) and b = (1, 3) and their sum a + b = (3, 4), drawn as a parallelogram">
      <defs><marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" style="fill:var(--ink);stroke:none"/></marker></defs>
      <line x1="20" y1="210" x2="250" y2="210" style="stroke:var(--muted)"/><line x1="40" y1="230" x2="40" y2="10" style="stroke:var(--muted)"/>
      ${ar(2, 1, 3, 4, 'hid')}${ar(1, 3, 3, 4, 'hid')}
      ${ar(0, 0, 2, 1, 'acc')}${ar(0, 0, 1, 3, 'acc2')}${ar(0, 0, 3, 4, 'acc3')}
      <text x="124" y="200">a</text><text x="62" y="96">b</text><text x="140" y="96">a + b</text>
      <text x="${P(1, 0)[0] - 3}" y="226" class="mt">1</text><text x="${P(2, 0)[0] - 3}" y="226" class="mt">2</text><text x="${P(3, 0)[0] - 3}" y="226" class="mt">3</text>
      <text x="26" y="${P(0, 2)[1] + 4}" class="mt">2</text><text x="26" y="${P(0, 4)[1] + 4}" class="mt">4</text>
    </svg>` });
  }
});

const I4 = ['1', '−1', 'i', '−i'];
const QD = [{ k: '1', en: 'I', ru: 'I' }, { k: '2', en: 'II', ru: 'II' }, { k: '3', en: 'III', ru: 'III' }, { k: '4', en: 'IV', ru: 'IV' }, { k: 'axis', en: 'on an axis', ru: 'на оси' }];

const PARTS = [
/* ================= PART 1 ================= */
{ id: 1, title: T('Vectors in coordinates', 'Векторы в координатах'),
  intro: T('A plane vector 平面向量 has a length and a direction. In coordinates a = (x, y) means "x to the right, y up".', 'Вектор на плоскости 平面向量 имеет длину и направление. В координатах a = (x, y) означает «x вправо, y вверх».'),
  items: [
  { t: 'task', id: '1.1', title: T('Add, subtract, stretch', 'Сложите, вычтите, растяните'),
    text: T('a = (2, 1), b = (1, 3). Look at the picture: walking along a and then along b ends at a + b.', 'a = (2, 1), b = (1, 3). Посмотрите на рисунок: пройдя по a, а затем по b, вы окажетесь в конце a + b.'),
    parts: [{ k: 'fig', id: 'vec' },
      { k: 'table', head: [T('vector', 'вектор'), 'x', 'y'], rows: [['a + b', { a: '3' }, { a: '4' }], ['a − b', { a: '1' }, { a: '-2' }], ['2a', { a: '4' }, { a: '2' }], ['2a − b', { a: '3' }, { a: '-1' }]] }],
    hint: T('Work with each coordinate separately: (2 + 1, 1 + 3).', 'Работайте с каждой координатой отдельно: (2 + 1, 1 + 3).') },
  { t: 'task', id: '1.2', title: T('From two points', 'По двум точкам'),
    text: T('A(1, 2), B(4, 6). The vector AB goes from A to B.', 'A(1, 2), B(4, 6). Вектор AB идёт от A к B.'),
    parts: [{ k: 'blanks', lines: [
      ['AB = ( ', { a: '3', w: 2 }, ' , ', { a: '4', w: 2 }, ' )'],
      [T('Length ∣AB∣ = √(3² + 4²) = ', 'Длина ∣AB∣ = √(3² + 4²) = '), { a: '5', w: 2 }],
      [T('Midpoint of AB: ( ', 'Середина AB: ( '), { a: '5/2', w: 3 }, ' , ', { a: '4', w: 2 }, ' )']] }],
    hint: T('AB = B − A (end minus start). The midpoint is the average of the coordinates.', 'AB = B − A (конец минус начало). Середина — среднее координат.') },
  { t: 'rule', label: T('Rule', 'Правило'), text: T('AB = (x_B − x_A, y_B − y_A). For a = (x, y): ∣a∣ = √(x² + y²) and ka = (kx, ky). Vectors add and subtract coordinate by coordinate.', 'AB = (x_B − x_A, y_B − y_A). Для a = (x, y): ∣a∣ = √(x² + y²) и ka = (kx, ky). Векторы складываются и вычитаются покоординатно.') }
  ]},

/* ================= PART 2 ================= */
{ id: 2, title: T('The dot product, angles, perpendicular and parallel', 'Скалярное произведение, углы, перпендикулярность и параллельность'),
  intro: T('The dot product 数量积 turns two vectors into one number. It is the tool for angles and for "perpendicular" questions.', 'Скалярное произведение 数量积 превращает два вектора в одно число. Это инструмент для углов и вопросов о перпендикулярности.'),
  items: [
  { t: 'task', id: '2.1', title: T('Two ways to get one number', 'Два способа получить одно число'),
    text: T('For each pair compute x₁x₂ + y₁y₂, and also ∣a∣·∣b∣·cos θ, where θ is the angle between the vectors (given).', 'Для каждой пары вычислите x₁x₂ + y₁y₂, а также ∣a∣·∣b∣·cos θ, где θ — угол между векторами (дан).'),
    parts: [{ k: 'table', head: ['a', 'b', 'θ', 'x₁x₂ + y₁y₂', '∣a∣', '∣b∣', '∣a∣·∣b∣·cos θ'], rows: [
      ['(1, 0)', '(1, 1)', '45°', { a: '1' }, { a: '1' }, { a: '√2' }, { a: '1' }],
      ['(1, 0)', '(0, 2)', '90°', { a: '0' }, { a: '1' }, { a: '2' }, { a: '0' }],
      ['(1, 0)', '(−1, √3)', '120°', { a: '-1' }, { a: '1' }, { a: '2' }, { a: '-1' }]] }],
    hint: T('cos 45° = √2/2, cos 90° = 0, cos 120° = −1/2. ∣(−1, √3)∣ = √(1 + 3).', 'cos 45° = √2/2, cos 90° = 0, cos 120° = −1/2. ∣(−1, √3)∣ = √(1 + 3).') },
  { t: 'notice', id: 'n2', rule: T('a·b = x₁x₂ + y₁y₂ = ∣a∣∣b∣cos θ. So cos θ = a·b / (∣a∣∣b∣). a ⊥ b exactly when a·b = 0. a ∥ b exactly when x₁y₂ − x₂y₁ = 0. Also a·a = ∣a∣².', 'a·b = x₁x₂ + y₁y₂ = ∣a∣∣b∣cos θ. Поэтому cos θ = a·b / (∣a∣∣b∣). a ⊥ b тогда и только тогда, когда a·b = 0. a ∥ b тогда и только тогда, когда x₁y₂ − x₂y₁ = 0. Кроме того, a·a = ∣a∣².') },
  { t: 'task', id: '2.2', title: T('Find the unknown', 'Найдите неизвестное'),
    text: T('a = (1, 2), b = (m, −1).', 'a = (1, 2), b = (m, −1).'),
    parts: [{ k: 'blanks', lines: [
      [T('If a ⊥ b: 1·m + 2·(−1) = 0, so m = ', 'Если a ⊥ b: 1·m + 2·(−1) = 0, поэтому m = '), { a: '2', w: 3 }],
      [T('If a ∥ b: 1·(−1) − m·2 = 0, so m = ', 'Если a ∥ b: 1·(−1) − m·2 = 0, поэтому m = '), { a: '-1/2', w: 4 }]] }],
    hint: T('Solve each linear equation for m.', 'Решите каждое линейное уравнение относительно m.') },
  { t: 'task', id: '2.3', title: T('Lengths without coordinates', 'Длины без координат'),
    text: T('∣a∣ = 2, ∣b∣ = 1 and the angle between them is 60°. Use ∣a + b∣² = (a + b)·(a + b) = ∣a∣² + 2a·b + ∣b∣².', '∣a∣ = 2, ∣b∣ = 1, угол между ними 60°. Используйте ∣a + b∣² = (a + b)·(a + b) = ∣a∣² + 2a·b + ∣b∣².'),
    parts: [{ k: 'blanks', lines: [
      ['a·b = 2·1·cos 60° = ', { a: '1', w: 3 }],
      ['∣a + b∣² = ', { a: '7', w: 3 }, ' , ∣a + b∣ = ', { a: '√7', w: 4 }],
      ['∣a − b∣² = ', { a: '3', w: 3 }, ' , ∣a − b∣ = ', { a: '√3', w: 4 }]] }],
    hint: T('∣a − b∣² = ∣a∣² − 2a·b + ∣b∣² = 4 − 2 + 1.', '∣a − b∣² = ∣a∣² − 2a·b + ∣b∣² = 4 − 2 + 1.') },
  { t: 'task', id: '2.4', title: T('Try it: the angle', 'Попробуйте сами: угол'),
    text: T('a = (1, 1), b = (0, 2).', 'a = (1, 1), b = (0, 2).'),
    parts: [{ k: 'blanks', lines: [['a·b = ', { a: '2', w: 3 }, '   cos θ = ', { a: '√2/2', w: 4 }, T('   θ (radians) = ', '   θ (в радианах) = '), { a: 'π/4', w: 4 }]] }],
    hint: T('∣a∣ = √2, ∣b∣ = 2. cos θ = 2 / (2√2).', '∣a∣ = √2, ∣b∣ = 2. cos θ = 2 / (2√2).') }
  ]},

/* ================= PART 3 ================= */
{ id: 3, title: T('Complex numbers', 'Комплексные числа'),
  intro: T('There is no real number whose square is −1, so we invent one: i, the imaginary unit 虚数单位, with i² = −1. A complex number 复数 is z = a + bi with real a and b.', 'Не существует действительного числа, квадрат которого равен −1, поэтому вводят новое число: i, мнимую единицу 虚数单位, с i² = −1. Комплексное число 复数 — это z = a + bi с действительными a и b.'),
  items: [
  { t: 'task', id: '3.1', title: T('Powers of i', 'Степени i'),
    text: T('Each power is the previous one times i. Use i² = −1.', 'Каждая степень — это предыдущая, умноженная на i. Используйте i² = −1.'),
    parts: [{ k: 'table', head: ['n', '1', '2', '3', '4', '5', '6', '7', '8'], rows: [['iⁿ', 'i', '−1', { a: '−i', sel: I4 }, { a: '1', sel: I4 }, { a: 'i', sel: I4 }, { a: '−1', sel: I4 }, { a: '−i', sel: I4 }, { a: '1', sel: I4 }]] },
      { k: 'blanks', lines: [[T('The pattern repeats every ', 'Закономерность повторяется каждые '), { a: '4', w: 2 }, T(' steps. So i²⁰²⁶ = ', ' шага. Поэтому i²⁰²⁶ = '), { a: '−1', sel: I4 }]] }],
    hint: T('i³ = i²·i = −i. 2026 = 4·506 + 2.', 'i³ = i²·i = −i. 2026 = 4·506 + 2.') },
  { t: 'task', id: '3.2', title: T('Calculate like with brackets', 'Считайте как со скобками'),
    text: T('z₁ = 2 + 3i, z₂ = 1 − i. Work as with ordinary brackets, then replace i² by −1. Give the real and imaginary parts.', 'z₁ = 2 + 3i, z₂ = 1 − i. Действуйте как с обычными скобками, затем замените i² на −1. Запишите действительную и мнимую части.'),
    parts: [{ k: 'table', head: [T('number', 'число'), T('real part', 'действит. часть'), T('imaginary part', 'мнимая часть')], rows: [
      ['z₁ + z₂', { a: '3' }, { a: '2' }],
      ['z₁ − z₂', { a: '1' }, { a: '4' }],
      ['z₁·z₂', { a: '5' }, { a: '1' }],
      [T('conjugate z̄₂ (共轭复数)', 'сопряжённое z̄₂ (共轭复数)'), { a: '1' }, { a: '1' }],
      ['z₂·z̄₂', { a: '2' }, { a: '0' }]] }],
    hint: T('(2 + 3i)(1 − i) = 2 − 2i + 3i − 3i². The conjugate of a + bi is a − bi.', '(2 + 3i)(1 − i) = 2 − 2i + 3i − 3i². Сопряжённое к a + bi — это a − bi.') },
  { t: 'notice', id: 'n3', rule: T('(a + bi)(a − bi) = a² + b², a real number. To divide, multiply the top and the bottom by the conjugate of the bottom: z₁ / z₂ = z₁·z̄₂ / (z₂·z̄₂).', '(a + bi)(a − bi) = a² + b² — действительное число. Чтобы разделить, умножьте числитель и знаменатель на число, сопряжённое знаменателю: z₁ / z₂ = z₁·z̄₂ / (z₂·z̄₂).') },
  { t: 'task', id: '3.3', title: T('Division', 'Деление'),
    text: T('Compute z₁ / z₂ = (2 + 3i)/(1 − i) and (1 + i)/(1 − i).', 'Вычислите z₁ / z₂ = (2 + 3i)/(1 − i) и (1 + i)/(1 − i).'),
    parts: [{ k: 'table', head: [T('number', 'число'), T('real part', 'действит. часть'), T('imaginary part', 'мнимая часть')], rows: [
      ['(2 + 3i)/(1 − i)', { a: '-1/2' }, { a: '5/2' }],
      ['(1 + i)/(1 − i)', { a: '0' }, { a: '1' }]] }],
    hint: T('Multiply top and bottom by 1 + i. The bottom becomes 2. (2 + 3i)(1 + i) = −1 + 5i.', 'Умножьте числитель и знаменатель на 1 + i. Знаменатель станет 2. (2 + 3i)(1 + i) = −1 + 5i.') },
  { t: 'task', id: '3.4', title: T('Points in the plane', 'Точки на плоскости'),
    text: T('z = a + bi is drawn as the point (a, b) in the complex plane. Its modulus 模 ∣z∣ = √(a² + b²) is the distance to 0.', 'z = a + bi изображается точкой (a, b) на комплексной плоскости. Её модуль 模 ∣z∣ = √(a² + b²) — расстояние до 0.'),
    parts: [{ k: 'table', head: ['z', T('point', 'точка'), '∣z∣', T('quadrant', 'четверть')], rows: [
      ['3 − 4i', '(3, −4)', { a: '5' }, { a: '4', sel: QD }],
      ['−1 + i', '(−1, 1)', { a: '√2' }, { a: '2', sel: QD }],
      ['(1 + i)²', '(0, 2)', { a: '2' }, { a: 'axis', sel: QD }],
      ['1/(1 + i)', '(1/2, −1/2)', { a: '√2/2' }, { a: '4', sel: QD }]] }],
    hint: T('(1 + i)² = 1 + 2i + i² = 2i. 1/(1 + i) = (1 − i)/2.', '(1 + i)² = 1 + 2i + i² = 2i. 1/(1 + i) = (1 − i)/2.') },
  { t: 'task', id: '3.5', title: T('Try it: a pure imaginary number', 'Попробуйте сами: чисто мнимое число'),
    text: T('z is pure imaginary 纯虚数 when its real part is 0 and its imaginary part is not 0. z = (m² − 1) + (m + 1)i.', 'z — чисто мнимое число 纯虚数, когда его действительная часть равна 0, а мнимая не равна 0. z = (m² − 1) + (m + 1)i.'),
    parts: [{ k: 'blanks', lines: [
      [T('m² − 1 = 0 gives m = 1 or m = ', 'm² − 1 = 0 даёт m = 1 или m = '), { a: '-1', w: 3 }],
      [T('Which one keeps the imaginary part non-zero? m = ', 'Какое из них оставляет мнимую часть ненулевой? m = '), { a: '1', w: 3 }]] }],
    hint: T('For m = −1 the imaginary part m + 1 is 0, so z = 0.', 'При m = −1 мнимая часть m + 1 равна 0, и z = 0.') }
  ]}
];

const EXAM = [
  { part: 1, q: T('a = (1, 2), b = (3, −1). Then 2a − b =', 'a = (1, 2), b = (3, −1). Тогда 2a − b ='), o: ['(5, 3)', '(−1, 5)', '(−1, 3)', '(1, 5)'], a: 1 },
  { part: 2, q: T('a = (2, 1), b = (−1, k) and a ⊥ b. Then k =', 'a = (2, 1), b = (−1, k) и a ⊥ b. Тогда k ='), o: ['−2', '1/2', '2', '−1/2'], a: 2 },
  { part: 2, q: T('a = (1, 2), b = (2, m) and a ∥ b. Then m =', 'a = (1, 2), b = (2, m) и a ∥ b. Тогда m ='), o: ['−1', '1', '−4', '4'], a: 3 },
  { part: 2, q: T('∣a∣ = 1, ∣b∣ = 2 and the angle between a and b is 60°. Then a·b =', '∣a∣ = 1, ∣b∣ = 2, угол между a и b равен 60°. Тогда a·b ='), o: ['1', '2', '√3', '1/2'], a: 0 },
  { part: 2, q: T('∣a∣ = 1, ∣b∣ = 2 and a·b = 1. Then ∣a − b∣ =', '∣a∣ = 1, ∣b∣ = 2 и a·b = 1. Тогда ∣a − b∣ ='), o: ['1', '√3', '√5', '√7'], a: 1 },
  { part: 1, q: T('A(1, 3), B(4, −1). Then ∣AB∣ =', 'A(1, 3), B(4, −1). Тогда ∣AB∣ ='), o: ['3', '4', '5', '7'], a: 2 },
  { part: 3, q: 'i(1 + i) =', o: ['1 + i', '1 − i', '−1 − i', '−1 + i'], a: 3 },
  { part: 3, q: '(1 + i)/(1 − i) =', o: ['i', '−i', '1', '−1'], a: 0 },
  { part: 3, q: T('z = 3 − 4i. Then ∣z∣ =', 'z = 3 − 4i. Тогда ∣z∣ ='), o: ['7', '5', '25', '1'], a: 1 },
  { part: 3, q: T('In the complex plane, z = 1/(1 + i) lies in quadrant', 'На комплексной плоскости z = 1/(1 + i) лежит в четверти'), o: ['I', 'II', 'III', 'IV'], a: 3 },
  { part: 3, q: 'i²⁰²⁶ =', o: ['1', 'i', '−1', '−i'], a: 2 },
  { part: 3, q: T('The conjugate of z = 2 − i is', 'Число, сопряжённое к z = 2 − i, —'), o: ['2 + i', '−2 + i', '−2 − i', '1 − 2i'], a: 0 }
];

const TOPICS = [
  [T('Vector operations in coordinates 坐标运算', 'Действия с векторами в координатах 坐标运算'), 1, '"Given a = (1, 2), b = (3, −1), then 2a − b ="'],
  [T('Dot product, ⊥ and ∥ 数量积 / 垂直 / 平行', 'Скалярное произведение, ⊥ и ∥ 数量积 / 垂直 / 平行'), 2, '"If a ⊥ b, then k ="; "∣a − b∣ ="'],
  [T('Complex numbers 复数', 'Комплексные числа 复数'), 3, '"i(1 + i) ="; "the point of z lies in quadrant …"; "∣z∣ ="']
];
