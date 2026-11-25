/* Sheet: Probability and statistics (CSCA Mathematics): classical probability, rules, mean and variance, normal distribution. */
const SHEET = {
  key: 'csca-math-probability-statistics-v1',
  title: T('Investigation sheet: Probability and statistics', 'Исследовательский лист: вероятность и статистика'),
  sub: T('CSCA Mathematics · find each rule yourself, then read it', 'CSCA, математика · найдите каждое правило сами, потом прочитайте его'),
  stats: T('The syllabus covers classical probability, how to combine probabilities, the mean and variance of data, and basic facts about the normal distribution. Typical questions:',
           'Программа охватывает классическую вероятность, правила сложения и умножения вероятностей, среднее и дисперсию данных и основные свойства нормального распределения. Типичные вопросы:'),
  symbols: T('Symbols: P(A) is the probability of the event A, Ā is "A does not happen", x̄ is the mean, s² the variance, σ the standard deviation, X ~ N(μ, σ²) "X is normally distributed with mean μ and variance σ²". Type fractions like 1/6 or decimals like 0.92.',
             'Обозначения: P(A) — вероятность события A, Ā — «A не происходит», x̄ — среднее, s² — дисперсия, σ — стандартное отклонение, X ~ N(μ, σ²) — «X распределена нормально со средним μ и дисперсией σ²». Дроби вводите так: 1/6, десятичные — так: 0.92.')
};

SHEET.figs = ({ h, plot }) => ({
  bell() {
    const f = x => Math.exp(-((x - 1) ** 2) / 2) * 2.6;
    const s = plot({ label: 'Normal curve with mean 1, symmetric about the line x = 1, with the points −1 and 3 marked', w: 420, h: 220, x0: -3, x1: 5, y0: -0.3, y1: 3,
      xt: [{ v: -1, l: '−1' }, { v: 1, l: 'μ = 1' }, { v: 3, l: '3' }], vlines: [1],
      curves: [{ f, cls: 'c1' }], segs: [[-1, 0, -1, f(-1)], [3, 0, 3, f(3)]],
      tx: [{ x: 3.6, y: 0.5, t: '0.2', cls: 'c2t' }, { x: -2.6, y: 0.5, t: '?', cls: 'c2t' }] });
    return h('div', { class: 'figone', html: s });
  }
});

const PARTS = [
/* ================= PART 1 ================= */
{ id: 1, title: T('Count the outcomes', 'Посчитайте исходы'),
  intro: T('In a classical probability model 古典概型 all outcomes are equally likely. Then a probability is just a count divided by a count.', 'В классической модели вероятности 古典概型 все исходы равновозможны. Тогда вероятность — это просто одно количество, делённое на другое.'),
  items: [
  { t: 'task', id: '1.1', title: T('One die', 'Один кубик'),
    text: T('Roll one fair die: the outcomes are 1, 2, 3, 4, 5, 6.', 'Бросаем один честный кубик: исходы 1, 2, 3, 4, 5, 6.'),
    parts: [{ k: 'table', head: [T('event', 'событие'), T('favourable outcomes', 'благоприятных исходов'), 'P'], rows: [
      [T('an even number', 'чётное число'), { a: '3' }, { a: '1/2' }],
      [T('a number greater than 4', 'число больше 4'), { a: '2' }, { a: '1/3' }],
      [T('a 7', 'семёрка'), { a: '0' }, { a: '0' }],
      [T('a number less than 7', 'число меньше 7'), { a: '6' }, { a: '1' }]] }],
    hint: T('Even: 2, 4, 6. Greater than 4: 5 and 6.', 'Чётные: 2, 4, 6. Больше 4: 5 и 6.') },
  { t: 'task', id: '1.2', title: T('Two dice', 'Два кубика'),
    text: T('Roll two dice. There are 6 × 6 = 36 equally likely ordered pairs (first die, second die). Count how many pairs give each sum.', 'Бросаем два кубика. Есть 6 × 6 = 36 равновозможных упорядоченных пар (первый кубик, второй кубик). Посчитайте, сколько пар даёт каждую сумму.'),
    parts: [
      { k: 'table', head: [T('sum', 'сумма'), '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'], rows: [[T('pairs', 'пар'), { a: '1' }, { a: '2' }, { a: '3' }, { a: '4' }, { a: '5' }, { a: '6' }, { a: '5' }, { a: '4' }, { a: '3' }, { a: '2' }, { a: '1' }]] },
      { k: 'blanks', lines: [['P(', T('sum = 7', 'сумма = 7'), ') = ', { a: '1/6', w: 4 }, '   P(', T('sum ≥ 10', 'сумма ≥ 10'), ') = ', { a: '1/6', w: 4 }, '   P(', T('sum = 2', 'сумма = 2'), ') = ', { a: '1/36', w: 4 }]] }],
    hint: T('Sum 4: (1, 3), (2, 2), (3, 1). The pairs (1, 3) and (3, 1) are different.', 'Сумма 4: (1, 3), (2, 2), (3, 1). Пары (1, 3) и (3, 1) различны.') },
  { t: 'notice', id: 'n1', rule: T('If all n outcomes are equally likely and m of them make A happen, P(A) = m / n. Always 0 ≤ P(A) ≤ 1; an impossible event has P = 0, a certain event P = 1.', 'Если все n исходов равновозможны и m из них благоприятны для A, то P(A) = m / n. Всегда 0 ≤ P(A) ≤ 1; невозможное событие имеет P = 0, достоверное — P = 1.') },
  { t: 'task', id: '1.3', title: T('Draw two balls', 'Вытащите два шара'),
    text: T('A bag has 3 red balls (R₁, R₂, R₃) and 2 white balls (W₁, W₂). Take 2 at once. List all pairs: R₁R₂, R₁R₃, …', 'В мешке 3 красных шара (R₁, R₂, R₃) и 2 белых (W₁, W₂). Вынимаем сразу 2. Выпишите все пары: R₁R₂, R₁R₃, …'),
    parts: [{ k: 'blanks', lines: [
      [T('Number of pairs: ', 'Число пар: '), { a: '10', w: 3 }, T('   both red: ', '   оба красные: '), { a: '3', w: 3 }, T('   one of each: ', '   по одному каждого цвета: '), { a: '6', w: 3 }, T('   both white: ', '   оба белые: '), { a: '1', w: 3 }],
      ['P(', T('both red', 'оба красные'), ') = ', { a: '3/10', w: 4 }, '   P(', T('at least one white', 'хотя бы один белый'), ') = ', { a: '7/10', w: 4 }]] }],
    hint: T('Pairs of red: R₁R₂, R₁R₃, R₂R₃. "At least one white" is everything except "both red".', 'Пары красных: R₁R₂, R₁R₃, R₂R₃. «Хотя бы один белый» — это всё, кроме «оба красные».') }
  ]},

/* ================= PART 2 ================= */
{ id: 2, title: T('Combining probabilities', 'Сложение и умножение вероятностей'),
  intro: T('Counting gets long. Three rules save time: the complement, "or" for events that cannot happen together, and "and" for independent events.', 'Перебор становится долгим. Три правила экономят время: противоположное событие, «или» для несовместных событий и «и» для независимых событий.'),
  items: [
  { t: 'task', id: '2.1', title: T('Coins', 'Монеты'),
    text: T('Toss a coin twice. Outcomes: HH, HT, TH, TT (H = heads, T = tails).', 'Монету бросают дважды. Исходы: HH, HT, TH, TT (H — орёл, T — решка).'),
    parts: [{ k: 'blanks', lines: [
      ['P(HH) = ', { a: '1/4', w: 3 }, T('.   Compare: P(H) · P(H) = ½ · ½ = ', '.   Сравните: P(H) · P(H) = ½ · ½ = '), { a: '1/4', w: 3 }],
      ['P(', T('at least one H', 'хотя бы один H'), ') = ', { a: '3/4', w: 3 }, T('.   Compare: 1 − P(TT) = ', '.   Сравните: 1 − P(TT) = '), { a: '3/4', w: 3 }],
      [T('Three tosses: P(at least one H) = 1 − (½)³ = ', 'Три броска: P(хотя бы один H) = 1 − (½)³ = '), { a: '7/8', w: 3 }]] }],
    hint: T('Only TT has no H.', 'Только в TT нет H.') },
  { t: 'rule', label: T('Rules', 'Правила'), text: T('Complement 对立事件: P(Ā) = 1 − P(A). Mutually exclusive 互斥 (cannot both happen): P(A or B) = P(A) + P(B). Independent 相互独立 (one does not affect the other): P(A and B) = P(A)·P(B).', 'Противоположное событие 对立事件: P(Ā) = 1 − P(A). Несовместные 互斥 (не могут произойти вместе): P(A или B) = P(A) + P(B). Независимые 相互独立 (одно не влияет на другое): P(A и B) = P(A)·P(B).') },
  { t: 'task', id: '2.2', title: T('Two shooters', 'Два стрелка'),
    text: T('A hits the target with probability 0.8, B with probability 0.6, independently.', 'A попадает в цель с вероятностью 0,8, B — с вероятностью 0,6, независимо.'),
    parts: [{ k: 'table', head: [T('event', 'событие'), 'P'], rows: [
      [T('both hit', 'оба попали'), { a: '0.48' }],
      [T('neither hits', 'оба промахнулись'), { a: '0.08' }],
      [T('at least one hits', 'хотя бы один попал'), { a: '0.92' }],
      [T('exactly one hits', 'ровно один попал'), { a: '0.44' }]] }],
    hint: T('Neither: 0.2 · 0.4. Exactly one: 0.8 · 0.4 + 0.2 · 0.6.', 'Оба промахнулись: 0,2 · 0,4. Ровно один: 0,8 · 0,4 + 0,2 · 0,6.') },
  { t: 'note', label: T('Careful', 'Осторожно'), text: T('"Mutually exclusive" and "independent" are different. If A and B are mutually exclusive and both possible, they are NOT independent: knowing A happened tells you B did not.', '«Несовместные» и «независимые» — разные понятия. Если A и B несовместны и оба возможны, они НЕ независимы: зная, что A произошло, вы знаете, что B не произошло.') }
  ]},

/* ================= PART 3 ================= */
{ id: 3, title: T('Describing data: mean and variance', 'Описание данных: среднее и дисперсия'),
  intro: T('The mean 平均数 tells where the data sit; the variance 方差 tells how spread out they are.', 'Среднее 平均数 показывает, где располагаются данные; дисперсия 方差 — насколько они разбросаны.'),
  items: [
  { t: 'task', id: '3.1', title: T('Centre', 'Центр'),
    text: T('Data: 2, 4, 4, 5, 10.', 'Данные: 2, 4, 4, 5, 10.'),
    parts: [{ k: 'blanks', lines: [
      [T('mean x̄ = ', 'среднее x̄ = '), { a: '5', w: 3 }, T('   median 中位数 = ', '   медиана 中位数 = '), { a: '4', w: 3 }, T('   mode 众数 = ', '   мода 众数 = '), { a: '4', w: 3 }],
      [T('Median of 3, 8, 1, 6, 5, 9 (sort first, six numbers): ', 'Медиана 3, 8, 1, 6, 5, 9 (сначала упорядочите, чисел шесть): '), { a: '5.5', w: 3 }]] }],
    hint: T('Median: the middle number after sorting; for an even count, the mean of the two middle numbers.', 'Медиана — среднее по порядку число после сортировки; при чётном количестве — среднее двух средних чисел.') },
  { t: 'task', id: '3.2', title: T('Same mean, different spread', 'Одинаковое среднее, разный разброс'),
    text: T('Two groups both have mean 5. For each number compute (x − 5)², then take the average of those squares.', 'У обеих групп среднее 5. Для каждого числа вычислите (x − 5)², затем возьмите среднее этих квадратов.'),
    parts: [{ k: 'table', head: [T('group', 'группа'), 'x', '(x − 5)²', T('average of (x − 5)²', 'среднее (x − 5)²')], rows: [
      ['A', '4, 5, 5, 5, 6', '1, 0, 0, 0, 1', { a: '0.4' }],
      ['B', '1, 3, 5, 7, 9', { a: '16, 4, 0, 4, 16', sel: ['16, 4, 0, 4, 16', '4, 2, 0, 2, 4', '16, 9, 0, 9, 16'] }, { a: '8' }]] },
      { k: 'blanks', lines: [[T('Which group is more spread out? ', 'Какая группа разбросана сильнее? '), { a: 'B', sel: ['A', 'B'] }]] }],
    hint: T('(1 − 5)² = 16. Average of 16, 4, 0, 4, 16 = 40/5.', '(1 − 5)² = 16. Среднее 16, 4, 0, 4, 16 = 40/5.') },
  { t: 'notice', id: 'n3', rule: T('Variance s² = [(x₁ − x̄)² + … + (xₙ − x̄)²] / n; standard deviation s = √(s²). A bigger variance means the data are more spread out (less stable).', 'Дисперсия s² = [(x₁ − x̄)² + … + (xₙ − x̄)²] / n; стандартное отклонение s = √(s²). Большая дисперсия означает больший разброс (меньшую стабильность).') },
  { t: 'task', id: '3.3', title: T('Change all the data', 'Измените все данные'),
    text: T('Start with 1, 2, 3: mean 2, variance 2/3. Transform every number and recompute.', 'Начните с 1, 2, 3: среднее 2, дисперсия 2/3. Преобразуйте каждое число и пересчитайте.'),
    parts: [{ k: 'table', head: [T('data', 'данные'), T('mean', 'среднее'), T('variance', 'дисперсия')], rows: [
      ['x + 10:  11, 12, 13', { a: '12' }, { a: '2/3' }],
      ['2x + 1:  3, 5, 7', { a: '5' }, { a: '8/3' }],
      ['−3x:  −3, −6, −9', { a: '-6' }, { a: '6' }]] }],
    hint: T('For 3, 5, 7: (3 − 5)² + 0 + (7 − 5)² = 8, then ÷ 3.', 'Для 3, 5, 7: (3 − 5)² + 0 + (7 − 5)² = 8, затем ÷ 3.') },
  { t: 'notice', id: 'n3b', rule: T('If every x becomes ax + b: the mean becomes a·x̄ + b, and the variance becomes a²·s². Adding b does not change the spread.', 'Если каждое x заменить на ax + b: среднее станет a·x̄ + b, а дисперсия a²·s². Прибавление b не меняет разброс.') },
  { t: 'task', id: '3.4', title: T('A frequency table', 'Таблица частот'),
    text: T('Scores in a group: 60 points (2 students), 70 points (5 students), 80 points (3 students).', 'Баллы в группе: 60 баллов (2 ученика), 70 баллов (5 учеников), 80 баллов (3 ученика).'),
    parts: [{ k: 'blanks', lines: [[T('Mean score = (60·2 + 70·5 + 80·3) / 10 = ', 'Средний балл = (60·2 + 70·5 + 80·3) / 10 = '), { a: '71', w: 3 }]] }],
    hint: T('120 + 350 + 240.', '120 + 350 + 240.') }
  ]},

/* ================= PART 4 ================= */
{ id: 4, title: T('The normal distribution', 'Нормальное распределение'),
  intro: T('Heights, test scores and measurement errors often follow a bell-shaped curve: the normal distribution 正态分布 X ~ N(μ, σ²). The whole curve is symmetric about x = μ, and the total area under it is 1.', 'Рост, баллы за тест и ошибки измерений часто подчиняются колоколообразной кривой — нормальному распределению 正态分布 X ~ N(μ, σ²). Кривая симметрична относительно x = μ, а вся площадь под ней равна 1.'),
  items: [
  { t: 'task', id: '4.1', title: T('Use the symmetry', 'Используйте симметрию'),
    text: T('X ~ N(1, σ²) and P(X > 3) = 0.2. The points 3 and −1 are the same distance from μ = 1.', 'X ~ N(1, σ²) и P(X > 3) = 0,2. Точки 3 и −1 находятся на одинаковом расстоянии от μ = 1.'),
    parts: [{ k: 'fig', id: 'bell' },
      { k: 'table', head: [T('probability', 'вероятность'), T('value', 'значение')], rows: [['P(X < −1)', { a: '0.2' }], ['P(−1 < X < 3)', { a: '0.6' }], ['P(1 < X < 3)', { a: '0.3' }], ['P(X < 1)', { a: '0.5' }]] }],
    hint: T('The two tails are equal. The middle part is 1 − 0.2 − 0.2, and half of it lies on each side of 1.', 'Два «хвоста» равны. Средняя часть равна 1 − 0,2 − 0,2, и половина её лежит по каждую сторону от 1.') },
  { t: 'rule', label: T('Rule', 'Правило'), text: T('For X ~ N(μ, σ²): P(X < μ) = P(X > μ) = 0.5, and P(X < μ − a) = P(X > μ + a). About 68.27% of values lie within one σ of μ, 95.45% within 2σ, 99.73% within 3σ. A smaller σ gives a taller, thinner curve.', 'Для X ~ N(μ, σ²): P(X < μ) = P(X > μ) = 0,5 и P(X < μ − a) = P(X > μ + a). Около 68,27% значений лежат в пределах одного σ от μ, 95,45% — в пределах 2σ, 99,73% — в пределах 3σ. Меньшее σ даёт более высокую и узкую кривую.') },
  { t: 'task', id: '4.2', title: T('Try it', 'Попробуйте сами'),
    text: T('Exam scores X ~ N(100, 10²). Use 0.6827 for one σ. Give 4 decimal places.', 'Баллы X ~ N(100, 10²). Используйте 0,6827 для одного σ. Дайте ответ с 4 знаками после запятой.'),
    parts: [{ k: 'blanks', lines: [
      ['P(90 < X < 110) ≈ ', { a: '0.6827', w: 5 }],
      ['P(X > 110) ≈ (1 − 0.6827) / 2 ≈ ', { a: '0.1587', w: 5 }],
      [T('Out of 1000 students, about how many score above 110? ', 'Из 1000 учеников примерно сколько наберут больше 110? '), { a: '159', w: 4 }]] }],
    hint: T('90 and 110 are μ − σ and μ + σ.', '90 и 110 — это μ − σ и μ + σ.') }
  ]}
];

const EXAM = [
  { part: 1, q: T('A fair die is rolled once. The probability of getting a number greater than 4 is', 'Честный кубик бросают один раз. Вероятность выпадения числа больше 4 равна'), o: ['1/6', '1/3', '1/2', '2/3'], a: 1 },
  { part: 1, q: T('Two fair dice are rolled. The probability that the sum is 7 is', 'Бросают два честных кубика. Вероятность того, что сумма равна 7, —'), o: ['7/36', '1/12', '1/6', '1/36'], a: 2 },
  { part: 1, q: T('A bag has 3 red and 2 white balls. Two are taken at random. The probability that both are red is', 'В мешке 3 красных и 2 белых шара. Наугад вынимают два. Вероятность того, что оба красные, —'), o: ['3/5', '9/25', '1/2', '3/10'], a: 3 },
  { part: 2, q: T('A coin is tossed 3 times. The probability of at least one head is', 'Монету бросают 3 раза. Вероятность хотя бы одного орла —'), o: ['7/8', '1/8', '3/8', '1/2'], a: 0 },
  { part: 2, q: T('A and B hit a target with probabilities 0.8 and 0.6, independently. The probability that the target is hit at least once is', 'A и B попадают в цель с вероятностями 0,8 и 0,6 независимо. Вероятность хотя бы одного попадания —'), o: ['0.48', '0.92', '1.4', '0.44'], a: 1 },
  { part: 3, q: T('The mean of 2, 4, 4, 5, 10 is', 'Среднее чисел 2, 4, 4, 5, 10 равно'), o: ['4', '4.5', '5', '6'], a: 2 },
  { part: 3, q: T('The variance of 1, 3, 5, 7, 9 is', 'Дисперсия чисел 1, 3, 5, 7, 9 равна'), o: ['4', '√8', '10', '8'], a: 3 },
  { part: 3, q: T('Data x₁, …, xₙ have mean 5 and variance 2. The data 2x₁ + 1, …, 2xₙ + 1 have', 'Данные x₁, …, xₙ имеют среднее 5 и дисперсию 2. Данные 2x₁ + 1, …, 2xₙ + 1 имеют'), o: [T('mean 11, variance 8', 'среднее 11, дисперсию 8'), T('mean 11, variance 5', 'среднее 11, дисперсию 5'), T('mean 10, variance 4', 'среднее 10, дисперсию 4'), T('mean 11, variance 4', 'среднее 11, дисперсию 4')], a: 0 },
  { part: 4, q: T('X ~ N(1, σ²) and P(X > 3) = 0.2. Then P(X < −1) =', 'X ~ N(1, σ²) и P(X > 3) = 0,2. Тогда P(X < −1) ='), o: ['0.8', '0.2', '0.3', '0.6'], a: 1 },
  { part: 4, q: T('X ~ N(1, σ²) and P(X > 3) = 0.2. Then P(1 < X < 3) =', 'X ~ N(1, σ²) и P(X > 3) = 0,2. Тогда P(1 < X < 3) ='), o: ['0.2', '0.6', '0.3', '0.8'], a: 2 },
  { part: 3, q: T('The median of 3, 8, 1, 6, 5, 9 is', 'Медиана чисел 3, 8, 1, 6, 5, 9 равна'), o: ['5', '6', '7', '5.5'], a: 3 },
  { part: 2, q: T('A and B are mutually exclusive, P(A) = 0.3 and P(B) = 0.5. Then P(A or B) =', 'A и B несовместны, P(A) = 0,3 и P(B) = 0,5. Тогда P(A или B) ='), o: ['0.8', '0.15', '0.65', '0.2'], a: 0 }
];

const TOPICS = [
  [T('Classical probability 古典概型', 'Классическая вероятность 古典概型'), 1, '"The probability that the sum of the two numbers is 7 is"'],
  [T('Complement, exclusive, independent 对立 / 互斥 / 独立', 'Противоположные, несовместные, независимые 对立 / 互斥 / 独立'), 2, '"The probability that the target is hit is"'],
  [T('Mean, median, variance 平均数 / 中位数 / 方差', 'Среднее, медиана, дисперсия 平均数 / 中位数 / 方差'), 3, '"The variance of the data … is"'],
  [T('Normal distribution 正态分布', 'Нормальное распределение 正态分布'), 4, '"X ~ N(1, σ²), P(X > 3) = 0.2, then P(X < −1) ="']
];
