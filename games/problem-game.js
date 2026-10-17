/* ===== Білім Аралы — «Реши задачу: Зимняя ярмарка Барсика» (v3) =====
   Математика, 1 класс (цели 1.5.1.3, 1.5.1.4 приказа №399): задачи на сумму и остаток, на увеличение и уменьшение числа на несколько единиц. Числа до 20. Уровни: сумма и остаток → на несколько больше/меньше → какое действие.
   «Приключения Барсика»: движок games/mathx.js + голос games/mathx-voice.js + заставка games/mathx-hero.js
   подгружаются сами — страницу менять не надо. Режим освоения: 10 заданий подряд без ошибки.
*/
window.__mxHeroCfg = {theme:'snow',icons:['⛄','🍎','➕']};
(function(){
  var cs = document.currentScript;
  var base = cs && cs.src ? cs.src.replace(/[^\/]*$/, '') : '../../../games/';
  window.__mxBase = window.__mxBase || base;
  function load(src, cb){ var s = document.createElement('script'); s.src = src; s.onload = cb; s.onerror = cb; document.head.appendChild(s); }
  if(!window.__mxLoad){
    var waiting = [], done = false, chain = [];
    if(!window.Barsik) chain.push(base + '../assets/barsik.js');
    chain.push(base + 'mathx-voice.js'); chain.push(base + 'mathx.js'); chain.push(base + 'mathx-hero.js');
    (function next(){
      if(!chain.length){ done = true; try { if(window.MXHero) (document.readyState === 'loading' ? document.addEventListener.bind(document, 'DOMContentLoaded') : function(f){ f(); })(MXHero.init); } catch(e){} waiting.forEach(function(f){ f(); }); waiting = []; return; }
      load(chain.shift(), next);
    })();
    window.__mxLoad = function(cb){ if(done) cb(); else waiting.push(cb); };
  }
})();
function initProblemGame(containerId){
  __mxLoad(function(){
    var M = MX, rnd = M.rnd, pick = M.pick, V = MXV, shuffle = M.shuffle, OK = M.OKV;
    function S(sig, t){ t.sig = sig; return t; }
    function eqs(parts){ return M.exprHtml(parts); }
    function lg(){ return document.documentElement.getAttribute('data-current') || 'ru'; }
    function tr(o){ var l = lg(); return o[l] || o.en; }
    function msgs(){ return (typeof translations !== 'undefined' && translations[lg()]) ? translations[lg()] : {}; }
    var EMS = ['🍎','⭐','🎈','🐟','🍓','🧸','🌸','🐧','🍪','🐥'];

    (function(){
      if(document.getElementById('mxp-css')) return;
      var s = document.createElement('style'); s.id = 'mxp-css';
      s.textContent = ''
      + '.mxp-text{width:min(100%,330px);background:#fff;border-radius:20px;padding:10px 14px;text-align:center;font:800 1.12rem/1.25 "Baloo 2",sans-serif;color:#25324A;box-shadow:0 5px 0 rgba(0,0,0,.14);animation:mxIn .4s backwards;}'
      + '.mxp-row{display:flex;flex-wrap:wrap;gap:2px;justify-content:center;width:min(100%,300px);min-height:46px;}'
      + '.mxp-it{font-size:1.75rem;line-height:1;padding:1px;border-radius:12px;animation:mxIn .35s backwards;transition:opacity .3s,transform .3s;}'
      + '.mxp-it.new{background:rgba(255,201,60,.85);animation:mxBump .5s;}'
      + '.mxp-it.gone{opacity:.28;transform:scale(.8);filter:grayscale(1);position:relative;}'
      + '.mxp-it.gone:after{content:"✖";position:absolute;left:0;right:0;top:3px;text-align:center;font-size:1.3rem;color:#FF4B4B;opacity:1;filter:none;}'
      + '.mxp-box{width:min(100%,310px);background:rgba(255,255,255,.7);border-radius:18px;padding:6px 8px 8px;box-shadow:0 4px 0 rgba(0,0,0,.12);display:flex;align-items:center;gap:8px;}'
      + '.mxp-box .n{flex:0 0 auto;width:30px;height:30px;border-radius:50%;background:#3FA7FF;color:#fff;font:800 1.1rem/30px "Baloo 2",sans-serif;text-align:center;}'
      + '.mxp-box .row{flex:1;display:flex;flex-wrap:wrap;gap:2px;justify-content:flex-start;min-height:40px;align-items:center;}'
      + '.mxp-box .row .mxp-it{font-size:1.45rem;}'
      + '.mxp-q{width:44px;height:44px;border-radius:14px;background:#FF6B5B;color:#fff;font:800 1.7rem/44px "Baloo 2",sans-serif;text-align:center;box-shadow:0 3px 0 #D9483A;}'
      + '.mxs-balloon.wide .b .op{font-size:1.5rem;}'
      + '@media (prefers-reduced-motion:reduce){.mxp-it,.mxp-text{animation:none}}';
      document.head.appendChild(s);
    })();

    var CMPTXT = {
      more:{ ru:'В первой коробке {a} {e}, а во второй на {b} больше. Сколько {e} во второй коробке?', kz:'Бірінші қорапта {a} {e}. Екінші қорапта одан {b} {e} артық. Екінші қорапта неше {e} бар?', en:'The first box has {a} {e}. The second box has {b} more. How many {e} are in the second box?', zh:'第一个盒子里有{a}个{e}，第二个盒子比它多{b}个。第二个盒子里有多少个{e}？' },
      less:{ ru:'В первой коробке {a} {e}, а во второй на {b} меньше. Сколько {e} во второй коробке?', kz:'Бірінші қорапта {a} {e}. Екінші қорапта одан {b} {e} кем. Екінші қорапта неше {e} бар?', en:'The first box has {a} {e}. The second box has {b} fewer. How many {e} are in the second box?', zh:'第一个盒子里有{a}个{e}，第二个盒子比它少{b}个。第二个盒子里有多少个{e}？' }
    };
    function fill(t, a, b, e){ return String(t).replace(/{a}/g, a).replace(/{b}/g, b).replace(/{emoji}/g, e).replace(/{e}/g, e); }
    function textOf(kind, a, b, e){
      var m = msgs();
      if(kind === 'add') return fill(m.problem_add_template || 'There were {a} {emoji}. {b} more {emoji} were added. How many {emoji} are there now?', a, b, e);
      if(kind === 'sub') return fill(m.problem_subtract_template || 'There were {a} {emoji}. {b} {emoji} were taken away. How many {emoji} are left?', a, b, e);
      return fill(tr(CMPTXT[kind]), a, b, e);
    }
    function items(n, em, cls){ var h = ''; for(var i = 0; i < n; i++) h += '<span class="mxp-it ' + (cls || '') + '" style="animation-delay:' + (i*0.035) + 's">' + em + '</span>'; return h; }
    function resOf(kind, a, b){ return (kind === 'add' || kind === 'more') ? a + b : a - b; }
    function sgn(kind){ return (kind === 'add' || kind === 'more') ? '+' : '−'; }
    function storyField(kind, a, b, em){
      return function(el){
        var t = '<div class="mxp-text">' + textOf(kind, a, b, em) + '</div>';
        if(kind === 'add' || kind === 'sub') el.innerHTML = t + '<div class="mxp-row">' + items(a, em) + '</div>';
        else el.innerHTML = t + '<div class="mxp-box"><span class="n">1</span><div class="row">' + items(a, em) + '</div></div><div class="mxp-box"><span class="n">2</span><div class="row"><span class="mxp-q">?</span></div></div>';
      };
    }
    /* подсказка: сцена оживает, потом пример */
    function storyHint(kind, a, b, em){
      var res = resOf(kind, a, b);
      var ex = eqs([a, sgn(kind), b, OK('='), OK(res)]);
      return function(el, X){
        var rows;
        if(kind === 'add') el.innerHTML = '<div class="mxp-row">' + items(a, em) + '</div>';
        else if(kind === 'sub') el.innerHTML = '<div class="mxp-row">' + items(a, em) + '</div>';
        else el.innerHTML = '<div class="mxp-box"><span class="n">1</span><div class="row">' + items(a, em) + '</div></div><div class="mxp-box"><span class="n">2</span><div class="row">' + items(a, em) + '</div></div>';
        var all = [].slice.call(el.querySelectorAll('.row,.mxp-row')), row = all[all.length - 1];
        el.insertAdjacentHTML('beforeend', '<div class="mxs-expr s" style="opacity:0;transition:opacity .4s">' + ex + '</div>');
        var exEl = el.lastChild, i = 0;
        (function step(){
          if(i >= b){ exEl.style.opacity = 1; return; }
          if(kind === 'add' || kind === 'more'){ row.insertAdjacentHTML('beforeend', items(1, em, 'new')); }
          else { var kids = row.querySelectorAll('.mxp-it:not(.gone)'); if(kids.length) kids[kids.length - 1].classList.add('gone'); }
          X.sfx.tap(i + 1); i++;
          X.sleep(420).then(function(ok){ if(ok) step(); });
        })();
      };
    }
    function hintTokens(kind, a, b){ return [a, sgn(kind), b, '=', resOf(kind, a, b)]; }

    function storyTask(kind, a, b, em){
      var res = resOf(kind, a, b);
      return S(kind + a + '_' + b + em, {
        expr:'', say:V.tpl('story', {k:kind, a:a, b:b}), ans:String(res), opts:M.numOpts(res, 0, 20, [res - 1, res + 1, a, b, res + 2]),
        field:storyField(kind, a, b, em), hintSay:hintTokens(kind, a, b), hintExpr:'', hint:storyHint(kind, a, b, em)
      });
    }
    /* ⭐⭐⭐ «какое действие?» */
    function opTask(kind, a, b, em){
      var res = resOf(kind, a, b), plus = sgn(kind) === '+', right = plus ? '+' : '−';
      var o = shuffle([{ v:'+', h:'<span class="op">' + a + ' + ' + b + '</span>' }, { v:'−', h:'<span class="op">' + a + ' − ' + b + '</span>' }]);
      return S('op' + kind + a + '_' + b + em, {
        expr:'', say:V.tpl('story', {k:kind, a:a, b:b, noq:true}).concat(['f:whichop']), ans:right, layout:'wide', opts:o,
        field:storyField(kind, a, b, em), hintSay:hintTokens(kind, a, b), hintExpr:'', hint:storyHint(kind, a, b, em)
      });
    }

    function genAdd(maxSum, lo){ var s = rnd(lo || 3, maxSum), a = rnd(1, s - 1), b = s - a; return [a, b]; }
    function genSub(maxA, lo){ var a = rnd(lo || 3, maxA), b = rnd(1, a - 1); return [a, b]; }
    function genMore(maxSum){ var s = rnd(4, maxSum), a = rnd(1, s - 1), b = s - a; return [a, b]; }
    function genLess(maxA){ var a = rnd(3, maxA), b = rnd(1, a - 1); return [a, b]; }

    /* ⭐: сумма и остаток, числа до 9 */
    function L1(em){ var e = pick(EMS), r; if(Math.random() < .5){ r = genAdd(9); return storyTask('add', r[0], r[1], e); } r = genSub(9); return storyTask('sub', r[0], r[1], e); }
    /* ⭐⭐: «на несколько больше / меньше», числа до 14 */
    function L2(em){
      var e = pick(EMS), t = pick(['more','less','more','less','add','sub']), r;
      if(t === 'add'){ r = genAdd(12, 6); return storyTask('add', r[0], r[1], e); }
      if(t === 'sub'){ r = genSub(12, 6); return storyTask('sub', r[0], r[1], e); }
      if(t === 'more'){ r = genMore(14); return storyTask('more', r[0], r[1], e); }
      r = genLess(14); return storyTask('less', r[0], r[1], e);
    }
    /* ⭐⭐⭐: до 20; половина заданий — «какое действие?» */
    function L3(em){
      var e = pick(EMS), t = pick(['add','sub','more','less']), r;
      if(t === 'add') r = genAdd(20, 10); else if(t === 'sub') r = genSub(20, 10); else if(t === 'more') r = genMore(20); else r = genLess(20);
      if(Math.random() < .5 && r[0] + r[1] <= 20) return opTask(t, r[0], r[1], e);
      return storyTask(t, r[0], r[1], e);
    }

    M.run({ root:containerId, key:'problem', need:10, theme:'snow', levels:[L1,L2,L3] });
  });
}
