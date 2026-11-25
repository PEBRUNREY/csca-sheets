"""Independent check of the answers in subjects/math/solid-geometry."""
from math import pi, sqrt, acos, degrees, isclose
import itertools
res = []
ok = lambda c, m: res.append(c) or print(('ok   ' if c else 'FAIL ') + m)
eq = lambda a, b: isclose(a, b, abs_tol=1e-9)
prism = lambda n: (2*n, 3*n, n + 2); pyr = lambda n: (n + 1, 2*n, n + 1)
ok(prism(4) == (8, 12, 6) and prism(3) == (6, 9, 5) and pyr(4) == (5, 8, 5) and pyr(3) == (4, 6, 4) and all(v - e + f == 2 for v, e, f in [prism(3), prism(4), pyr(3), pyr(4)]), '1.1 (also exam 1)')
ok(2*3*4 == 24 and 2*(6 + 8 + 12) == 52 and 2**3 == 8 and 6*4 == 24, '2.1 (also exam 2)')
ok(eq(1/3*9*4, 12) and eq(pi*1*3, 3*pi) and eq(pi*1*3/3, pi), '2.2 (also exam 6)')
ok(eq(4/3*pi, 4*pi/3) and eq(4*pi, 4*pi) and eq(4/3*pi*27, 36*pi) and eq(4*pi*9, 36*pi), '2.3 spheres (also exam 3)')
l = sqrt(9 + 16); ok(eq(l, 5) and eq(pi*9*4/3, 12*pi) and eq(pi*3*l, 15*pi), '2.3 cone (also exam 4)')
ok(8 + 4 == 12 and eq(sqrt(12), 2*sqrt(3)) and eq(4*pi*3, 12*pi), '2.4 (also exam 5)')
P = {'A': (0, 0, 0), 'B': (1, 0, 0), 'C': (1, 1, 0), 'D': (0, 1, 0)}
for k in 'ABCD': P[k + '1'] = P[k][:2] + (1,)
sub = lambda p, q: tuple(a - b for a, b in zip(P[q], P[p]))
def rel(l1, l2):
    u, v = sub(*l1), sub(*l2)
    cross = (u[1]*v[2] - u[2]*v[1], u[2]*v[0] - u[0]*v[2], u[0]*v[1] - u[1]*v[0])
    w = sub(l1[0], l2[0])
    if cross == (0, 0, 0): return 'par'
    trip = w[0]*cross[0] + w[1]*cross[1] + w[2]*cross[2]
    return 'int' if trip == 0 else 'skew'
for l1, l2, r in [(('A', 'B'), ('C1', 'D1'), 'par'), (('A', 'B'), ('B', 'C'), 'int'), (('A', 'B'), ('C', 'C1'), 'skew'), (('A', 'A1'), ('C', 'C1'), 'par'), (('A1', 'B'), ('D1', 'C'), 'par'), (('A', 'B'), ('B1', 'C1'), 'skew')]:
    ok(rel(l1, l2) == r, f'3.1 {l1} {l2} (also exam 7)')
ok(P['C'] == (1, 1, 0) and P['B1'] == (1, 0, 1) and P['C1'] == (1, 1, 1) and P['D1'] == (0, 1, 1), '4.1')
d = lambda p, q: sqrt(sum((a - b)**2 for a, b in zip(p, q)))
ok(eq(d(P['A'], P['C']), sqrt(2)) and eq(d(P['A'], P['C1']), sqrt(3)) and d((1, 2, 3), (4, 6, 3)) == 5 and ((1 + 3)/2, (2 + 6)/2, (3 + 5)/2) == (2, 4, 4), '4.2 (also exam 9)')
ok((1, 2, -3) == (1, 2, -3) and (-1, -2, 3) == (-1, -2, 3), '4.3 (also exam 10)')
u, v = sub('A1', 'B'), sub('B1', 'C')
dot = sum(a*b for a, b in zip(u, v))
ok(u == (1, 0, -1) and v == (0, 1, -1) and dot == 1 and eq(abs(dot)/(sqrt(2)*sqrt(2)), 1/2) and eq(degrees(acos(0.5)), 60), '4.4 (also exam 11)')
ok(eq(pi*1*2, 2*pi), 'exam 12')
print('ALL OK' if all(res) else 'SOME FAILED')
