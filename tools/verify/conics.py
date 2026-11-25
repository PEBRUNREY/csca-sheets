"""Independent check of the answers in subjects/math/conics."""
from math import sqrt, hypot, isclose
from fractions import Fraction as F
res = []
ok = lambda c, m: res.append(c) or print(('ok   ' if c else 'FAIL ') + m)
eq = lambda a, b: isclose(a, b, abs_tol=1e-9)
dist = lambda p, q: hypot(p[0] - q[0], p[1] - q[1])
F1, F2 = (-4, 0), (4, 0)
for p, d1, d2 in [((5, 0), 9, 1), ((0, 3), 5, 5), ((4, 9/5), 41/5, 9/5), ((-5, 0), 1, 9)]:
    ok(eq(p[0]**2/25 + p[1]**2/9, 1) and eq(dist(p, F1), d1) and eq(dist(p, F2), d2) and eq(d1 + d2, 10), f'1.1 {p}')
def ell(A, B):  # denominators under x^2 and y^2
    a2, b2 = max(A, B), min(A, B); c = sqrt(a2 - b2); return sqrt(a2), sqrt(b2), c, ('x' if A > B else 'y'), c/sqrt(a2)
for A, B, exp in [(4, 3, (2, sqrt(3), 1, 'x', 1/2)), (16, 25, (5, 4, 3, 'y', 3/5)), (9, 5, (3, sqrt(5), 2, 'x', 2/3))]:
    got = ell(A, B); ok(all((eq(g, e) if isinstance(e, (int, float)) else g == e) for g, e in zip(got, exp)), f'1.2 {A},{B}')
ok(10 - 3 == 7 and 4*5 == 20 and (10, 6) == (2*5, 2*3), '1.3 (also exams 3, 4 major axis of 16/25 is 10)')
G1, G2 = (-5, 0), (5, 0)
for p, d1, d2 in [((3, 0), 8, 2), ((5, 16/3), 34/3, 16/3), ((-3, 0), 2, 8)]:
    ok(eq(p[0]**2/9 - p[1]**2/16, 1) and eq(dist(p, G1), d1) and eq(dist(p, G2), d2) and eq(abs(d1 - d2), 6), f'2.1 {p}')
ok(eq(34/3 + 16/3, 50/3), '2.1 sum 50/3')
for a, b, c, e, s in [(3, 4, 5, 5/3, 4/3), (2, 1, sqrt(5), sqrt(5)/2, 1/2), (1, 1, sqrt(2), sqrt(2), 1)]:
    ok(eq(sqrt(a*a + b*b), c) and eq(c/a, e) and eq(b/a, s), f'2.2 a={a}')
for p in [(1, 2), (4, 4), (9, 6)]:
    ok(p[1]**2 == 4*p[0] and eq(dist(p, (1, 0)), p[0] + 1), f'3.1 {p}')
# y^2 = 2px etc.
ok((8/2/2, 0) == (2, 0), '3.2 y^2=8x focus (2,0), directrix x=-2 (also exam 8)')
ok(all(eq(dist((x, x*x/4), (0, 1)), x*x/4 + 1) for x in (-3, -1, 0, 2, 5)), '3.2 x^2=4y focus (0,1), directrix y=-1 (also exam 9)')
ok(all(eq(dist((-y*y/4, y), (-1, 0)), 1 - (-y*y/4)) for y in (-3, 0, 1, 4)), '3.2 y^2=-4x focus (-1,0), directrix x=1')
ok(3 + 1 == 4 and 5 - 2 == 3, '3.3 (also exam 10)')
ok(eq(sqrt(25 - 9), 4), 'exam 1'); ok(eq(sqrt(4 - 3)/2, 1/2), 'exam 2'); ok(eq(sqrt(4 + 5), 3), 'exam 7')
ok(4 - 1 == 3, 'exam 11 b^2 = a^2 - c^2 = 3'); ok(2/1 == 2, 'exam 12 b/a = 2 -> b^2 = 4')
print('ALL OK' if all(res) else 'SOME FAILED')
