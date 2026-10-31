/* Математика, 3 класс — «Доли и дроби» (цели 3.1.4.1–3.1.4.3). Полоски и круги рисуются кодом: M3.fracBar, M3.fracPie. */
(function(){
PZ2.define({
  key:"math3frac", theme:'garden', icons:[], groups:[], mcq:[], tf:[],
  custom:function(C){
    var M = C.M, G = C.G, S = C.S, pick = C.pick, shuffle = C.shuffle, rnd = C.rnd, P = G.plural;
    var NM = { 2:'половина', 3:'треть', 4:'четверть', 5:'пятая часть', 6:'шестая часть', 8:'восьмая часть', 10:'десятая часть' };
    function fr(n, d){ return n + '/' + d; }
    function spoken(n, d){ var D = { 2:['вторая', 'вторых'], 3:['третья', 'третьих'], 4:['четвёртая', 'четвёртых'], 5:['пятая', 'пятых'], 6:['шестая', 'шестых'], 7:['седьмая', 'седьмых'], 8:['восьмая', 'восьмых'], 9:['девятая', 'девятых'], 10:['десятая', 'десятых'] }[d]; return n === 1 ? 'одна ' + D[0] : n + ' ' + D[1]; }
    function fopts(n, d){
      var c = shuffle([fr(d - n, d), fr(n, d + 1), fr(n + 1, d), fr(Math.max(1, n - 1), d), fr(n, d - 1 > n ? d - 1 : d + 2), fr(d, n + d)].filter(function(x){ return x !== fr(n, d); })), out = [fr(n, d)];
      c.forEach(function(x){ if(out.length < 4 && out.indexOf(x) < 0) out.push(x); }); return out;
    }
    function nopts(ans){ var c = shuffle([ans + 1, ans - 1, ans + 2, ans * 2, ans + 5].filter(function(x){ return x > 0 && x !== ans; })), out = [ans]; c.forEach(function(x){ if(out.length < 4 && out.indexOf(x) < 0) out.push(x); }); return out.map(String); }

    /* ⭐ какая часть закрашена */
    function L1(){
      var k = pick(['bar', 'pie', 'bar', 'pie', 'den']), d = rnd(2, 8), n = rnd(1, d - 1);
      if(k === 'den'){ var dd = rnd(3, 8);
        return S('1d' + dd, G.choice({ q:'Круг разделили на ' + dd + ' равных частей. Какое число стоит в дроби внизу, под чертой?', opts:[String(dd), '1', String(dd + 1), String(dd - 1)], ans:String(dd), layout:'wide', field:function(el){ el.innerHTML = M3.fracPie(0, dd, 150); },
          hint:'Число под чертой — знаменатель. Он показывает, на сколько равных частей разделили целое: ' + dd + '.', hintPlain:'Число под чертой называется знаменатель. Он показывает, на сколько равных частей разделили целое. Здесь ' + dd + '.' })); }
      var draw = k === 'bar' ? function(el){ el.innerHTML = M3.fracBar(n, d, 260); } : function(el){ el.innerHTML = M3.fracPie(n, d, 170); };
      return S('1' + k + n + '_' + d, G.choice({ q:'Какая часть фигуры закрашена?', opts:fopts(n, d), ans:fr(n, d), layout:'wide', field:draw,
        hintVis:k === 'bar' ? M3.fracBar(n, d, 240) : M3.fracPie(n, d, 140), hint:'Всего частей: ' + d + ' (это знаменатель). Закрашено: ' + n + ' (это числитель). Получается ' + fr(n, d) + '.', hintPlain:'Всего частей ' + d + ', закрашено ' + n + '. Получается ' + spoken(n, d) + '.' }));
    }
    /* ⭐⭐ сравнение долей, доля числа */
    function L2(){
      var k = pick(['same', 'num', 'of', 'of', 'half']);
      if(k === 'same'){ var d = rnd(4, 9), a = rnd(1, d - 1), b = rnd(1, d - 1); if(a === b) b = a === d - 1 ? a - 1 : a + 1; var sy = M.cmpSym(a, b);
        return S('2s' + a + b + d, G.choice({ q:'Сравни дроби ' + fr(a, d) + ' и ' + fr(b, d) + '.', opts:['<', '>', '='], ans:sy, layout:'wide', expr:'<span>' + fr(a, d) + '</span><span>?</span><span>' + fr(b, d) + '</span>', field:function(el){ el.innerHTML = M3.fracBar(a, d, 240) + '<div style="height:6px"></div>' + M3.fracBar(b, d, 240, '#4FC3F7'); },
          hint:'Знаменатели одинаковые, значит, сравниваем числители: ' + a + (a > b ? ' больше ' : ' меньше ') + b + '. Больше та дробь, у которой числитель больше.', hintPlain:'Знаменатели одинаковые, поэтому сравниваем числители. ' + a + (a > b ? ' больше ' : ' меньше ') + b + '.', hintExpr:'<span>' + fr(a, d) + '</span><span class="ok">' + sy + '</span><span>' + fr(b, d) + '</span>' })); }
      if(k === 'num'){ var d1 = rnd(2, 6), d2 = d1 + rnd(1, 4), sy2 = '>';
        return S('2n' + d1 + d2, G.choice({ q:'Сравни доли ' + fr(1, d1) + ' и ' + fr(1, d2) + '.', opts:['<', '>', '='], ans:'>', layout:'wide', expr:'<span>' + fr(1, d1) + '</span><span>?</span><span>' + fr(1, d2) + '</span>', field:function(el){ el.innerHTML = M3.fracBar(1, d1, 240) + '<div style="height:6px"></div>' + M3.fracBar(1, d2, 240, '#4FC3F7'); },
          hint:'Числители одинаковые. Чем на меньшее число частей делим, тем крупнее часть: ' + fr(1, d1) + ' > ' + fr(1, d2), hintPlain:'Чем на меньшее число частей делим целое, тем больше каждая часть. Значит, ' + fr(1, d1) + ' больше.', hintExpr:'<span>' + fr(1, d1) + '</span><span class="ok">&gt;</span><span>' + fr(1, d2) + '</span>' })); }
      if(k === 'half'){ var d3 = pick([2, 3, 4, 5, 10]), N = d3 * rnd(2, 9), nm = NM[d3];
        return S('2h' + d3 + N, G.choice({ q:'Чему равна ' + nm + ' числа ' + N + '?', opts:nopts(N / d3), ans:String(N / d3), layout:'wide', expr:'<span>' + N + ' : ' + d3 + ' = ?</span>', hint:'Чтобы найти ' + nm + ' числа, делим его на ' + d3 + ': ' + N + ' : ' + d3 + ' = ' + N / d3, hintPlain:'Чтобы найти ' + nm + ' числа, делим число на ' + d3 + '. Получается ' + N / d3 + '.' })); }
      var d4 = pick([2, 3, 4, 5, 6, 8, 10]), kk = rnd(2, 9), N2 = d4 * kk, what = pick([['конфет', 'Мира съела'], ['яблок', 'Данияр съел'], ['страниц', 'Айша прочитала']]);
      var tx = 'В коробке ' + N2 + ' ' + what[0] + '. ' + what[1] + ' ' + (d4 === 2 ? 'половину' : d4 === 3 ? 'треть' : d4 === 4 ? 'четверть' : fr(1, d4)) + '. Сколько это?';
      return S('2o' + d4 + N2, G.choice({ q:tx, say:[G.say(tx.replace(fr(1, d4), 'одну ' + ({ 5:'пятую', 6:'шестую', 8:'восьмую', 10:'десятую' }[d4]) + ' часть'))], opts:nopts(kk), ans:String(kk), layout:'wide', hint:'Нужно найти ' + fr(1, d4) + ' от ' + N2 + ': ' + N2 + ' : ' + d4 + ' = ' + kk, hintPlain:'Чтобы найти долю числа, делим число на знаменатель. ' + N2 + ' разделить на ' + d4 + ' будет ' + kk + '.' }));
    }
    /* ⭐⭐⭐ несколько долей, целое по доле, задачи */
    function L3(){
      var k = pick(['mult', 'whole', 'rest', 'tf', 'order']), d = pick([3, 4, 5, 6, 8, 10]), kk = rnd(2, 9), N = d * kk;
      if(k === 'mult'){ var n = rnd(2, d - 1);
        return S('3m' + n + '_' + d + '_' + N, G.choice({ q:'Найди ' + fr(n, d) + ' от числа ' + N + '.', opts:nopts(n * kk), ans:String(n * kk), layout:'wide', expr:'<span>' + fr(n, d) + ' от ' + N + ' = ?</span>', hintVis:M3.fracBar(n, d, 240),
          hint:'Сначала найдём одну часть: ' + N + ' : ' + d + ' = ' + kk + '.<br>Потом возьмём ' + n + ' таких части: ' + kk + ' · ' + n + ' = ' + n * kk, hintPlain:'Сначала найдём одну часть: ' + N + ' разделить на ' + d + ' будет ' + kk + '. Потом возьмём ' + n + ' такие части: ' + kk + ' умножить на ' + n + ' будет ' + n * kk + '.' })); }
      if(k === 'whole'){ var tx = fr(1, d) + ' числа равна ' + kk + '. Найди всё число.';
        return S('3w' + d + '_' + kk, G.choice({ q:tx, say:[G.say('Одна ' + spoken(1, d).split(' ')[1] + ' часть числа равна ' + kk + '. Найди всё число.')], opts:nopts(N), ans:String(N), layout:'wide', hint:'Если одна часть равна ' + kk + ', а всего частей ' + d + ', то число: ' + kk + ' · ' + d + ' = ' + N, hintPlain:'Одна часть равна ' + kk + ', а всего частей ' + d + '. Умножаем: ' + kk + ' умножить на ' + d + ' будет ' + N + '.' })); }
      if(k === 'rest'){ var n2 = rnd(1, d - 1), ate = n2 * kk, txr = 'В пакете ' + N + ' орехов. ' + fr(n2, d) + ' орехов съели. Сколько орехов осталось?';
        return S('3r' + n2 + '_' + d + '_' + N, G.choice({ q:txr, opts:nopts(N - ate, [ate]), ans:String(N - ate), layout:'wide', hint:'Съели: ' + N + ' : ' + d + ' · ' + n2 + ' = ' + ate + '.<br>Осталось: ' + N + ' − ' + ate + ' = ' + (N - ate), hintPlain:'Съели ' + ate + ' орехов. Осталось ' + N + ' минус ' + ate + ', то есть ' + (N - ate) + '.' })); }
      if(k === 'tf'){ var a = rnd(2, 5), b = a + rnd(1, 4), truth = Math.random() < .5, left = truth ? fr(1, a) : fr(1, b), right = truth ? fr(1, b) : fr(1, a);
        return S('3t' + a + b + truth, G.tf({ q:'Верно ли: ' + left + ' > ' + right + '?', truth:truth, hint:'Чем на меньшее число частей делим, тем крупнее часть. ' + fr(1, a) + ' больше, чем ' + fr(1, b) + '.' })); }
      var dd = rnd(5, 9), xs = shuffle([1, 2, 3, 4, 5, 6, 7, 8].filter(function(x){ return x < dd; })).slice(0, 3), mx = Math.max.apply(null, xs);
      return S('3o' + dd + xs.join(''), G.choice({ q:'Какая из дробей самая большая?', opts:xs.map(function(x){ return fr(x, dd); }).concat([fr(1, dd + 1)]), ans:fr(mx, dd), layout:'wide', hint:'Знаменатели одинаковые, значит, больше та дробь, у которой больше числитель: ' + fr(mx, dd) + '.', hintPlain:'Знаменатели одинаковые, поэтому больше та дробь, у которой больше числитель.' }));
    }
    return [L1, L2, L3];
  }
});
})();
