/* ===== Білім Аралы — «Тенге: Магазин Барсика» (v3) =====
   Математика, 2 класс (цель 2.1.3.6 приказа №399): монеты 50 и 100 тенге, купюры 200 и 500 тенге; сумма, оплата, сдача.
   «Приключения Барсика»: движок games/mathx.js + голос games/mathx-voice.js + набор games/mathx-g2.js + заставка games/mathx-hero.js
   подгружаются сами. Режим освоения: 10 заданий подряд без ошибки, три уровня.
*/
window.__mxHeroCfg = {theme:'market', icons:['🪙','💵','🛒']};
(function(){
  var cs = document.currentScript;
  var base = cs && cs.src ? cs.src.replace(/[^\/]*$/, '') : '../../../games/';
  window.__mxBase = window.__mxBase || base;
  function load(src, cb){ var s = document.createElement('script'); s.src = src; s.onload = cb; s.onerror = cb; document.head.appendChild(s); }
  if(!window.__mxLoad){
    var waiting = [], done = false, chain = [];
    if(!window.Barsik) chain.push(base + '../assets/barsik.js');
    chain.push(base + 'mathx-voice.js'); chain.push(base + 'mathx.js'); chain.push(base + 'mathx-g2.js'); chain.push(base + 'mathx-hero.js');
    chain.slice().forEach(function(u){ try { var l = document.createElement('link'); l.rel = 'preload'; l.as = 'script'; l.href = u; document.head.appendChild(l); } catch(e){} });
    (function next(){
      if(!chain.length){ done = true; try { if(window.MXHero) (document.readyState === 'loading' ? document.addEventListener.bind(document, 'DOMContentLoaded') : function(f){ f(); })(MXHero.init); } catch(e){} waiting.forEach(function(f){ f(); }); waiting = []; return; }
      load(chain.shift(), next);
    })();
    window.__mxLoad = function(cb){ if(done) cb(); else waiting.push(cb); };
  }
})();

function initTengeGame(containerId){
  __mxLoad(function(){
    var M = MX, G = MXG2, rnd = M.rnd, pick = M.pick, shuffle = M.shuffle, OK = M.OKV;
    function S(sig, t){ t.sig = sig; return t; }
    var DEN = [50, 100, 200, 500];
    function sumOpts(s){ var c = [s]; [s + 50, s - 50, s + 100, s - 100, s + 150, s - 150, s + 200].forEach(function(x){ if(x >= 50 && c.indexOf(x) < 0 && c.length < 4) c.push(x); }); return shuffle(c).map(function(v){ return { v:String(v), h:String(v) }; }); }
    function coinsRow(list){ return '<div class="mxs-row" style="gap:6px">' + list.map(function(v){ return G.money(v, v <= 100 ? 50 : 80); }).join('') + '</div>'; }
    function hintSum(list){ var s = list.reduce(function(a, b){ return a + b; }, 0); return { hintExpr:'<span class="ok">' + s + ' ₸</span>', hintSay:[G.say('Складываем: ' + list.join(' плюс ') + '. Получится ' + s + ' тенге.')], hint:G.hintCard(coinsRow(list), list.join(' + ') + ' = <b>' + s + ' ₸</b>') }; }
    function wallet(){ var n = rnd(2, 4), l = []; for(var i = 0; i < n; i++) l.push(pick(DEN)); l.sort(function(a, b){ return b - a; }); var s = l.reduce(function(a, b){ return a + b; }, 0); if(s > 1200) return wallet(); return l; }
    var SHOP = [['🍞', 'хлеб', 150], ['🥛', 'молоко', 250], ['🍎', 'яблоки', 300], ['🧃', 'сок', 200], ['🍫', 'шоколадка', 350], ['⚽', 'мяч', 450], ['✏️', 'карандаш', 100], ['📒', 'тетрадь', 150], ['🍦', 'мороженое', 200], ['🧸', 'мишка', 400]];

    /* ⭐ сколько тенге у Барсика: нажми на деньги и посчитай */
    function L1(){
      var l = wallet(), s = l.reduce(function(a, b){ return a + b; }, 0);
      return S('1' + l.join('-'), Object.assign(G.tapSum({ expr:'', q:'Сколько тенге? Нажимай на монеты и купюры', say:[G.say('Сколько тенге в кошельке? Нажимай на деньги по очереди и считай.')], sayEach:false,
        units:l.map(function(v){ return { h:G.money(v, v <= 100 ? 56 : 84), val:v }; }), opts:sumOpts(s), ans:s, suffix:' ₸' }), hintSum(l)));
    }
    /* ⭐⭐ заплати точную сумму: набери деньгами */
    function L2(){
      var n = rnd(3, 18)*50, tgt = n;
      return S('2' + n, Object.assign({ expr:'<span class="g2-chip">' + n + ' ₸</span>', cap:'Заплати эту сумму. Нажимай на деньги', say:[G.say('Заплати ' + n + ' тенге. Нажимай на монеты и купюры, а потом на галочку.')], ans:String(tgt), gate:false,
        field:function(el, X, task){
          var sum = 0, big = document.createElement('div'); big.className = 'g2-big'; big.textContent = '0 ₸';
          var w = document.createElement('div'); w.className = 'g2-tiles'; var bs = [];
          DEN.forEach(function(v, i){ var b = document.createElement('button'); b.type = 'button'; b.className = 'g2-tile'; b.style.animationDelay = (i*.05) + 's'; b.innerHTML = G.money(v, v <= 100 ? 56 : 84); b.addEventListener('click', function(){ if(task._done) return; sum += v; big.textContent = sum + ' ₸'; X.sfx.tap(Math.min(8, Math.round(v/50))); }); w.appendChild(b); bs.push(b); });
          var row = document.createElement('div'); row.className = 'mxs-row';
          var rs = document.createElement('button'); rs.type = 'button'; rs.className = 'g2-tile'; rs.innerHTML = '<span class="e">↺</span>'; rs.style.minWidth = '60px'; rs.style.minHeight = '60px'; rs.addEventListener('click', function(){ if(task._done) return; sum = 0; big.textContent = '0 ₸'; });
          var ok = document.createElement('button'); ok.type = 'button'; ok.className = 'g2-go'; ok.textContent = '✔';
          ok.addEventListener('click', function(){ if(task._done) return; task._done = true; task.submit(String(sum), ok); });
          row.appendChild(rs); row.appendChild(ok); el.appendChild(w); el.appendChild(big); el.appendChild(row);
          task.auto = function(wrong){ if(task._done) return; var left = tgt; [500, 200, 100, 50].forEach(function(v){ while(left >= v){ left -= v; } }); sum = wrong ? tgt + 50 : tgt; task._done = true; task.submit(String(sum), ok); };
        } },
        { hintExpr:'<span class="ok">' + n + ' ₸</span>', hintSay:[G.say('Нужно ' + n + ' тенге. Например: ' + (function(){ var parts = [], left = n; [500, 200, 100, 50].forEach(function(v){ while(left >= v){ parts.push(v); left -= v; } }); return parts.join(', '); })() + '.')],
          hint:G.hintCard((function(){ var parts = [], left = n; [500, 200, 100, 50].forEach(function(v){ while(left >= v){ parts.push(v); left -= v; } }); return coinsRow(parts); })(), 'Подойдёт любой набор, главное — чтобы вышло ровно <b>' + n + ' ₸</b>') }));
    }
    /* ⭐⭐⭐ сдача, хватит ли, сколько вместе */
    function L3(){
      var k = pick(['change', 'change', 'enough', 'total']), a = pick(SHOP), b;
      if(k === 'change'){
        var paid = pick([500, 500, 1000]), item = pick(SHOP.filter(function(x){ return x[2] < paid; })), ch = paid - item[2];
        return S('3c' + item[1] + paid, Object.assign({ expr:'<span style="font-size:2.2rem">' + item[0] + '</span><span class="g2-chip">' + item[2] + ' ₸</span>', cap:item[1] + ' стоит ' + item[2] + ' ₸. Дали ' + paid + ' ₸. Сколько сдачи?', say:[G.say(item[1] + ' стоит ' + item[2] + ' тенге. Продавцу дали ' + paid + ' тенге. Сколько сдачи?')], ans:String(ch), opts:sumOpts(ch),
          field:function(el){ el.innerHTML = G.money(paid, 100); } },
          { hintExpr:'<span class="ok">' + ch + ' ₸</span>', hintSay:[G.say('Сдача — это ' + paid + ' минус ' + item[2] + '. Получается ' + ch + ' тенге.')], hint:G.hintCard(G.money(paid, 90), paid + ' − ' + item[2] + ' = <b>' + ch + ' ₸</b>') }));
      }
      if(k === 'enough'){
        var l = wallet(), s = l.reduce(function(x, y){ return x + y; }, 0), it = pick(SHOP), ok = Math.random() < .5 ? it[2] <= s : it[2] <= s;
        // подбираем предмет так, чтобы ответы чередовались
        var want = Math.random() < .5; var cand = SHOP.filter(function(x){ return want ? x[2] <= s : x[2] > s; }); if(cand.length) it = pick(cand); ok = it[2] <= s;
        return S('3e' + it[1] + l.join('-'), Object.assign({ expr:'<span style="font-size:2.2rem">' + it[0] + '</span><span class="g2-chip">' + it[2] + ' ₸</span>', cap:'Хватит ли денег на ' + it[1] + '?', say:[G.say('У Барсика ' + s + ' тенге. ' + it[1] + ' стоит ' + it[2] + ' тенге. Хватит ли денег?')], ans:ok ? 'Хватит' : 'Не хватит', opts:G.txtOpts(['Хватит', 'Не хватит']), layout:'wide',
          field:function(el){ el.innerHTML = coinsRow(l); } }, hintSum(l), { hintExpr:'<span class="ok">' + (ok ? 'Хватит' : 'Не хватит') + '</span>', hintSay:[G.say('В кошельке ' + s + ' тенге. ' + (ok ? 'Этого достаточно' : 'Этого мало') + ': ' + it[1] + ' стоит ' + it[2] + '.')] }));
      }
      b = pick(SHOP.filter(function(x){ return x !== a; })); var tot = a[2] + b[2];
      return S('3t' + a[1] + b[1], Object.assign({ expr:'<span style="font-size:2rem">' + a[0] + '</span><span>+</span><span style="font-size:2rem">' + b[0] + '</span>', cap:a[1] + ' ' + a[2] + ' ₸ и ' + b[1] + ' ' + b[2] + ' ₸. Сколько вместе?', say:[G.say(a[1] + ' стоит ' + a[2] + ' тенге, ' + b[1] + ' стоит ' + b[2] + ' тенге. Сколько денег нужно на обе покупки?')], ans:String(tot), opts:sumOpts(tot) },
        { hintExpr:'<span class="ok">' + tot + ' ₸</span>', hintSay:[G.say(a[2] + ' плюс ' + b[2] + ' — это ' + tot + ' тенге.')], hint:G.hintCard('', a[2] + ' + ' + b[2] + ' = <b>' + tot + ' ₸</b>') }));
    }

    M.run({ root:containerId, key:'tenge', need:10, theme:'market', levels:[L1, L2, L3] });
  });
}
