/* Математика, 4 класс — «Выражения и уравнения» (порядок действий, двойные неравенства, уравнения, выражения с переменными). */
(function(){
PZ2.define({
  key:"math4eq4", theme:'night', icons:[], groups:[], mcq:[], tf:[],
  custom:function(C){
    var K = M4.init(C, 40), rnd = K.rnd, pick = K.pick, f = K.f, ch = K.ch, near = K.near, pl = K.pl, tf = K.tf;
    function sayE(s){
      return String(s).replace(/ /g, ' ').replace(/\s*\(\s*/g, ' скобка открывается, ').replace(/\s*\)/g, ', скобка закрывается').replace(/ \+ /g, ' плюс ').replace(/ − /g, ' минус ').replace(/ · /g, ' умножить на ').replace(/ : /g, ' разделить на ').replace(/ = /g, ' равно ').replace(/ ≤ /g, ' меньше или равно ').replace(/ ≥ /g, ' больше или равно ').replace(/ < /g, ' меньше ').replace(/ > /g, ' больше ').replace(/\bx\b/g, 'икс').replace(/\ba\b/g, 'а').replace(/\bb\b/g, 'бэ').replace(/\bk\b/g, 'ка').replace(/(\d) (?=\d{3})/g, '$1');
    }
    function wrap(n){ return '(' + n.s + ')'; }
    function gen(k){
      if(k === 0){ var v = rnd(2, 12); return { v:v, s:String(v), p:3, n:0, op:null }; }
      var kl = rnd(0, k - 1), a = gen(kl), b = gen(k - 1 - kl); if(!a || !b) return null; var op = pick(['+', '−', '·', ':']), P = (op === '+' || op === '−') ? 1 : 2, v2, ok = true;
      if(op === '+') v2 = a.v + b.v; else if(op === '−'){ v2 = a.v - b.v; ok = v2 > 0; } else if(op === '·'){ v2 = a.v * b.v; ok = v2 <= 900; } else { ok = b.v >= 2 && a.v % b.v === 0; v2 = a.v / b.v; }
      if(!ok) return null;
      return { v:v2, s:(a.p < P ? wrap(a) : a.s) + ' ' + op + ' ' + (b.p <= P ? wrap(b) : b.s), p:P, n:a.n + b.n + 1, op:op };
    }
    function expr(k){
      for(var t = 0; t < 4000; t++){
        var e = gen(k); if(!e || e.v > 3000) continue;
        var par = (e.s.match(/\(/g) || []).length, mul = /[·:]/.test(e.s), add = /[+−]/.test(e.s);
        if(par <= 2 && mul && add && !/\([^()]*\(/.test(e.s)) return e;
      }
      return { v:25, s:'5 + 4 · 5', p:1, n:2, op:'+' };
    }
    var ACT = { '+':'сложение', '−':'вычитание', '·':'умножение', ':':'деление' };
    /* ⭐ порядок действий */
    function L1(){
      var k = pick(['val', 'val', 'val', 'cnt', 'last']), e = expr(k === 'val' ? rnd(4, 5) : rnd(4, 5));
      if(k === 'val'){
        return ch('1v' + e.s, { q:'Найди значение выражения.', expr:e.s, say:'Найди значение выражения: ' + sayE(e.s), opts:near(e.v, [e.v + 10, e.v - 10]), ans:f(e.v), hint:'Сначала действия в скобках, потом умножение и деление слева направо, в конце сложение и вычитание.<br>Ответ: ' + e.s + ' = ' + f(e.v), plain:'Сначала считаем в скобках, потом умножение и деление слева направо, в конце сложение и вычитание. Получается ' + e.v + '.' });
      }
      if(k === 'cnt'){
        return ch('1c' + e.s, { q:'Сколько действий в выражении?', expr:e.s, say:'Сколько действий в выражении: ' + sayE(e.s), opts:[String(e.n - 1), String(e.n), String(e.n + 1), String(e.n + 2)], ans:String(e.n), hint:'Считаем знаки действий: + − · : — их ' + e.n + '.', plain:'Считаем знаки действий. Их ' + e.n + '.' });
      }
      return ch('1l' + e.s, { q:'Какое действие выполняется последним?', expr:e.s, say:'Какое действие выполняется последним в выражении: ' + sayE(e.s), opts:['сложение', 'вычитание', 'умножение', 'деление'], ans:ACT[e.op], hint:'Последним выполняют действие, которое связывает два готовых результата. Здесь это ' + ACT[e.op] + '.', plain:'Последним выполняют действие, которое связывает два готовых результата. Здесь это ' + ACT[e.op] + '.' });
    }
    /* ⭐⭐ двойные неравенства и простые уравнения */
    function L2(){
      var k = pick(['dbl', 'cntn', 'eq1', 'eq2', 'eq3']);
      if(k === 'dbl'){ var a = rnd(10, 90), b = a + rnd(4, 9), s1 = pick(['<', '≤']), s2 = pick(['<', '≤']), lo = a + (s1 === '<' ? 1 : 0), hi = b - (s2 === '<' ? 1 : 0), x = rnd(lo, hi);
        var bad = [a - 1, b + 1, s1 === '<' ? a : b + 2].filter(function(z){ return !(z > a - (s1 === '≤' ? 1 : 0) && z < b + (s2 === '≤' ? 1 : 0)) || false; });
        var opts = near(x, bad.length ? bad : [a - 1, b + 1]);
        return ch('2d' + a + b + s1 + s2, { q:'Какое число x удовлетворяет неравенству?', expr:a + ' ' + s1 + ' x ' + s2 + ' ' + b, say:'Какое число икс удовлетворяет неравенству: ' + sayE(a + ' ' + s1 + ' x ' + s2 + ' ' + b), opts:opts, ans:f(x), hint:'Число должно быть ' + (s1 === '<' ? 'больше ' : 'не меньше ') + a + ' и ' + (s2 === '<' ? 'меньше ' : 'не больше ') + b + '. Подходит ' + x + '.', plain:'Число должно быть ' + (s1 === '<' ? 'больше ' : 'не меньше ') + a + ' и ' + (s2 === '<' ? 'меньше ' : 'не больше ') + b + '. Подходит ' + x + '.' }); }
      if(k === 'cntn'){ var a2 = rnd(10, 60), len = rnd(3, 7), b2 = a2 + len, n = len - 1;
        return ch('2n' + a2 + b2, { q:'Сколько натуральных чисел x удовлетворяют неравенству?', expr:a2 + ' < x < ' + b2, say:'Сколько натуральных чисел икс удовлетворяют неравенству: ' + sayE(a2 + ' < x < ' + b2), opts:near(n, [len, len + 1, n - 1]), ans:f(n), hint:'Числа от ' + (a2 + 1) + ' до ' + (b2 - 1) + ': всего ' + n + '.', plain:'Числа от ' + (a2 + 1) + ' до ' + (b2 - 1) + '. Всего ' + n + '.' }); }
      if(k === 'eq1'){ var x2 = rnd(2, 9), q = rnd(5, 60);
        var bb = x2 * rnd(2, 12), cc = q + bb / x2;
        return ch('2e' + q + bb + x2, { q:'Найди x.', expr:q + ' + ' + bb + ' : x = ' + cc, say:'Найди икс: ' + sayE(q + ' + ' + bb + ' : x = ' + cc), opts:near(x2, [bb / x2, bb - q]), ans:f(x2), hint:q + ' + ' + bb + ' : x = ' + cc + '<br>' + bb + ' : x = ' + cc + ' − ' + q + ' = ' + (cc - q) + '<br>x = ' + bb + ' : ' + (cc - q) + ' = ' + x2, plain:'Сначала найдём, чему равно деление: ' + cc + ' минус ' + q + ' будет ' + (cc - q) + '. Значит, ' + bb + ' разделить на икс равно ' + (cc - q) + '. Икс равен ' + x2 + '.' }); }
      if(k === 'eq2'){ var x3 = rnd(3, 15), p = rnd(2, 9), q2 = rnd(2, 30), tot = (x3 + q2) * p;
        return ch('2f' + p + q2 + x3, { q:'Найди x.', expr:'(x + ' + q2 + ') · ' + p + ' = ' + tot, say:'Найди икс: ' + sayE('(x + ' + q2 + ') · ' + p + ' = ' + tot), opts:near(x3, [tot / p, tot - q2 - p]), ans:f(x3), hint:'(x + ' + q2 + ') · ' + p + ' = ' + tot + '<br>x + ' + q2 + ' = ' + tot + ' : ' + p + ' = ' + tot / p + '<br>x = ' + tot / p + ' − ' + q2 + ' = ' + x3, plain:'Сначала найдём сумму в скобках: ' + tot + ' разделить на ' + p + ' будет ' + tot / p + '. Потом из ' + tot / p + ' вычтем ' + q2 + '. Получается ' + x3 + '.' }); }
      var x4 = rnd(3, 20), p2 = rnd(2, 9), q3 = rnd(5, 40), tot2 = x4 * p2 + q3;
      return ch('2g' + p2 + q3 + x4, { q:'Найди x.', expr:p2 + ' · x + ' + q3 + ' = ' + tot2, say:'Найди икс: ' + sayE(p2 + ' · x + ' + q3 + ' = ' + tot2), opts:near(x4, [tot2 - q3, (tot2 + q3) / p2 | 0]), ans:f(x4), hint:p2 + ' · x + ' + q3 + ' = ' + tot2 + '<br>' + p2 + ' · x = ' + tot2 + ' − ' + q3 + ' = ' + (tot2 - q3) + '<br>x = ' + (tot2 - q3) + ' : ' + p2 + ' = ' + x4, plain:'Сначала вычтем ' + q3 + ' из ' + tot2 + ', получится ' + (tot2 - q3) + '. Потом разделим на ' + p2 + '. Икс равен ' + x4 + '.' });
    }
    /* ⭐⭐⭐ сложные уравнения и выражения с переменными */
    function L3(){
      var k = pick(['eqr', 'eqr', 'var', 'var', 'ver', 'sub']);
      if(k === 'eqr'){ var p = rnd(2, 9) * 10 + rnd(0, 9), x = rnd(2, 6), q = rnd(10, 90), s = pick([2, 4, 5]), val = p * x + q, r = val * s;
        return ch('3e' + p + q + x, { q:'Найди x.', expr:p + ' · x + ' + q + ' = ' + f(r) + ' : ' + s, say:'Найди икс: ' + sayE(p + ' · x + ' + q + ' = ' + r + ' : ' + s), opts:near(x, [x + 1, x - 1, val]), ans:f(x), hint:'Правая часть: ' + f(r) + ' : ' + s + ' = ' + val + '<br>' + p + ' · x = ' + val + ' − ' + q + ' = ' + (val - q) + '<br>x = ' + (val - q) + ' : ' + p + ' = ' + x, plain:'Сначала считаем правую часть: ' + r + ' разделить на ' + s + ' будет ' + val + '. Потом ' + val + ' минус ' + q + ' будет ' + (val - q) + '. Делим на ' + p + ' и получаем ' + x + '.' }); }
      if(k === 'var'){ var a = rnd(2, 12), m = rnd(2, 9), b = rnd(2, 9) * 3, v = m * a + b / 3;
        return ch('3v' + a + m + b, { q:'Найди значение выражения при a = ' + a + ' и b = ' + b + '.', expr:m + ' · a + b : 3', say:'Найди значение выражения ' + m + ' умножить на а плюс бэ разделить на три при а равно ' + a + ' и бэ равно ' + b, opts:near(v, [m * a + b, (m * a + b) / 3 | 0]), ans:f(v), hint:'Подставляем: ' + m + ' · ' + a + ' + ' + b + ' : 3<br>= ' + m * a + ' + ' + b / 3 + ' = ' + f(v), plain:'Подставляем числа. ' + m + ' умножить на ' + a + ' будет ' + m * a + '. ' + b + ' разделить на три будет ' + b / 3 + '. Складываем. Получается ' + v + '.' }); }
      if(k === 'ver'){ var x2 = rnd(3, 20), p2 = rnd(2, 9), q2 = rnd(2, 30), tot = x2 * p2 + q2, cand = pick([x2, x2 + 1, x2 - 1]) , truth = cand === x2;
        var hh = 'Подставим: ' + p2 + ' · ' + cand + ' + ' + q2 + ' = ' + (p2 * cand + q2) + (truth ? '. Получили ' + tot + ', значит, верно.' : '. Нужно ' + tot + ', значит, неверно.');
        return ch('3t' + p2 + q2 + x2 + cand, { q:'Верно ли, что x = ' + cand + ' — корень уравнения?', expr:p2 + ' · x + ' + q2 + ' = ' + tot, say:'Верно ли, что икс равно ' + cand + ' — корень уравнения ' + sayE(p2 + ' · x + ' + q2 + ' = ' + tot) + '?', opts:['Верно', 'Неверно'], ans:truth ? 'Верно' : 'Неверно', hint:hh, plain:hh.replace(/ · /g, ' умножить на ').replace(/ \+ /g, ' плюс ').replace(/ = /g, ' равно ') }); }
      var a3 = rnd(3, 9), b3 = rnd(2, a3 - 1) , c3 = rnd(2, 9), v3 = (a3 - b3) * c3;
      return ch('3s' + a3 + b3 + c3, { q:'Найди значение выражения c · (a − b) при a = ' + a3 + ', b = ' + b3 + ' и c = ' + c3 + '.', say:'Найди значение выражения це умножить на скобка открывается а минус бэ, скобка закрывается, при а равно ' + a3 + ', бэ равно ' + b3 + ' и це равно ' + c3, opts:near(v3, [c3 * a3 - b3, a3 - b3 + c3]), ans:f(v3), hint:'c · (a − b) = ' + c3 + ' · (' + a3 + ' − ' + b3 + ') = ' + c3 + ' · ' + (a3 - b3) + ' = ' + v3, plain:'Сначала в скобках: ' + a3 + ' минус ' + b3 + ' будет ' + (a3 - b3) + '. Потом умножаем на ' + c3 + '. Получается ' + v3 + '.' });
    }
    return K.levels([L1, L2, L3]);
  }
});
})();
