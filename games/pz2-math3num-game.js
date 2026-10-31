/* Математика, 3 класс — «Числа до 1000» (цели 3.1.1.1–3.1.1.4, 3.1.2.5). Разрядные блоки рисуются кодом: games/math3-art.js. */
(function(){
PZ2.define({
  key:"math3num", theme:'sky', icons:[], groups:[], mcq:[], tf:[],
  custom:function(C){
    var M = C.M, G = C.G, S = C.S, pick = C.pick, shuffle = C.shuffle, rnd = C.rnd, P = G.plural;
    var HW = function(h){ return h + ' ' + P(h, 'сотня', 'сотни', 'сотен'); }, TW = function(t){ return t + ' ' + P(t, 'десяток', 'десятка', 'десятков'); }, OW = function(o){ return o + ' ' + P(o, 'единица', 'единицы', 'единиц'); };
    function dig(n){ return [Math.floor(n / 100), Math.floor(n / 10) % 10, n % 10]; }
    function rn(lo, hi){ return rnd(lo, hi); }
    function distract(n){
      var d = dig(n), c = [n + 1, n - 1, n + 10, n - 10, n + 100, n - 100, d[0] * 100 + d[2] * 10 + d[1], d[1] * 100 + d[0] * 10 + d[2], d[2] * 100 + d[1] * 10 + d[0]];
      c = shuffle(c.filter(function(x){ return x !== n && x >= 100 && x <= 999; }));
      var out = [n]; c.forEach(function(x){ if(out.length < 4 && out.indexOf(x) < 0) out.push(x); });
      while(out.length < 4){ var x = rn(101, 999); if(out.indexOf(x) < 0) out.push(x); }
      return out;
    }
    function composeText(n){ var d = dig(n); return d[0] + '·100 + ' + d[1] + '·10 + ' + d[2]; }
    function sumText(n){ var d = dig(n), p = []; if(d[0]) p.push(d[0] * 100); if(d[1]) p.push(d[1] * 10); if(d[2]) p.push(d[2]); return p.join(' + ') + ' = <b>' + n + '</b>'; }
    function hintN(n){ var d = dig(n);
      return { hintVis:M3.blocks3(d[0], d[1], d[2], 300), hint:sumText(n), hintPlain:HW(d[0]) + (d[1] ? ', ' + TW(d[1]) : '') + (d[2] ? ' и ' + OW(d[2]) : '') + '. Это число ' + n + '.' }; }

    /* ⭐ читаем число по блокам, считаем сотни, соседние числа */
    function L1(){
      var k = pick(['read', 'read', 'hund', 'next', 'prev']);
      if(k === 'read'){ var n = pick([rn(101, 999), rn(1, 9) * 100 + rn(0, 9) * 10 + rn(0, 9)]); if(n < 100) n = 237;
        var d = dig(n);
        return S('1r' + n, G.choice(Object.assign({ q:'Какое число показано?', opts:distract(n), ans:n, layout:'wide', field:function(el){ el.innerHTML = M3.blocks3(d[0], d[1], d[2], 340); } }, hintN(n)))); }
      if(k === 'hund'){ var m = rn(101, 999), h = dig(m)[0];
        return S('1h' + m, G.choice({ q:'Сколько сотен в числе ' + m + '?', opts:M.numOpts(h, 1, 9).map(function(o){ return o.v; }), ans:h, layout:'wide', hint:'В числе ' + m + ' цифра сотен — ' + h + '. Значит, ' + HW(h) + '.', hintVis:M3.blocks3(h, 0, 0, 240), hintPlain:'В числе ' + m + ' цифра сотен — ' + h + '. Значит, ' + HW(h) + '.' })); }
      var nn = rn(101, 998);
      if(k === 'next') return S('1n' + nn, G.choice({ q:'Какое число идёт сразу после ' + nn + '?', opts:[nn + 1, nn - 1, nn + 10, nn + 2].map(String), ans:nn + 1, layout:'wide', hint:'После ' + nn + ' идёт ' + (nn + 1) + ': нужно прибавить 1.', hintPlain:'После ' + nn + ' идёт ' + (nn + 1) + '. Нужно прибавить один.' }));
      return S('1p' + nn, G.choice({ q:'Какое число идёт сразу перед ' + nn + '?', opts:[nn - 1, nn + 1, nn - 10, nn - 2].map(String), ans:nn - 1, layout:'wide', hint:'Перед ' + nn + ' идёт ' + (nn - 1) + ': нужно отнять 1.', hintPlain:'Перед ' + nn + ' идёт ' + (nn - 1) + '. Нужно отнять один.' }));
    }

    /* ⭐⭐ составляем число, разряды, счёт сотнями и десятками */
    function L2(){
      var k = pick(['comp', 'digit', 'expand', 'skip', 'skip']);
      if(k === 'comp'){ var d = [rn(1, 9), rn(0, 9), rn(0, 9)], n = d[0] * 100 + d[1] * 10 + d[2];
        var q = 'Составь число: ' + HW(d[0]) + ', ' + TW(d[1]) + ', ' + OW(d[2]) + '.';
        return S('2c' + n, G.choice(Object.assign({ q:q, opts:distract(n), ans:n, layout:'wide' }, hintN(n)))); }
      if(k === 'digit'){ var dd = shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 3); if(!dd[0]){ dd[0] = dd[1]; dd[1] = 0; } var n2 = dd[0] * 100 + dd[1] * 10 + dd[2];
        var pos = rn(0, 2), nm = ['сотни', 'десятки', 'единицы'], dg = dd[pos];
        return S('2d' + n2 + pos, G.choice({ q:'Что показывает цифра ' + dg + ' в числе ' + n2 + '?', opts:nm, ans:nm[pos], layout:'wide', hintVis:M3.blocks3(dd[0], dd[1], dd[2], 300),
          hint:'В числе ' + n2 + ': ' + HW(dd[0]) + ', ' + TW(dd[1]) + ', ' + OW(dd[2]) + '.<br>Цифра ' + dg + ' показывает ' + nm[pos] + '.', hintPlain:'В числе ' + n2 + ' цифра ' + dg + ' показывает ' + nm[pos] + '.' })); }
      if(k === 'expand'){ var e = [rn(1, 9), rn(0, 9), rn(0, 9)], n3 = e[0] * 100 + e[1] * 10 + e[2], parts = [e[0] * 100]; if(e[1]) parts.push(e[1] * 10); if(e[2]) parts.push(e[2]);
        return S('2e' + n3, G.choice(Object.assign({ q:'Сколько будет ' + parts.join(' плюс ') + '?', expr:'<span>' + parts.join(' + ') + ' = ?</span>', opts:distract(n3), ans:n3, layout:'wide' }, hintN(n3)))); }
      var step = pick([10, 100, 10, 100, -10, -100]), a = step > 0 ? rn(1, 5) * (Math.abs(step) === 100 ? 100 : 10) + (Math.abs(step) === 10 ? rn(1, 6) * 100 : 0) : rn(5, 9) * 100 + (Math.abs(step) === 10 ? rn(2, 9) * 10 : 0);
      var seq = [a, a + step, a + 2 * step], ans = a + 3 * step;
      return S('2s' + a + step, G.choice({ q:'Продолжи счёт: ' + seq.join(', ') + ', …', opts:[ans, ans + step, ans - step, ans + (Math.abs(step) === 10 ? 100 : 10)].map(String), ans:ans, layout:'wide', expr:'<span>' + seq.join(', ') + ', ?</span>',
        hint:'Каждое число ' + (step > 0 ? 'больше' : 'меньше') + ' предыдущего на ' + Math.abs(step) + '. Дальше ' + ans + '.', hintPlain:'Каждое число ' + (step > 0 ? 'больше' : 'меньше') + ' предыдущего на ' + Math.abs(step) + '. Дальше ' + ans + '.' }));
    }

    /* ⭐⭐⭐ сравниваем, ищем наибольшее, тысяча, верно ли */
    function L3(){
      var k = pick(['cmp', 'cmp', 'max', 'thou', 'tf']);
      if(k === 'cmp'){ var a = rn(101, 998), b = pick([a + pick([-30, -3, -1, 1, 3, 30, 100, -100]), dig(a)[2] * 100 + dig(a)[1] * 10 + dig(a)[0]]); if(b < 100 || b > 999) b = a + 11; if(b === a) b = a + 1;
        var sy = M.cmpSym(a, b), da = dig(a), db = dig(b), why = da[0] !== db[0] ? 'Сравниваем сотни: ' + da[0] + (da[0] > db[0] ? ' больше ' : ' меньше ') + db[0] + '.' : da[1] !== db[1] ? 'Сотни одинаковые. Сравниваем десятки: ' + da[1] + (da[1] > db[1] ? ' больше ' : ' меньше ') + db[1] + '.' : 'Сотни и десятки одинаковые. Сравниваем единицы: ' + da[2] + (da[2] > db[2] ? ' больше ' : ' меньше ') + db[2] + '.';
        return S('3c' + a + '_' + b, G.choice({ q:'Сравни числа ' + a + ' и ' + b + '.', say:[G.say('Сравни числа ' + a + ' и ' + b + '. Какой знак нужно поставить?')], opts:['<', '>', '='], ans:sy, layout:'wide', expr:'<span>' + a + '</span><span>?</span><span>' + b + '</span>',
          hint:why + '<br>' + a + ' ' + sy + ' ' + b, hintPlain:why + ' Значит, ' + (sy === '<' ? a + ' меньше ' + b : sy === '>' ? a + ' больше ' + b : 'числа равны') + '.', hintExpr:'<span>' + a + '</span><span class="ok">' + sy + '</span><span>' + b + '</span>' })); }
      if(k === 'max'){ var big = Math.random() < .5, base = rn(2, 8) * 100, set = shuffle([base + rn(1, 9) * 10 + rn(0, 9), base + rn(1, 9) * 10 + rn(0, 9), base + rn(0, 99), base + rn(0, 99)]); var u = []; set.forEach(function(x){ if(u.indexOf(x) < 0) u.push(x); }); while(u.length < 4){ var y = base + rn(0, 99); if(u.indexOf(y) < 0) u.push(y); }
        var ans2 = big ? Math.max.apply(null, u) : Math.min.apply(null, u);
        return S('3m' + u.join('') + big, G.choice({ q:big ? 'Выбери самое большое число.' : 'Выбери самое маленькое число.', opts:u.map(String), ans:ans2, layout:'wide', hint:'Сравниваем по разрядам: сначала десятки, потом единицы. ' + (big ? 'Самое большое: ' : 'Самое маленькое: ') + ans2 + '.', hintPlain:'Сотни у всех одинаковые, поэтому сравниваем десятки, потом единицы. ' + (big ? 'Самое большое число — ' : 'Самое маленькое число — ') + ans2 + '.' })); }
      if(k === 'thou'){ var v = pick(['hund', 'plus', 'count']);
        if(v === 'hund') return S('3th1', G.choice({ q:'Сколько сотен в одной тысяче?', opts:['10', '100', '1', '1000'], ans:'10', layout:'wide', hintVis:M3.blocks3(9, 0, 0, 340) , hint:'Десять сотен — это одна тысяча: 10 · 100 = 1000.', hintPlain:'Десять сотен — это одна тысяча.' }));
        if(v === 'plus') return S('3th2', G.choice({ q:'Сколько будет 999 плюс 1?', opts:['1000', '990', '1001', '100'], ans:'1000', layout:'wide', expr:'<span>999 + 1 = ?</span>', hint:'После 999 идёт 1000, это тысяча.', hintPlain:'После девятьсот девяносто девяти идёт тысяча.' }));
        var t0 = rn(1, 4), ans3 = (t0 + 3) * 1000; return S('3th3' + t0, G.choice({ q:'Продолжи счёт тысячами: ' + [t0, t0 + 1, t0 + 2].map(function(x){ return x * 1000; }).join(', ') + ', …', opts:[ans3, ans3 + 100, ans3 - 100, ans3 + 1000].map(String), ans:ans3, layout:'wide', hint:'Считаем тысячами: каждый раз на 1000 больше. Дальше ' + ans3 + '.', hintPlain:'Считаем тысячами: каждый раз на тысячу больше. Дальше ' + ans3 + '.' })); }
      var n4 = rn(101, 999), d4 = dig(n4), t = pick(['h', 't', 'o']), ix = { h:0, t:1, o:2 }[t], nm = { h:'сотен', t:'десятков', o:'единиц' }[t], truth = Math.random() < .5, val = truth ? d4[ix] : (d4[ix] + rn(1, 8)) % 10; if(!truth && val === d4[ix]) val = (val + 1) % 10;
      return S('3f' + n4 + t + truth, G.tf({ q:'В числе ' + n4 + ' ' + val + ' ' + (t === 'h' ? P(val, 'сотня', 'сотни', 'сотен') : t === 't' ? P(val, 'десяток', 'десятка', 'десятков') : P(val, 'единица', 'единицы', 'единиц')) + '.', truth:truth, hintVis:M3.blocks3(d4[0], d4[1], d4[2], 300), hint:'В числе ' + n4 + ': ' + HW(d4[0]) + ', ' + TW(d4[1]) + ', ' + OW(d4[2]) + '.' }));
    }
    return [L1, L2, L3];
  }
});
})();
