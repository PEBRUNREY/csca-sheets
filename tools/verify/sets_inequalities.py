"""Independent check of the answers in subjects/math/sets-inequalities. Run: python tools/verify/sets_inequalities.py"""
from fractions import Fraction as F
from itertools import combinations
import math
ok = lambda c, m: print(('ok   ' if c else 'FAIL ') + m) or c
r = []
f = lambda x: x*x - 3*x + 2
r.append(ok([f(x) for x in (0, 1, 2, 3)] == [2, 0, 0, 2], '1.1 table'))
subsets = lambda n: sum(1 for k in range(n + 1) for _ in combinations(range(n), k))
r.append(ok([subsets(1), subsets(2), subsets(3), subsets(4)] == [2, 4, 8, 16], '1.3/1.4 subsets'))
U, A, B = set(range(1, 7)), {1, 2, 3}, {2, 3, 4, 5}
for x, row in [(1, (0, 1, 0)), (3, (1, 1, 0)), (4, (0, 1, 1)), (6, (0, 0, 1))]:
    r.append(ok(((x in A & B), (x in A | B), (x in U - A)) == tuple(map(bool, row)), f'2.1 row {x}'))
r.append(ok((18 - 8, 15 - 8, 18 + 15 - 8, 30 - 25) == (10, 7, 25, 5), '2.3'))
# 2.4: B ⊆ A with distinct elements
sols = []
for a in (math.sqrt(3), -math.sqrt(3), 0, 1):
    A2 = [1, 3, a]; B2 = [1, a * a]
    distinct = len({round(v, 9) for v in A2}) == 3 and len({round(v, 9) for v in B2}) == 2
    if distinct and all(any(abs(b - v) < 1e-9 for v in A2) for b in B2): sols.append(round(a, 6))
r.append(ok(sorted(sols) == sorted([round(math.sqrt(3), 6), round(-math.sqrt(3), 6), 0]), '2.4 a values'))
g = lambda x: x*x - x - 6
r.append(ok([g(x) for x in (-3, -2, 0, 3, 4)] == [6, 0, -6, 0, 6], '4.2'))
solve = lambda p, lo=-10, hi=10, st=F(1, 4): [x for x in [lo + st * i for i in range(int((hi - lo) / st) + 1)] if p(x)]
s = solve(lambda x: x*x - 4*x + 3 <= 0); r.append(ok((min(s), max(s)) == (1, 3), '4.3a [1,3]'))
s = solve(lambda x: -x*x + x + 2 > 0); r.append(ok(min(s) > -1 and max(s) < 2 and -1 not in s and 2 not in s, '4.3b (-1,2)'))
r.append(ok(4 - 12 < 0, '4.3c all R'))
r.append(ok(all((x - 1) * (x - 2) == x*x - 3*x + 2 for x in range(-5, 6)), '4.4 a=-3 b=2; exam a+b=-1'))
h = lambda x: None if x == -2 else F(x - 1, x + 2)
r.append(ok([h(x) for x in (-3, -2, 0, 1, 2)] == [4, None, F(-1, 2), 0, F(1, 4)], '5.1 table'))
s = solve(lambda x: x != -2 and F(x - 1, x + 2) <= 0); r.append(ok(min(s) > -2 and max(s) == 1, '5.1 (-2,1]'))
r.append(ok([abs(x - 2) for x in (-2, -1, 0, 2, 5, 6)] == [4, 3, 2, 0, 3, 4], '5.2 table'))
s = solve(lambda x: abs(2*x - 1) >= 3); r.append(ok(max(v for v in s if v < 0) == -1 and min(v for v in s if v > 0) == 2, '5.2 |2x-1|>=3'))
r.append(ok([16 // a for a in (1, 2, 4, 8, 16)] == [16, 8, 4, 2, 1] and [a + 16 // a for a in (1, 2, 4, 8, 16)] == [17, 10, 8, 10, 17], '5.3'))
mn = lambda fn, lo, hi: min((fn(lo + (hi - lo) * i / 100000), lo + (hi - lo) * i / 100000) for i in range(1, 100000))
for fn, lo, hi, m, at, name in [(lambda x: x + 4/x, 0, 10, 4, 2, 'x+4/x'), (lambda x: x + 9/x, 0, 10, 6, 3, 'x+9/x'), (lambda x: x + 1/(x - 1), 1, 10, 3, 2, 'x+1/(x-1)')]:
    v, x = mn(fn, lo, hi); r.append(ok(abs(v - m) < 1e-6 and abs(x - at) < 1e-3, '5.4 ' + name))
# exam
U = {1, 2, 3, 4, 5}; r.append(ok({1, 3} | (U - {2, 3, 4}) == {1, 3, 5}, 'exam 1'))
s = solve(lambda x: x*x - 2*x - 3 < 0 and x > 0); r.append(ok(min(s) > 0 and max(s) < 3 and max(s) >= F(11, 4), 'exam 2 (0,3)'))
s = solve(lambda x: -x*x + 3*x + 4 >= 0); r.append(ok((min(s), max(s)) == (-1, 4), 'exam 6 [-1,4]'))
s = solve(lambda x: x != 2 and F(x + 1, x - 2) < 0); r.append(ok(min(s) > -1 and max(s) < 2, 'exam 7 (-1,2)'))
s = solve(lambda x: abs(x - 1) <= 2); r.append(ok((min(s), max(s)) == (-1, 3), 'exam 8 [-1,3]'))
r.append(ok(40 - (25 + 20 - 10) == 5, 'exam 10'))
print('ALL OK' if all(r) else 'SOME FAILED')
