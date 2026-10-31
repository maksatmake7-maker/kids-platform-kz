/* Математика, 3 класс — «Прямые, координаты и тела» (цели 3.3.1.4, 3.3.2.6–3.3.2.7). Прямые и координатная сетка рисуются кодом: M3.lines, M3.coord. */
(function(){
PZ2.define({
  key:"math3geom", theme:'workshop', icons:[], groups:[], mcq:[], tf:[],
  custom:function(C){
    var M = C.M, G = C.G, S = C.S, pick = C.pick, shuffle = C.shuffle, rnd = C.rnd, P = G.plural;
    var KIND = { par:'параллельные', perp:'перпендикулярные', cross:'пересекающиеся' };
    function nopts(ans, ex){ var c = shuffle([ans + 1, ans - 1, ans + 2, ans * 2].concat(ex || []).filter(function(x){ return x > 0 && x !== ans; })), out = [ans]; c.forEach(function(x){ if(out.length < 4 && out.indexOf(x) < 0) out.push(x); }); return out.map(String); }
    var LET = ['A', 'B', 'C', 'D', 'E'];
    function pts(n){ var out = [], used = {}; while(out.length < n){ var x = rnd(1, 6), y = rnd(1, 6), k = x + '_' + y; if(!used[k]){ used[k] = 1; out.push([x, y, LET[out.length]]); } } return out; }
    function ptKey(l){ return l.map(function(p){ return p[0] + p[1]; }).join('_'); }
    /* ⭐ виды прямых */
    function L1(){
      var k = pick(['par', 'perp', 'cross', 'q1', 'q2']);
      if(k === 'q1') return S('1q1', G.choice({ q:'Как называются прямые, которые никогда не пересекаются?', opts:['параллельные', 'перпендикулярные', 'пересекающиеся', 'круглые'], ans:'параллельные', layout:'wide', field:function(el){ el.innerHTML = M3.lines('par'); }, hint:'Прямые, которые никогда не пересекаются, называются параллельными.', hintPlain:'Прямые, которые никогда не пересекаются, называются параллельными.' }));
      if(k === 'q2') return S('1q2', G.choice({ q:'Как называются прямые, которые пересекаются под прямым углом?', opts:['перпендикулярные', 'параллельные', 'круглые', 'ломаные'], ans:'перпендикулярные', layout:'wide', field:function(el){ el.innerHTML = M3.lines('perp'); }, hint:'Прямые, которые пересекаются под прямым углом, называются перпендикулярными.', hintPlain:'Прямые, которые пересекаются под прямым углом, называются перпендикулярными.' }));
      return S('1' + k, G.choice({ q:'Какие это прямые?', opts:['параллельные', 'перпендикулярные', 'пересекающиеся'], ans:KIND[k], layout:'wide', field:function(el){ el.innerHTML = M3.lines(k); }, hint:k === 'par' ? 'Эти прямые идут рядом и никогда не пересекутся — параллельные.' : k === 'perp' ? 'Прямые пересекаются под прямым углом — перпендикулярные.' : 'Прямые пересекаются не под прямым углом — просто пересекающиеся.', hintPlain:k === 'par' ? 'Эти прямые идут рядом и никогда не пересекутся. Они параллельные.' : k === 'perp' ? 'Прямые пересекаются под прямым углом. Они перпендикулярные.' : 'Прямые пересекаются, но не под прямым углом. Они просто пересекающиеся.' }));
    }
    /* ⭐⭐ координаты */
    function L2(){
      var k = pick(['read', 'read', 'find', 'xy']), l = pts(3), t = pick(l);
      if(k === 'read') return S('2r' + ptKey(l) + t[2], G.choice({ q:'Какие координаты у точки ' + t[2] + '? Сначала вправо, потом вверх.', opts:shuffle([t[0] + ';' + t[1], t[1] + ';' + t[0], (t[0] + 1) + ';' + t[1], t[0] + ';' + (t[1] + 1)].filter(function(x, i, s){ return s.indexOf(x) === i; })), ans:t[0] + ';' + t[1], layout:'wide', field:function(el){ el.innerHTML = M3.coord(l); },
        hint:'Точка ' + t[2] + ': вправо на ' + t[0] + ', вверх на ' + t[1] + '. Координаты (' + t[0] + '; ' + t[1] + ').', hintPlain:'Точка ' + t[2] + ': идём вправо на ' + t[0] + ' и вверх на ' + t[1] + '. Координаты ' + t[0] + ' и ' + t[1] + '.' }));
      if(k === 'find'){ var opts = l.map(function(p){ return p[2]; });
        return S('2f' + ptKey(l) + t[2], G.choice({ q:'Какая точка имеет координаты (' + t[0] + '; ' + t[1] + ')?', opts:opts, ans:t[2], layout:'wide', field:function(el){ el.innerHTML = M3.coord(l); }, hint:'Идём вправо на ' + t[0] + ', потом вверх на ' + t[1] + ' — попадаем в точку ' + t[2] + '.', hintPlain:'Идём вправо на ' + t[0] + ', потом вверх на ' + t[1] + '. Попадаем в точку ' + t[2] + '.' })); }
      return S('2x' + ptKey(l) + t[2], G.choice({ q:'На сколько клеток точка ' + t[2] + ' находится правее начала, то есть левого нижнего угла?', opts:nopts(t[0], [t[1]]), ans:String(t[0]), layout:'wide', field:function(el){ el.innerHTML = M3.coord(l); }, hint:'Вправо показывает первая координата: ' + t[0] + '.', hintPlain:'Вправо показывает первая координата. Это ' + t[0] + '.' }));
    }
    /* ⭐⭐⭐ тела и развёртки, расстояния по сетке */
    function L3(){
      var k = pick(['cube', 'cube2', 'cube3', 'dist', 'rect']), l = pts(2);
      if(k === 'cube') return S('3c1', G.choice({ q:'Сколько граней у куба?', opts:['6', '4', '8', '12'], ans:'6', layout:'wide', hint:'У куба 6 граней: все они — равные квадраты.', hintPlain:'У куба шесть граней. Все они равные квадраты.' }));
      if(k === 'cube2') return S('3c2', G.choice({ q:'Сколько рёбер у куба?', opts:['12', '6', '8', '4'], ans:'12', layout:'wide', hint:'У куба 12 рёбер.', hintPlain:'У куба двенадцать рёбер.' }));
      if(k === 'cube3') return S('3c3', G.choice({ q:'Сколько вершин у куба?', opts:['8', '6', '12', '4'], ans:'8', layout:'wide', hint:'У куба 8 вершин.', hintPlain:'У куба восемь вершин.' }));
      if(k === 'dist'){ var a = rnd(1, 3), b = rnd(1, 3), c = a + rnd(2, 3), p1 = [a, b, 'A'], p2 = [c, b, 'B'];
        return S('3d' + a + b + c, G.choice({ q:'Сколько клеток между точками A и B по прямой?', opts:nopts(c - a), ans:String(c - a), layout:'wide', field:function(el){ el.innerHTML = M3.coord([p1, p2]); }, hint:'Точки на одной высоте. Считаем клетки по горизонтали: ' + c + ' − ' + a + ' = ' + (c - a), hintPlain:'Точки стоят на одной высоте. Считаем клетки: ' + c + ' минус ' + a + ' будет ' + (c - a) + '.' })); }
      var w = rnd(2, 4), h = rnd(1, 3), x0 = rnd(1, 2), y0 = rnd(1, 2), pl = [[x0, y0, 'A'], [x0 + w, y0, 'B'], [x0 + w, y0 + h, 'C'], [x0, y0 + h, 'D']];
      return S('3r' + w + h + x0 + y0, G.choice({ q:'Точки A, B, C и D — вершины прямоугольника. Чему равен его периметр в клетках?', opts:nopts((w + h) * 2, [w * h]), ans:String((w + h) * 2), layout:'wide', field:function(el){ el.innerHTML = M3.coord(pl); }, hint:'Сторона AB — ' + w + ' клетки, сторона BC — ' + h + '. Периметр: (' + w + ' + ' + h + ') · 2 = ' + (w + h) * 2, hintPlain:'Одна сторона ' + w + ' клетки, другая ' + h + '. Периметр: сумма сторон, умноженная на два. Получается ' + (w + h) * 2 + '.' }));
    }
    return [L1, L2, L3];
  }
});
})();
