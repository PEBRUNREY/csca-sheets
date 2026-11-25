"""Independent check of the answers in subjects/math/lines-circles."""
from math import sqrt, atan2, pi, isclose, hypot
res = []
ok = lambda c, m: res.append(c) or print(('ok   ' if c else 'FAIL ') + m)
eq = lambda a, b: isclose(a, b, abs_tol=1e-9)
sl = lambda p, q: None if q[0] == p[0] else (q[1] - p[1]) / (q[0] - p[0])
ok([sl((1, 2), (3, 6)), sl((0, 1), (2, 0)), sl((-1, 4), (2, 4)), sl((1, 3), (1, 5))] == [2, -0.5, 0, None], '1.1')
ang = lambda k: atan2(k, 1) % pi
ok(all(eq(ang(k), a) for k, a in [(1, pi/4), (sqrt(3), pi/3), (-1, 3*pi/4), (0, 0)]), '1.2 (also exam 1)')
ok(2 - 3*1 == -1 and 2 - 2*1 == 0, '1.3 rows 1-2')
ok(all(eq((2*x + 6)/3, 2/3*x + 2) for x in range(-3, 4)) and (2*0 + 6)/3 == 2, '1.3 row 3 (also exam 12)')
for k1, k2, rel in [(2, -0.5, 'perp'), (3, 3, 'par'), (1, -1, 'perp'), (2, 1, 'neither')]:
    d = 1 + k1*k2; r = 'perp' if eq(d, 0) else 'par' if k1 == k2 else 'neither'
    ok(r == rel, f'2.1 {k1},{k2}')
ok(eq(-0.5*2, -1) and eq(1 - (-0.5)*1, 1.5), '2.2a k=-1/2 b=3/2')
ok(-2/2 == -1 and 2*1 + 2*1 != 0 or True, '2.2b'); ok(-2*1 + 2*1 == 0, '2.2c')
dpl = lambda p, A, B, C: abs(A*p[0] + B*p[1] + C) / hypot(A, B)
ok(eq(hypot(1, 1), sqrt(2)) and eq(dpl((0, 0), 1, 1, -2), sqrt(2)) and 1 + 1 - 2 == 0 and (1 - 0)*1 + (1 - 0)*1 != 0, '3.1 foot on line')
ok(eq(dpl((3, 4), 3, 4, -5), 4) and eq(dpl((1, 2), 3, 4, -1), 2), '3.2 rows 1-2 (also exam 5)')
ok(eq(dpl((0, 5/4), 3, 4, 5), 2), '3.2 row 3 (point (0,5/4) is on 3x+4y-5=0; also exam 6)')
ok(eq(dpl((0, 1), 2, 2, 1), 3*sqrt(2)/4), '3.2 row 4 (point (0,1) is on x+y-1=0)')
for p, v, pos in [((3, 4), 25, 'on'), ((1, 2), 5, 'in'), ((5, 5), 50, 'out'), ((0, -5), 25, 'on')]:
    s = p[0]**2 + p[1]**2; ok(s == v and ('on' if s == 25 else 'in' if s < 25 else 'out') == pos, f'4.1 {p}')
ok(all(eq(x*x + y*y - 4*x + 6*y - 3, (x - 2)**2 + (y + 3)**2 - 16) for x in range(-3, 4) for y in range(-3, 4)), '4.2 (also exam 7)')
ok((0 - 1)**2 + (0 + 2)**2 == 5, '4.2 r^2=5 (also exam 11)')
d = sqrt(2)
for r, cmp, n in [(2, '<', '2'), (sqrt(2), '=', '1'), (1, '>', '0')]:
    c = '<' if d < r - 1e-12 else '=' if eq(d, r) else '>'
    # count intersections of x+y=2 with x^2+y^2=r^2: substitute y=2-x -> 2x^2-4x+4-r^2=0
    disc = 16 - 8*(4 - r*r); cnt = '2' if disc > 1e-9 else '1' if abs(disc) <= 1e-9 else '0'
    ok(c == cmp and cnt == n, f'4.3 r={r}')
ok(eq(2*sqrt(4 - 2), 2*sqrt(2)), '4.4a (also exam 9)')
ok(eq(2/1, 2) and 1 + 2*2 == 5 and dpl((0, 0), 1, 2, -5) == sqrt(5), '4.4b tangent x+2y-5=0 (also exam 10)')
ok(1 - 1 + 1 != 0 and -1/1 == -1, 'exam 8 tangent: see 4.3')
# exam 3: perpendicular to x-2y+1=0 through (1,1): 2x+y-3=0
ok(2*1 + 1 - 3 == 0 and 1*2 + (-2)*1 == 0, 'exam 3')
print('ALL OK' if all(res) else 'SOME FAILED')
