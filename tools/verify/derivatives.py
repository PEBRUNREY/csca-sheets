"""Independent check of the answers in subjects/math/derivatives (numeric derivatives, no formulas trusted)."""
from math import exp, log, sin, cos, pi, sqrt, isclose
res = []
ok = lambda c, m: res.append(c) or print(('ok   ' if c else 'FAIL ') + m)
D = lambda f, x, h=1e-6: (f(x + h) - f(x - h)) / (2*h)
eq = lambda a, b, t=1e-5: isclose(a, b, abs_tol=t)
f = lambda x: x*x
ok(all(eq(f(1 + h), v, 1e-12) for h, v in [(1, 4), (0.1, 1.21), (0.01, 1.0201), (0.001, 1.002001)]), '1.1 f(1+h)')
ok(all(eq((f(1 + h) - 1)/h, v, 1e-9) for h, v in [(1, 3), (0.1, 2.1), (0.01, 2.01), (0.001, 2.001)]), '1.1 rates')
ok(eq((f(3.1) - 9)/0.1, 6.1, 1e-9) and eq((f(3.01) - 9)/0.01, 6.01, 1e-9), '1.2')
ok(round((1.001**3 - 1)/0.001) == 3 and round((2.001**3 - 8)/0.001) == 12, '2.1 x^3')
ok(round((1.001**4 - 1)/0.001) == 4 and round((2.001**4 - 16)/0.001) == 32, '2.1 x^4')
for fn, x, v, name in [(lambda x: x**3 - 3*x, 2, 9, 'x^3-3x'), (sqrt, 4, 0.25, 'sqrt'), (lambda x: 1/x, 2, -0.25, '1/x'), (lambda x: x*exp(x), 0, 1, 'x e^x'),
                       (lambda x: x*log(x), 1, 1, 'x ln x'), (lambda x: sin(2*x), 0, 2, 'sin 2x'), (lambda x: log(2*x + 1), 0, 2, 'ln(2x+1)'), (cos, pi/2, -1, 'cos')]:
    ok(eq(D(fn, x), v), f'2.2 {name}')
ok(eq(D(f, 1), 2) and (4 - 1)/(2 - 1) == 3 and 1 - 2*1 == -1, '3.1')
for fn, x0, k, b, name in [(exp, 0, 1, 1, 'e^x'), (log, 1, 1, -1, 'ln x'), (lambda x: x**3 - 2*x, 1, 1, -2, 'x^3-2x'), (lambda x: x*x + 1, 1, 2, 0, 'x^2+1')]:
    ok(eq(D(fn, x0), k) and eq(fn(x0) - k*x0, b), f'3.2 {name}')
g = lambda x: x**3 - 3*x
ok([g(x) for x in (-2, -1, 0, 1, 2)] == [-2, 2, 0, -2, 2] and [round(D(g, x), 6) for x in (-2, -1, 0, 1, 2)] == [9, 0, -3, 0, 9], '4.1 tables')
ok(D(g, -1.5) > 0 and D(g, 0) < 0 and D(g, 1.5) > 0, '4.1 signs')
ok(D(g, -1.01) > 0 > D(g, -0.99) and D(g, 0.99) < 0 < D(g, 1.01) and g(-1) == 2 and g(1) == -2, '4.2 max/min')
c = lambda x: x**3; ok(D(c, -0.01) > 0 and D(c, 0.01) > 0, '4.2 x^3 not extremum')
xs = [3*i/30000 for i in range(30001)]; ok(eq(max(g(x) for x in xs), 18) and eq(min(g(x) for x in xs), -2) and [g(0), g(1), g(3)] == [0, -2, 18], '4.3 (also exam 12)')
k = lambda x: x**3 - 3*x*x; ok(all(D(k, x) < 0 for x in (0.1, 1, 1.9)) and D(k, -0.1) > 0 and D(k, 2.1) > 0, '4.4a (also exam 8)')
ok(eq(3*1 + (-3), 0), '4.4b'); m = lambda x: x*x - 2*log(x); ok(D(m, 0.5) < 0 and D(m, 1.5) > 0 and D(m, 5) > 0, '4.4c (also exam 6)')
ok(eq(D(lambda x: x**3, 2), 12), 'exam 1'); ok(eq(D(lambda x: sin(x) + exp(x), 0.7), cos(0.7) + exp(0.7)), 'exam 2'); ok(eq(D(lambda x: x*log(x), 1), 1), 'exam 3')
ok(eq(D(lambda x: x*x + 1, 1), 2) and 2 - 2*1 == 0, 'exam 4'); ok(eq(D(exp, 0), 1), 'exam 5'); ok(g(-1) == 2, 'exam 7')
ok(eq(D(lambda x: x**3 - 3*x*x, 2), 0) and D(lambda x: x**3 - 3*x*x, 1.9) < 0 < D(lambda x: x**3 - 3*x*x, 2.1), 'exam 9 a=-3')
ok(eq(D(lambda x: 3*x*x, 1), 6), 'exam 10'); ok(eq(D(lambda x: cos(2*x), 0.4), -2*sin(0.8)), 'exam 11')
print('ALL OK' if all(res) else 'SOME FAILED')
