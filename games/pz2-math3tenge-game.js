/* Математика, 3 класс — «Тенге: 1000, 2000 и 5000» (цели 3.3.4.1–3.3.4.3). Банкноты рисуются кодом: M3.note. */
(function(){
PZ2.define({
  key:"math3tenge", theme:'garden', icons:[], groups:[], mcq:[], tf:[],
  custom:function(C){
    var M = C.M, G = C.G, S = C.S, pick = C.pick, shuffle = C.shuffle, rnd = C.rnd, P = G.plural;
    function nopts(ans, ex){ var c = shuffle([ans + 100, ans - 100, ans + 500, ans - 500, ans + 1000, ans + 50, ans - 50, ans * 2].concat(ex || []).filter(function(x){ return x > 0 && x !== ans; })), out = [ans]; c.forEach(function(x){ if(out.length < 4 && out.indexOf(x) < 0) out.push(x); }); return out.map(String); }
    function sopts(a){ var c = shuffle([a + 1, a - 1, a + 2, a * 2, a + 3].filter(function(x){ return x > 0 && x !== a; })), out = [a]; c.forEach(function(x){ if(out.length < 4 && out.indexOf(x) < 0) out.push(x); }); return out.map(String); }
    function pic(v){ return v >= 1000 ? M3.note(v, 92) : G.money(v, v <= 100 ? 54 : 84); }
    function pics(list){ return function(el){ el.innerHTML = '<div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;align-items:center">' + list.map(pic).join('') + '</div>'; }; }
    function sum(l){ return l.reduce(function(a, b){ return a + b; }, 0); }
    var T = function(n){ return n + ' ' + P(n, 'тенге', 'тенге', 'тенге'); };
    /* ⭐ считаем деньги */
    function L1(){
      var k = pick(['count', 'count', 'bills', 'name']), vals = [100, 200, 500, 1000, 2000, 5000];
      if(k === 'count'){ var n = rnd(2, 4), l = []; for(var i = 0; i < n; i++) l.push(pick(vals)); l.sort(function(a, b){ return b - a; }); var t = sum(l);
        return S('1c' + l.join('_'), G.choice({ q:'Сколько тенге здесь всего?', opts:nopts(t), ans:String(t), layout:'wide', field:pics(l), hint:l.join(' + ') + ' = ' + t + ' тенге', hintPlain:'Складываем все деньги: ' + l.join(' плюс ') + ' будет ' + t + ' тенге.' })); }
      if(k === 'bills'){ var big = pick([1000, 2000]), n1 = pick([2, 3, 4]); var tot = big * n1, tx = 'Сколько купюр по ' + big + ' тенге нужно, чтобы получилось ' + tot + ' тенге?';
        return S('1b' + big + '_' + n1, G.choice({ q:tx, say:[G.say(tx)], opts:sopts(n1), ans:String(n1), layout:'wide', field:pics([big]), hint:tot + ' : ' + big + ' = ' + n1, hintPlain:tot + ' разделить на ' + big + ' будет ' + n1 + '.' })); }
      var v = pick([1000, 2000, 5000]);
      return S('1n' + v, G.choice({ q:'Сколько тенге стоит эта купюра?', opts:shuffle([1000, 2000, 5000, 500].map(String)), ans:String(v), layout:'wide', field:pics([v]), hint:'На купюре написано число ' + v + '. Это ' + v + ' тенге.', hintPlain:'На купюре написано число ' + v + '.' }));
    }
    /* ⭐⭐ размен, сдача, сколько купюр */
    function L2(){
      var k = pick(['change', 'change', 'how', 'enough', 'swap']);
      if(k === 'change'){ var pay = pick([500, 1000, 2000, 5000]), price = rnd(2, 9) * 50 + (pay >= 1000 ? rnd(1, 9) * 100 : 0); if(price >= pay) price = pay - 150; var ch = pay - price;
        return S('2c' + pay + '_' + price, G.choice({ q:'Покупка стоит ' + price + ' тенге. Ты платишь ' + pay + ' тенге. Сколько сдачи?', say:[G.say('Покупка стоит ' + price + ' тенге. Ты платишь ' + pay + ' тенге. Сколько сдачи?')], opts:nopts(ch), ans:String(ch), layout:'wide', field:pics([pay]), hint:'Сдача = то, что заплатил, − цена:<br>' + pay + ' − ' + price + ' = ' + ch + ' тенге', hintPlain:'Из денег, которые отдали, вычитаем цену. ' + pay + ' минус ' + price + ' будет ' + ch + '.' })); }
      if(k === 'how'){ var big = pick([5000, 2000]), small = pick([1000, 500, 200]), cnt = big / small; if(big === 2000 && small === 200) cnt = 10;
        return S('2h' + big + '_' + small, G.choice({ q:'Сколько купюр по ' + small + ' тенге можно получить за одну купюру ' + big + ' тенге?', opts:sopts(cnt), ans:String(cnt), layout:'wide', field:pics([big]), hint:big + ' : ' + small + ' = ' + cnt, hintPlain:big + ' разделить на ' + small + ' будет ' + cnt + '.' })); }
      if(k === 'enough'){ var a = rnd(2, 9) * 100 + 50, b = rnd(2, 9) * 100, mon = pick([1000, 2000]), ok = a + b <= mon, tx = 'У тебя ' + mon + ' тенге. Хватит ли денег на покупки за ' + a + ' и ' + b + ' тенге?';
        return S('2e' + a + '_' + b + '_' + mon, G.choice({ q:tx, say:[G.say(tx)], opts:['Хватит', 'Не хватит'], ans:ok ? 'Хватит' : 'Не хватит', layout:'wide', field:pics([mon]), hint:'Покупки стоят ' + a + ' + ' + b + ' = ' + (a + b) + ' тенге. ' + (ok ? (a + b) + ' не больше ' + mon + ', денег хватит.' : (a + b) + ' больше ' + mon + ', денег не хватит.'), hintPlain:'Складываем цены: ' + (a + b) + ' тенге. ' + (ok ? 'Это не больше, чем у тебя есть. Денег хватит.' : 'Это больше, чем у тебя есть. Денег не хватит.') })); }
      var sets = [[5000, [2000, 2000, 1000]], [5000, [2000, 1000, 1000, 1000]], [2000, [1000, 500, 500]], [1000, [500, 200, 200, 100]]], s = pick(sets), good = s[1].join(' + '), bad = shuffle(['1000 + 1000', '500 + 500 + 200', '2000 + 500', '1000 + 500 + 100', '2000 + 2000', '5000 + 1000']).filter(function(x){ return x !== good && eval(x) !== s[0]; }).slice(0, 3);
      return S('2s' + s[0] + s[1].join(''), G.choice({ q:'Банкнота ' + s[0] + ' тенге. Какой набор денег ей равен?', opts:shuffle([good].concat(bad)), ans:good, layout:'wide', field:pics([s[0]]), hint:good + ' = ' + s[0], hintPlain:'Складываем: получается ' + s[0] + ' тенге.' }));
    }
    /* ⭐⭐⭐ задачи про цену и стоимость */
    function L3(){
      var k = pick(['cost', 'price', 'rest', 'total', 'cmp']), p = rnd(2, 9) * 50, n = rnd(2, 6);
      if(k === 'cost'){ var tx = 'Одна тетрадь стоит ' + p + ' тенге. Сколько стоят ' + n + ' ' + P(n, 'тетрадь', 'тетради', 'тетрадей') + '?';
        return S('3a' + p + '_' + n, G.choice({ q:tx, say:[G.say(tx)], opts:nopts(p * n, [p + n]), ans:String(p * n), layout:'wide', hint:'Стоимость = цена · количество: ' + p + ' · ' + n + ' = ' + p * n + ' тенге', hintPlain:'Цену умножаем на количество. ' + p + ' умножить на ' + n + ' будет ' + p * n + '.' })); }
      if(k === 'price'){ var tx2 = n + ' ' + P(n, 'булочка', 'булочки', 'булочек') + ' стоят ' + p * n + ' тенге. Сколько стоит одна булочка?';
        return S('3b' + p + '_' + n, G.choice({ q:tx2, say:[G.say(tx2)], opts:nopts(p, [p * n]), ans:String(p), layout:'wide', hint:'Цена = стоимость : количество: ' + p * n + ' : ' + n + ' = ' + p + ' тенге', hintPlain:'Стоимость делим на количество. ' + p * n + ' разделить на ' + n + ' будет ' + p + '.' })); }
      if(k === 'rest'){ var mon = pick([1000, 2000, 5000]), c = p * n; if(c >= mon){ n = 2; c = p * 2; } var tx3 = 'Ты купил ' + n + ' ' + P(n, 'ручку', 'ручки', 'ручек') + ' по ' + p + ' тенге и заплатил ' + mon + ' тенге. Сколько сдачи?';
        return S('3r' + p + '_' + n + '_' + mon, G.choice({ q:tx3, say:[G.say(tx3)], opts:nopts(mon - c, [c]), ans:String(mon - c), layout:'wide', field:pics([mon]), hint:'Сначала стоимость: ' + p + ' · ' + n + ' = ' + c + '.<br>Потом сдача: ' + mon + ' − ' + c + ' = ' + (mon - c) + ' тенге', hintPlain:'Сначала найдём стоимость: ' + c + ' тенге. Потом вычтем её из ' + mon + '. Получается ' + (mon - c) + '.' })); }
      if(k === 'total'){ var a = rnd(2, 9) * 100 + 50, b = rnd(2, 9) * 100 + 50, c2 = rnd(1, 4) * 100, tx4 = 'За хлеб заплатили ' + a + ' тенге, за молоко — ' + b + ' тенге, за сок — ' + c2 + ' тенге. Сколько всего заплатили?';
        return S('3t' + a + '_' + b + '_' + c2, G.choice({ q:tx4, say:[G.say(tx4)], opts:nopts(a + b + c2), ans:String(a + b + c2), layout:'wide', hint:a + ' + ' + b + ' + ' + c2 + ' = ' + (a + b + c2) + ' тенге', hintPlain:'Складываем все цены. Получается ' + (a + b + c2) + ' тенге.' })); }
      var x1 = rnd(2, 5), p1 = rnd(2, 6) * 100, x2 = rnd(2, 5), p2 = rnd(2, 6) * 100; if(x1 * p1 === x2 * p2) p2 += 100; var s1 = x1 * p1, s2 = x2 * p2, sy = M.cmpSym(s1, s2);
      return S('3c' + x1 + p1 + x2 + p2, G.choice({ q:'Что дороже: ' + x1 + ' шт. по ' + p1 + ' тенге или ' + x2 + ' шт. по ' + p2 + ' тенге?', opts:['Первое дороже', 'Второе дороже', 'Одинаково'], ans:s1 > s2 ? 'Первое дороже' : 'Второе дороже', layout:'wide', hint:'Первое: ' + x1 + ' · ' + p1 + ' = ' + s1 + '. Второе: ' + x2 + ' · ' + p2 + ' = ' + s2 + '. ' + (s1 > s2 ? 'Первое дороже.' : 'Второе дороже.'), hintPlain:'Первое стоит ' + s1 + ', второе стоит ' + s2 + '. ' + (s1 > s2 ? 'Первое дороже.' : 'Второе дороже.') }));
    }
    return [L1, L2, L3];
  }
});
})();
