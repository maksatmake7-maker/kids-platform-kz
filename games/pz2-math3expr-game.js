/* Математика, 3 класс — «Выражения, скобки и уравнения» (цели 3.2.3.1–3.2.3.4). */
(function(){
PZ2.define({
  key:"math3expr", theme:'garden', icons:[], groups:[], mcq:[], tf:[],
  custom:function(C){
    var M = C.M, G = C.G, S = C.S, pick = C.pick, shuffle = C.shuffle, rnd = C.rnd;
    function o4(ans, extra){
      var c = shuffle([ans + 1, ans - 1, ans + 2, ans + 10, ans - 10, ans * 2].concat(extra || []).filter(function(x){ return x > 0 && x !== ans; }));
      var out = [ans]; c.forEach(function(x){ if(out.length < 4 && out.indexOf(x) < 0) out.push(x); });
      return out.map(String);
    }
    function ev(txt, ans, hint, plain, extra, q){
      return G.choice({ q:q || 'Найди значение выражения.', expr:'<span>' + txt + ' = ?</span>', opts:o4(ans, extra), ans:String(ans), layout:'wide', hint:hint, hintPlain:plain });
    }
    /* ⭐ порядок действий без скобок */
    function L1(){
      var k = pick(['pm', 'mp', 'dv', 'chain']);
      if(k === 'pm'){ var a = rnd(20, 90), b = rnd(2, 9), c = rnd(2, 9);
        return S('1a' + a + b + c, ev(a + ' + ' + b + ' · ' + c, a + b * c, 'Сначала умножение: ' + b + ' · ' + c + ' = ' + b * c + '.<br>Потом сложение: ' + a + ' + ' + b * c + ' = ' + (a + b * c), 'Сначала умножаем: ' + b + ' умножить на ' + c + ' будет ' + b * c + '. Потом складываем. Получается ' + (a + b * c) + '.', [(a + b) * c])); }
      if(k === 'mp'){ var b2 = rnd(2, 9), c2 = rnd(2, 9), a2 = b2 * c2 + rnd(10, 40);
        return S('1b' + a2 + b2 + c2, ev(a2 + ' − ' + b2 + ' · ' + c2, a2 - b2 * c2, 'Сначала умножение: ' + b2 + ' · ' + c2 + ' = ' + b2 * c2 + '.<br>Потом вычитание: ' + a2 + ' − ' + b2 * c2 + ' = ' + (a2 - b2 * c2), 'Сначала умножаем: ' + b2 + ' умножить на ' + c2 + ' будет ' + b2 * c2 + '. Потом вычитаем. Получается ' + (a2 - b2 * c2) + '.')); }
      if(k === 'dv'){ var q = rnd(2, 9), d = rnd(2, 9), a3 = rnd(11, 60);
        return S('1c' + a3 + q + d, ev(a3 + ' + ' + q * d + ' : ' + d, a3 + q, 'Сначала деление: ' + q * d + ' : ' + d + ' = ' + q + '.<br>Потом сложение: ' + a3 + ' + ' + q + ' = ' + (a3 + q), 'Сначала делим: ' + q * d + ' разделить на ' + d + ' будет ' + q + '. Потом складываем. Получается ' + (a3 + q) + '.')); }
      var a4 = rnd(50, 99), b4 = rnd(10, 30), c4 = rnd(5, 20); if(a4 - b4 < c4) a4 = b4 + c4 + rnd(5, 20);
      return S('1d' + a4 + b4 + c4, ev(a4 + ' − ' + b4 + ' − ' + c4, a4 - b4 - c4, 'Если только + и −, считаем слева направо:<br>' + a4 + ' − ' + b4 + ' = ' + (a4 - b4) + ', потом ' + (a4 - b4) + ' − ' + c4 + ' = ' + (a4 - b4 - c4), 'Считаем слева направо: ' + a4 + ' минус ' + b4 + ' будет ' + (a4 - b4) + ', потом минус ' + c4 + '. Получается ' + (a4 - b4 - c4) + '.'));
    }
    /* ⭐⭐ скобки, уравнения */
    function L2(){
      var k = pick(['br', 'br', 'eqp', 'eqm', 'eqx']);
      if(k === 'br'){ var a = rnd(11, 60), b = rnd(11, 39), c = rnd(2, 9), t = Math.random() < .5;
        if(t) return S('2a' + a + b + c, ev('(' + a + ' + ' + b + ') · ' + c, (a + b) * c, 'Сначала скобки: ' + a + ' + ' + b + ' = ' + (a + b) + '.<br>Потом умножение: ' + (a + b) + ' · ' + c + ' = ' + (a + b) * c, 'Сначала действие в скобках: ' + a + ' плюс ' + b + ' будет ' + (a + b) + '. Потом умножаем на ' + c + '. Получается ' + (a + b) * c + '.', [a + b * c]));
        var d = rnd(2, 9), e = rnd(2, 9), s = d * e + rnd(3, 20); return S('2b' + s + d + e, ev(s + ' − ' + d + ' · ' + e, s - d * e, 'Сначала умножение: ' + d + ' · ' + e + ' = ' + d * e + '.<br>Потом вычитание: ' + s + ' − ' + d * e + ' = ' + (s - d * e), 'Сначала умножаем, потом вычитаем. Получается ' + (s - d * e) + '.')); }
      var x = rnd(5, 90), b2 = rnd(5, 60);
      if(k === 'eqp') return S('2p' + x + b2, G.choice({ q:'Реши уравнение: x + ' + b2 + ' = ' + (x + b2), expr:'<span>x + ' + b2 + ' = ' + (x + b2) + '</span>', opts:o4(x), ans:String(x), layout:'wide', hint:'Неизвестное слагаемое = сумма − известное слагаемое:<br>x = ' + (x + b2) + ' − ' + b2 + ' = ' + x, hintPlain:'Чтобы найти слагаемое, из суммы вычитаем известное слагаемое. Получается ' + x + '.' }));
      if(k === 'eqm') return S('2m' + x + b2, G.choice({ q:'Реши уравнение: x − ' + b2 + ' = ' + x, expr:'<span>x − ' + b2 + ' = ' + x + '</span>', opts:o4(x + b2, [x]), ans:String(x + b2), layout:'wide', hint:'Уменьшаемое = разность + вычитаемое:<br>x = ' + x + ' + ' + b2 + ' = ' + (x + b2), hintPlain:'Чтобы найти уменьшаемое, к разности прибавляем вычитаемое. Получается ' + (x + b2) + '.' }));
      var f = rnd(2, 9), y = rnd(3, 9); return S('2x' + f + y, G.choice({ q:'Реши уравнение: x · ' + f + ' = ' + f * y, expr:'<span>x · ' + f + ' = ' + f * y + '</span>', opts:o4(y, [f]), ans:String(y), layout:'wide', hint:'Неизвестный множитель = произведение : известный множитель:<br>x = ' + f * y + ' : ' + f + ' = ' + y, hintPlain:'Чтобы найти множитель, произведение делим на известный множитель. Получается ' + y + '.' }));
    }
    /* ⭐⭐⭐ сложные выражения, неравенства, составь выражение */
    function L3(){
      var k = pick(['two', 'ineq', 'make', 'eq2', 'cmp']);
      if(k === 'two'){ var a, b, c, d, e; do { a = rnd(2, 9); b = rnd(2, 9); c = rnd(10, 50); d = rnd(2, 9); e = rnd(2, 9); } while(a * b + c - d * e < 3);
        return S('3t' + a + b + c + d + e, ev(a + ' · ' + b + ' + ' + c + ' − ' + d + ' · ' + e + (a * b + c - d * e > 0 ? '' : ''), a * b + c - d * e, 'Сначала умножение: ' + a + ' · ' + b + ' = ' + a * b + ' и ' + d + ' · ' + e + ' = ' + d * e + '.<br>Потом слева направо: ' + a * b + ' + ' + c + ' = ' + (a * b + c) + ', ' + (a * b + c) + ' − ' + d * e + ' = ' + (a * b + c - d * e), 'Сначала выполняем умножение, потом сложение и вычитание слева направо. Получается ' + (a * b + c - d * e) + '.')); }
      if(k === 'ineq'){ var x = rnd(5, 40), lim = x + rnd(10, 30);
        return S('3i' + lim + x, G.choice({ q:'Какое число подходит: x + 10 < ' + (lim + 10) + '?', expr:'<span>x + 10 < ' + (lim + 10) + '</span>', opts:shuffle([x, lim, lim + 1, lim + 12]).map(String), ans:String(x), layout:'wide', hint:'Подставляем числа. ' + x + ' + 10 = ' + (x + 10) + ', и ' + (x + 10) + ' < ' + (lim + 10) + ' — верно.', hintPlain:'Подставляем числа. Подходит только то, у которого сумма меньше ' + (lim + 10) + '. Это ' + x + '.' })); }
      if(k === 'make'){ var p = rnd(3, 9), q2 = rnd(2, 6), r = rnd(2, 9);
        var tx = 'Купили ' + q2 + ' тетрадей по ' + p + ' тенге и ручку за ' + r + ' тенге. Какое выражение показывает всю стоимость?';
        return S('3m' + p + q2 + r, G.choice({ q:tx, say:[G.say('Купили ' + q2 + ' тетрадей по ' + p + ' тенге и ручку за ' + r + ' тенге. Какое выражение показывает всю стоимость?')], opts:[q2 + ' · ' + p + ' + ' + r, q2 + ' + ' + p + ' · ' + r, '(' + q2 + ' + ' + p + ') · ' + r, p + ' · ' + r + ' + ' + q2], ans:q2 + ' · ' + p + ' + ' + r, layout:'wide', hint:'Тетради: ' + q2 + ' · ' + p + '. Ручка: ' + r + '. Всего: ' + q2 + ' · ' + p + ' + ' + r, hintPlain:'Стоимость тетрадей: ' + q2 + ' умножить на ' + p + '. Прибавляем стоимость ручки.' })); }
      if(k === 'eq2'){ var a2 = rnd(2, 9), x2 = rnd(3, 12), b2 = rnd(5, 30);
        return S('3e' + a2 + x2 + b2, G.choice({ q:'Реши уравнение: ' + a2 + ' · x + ' + b2 + ' = ' + (a2 * x2 + b2), expr:'<span>' + a2 + ' · x + ' + b2 + ' = ' + (a2 * x2 + b2) + '</span>', opts:o4(x2, [a2]), ans:String(x2), layout:'wide', hint:'Сначала найдём ' + a2 + ' · x: ' + (a2 * x2 + b2) + ' − ' + b2 + ' = ' + a2 * x2 + '.<br>Потом x = ' + a2 * x2 + ' : ' + a2 + ' = ' + x2, hintPlain:'Сначала найдём, чему равно произведение: ' + (a2 * x2 + b2) + ' минус ' + b2 + ' будет ' + a2 * x2 + '. Потом делим на ' + a2 + '. Получается ' + x2 + '.' })); }
      var a3 = rnd(2, 9), b3 = rnd(2, 9), c3 = rnd(2, 9), d3 = rnd(20, 60), lhs = a3 * b3 + c3, sy = M.cmpSym(lhs, d3); if(lhs === d3) d3 += 1; sy = M.cmpSym(lhs, d3);
      return S('3c' + a3 + b3 + c3 + d3, G.choice({ q:'Сравни: ' + a3 + ' · ' + b3 + ' + ' + c3 + ' и ' + d3, expr:'<span>' + a3 + ' · ' + b3 + ' + ' + c3 + '</span><span>?</span><span>' + d3 + '</span>', opts:['<', '>', '='], ans:sy, layout:'wide', hint:a3 + ' · ' + b3 + ' + ' + c3 + ' = ' + lhs + '. Сравниваем ' + lhs + ' и ' + d3 + ': ' + lhs + ' ' + sy + ' ' + d3, hintPlain:'Считаем значение выражения: ' + lhs + '. Сравниваем с ' + d3 + '.', hintExpr:'<span>' + a3 + ' · ' + b3 + ' + ' + c3 + '</span><span class="ok">' + sy + '</span><span>' + d3 + '</span>' }));
    }
    return [L1, L2, L3];
  }
});
})();
