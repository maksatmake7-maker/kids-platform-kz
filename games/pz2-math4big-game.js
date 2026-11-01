/* Математика, 4 класс — «Числа до миллиона» (цели 4.1.1.1–4.1.1.4). */
(function(){
PZ2.define({
  key:"math4big", theme:'sky', icons:[], groups:[], mcq:[], tf:[],
  custom:function(C){
    var K = M4.init(C, 40), rnd = K.rnd, pick = K.pick, shuffle = K.shuffle, f = K.f, ch = K.ch, W = K.words, near = K.near;
    var POS = ['единицы', 'десятки', 'сотни', 'единицы тысяч', 'десятки тысяч', 'сотни тысяч'];
    var POSG = ['единиц', 'десятков', 'сотен', 'единиц тысяч', 'десятков тысяч', 'сотен тысяч'];
    function num6(){ var s = String(rnd(1, 9)); for(var i = 0; i < 5; i++) s += rnd(0, 9); return +s; }
    function dp(n, p){ return Math.floor(n / Math.pow(10, p)) % 10; }
    function digOpts(n, ans, p){ var c = []; for(var i = 0; i < 6; i++) if(i !== p && dp(n, i) !== ans) c.push(dp(n, i)); c = shuffle(c); var out = [ans]; c.concat(shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])).forEach(function(x){ if(out.length < 4 && out.indexOf(x) < 0) out.push(x); }); return out.map(String); }
    function table(n){ var s = String(n); var out = []; for(var p = s.length - 1; p >= 0; p--) out.push(POS[p] + ' — ' + s.charAt(s.length - 1 - p)); return out.join(', '); }
    function sumTerms(n){ var s = String(n), t = []; for(var i = 0; i < s.length; i++) if(s.charAt(i) !== '0') t.push(+s.charAt(i) * Math.pow(10, s.length - 1 - i)); return t; }
    function swapNear(n){ var s = String(n).split(''), i = rnd(0, s.length - 2), t = s[i]; s[i] = s[i + 1]; s[i + 1] = t; return +s.join(''); }

    /* ⭐ разряды, чтение и запись */
    function L1(){
      var k = pick(['digit', 'digit', 'count', 'next', 'read', 'prev', 'unit']);
      if(k === 'digit'){ var n = num6(), p = rnd(0, 5), a = dp(n, p);
        return ch('1d' + n + p, { q:'Какая цифра стоит в разряде «' + POS[p] + '» в числе ' + f(n) + '?', opts:digOpts(n, a, p), ans:String(a), expr:'<span>' + f(n) + '</span>', hint:'Считаем справа налево: ' + table(n) + '.<br>В разряде «' + POS[p] + '» стоит цифра ' + a + '.', plain:'Считаем цифры справа налево. В разряде ' + POS[p] + ' стоит цифра ' + a + '.' }); }
      if(k === 'count'){ var len = rnd(4, 6), n2 = Math.pow(10, len - 1) * rnd(1, 9) + rnd(0, Math.pow(10, len - 1) - 1);
        return ch('1c' + n2, { q:'Сколько цифр в записи числа ' + f(n2) + '?', opts:[String(len), String(len - 1), String(len + 1), String(len + 2)], ans:String(len), expr:'<span>' + f(n2) + '</span>', hint:'Считаем все цифры: их ' + len + '. Такое число называют ' + ['', '', '', '', 'четырёхзначным', 'пятизначным', 'шестизначным'][len] + '.', plain:'Считаем все цифры в записи числа. Их ' + len + '.' }); }
      if(k === 'next'){ var b = rnd(1, 8) * 100000 + rnd(0, 9) * 10000 + rnd(0, 9) * 1000 + 999, n3 = b; if(rnd(0, 1)) n3 = rnd(1, 99) * 1000 + 999;
        return ch('1n' + n3, { q:'Какое число следует за числом ' + f(n3) + '?', opts:near(n3 + 1, [n3 + 10, n3 + 100, n3 - 1]), ans:f(n3 + 1), hint:'К числу прибавляем 1: ' + f(n3) + ' + 1 = ' + f(n3 + 1) + '. Девятки превращаются в нули, а перед ними цифра увеличивается на 1.', plain:'К числу прибавляем один. Девятки превращаются в нули, а цифра перед ними становится на один больше. Получается ' + n3 + ' плюс один равно ' + (n3 + 1) + '.' }); }
      if(k === 'prev'){ var n4 = rnd(1, 99) * 1000, n5 = rnd(0, 1) ? n4 : rnd(1, 9) * 100000;
        return ch('1p' + n5, { q:'Какое число стоит перед числом ' + f(n5) + '?', opts:near(n5 - 1, [n5 - 10, n5 - 100, n5 + 1]), ans:f(n5 - 1), hint:'От числа отнимаем 1: ' + f(n5) + ' − 1 = ' + f(n5 - 1) + '. Нули превращаются в девятки.', plain:'От числа отнимаем один. Нули превращаются в девятки. Получается ' + (n5 - 1) + '.' }); }
      if(k === 'read'){ var a1 = rnd(1, 9), a2 = rnd(1, 9), a3 = rnd(1, 9), n6 = pick([a1 * 100000 + a2 * 1000 + a3 * 10, a1 * 100000 + a2 * 100, a1 * 10000 + a2 * 100 + a3, a1 * 100000 + a3 * 10000 + a2]);
        var opts = [n6, swapNear(n6), Math.floor(n6 / 10), n6 * 10].filter(function(x, i, s){ return s.indexOf(x) === i; }); if(opts.length < 4) opts.push(n6 + 1000);
        return ch('1r' + n6, { q:'Как записать число цифрами: ' + W(n6) + '?', say:'Как записать число цифрами: ' + W(n6) + '?', opts:opts.slice(0, 4).map(f), ans:f(n6), hint:W(n6) + ' — это ' + f(n6) + '. Если разряда нет, на его месте пишем 0.', plain:'Записываем число по разрядам. Если какого-то разряда нет, на его месте пишем ноль. Получается ' + W(n6) + '.' }); }
      var n7 = num6(), p7 = rnd(3, 5);
      return ch('1u' + n7 + p7, { q:'Сколько ' + POSG[p7] + ' в числе ' + f(n7) + '?', opts:digOpts(n7, dp(n7, p7), p7), ans:String(dp(n7, p7)), expr:'<span>' + f(n7) + '</span>', hint:table(n7) + '.<br>' + POSG[p7].charAt(0).toUpperCase() + POSG[p7].slice(1) + ' — ' + dp(n7, p7) + '.', plain:'Смотрим на разряд ' + POS[p7] + '. Там стоит цифра ' + dp(n7, p7) + '.' });
    }
    /* ⭐⭐ классы, разрядные слагаемые, сравнение, округление */
    function L2(){
      var k = pick(['class', 'sum', 'cmp', 'round', 'round', 'class2', 'cmp2']);
      if(k === 'class'){ var n = num6(), th = Math.floor(n / 1000), un = n % 1000, which = pick(['тысяч', 'единиц']), ans = which === 'тысяч' ? th : un;
        var show = which === 'тысяч' ? String(ans) : (String(un).length < 3 ? ('0000' + un).slice(-3) : String(un));
        var o = [show, which === 'тысяч' ? ('0000' + un).slice(-3) : String(th), String(+(String(n).slice(0, 2))), String(+(String(n).slice(-2)))];
        return ch('2k' + n + which, { q:'Число ' + f(n) + '. Какое число записано в классе ' + which + '?', opts:o, ans:show, expr:'<span>' + f(n) + '</span>', hint:'Число делят на классы по три цифры справа налево: класс единиц — ' + ('000' + un).slice(-3) + ', класс тысяч — ' + th + '.', plain:'Цифры числа делят на классы по три справа налево. В классе ' + which + ' записано ' + show + '.' }); }
      if(k === 'sum'){ var n2 = pick([rnd(1, 9) * 100000 + rnd(1, 9) * 1000 + rnd(1, 9) * 10, rnd(1, 9) * 100000 + rnd(1, 9) * 10000 + rnd(1, 9), rnd(1, 9) * 10000 + rnd(1, 9) * 100 + rnd(1, 9), rnd(1, 9) * 100000 + rnd(1, 9) * 100]), t = sumTerms(n2);
        function mk(ts){ return ts.map(f).join(' + '); }
        function chg(i){ return t.map(function(x, j){ return j === i ? (x >= 10 ? x / 10 : x * 10) : x; }); }
        var t1 = t.slice(), wr = [mk(chg(0)), mk(chg(t.length - 1)), mk(chg(t.length > 1 ? 1 : 0))].filter(function(x, i, s2){ return x !== mk(t1) && s2.indexOf(x) === i; });
        while(wr.length < 3) wr.push(mk(t.map(function(x, j){ return j === 0 ? x + 10000 : x; })));
        return ch('2s' + n2, { q:'Представь число ' + f(n2) + ' в виде суммы разрядных слагаемых.', opts:[mk(t1)].concat(wr.filter(function(x){ return x !== mk(t1); })), ans:mk(t1), expr:'<span>' + f(n2) + '</span>', hint:table(n2) + '.<br>' + f(n2) + ' = ' + mk(t1), plain:'Раскладываем число по разрядам. Нулевые разряды пропускаем. Получается ' + mk(t1).replace(/\+/g, 'плюс') + '.' }); }
      if(k === 'cmp'){ var a = num6(), b = a, p = rnd(0, 5); while(b === a) b = a + (rnd(0, 1) ? 1 : -1) * rnd(1, 9) * Math.pow(10, p); if(b < 100000 || b > 999999) b = a + 10 * Math.pow(10, p) <= 999999 ? a + 10 * Math.pow(10, p) : a - 10 * Math.pow(10, p);
        var sy = a > b ? '>' : a < b ? '<' : '=';
        return ch('2c' + a + '_' + b, { q:'Сравни числа.', say:'Сравни числа ' + a + ' и ' + b + '.', expr:'<span>' + f(a) + ' ? ' + f(b) + '</span>', opts:['<', '>', '='], ans:sy, hint:'Сравниваем по разрядам слева направо, пока цифры не станут разными. ' + (sy === '>' ? f(a) + ' больше, чем ' + f(b) : sy === '<' ? f(a) + ' меньше, чем ' + f(b) : 'Числа равны') + '.', plain:'Сравниваем числа по разрядам слева направо. Первая разная цифра решает. ' + (sy === '>' ? 'Первое число больше.' : 'Первое число меньше.') }); }
      if(k === 'cmp2'){ var x = rnd(1, 9) * 100000 + rnd(1, 9) * 1000, y = rnd(0, 2), r = [{ e:f(Math.floor(x / 100000) * 100000) + ' + ' + f(x % 100000), v:x, w:f(x) }, { e:f(x / 1000) + ' тыс.', v:x, w:f(x) }, { e:f(x) + ' − 0', v:x, w:f(x) }][y];
        var other = x + pick([0, 0, 1000, -1000, 100]); var sy2 = x > other ? '>' : x < other ? '<' : '=';
        return ch('2d' + x + '_' + other + y, { q:'Сравни значения.', say:'Сравни ' + r.e.replace(/ /g, '').replace('тыс.', 'тысяч') + ' и ' + other + '.', expr:'<span>' + r.e + ' ? ' + f(other) + '</span>', opts:['<', '>', '='], ans:sy2, hint:r.e + ' = ' + r.w + '. Сравниваем ' + r.w + ' и ' + f(other) + ': ' + r.w + ' ' + sy2 + ' ' + f(other) + '.', plain:'Сначала узнаём, какое число записано слева. Это ' + x + '. Потом сравниваем с ' + other + '.' }); }
      if(k === 'class2'){ var n3 = rnd(10, 99) * 1000 + rnd(0, 999), cl = f(n3);
        return ch('2m' + n3, { q:'Сколько цифр в классе тысяч числа ' + cl + '?', opts:['2', '3', '1', '4'], ans:'2', expr:'<span>' + cl + '</span>', hint:'В числе ' + cl + ' класс тысяч — это ' + Math.floor(n3 / 1000) + ', цифр: 2.', plain:'Смотрим на цифры слева от пробела. Это класс тысяч, в нём две цифры.' }); }
      var n4 = num6(), pw = pick([[1000, 'тысяч'], [100, 'сотен'], [10000, 'десятков тысяч']]), r4 = Math.round(n4 / pw[0]) * pw[0], nxt = pw[0] === 1000 ? 3 : pw[0] === 100 ? 2 : 4;
      var wrongUp = (Math.floor(n4 / pw[0]) + 1) * pw[0], wrongDown = Math.floor(n4 / pw[0]) * pw[0], dig = dp(n4, nxt - 1), rr = dig >= 5 ? wrongUp : wrongDown;
      var nm = pw[0] === 1000 ? 'тысяч' : pw[0] === 100 ? 'сотен' : 'десятков тысяч';
      return ch('2o' + n4 + pw[0], { q:'Округли число ' + f(n4) + ' до ' + nm + '.', opts:[f(rr), f(rr === wrongUp ? wrongDown : wrongUp), f(Math.round(n4 / (pw[0] * 10)) * pw[0] * 10), f(n4 - n4 % 10)], ans:f(rr), expr:'<span>' + f(n4) + '</span>', hint:'Смотрим на цифру справа от разряда ' + nm + ': это ' + dig + '. Если она 5 или больше — округляем вверх, если меньше 5 — вниз.<br>Получается ' + f(rr) + '.', plain:'Смотрим на цифру справа от нужного разряда. Это ' + dig + '. ' + (dig >= 5 ? 'Она пять или больше, значит, округляем вверх.' : 'Она меньше пяти, значит, округляем вниз.') + ' Получается ' + rr + '.' });
    }
    /* ⭐⭐⭐ общее количество разрядных единиц, миллион, составление чисел */
    function L3(){
      var k = pick(['total', 'total', 'maxmin', 'mil', 'readw', 'neigh', 'build', 'mil2']);
      if(k === 'total'){ var n = rnd(2, 99) * 1000 + rnd(0, 9) * 100 + rnd(0, 9) * 10, u = pick([[10, 'десятков'], [100, 'сотен'], [1000, 'тысяч']]), ans = Math.floor(n / u[0]);
        return ch('3t' + n + u[0], { q:'Сколько всего ' + u[1] + ' в числе ' + f(n) + '?', opts:near(ans, [ans * 10, Math.floor(n / (u[0] * 10)), ans + 1]), ans:f(ans), expr:'<span>' + f(n) + '</span>', hint:'Чтобы узнать, сколько всего ' + u[1] + ', делим число на ' + f(u[0]) + ' (отбрасываем столько нулей, сколько в разрядной единице).<br>' + f(n) + ' : ' + f(u[0]) + ' = ' + f(ans), plain:'Чтобы узнать, сколько всего ' + u[1] + ', делим число на ' + u[0] + '. Получается ' + ans + '.' }); }
      if(k === 'maxmin'){ var ds = shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 6); if(ds.indexOf(0) < 0) ds[0] = 0; ds = shuffle(ds); var big = pick([true, false]), srt = ds.slice().sort(function(a, b){ return big ? b - a : a - b; });
        if(!big){ var zi = srt.indexOf(0); if(zi === 0){ var nz = srt.findIndex(function(x){ return x > 0; }); var t = srt[0]; srt[0] = srt[nz]; srt[nz] = t; srt = [srt[0]].concat(srt.slice(1).sort(function(a, b){ return a - b; })); } }
        var ans2 = +srt.join(''), o2 = [ans2, +ds.slice().sort(function(a, b){ return big ? a - b : b - a; }).join(''), +ds.join(''), +srt.slice().reverse().join('')].filter(function(x, i, s){ return s.indexOf(x) === i && x >= 100000; });
        while(o2.length < 4) o2.push(ans2 + 9 * o2.length);
        return ch('3m' + ds.join('') + big, { q:'Составь ' + (big ? 'наибольшее' : 'наименьшее') + ' шестизначное число из цифр ' + ds.join(', ') + ' (каждую цифру используем один раз).', opts:o2.slice(0, 4).map(f), ans:f(ans2), hint:big ? 'Для наибольшего числа ставим цифры по убыванию: слева самую большую. Получается ' + f(ans2) + '.' : 'Для наименьшего числа ставим цифры по возрастанию, но на первое место нельзя поставить 0. Получается ' + f(ans2) + '.', plain:big ? 'Для наибольшего числа ставим цифры по убыванию, слева самую большую. Получается ' + ans2 + '.' : 'Для наименьшего числа ставим цифры по возрастанию, но ноль на первое место ставить нельзя. Получается ' + ans2 + '.' }); }
      if(k === 'mil'){ var q = pick([['Сколько нулей в записи числа «один миллион»?', '6', ['5', '7', '3'], '1 000 000 — после единицы шесть нулей.'], ['Сколько тысяч в одном миллионе?', '1 000', ['100', '10 000', '10'], '1 000 · 1 000 = 1 000 000, значит, в миллионе тысяча тысяч.'], ['Какое число следует за числом 999 999?', '1 000 000', ['990 000', '100 000', '999 000'], '999 999 + 1 = 1 000 000 — это миллион.'], ['Сколько сотен тысяч в одном миллионе?', '10', ['100', '1', '1 000'], '10 · 100 000 = 1 000 000.']]);
        return ch('3z' + q[0].length + q[1], { q:q[0], opts:q[2].concat([q[1]]), ans:q[1], hint:q[3], plain:q[3].replace(/·/g, 'умножить на').replace(/=/g, 'равно').replace(/\+/g, 'плюс').replace(/ /g, '') }); }
      if(k === 'mil2'){ var m = rnd(2, 9) * 10 + rnd(0, 9), n9 = m * 1000000;
        return ch('3q' + m, { q:'Запиши цифрами: ' + W(n9) + '.', opts:[f(n9), f(m * 100000), f(m * 10000000), f(m * 1000)], ans:f(n9), hint:m + ' миллионов — это ' + m + ' и ещё шесть нулей: ' + f(n9) + '.', plain:W(m) + ' миллионов — это ' + m + ' и ещё шесть нулей. Получается ' + n9 + '.' }); }
      if(k === 'readw'){ var n5 = rnd(1, 9) * 100000 + rnd(1, 9) * 1000 + rnd(1, 99), wr = [n5, swapNear(n5), n5 - 99 + 9 * 10, Math.floor(n5 / 10) * 1]; var w2 = [n5, n5 + 1000 * rnd(1, 3), n5 - 1000 * rnd(1, 3), Math.floor(n5 / 1000) * 100 + n5 % 1000].filter(function(x, i, s){ return s.indexOf(x) === i; });
        return ch('3w' + n5, { q:'Как читается число ' + f(n5) + '?', opts:w2.slice(0, 4).map(W), ans:W(n5), expr:'<span>' + f(n5) + '</span>', hint:'Читаем класс тысяч, говорим «тысяч», потом читаем класс единиц: ' + W(n5) + '.', plain:'Читаем сначала класс тысяч, потом слово тысяч, потом класс единиц: ' + W(n5) + '.' }); }
      if(k === 'neigh'){ var n6 = num6(), lo = Math.floor(n6 / 1000) * 1000; if(n6 % 1000 === 0) n6 += rnd(1, 999), lo = Math.floor(n6 / 1000) * 1000;
        return ch('3n' + n6, { q:'Между какими соседними круглыми тысячами лежит число ' + f(n6) + '?', opts:[f(lo) + ' и ' + f(lo + 1000), f(lo - 1000) + ' и ' + f(lo), f(lo + 1000) + ' и ' + f(lo + 2000), f(lo - 100) + ' и ' + f(lo + 900)], ans:f(lo) + ' и ' + f(lo + 1000), expr:'<span>' + f(n6) + '</span>', hint:'Отбросим сотни, десятки и единицы: получим ' + f(lo) + '. Следующая круглая тысяча — ' + f(lo + 1000) + '.', plain:'Отбросим три последние цифры, получим ' + lo + '. Следующая круглая тысяча — ' + (lo + 1000) + '.' }); }
      var h = rnd(1, 9), t = rnd(1, 9), e = rnd(1, 9), d = rnd(1, 9), n7 = h * 100000 + t * 10000 + e * 1000 + d * 10;
      return ch('3b' + n7, { q:'Запиши число: ' + h + ' сотен тысяч, ' + t + ' десятков тысяч, ' + e + ' единиц тысяч и ' + d + ' десятков.', opts:[f(n7), f(h * 100000 + t * 10000 + e * 1000 + d), f(h * 100000 + t * 10000 + e * 100 + d * 10), f(h * 100000 + e * 10000 + t * 1000 + d * 10)], ans:f(n7), hint:'Пишем цифры по разрядам слева направо: ' + h + ' ' + t + ' ' + e + ', потом сотни — нет, значит 0, десятки — ' + d + ', единицы — нет, значит 0. Получается ' + f(n7) + '.', plain:'Пишем цифры по разрядам слева направо. Сотен нет, пишем ноль. Единиц нет, пишем ноль. Получается ' + n7 + '.' });
    }
    return K.levels([L1, L2, L3]);
  }
});
})();
