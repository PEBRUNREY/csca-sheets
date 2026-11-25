"""Independent check of the answers in subjects/math/vectors-complex."""
from math import sqrt, cos, acos, radians, pi, isclose, hypot
res = []
ok = lambda c, m: res.append(c) or print(('ok   ' if c else 'FAIL ') + m)
eq = lambda a, b: isclose(a, b, abs_tol=1e-9)
a, b = (2, 1), (1, 3)
add = lambda u, v: (u[0] + v[0], u[1] + v[1]); sub = lambda u, v: (u[0] - v[0], u[1] - v[1]); mul = lambda k, u: (k*u[0], k*u[1])
ok(add(a, b) == (3, 4) and sub(a, b) == (1, -2) and mul(2, a) == (4, 2) and sub(mul(2, a), b) == (3, -1), '1.1')
A, B = (1, 2), (4, 6); ok(sub(B, A) == (3, 4) and hypot(3, 4) == 5 and ((1 + 4)/2, (2 + 6)/2) == (2.5, 4), '1.2')
dot = lambda u, v: u[0]*v[0] + u[1]*v[1]; ln = lambda u: hypot(*u)
for u, v, th, d, la, lb in [((1, 0), (1, 1), 45, 1, 1, sqrt(2)), ((1, 0), (0, 2), 90, 0, 1, 2), ((1, 0), (-1, sqrt(3)), 120, -1, 1, 2)]:
    ok(eq(dot(u, v), d) and eq(ln(u), la) and eq(ln(v), lb) and eq(ln(u)*ln(v)*cos(radians(th)), d) and eq(acos(dot(u, v)/(ln(u)*ln(v))), radians(th)), f'2.1 theta={th}')
ok(dot((1, 2), (2, -1)) == 0 and 1*(-1) - (-0.5)*2 == 0, '2.2')
ab = 2*1*cos(radians(60)); ok(eq(ab, 1) and eq(4 + 2*ab + 1, 7) and eq(4 - 2*ab + 1, 3), '2.3')
# also with concrete vectors: |a|=2, |b|=1, 60 deg
va, vb = (2, 0), (cos(radians(60)), sin_ := __import__('math').sin(radians(60)))
ok(eq(ln(add(va, vb)), sqrt(7)) and eq(ln(sub(va, vb)), sqrt(3)), '2.3 concrete')
u, v = (1, 1), (0, 2); ok(dot(u, v) == 2 and eq(dot(u, v)/(ln(u)*ln(v)), sqrt(2)/2) and eq(acos(sqrt(2)/2), pi/4), '2.4')
def ipow(n):
    z = 1
    for _ in range(n): z = complex(-z.imag, z.real) if isinstance(z, complex) else complex(0, z)
    return z
ok([ipow(n) for n in range(1, 9)] == [1j, -1, -1j, 1, 1j, -1, -1j, 1] and ipow(2026) == -1, '3.1 (also exam 11)')
z1, z2 = 2 + 3j, 1 - 1j
ok(z1 + z2 == 3 + 2j and z1 - z2 == 1 + 4j and z1*z2 == 5 + 1j and z2.conjugate() == 1 + 1j and z2*z2.conjugate() == 2, '3.2')
ok(eq((z1/z2).real, -0.5) and eq((z1/z2).imag, 2.5) and eq(((1 + 1j)/(1 - 1j)).real, 0) and eq(((1 + 1j)/(1 - 1j)).imag, 1), '3.3')
quad = lambda z: 'axis' if z.real == 0 or z.imag == 0 else {(1, 1): '1', (-1, 1): '2', (-1, -1): '3', (1, -1): '4'}[(1 if z.real > 0 else -1, 1 if z.imag > 0 else -1)]
for z, m, q in [(3 - 4j, 5, '4'), (-1 + 1j, sqrt(2), '2'), ((1 + 1j)**2, 2, 'axis'), (1/(1 + 1j), sqrt(2)/2, '4')]:
    ok(eq(abs(z), m) and quad(z) == q, f'3.4 {z}')
ok([m for m in (1, -1) if m*m - 1 == 0 and m + 1 != 0] == [1], '3.5')
ok(sub(mul(2, (1, 2)), (3, -1)) == (-1, 5), 'exam 1'); ok(dot((2, 1), (-1, 2)) == 0, 'exam 2'); ok(1*4 - 2*2 == 0, 'exam 3')
ok(eq(1*2*cos(radians(60)), 1), 'exam 4'); ok(eq(sqrt(1 - 2*1 + 4), sqrt(3)), 'exam 5'); ok(hypot(3, -4) == 5, 'exam 6')
ok(1j*(1 + 1j) == -1 + 1j, 'exam 7'); ok(eq(abs((1 + 1j)/(1 - 1j) - 1j), 0), 'exam 8'); ok(quad(1/(1 + 1j)) == '4', 'exam 10')
ok((2 - 1j).conjugate() == 2 + 1j, 'exam 12')
print('ALL OK' if all(res) else 'SOME FAILED')
