/* Sheet: Solid geometry (CSCA Mathematics): solids, volumes and areas, lines and planes, coordinates in space. */
const SHEET = {
  key: 'csca-math-solid-geometry-v1',
  title: T('Investigation sheet: Solid geometry', 'Исследовательский лист: стереометрия'),
  sub: T('CSCA Mathematics · find each rule yourself, then read it', 'CSCA, математика · найдите каждое правило сами, потом прочитайте его'),
  stats: T('Solid geometry 立体几何 questions ask for a volume or area, the position of two lines or planes, or a length or angle found with coordinates. Typical questions:',
           'Вопросы по стереометрии 立体几何 просят найти объём или площадь, взаимное расположение двух прямых или плоскостей, либо длину или угол с помощью координат. Типичные вопросы:'),
  symbols: T('Symbols: V volume, S area, h height, r radius of a circle, R radius of a sphere, l slant height 母线. ABCD-A₁B₁C₁D₁ is a cube: ABCD is the bottom face and A₁ is above A. Type π as pi, for example 36pi.',
             'Обозначения: V — объём, S — площадь, h — высота, r — радиус круга, R — радиус шара, l — образующая 母线. ABCD-A₁B₁C₁D₁ — куб: ABCD — нижняя грань, A₁ над A. π вводите как pi, например 36pi.')
};

SHEET.figs = ({ h }) => {
  const P = { A: [40, 206], B: [180, 206], C: [240, 166], D: [100, 166] };
  ['A', 'B', 'C', 'D'].forEach(k => { P[k + '₁'] = [P[k][0], P[k][1] - 140]; });
  const L = (a, b, cls) => `<line x1="${P[a][0]}" y1="${P[a][1]}" x2="${P[b][0]}" y2="${P[b][1]}"${cls ? ` class="${cls}"` : ''}/>`;
  const lab = { A: [-14, 14], B: [4, 16], C: [8, 6], D: [-16, -4], 'A₁': [-18, 0], 'B₁': [4, 14], 'C₁': [6, 0], 'D₁': [-8, -6] };
  const cube = (extra, label) => h('div', { html: `<svg class="geo" viewBox="0 0 290 230" role="img" aria-label="${label}">
      ${L('A', 'B')}${L('B', 'C')}${L('A', 'A₁')}${L('B', 'B₁')}${L('C', 'C₁')}${L('A₁', 'B₁')}${L('B₁', 'C₁')}${L('C₁', 'D₁')}${L('D₁', 'A₁')}
      ${L('A', 'D', 'hid')}${L('D', 'C', 'hid')}${L('D', 'D₁', 'hid')}${extra(L)}
      ${Object.keys(lab).map(k => `<text x="${P[k][0] + lab[k][0]}" y="${P[k][1] + lab[k][1]}">${k}</text>`).join('')}
    </svg>` });
  return {
    cube: () => cube(() => '', 'Cube ABCD-A₁B₁C₁D₁; hidden edges are dashed'),
    cube2: () => cube(L => L('A₁', 'B', 'acc') + L('B₁', 'C', 'acc2'), 'Cube ABCD-A₁B₁C₁D₁ with the face diagonals A₁B and B₁C')
  };
};

const POSL = [{ k: 'par', en: 'parallel', ru: 'параллельны' }, { k: 'int', en: 'intersecting', ru: 'пересекаются' }, { k: 'skew', en: 'skew (异面)', ru: 'скрещиваются (异面)' }];

const PARTS = [
/* ================= PART 1 ================= */
{ id: 1, title: T('Count faces, vertices and edges', 'Посчитайте грани, вершины и рёбра'),
  intro: T('Start by looking at simple solids: prisms 棱柱, pyramids 棱锥, the cube 正方体. Count, then look for a pattern.', 'Начните с простых тел: призм 棱柱, пирамид 棱锥, куба 正方体. Посчитайте и поищите закономерность.'),
  items: [
  { t: 'task', id: '1.1', title: T('Count', 'Посчитайте'),
    text: T('V = vertices, E = edges, F = faces.', 'V — вершины, E — рёбра, F — грани.'),
    parts: [{ k: 'fig', id: 'cube' },
      { k: 'table', head: [T('solid', 'тело'), 'V', 'E', 'F', 'V − E + F'], rows: [
        [T('cube', 'куб'), { a: '8' }, { a: '12' }, { a: '6' }, { a: '2' }],
        [T('triangular prism', 'треугольная призма'), { a: '6' }, { a: '9' }, { a: '5' }, { a: '2' }],
        [T('square pyramid', 'четырёхугольная пирамида'), { a: '5' }, { a: '8' }, { a: '5' }, { a: '2' }],
        [T('triangular pyramid (tetrahedron)', 'треугольная пирамида (тетраэдр)'), { a: '4' }, { a: '6' }, { a: '4' }, { a: '2' }]] }],
    hint: T('A triangular prism has two triangles (top and bottom) and three rectangles on the sides.', 'У треугольной призмы два треугольника (верх и низ) и три прямоугольника по бокам.') },
  { t: 'notice', id: 'n1', rule: T('For these solids V − E + F = 2 (Euler\'s formula). A prism with an n-sided base has 2n vertices, 3n edges and n + 2 faces; a pyramid with an n-sided base has n + 1 vertices, 2n edges and n + 1 faces.', 'Для этих тел V − E + F = 2 (формула Эйлера). У призмы с n-угольным основанием 2n вершин, 3n рёбер и n + 2 грани; у пирамиды с n-угольным основанием n + 1 вершина, 2n рёбер и n + 1 грань.') }
  ]},

/* ================= PART 2 ================= */
{ id: 2, title: T('Volume and surface area', 'Объём и площадь поверхности'),
  intro: T('A pyramid fits into a prism with the same base and height. A cone fits into a cylinder. How much of it do they fill?', 'Пирамида помещается в призму с тем же основанием и той же высотой. Конус помещается в цилиндр. Какую часть они занимают?'),
  items: [
  { t: 'task', id: '2.1', title: T('Boxes', 'Коробки'),
    text: T('Volume = base area × height. Surface area = the sum of all faces.', 'Объём = площадь основания × высота. Площадь поверхности = сумма всех граней.'),
    parts: [{ k: 'table', head: [T('solid', 'тело'), 'V', 'S'], rows: [[T('box 2 × 3 × 4', 'параллелепипед 2 × 3 × 4'), { a: '24' }, { a: '52' }], [T('cube with edge 2', 'куб с ребром 2'), { a: '8' }, { a: '24' }]] }],
    hint: T('The box has two faces of each kind: 2·(2·3 + 2·4 + 3·4).', 'У параллелепипеда по две грани каждого вида: 2·(2·3 + 2·4 + 3·4).') },
  { t: 'task', id: '2.2', title: T('Three pyramids make a cube', 'Три пирамиды составляют куб'),
    text: T('A cube with edge 1 can be cut into 3 equal pyramids. Each has the same square base and the same height as the cube.', 'Куб с ребром 1 можно разрезать на 3 равные пирамиды. У каждой то же квадратное основание и та же высота, что у куба.'),
    parts: [{ k: 'blanks', lines: [
      [T('Volume of one pyramid: ', 'Объём одной пирамиды: '), { a: '1/3', w: 3 }, T('. So a pyramid fills ', '. Значит, пирамида занимает '), { a: '1/3', w: 3 }, T(' of the prism.', ' призмы.')],
      [T('Pyramid with a square base of side 3 and height 4: V = ', 'Пирамида с квадратным основанием со стороной 3 и высотой 4: V = '), { a: '12', w: 3 }],
      [T('Cylinder r = 1, h = 3: V = πr²h = ', 'Цилиндр r = 1, h = 3: V = πr²h = '), { a: '3π', w: 3 }, T('.  Cone with the same r and h: V = ', '.  Конус с теми же r и h: V = '), { a: 'π', w: 3 }]] }],
    hint: T('1 cube = 3 pyramids. The same 1/3 works for the cone and the cylinder.', '1 куб = 3 пирамиды. Та же 1/3 работает для конуса и цилиндра.') },
  { t: 'rule', label: T('Formulas', 'Формулы'), text: T('Prism, cylinder: V = Sh. Pyramid, cone: V = ⅓Sh. Sphere: V = (4/3)πR³, S = 4πR². Cylinder side area 2πrh. Cone side area πrl, where l = √(r² + h²) is the slant height.', 'Призма, цилиндр: V = Sh. Пирамида, конус: V = ⅓Sh. Шар: V = (4/3)πR³, S = 4πR². Боковая поверхность цилиндра 2πrh. Боковая поверхность конуса πrl, где l = √(r² + h²) — образующая.') },
  { t: 'task', id: '2.3', title: T('Spheres and cones', 'Шары и конусы'),
    text: T('Use the formulas.', 'Используйте формулы.'),
    parts: [{ k: 'table', head: [T('solid', 'тело'), 'V', T('area', 'площадь')], rows: [
      [T('sphere R = 1', 'шар R = 1'), { a: '4π/3' }, { a: '4π' }],
      [T('sphere R = 3', 'шар R = 3'), { a: '36π' }, { a: '36π' }],
      [T('cone r = 3, h = 4 (side area)', 'конус r = 3, h = 4 (боковая)'), { a: '12π' }, { a: '15π' }]] }],
    hint: T('Cone: l = √(9 + 16) = 5, V = ⅓·π·9·4.', 'Конус: l = √(9 + 16) = 5, V = ⅓·π·9·4.') },
  { t: 'task', id: '2.4', title: T('A cube inside a sphere', 'Куб внутри шара'),
    text: T('All 8 vertices of a cube with edge 2 lie on a sphere. The longest diagonal of the cube (from A to C₁) is a diameter of the sphere.', 'Все 8 вершин куба с ребром 2 лежат на сфере. Самая длинная диагональ куба (от A до C₁) — диаметр шара.'),
    parts: [{ k: 'blanks', lines: [
      [T('AC² = 2² + 2² = 8, AC₁² = AC² + CC₁² = ', 'AC² = 2² + 2² = 8, AC₁² = AC² + CC₁² = '), { a: '12', w: 3 }, ', AC₁ = ', { a: '2√3', w: 4 }],
      ['R = ', { a: '√3', w: 3 }, T(', surface area of the sphere 4πR² = ', ', площадь сферы 4πR² = '), { a: '12π', w: 4 }]] }],
    hint: T('For a cube with edge a the long diagonal is a√3.', 'Для куба с ребром a большая диагональ равна a√3.') }
  ]},

/* ================= PART 3 ================= */
{ id: 3, title: T('Lines and planes', 'Прямые и плоскости'),
  intro: T('In space, two lines can be parallel, intersect, or be skew 异面直线: not parallel and never meeting. Use the cube to see each case.', 'В пространстве две прямые могут быть параллельны, пересекаться или скрещиваться 异面直线: не параллельны и никогда не встречаются. Используйте куб, чтобы увидеть каждый случай.'),
  items: [
  { t: 'task', id: '3.1', title: T('Pairs of edges', 'Пары рёбер'),
    text: T('Look at the cube ABCD-A₁B₁C₁D₁ above. Classify each pair of lines.', 'Посмотрите на куб ABCD-A₁B₁C₁D₁ выше. Определите расположение каждой пары прямых.'),
    parts: [{ k: 'table', head: [T('lines', 'прямые'), T('position', 'расположение')], rows: [
      ['AB, C₁D₁', { a: 'par', sel: POSL }], ['AB, BC', { a: 'int', sel: POSL }], ['AB, CC₁', { a: 'skew', sel: POSL }], ['AA₁, CC₁', { a: 'par', sel: POSL }], ['A₁B, D₁C', { a: 'par', sel: POSL }], ['AB, B₁C₁', { a: 'skew', sel: POSL }]] }],
    hint: T('Skew lines do not lie in one plane. AB is on the bottom face; CC₁ goes up from C and never meets the line AB.', 'Скрещивающиеся прямые не лежат в одной плоскости. AB лежит на нижней грани; CC₁ идёт вверх от C и никогда не встречает прямую AB.') },
  { t: 'rule', label: T('Rule', 'Правило'), text: T('A line is perpendicular to a plane if it is perpendicular to two intersecting lines in that plane (线面垂直的判定). A line is parallel to a plane if it is parallel to a line in that plane and not in the plane itself.', 'Прямая перпендикулярна плоскости, если она перпендикулярна двум пересекающимся прямым этой плоскости (线面垂直的判定). Прямая параллельна плоскости, если она параллельна какой-нибудь прямой этой плоскости и не лежит в ней.') },
  { t: 'task', id: '3.2', title: T('True or false in space', 'Верно или неверно в пространстве'),
    text: T('Test each statement with the edges and faces of the cube (or the corner of a room).', 'Проверьте каждое утверждение на рёбрах и гранях куба (или на углу комнаты).'),
    parts: [{ k: 'table', head: [T('statement', 'утверждение'), T('true?', 'верно?')], rows: [
      [T('Two lines perpendicular to the same plane are parallel.', 'Две прямые, перпендикулярные одной плоскости, параллельны.'), { a: 'yes', sel: YN }],
      [T('Two lines parallel to the same plane are parallel.', 'Две прямые, параллельные одной плоскости, параллельны.'), { a: 'no', sel: YN }],
      [T('Two planes perpendicular to the same plane are parallel.', 'Две плоскости, перпендикулярные одной плоскости, параллельны.'), { a: 'no', sel: YN }],
      [T('Two planes perpendicular to the same line are parallel.', 'Две плоскости, перпендикулярные одной прямой, параллельны.'), { a: 'yes', sel: YN }]] }],
    hint: T('AB and BC are both parallel to the top face but they intersect. The front face and the right face are both perpendicular to the bottom face.', 'AB и BC обе параллельны верхней грани, но пересекаются. Передняя и правая грани обе перпендикулярны нижней грани.') }
  ]},

/* ================= PART 4 ================= */
{ id: 4, title: T('Coordinates in space', 'Координаты в пространстве'),
  intro: T('A space rectangular coordinate system 空间直角坐标系 adds a third axis z. Every point gets three coordinates (x, y, z), and lengths and angles become calculations.', 'Пространственная прямоугольная система координат 空间直角坐标系 добавляет третью ось z. Каждая точка получает три координаты (x, y, z), и длины и углы превращаются в вычисления.'),
  items: [
  { t: 'task', id: '4.1', title: T('Put the cube on axes', 'Поставьте куб на оси'),
    text: T('Cube with edge 1: A(0, 0, 0), B(1, 0, 0), D(0, 1, 0), A₁(0, 0, 1). Give the other points.', 'Куб с ребром 1: A(0, 0, 0), B(1, 0, 0), D(0, 1, 0), A₁(0, 0, 1). Найдите остальные точки.'),
    parts: [{ k: 'table', head: [T('point', 'точка'), 'x', 'y', 'z'], rows: [
      ['C', { a: '1' }, { a: '1' }, { a: '0' }], ['B₁', { a: '1' }, { a: '0' }, { a: '1' }], ['C₁', { a: '1' }, { a: '1' }, { a: '1' }], ['D₁', { a: '0' }, { a: '1' }, { a: '1' }]] }],
    hint: T('Points with ₁ are 1 unit higher: add 1 to z.', 'Точки с индексом ₁ на 1 выше: прибавьте 1 к z.') },
  { t: 'task', id: '4.2', title: T('Distance', 'Расстояние'),
    text: T('The distance between (x₁, y₁, z₁) and (x₂, y₂, z₂) is √((x₁ − x₂)² + (y₁ − y₂)² + (z₁ − z₂)²): Pythagoras twice.', 'Расстояние между (x₁, y₁, z₁) и (x₂, y₂, z₂) равно √((x₁ − x₂)² + (y₁ − y₂)² + (z₁ − z₂)²): теорема Пифагора дважды.'),
    parts: [{ k: 'blanks', lines: [
      ['∣AC∣ = ', { a: '√2', w: 3 }, '   ∣AC₁∣ = ', { a: '√3', w: 3 }],
      [T('Distance between (1, 2, 3) and (4, 6, 3): ', 'Расстояние между (1, 2, 3) и (4, 6, 3): '), { a: '5', w: 3 }],
      [T('Midpoint of (1, 2, 3) and (3, 6, 5): ( ', 'Середина отрезка между (1, 2, 3) и (3, 6, 5): ( '), { a: '2', w: 2 }, ' , ', { a: '4', w: 2 }, ' , ', { a: '4', w: 2 }, ' )']] }],
    hint: T('∣AC₁∣ = √(1 + 1 + 1).', '∣AC₁∣ = √(1 + 1 + 1).') },
  { t: 'task', id: '4.3', title: T('Mirror points', 'Симметричные точки'),
    text: T('P(1, 2, 3). Reflect it. Only the coordinates that "cross" the mirror change sign.', 'P(1, 2, 3). Отразите её. Знак меняют только те координаты, которые «пересекают» зеркало.'),
    parts: [{ k: 'table', head: [T('symmetric about', 'симметрична относительно'), 'x', 'y', 'z'], rows: [
      [T('the plane xOy', 'плоскости xOy'), { a: '1' }, { a: '2' }, { a: '-3' }],
      [T('the z-axis', 'оси z'), { a: '-1' }, { a: '-2' }, { a: '3' }],
      [T('the origin', 'начала координат'), { a: '-1' }, { a: '-2' }, { a: '-3' }]] }],
    hint: T('The plane xOy is the floor: only the height z flips. About the z-axis, z stays and x, y flip.', 'Плоскость xOy — это пол: меняется только высота z. Относительно оси z: z остаётся, x и y меняют знак.') },
  { t: 'task', id: '4.4', title: T('An angle between skew lines', 'Угол между скрещивающимися прямыми'),
    text: T('In the cube with edge 1, find the angle between the face diagonals A₁B and B₁C. Use vectors (from the Vectors sheet): cos θ = ∣u·v∣ / (∣u∣∣v∣).', 'В кубе с ребром 1 найдите угол между диагоналями граней A₁B и B₁C. Используйте векторы (из листа «Векторы»): cos θ = ∣u·v∣ / (∣u∣∣v∣).'),
    parts: [{ k: 'fig', id: 'cube2' },
      { k: 'blanks', lines: [
        ['A₁B = ( ', { a: '1', w: 2 }, ' , ', { a: '0', w: 2 }, ' , ', { a: '-1', w: 2 }, ' )   B₁C = ( ', { a: '0', w: 2 }, ' , ', { a: '1', w: 2 }, ' , ', { a: '-1', w: 2 }, ' )'],
        ['u·v = ', { a: '1', w: 2 }, '   cos θ = ', { a: '1/2', w: 3 }, T('   θ in degrees = ', '   θ в градусах = '), { a: '60', w: 3 }]] }],
    hint: T('A₁B = B − A₁ = (1, 0, 0) − (0, 0, 1). Both lengths are √2.', 'A₁B = B − A₁ = (1, 0, 0) − (0, 0, 1). Обе длины равны √2.') },
  { t: 'note', label: T('Careful', 'Осторожно'), text: T('The angle between two lines is between 0° and 90°, so use ∣u·v∣ (the absolute value).', 'Угол между двумя прямыми лежит от 0° до 90°, поэтому берите ∣u·v∣ (модуль).') }
  ]}
];

const EXAM = [
  { part: 1, q: T('How many edges does a triangular prism have?', 'Сколько рёбер у треугольной призмы?'), o: ['6', '9', '5', '12'], a: 1 },
  { part: 2, q: T('The surface area of a cube with edge 2 is', 'Площадь поверхности куба с ребром 2 равна'), o: ['8', '16', '24', '12'], a: 2 },
  { part: 2, q: T('The volume of a sphere with radius 3 is', 'Объём шара радиуса 3 равен'), o: ['12π', '27π', '9π', '36π'], a: 3 },
  { part: 2, q: T('A cone has base radius 3 and height 4. Its side (lateral) area is', 'У конуса радиус основания 3 и высота 4. Его боковая поверхность равна'), o: ['15π', '12π', '20π', '24π'], a: 0 },
  { part: 2, q: T('All vertices of a cube with edge 2 lie on a sphere. The surface area of the sphere is', 'Все вершины куба с ребром 2 лежат на сфере. Площадь сферы равна'), o: ['4π', '12π', '8π', '4√3π'], a: 1 },
  { part: 2, q: T('A pyramid has a square base with side 3 and height 4. Its volume is', 'У пирамиды квадратное основание со стороной 3 и высота 4. Её объём равен'), o: ['36', '24', '12', '9'], a: 2 },
  { part: 3, q: T('In the cube ABCD-A₁B₁C₁D₁, the lines AB and CC₁ are', 'В кубе ABCD-A₁B₁C₁D₁ прямые AB и CC₁'), o: [T('parallel', 'параллельны'), T('intersecting', 'пересекаются'), T('the same line', 'совпадают'), T('skew', 'скрещиваются')], a: 3 },
  { part: 3, q: T('Which statement is true?', 'Какое утверждение верно?'), o: [T('Two lines perpendicular to the same plane are parallel.', 'Две прямые, перпендикулярные одной плоскости, параллельны.'), T('Two lines parallel to the same plane are parallel.', 'Две прямые, параллельные одной плоскости, параллельны.'), T('Two planes perpendicular to the same plane are parallel.', 'Две плоскости, перпендикулярные одной плоскости, параллельны.'), T('Two lines perpendicular to the same line are parallel.', 'Две прямые, перпендикулярные одной прямой, параллельны.')], a: 0 },
  { part: 4, q: T('The distance between (1, 2, 3) and (4, 6, 3) is', 'Расстояние между (1, 2, 3) и (4, 6, 3) равно'), o: ['7', '5', '25', '√7'], a: 1 },
  { part: 4, q: T('The point symmetric to (1, 2, 3) about the plane xOy is', 'Точка, симметричная (1, 2, 3) относительно плоскости xOy, —'), o: ['(−1, −2, 3)', '(−1, −2, −3)', '(1, 2, −3)', '(−1, 2, 3)'], a: 2 },
  { part: 4, q: T('In the cube ABCD-A₁B₁C₁D₁, the angle between A₁B and B₁C is', 'В кубе ABCD-A₁B₁C₁D₁ угол между A₁B и B₁C равен'), o: ['30°', '45°', '90°', '60°'], a: 3 },
  { part: 2, q: T('The volume of a cylinder with base radius 1 and height 2 is', 'Объём цилиндра с радиусом основания 1 и высотой 2 равен'), o: ['2π', 'π', '4π', '2π/3'], a: 0 }
];

const TOPICS = [
  [T('Simple solids 简单几何体', 'Простые тела 简单几何体'), 1, '"How many edges does … have?"'],
  [T('Volume and surface area 表面积 / 体积', 'Объём и площадь поверхности 表面积 / 体积'), 2, '"The surface area of the circumscribed sphere is"'],
  [T('Lines and planes 空间点线面的位置关系', 'Прямые и плоскости 空间点线面的位置关系'), 3, '"Which of the following statements is correct?"'],
  [T('Coordinates in space 空间直角坐标系', 'Координаты в пространстве 空间直角坐标系'), 4, '"The distance between points A and B is"; "the point symmetric to P about … is"']
];
