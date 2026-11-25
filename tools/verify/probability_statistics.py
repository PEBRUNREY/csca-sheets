"""Independent check of the answers in subjects/math/probability-statistics (by brute-force counting)."""
from fractions import Fraction as F
from itertools import product, combinations
from statistics import mean, median, pvariance
from math import erf, sqrt, isclose
res = []
ok = lambda c, m: res.append(c) or print(('ok   ' if c else 'FAIL ') + m)
die = range(1, 7); P = lambda ev, space: F(sum(1 for o in space if ev(o)), len(space))
ok([sum(1 for d in die if d % 2 == 0), sum(1 for d in die if d > 4), 0, 6] == [3, 2, 0, 6] and P(lambda d: d % 2 == 0, list(die)) == F(1, 2) and P(lambda d: d > 4, list(die)) == F(1, 3), '1.1 (also exam 1)')
two = list(product(die, die))
ok([sum(1 for a, b in two if a + b == s) for s in range(2, 13)] == [1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1], '1.2 table')
ok(P(lambda o: sum(o) == 7, two) == F(1, 6) and P(lambda o: sum(o) >= 10, two) == F(1, 6) and P(lambda o: sum(o) == 2, two) == F(1, 36), '1.2 (also exam 2)')
balls = ['R1', 'R2', 'R3', 'W1', 'W2']; pairs = list(combinations(balls, 2)); nr = lambda p: sum(b[0] == 'R' for b in p)
ok(len(pairs) == 10 and [sum(1 for p in pairs if nr(p) == k) for k in (2, 1, 0)] == [3, 6, 1], '1.3 counts')
ok(P(lambda p: nr(p) == 2, pairs) == F(3, 10) and P(lambda p: nr(p) < 2, pairs) == F(7, 10), '1.3 (also exam 3)')
c2 = list(product('HT', repeat=2)); c3 = list(product('HT', repeat=3))
ok(P(lambda o: o == ('H', 'H'), c2) == F(1, 4) and P(lambda o: 'H' in o, c2) == F(3, 4) and P(lambda o: 'H' in o, c3) == F(7, 8), '2.1 (also exam 4)')
a, b = F(8, 10), F(6, 10)
ok((a*b, (1 - a)*(1 - b), 1 - (1 - a)*(1 - b), a*(1 - b) + (1 - a)*b) == (F(48, 100), F(8, 100), F(92, 100), F(44, 100)), '2.2 (also exam 5)')
d = [2, 4, 4, 5, 10]; ok(mean(d) == 5 and median(d) == 4 and max(set(d), key=d.count) == 4 and median([3, 8, 1, 6, 5, 9]) == 5.5, '3.1 (also exams 6, 11)')
A, B = [4, 5, 5, 5, 6], [1, 3, 5, 7, 9]
ok(mean(A) == mean(B) == 5 and [(x - 5)**2 for x in B] == [16, 4, 0, 4, 16] and isclose(pvariance(A), 0.4) and pvariance(B) == 8, '3.2 (also exam 7)')
base = [1, 2, 3]; ok(mean(base) == 2 and pvariance([F(x) for x in base]) == F(2, 3), '3.3 base')
for f, m, v in [(lambda x: x + 10, 12, F(2, 3)), (lambda x: 2*x + 1, 5, F(8, 3)), (lambda x: -3*x, -6, 6)]:
    t = [F(f(x)) for x in base]; ok(mean(t) == m and pvariance(t) == v, f'3.3 {t}')
ok((60*2 + 70*5 + 80*3) / 10 == 71, '3.4')
ok(2*5 + 1 == 11 and 2*2*2 == 8, 'exam 8 (a x + b rule, checked in 3.3)')
ok(isclose(1 - 0.2 - 0.2, 0.6) and isclose(0.6/2, 0.3), '4.1 (also exams 9, 10)')
Phi = lambda z: 0.5*(1 + erf(z/sqrt(2)))
ok(abs((Phi(1) - Phi(-1)) - 0.6827) < 1e-4 and abs((1 - Phi(1)) - 0.1587) < 1e-4 and round(1000*(1 - 0.6827)/2) == 159, '4.2')
ok(F(3, 10) + F(5, 10) == F(8, 10), 'exam 12')
print('ALL OK' if all(res) else 'SOME FAILED')
