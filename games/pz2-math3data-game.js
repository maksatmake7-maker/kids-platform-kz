/* Математика, 3 класс — «Диаграммы, таблицы и закономерности» (цели 3.5.2.1, 3.5.3.1–3.5.3.2). Столбики рисуются кодом: M3.bars. */
(function(){
PZ2.define({
  key:"math3data", theme:'meadow', icons:[], groups:[], mcq:[], tf:[],
  custom:function(C){
    var M = C.M, G = C.G, S = C.S, pick = C.pick, shuffle = C.shuffle, rnd = C.rnd, P = G.plural;
    function nopts(ans, ex){ var c = shuffle([ans + 1, ans - 1, ans + 2, ans - 2, ans + 5, ans * 2].concat(ex || []).filter(function(x){ return x > 0 && x !== ans; })), out = [ans]; c.forEach(function(x){ if(out.length < 4 && out.indexOf(x) < 0) out.push(x); }); return out.map(String); }
    var TOPICS = [
      ['Любимые фрукты класса', ['яблоко', 'груша', 'банан', 'слива'], 'человек выбрали'],
      ['Книги в библиотеке за неделю', ['Пн', 'Вт', 'Ср', 'Чт'], 'книг выдали'],
      ['Цветы на клумбах', ['роза', 'тюльпан', 'ромашка', 'астра'], 'цветов'],
      ['Любимые игры', ['футбол', 'шашки', 'прятки', 'классики'], 'детей выбрали']
    ];
    function dset(){ var t = pick(TOPICS), vals = shuffle([2, 4, 5, 6, 7, 8, 10, 12, 14, 15, 16, 18, 20]).slice(0, 4); return { t:t, vals:vals }; }
    function show(d){ return function(el){ el.innerHTML = '<div style="font:800 1rem \'Baloo 2\',sans-serif;text-align:center;margin-bottom:4px">' + d.t[0] + '</div>' + M3.bars(d.t[1], d.vals); }; }
    function key(d){ return d.t[0] + d.vals.join('_'); }
    /* ⭐ читаем диаграмму */
    function L1(){
      var d = dset(), k = pick(['val', 'max', 'min']), i = rnd(0, 3), mx = Math.max.apply(null, d.vals), mn = Math.min.apply(null, d.vals);
      if(k === 'val') return S('1v' + key(d) + i, G.choice({ q:'Сколько у столбика «' + d.t[1][i] + '»?', opts:nopts(d.vals[i]), ans:String(d.vals[i]), layout:'wide', field:show(d), hint:'Смотрим на высоту столбика «' + d.t[1][i] + '»: ' + d.vals[i] + '.', hintPlain:'Смотрим, до какого числа доходит столбик. Это ' + d.vals[i] + '.' }));
      if(k === 'max'){ var a = d.t[1][d.vals.indexOf(mx)];
        return S('1x' + key(d), G.choice({ q:'У какого столбика значение самое большое?', opts:d.t[1].slice(), ans:a, layout:'wide', field:show(d), hint:'Самый высокий столбик — «' + a + '».', hintPlain:'Самый высокий столбик — ' + a + '.' })); }
      var b = d.t[1][d.vals.indexOf(mn)];
      return S('1n' + key(d), G.choice({ q:'У какого столбика значение самое маленькое?', opts:d.t[1].slice(), ans:b, layout:'wide', field:show(d), hint:'Самый низкий столбик — «' + b + '».', hintPlain:'Самый низкий столбик — ' + b + '.' }));
    }
    /* ⭐⭐ считаем по диаграмме */
    function L2(){
      var d = dset(), k = pick(['diff', 'total', 'two', 'more']), i = rnd(0, 3), j = (i + rnd(1, 3)) % 4, tot = d.vals.reduce(function(a, b){ return a + b; }, 0);
      if(k === 'total') return S('2t' + key(d), G.choice({ q:'Сколько всего получается, если сложить все столбики?', opts:nopts(tot), ans:String(tot), layout:'wide', field:show(d), hint:d.vals.join(' + ') + ' = ' + tot, hintPlain:'Складываем значения всех столбиков: получается ' + tot + '.' }));
      if(k === 'two') return S('2w' + key(d) + i + j, G.choice({ q:'Сколько получится, если сложить «' + d.t[1][i] + '» и «' + d.t[1][j] + '»?', opts:nopts(d.vals[i] + d.vals[j]), ans:String(d.vals[i] + d.vals[j]), layout:'wide', field:show(d), hint:d.vals[i] + ' + ' + d.vals[j] + ' = ' + (d.vals[i] + d.vals[j]), hintPlain:'Складываем два значения: ' + d.vals[i] + ' плюс ' + d.vals[j] + ' будет ' + (d.vals[i] + d.vals[j]) + '.' }));
      var hi = Math.max(d.vals[i], d.vals[j]), lo = Math.min(d.vals[i], d.vals[j]), A = d.vals[i] >= d.vals[j] ? i : j, B = A === i ? j : i;
      if(k === 'more') return S('2m' + key(d) + A + B, G.choice({ q:'На сколько у «' + d.t[1][A] + '» больше, чем у «' + d.t[1][B] + '»?', opts:nopts(hi - lo, [hi + lo]), ans:String(hi - lo), layout:'wide', field:show(d), hint:hi + ' − ' + lo + ' = ' + (hi - lo), hintPlain:'Из большего вычитаем меньшее: ' + hi + ' минус ' + lo + ' будет ' + (hi - lo) + '.' }));
      return S('2d' + key(d) + A + B, G.choice({ q:'На сколько «' + d.t[1][B] + '» меньше, чем «' + d.t[1][A] + '»?', opts:nopts(hi - lo, [hi + lo]), ans:String(hi - lo), layout:'wide', field:show(d), hint:hi + ' − ' + lo + ' = ' + (hi - lo), hintPlain:'Из большего вычитаем меньшее: ' + hi + ' минус ' + lo + ' будет ' + (hi - lo) + '.' }));
    }
    /* ⭐⭐⭐ закономерности */
    function L3(){
      var k = pick(['add', 'mul', 'alt', 'dec', 'fig']), a = rnd(2, 30), d = rnd(2, 9);
      if(k === 'add'){ var seq = [a, a + d, a + 2 * d, a + 3 * d], nx = a + 4 * d;
        return S('3a' + a + '_' + d, G.choice({ q:'Какое число продолжит ряд? ' + seq.join(', ') + ', …', expr:'<span>' + seq.join(', ') + ', ?</span>', opts:nopts(nx, [nx + 1, nx - 1]), ans:String(nx), layout:'wide', hint:'Каждое число больше предыдущего на ' + d + '. Дальше: ' + seq[3] + ' + ' + d + ' = ' + nx, hintPlain:'Каждое число больше предыдущего на ' + d + '. Дальше будет ' + nx + '.' })); }
      if(k === 'mul'){ var m = pick([2, 3]), s0 = rnd(1, 4), seq2 = [s0, s0 * m, s0 * m * m, s0 * m * m * m], nx2 = seq2[3] * m;
        return S('3m' + s0 + '_' + m, G.choice({ q:'Какое число продолжит ряд? ' + seq2.join(', ') + ', …', expr:'<span>' + seq2.join(', ') + ', ?</span>', opts:nopts(nx2, [seq2[3] + m]), ans:String(nx2), layout:'wide', hint:'Каждое число в ' + m + ' раза больше предыдущего: ' + seq2[3] + ' · ' + m + ' = ' + nx2, hintPlain:'Каждое число в ' + m + ' раза больше предыдущего. Дальше будет ' + nx2 + '.' })); }
      if(k === 'dec'){ var st = rnd(3, 9), b0 = st * rnd(5, 9) + rnd(0, 2) * 0, seq3 = [b0, b0 - st, b0 - 2 * st, b0 - 3 * st], nx3 = b0 - 4 * st;
        return S('3d' + b0 + '_' + st, G.choice({ q:'Какое число продолжит ряд? ' + seq3.join(', ') + ', …', expr:'<span>' + seq3.join(', ') + ', ?</span>', opts:nopts(nx3, [nx3 + 2]), ans:String(nx3), layout:'wide', hint:'Каждое число меньше предыдущего на ' + st + '. Дальше: ' + seq3[3] + ' − ' + st + ' = ' + nx3, hintPlain:'Каждое число меньше предыдущего на ' + st + '. Дальше будет ' + nx3 + '.' })); }
      if(k === 'alt'){ var x = rnd(1, 9), y = rnd(1, 9); if(x === y) y = x + 1; var seq4 = [x, y, x, y, x];
        return S('3t' + x + '_' + y, G.choice({ q:'Какое число продолжит ряд? ' + seq4.join(', ') + ', …', expr:'<span>' + seq4.join(', ') + ', ?</span>', opts:shuffle([y, x, x + y, y + 1].filter(function(v, i, s){ return s.indexOf(v) === i; }).slice(0, 4)).map(String), ans:String(y), layout:'wide', hint:'Числа повторяются парами: ' + x + ', ' + y + '. После ' + x + ' снова идёт ' + y + '.', hintPlain:'Числа повторяются: сначала ' + x + ', потом ' + y + '. Дальше будет ' + y + '.' })); }
      var n = rnd(5, 9), st2 = rnd(2, 4), st1 = rnd(1, 3); var w = n * st2; if(w > 40) w = 40;
      return S('3f' + n + '_' + st2, G.choice({ q:'Сколько палочек нужно для ' + n + ' домиков в ряд, если на каждый домик нужно ' + st2 + ' палочки?', opts:nopts(n * st2, [n + st2]), ans:String(n * st2), layout:'wide', hint:'Каждый домик — ' + st2 + ' палочки: ' + n + ' · ' + st2 + ' = ' + n * st2, hintPlain:'Каждому домику нужно по ' + st2 + ' палочки. Умножаем: получается ' + n * st2 + '.' }));
    }
    return [L1, L2, L3];
  }
});
})();
