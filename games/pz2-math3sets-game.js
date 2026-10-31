/* Математика, 3 класс — «Множества и логика» (цели 3.1.3.1, 3.5.1.1–3.5.1.3). Диаграммы Эйлера рисуются кодом: M3.euler. */
(function(){
PZ2.define({
  key:"math3sets", theme:'night', icons:[], groups:[], mcq:[], tf:[],
  custom:function(C){
    var M = C.M, G = C.G, S = C.S, pick = C.pick, shuffle = C.shuffle, rnd = C.rnd;
    var SETS = [
      { n:['Круглые', 'Красные'], a:['мяч', 'часы', 'луна'], b:['флаг', 'роза', 'маяк'], both:['яблоко', 'шар'] },
      { n:['Умеют летать', 'Живут на воде'], a:['орёл', 'пчела', 'сова'], b:['карп', 'щука', 'краб'], both:['утка', 'чайка'] },
      { n:['Сладкие', 'Холодные'], a:['конфета', 'мёд', 'пряник'], b:['снег', 'лёд', 'иней'], both:['мороженое', 'щербет'] },
      { n:['Зелёные', 'Съедобные'], a:['трава', 'ёлка', 'лист'], b:['хлеб', 'сыр', 'каша'], both:['огурец', 'яблоко'] },
      { n:['Есть крылья', 'Есть колёса'], a:['птица', 'бабочка', 'жук'], b:['тачка', 'телега', 'самокат'], both:['самолёт', 'вертолёт'] }
    ];
    function setUp(){ var s = pick(SETS), a = shuffle(s.a).slice(0, rnd(2, 3)), b = shuffle(s.b).slice(0, rnd(2, 3)), c = shuffle(s.both).slice(0, rnd(1, 2)); return { s:s, a:a, b:b, c:c }; }
    function ops(ans, extra){ var c = shuffle([ans + 1, ans - 1, ans + 2, ans + 3].concat(extra || []).filter(function(x){ return x > 0 && x !== ans; })), out = [ans]; c.forEach(function(x){ if(out.length < 4 && out.indexOf(x) < 0) out.push(x); }); return out.map(String); }
    function draw(u){ return function(el){ el.innerHTML = M3.euler(u.a, u.b, u.c, u.s.n, 300); }; }
    function sg(u, t){ return u.s.n.join('') + u.a.join('') + u.b.join('') + u.c.join('') + t; }

    /* ⭐ читаем диаграмму */
    function L1(){
      var u = setUp(), k = pick(['both', 'onlyA', 'onlyB', 'countA']);
      if(k === 'both'){ var w = pick(u.c), wr = shuffle(u.a.concat(u.b)).slice(0, 3);
        return S('1b' + sg(u, 'b'), G.choice({ q:'Что находится в общей части кругов?', opts:shuffle([w].concat(wr)), ans:w, layout:'wide', field:draw(u), hint:'В общей части — то, что подходит и к «' + u.s.n[0] + '», и к «' + u.s.n[1] + '». Это ' + u.c.join(' и ') + '.', hintPlain:'В общей части кругов — то, что подходит к обоим множествам. Это ' + u.c.join(' и ') + '.' })); }
      if(k === 'onlyA'){ var w2 = pick(u.a), wr2 = shuffle(u.b.concat(u.c)).slice(0, 3);
        return S('1a' + sg(u, 'a'), G.choice({ q:'Что относится только к группе «' + u.s.n[0] + '»?', opts:shuffle([w2].concat(wr2)), ans:w2, layout:'wide', field:draw(u), hint:'Только к «' + u.s.n[0] + '», но не к «' + u.s.n[1] + '»: ' + u.a.join(', ') + '.', hintPlain:'Только к первой группе относятся: ' + u.a.join(', ') + '.' })); }
      if(k === 'onlyB'){ var w3 = pick(u.b), wr3 = shuffle(u.a.concat(u.c)).slice(0, 3);
        return S('1c' + sg(u, 'c'), G.choice({ q:'Что относится только к группе «' + u.s.n[1] + '»?', opts:shuffle([w3].concat(wr3)), ans:w3, layout:'wide', field:draw(u), hint:'Только к «' + u.s.n[1] + '», но не к «' + u.s.n[0] + '»: ' + u.b.join(', ') + '.', hintPlain:'Только ко второй группе относятся: ' + u.b.join(', ') + '.' })); }
      var cnt = u.a.length + u.c.length;
      return S('1n' + sg(u, 'n'), G.choice({ q:'Сколько предметов в группе «' + u.s.n[0] + '»? Считай и общую часть.', opts:ops(cnt, [u.a.length]), ans:String(cnt), layout:'wide', field:draw(u), hint:'Только первая группа: ' + u.a.length + ', общая часть: ' + u.c.length + '. Всего ' + u.a.length + ' + ' + u.c.length + ' = ' + cnt, hintPlain:'Считаем отдельно кружок и общую часть: ' + u.a.length + ' плюс ' + u.c.length + ' будет ' + cnt + '.' }));
    }
    /* ⭐⭐ считаем, объединение, да/нет, не */
    function L2(){
      var k = pick(['union', 'union', 'none', 'yes', 'cls']);
      if(k === 'union' || k === 'none'){ var a = rnd(3, 9), b = rnd(2, 8), c = rnd(1, 3), tot = a + b + c;
        var tx = 'В классе ' + (a + c) + ' детей занимаются в кружке рисования, ' + (b + c) + ' — в кружке танцев, а ' + c + ' ходят в оба. Сколько детей всего занимаются?';
        return S('2u' + a + b + c, G.choice({ q:tx, say:[G.say(tx)], opts:ops(tot, [a + b + 2 * c]), ans:String(tot), layout:'wide', hint:'Тех, кто в обоих кружках, считаем один раз:<br>' + a + ' + ' + b + ' + ' + c + ' = ' + tot, hintPlain:'Тех, кто ходит в оба кружка, считаем один раз. Получается ' + a + ' плюс ' + b + ' плюс ' + c + ', то есть ' + tot + '.' })); }
      if(k === 'yes'){ var items = pick([['Все птицы умеют летать?', 'Нет, не все: пингвин не летает', ['Да, все', 'Нет, не все: пингвин не летает', 'Только маленькие', 'Только ночью']], ['Все квадраты — прямоугольники?', 'Да, у квадрата все углы прямые', ['Нет, никогда', 'Да, у квадрата все углы прямые', 'Только большие', 'Только красные']], ['Все числа, кроме нуля, делятся сами на себя?', 'Да, получится 1', ['Нет', 'Да, получится 1', 'Получится 0', 'Только чётные']]]);
        return S('2y' + items[0], G.choice({ q:items[0], opts:shuffle(items[2]), ans:items[1], layout:'wide', hint:items[1] + '.', hintPlain:items[1] + '.' })); }
      var words = pick([['Что НЕ относится к ягодам?', 'огурец', ['малина', 'клубника', 'смородина']], ['Что НЕ относится к транспорту?', 'стул', ['автобус', 'поезд', 'самолёт']], ['Что НЕ относится к инструментам?', 'яблоко', ['молоток', 'пила', 'отвёртка']], ['Что НЕ относится к домашним животным?', 'волк', ['кошка', 'корова', 'овца']]]);
      return S('2c' + words[0], G.choice({ q:words[0], opts:shuffle([words[1]].concat(words[2])), ans:words[1], layout:'wide', hint:'Три слова из одной группы, а «' + words[1] + '» — лишнее.', hintPlain:'Три слова из одной группы, а ' + words[1] + ' — лишнее.' }));
    }
    /* ⭐⭐⭐ дерево возможностей, и/или, высказывания */
    function L3(){
      var k = pick(['tree', 'tree', 'pair', 'stmt', 'andor']);
      if(k === 'tree'){ var a = rnd(2, 4), b = rnd(2, 4), c = pick([[ 'рубашки', 'шорт', 'Сколько разных нарядов можно составить?' ]]), tx = 'У Алмаса ' + a + ' ' + G.plural(a, 'рубашка', 'рубашки', 'рубашек') + ' и ' + b + ' ' + G.plural(b, 'пара шорт', 'пары шорт', 'пар шорт') + '. Сколько разных нарядов можно составить?';
        return S('3t' + a + '_' + b, G.choice({ q:tx, say:[G.say(tx)], opts:ops(a * b, [a + b]), ans:String(a * b), layout:'wide', hint:'К каждой из ' + a + ' рубашек подходит любая из ' + b + ' пар шорт. Всего ' + a + ' · ' + b + ' = ' + a * b + '.', hintPlain:'К каждой рубашке подходит любая пара шорт. Получается ' + a + ' умножить на ' + b + ', то есть ' + a * b + '.' })); }
      if(k === 'pair'){ var n = rnd(3, 5), tx2 = n + ' друзей обменялись рукопожатиями — каждый с каждым по одному разу. Сколько было рукопожатий?', ans = n * (n - 1) / 2;
        return S('3p' + n, G.choice({ q:tx2, say:[G.say(tx2)], opts:ops(ans, [n * n, n]), ans:String(ans), layout:'wide', hint:'Каждый жмёт руку ' + (n - 1) + ' друзьям, но каждую пару считаем один раз: ' + n + ' · ' + (n - 1) + ' : 2 = ' + ans, hintPlain:'Каждый пожимает руку ' + (n - 1) + ' друзьям, но каждую пару считаем один раз. Получается ' + ans + '.' })); }
      if(k === 'stmt'){ var a2 = rnd(21, 60), b2 = rnd(5, 18), truth = Math.random() < .5, t2 = pick([['больше', a2 > b2, a2, b2], ['меньше', a2 < b2, a2, b2]]);
        var st = [a2 + ' · 1 = ' + a2, true, 'Число, умноженное на 1, не меняется.'], pool = [[a2 + ' ' + (a2 > b2 ? '>' : '<') + ' ' + b2, true, 'Сравниваем числа: ' + a2 + (a2 > b2 ? ' больше ' : ' меньше ') + b2 + '.'], [a2 + ' ' + (a2 > b2 ? '<' : '>') + ' ' + b2, false, 'На самом деле ' + a2 + (a2 > b2 ? ' больше ' : ' меньше ') + b2 + '.'], [(a2 % 2 === 0 ? 'Число ' + a2 + ' чётное' : 'Число ' + a2 + ' нечётное'), true, 'Смотрим на последнюю цифру числа ' + a2 + '.'], [(a2 % 2 === 0 ? 'Число ' + a2 + ' нечётное' : 'Число ' + a2 + ' чётное'), false, 'Смотрим на последнюю цифру числа ' + a2 + '.']], it = pick(pool);
        return S('3s' + it[0], G.tf({ q:'Верно ли высказывание: «' + it[0] + '»?', truth:it[1], hint:it[2] })); }
      var x = rnd(11, 90), a3 = x - rnd(1, 9), b3 = x + rnd(1, 9), ok = Math.random() < .5;
      var tx3 = 'Число x больше ' + a3 + ' и меньше ' + b3 + '. Какое число подходит?';
      return S('3a' + a3 + b3, G.choice({ q:tx3, say:[G.say(tx3)], opts:shuffle([x, a3, b3, a3 - 1]).map(String), ans:String(x), layout:'wide', hint:'Число должно быть и больше ' + a3 + ', и меньше ' + b3 + ': это ' + x + '.', hintPlain:'Число должно быть одновременно больше ' + a3 + ' и меньше ' + b3 + '. Это ' + x + '.' }));
    }
    return [L1, L2, L3];
  }
});
})();
