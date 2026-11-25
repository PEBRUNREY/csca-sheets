/* Sheet: Sets, logic and inequalities (CSCA Mathematics). Uses helpers from engine/ui.js. */
const SHEET = {
  key: 'csca-math-sets-inequalities-v1',
  title: T('Investigation sheet: Sets and inequalities', 'Исследовательский лист: множества и неравенства'),
  sub: T('CSCA Mathematics · find each rule yourself, then read it', 'CSCA, математика · найдите каждое правило сами, потом прочитайте его'),
  stats: T('Sets and inequalities usually open the CSCA Mathematics paper, and the other topics use them all the time: a domain is a set, a solution of an inequality is an interval. Typical questions:',
           'Множества и неравенства обычно открывают работу CSCA по математике, и все остальные темы постоянно ими пользуются: область определения — это множество, решение неравенства — промежуток. Типичные вопросы:'),
  symbols: T('Symbols: ∈ "belongs to", ∉ "does not belong to", ⊆ "is a subset of", ∩ intersection, ∪ union, ∁ complement, ∅ the empty set. N = natural numbers (0, 1, 2, …), Z = integers, Q = rational numbers, R = real numbers. Type fractions like 1/2.',
             'Обозначения: ∈ «принадлежит», ∉ «не принадлежит», ⊆ «является подмножеством», ∩ пересечение, ∪ объединение, ∁ дополнение, ∅ пустое множество. N — натуральные числа (0, 1, 2, …), Z — целые, Q — рациональные, R — действительные. Дроби вводите так: 1/2.')
};

SHEET.figs = ({ h }) => ({
  venn() {
    return h('div', { html: `<svg class="geo" viewBox="0 0 360 200" role="img" aria-label="Venn diagram of A and B inside U">
      <rect x="6" y="6" width="348" height="188" rx="10" fill="none" stroke="currentColor" style="stroke:var(--muted)"/>
      <circle cx="140" cy="102" r="70" class="acc"/><circle cx="220" cy="102" r="70" class="acc2"/>
      <text x="16" y="26">U</text><text x="92" y="40">A</text><text x="258" y="40">B</text>
      <text x="100" y="108">1</text><text x="172" y="96">2</text><text x="180" y="122">3</text><text x="242" y="96">4</text><text x="250" y="124">5</text><text x="320" y="176">6</text>
    </svg>` });
  },
  parab() {
    return h('div', { html: `<svg class="geo" viewBox="0 0 360 220" role="img" aria-label="Parabola y = x² − x − 6 crossing the x-axis at −2 and 3">
      <line x1="10" y1="120" x2="350" y2="120" style="stroke:var(--muted)"/>
      <path d="M 52 22 Q 180 290 308 22" class="acc"/>
      <circle cx="116" cy="120" r="4" class="dot"/><circle cx="244" cy="120" r="4" class="dot"/>
      <text x="104" y="140">−2</text><text x="240" y="140">3</text>
      <text x="60" y="110" class="mt">+</text><text x="300" y="110" class="mt">+</text><text x="176" y="160" class="mt">−</text>
      <text x="268" y="40">y = x² − x − 6</text>
    </svg>` });
  }
});

const PARTS = [
/* ================= PART 1 ================= */
{ id: 1, title: T('What is a set?', 'Что такое множество?'),
  intro: T('A set 集合 is a collection of different objects, its elements 元素. We write a ∈ A when a is an element of A. A set can be written as a list {1, 2, 3} or by a rule {x | x² = 4} ("all x such that x² = 4").',
           'Множество 集合 — это набор различных объектов, его элементов 元素. Пишем a ∈ A, если a — элемент A. Множество можно записать списком {1, 2, 3} или правилом {x | x² = 4} («все x, такие что x² = 4»).'),
  items: [
  { t: 'task', id: '1.1', title: T('Turn a rule into a list', 'Из правила — в список'),
    text: T('A = {x | x² − 3x + 2 = 0}. Test each number: put it into x² − 3x + 2. The number is in A only when the result is 0.', 'A = {x | x² − 3x + 2 = 0}. Проверьте каждое число: подставьте его в x² − 3x + 2. Число лежит в A, только если получилось 0.'),
    parts: [
      { k: 'table', head: ['x', '0', '1', '2', '3'], rows: [['x² − 3x + 2', { a: '2' }, { a: '0' }, { a: '0' }, { a: '2' }], [T('in A?', 'в A?'), { a: 'no', sel: YN }, { a: 'yes', sel: YN }, { a: 'yes', sel: YN }, { a: 'no', sel: YN }]] },
      { k: 'blanks', lines: [[T('So A = { ', 'Значит, A = { '), { a: '1', w: 2 }, ' , ', { a: '2', w: 2 }, ' }. ', T('How many elements does A have? ', 'Сколько элементов в A? '), { a: '2', w: 2 }]] }],
    hint: T('For x = 3: 9 − 9 + 2 = 2, not 0. Write the smaller element first.', 'При x = 3: 9 − 9 + 2 = 2, а не 0. Меньший элемент пишите первым.') },
  { t: 'task', id: '1.2', title: T('Which number sets?', 'Какие числовые множества?'),
    text: T('N = {0, 1, 2, 3, …}, Z = all integers, Q = all fractions of integers, R = all real numbers (the whole number line). Decide.', 'N = {0, 1, 2, 3, …}, Z — все целые числа, Q — все дроби из целых чисел, R — все действительные числа (вся числовая прямая). Решите.'),
    parts: [{ k: 'table', head: [T('Number', 'Число'), '∈ N ?', '∈ Z ?', '∈ Q ?', '∈ R ?'], rows: [
      ['−2', { a: 'no', sel: YN }, { a: 'yes', sel: YN }, { a: 'yes', sel: YN }, { a: 'yes', sel: YN }],
      ['1/2', { a: 'no', sel: YN }, { a: 'no', sel: YN }, { a: 'yes', sel: YN }, { a: 'yes', sel: YN }],
      ['√2', { a: 'no', sel: YN }, { a: 'no', sel: YN }, { a: 'no', sel: YN }, { a: 'yes', sel: YN }],
      ['0', { a: 'yes', sel: YN }, { a: 'yes', sel: YN }, { a: 'yes', sel: YN }, { a: 'yes', sel: YN }]] }],
    hint: T('In Chinese textbooks 0 is a natural number. √2 cannot be written as a fraction of integers.', 'В китайских учебниках 0 — натуральное число. √2 нельзя записать дробью из целых чисел.') },
  { t: 'rule', label: T('Rule', 'Правило'), text: T('N ⊆ Z ⊆ Q ⊆ R. Writing B ⊆ A (B is a subset 子集 of A) means every element of B is also in A. The empty set ∅ has no elements and is a subset of every set.', 'N ⊆ Z ⊆ Q ⊆ R. Запись B ⊆ A (B — подмножество 子集 A) означает, что каждый элемент B лежит и в A. Пустое множество ∅ не имеет элементов и является подмножеством любого множества.') },
  { t: 'task', id: '1.3', title: T('Count the subsets', 'Посчитайте подмножества'),
    text: T('List every subset (do not forget ∅ and the set itself), then count. The subsets of {a} are ∅ and {a}: that is 2.', 'Выпишите все подмножества (не забудьте ∅ и само множество), затем посчитайте. Подмножества {a}: ∅ и {a}, то есть 2.'),
    parts: [{ k: 'table', head: [T('Set', 'Множество'), T('elements n', 'элементов n'), T('subsets', 'подмножеств')], rows: [['{a}', '1', '2'], ['{a, b}', '2', { a: '4' }], ['{a, b, c}', '3', { a: '8' }]] },
      { k: 'blanks', lines: [[T('Each time one element is added, the number of subsets is multiplied by ', 'Каждый раз, когда добавляется один элемент, число подмножеств умножается на '), { a: '2', w: 2 }]] }],
    hint: T('{a, b}: ∅, {a}, {b}, {a, b}. For {a, b, c}, take each of those four, once without c and once with c.', '{a, b}: ∅, {a}, {b}, {a, b}. Для {a, b, c} возьмите каждое из этих четырёх: один раз без c и один раз с c.') },
  { t: 'notice', id: 'n1', rule: T('A set with n elements has 2ⁿ subsets. Without the set itself there are 2ⁿ − 1 proper subsets 真子集. Without ∅ as well there are 2ⁿ − 2 non-empty proper subsets.', 'У множества из n элементов 2ⁿ подмножеств. Без самого множества — 2ⁿ − 1 собственных подмножеств 真子集. Если убрать ещё и ∅, остаётся 2ⁿ − 2 непустых собственных подмножеств.') },
  { t: 'task', id: '1.4', title: T('Try it', 'Попробуйте сами'),
    text: T('A = {x ∈ N | x < 4}.', 'A = {x ∈ N | x < 4}.'),
    parts: [{ k: 'blanks', lines: [
      [T('A has ', 'В A '), { a: '4', w: 2 }, T(' elements (remember 0).', ' элемента (не забудьте 0).')],
      [T('Number of subsets: ', 'Число подмножеств: '), { a: '16', w: 3 }, T('   proper subsets: ', '   собственных подмножеств: '), { a: '15', w: 3 }]] },
      { k: 'mc', q: T('Which statement is true?', 'Какое утверждение верно?'), opts: ['{1} ∈ A', '0 ∉ A', '∅ ⊆ A', '4 ∈ A'], a: 2 }],
    hint: T('A = {0, 1, 2, 3}. ∈ links an element to a set; ⊆ links a set to a set.', 'A = {0, 1, 2, 3}. ∈ связывает элемент и множество, ⊆ связывает два множества.') }
  ]},

/* ================= PART 2 ================= */
{ id: 2, title: T('Intersection, union, complement', 'Пересечение, объединение, дополнение'),
  intro: T('Three operations make new sets from old ones: the intersection 交集 A ∩ B, the union 并集 A ∪ B and the complement 补集 ∁ᵤA. Find out what each one keeps.',
           'Три операции строят новые множества из данных: пересечение 交集 A ∩ B, объединение 并集 A ∪ B и дополнение 补集 ∁ᵤA. Выясните, что оставляет каждая из них.'),
  items: [
  { t: 'task', id: '2.1', title: T('Read the diagram', 'Прочитайте диаграмму'),
    text: T('U = {1, 2, 3, 4, 5, 6}, A = {1, 2, 3}, B = {2, 3, 4, 5}. The diagram shows where each number lives. Here are the three new sets: A ∩ B = {2, 3}, A ∪ B = {1, 2, 3, 4, 5}, ∁ᵤA = {4, 5, 6}. Tick which ones each number belongs to.', 'U = {1, 2, 3, 4, 5, 6}, A = {1, 2, 3}, B = {2, 3, 4, 5}. Диаграмма показывает, где лежит каждое число. Вот три новых множества: A ∩ B = {2, 3}, A ∪ B = {1, 2, 3, 4, 5}, ∁ᵤA = {4, 5, 6}. Отметьте, каким из них принадлежит каждое число.'),
    parts: [{ k: 'fig', id: 'venn' },
      { k: 'table', head: [T('Number', 'Число'), T('in A?', 'в A?'), T('in B?', 'в B?'), 'A ∩ B', 'A ∪ B', '∁ᵤA'], rows: [
        ['1', '✓', '✗', { a: 'no', sel: YN }, { a: 'yes', sel: YN }, { a: 'no', sel: YN }],
        ['3', '✓', '✓', { a: 'yes', sel: YN }, { a: 'yes', sel: YN }, { a: 'no', sel: YN }],
        ['4', '✗', '✓', { a: 'no', sel: YN }, { a: 'yes', sel: YN }, { a: 'yes', sel: YN }],
        ['6', '✗', '✗', { a: 'no', sel: YN }, { a: 'no', sel: YN }, { a: 'yes', sel: YN }]] }],
    hint: T('Look up each number in the three lists given in the task.', 'Найдите каждое число в трёх списках из условия.') },
  { t: 'notice', id: 'n2', rule: T('A ∩ B keeps the elements that are in A **and** in B. A ∪ B keeps the elements in A **or** B (or both). ∁ᵤA keeps the elements of U that are **not** in A.', 'A ∩ B оставляет элементы, которые лежат в A **и** в B. A ∪ B оставляет элементы, лежащие в A **или** в B (или в обоих). ∁ᵤA оставляет элементы U, которые **не** лежат в A.') },
  { t: 'task', id: '2.2', title: T('Sets of real numbers', 'Множества действительных чисел'),
    text: T('A = {x | −1 < x ≤ 3}, B = {x | x > 2}, U = R. Draw both on a number line, then fill in the gaps. Use the drop-downs for the type of bracket.', 'A = {x | −1 < x ≤ 3}, B = {x | x > 2}, U = R. Нарисуйте оба на числовой прямой, затем заполните пропуски. В выпадающих списках выберите вид скобки.'),
    parts: [{ k: 'blanks', lines: [
      ['A ∩ B = ', { a: '(', sel: ['(', '['] }, ' ', { a: '2', w: 2 }, ' , ', { a: '3', w: 2 }, ' ', { a: ']', sel: [')', ']'] }],
      ['A ∪ B = ', { a: '(', sel: ['(', '['] }, ' ', { a: '-1', w: 2 }, ' , +∞)'],
      ['∁ᵤA = {x | x ', { a: '≤', sel: ['<', '≤'] }, ' −1 ', T('or', 'или'), ' x ', { a: '>', sel: ['>', '≥'] }, ' 3}']] }],
    hint: T('3 belongs to A, so it stays in A ∩ B. −1 is not in A, so the complement must contain −1.', '3 лежит в A, поэтому остаётся в A ∩ B. −1 не лежит в A, значит, дополнение содержит −1.') },
  { t: 'task', id: '2.3', title: T('Counting people', 'Считаем людей'),
    text: T('In a class of 30 students, 18 like maths, 15 like physics and 8 like both.', 'В классе 30 учеников: 18 любят математику, 15 — физику, 8 — оба предмета.'),
    parts: [{ k: 'blanks', lines: [
      [T('Only maths: ', 'Только математику: '), { a: '10', w: 3 }, T('   only physics: ', '   только физику: '), { a: '7', w: 3 }],
      [T('At least one of the two: ', 'Хотя бы один из двух: '), { a: '25', w: 3 }, T('   neither: ', '   ни один: '), { a: '5', w: 3 }]] },
      { k: 'open', lines: [{ q: T('Why is 18 + 15 = 33 the wrong answer for "at least one"?', 'Почему 18 + 15 = 33 — неверный ответ для «хотя бы один»?'), a: T('The 8 students who like both are counted twice, so subtract them once: 18 + 15 − 8 = 25.', '8 учеников, любящих оба предмета, посчитаны дважды, поэтому их вычитают один раз: 18 + 15 − 8 = 25.') }] }],
    hint: T('Draw two overlapping circles and put 8 in the middle first.', 'Нарисуйте два пересекающихся круга и сначала впишите 8 в середину.') },
  { t: 'rule', label: T('Rule', 'Правило'), text: T('n(A ∪ B) = n(A) + n(B) − n(A ∩ B).', 'n(A ∪ B) = n(A) + n(B) − n(A ∩ B).') },
  { t: 'task', id: '2.4', title: T('Try it: a parameter', 'Попробуйте сами: параметр'),
    text: T('A = {1, 3, a}, B = {1, a²} and B ⊆ A. Then a² must equal 3 or a. Find every possible a. Remember: the elements of a set must all be different.', 'A = {1, 3, a}, B = {1, a²} и B ⊆ A. Тогда a² равно 3 или a. Найдите все возможные a. Помните: все элементы множества должны быть различны.'),
    parts: [{ k: 'open', lines: [{ q: T('Possible values of a', 'Возможные значения a'), a: T('a = √3, a = −√3 or a = 0. (a² = a also gives a = 1, but then A = {1, 3, 1} repeats 1, so a = 1 is rejected.)', 'a = √3, a = −√3 или a = 0. (a² = a даёт ещё a = 1, но тогда A = {1, 3, 1} повторяет 1, поэтому a = 1 не подходит.)') }] }],
    hint: T('Solve a² = 3 and a² = a separately, then check each answer in A and B.', 'Решите отдельно a² = 3 и a² = a, затем проверьте каждый ответ в A и B.') }
  ]},

/* ================= PART 3 ================= */
{ id: 3, title: T('Conditions: sufficient and necessary', 'Условия: достаточное и необходимое'),
  intro: T('p ⇒ q means "if p is true, then q is true". The exam asks whether p is a sufficient condition 充分条件, a necessary condition 必要条件, both 充要条件, or neither.',
           'p ⇒ q означает «если p верно, то q верно». На экзамене спрашивают, является ли p достаточным условием 充分条件, необходимым условием 必要条件, тем и другим 充要条件 или ни тем, ни другим.'),
  items: [
  { t: 'task', id: '3.1', title: T('Which way does it work?', 'В какую сторону работает?'),
    text: T('For each pair, decide if p ⇒ q is always true, and if q ⇒ p is always true. To show "no", one counterexample is enough.', 'Для каждой пары решите, всегда ли верно p ⇒ q и всегда ли верно q ⇒ p. Чтобы показать «нет», достаточно одного контрпримера.'),
    parts: [{ k: 'table', head: ['p', 'q', 'p ⇒ q ?', 'q ⇒ p ?'], rows: [
      ['x = 2', 'x² = 4', { a: 'yes', sel: YN }, { a: 'no', sel: YN }],
      ['x > 1', 'x > 3', { a: 'no', sel: YN }, { a: 'yes', sel: YN }],
      ['x + 1 = 3', 'x = 2', { a: 'yes', sel: YN }, { a: 'yes', sel: YN }],
      ['x² > 0', 'x > 0', { a: 'no', sel: YN }, { a: 'yes', sel: YN }]] }],
    hint: T('Row 1: x = −2 also gives x² = 4. Row 2: x = 2 is bigger than 1 but not bigger than 3.', 'Строка 1: x = −2 тоже даёт x² = 4. Строка 2: x = 2 больше 1, но не больше 3.') },
  { t: 'notice', id: 'n3', rule: T('If p ⇒ q, then p is **sufficient** for q, and q is **necessary** for p. If both p ⇒ q and q ⇒ p, p is necessary and sufficient (充要条件). Shortcut with sets: if the set of p is inside the set of q, then p is sufficient for q ("small ⇒ big").', 'Если p ⇒ q, то p **достаточно** для q, а q **необходимо** для p. Если верно и p ⇒ q, и q ⇒ p, p — необходимое и достаточное условие (充要条件). Приём с множествами: если множество p лежит внутри множества q, то p достаточно для q («маленькое ⇒ большое»).') },
  { t: 'task', id: '3.2', title: T('Name the condition', 'Назовите условие'),
    text: T('Use the shortcut. The set of "x > 3" is (3, +∞) and the set of "x > 1" is (1, +∞).', 'Используйте приём. Множество «x > 3» — это (3, +∞), множество «x > 1» — это (1, +∞).'),
    parts: [{ k: 'table', head: ['p', 'q', T('p is … for q', 'p — … для q')], rows: [
      ['x > 3', 'x > 1', { a: 'suf', sel: COND }],
      ['x > 1', 'x > 3', { a: 'nec', sel: COND }],
      ['x² = 1', 'x = 1', { a: 'nec', sel: COND }],
      ['∣x∣ < 2', '−2 < x < 2', { a: 'both', sel: COND }],
      ['x > 0', 'x < 1', { a: 'neither', sel: COND }]] }],
    hint: T('Ask: is the set of p inside the set of q? Is the set of q inside the set of p?', 'Спросите себя: лежит ли множество p внутри множества q? А множество q внутри множества p?') },
  { t: 'task', id: '3.3', title: T('Negating "for all" and "there exists"', 'Отрицание «для всех» и «существует»'),
    text: T('∀ means "for all" (全称量词), ∃ means "there exists" (存在量词). The statement "every student passed" is false as soon as one student failed.', '∀ значит «для всех» (全称量词), ∃ значит «существует» (存在量词). Утверждение «все ученики сдали» ложно, как только хотя бы один не сдал.'),
    parts: [
      { k: 'mc', q: T('The negation of "∀x ∈ R, x² ≥ 0" is', 'Отрицание утверждения «∀x ∈ R, x² ≥ 0» —'), opts: ['∀x ∈ R, x² < 0', '∃x ∈ R, x² < 0', '∃x ∈ R, x² ≥ 0', '∀x ∈ R, x² ≤ 0'], a: 1 },
      { k: 'mc', q: T('The negation of "∃x ∈ R, x² + 1 < 0" is', 'Отрицание утверждения «∃x ∈ R, x² + 1 < 0» —'), opts: ['∃x ∈ R, x² + 1 ≥ 0', '∀x ∈ R, x² + 1 < 0', '∃x ∈ R, x² + 1 > 0', '∀x ∈ R, x² + 1 ≥ 0'], a: 3 }],
    hint: T('Two changes: swap ∀ and ∃, and negate only the last part (< becomes ≥).', 'Два изменения: поменяйте ∀ и ∃ местами и отрицайте только последнюю часть (< становится ≥).') },
  { t: 'rule', label: T('Rule', 'Правило'), text: T('To negate a statement with a quantifier: change ∀ to ∃ (or ∃ to ∀) and negate the condition. Do not touch the set "x ∈ R".', 'Чтобы построить отрицание утверждения с квантором, замените ∀ на ∃ (или ∃ на ∀) и отрицайте условие. Множество «x ∈ R» не меняется.') }
  ]},

/* ================= PART 4 ================= */
{ id: 4, title: T('Linear and quadratic inequalities', 'Линейные и квадратные неравенства'),
  intro: T('An inequality 不等式 compares two expressions with <, ≤, > or ≥. Its solution is usually an interval. First find out which moves keep the sign.',
           'Неравенство 不等式 сравнивает два выражения знаками <, ≤, > или ≥. Его решение обычно является промежутком. Сначала выясните, какие действия сохраняют знак.'),
  items: [
  { t: 'task', id: '4.1', title: T('Which moves keep the sign?', 'Какие действия сохраняют знак?'),
    text: T('Start from the true statement 2 < 5. Do the same thing to both sides and choose the sign that makes the new statement true.', 'Начните с верного утверждения 2 < 5. Сделайте одно и то же с обеими частями и выберите знак, при котором новое утверждение верно.'),
    parts: [{ k: 'table', head: [T('Move', 'Действие'), T('Left', 'Слева'), T('Sign', 'Знак'), T('Right', 'Справа')], rows: [
      [T('add 3', 'прибавить 3'), '5', { a: '<', sel: ['<', '>'] }, '8'],
      [T('subtract 7', 'вычесть 7'), '−5', { a: '<', sel: ['<', '>'] }, '−2'],
      [T('multiply by 4', 'умножить на 4'), '8', { a: '<', sel: ['<', '>'] }, '20'],
      [T('multiply by −1', 'умножить на −1'), '−2', { a: '>', sel: ['<', '>'] }, '−5'],
      [T('divide by −2', 'разделить на −2'), '−1', { a: '>', sel: ['<', '>'] }, '−2.5']] }],
    hint: T('On a number line, −2 is to the right of −5, so −2 is bigger.', 'На числовой прямой −2 правее −5, значит, −2 больше.') },
  { t: 'notice', id: 'n4', rule: T('Adding or subtracting a number, and multiplying or dividing by a **positive** number, keep the sign. Multiplying or dividing by a **negative** number flips it.', 'Прибавление и вычитание числа, а также умножение и деление на **положительное** число сохраняют знак. Умножение и деление на **отрицательное** число меняют его на противоположный.') },
  { t: 'task', id: '4.2', title: T('The sign of a quadratic', 'Знак квадратного трёхчлена'),
    text: T('y = x² − x − 6 = (x + 2)(x − 3). Fill in the values, then read the sign.', 'y = x² − x − 6 = (x + 2)(x − 3). Заполните значения, затем определите знак.'),
    parts: [
      { k: 'fig', id: 'parab' },
      { k: 'table', head: ['x', '−3', '−2', '0', '3', '4'], rows: [['x² − x − 6', { a: '6' }, { a: '0' }, { a: '-6' }, { a: '0' }, { a: '6' }]] },
      { k: 'blanks', lines: [
        [T('y < 0 for x between ', 'y < 0 при x между '), { a: '-2', w: 3 }, T(' and ', ' и '), { a: '3', w: 3 }],
        [T('y > 0 when x < −2 or x > 3: ', 'y > 0 при x < −2 или x > 3: '), { a: 'yes', sel: YN }]] }],
    hint: T('The roots are where the graph meets the x-axis. The parabola opens upwards, so it is below the axis only between the roots.', 'Корни — это точки, где график пересекает ось x. Парабола направлена ветвями вверх, поэтому она ниже оси только между корнями.') },
  { t: 'rule', label: T('Rule', 'Правило'), text: T('For ax² + bx + c with a > 0 and two roots x₁ < x₂: it is **negative between the roots** (x₁ < x < x₂) and **positive outside** them (x < x₁ or x > x₂). If a < 0, first multiply by −1 and flip the sign. If there are no roots (b² − 4ac < 0) and a > 0, the expression is positive for every x.', 'Для ax² + bx + c при a > 0 и двух корнях x₁ < x₂: выражение **отрицательно между корнями** (x₁ < x < x₂) и **положительно вне их** (x < x₁ или x > x₂). Если a < 0, сначала умножьте на −1 и поменяйте знак. Если корней нет (b² − 4ac < 0) и a > 0, выражение положительно при всех x.') },
  { t: 'task', id: '4.3', title: T('Try it', 'Попробуйте сами'),
    text: T('Solve. Write the end points of each interval; choose the type of bracket.', 'Решите. Запишите концы каждого промежутка и выберите вид скобки.'),
    parts: [
      { k: 'blanks', lines: [
        ['(a) x² − 4x + 3 ≤ 0:   x ∈ ', { a: '[', sel: ['(', '['] }, ' ', { a: '1', w: 2 }, ' , ', { a: '3', w: 2 }, ' ', { a: ']', sel: [')', ']'] }],
        ['(b) −x² + x + 2 > 0:   x ∈ ', { a: '(', sel: ['(', '['] }, ' ', { a: '-1', w: 2 }, ' , ', { a: '2', w: 2 }, ' ', { a: ')', sel: [')', ']'] }]] },
      { k: 'mc', q: T('(c) The solution set of x² + 2x + 3 > 0 is', '(c) Множество решений x² + 2x + 3 > 0 —'), opts: ['∅', 'R', '(−3, 1)', '(−∞, −1)'], a: 1 }],
    hint: T('(a) x² − 4x + 3 = (x − 1)(x − 3). (b) Multiply by −1 first: x² − x − 2 < 0. (c) b² − 4ac = 4 − 12 < 0.', '(a) x² − 4x + 3 = (x − 1)(x − 3). (b) Сначала умножьте на −1: x² − x − 2 < 0. (c) b² − 4ac = 4 − 12 < 0.') },
  { t: 'task', id: '4.4', title: T('Working backwards', 'Обратная задача'),
    text: T('The solution set of x² + ax + b < 0 is (1, 2). So 1 and 2 are the roots, and x² + ax + b = (x − 1)(x − 2).', 'Множество решений x² + ax + b < 0 — это (1, 2). Значит, 1 и 2 — корни, и x² + ax + b = (x − 1)(x − 2).'),
    parts: [{ k: 'blanks', lines: [['a = ', { a: '-3', w: 3 }, '   b = ', { a: '2', w: 3 }]] }],
    hint: T('Multiply out (x − 1)(x − 2).', 'Раскройте скобки (x − 1)(x − 2).') }
  ]},

/* ================= PART 5 ================= */
{ id: 5, title: T('Fractions, absolute values and the basic inequality', 'Дроби, модули и основное неравенство'),
  intro: T('Three more kinds of inequality come up on the exam: fractions (分式不等式), absolute values (绝对值不等式) and the minimum problems solved with the basic inequality 基本不等式.',
           'На экзамене встречаются ещё три вида неравенств: дробные (分式不等式), с модулем (绝对值不等式) и задачи на минимум, которые решаются основным неравенством 基本不等式.'),
  items: [
  { t: 'task', id: '5.1', title: T('A fraction', 'Дробь'),
    text: T('Solve (x − 1)/(x + 2) ≤ 0. Fill in the table. Write "none" where the fraction has no value.', 'Решите (x − 1)/(x + 2) ≤ 0. Заполните таблицу. Где у дроби нет значения, напишите «нет».'),
    parts: [
      { k: 'table', head: ['x', '−3', '−2', '0', '1', '2'], rows: [['(x − 1)/(x + 2)', { a: '4' }, { a: 'none' }, { a: '-1/2' }, { a: '0' }, { a: '1/4' }]] },
      { k: 'blanks', lines: [[T('Solution: ', 'Решение: '), { a: '(', sel: ['(', '['] }, ' ', { a: '-2', w: 2 }, ' , ', { a: '1', w: 2 }, ' ', { a: ']', sel: [')', ']'] }]] }],
    hint: T('The fraction changes sign only at x = 1 (top is 0) and x = −2 (bottom is 0). −2 can never be in the answer.', 'Дробь меняет знак только при x = 1 (числитель 0) и x = −2 (знаменатель 0). −2 никогда не входит в ответ.') },
  { t: 'notice', id: 'n5', rule: T('A/B has the same sign as A·B. So (x − 1)/(x + 2) ≤ 0 is solved like (x − 1)(x + 2) ≤ 0, but the zero of the denominator is always left out.', 'Дробь A/B имеет тот же знак, что и A·B. Поэтому (x − 1)/(x + 2) ≤ 0 решается как (x − 1)(x + 2) ≤ 0, но нуль знаменателя всегда исключается.') },
  { t: 'task', id: '5.2', title: T('Absolute value is a distance', 'Модуль — это расстояние'),
    text: T('∣x − 2∣ is the distance between x and 2 on the number line. Fill in the table.', '∣x − 2∣ — это расстояние между x и 2 на числовой прямой. Заполните таблицу.'),
    parts: [
      { k: 'table', head: ['x', '−2', '−1', '0', '2', '5', '6'], rows: [['∣x − 2∣', { a: '4' }, { a: '3' }, { a: '2' }, { a: '0' }, { a: '3' }, { a: '4' }]] },
      { k: 'blanks', lines: [
        [T('∣x − 2∣ < 3 means the distance from 2 is less than 3, so ', '∣x − 2∣ < 3 значит, что расстояние до 2 меньше 3, поэтому '), { a: '-1', w: 2 }, ' < x < ', { a: '5', w: 2 }],
        [T('∣2x − 1∣ ≥ 3 means 2x − 1 ≤ −3 or 2x − 1 ≥ 3, so x ≤ ', '∣2x − 1∣ ≥ 3 значит 2x − 1 ≤ −3 или 2x − 1 ≥ 3, поэтому x ≤ '), { a: '-1', w: 2 }, T(' or x ≥ ', ' или x ≥ '), { a: '2', w: 2 }]] }],
    hint: T('Go 3 steps left and 3 steps right from 2.', 'Отступите от 2 на 3 шага влево и на 3 шага вправо.') },
  { t: 'rule', label: T('Rule', 'Правило'), text: T('∣u∣ < a (a > 0) means −a < u < a. ∣u∣ > a means u < −a or u > a.', '∣u∣ < a (a > 0) означает −a < u < a. ∣u∣ > a означает u < −a или u > a.') },
  { t: 'task', id: '5.3', title: T('Same product, different sums', 'Одно произведение, разные суммы'),
    text: T('All these pairs of positive numbers have product ab = 16. Fill in the sums.', 'У всех этих пар положительных чисел произведение ab = 16. Заполните суммы.'),
    parts: [
      { k: 'table', head: ['a', '1', '2', '4', '8', '16'], rows: [['b', { a: '16' }, { a: '8' }, { a: '4' }, { a: '2' }, { a: '1' }], ['a + b', { a: '17' }, { a: '10' }, { a: '8' }, { a: '10' }, { a: '17' }]] },
      { k: 'blanks', lines: [[T('The smallest sum is ', 'Наименьшая сумма равна '), { a: '8', w: 2 }, T(', when a ', ', когда a '), { a: '=', sel: ['<', '=', '>'] }, ' b. ', T('And 2√(ab) = 2√16 = ', 'А 2√(ab) = 2√16 = '), { a: '8', w: 2 }]] }],
    hint: T('b = 16 / a.', 'b = 16 / a.') },
  { t: 'notice', id: 'n5b', rule: T('Basic inequality: for a, b > 0, a + b ≥ 2√(ab), with equality only when a = b. If the product ab is fixed, the smallest sum is 2√(ab). Check three things: both positive, product fixed, equality possible (一正二定三相等).', 'Основное неравенство: при a, b > 0 a + b ≥ 2√(ab), и равенство только при a = b. Если произведение ab постоянно, наименьшая сумма равна 2√(ab). Проверьте три условия: оба положительны, произведение постоянно, равенство достижимо (一正二定三相等).') },
  { t: 'task', id: '5.4', title: T('Try it: minimum values', 'Попробуйте сами: наименьшие значения'),
    text: T('Find each minimum value and the x where it happens.', 'Найдите каждое наименьшее значение и x, при котором оно достигается.'),
    parts: [{ k: 'table', head: [T('Expression', 'Выражение'), T('minimum', 'минимум'), T('at x =', 'при x =')], rows: [
      ['x + 4/x  (x > 0)', { a: '4' }, { a: '2' }],
      ['x + 9/x  (x > 0)', { a: '6' }, { a: '3' }],
      ['x + 1/(x − 1)  (x > 1)', { a: '3' }, { a: '2' }]] }],
    hint: T('The product x · (4/x) = 4 is fixed. For the last one write x = (x − 1) + 1.', 'Произведение x · (4/x) = 4 постоянно. В последнем запишите x = (x − 1) + 1.') }
  ]}
];

const EXAM = [
  { part: 2, q: T('U = {1, 2, 3, 4, 5}, A = {1, 3}, B = {2, 3, 4}. Then A ∪ (∁ᵤB) =', 'U = {1, 2, 3, 4, 5}, A = {1, 3}, B = {2, 3, 4}. Тогда A ∪ (∁ᵤB) ='), o: ['{1}', '{1, 3, 5}', '{1, 5}', '{3, 5}'], a: 1 },
  { part: 4, q: T('A = {x | x² − 2x − 3 < 0}, B = {x | x > 0}. Then A ∩ B =', 'A = {x | x² − 2x − 3 < 0}, B = {x | x > 0}. Тогда A ∩ B ='), o: ['(−1, 3)', '(−1, 0)', '(0, 3)', '(3, +∞)'], a: 2 },
  { part: 1, q: T('The number of subsets of {a, b, c} is', 'Число подмножеств множества {a, b, c} равно'), o: ['8', '3', '6', '7'], a: 0 },
  { part: 3, q: T('"x > 2" is a ______ condition for "x² > 4".', '«x > 2» — ______ условие для «x² > 4».'), o: [T('necessary but not sufficient', 'необходимое, но не достаточное'), T('necessary and sufficient', 'необходимое и достаточное'), T('neither sufficient nor necessary', 'ни достаточное, ни необходимое'), T('sufficient but not necessary', 'достаточное, но не необходимое')], a: 3 },
  { part: 3, q: T('The negation of "∃x ∈ R, x² + 1 < 0" is', 'Отрицание утверждения «∃x ∈ R, x² + 1 < 0» —'), o: ['∀x ∈ R, x² + 1 ≥ 0', '∃x ∈ R, x² + 1 ≥ 0', '∀x ∈ R, x² + 1 < 0', '∃x ∈ R, x² + 1 > 0'], a: 0 },
  { part: 4, q: T('The solution set of −x² + 3x + 4 ≥ 0 is', 'Множество решений −x² + 3x + 4 ≥ 0 —'), o: ['[−4, 1]', '[−1, 4]', '(−∞, −1] ∪ [4, +∞)', '(−1, 4)'], a: 1 },
  { part: 5, q: T('The solution set of (x + 1)/(x − 2) < 0 is', 'Множество решений (x + 1)/(x − 2) < 0 —'), o: ['(−∞, −1)', '[−1, 2)', '(−1, 2)', '(2, +∞)'], a: 2 },
  { part: 5, q: T('The solution set of ∣x − 1∣ ≤ 2 is', 'Множество решений ∣x − 1∣ ≤ 2 —'), o: ['[−1, 3]', '[−3, 1]', '(−1, 3)', '(−∞, −1] ∪ [3, +∞)'], a: 0 },
  { part: 5, q: T('For x > 0, the minimum value of x + 9/x is', 'При x > 0 наименьшее значение x + 9/x равно'), o: ['3', '9', '10', '6'], a: 3 },
  { part: 2, q: T('Of 40 students, 25 play basketball, 20 play football and 10 play both. How many play neither?', 'Из 40 учеников 25 играют в баскетбол, 20 — в футбол, 10 — в обе игры. Сколько не играют ни в одну?'), o: ['5', '0', '15', '10'], a: 0 },
  { part: 1, q: T('A = {0, 1, 2}. Which statement is correct?', 'A = {0, 1, 2}. Какое утверждение верно?'), o: ['{1} ∈ A', '∅ = A', '0 ∈ A', '{0, 3} ⊆ A'], a: 2 },
  { part: 4, q: T('The solution set of x² + ax + b < 0 is (1, 2). Then a + b =', 'Множество решений x² + ax + b < 0 — (1, 2). Тогда a + b ='), o: ['1', '−1', '5', '−5'], a: 1 }
];

const TOPICS = [
  [T('Elements and subsets 集合 / 子集', 'Элементы и подмножества 集合 / 子集'), 1, '"The number of subsets of the set A is"'],
  [T('Intersection, union, complement 交集 / 并集 / 补集', 'Пересечение, объединение, дополнение 交集 / 并集 / 补集'), 2, '"Given A = …, B = …, then A ∩ B ="'],
  [T('Sufficient and necessary conditions 充分条件 / 必要条件', 'Достаточные и необходимые условия 充分条件 / 必要条件'), 3, '"p is a … condition for q"; "the negation of the proposition … is"'],
  [T('Quadratic inequalities 一元二次不等式', 'Квадратные неравенства 一元二次不等式'), 4, '"The solution set of the inequality … is"'],
  [T('Fractions, absolute values, minimum 基本不等式', 'Дроби, модули, минимум 基本不等式'), 5, '"If x > 0, the minimum value of … is"']
];
