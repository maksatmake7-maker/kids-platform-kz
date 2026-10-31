/* Математика, 3 класс — «Периметр, площадь и окружность» (цели 3.3.2.1–3.3.2.5). Клетчатые фигуры и окружность рисуются кодом: M3.grid, M3.circle. */
(function(){
PZ2.define({
  key:"math3area", theme:'workshop', icons:[], groups:[], mcq:[], tf:[],
  custom:function(C){
    var M = C.M, G = C.G, S = C.S, pick = C.pick, shuffle = C.shuffle, rnd = C.rnd;
    function nopts(ans, ex){ var c = shuffle([ans + 1, ans - 1, ans + 2, ans * 2, ans + 4, ans - 4].concat(ex || []).filter(function(x){ return x > 0 && x !== ans; })), out = [ans]; c.forEach(function(x){ if(out.length < 4 && out.indexOf(x) < 0) out.push(x); }); return out.map(String); }
    function grid(a, b, o){ return function(el){ el.innerHTML = M3.grid(a, b, o); }; }
    /* ⭐ считаем клетки и стороны */
    function L1(){
      var a = rnd(3, 8), b = rnd(2, 5), k = pick(['cells', 'cells', 'perim', 'term', 'term2']); if(a === b) b = a - 1;
      if(k === 'cells') return S('1c' + a + '_' + b, G.choice({ q:'Сколько клеток-квадратиков в фигуре? Это её площадь.', opts:nopts(a * b, [a + b]), ans:String(a * b), layout:'wide', field:grid(a, b), hint:'В ряду ' + a + ' клеток, а рядов ' + b + '. Всего ' + a + ' · ' + b + ' = ' + a * b + ' клеток.', hintPlain:'В одном ряду ' + a + ' клеток, а рядов ' + b + '. Получается ' + a * b + ' клеток.' }));
      if(k === 'perim') return S('1p' + a + '_' + b, G.choice({ q:'Найди периметр прямоугольника: сложи длины всех сторон.', opts:nopts((a + b) * 2, [a * b]), ans:String((a + b) * 2), layout:'wide', field:grid(a, b, { a:a + ' см', b:b + ' см', cells:false }), hint:a + ' + ' + b + ' + ' + a + ' + ' + b + ' = ' + (a + b) * 2 + ' см', hintPlain:'Складываем все четыре стороны: ' + a + ' плюс ' + b + ' плюс ' + a + ' плюс ' + b + ' будет ' + (a + b) * 2 + ' сантиметров.' }));
      if(k === 'term') return S('1t', G.choice({ q:'Как называется сумма длин всех сторон фигуры?', opts:['периметр', 'площадь', 'радиус', 'диаметр'], ans:'периметр', layout:'wide', hint:'Сумма длин всех сторон — это периметр.', hintPlain:'Сумма длин всех сторон фигуры называется периметр.' }));
      return S('1t2', G.choice({ q:'Как называется величина, которая показывает, сколько места занимает фигура?', opts:['площадь', 'периметр', 'радиус', 'сторона'], ans:'площадь', layout:'wide', hint:'Сколько места занимает фигура — это площадь. Её измеряют в квадратных сантиметрах.', hintPlain:'Сколько места занимает фигура, показывает площадь. Её измеряют в квадратных сантиметрах.' }));
    }
    /* ⭐⭐ формулы */
    function L2(){
      var a = rnd(3, 12), b = rnd(2, 9), k = pick(['S', 'P', 'S', 'P', 'sq']); if(a === b) b = a + 1;
      if(k === 'S') return S('2s' + a + '_' + b, G.choice({ q:'Найди площадь прямоугольника со сторонами ' + a + ' см и ' + b + ' см.', opts:nopts(a * b, [(a + b) * 2]), ans:String(a * b), layout:'wide', field:grid(a > 8 ? 8 : a, b > 5 ? 5 : b, { a:a + ' см', b:b + ' см', cells:false }), hint:'Площадь = длина · ширина: ' + a + ' · ' + b + ' = ' + a * b + ' см²', hintPlain:'Площадь равна длина умножить на ширина. ' + a + ' умножить на ' + b + ' будет ' + a * b + ' квадратных сантиметров.' }));
      if(k === 'P') return S('2p' + a + '_' + b, G.choice({ q:'Найди периметр прямоугольника со сторонами ' + a + ' см и ' + b + ' см.', opts:nopts((a + b) * 2, [a * b]), ans:String((a + b) * 2), layout:'wide', field:grid(a > 8 ? 8 : a, b > 5 ? 5 : b, { a:a + ' см', b:b + ' см', cells:false }), hint:'Периметр = (длина + ширина) · 2: (' + a + ' + ' + b + ') · 2 = ' + (a + b) * 2 + ' см', hintPlain:'Периметр равен длина плюс ширина, всё умножить на два. Получается ' + (a + b) * 2 + ' сантиметров.' }));
      var s = rnd(2, 12); return S('2q' + s, G.choice({ q:'Найди периметр квадрата со стороной ' + s + ' см.', opts:nopts(s * 4, [s * s]), ans:String(s * 4), layout:'wide', field:grid(4, 4, { a:s + ' см', b:s + ' см', cells:false }), hint:'У квадрата все стороны равны: ' + s + ' · 4 = ' + s * 4 + ' см', hintPlain:'У квадрата четыре равные стороны. ' + s + ' умножить на четыре будет ' + s * 4 + ' сантиметров.' }));
    }
    /* ⭐⭐⭐ неизвестная сторона, окружность */
    function L3(){
      var k = pick(['side', 'sideP', 'circ', 'circ2', 'cmp', 'task']), a = rnd(3, 12), b = rnd(2, 9); if(a === b) b = a + 2;
      if(k === 'side') return S('3s' + a + '_' + b, G.choice({ q:'Площадь прямоугольника ' + a * b + ' см², одна сторона ' + a + ' см. Найди другую сторону.', say:[G.say('Площадь прямоугольника ' + a * b + ' квадратных сантиметров, одна сторона ' + a + ' сантиметров. Найди другую сторону.')], opts:nopts(b, [a]), ans:String(b), layout:'wide', hint:'Сторона = площадь : другая сторона: ' + a * b + ' : ' + a + ' = ' + b + ' см', hintPlain:'Чтобы найти сторону, площадь делим на другую сторону. ' + a * b + ' разделить на ' + a + ' будет ' + b + '.' }));
      if(k === 'sideP') return S('3q' + a + '_' + b, G.choice({ q:'Периметр прямоугольника ' + (a + b) * 2 + ' см, одна сторона ' + a + ' см. Найди другую сторону.', opts:nopts(b, [a]), ans:String(b), layout:'wide', hint:'Сначала полупериметр: ' + (a + b) * 2 + ' : 2 = ' + (a + b) + '.<br>Потом другая сторона: ' + (a + b) + ' − ' + a + ' = ' + b + ' см', hintPlain:'Сначала найдём сумму двух сторон: ' + (a + b) * 2 + ' разделить на два будет ' + (a + b) + '. Потом вычтем известную сторону. Получится ' + b + '.' }));
      if(k === 'circ'){ var r = rnd(2, 9); return S('3c' + r, G.choice({ q:'Радиус окружности ' + r + ' см. Чему равен диаметр?', opts:nopts(r * 2, [r]), ans:String(r * 2), layout:'wide', field:function(el){ el.innerHTML = M3.circle({ r:1, d:1 }); }, hint:'Диаметр в 2 раза больше радиуса: ' + r + ' · 2 = ' + r * 2 + ' см', hintPlain:'Диаметр в два раза больше радиуса. Получается ' + r * 2 + ' сантиметров.' })); }
      if(k === 'circ2'){ var d = rnd(2, 9) * 2; return S('3d' + d, G.choice({ q:'Диаметр окружности ' + d + ' см. Чему равен радиус?', opts:nopts(d / 2, [d]), ans:String(d / 2), layout:'wide', field:function(el){ el.innerHTML = M3.circle({ r:1, d:1 }); }, hint:'Радиус в 2 раза меньше диаметра: ' + d + ' : 2 = ' + d / 2 + ' см', hintPlain:'Радиус в два раза меньше диаметра. Получается ' + d / 2 + ' сантиметров.' })); }
      if(k === 'cmp'){ var a2 = rnd(3, 9), b2 = rnd(3, 9), a3 = rnd(3, 9), b3 = rnd(3, 9); if(a2 * b2 === a3 * b3) b3 += 1; var s1 = a2 * b2, s2 = a3 * b3, sy = M.cmpSym(s1, s2);
        return S('3m' + a2 + b2 + a3 + b3, G.choice({ q:'Сравни площади: прямоугольник ' + a2 + ' на ' + b2 + ' и прямоугольник ' + a3 + ' на ' + b3 + '.', opts:['<', '>', '='], ans:sy, layout:'wide', expr:'<span>' + a2 + ' · ' + b2 + '</span><span>?</span><span>' + a3 + ' · ' + b3 + '</span>', hint:'Первая площадь: ' + s1 + ', вторая: ' + s2 + '. Значит, ' + s1 + ' ' + sy + ' ' + s2, hintPlain:'Первая площадь ' + s1 + ', вторая ' + s2 + '. Сравниваем эти числа.', hintExpr:'<span>' + a2 + ' · ' + b2 + '</span><span class="ok">' + sy + '</span><span>' + a3 + ' · ' + b3 + '</span>' })); }
      var w = rnd(4, 12), l = w + rnd(1, 6); var tx = 'Нужно огородить грядку длиной ' + l + ' м и шириной ' + w + ' м забором. Сколько метров забора нужно?';
      return S('3t' + l + '_' + w, G.choice({ q:tx, say:[G.say(tx)], opts:nopts((l + w) * 2, [l * w]), ans:String((l + w) * 2), layout:'wide', hint:'Забор идёт вокруг грядки, значит, нужен периметр: (' + l + ' + ' + w + ') · 2 = ' + (l + w) * 2 + ' м', hintPlain:'Забор идёт вокруг грядки, значит, нужно найти периметр. Получается ' + (l + w) * 2 + ' метров.' }));
    }
    return [L1, L2, L3];
  }
});
})();
