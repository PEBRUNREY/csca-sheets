"""Independent check of the answers in subjects/math/sequences."""
from fractions import Fraction as F
res = []
ok = lambda c, m: res.append(c) or print(('ok   ' if c else 'FAIL ') + m)
ok([2*n - 1 for n in range(1, 6)] == [1, 3, 5, 7, 9] and [n*n for n in range(1, 6)] == [1, 4, 9, 16, 25], '1.1 rows 1-2')
ok([F((-1)**n, n) for n in range(1, 6)] == [-1, F(1, 2), F(-1, 3), F(1, 4), F(-1, 5)], '1.1 row 3')
ok(3 + 9*4 == 39 and F(1, 2)**6 == F(1, 64) and F((-1)**8, 7) == F(1, 7), '1.2')
S = lambda n: n*n; ok([S(n) for n in (1, 2, 3, 4)] == [1, 4, 9, 16] and [S(1)] + [S(n) - S(n-1) for n in (2, 3, 4)] == [1, 3, 5, 7], '1.3 table 1')
S = lambda n: n*n + 1; ok([S(n) for n in (1, 2, 3, 4)] == [2, 5, 10, 17] and [S(1)] + [S(n) - S(n-1) for n in (2, 3, 4)] == [2, 3, 5, 7], '1.3 table 2')
d = lambda s: [b - a for a, b in zip(s, s[1:])]
ok(d([3, 7, 11, 15, 19]) == [4]*4 and d([20, 17, 14, 11, 8]) == [-3]*4 and d([1, 4, 9, 16, 25]) == [3, 5, 7, 9], '2.1')
a = lambda n: 3 + (n - 1)*4; ok(a(10) == 39 and a(100) == 399 and all(a(n) == 4*n - 1 for n in range(1, 50)), '2.2')
s = [3, 7, 11, 15, 19]; ok(s[0] + s[4] == s[1] + s[3] == 2*s[2] == 22, '2.3')
ok(sum(range(1, 101)) == 5050 and sum(a(n) for n in range(1, 11)) == 210, '2.4')
import itertools
good = True
for a1 in range(-5, 6):
    for dd in range(-4, 5):
        t = lambda n: a1 + (n - 1)*dd
        if t(3) + t(7) == 10: good &= t(5) == 5 and sum(t(n) for n in range(1, 10)) == 45
ok(good, '2.5')
t = lambda n: 19 + (n - 1)*(-2); sums = [sum(t(k) for k in range(1, n + 1)) for n in range(1, 30)]
ok(t(10) == 1 and t(11) == -1 and sums.index(max(sums)) + 1 == 10 and max(sums) == 100 and sums.count(100) == 1, '2.6 (also exam 11)')
r = lambda s: [F(b, a) for a, b in zip(s, s[1:])]
ok(r([2, 6, 18, 54]) == [3]*3 and r([16, 8, 4, 2]) == [F(1, 2)]*3 and r([1, -2, 4, -8]) == [-2]*3, '3.1')
ok(2*3**4 == 162 and 2*3**6 == 1458, '3.2')
g = [2**k for k in range(6)]; ok(g[1]*g[5] == g[2]*g[4] == g[3]**2 == 64, '3.3')
ok(sum(2**k for k in range(10)) == 1023, '3.4')
ok(sum(3*2**k for k in range(5)) == 93, '3.5a')
ok(F(16, 2) == 8 and 2**3 == 8 and F(2, 2) == 1, '3.5b')
ok(all((a1*q**2)*(a1*q**6) == (a1*q**4)**2 for a1 in (1, 2, F(1, 3)) for q in (2, 3, F(1, 2))) and 4*4 == 16, '3.5c')
x = [1]; [x.append(x[-1] + 3) for _ in range(19)]; ok(x[:4] == [1, 4, 7, 10] and x[19] == 58, '4.1 row 1 and a20 (exam 12)')
x = [1]; [x.append(3*x[-1]) for _ in range(3)]; ok(x == [1, 3, 9, 27], '4.1 row 2')
x = [1]; [x.append(x[-1] + n) for n in range(1, 4)]; ok(x == [1, 2, 4, 7] and d(x) == [1, 2, 3], '4.1 row 3 neither')
tt = [F(1, n*(n + 1)) for n in range(1, 5)]; ok(tt == [F(1, 2), F(1, 6), F(1, 12), F(1, 20)] and [sum(tt[:k]) for k in range(1, 5)] == [F(1, 2), F(2, 3), F(3, 4), F(4, 5)], '4.2 table')
ok(sum(F(1, n*(n + 1)) for n in range(1, 100)) == F(99, 100) and sum(F(1, n*(n + 1)) for n in range(1, 10)) == F(9, 10), '4.2 and exam 9')
ok(2 + 9*3 == 29, 'exam 1'); ok(5*(1 + 9)//2 == 25, 'exam 3'); ok(2**5 == 32, 'exam 4'); ok(sum(3**k for k in range(6)) == 364, 'exam 7')
S = lambda n: n*n + n; ok(S(5) - S(4) == 10, 'exam 8')
ok([F((-1)**(n + 1), n) for n in range(1, 5)] == [1, F(-1, 2), F(1, 3), F(-1, 4)], 'exam 10')
print('ALL OK' if all(res) else 'SOME FAILED')
