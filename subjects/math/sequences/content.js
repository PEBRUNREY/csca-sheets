/* Sheet: Sequences (CSCA Mathematics): general term, Sₙ, arithmetic and geometric sequences, recurrences, telescoping sums. */
const SHEET = {
  key: 'csca-math-sequences-v1',
  title: T('Investigation sheet: Sequences', 'Исследовательский лист: последовательности'),
  sub: T('CSCA Mathematics · find each rule yourself, then read it', 'CSCA, математика · найдите каждое правило сами, потом прочитайте его'),
  stats: T('Sequence questions on the exam are short calculations: find one term, find a sum, or use a "middle term" shortcut. Typical questions:',
           'Вопросы по последовательностям на экзамене — короткие вычисления: найти член, найти сумму или воспользоваться приёмом «среднего члена». Типичные вопросы:'),
  symbols: T('Symbols: aₙ is the n-th term, a₁ the first term, Sₙ = a₁ + a₂ + … + aₙ the sum of the first n terms, d the common difference, q the common ratio. Type fractions like 9/10.',
             'Обозначения: aₙ — n-й член, a₁ — первый член, Sₙ = a₁ + a₂ + … + aₙ — сумма первых n членов, d — разность, q — знаменатель. Дроби вводите так: 9/10.')
};

const KIND = [{ k: 'ar', en: 'arithmetic', ru: 'арифметическая' }, { k: 'ge', en: 'geometric', ru: 'геометрическая' }, { k: 'no', en: 'neither', ru: 'ни та, ни другая' }];

const PARTS = [
/* ================= PART 1 ================= */
{ id: 1, title: T('Terms, formulas and sums', 'Члены, формулы и суммы'),
  intro: T('A sequence 数列 is a list of numbers a₁, a₂, a₃, … A general-term formula 通项公式 gives aₙ straight from n.',
           'Последовательность 数列 — это список чисел a₁, a₂, a₃, … Формула общего члена 通项公式 даёт aₙ сразу по номеру n.'),
  items: [
  { t: 'task', id: '1.1', title: T('From formula to terms', 'От формулы к членам'),
    text: T('Fill in the first five terms.', 'Заполните первые пять членов.'),
    parts: [{ k: 'table', head: ['n', '1', '2', '3', '4', '5'], rows: [
      ['aₙ = 2n − 1', { a: '1' }, { a: '3' }, { a: '5' }, { a: '7' }, { a: '9' }],
      ['aₙ = n²', { a: '1' }, { a: '4' }, { a: '9' }, { a: '16' }, { a: '25' }],
      ['aₙ = (−1)ⁿ / n', { a: '-1' }, { a: '1/2' }, { a: '-1/3' }, { a: '1/4' }, { a: '-1/5' }]] }],
    hint: T('(−1)ⁿ is −1 when n is odd and 1 when n is even.', '(−1)ⁿ равно −1 при нечётном n и 1 при чётном.') },
  { t: 'task', id: '1.2', title: T('From terms to formula', 'От членов к формуле'),
    text: T('Guess the pattern, then answer.', 'Угадайте закономерность и ответьте.'),
    parts: [{ k: 'blanks', lines: [
      [T('3, 7, 11, 15, … The 10th term is ', '3, 7, 11, 15, … Десятый член равен '), { a: '39', w: 3 }],
      [T('1/2, 1/4, 1/8, 1/16, … The 6th term is ', '1/2, 1/4, 1/8, 1/16, … Шестой член равен '), { a: '1/64', w: 4 }],
      [T('1, −1/2, 1/3, −1/4, … The 7th term is ', '1, −1/2, 1/3, −1/4, … Седьмой член равен '), { a: '1/7', w: 4 }]] }],
    hint: T('First row: each term is 4 more. You need nine steps of 4 from 3.', 'Первая строка: каждый член больше на 4. От 3 нужно сделать девять шагов по 4.') },
  { t: 'task', id: '1.3', title: T('Get the terms back from the sums', 'Восстановите члены по суммам'),
    text: T('Sₙ = a₁ + … + aₙ. Then S₃ − S₂ = a₃. Fill in the tables.', 'Sₙ = a₁ + … + aₙ. Тогда S₃ − S₂ = a₃. Заполните таблицы.'),
    parts: [
      { k: 'table', head: ['n', '1', '2', '3', '4'], rows: [['Sₙ = n²', { a: '1' }, { a: '4' }, { a: '9' }, { a: '16' }], ['aₙ', { a: '1' }, { a: '3' }, { a: '5' }, { a: '7' }]] },
      { k: 'table', head: ['n', '1', '2', '3', '4'], rows: [['Sₙ = n² + 1', { a: '2' }, { a: '5' }, { a: '10' }, { a: '17' }], ['aₙ', { a: '2' }, { a: '3' }, { a: '5' }, { a: '7' }]] },
      { k: 'open', lines: [{ q: T('In the second table, does aₙ = 2n − 1 work for every n?', 'Во второй таблице работает ли aₙ = 2n − 1 при всех n?'), a: T('No. It works for n ≥ 2, but a₁ = S₁ = 2, not 1.', 'Нет. Она работает при n ≥ 2, но a₁ = S₁ = 2, а не 1.') }] }],
    hint: T('a₁ = S₁ always. a₂ = S₂ − S₁.', 'Всегда a₁ = S₁. a₂ = S₂ − S₁.') },
  { t: 'notice', id: 'n1', rule: T('a₁ = S₁, and aₙ = Sₙ − Sₙ₋₁ for n ≥ 2. Always check n = 1 separately.', 'a₁ = S₁ и aₙ = Sₙ − Sₙ₋₁ при n ≥ 2. Всегда проверяйте n = 1 отдельно.') }
  ]},

/* ================= PART 2 ================= */
{ id: 2, title: T('Arithmetic sequences', 'Арифметические прогрессии'),
  intro: T('In an arithmetic sequence 等差数列 you add the same number d (the common difference 公差) every step.', 'В арифметической прогрессии 等差数列 на каждом шаге прибавляется одно и то же число d (разность 公差).'),
  items: [
  { t: 'task', id: '2.1', title: T('Differences', 'Разности'),
    text: T('Write the difference between each term and the one before it.', 'Запишите разность между каждым членом и предыдущим.'),
    parts: [{ k: 'table', head: [T('Sequence', 'Последовательность'), 'a₂ − a₁', 'a₃ − a₂', 'a₄ − a₃', 'a₅ − a₄'], rows: [
      ['3, 7, 11, 15, 19', { a: '4' }, { a: '4' }, { a: '4' }, { a: '4' }],
      ['20, 17, 14, 11, 8', { a: '-3' }, { a: '-3' }, { a: '-3' }, { a: '-3' }],
      ['1, 4, 9, 16, 25', { a: '3' }, { a: '5' }, { a: '7' }, { a: '9' }]] },
      { k: 'blanks', lines: [[T('Which row is NOT arithmetic? ', 'Какая строка НЕ является арифметической прогрессией? '), { a: '1, 4, 9, 16, 25', sel: ['3, 7, 11, 15, 19', '20, 17, 14, 11, 8', '1, 4, 9, 16, 25'] }]] }],
    hint: T('7 − 3 = 4. 17 − 20 = −3.', '7 − 3 = 4. 17 − 20 = −3.') },
  { t: 'task', id: '2.2', title: T('Count the steps', 'Посчитайте шаги'),
    text: T('3, 7, 11, … To reach a₁₀ from a₁ you take 9 steps of 4.', '3, 7, 11, … Чтобы дойти от a₁ до a₁₀, нужно сделать 9 шагов по 4.'),
    parts: [{ k: 'blanks', lines: [['a₁₀ = 3 + 9·4 = ', { a: '39', w: 3 }, '   a₁₀₀ = ', { a: '399', w: 4 }, '   aₙ = 3 + (n − 1)·4 = ', { a: '4n − 1', sel: ['4n + 3', '4n − 1', '3n + 4'] }]] }],
    hint: T('From a₁ to aₙ there are n − 1 steps. Simplify 3 + 4n − 4.', 'От a₁ до aₙ — n − 1 шагов. Упростите 3 + 4n − 4.') },
  { t: 'notice', id: 'n2', rule: T('Arithmetic sequence: aₙ = a₁ + (n − 1)d. More generally aₙ = aₘ + (n − m)d.', 'Арифметическая прогрессия: aₙ = a₁ + (n − 1)d. В общем виде aₙ = aₘ + (n − m)d.') },
  { t: 'task', id: '2.3', title: T('Pairs with the same total', 'Пары с одинаковой суммой'),
    text: T('Use 3, 7, 11, 15, 19 (a₁ to a₅).', 'Используйте 3, 7, 11, 15, 19 (от a₁ до a₅).'),
    parts: [{ k: 'blanks', lines: [['a₁ + a₅ = ', { a: '22', w: 3 }, '   a₂ + a₄ = ', { a: '22', w: 3 }, '   2a₃ = ', { a: '22', w: 3 }]] }],
    hint: T('The numbers 1 + 5, 2 + 4 and 3 + 3 are all 6.', 'Суммы номеров 1 + 5, 2 + 4 и 3 + 3 все равны 6.') },
  { t: 'notice', id: 'n2b', rule: T('In an arithmetic sequence, if m + n = p + q then aₘ + aₙ = aₚ + a_q. In particular a₁ + a₉ = 2a₅.', 'В арифметической прогрессии, если m + n = p + q, то aₘ + aₙ = aₚ + a_q. В частности, a₁ + a₉ = 2a₅.') },
  { t: 'task', id: '2.4', title: T('Gauss\'s trick', 'Приём Гаусса'),
    text: T('S = 1 + 2 + … + 100. Write the sum again backwards under it and add the columns: every column is 1 + 100 = 101.', 'S = 1 + 2 + … + 100. Запишите сумму ещё раз в обратном порядке под ней и сложите столбцы: каждый столбец равен 1 + 100 = 101.'),
    parts: [{ k: 'blanks', lines: [
      [T('There are 100 columns, so 2S = ', 'Столбцов 100, поэтому 2S = '), { a: '10100', w: 5 }, ' , S = ', { a: '5050', w: 5 }],
      [T('Now 3 + 7 + … + 39 (the first 10 terms of task 2.2): S₁₀ = 10·(3 + 39)/2 = ', 'Теперь 3 + 7 + … + 39 (первые 10 членов из задания 2.2): S₁₀ = 10·(3 + 39)/2 = '), { a: '210', w: 4 }]] }],
    hint: T('S = (number of terms) × (first + last) ÷ 2.', 'S = (число членов) × (первый + последний) ÷ 2.') },
  { t: 'rule', label: T('Rule', 'Правило'), text: T('Sₙ = n(a₁ + aₙ)/2 = na₁ + n(n − 1)d/2.', 'Sₙ = n(a₁ + aₙ)/2 = na₁ + n(n − 1)d/2.') },
  { t: 'task', id: '2.5', title: T('Try it: the exam shortcut', 'Попробуйте сами: приём для экзамена'),
    text: T('In an arithmetic sequence a₃ + a₇ = 10. You do not know a₁ or d, and you do not need them.', 'В арифметической прогрессии a₃ + a₇ = 10. a₁ и d неизвестны, и они не нужны.'),
    parts: [{ k: 'blanks', lines: [
      ['a₅ = ', { a: '5', w: 3 }, T('   (because 3 + 7 = 5 + 5)', '   (потому что 3 + 7 = 5 + 5)')],
      ['S₉ = 9(a₁ + a₉)/2 = 9·a₅ = ', { a: '45', w: 3 }]] }],
    hint: T('a₁ + a₉ = a₃ + a₇ = 2a₅.', 'a₁ + a₉ = a₃ + a₇ = 2a₅.') },
  { t: 'task', id: '2.6', title: T('When is the sum largest?', 'Когда сумма наибольшая?'),
    text: T('a₁ = 19, d = −2. The sum keeps growing while the terms are positive.', 'a₁ = 19, d = −2. Сумма растёт, пока члены положительны.'),
    parts: [{ k: 'blanks', lines: [
      ['a₁₀ = ', { a: '1', w: 3 }, '   a₁₁ = ', { a: '-1', w: 3 }],
      [T('Sₙ is largest for n = ', 'Sₙ наибольшая при n = '), { a: '10', w: 3 }, T(', and that largest sum is ', ', и эта наибольшая сумма равна '), { a: '100', w: 4 }]] }],
    hint: T('a₁₀ = 19 + 9·(−2). S₁₀ = 10·(19 + 1)/2.', 'a₁₀ = 19 + 9·(−2). S₁₀ = 10·(19 + 1)/2.') }
  ]},

/* ================= PART 3 ================= */
{ id: 3, title: T('Geometric sequences', 'Геометрические прогрессии'),
  intro: T('In a geometric sequence 等比数列 you multiply by the same number q (the common ratio 公比) every step.', 'В геометрической прогрессии 等比数列 на каждом шаге умножают на одно и то же число q (знаменатель 公比).'),
  items: [
  { t: 'task', id: '3.1', title: T('Ratios', 'Отношения'),
    text: T('Divide each term by the one before it.', 'Разделите каждый член на предыдущий.'),
    parts: [{ k: 'table', head: [T('Sequence', 'Последовательность'), 'a₂ / a₁', 'a₃ / a₂', 'a₄ / a₃'], rows: [
      ['2, 6, 18, 54', { a: '3' }, { a: '3' }, { a: '3' }],
      ['16, 8, 4, 2', { a: '1/2' }, { a: '1/2' }, { a: '1/2' }],
      ['1, −2, 4, −8', { a: '-2' }, { a: '-2' }, { a: '-2' }]] }],
    hint: T('6 ÷ 2 = 3. 8 ÷ 16 = 1/2.', '6 ÷ 2 = 3. 8 ÷ 16 = 1/2.') },
  { t: 'task', id: '3.2', title: T('Count the multiplications', 'Посчитайте умножения'),
    text: T('2, 6, 18, … To reach a₅ from a₁ you multiply by 3 four times.', '2, 6, 18, … Чтобы дойти от a₁ до a₅, нужно четыре раза умножить на 3.'),
    parts: [{ k: 'blanks', lines: [['a₅ = 2·3⁴ = ', { a: '162', w: 4 }, '   a₇ = ', { a: '1458', w: 5 }]] }],
    hint: T('3⁴ = 81. a₇ = 2·3⁶.', '3⁴ = 81. a₇ = 2·3⁶.') },
  { t: 'notice', id: 'n3', rule: T('Geometric sequence (q ≠ 0, no term is 0): aₙ = a₁·qⁿ⁻¹. More generally aₙ = aₘ·qⁿ⁻ᵐ.', 'Геометрическая прогрессия (q ≠ 0, ни один член не равен 0): aₙ = a₁·qⁿ⁻¹. В общем виде aₙ = aₘ·qⁿ⁻ᵐ.') },
  { t: 'task', id: '3.3', title: T('Pairs with the same product', 'Пары с одинаковым произведением'),
    text: T('Use 1, 2, 4, 8, 16, 32 (a₁ to a₆).', 'Используйте 1, 2, 4, 8, 16, 32 (от a₁ до a₆).'),
    parts: [{ k: 'blanks', lines: [['a₂·a₆ = ', { a: '64', w: 3 }, '   a₃·a₅ = ', { a: '64', w: 3 }, '   a₄² = ', { a: '64', w: 3 }]] },
      { k: 'open', lines: [{ q: T('What rule do you guess? Compare it with task 2.3.', 'Какое правило вы предполагаете? Сравните с заданием 2.3.'), a: T('If m + n = p + q then aₘ·aₙ = aₚ·a_q. Arithmetic: sums; geometric: products.', 'Если m + n = p + q, то aₘ·aₙ = aₚ·a_q. Арифметическая: суммы; геометрическая: произведения.') }] }],
    hint: T('2 + 6 = 3 + 5 = 4 + 4.', '2 + 6 = 3 + 5 = 4 + 4.') },
  { t: 'task', id: '3.4', title: T('Multiply and subtract', 'Умножить и вычесть'),
    text: T('S = 1 + 2 + 4 + … + 2⁹. Then 2S = 2 + 4 + … + 2⁹ + 2¹⁰. Subtract: almost everything cancels.', 'S = 1 + 2 + 4 + … + 2⁹. Тогда 2S = 2 + 4 + … + 2⁹ + 2¹⁰. Вычтите: почти всё сокращается.'),
    parts: [{ k: 'blanks', lines: [['2S − S = 2¹⁰ − 1, ', T('so S = ', 'поэтому S = '), { a: '1023', w: 5 }]] }],
    hint: T('2¹⁰ = 1024.', '2¹⁰ = 1024.') },
  { t: 'rule', label: T('Rule', 'Правило'), text: T('For q ≠ 1: Sₙ = a₁(1 − qⁿ)/(1 − q) = a₁(qⁿ − 1)/(q − 1). For q = 1: Sₙ = na₁.', 'При q ≠ 1: Sₙ = a₁(1 − qⁿ)/(1 − q) = a₁(qⁿ − 1)/(q − 1). При q = 1: Sₙ = na₁.') },
  { t: 'task', id: '3.5', title: T('Try it', 'Попробуйте сами'),
    text: T('Geometric sequences.', 'Геометрические прогрессии.'),
    parts: [{ k: 'blanks', lines: [
      [T('(a) a₁ = 3, q = 2. S₅ = ', '(a) a₁ = 3, q = 2. S₅ = '), { a: '93', w: 3 }],
      [T('(b) a₂ = 2, a₅ = 16. Then q³ = ', '(b) a₂ = 2, a₅ = 16. Тогда q³ = '), { a: '8', w: 3 }, ', q = ', { a: '2', w: 3 }, ', a₁ = ', { a: '1', w: 3 }],
      [T('(c) All terms positive and a₃·a₇ = 16. Then a₅ = ', '(c) Все члены положительны и a₃·a₇ = 16. Тогда a₅ = '), { a: '4', w: 3 }]] }],
    hint: T('(a) S₅ = 3(2⁵ − 1)/(2 − 1). (c) a₃·a₇ = a₅².', '(a) S₅ = 3(2⁵ − 1)/(2 − 1). (c) a₃·a₇ = a₅².') }
  ]},

/* ================= PART 4 ================= */
{ id: 4, title: T('Recurrences and telescoping sums', 'Рекуррентные формулы и телескопические суммы'),
  intro: T('Sometimes a sequence is given by a rule from one term to the next (递推公式). And some sums collapse when each term is split into two pieces (裂项相消).', 'Иногда последовательность задаётся правилом перехода от члена к следующему (递推公式). А некоторые суммы «схлопываются», если разбить каждый член на две части (裂项相消).'),
  items: [
  { t: 'task', id: '4.1', title: T('Step by step', 'Шаг за шагом'),
    text: T('Compute the first terms and recognise the type.', 'Вычислите первые члены и определите тип.'),
    parts: [{ k: 'table', head: [T('Rule', 'Правило'), 'a₁', 'a₂', 'a₃', 'a₄', T('type', 'тип')], rows: [
      ['a₁ = 1, aₙ₊₁ = aₙ + 3', '1', { a: '4' }, { a: '7' }, { a: '10' }, { a: 'ar', sel: KIND }],
      ['a₁ = 1, aₙ₊₁ = 3aₙ', '1', { a: '3' }, { a: '9' }, { a: '27' }, { a: 'ge', sel: KIND }],
      ['a₁ = 1, aₙ₊₁ = aₙ + n', '1', { a: '2' }, { a: '4' }, { a: '7' }, { a: 'no', sel: KIND }]] },
      { k: 'blanks', lines: [[T('In the first row a₂₀ = ', 'В первой строке a₂₀ = '), { a: '58', w: 3 }]] }],
    hint: T('Third row: a₂ = a₁ + 1, a₃ = a₂ + 2, a₄ = a₃ + 3.', 'Третья строка: a₂ = a₁ + 1, a₃ = a₂ + 2, a₄ = a₃ + 3.') },
  { t: 'task', id: '4.2', title: T('Split the fraction', 'Разбейте дробь'),
    text: T('Check that 1/(n(n + 1)) = 1/n − 1/(n + 1). Then add up the first few terms.', 'Проверьте, что 1/(n(n + 1)) = 1/n − 1/(n + 1). Затем сложите первые несколько членов.'),
    parts: [
      { k: 'table', head: ['n', '1', '2', '3', '4'], rows: [['1/(n(n + 1))', { a: '1/2' }, { a: '1/6' }, { a: '1/12' }, { a: '1/20' }], ['Sₙ', { a: '1/2' }, { a: '2/3' }, { a: '3/4' }, { a: '4/5' }]] },
      { k: 'blanks', lines: [[T('Guess: Sₙ = ', 'Догадка: Sₙ = '), { a: 'n/(n+1)', sel: ['n/(n+1)', '1/(n+1)', '(n+1)/n'] }, T('.   So 1/(1·2) + 1/(2·3) + … + 1/(99·100) = ', '.   Значит, 1/(1·2) + 1/(2·3) + … + 1/(99·100) = '), { a: '99/100', w: 5 }]] }],
    hint: T('S₂ = 1/2 + 1/6 = 4/6 = 2/3. In (1 − 1/2) + (1/2 − 1/3) + … the middle pieces cancel.', 'S₂ = 1/2 + 1/6 = 4/6 = 2/3. В (1 − 1/2) + (1/2 − 1/3) + … средние части сокращаются.') },
  { t: 'notice', id: 'n4', rule: T('1/(n(n + 1)) = 1/n − 1/(n + 1), so the sum of the first n terms is 1 − 1/(n + 1) = n/(n + 1). Only the first and the last piece survive.', '1/(n(n + 1)) = 1/n − 1/(n + 1), поэтому сумма первых n членов равна 1 − 1/(n + 1) = n/(n + 1). Остаются только первый и последний кусочки.') }
  ]}
];

const EXAM = [
  { part: 2, q: T('In an arithmetic sequence a₁ = 2 and d = 3. Then a₁₀ =', 'В арифметической прогрессии a₁ = 2 и d = 3. Тогда a₁₀ ='), o: ['32', '29', '30', '27'], a: 1 },
  { part: 2, q: T('In an arithmetic sequence a₃ + a₇ = 10. Then S₉ =', 'В арифметической прогрессии a₃ + a₇ = 10. Тогда S₉ ='), o: ['45', '90', '50', '40'], a: 0 },
  { part: 2, q: T('In an arithmetic sequence a₁ = 1 and a₅ = 9. Then S₅ =', 'В арифметической прогрессии a₁ = 1 и a₅ = 9. Тогда S₅ ='), o: ['45', '20', '25', '50'], a: 2 },
  { part: 3, q: T('In a geometric sequence a₁ = 1 and q = 2. Then a₆ =', 'В геометрической прогрессии a₁ = 1 и q = 2. Тогда a₆ ='), o: ['64', '12', '16', '32'], a: 3 },
  { part: 3, q: T('In a geometric sequence a₂ = 2 and a₅ = 16. Then q =', 'В геометрической прогрессии a₂ = 2 и a₅ = 16. Тогда q ='), o: ['2', '8', '4', '3'], a: 0 },
  { part: 3, q: T('In a geometric sequence of positive terms a₃·a₇ = 16. Then a₅ =', 'В геометрической прогрессии с положительными членами a₃·a₇ = 16. Тогда a₅ ='), o: ['8', '4', '±4', '2'], a: 1 },
  { part: 3, q: '1 + 3 + 3² + … + 3⁵ =', o: ['243', '121', '364', '729'], a: 2 },
  { part: 1, q: T('Sₙ = n² + n. Then a₅ =', 'Sₙ = n² + n. Тогда a₅ ='), o: ['30', '12', '8', '10'], a: 3 },
  { part: 4, q: '1/(1·2) + 1/(2·3) + … + 1/(9·10) =', o: ['9/10', '1/10', '10/11', '1'], a: 0 },
  { part: 1, q: T('A general-term formula of 1, −1/2, 1/3, −1/4, … is', 'Формула общего члена для 1, −1/2, 1/3, −1/4, … —'), o: ['aₙ = (−1)ⁿ/n', 'aₙ = (−1)ⁿ⁺¹/n', 'aₙ = 1/n', 'aₙ = (−1)ⁿ⁺¹/(n + 1)'], a: 1 },
  { part: 2, q: T('In an arithmetic sequence a₁ = 19 and d = −2. Sₙ is largest when n =', 'В арифметической прогрессии a₁ = 19 и d = −2. Sₙ наибольшая при n ='), o: ['9', '11', '10', '19'], a: 2 },
  { part: 4, q: T('a₁ = 1 and aₙ₊₁ = aₙ + 3. Then a₂₀ =', 'a₁ = 1 и aₙ₊₁ = aₙ + 3. Тогда a₂₀ ='), o: ['61', '60', '57', '58'], a: 3 }
];

const TOPICS = [
  [T('General term, aₙ from Sₙ 通项公式', 'Общий член, aₙ из Sₙ 通项公式'), 1, '"Sₙ = n² + n, then a₅ ="'],
  [T('Arithmetic sequences 等差数列', 'Арифметические прогрессии 等差数列'), 2, '"In the arithmetic sequence {aₙ}, a₃ + a₇ = 10, then S₉ ="'],
  [T('Geometric sequences 等比数列', 'Геометрические прогрессии 等比数列'), 3, '"In the geometric sequence {aₙ}, a₂ = 2, a₅ = 16, then the common ratio q ="'],
  [T('Recurrences, telescoping sums 递推 / 裂项相消', 'Рекуррентные формулы, телескопические суммы 递推 / 裂项相消'), 4, '"1/(1×2) + 1/(2×3) + … + 1/(9×10) ="']
];
