/* Математика, 3 класс — «Величины и единицы» (цели 3.3.1.1–3.3.1.3). */
(function(){
PZ2.define({
  key:"math3units", theme:'meadow', icons:[], groups:[], mcq:[], tf:[],
  custom:function(C){
    var M = C.M, G = C.G, S = C.S, pick = C.pick, shuffle = C.shuffle, rnd = C.rnd, P = G.plural;
    function nopts(ans, ex){ var c = shuffle([ans * 10, Math.round(ans / 10), ans + 10, ans - 10, ans * 100, ans + 100, ans + 1].concat(ex || []).filter(function(x){ return x > 0 && x !== ans && x % 1 === 0; })), out = [ans]; c.forEach(function(x){ if(out.length < 4 && out.indexOf(x) < 0) out.push(x); }); return out.map(String); }
    var CM = function(n){ return n + ' ' + P(n, 'сантиметр', 'сантиметра', 'сантиметров'); };
    /* ⭐ единицы длины и массы */
    function L1(){
      var k = pick(['mcm', 'dmcm', 'kmm', 'kg', 'cmmm', 'which']), n = rnd(2, 9);
      if(k === 'mcm') return S('1a' + n, G.choice({ q:'Сколько сантиметров в ' + n + ' м?', opts:nopts(n * 100), ans:String(n * 100), layout:'wide', hint:'В 1 метре 100 сантиметров: ' + n + ' · 100 = ' + n * 100 + ' см', hintPlain:'В одном метре сто сантиметров. Умножаем: ' + n + ' умножить на сто будет ' + n * 100 + '.' }));
      if(k === 'dmcm') return S('1b' + n, G.choice({ q:'Сколько сантиметров в ' + n + ' дм?', opts:nopts(n * 10), ans:String(n * 10), layout:'wide', hint:'В 1 дециметре 10 сантиметров: ' + n + ' · 10 = ' + n * 10 + ' см', hintPlain:'В одном дециметре десять сантиметров. Умножаем: ' + n + ' умножить на десять будет ' + n * 10 + '.' }));
      if(k === 'kmm') return S('1c' + n, G.choice({ q:'Сколько метров в ' + n + ' км?', opts:nopts(n * 1000), ans:String(n * 1000), layout:'wide', hint:'В 1 километре 1000 метров: ' + n + ' · 1000 = ' + n * 1000 + ' м', hintPlain:'В одном километре тысяча метров. Получается ' + n * 1000 + '.' }));
      if(k === 'kg') return S('1d' + n, G.choice({ q:'Сколько граммов в ' + n + ' кг?', opts:nopts(n * 1000), ans:String(n * 1000), layout:'wide', hint:'В 1 килограмме 1000 граммов: ' + n + ' · 1000 = ' + n * 1000 + ' г', hintPlain:'В одном килограмме тысяча граммов. Получается ' + n * 1000 + '.' }));
      if(k === 'cmmm') return S('1e' + n, G.choice({ q:'Сколько миллиметров в ' + n + ' см?', opts:nopts(n * 10), ans:String(n * 10), layout:'wide', hint:'В 1 сантиметре 10 миллиметров: ' + n + ' · 10 = ' + n * 10 + ' мм', hintPlain:'В одном сантиметре десять миллиметров. Получается ' + n * 10 + '.' }));
      var q = pick([['Чем измерить длину школьного коридора?', 'метрами', ['метрами', 'граммами', 'литрами', 'секундами']], ['Чем измерить массу арбуза?', 'килограммами', ['килограммами', 'метрами', 'литрами', 'минутами']], ['Чем измерить расстояние между городами?', 'километрами', ['километрами', 'сантиметрами', 'граммами', 'литрами']], ['Чем измерить длину карандаша?', 'сантиметрами', ['сантиметрами', 'километрами', 'тоннами', 'литрами']]]);
      return S('1w' + q[0], G.choice({ q:q[0], opts:shuffle(q[2]), ans:q[1], layout:'wide', hint:'Подходит единица «' + q[1] + '».', hintPlain:'Здесь подходит единица: ' + q[1] + '.' }));
    }
    /* ⭐⭐ составные величины */
    function L2(){
      var k = pick(['mcm', 'kgg', 'cmm', 'cmp', 'cent', 'ton']), a = rnd(1, 9), b = rnd(10, 95);
      if(k === 'mcm') return S('2a' + a + '_' + b, G.choice({ q:'Выразите в сантиметрах: ' + a + ' м ' + b + ' см', opts:nopts(a * 100 + b, [a * 10 + b]), ans:String(a * 100 + b), layout:'wide', expr:'<span>' + a + ' м ' + b + ' см = ? см</span>', hint:a + ' м = ' + a * 100 + ' см. Прибавляем ' + b + ': ' + a * 100 + ' + ' + b + ' = ' + (a * 100 + b), hintPlain:a + ' метров это ' + a * 100 + ' сантиметров. Прибавляем ' + b + '. Получается ' + (a * 100 + b) + '.' }));
      if(k === 'kgg'){ var g = rnd(1, 9) * 50; return S('2b' + a + '_' + g, G.choice({ q:'Выразите в граммах: ' + a + ' кг ' + g + ' г', opts:nopts(a * 1000 + g, [a * 100 + g]), ans:String(a * 1000 + g), layout:'wide', expr:'<span>' + a + ' кг ' + g + ' г = ? г</span>', hint:a + ' кг = ' + a * 1000 + ' г. Прибавляем ' + g + ': ' + (a * 1000 + g), hintPlain:a + ' килограммов это ' + a * 1000 + ' граммов. Прибавляем ' + g + '. Получается ' + (a * 1000 + g) + '.' })); }
      if(k === 'cmm'){ var t = rnd(2, 9) * 100 + rnd(1, 9) * 10; return S('2c' + t, G.choice({ q:'Выразите в метрах и сантиметрах: ' + t + ' см', opts:[Math.floor(t / 100) + ' м ' + t % 100 + ' см', Math.floor(t / 10) + ' м ' + t % 10 + ' см', t % 100 + ' м ' + Math.floor(t / 100) + ' см', Math.floor(t / 100) + ' м ' + (t % 100 + 10) + ' см'], ans:Math.floor(t / 100) + ' м ' + t % 100 + ' см', layout:'wide', hint:'В ' + t + ' см сотен: ' + Math.floor(t / 100) + ', значит, ' + Math.floor(t / 100) + ' м. Остаётся ' + t % 100 + ' см.', hintPlain:'В ' + t + ' сантиметрах ' + Math.floor(t / 100) + ' метра и ' + t % 100 + ' сантиметров остаётся.' })); }
      if(k === 'cmp'){ var m = rnd(1, 4), cm = rnd(1, 4) * 100 + rnd(0, 9) * 10, sy = M.cmpSym(m * 100, cm); if(m * 100 === cm) cm += 10; sy = M.cmpSym(m * 100, cm);
        return S('2d' + m + '_' + cm, G.choice({ q:'Сравни: ' + m + ' м и ' + cm + ' см.', opts:['<', '>', '='], ans:sy, layout:'wide', expr:'<span>' + m + ' м</span><span>?</span><span>' + cm + ' см</span>', hint:m + ' м = ' + m * 100 + ' см. Сравниваем ' + m * 100 + ' и ' + cm + ': ' + m * 100 + ' ' + sy + ' ' + cm, hintPlain:'Переводим метры в сантиметры: ' + m + ' метров это ' + m * 100 + ' сантиметров. Теперь сравниваем.', hintExpr:'<span>' + m + ' м</span><span class="ok">' + sy + '</span><span>' + cm + ' см</span>' })); }
      if(k === 'cent'){ var n = rnd(2, 9); return S('2e' + n, G.choice({ q:'Сколько килограммов в ' + n + ' ' + P(n, 'центнере', 'центнерах', 'центнерах') + '? В одном центнере 100 килограммов.', opts:nopts(n * 100), ans:String(n * 100), layout:'wide', hint:'1 ц = 100 кг. Значит, ' + n + ' · 100 = ' + n * 100 + ' кг.', hintPlain:'В одном центнере сто килограммов. Получается ' + n * 100 + '.' })); }
      var n2 = rnd(2, 9); return S('2f' + n2, G.choice({ q:'Сколько килограммов в ' + n2 + ' ' + P(n2, 'тонне', 'тоннах', 'тоннах') + '? В одной тонне 1000 килограммов.', opts:nopts(n2 * 1000), ans:String(n2 * 1000), layout:'wide', hint:'1 т = 1000 кг. Значит, ' + n2 + ' · 1000 = ' + n2 * 1000 + ' кг.', hintPlain:'В одной тонне тысяча килограммов. Получается ' + n2 * 1000 + '.' }));
    }
    /* ⭐⭐⭐ действия с величинами, задачи */
    function L3(){
      var k = pick(['add', 'sub', 'task', 'liter', 'mul']), a = rnd(1, 5), b = rnd(20, 90), c = rnd(10, 60);
      if(k === 'add') return S('3a' + a + '_' + b + '_' + c, G.choice({ q:'Сложи: ' + a + ' м ' + b + ' см + ' + c + ' см. Ответ в сантиметрах.', opts:nopts(a * 100 + b + c, [a * 10 + b + c]), ans:String(a * 100 + b + c), layout:'wide', hint:a + ' м ' + b + ' см = ' + (a * 100 + b) + ' см.<br>' + (a * 100 + b) + ' + ' + c + ' = ' + (a * 100 + b + c) + ' см', hintPlain:'Переводим в сантиметры: ' + (a * 100 + b) + '. Прибавляем ' + c + '. Получается ' + (a * 100 + b + c) + '.' }));
      if(k === 'sub') return S('3s' + a + '_' + b + '_' + c, G.choice({ q:'Вычти: ' + (a + 1) + ' м − ' + b + ' см. Ответ в сантиметрах.', opts:nopts((a + 1) * 100 - b, [(a + 1) * 10 - b]), ans:String((a + 1) * 100 - b), layout:'wide', hint:(a + 1) + ' м = ' + (a + 1) * 100 + ' см.<br>' + (a + 1) * 100 + ' − ' + b + ' = ' + ((a + 1) * 100 - b) + ' см', hintPlain:'Переводим в сантиметры: ' + (a + 1) * 100 + '. Вычитаем ' + b + '. Получается ' + ((a + 1) * 100 - b) + '.' }));
      if(k === 'task'){ var kg = rnd(2, 9), g = rnd(1, 9) * 100, tx = 'Масса мешка ' + kg + ' кг, а масса коробки ' + g + ' г. На сколько граммов мешок тяжелее коробки?';
        return S('3t' + kg + '_' + g, G.choice({ q:tx, say:[G.say(tx)], opts:nopts(kg * 1000 - g, [kg * 100 - g]), ans:String(kg * 1000 - g), layout:'wide', hint:kg + ' кг = ' + kg * 1000 + ' г. Разность: ' + kg * 1000 + ' − ' + g + ' = ' + (kg * 1000 - g) + ' г', hintPlain:'Переводим килограммы в граммы: ' + kg * 1000 + '. Вычитаем ' + g + '. Получается ' + (kg * 1000 - g) + '.' })); }
      if(k === 'liter'){ var l = rnd(2, 6), n = rnd(2, 5), tx2 = 'В бидон налили ' + l + ' л молока, а в кувшин — в ' + n + ' раза меньше. Сколько литров молока в кувшине?'; l = l * n;
        tx2 = 'В бидон налили ' + l + ' л молока, а в кувшин — в ' + n + ' ' + P(n, 'раз', 'раза', 'раз') + ' меньше. Сколько литров молока в кувшине?';
        return S('3l' + l + '_' + n, G.choice({ q:tx2, say:[G.say(tx2)], opts:nopts(l / n), ans:String(l / n), layout:'wide', hint:'«В ' + n + ' раза меньше» — делим: ' + l + ' : ' + n + ' = ' + l / n + ' л', hintPlain:'Слова «в несколько раз меньше» значат, что нужно делить. ' + l + ' разделить на ' + n + ' будет ' + l / n + '.' })); }
      var m = rnd(2, 6), n3 = rnd(15, 45), tx3 = 'Один шаг Алии равен ' + n3 + ' см. Сколько сантиметров она пройдёт за ' + m + ' ' + P(m, 'шаг', 'шага', 'шагов') + '?';
      return S('3m' + m + '_' + n3, G.choice({ q:tx3, say:[G.say(tx3)], opts:nopts(m * n3, [n3 + m]), ans:String(m * n3), layout:'wide', hint:n3 + ' · ' + m + ' = ' + m * n3 + ' см', hintPlain:n3 + ' умножить на ' + m + ' будет ' + m * n3 + '.' }));
    }
    return [L1, L2, L3];
  }
});
})();
