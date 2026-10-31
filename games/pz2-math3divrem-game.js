/* Математика, 3 класс — «Деление с остатком и внетабличное умножение» (цели 3.2.2.12–3.2.2.16). */
(function(){
PZ2.define({
  key:"math3divrem", theme:'autumn', icons:[], groups:[], mcq:[], tf:[],
  custom:function(C){
    var M = C.M, G = C.G, S = C.S, pick = C.pick, shuffle = C.shuffle, rnd = C.rnd, P = G.plural;
    function nopts(ans, ex){ var c = shuffle([ans + 1, ans - 1, ans + 2, ans + 10, ans - 10, ans * 2, ans - 2].concat(ex || []).filter(function(x){ return x > 0 && x !== ans; })), out = [ans]; c.forEach(function(x){ if(out.length < 4 && out.indexOf(x) < 0) out.push(x); }); return out.map(String); }
    function ro(q, r){ return q + ' (ост. ' + r + ')'; }
    function ropts(q, r, d){ var c = [ro(q, r + 1 < d ? r + 1 : r - 1 > 0 ? r - 1 : r + 2), ro(q + 1, r), ro(q - 1 > 0 ? q - 1 : q + 2, r), ro(r, q), ro(q, 0)].filter(function(x){ return x !== ro(q, r); }), out = [ro(q, r)]; shuffle(c).forEach(function(x){ if(out.length < 4 && out.indexOf(x) < 0) out.push(x); }); return out; }
    /* ⭐ внетабличное умножение и деление с разбиением */
    function L1(){
      var k = pick(['mul', 'div', 'mul', 'div', 'round']);
      if(k === 'mul'){ var a = rnd(11, 29), b = rnd(2, 5), t = Math.floor(a / 10) * 10, o = a % 10;
        return S('1m' + a + '_' + b, G.choice({ q:'Сколько будет ' + a + ' умножить на ' + b + '?', expr:'<span>' + a + ' · ' + b + ' = ?</span>', opts:nopts(a * b, [t * b + o]), ans:String(a * b), layout:'wide', hint:'Разложим: ' + a + ' = ' + t + ' + ' + o + '.<br>' + t + ' · ' + b + ' = ' + t * b + ', ' + o + ' · ' + b + ' = ' + o * b + '.<br>' + t * b + ' + ' + o * b + ' = ' + a * b, hintPlain:'Разложим число ' + a + ' на ' + t + ' и ' + o + '. Умножим каждое на ' + b + ' и сложим: ' + t * b + ' плюс ' + o * b + ' будет ' + a * b + '.' })); }
      if(k === 'div'){ var d = rnd(2, 5), q = rnd(11, 29), n = d * q, p1 = Math.floor(q / 10) * 10 * d, p2 = n - p1;
        return S('1d' + n + '_' + d, G.choice({ q:'Сколько будет ' + n + ' разделить на ' + d + '?', expr:'<span>' + n + ' : ' + d + ' = ?</span>', opts:nopts(q, [q + 10]), ans:String(q), layout:'wide', hint:'Разложим ' + n + ' на удобные части: ' + p1 + ' + ' + p2 + '.<br>' + p1 + ' : ' + d + ' = ' + p1 / d + ', ' + p2 + ' : ' + d + ' = ' + p2 / d + '.<br>' + p1 / d + ' + ' + p2 / d + ' = ' + q, hintPlain:'Разложим ' + n + ' на ' + p1 + ' и ' + p2 + '. Каждое разделим на ' + d + ': ' + p1 / d + ' и ' + p2 / d + '. Сложим. Получается ' + q + '.' })); }
      var h = rnd(2, 9), d2 = pick([2, 3, 4, 5]), n2 = h * 100 * d2 / d2 * 1; n2 = d2 * rnd(2, 9) * 100 / 1 / 1;
      return S('1r' + n2 + '_' + d2, G.choice({ q:'Сколько будет ' + n2 + ' разделить на ' + d2 + '?', expr:'<span>' + n2 + ' : ' + d2 + ' = ?</span>', opts:nopts(n2 / d2, [n2 / d2 * 10]), ans:String(n2 / d2), layout:'wide', hint:n2 / 100 + ' сотен : ' + d2 + ' = ' + (n2 / d2 / 100 === Math.floor(n2 / d2 / 100) ? n2 / d2 / 100 + ' сотен' : (n2 / d2) / 10 + ' десятков') + '. Это ' + n2 / d2 + '.', hintPlain:'Делим сотни. Получается ' + n2 / d2 + '.' }));
    }
    /* ⭐⭐ деление с остатком */
    function L2(){
      var d = rnd(2, 9), q = rnd(2, 9), r = rnd(1, d - 1), n = d * q + r, k = pick(['rem', 'full', 'rem', 'ans']);
      var steps = 'Берём из таблицы: ' + d + ' · ' + q + ' = ' + d * q + ' — ближе всего к ' + n + ' и не больше.<br>Остаток: ' + n + ' − ' + d * q + ' = ' + r + '.<br>' + n + ' : ' + d + ' = ' + q + ' (ост. ' + r + ')';
      var plain = 'Ищем в таблице число, которое не больше ' + n + ': ' + d + ' умножить на ' + q + ' будет ' + d * q + '. Остаток: ' + n + ' минус ' + d * q + ' будет ' + r + '.';
      if(k === 'rem') return S('2r' + n + '_' + d, G.choice({ q:'Найди остаток при делении ' + n + ' на ' + d + '.', expr:'<span>' + n + ' : ' + d + '</span>', opts:nopts(r, [d]), ans:String(r), layout:'wide', hint:steps, hintPlain:plain }));
      if(k === 'full') return S('2f' + n + '_' + d, G.choice({ q:'Сколько раз по ' + d + ' помещается в ' + n + '? Это неполное частное.', opts:nopts(q, [r]), ans:String(q), layout:'wide', hint:steps, hintPlain:plain }));
      return S('2a' + n + '_' + d, G.choice({ q:'Реши с остатком: ' + n + ' : ' + d, expr:'<span>' + n + ' : ' + d + ' = ?</span>', opts:ropts(q, r, d), ans:ro(q, r), layout:'wide', hint:steps, hintPlain:plain }));
    }
    /* ⭐⭐⭐ правила, проверка, задачи */
    function L3(){
      var k = pick(['rule', 'check', 'maxrem', 'task', 'task', 'find']), d = rnd(3, 9), q = rnd(2, 9), r = rnd(1, d - 1), n = d * q + r;
      if(k === 'rule') return S('3r' + n + '_' + d, G.choice({ q:'Какой остаток НЕ может получиться при делении на ' + d + '?', opts:shuffle([String(d), String(d - 1), '1', '0'].filter(function(x, i, s){ return s.indexOf(x) === i; })).slice(0, 4), ans:String(d), layout:'wide', hint:'Остаток всегда меньше делителя. При делении на ' + d + ' остаток может быть от 0 до ' + (d - 1) + ', но не ' + d + '.', hintPlain:'Остаток всегда должен быть меньше делителя. Остаток ' + d + ' получиться не может.' }));
      if(k === 'check') return S('3c' + n + '_' + d, G.choice({ q:n + ' : ' + d + ' = ' + q + ' (ост. ' + r + '). Как проверить?', opts:[d + ' · ' + q + ' + ' + r + ' = ' + n, d + ' · ' + q + ' − ' + r + ' = ' + n, d + ' + ' + q + ' + ' + r + ' = ' + n, q + ' · ' + r + ' + ' + d + ' = ' + n], ans:d + ' · ' + q + ' + ' + r + ' = ' + n, layout:'wide', hint:'Делитель · неполное частное + остаток = делимое:<br>' + d + ' · ' + q + ' + ' + r + ' = ' + n, hintPlain:'Чтобы проверить, умножаем делитель на неполное частное и прибавляем остаток. Должно получиться делимое.' }));
      if(k === 'maxrem') return S('3m' + d, G.choice({ q:'Какой наибольший остаток может получиться при делении на ' + d + '?', opts:nopts(d - 1, [d]), ans:String(d - 1), layout:'wide', hint:'Остаток меньше делителя, значит, наибольший остаток — ' + (d - 1) + '.', hintPlain:'Остаток меньше делителя. Наибольший остаток — ' + (d - 1) + '.' }));
      if(k === 'find') return S('3f' + d + q + r, G.choice({ q:'При делении числа на ' + d + ' получилось ' + q + ' и остаток ' + r + '. Что это за число?', opts:nopts(n, [d * q, d + q + r]), ans:String(n), layout:'wide', hint:'Делимое = делитель · неполное частное + остаток:<br>' + d + ' · ' + q + ' + ' + r + ' = ' + n, hintPlain:'Умножаем ' + d + ' на ' + q + ' и прибавляем остаток ' + r + '. Получается ' + n + '.' }));
      var who = pick([['яблок', 'пакетов', 'по ' + d + ' яблок'], ['конфет', 'коробок', 'по ' + d + ' конфет'], ['карандашей', 'стаканов', 'по ' + d + ' карандашей']]);
      var tx = n + ' ' + who[0] + ' разложили ' + who[2] + '. Сколько полных ' + (who[1] === 'пакетов' ? 'пакетов' : who[1]) + ' получилось?', tx2 = n + ' ' + who[0] + ' разложили ' + who[2] + '. Сколько ' + who[0] + ' осталось?';
      if(Math.random() < .5) return S('3t' + n + who[0] + '_' + d, G.choice({ q:tx, say:[G.say(tx)], opts:nopts(q, [r]), ans:String(q), layout:'wide', hint:n + ' : ' + d + ' = ' + q + ' (ост. ' + r + '). Полных — ' + q + '.', hintPlain:'Делим с остатком: получается ' + q + ' и остаток ' + r + '. Полных — ' + q + '.' }));
      return S('3u' + n + who[0] + '_' + d, G.choice({ q:tx2, say:[G.say(tx2)], opts:nopts(r, [d, q]), ans:String(r), layout:'wide', hint:n + ' : ' + d + ' = ' + q + ' (ост. ' + r + '). Осталось ' + r + '.', hintPlain:'Делим с остатком: получается ' + q + ' и остаток ' + r + '. Осталось ' + r + '.' }));
    }
    return [L1, L2, L3];
  }
});
})();
