/* Математика, 3 класс — «Таблица умножения на 6, 7, 8, 9» (цели 3.2.2.9–3.2.2.11). */
(function(){
PZ2.define({
  key:"math3tbl", theme:'autumn', icons:[], groups:[], mcq:[], tf:[],
  custom:function(C){
    var M = C.M, G = C.G, S = C.S, pick = C.pick, shuffle = C.shuffle, rnd = C.rnd, P = G.plural;
    function o4(ans, a, b){
      var c = shuffle([ans + a, ans - a, ans + b, ans - b, ans + 1, ans - 1, ans + 10, ans - 10].filter(function(x){ return x > 0 && x !== ans; }));
      var out = [ans]; c.forEach(function(x){ if(out.length < 4 && out.indexOf(x) < 0) out.push(x); });
      return out.map(String);
    }
    function row(a){ var s = []; for(var i = 1; i <= 10; i++) s.push(a * i); return s.join(', '); }
    function mulHint(a, b){ return { hint:'Из таблицы на ' + a + ': ' + row(a) + '.<br>' + a + ' · ' + b + ' = ' + a * b + ' (ещё можно: ' + a + ' · ' + (b - 1) + ' + ' + a + ' = ' + (a * (b - 1)) + ' + ' + a + ')', hintPlain:a + ' умножить на ' + b + ' будет ' + a * b + '. Можно так: ' + a + ' умножить на ' + (b - 1) + ' будет ' + a * (b - 1) + ', и ещё ' + a + '. Получается ' + a * b + '.' }; }
    function mk(a, b){ var sw = Math.random() < .5, x = sw ? b : a, y = sw ? a : b;
      return G.choice(Object.assign({ q:'Сколько будет ' + x + ' умножить на ' + y + '?', expr:'<span>' + x + ' · ' + y + ' = ?</span>', opts:o4(a * b, a, b), ans:String(a * b), layout:'wide' }, mulHint(a, b))); }
    /* ⭐ на 6 и 7 */
    function L1(){
      var k = pick(['mul', 'mul', 'mul', 'div', 'row']), a = pick([6, 7]), b = rnd(2, 9);
      if(k === 'mul') return S('1m' + a + '_' + b + Math.random(), mk(a, b));
      if(k === 'div') return S('1d' + a + '_' + b, G.choice({ q:'Сколько будет ' + a * b + ' разделить на ' + a + '?', expr:'<span>' + a * b + ' : ' + a + ' = ?</span>', opts:o4(b, 1, 2), ans:String(b), layout:'wide', hint:'Вспомни таблицу: ' + a + ' · ' + b + ' = ' + a * b + ', значит, ' + a * b + ' : ' + a + ' = ' + b, hintPlain:a + ' умножить на ' + b + ' будет ' + a * b + ', значит ' + a * b + ' разделить на ' + a + ' будет ' + b + '.' }));
      var i = rnd(2, 6), seq = [a * i, a * (i + 1), a * (i + 2)], nx = a * (i + 3);
      return S('1r' + a + '_' + i, G.choice({ q:'Продолжи счёт по ' + a + ': ' + seq.join(', ') + ', …', expr:'<span>' + seq.join(', ') + ', ?</span>', opts:o4(nx, a, 1), ans:String(nx), layout:'wide', hint:'Каждый раз прибавляем ' + a + ': ' + seq[2] + ' + ' + a + ' = ' + nx, hintPlain:'Каждый раз прибавляем ' + a + '. Получается ' + nx + '.' }));
    }
    /* ⭐⭐ на 8 и 9, обратные действия */
    function L2(){
      var k = pick(['mul', 'mul', 'div', 'miss', 'nine']), a = pick([8, 9]), b = rnd(3, 9);
      if(k === 'mul') return S('2m' + a + '_' + b + Math.random(), mk(a, b));
      if(k === 'div') return S('2d' + a + '_' + b, G.choice({ q:'Сколько будет ' + a * b + ' разделить на ' + a + '?', expr:'<span>' + a * b + ' : ' + a + ' = ?</span>', opts:o4(b, 1, 2), ans:String(b), layout:'wide', hint:'Ищем в таблице на ' + a + ' число ' + a * b + ': ' + row(a) + '. Оно получается при ' + a + ' · ' + b + '.', hintPlain:a + ' умножить на ' + b + ' будет ' + a * b + ', значит ' + a * b + ' разделить на ' + a + ' будет ' + b + '.' }));
      if(k === 'miss') return S('2x' + a + '_' + b, G.choice({ q:'Найди неизвестный множитель: ' + a + ' · ? = ' + a * b, expr:'<span>' + a + ' · ? = ' + a * b + '</span>', opts:o4(b, 1, 2), ans:String(b), layout:'wide', hint:'Неизвестный множитель = произведение : известный множитель: ' + a * b + ' : ' + a + ' = ' + b, hintPlain:'Чтобы найти множитель, произведение делим на известный множитель. ' + a * b + ' разделить на ' + a + ' будет ' + b + '.' }));
      var n = rnd(2, 9); return S('2n' + n, G.choice({ q:'Как быстро умножить ' + n + ' на 9?', opts:[n + ' · 10 − ' + n, n + ' · 10 + ' + n, n + ' · 9 + 9', n + ' · 8 − ' + n], ans:n + ' · 10 − ' + n, layout:'wide', hint:'9 · ' + n + ' = 10 · ' + n + ' − ' + n + ' = ' + n * 10 + ' − ' + n + ' = ' + n * 9, hintPlain:'Чтобы умножить на девять, можно умножить на десять и вычесть число. Получается ' + n * 9 + '.' }));
    }
    /* ⭐⭐⭐ все числа, задачи, в несколько раз */
    function L3(){
      var k = pick(['mix', 'task', 'times', 'cmp', 'div']), a = pick([6, 7, 8, 9]), b = rnd(4, 9);
      if(k === 'mix') return S('3m' + a + '_' + b + Math.random(), mk(a, b));
      if(k === 'task'){ var who = pick([['коробках', 'карандашей', 'В каждой коробке'], ['пакетах', 'яблок', 'В каждом пакете'], ['рядах', 'стульев', 'В каждом ряду']]);
        var tx = 'В ' + b + ' ' + who[0] + ' по ' + a + ' ' + who[1] + '. Сколько ' + who[1].replace('карандашей', 'карандашей').replace('стульев', 'стульев') + ' всего?';
        return S('3t' + a + '_' + b + who[0], G.choice({ q:tx, say:[G.say(tx)], opts:o4(a * b, a, b), ans:String(a * b), layout:'wide', hint:'' + who[2] + ' по ' + a + ', а их ' + b + '. Значит, ' + a + ' · ' + b + ' = ' + a * b, hintPlain:'Нужно ' + a + ' умножить на ' + b + '. Получается ' + a * b + '.' })); }
      if(k === 'times'){ var c = rnd(2, 6), d = pick([6, 7, 8, 9]);
        var tx2 = 'Длина ленты ' + d + ' см, а другой — в ' + c + ' ' + P(c, 'раз', 'раза', 'раз') + ' больше. Сколько сантиметров во второй ленте?';
        return S('3x' + c + '_' + d, G.choice({ q:tx2, say:[G.say(tx2)], opts:o4(c * d, c, d), ans:String(c * d), layout:'wide', hint:'«В ' + c + ' раз больше» — умножаем: ' + d + ' · ' + c + ' = ' + c * d, hintPlain:'Слова «в несколько раз больше» значат, что нужно умножить. ' + d + ' умножить на ' + c + ' будет ' + c * d + '.' })); }
      if(k === 'cmp'){ var p = rnd(6, 9), q = rnd(6, 9), r = rnd(6, 9), s2 = rnd(6, 9); if(p * q === r * s2) s2 = s2 === 9 ? 8 : s2 + 1; var sy = M.cmpSym(p * q, r * s2);
        return S('3c' + p + q + r + s2, G.choice({ q:'Сравни: ' + p + ' · ' + q + ' и ' + r + ' · ' + s2, expr:'<span>' + p + ' · ' + q + '</span><span>?</span><span>' + r + ' · ' + s2 + '</span>', opts:['<', '>', '='], ans:sy, layout:'wide', hint:p + ' · ' + q + ' = ' + p * q + ', ' + r + ' · ' + s2 + ' = ' + r * s2 + '. Значит, ' + p * q + ' ' + sy + ' ' + r * s2, hintPlain:'Считаем: ' + p * q + ' и ' + r * s2 + '. Сравниваем эти числа.', hintExpr:'<span>' + p + ' · ' + q + '</span><span class="ok">' + sy + '</span><span>' + r + ' · ' + s2 + '</span>' })); }
      var z = a * b, t = rnd(2, 9), tx3 = 'Сколько раз ' + a + ' содержится в числе ' + z + '?';
      return S('3v' + z + '_' + a, G.choice({ q:tx3, opts:o4(b, 1, 2), ans:String(b), layout:'wide', expr:'<span>' + z + ' : ' + a + ' = ?</span>', hint:z + ' : ' + a + ' = ' + b + ', потому что ' + a + ' · ' + b + ' = ' + z, hintPlain:z + ' разделить на ' + a + ' будет ' + b + ', потому что ' + a + ' умножить на ' + b + ' будет ' + z + '.' }));
    }
    return [L1, L2, L3];
  }
});
})();
