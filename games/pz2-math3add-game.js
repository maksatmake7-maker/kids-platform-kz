/* Математика, 3 класс — «Сложение и вычитание до 1000» (цели 3.2.2.1–3.2.2.4). */
(function(){
PZ2.define({
  key:"math3add", theme:'meadow', icons:[], groups:[], mcq:[], tf:[],
  custom:function(C){
    var M = C.M, G = C.G, S = C.S, pick = C.pick, shuffle = C.shuffle, rnd = C.rnd, P = G.plural;
    function opts4(ans, near){
      var c = [ans + 10, ans - 10, ans + 1, ans - 1, ans + 100, ans - 100, ans + 20].concat(near || []);
      c = shuffle(c.filter(function(x){ return x !== ans && x > 0 && x < 1000; }));
      var out = [ans]; c.forEach(function(x){ if(out.length < 4 && out.indexOf(x) < 0) out.push(x); });
      return out.map(String);
    }
    /* пошаговая запись «столбиком» словами */
    function stepsAdd(a, b){
      var u = a % 10 + b % 10, c1 = u >= 10 ? 1 : 0, t = Math.floor(a / 10) % 10 + Math.floor(b / 10) % 10 + c1, c2 = t >= 10 ? 1 : 0, h = Math.floor(a / 100) + Math.floor(b / 100) + c2;
      var s = 'Единицы: ' + a % 10 + ' + ' + b % 10 + ' = ' + u + (c1 ? ', пишем ' + u % 10 + ', 1 десяток запоминаем' : '') + '.<br>Десятки: ' + Math.floor(a / 10) % 10 + ' + ' + Math.floor(b / 10) % 10 + (c1 ? ' + 1' : '') + ' = ' + t + (c2 ? ', пишем ' + t % 10 + ', 1 сотню запоминаем' : '') + '.<br>Сотни: ' + Math.floor(a / 100) + ' + ' + Math.floor(b / 100) + (c2 ? ' + 1' : '') + ' = ' + h + '.<br><b>' + a + ' + ' + b + ' = ' + (a + b) + '</b>';
      return { hint:s, hintPlain:s.replace(/<br>/g, ' ').replace(/<\/?b>/g, '').replace(/ \+ /g, ' плюс ').replace(/ = /g, ' будет ') };
    }
    function stepsSub(a, b){
      var au = a % 10, at = Math.floor(a / 10) % 10, ah = Math.floor(a / 100), bu = b % 10, bt = Math.floor(b / 10) % 10, bh = Math.floor(b / 100), s = '';
      if(au < bu){ au += 10; at -= 1; s += 'Единиц не хватает: занимаем десяток. ' + au + ' − ' + bu + ' = ' + (au - bu) + '.<br>'; } else s += 'Единицы: ' + au + ' − ' + bu + ' = ' + (au - bu) + '.<br>';
      if(at < bt){ at += 10; ah -= 1; s += 'Десятков не хватает: занимаем сотню. ' + at + ' − ' + bt + ' = ' + (at - bt) + '.<br>'; } else s += 'Десятки: ' + at + ' − ' + bt + ' = ' + (at - bt) + '.<br>';
      s += 'Сотни: ' + ah + ' − ' + bh + ' = ' + (ah - bh) + '.<br><b>' + a + ' − ' + b + ' = ' + (a - b) + '</b>';
      return { hint:s, hintPlain:s.replace(/<br>/g, ' ').replace(/<\/?b>/g, '').replace(/ − /g, ' минус ').replace(/ \+ /g, ' плюс ').replace(/ = /g, ' будет ') };
    }
    function q(o, a, b, op, ans, st, near){
      var sym = op === '+' ? '+' : '−', say = a + (op === '+' ? ' плюс ' : ' минус ') + b;
      return G.choice(Object.assign({ q:'Сколько будет ' + say + '?', expr:'<span>' + a + ' ' + sym + ' ' + b + ' = ?</span>', opts:opts4(ans, near), ans:String(ans), layout:'wide' }, st));
    }

    /* ⭐ круглые числа и без перехода */
    function L1(){
      var k = pick(['hund', 'tens', 'plus1', 'minus1']);
      if(k === 'hund'){ var a = rnd(1, 8) * 100, b = rnd(1, 9 - a / 100 > 0 ? 9 - a / 100 : 1) * 100, op = Math.random() < .5 ? '+' : '−';
        if(op === '−'){ var t = a + b; a = t; } var ans = op === '+' ? a + b : a - b; if(op === '−') { b = rnd(1, a / 100 - 1 || 1) * 100; ans = a - b; if(a === b){ b = 100; ans = a - b; } }
        var h = a / 100, hb = b / 100; var tx = h + ' ' + P(h, 'сотня', 'сотни', 'сотен') + (op === '+' ? ' + ' : ' − ') + hb + ' ' + P(hb, 'сотня', 'сотни', 'сотен') + ' = ' + (op === '+' ? h + hb : h - hb) + ' сот.';
        return S('1h' + a + op + b, q({}, a, b, op, ans, { hint:'Считаем сотнями: ' + tx + ' Это ' + ans + '.', hintPlain:'Считаем сотнями. ' + (op === '+' ? h + ' плюс ' + hb : h + ' минус ' + hb) + ' будет ' + (op === '+' ? h + hb : h - hb) + ' сотен. Это ' + ans + '.' })); }
      if(k === 'tens'){ var h2 = rnd(1, 9) * 100, t1 = rnd(1, 4) * 10, t2 = rnd(1, 4) * 10, a2 = h2 + t1, op2 = Math.random() < .5 ? '+' : '−', ans2 = op2 === '+' ? a2 + t2 : a2 - t2;
        var st = { hint:'Сотни не меняем. Десятки: ' + t1 / 10 + (op2 === '+' ? ' + ' : ' − ') + t2 / 10 + ' = ' + (op2 === '+' ? t1 / 10 + t2 / 10 : t1 / 10 - t2 / 10) + '. Получается ' + ans2 + '.', hintPlain:'Сотни не меняем. Считаем десятки. Получается ' + ans2 + '.' };
        return S('1t' + a2 + op2 + t2, q({}, a2, t2, op2, ans2, st)); }
      var base = rnd(101, 898), d = rnd(1, 5);
      if(k === 'plus1') { var a3 = rnd(10, 85) * 10 + rnd(1, 4), b3 = rnd(1, 4); return S('1p' + a3 + b3, q({}, a3, b3, '+', a3 + b3, { hint:'Единицы: ' + a3 % 10 + ' + ' + b3 + ' = ' + (a3 % 10 + b3) + '. Меняется только последняя цифра: ' + (a3 + b3) + '.', hintPlain:'Меняется только последняя цифра. Получается ' + (a3 + b3) + '.' })); }
      var a4 = rnd(10, 85) * 10 + rnd(5, 9), b4 = rnd(1, 4); return S('1m' + a4 + b4, q({}, a4, b4, '−', a4 - b4, { hint:'Единицы: ' + a4 % 10 + ' − ' + b4 + ' = ' + (a4 % 10 - b4) + '. Меняется только последняя цифра: ' + (a4 - b4) + '.', hintPlain:'Меняется только последняя цифра. Получается ' + (a4 - b4) + '.' }));
    }

    /* ⭐⭐ с переходом через разряд */
    function L2(){
      var k = pick(['add', 'sub', 'add', 'sub', 'round']);
      if(k === 'round'){ var a = rnd(1, 8) * 100 + rnd(1, 9) * 10, b = rnd(1, 9) * 10, sum = a + b; if(sum % 100 !== 0 && sum < 1000) { b = 100 - a % 100; sum = a + b; } if(sum > 1000){ a = 450; b = 50; sum = 500; }
        return S('2r' + a + b, G.choice({ q:'Сколько не хватает до круглой сотни? ' + a + ' + ? = ' + sum, expr:'<span>' + a + ' + ? = ' + sum + '</span>', opts:opts4(b, [b + 20, b - 20].filter(function(x){ return x > 0; })).map(String), ans:String(b), layout:'wide', hint:'Из ' + sum + ' вычитаем ' + a + ': ' + sum + ' − ' + a + ' = ' + b + '.', hintPlain:'Из ' + sum + ' вычитаем ' + a + '. Получается ' + b + '.' })); }
      if(k === 'add'){ var x, y; do { x = rnd(120, 780); y = rnd(15, 99); } while((x % 10) + (y % 10) < 10 || x + y > 999);
        return S('2a' + x + '_' + y, q({}, x, y, '+', x + y, stepsAdd(x, y))); }
      var u, v; do { u = rnd(230, 950); v = rnd(15, 99); } while((u % 10) >= (v % 10) || u - v < 100);
      return S('2s' + u + '_' + v, q({}, u, v, '−', u - v, stepsSub(u, v)));
    }

    /* ⭐⭐⭐ трёхзначные, проверка, неизвестное */
    function L3(){
      var k = pick(['add', 'sub', 'miss', 'check', 'task']);
      if(k === 'add'){ var x, y; do { x = rnd(120, 800); y = rnd(120, 800); } while(x + y > 999 || (x % 10) + (y % 10) < 10);
        return S('3a' + x + '_' + y, q({}, x, y, '+', x + y, stepsAdd(x, y), [x + y + 100, x + y - 100])); }
      if(k === 'sub'){ var u, v; do { u = rnd(300, 990); v = rnd(120, 800); } while(u - v < 50 || (u % 10) >= (v % 10) && Math.floor(u / 10) % 10 >= Math.floor(v / 10) % 10);
        return S('3s' + u + '_' + v, q({}, u, v, '−', u - v, stepsSub(u, v), [u - v + 100, u - v - 100])); }
      if(k === 'miss'){ var a = rnd(120, 600), b = rnd(120, 380), s = a + b, w = Math.random() < .5;
        if(w) return S('3m' + a + '_' + b, G.choice({ q:'Найди неизвестное слагаемое: ? + ' + a + ' = ' + s, expr:'<span>? + ' + a + ' = ' + s + '</span>', opts:opts4(b), ans:String(b), layout:'wide', hint:'Неизвестное слагаемое = сумма − известное слагаемое:<br>' + s + ' − ' + a + ' = ' + b, hintPlain:'Чтобы найти неизвестное слагаемое, из суммы вычитаем известное слагаемое. ' + s + ' минус ' + a + ' будет ' + b + '.' }));
        return S('3n' + a + '_' + b, G.choice({ q:'Найди неизвестное вычитаемое: ' + s + ' − ? = ' + a, expr:'<span>' + s + ' − ? = ' + a + '</span>', opts:opts4(b), ans:String(b), layout:'wide', hint:'Вычитаемое = уменьшаемое − разность:<br>' + s + ' − ' + a + ' = ' + b, hintPlain:'Чтобы найти вычитаемое, из уменьшаемого вычитаем разность. ' + s + ' минус ' + a + ' будет ' + b + '.' })); }
      if(k === 'check'){ var m = rnd(300, 900), n = rnd(110, 290), d = m - n;
        return S('3k' + m + '_' + n, G.choice({ q:m + ' − ' + n + ' = ' + d + '. Как проверить вычитание?', opts:[d + ' + ' + n + ' = ' + m, d + ' − ' + n + ' = ' + m, m + ' + ' + n + ' = ' + d, n + ' − ' + d + ' = ' + m], ans:d + ' + ' + n + ' = ' + m, layout:'wide', hint:'Разность плюс вычитаемое должно дать уменьшаемое:<br>' + d + ' + ' + n + ' = ' + m, hintPlain:'Чтобы проверить вычитание, к разности прибавляем вычитаемое. Должно получиться уменьшаемое: ' + d + ' плюс ' + n + ' равно ' + m + '.' })); }
      var kind = pick(['more', 'less', 'tot']), a1 = rnd(120, 480), b1 = rnd(100, 320);
      var who = pick([['В библиотеке', 'книг на первой полке', 'на второй полке']]);
      if(kind === 'tot') return S('3t' + a1 + '_' + b1, G.choice({ q:'В школьном саду ' + a1 + ' яблонь и ' + b1 + ' груш. Сколько всего деревьев?', say:[G.say('В школьном саду ' + a1 + ' яблонь и ' + b1 + ' груш. Сколько всего деревьев?')], opts:opts4(a1 + b1), ans:String(a1 + b1), layout:'wide', hint:'Всего: ' + a1 + ' + ' + b1 + ' = ' + (a1 + b1), hintPlain:'Всего деревьев: ' + a1 + ' плюс ' + b1 + ' будет ' + (a1 + b1) + '.' }));
      if(kind === 'more') return S('3o' + a1 + '_' + b1, G.choice({ q:'В библиотеке ' + a1 + ' учебников, а в читальном зале — на ' + b1 + ' больше. Сколько учебников в читальном зале?', say:[G.say('В библиотеке ' + a1 + ' учебников, а в читальном зале — на ' + b1 + ' больше. Сколько учебников в читальном зале?')], opts:opts4(a1 + b1), ans:String(a1 + b1), layout:'wide', hint:'«На ' + b1 + ' больше» — прибавляем: ' + a1 + ' + ' + b1 + ' = ' + (a1 + b1), hintPlain:'Слова «на столько больше» значат, что нужно прибавить. ' + a1 + ' плюс ' + b1 + ' будет ' + (a1 + b1) + '.' }));
      var big = a1 + b1; return S('3l' + big + '_' + b1, G.choice({ q:'В кузове было ' + big + ' кг яблок, а в прицепе — на ' + b1 + ' кг меньше. Сколько килограммов в прицепе?', opts:opts4(a1), ans:String(a1), layout:'wide', hint:'«На ' + b1 + ' меньше» — вычитаем: ' + big + ' − ' + b1 + ' = ' + a1, hintPlain:'Слова «на столько меньше» значат, что нужно вычесть. ' + big + ' минус ' + b1 + ' будет ' + a1 + '.' }));
    }
    return [L1, L2, L3];
  }
});
})();
