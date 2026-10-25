/* ===== Білім Аралы — «Закономерность: Прыжки лягушки» (v3) =====
   Математика, 1 класс (цель 1.4.3.1 приказа №399): последовательность чисел в пределах 100, закономерность (шаг 1, 2, 3, 5, 10, вперёд и назад). Уровни: следующее число → пропуск в ряду → «на сколько прыгает».
   «Приключения Барсика»: движок games/mathx.js + голос games/mathx-voice.js + заставка games/mathx-hero.js
   подгружаются сами — страницу менять не надо. Режим освоения: 10 заданий подряд без ошибки.
*/
window.__mxHeroCfg = {theme:'pond', icons:['🐸','👀','🔢']};
(function(){
  var cs = document.currentScript;
  var base = cs && cs.src ? cs.src.replace(/[^\/]*$/, '') : '../../../games/';
  window.__mxBase = window.__mxBase || base;
  function load(src, cb){ var s = document.createElement('script'); s.src = src; s.onload = cb; s.onerror = cb; document.head.appendChild(s); }
  if(!window.__mxLoad){
    var waiting = [], done = false, chain = [];
    if(!window.Barsik) chain.push(base + '../assets/barsik.js');
    chain.push(base + 'mathx-voice.js'); chain.push(base + 'mathx.js'); chain.push(base + 'mathx-hero.js');
    chain.slice().forEach(function(u){ try { var l = document.createElement('link'); l.rel = 'preload'; l.as = 'script'; l.href = u; document.head.appendChild(l); } catch(e){} });
    (function next(){
      if(!chain.length){ done = true; try { if(window.MXHero) (document.readyState === 'loading' ? document.addEventListener.bind(document, 'DOMContentLoaded') : function(f){ f(); })(MXHero.init); } catch(e){} waiting.forEach(function(f){ f(); }); waiting = []; return; }
      load(chain.shift(), next);
    })();
    window.__mxLoad = function(cb){ if(done) cb(); else waiting.push(cb); };
  }
})();
function initPatternGame(containerId){
  __mxLoad(function(){
    var M = MX, rnd = M.rnd, pick = M.pick, V = MXV, shuffle = M.shuffle;
    function S(sig, t){ t.sig = sig; return t; }
    function eqs(parts){ return M.exprHtml(parts); }
    var OK = M.OKV, QB = M.QB();
    (function(){
      if(document.getElementById('mxp-css')) return;
      var s = document.createElement('style'); s.id = 'mxp-css';
      s.textContent = ''
      + '.mxp-pond{position:relative;display:flex;gap:7px;justify-content:center;align-items:flex-end;padding-top:62px;width:min(100%,330px);}'
      + '.mxp-pad{position:relative;flex:1;max-width:58px;height:44px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#8BE08F 0 30%,#3FB45A 31%);box-shadow:inset 0 -5px 0 rgba(0,0,0,.18),0 4px 0 rgba(0,0,0,.12);display:flex;align-items:center;justify-content:center;font:800 1.15rem "Baloo 2",sans-serif;color:#0E5A2B;transition:transform .2s;}'
      + '.mxp-pad:before{content:"";position:absolute;right:-3px;top:50%;width:14px;height:10px;background:#58C6B5;clip-path:polygon(0 0,100% 50%,0 100%);}'
      + '.mxp-pad.lit{transform:translateY(-4px) scale(1.1);background:radial-gradient(circle at 35% 30%,#FFE27A 0 30%,#FFC93C 31%);}'
      + '.mxp-pad.q{background:radial-gradient(circle at 35% 30%,#FF9B8E 0 30%,#FF6B5B 31%);color:#fff;font-size:1.4rem;animation:mxBump .9s ease-in-out infinite alternate;}'
      + '.mxp-pad.ok{background:radial-gradient(circle at 35% 30%,#7FE0A8 0 30%,#2FBF80 31%);color:#fff;}'
      + '.mxp-frog{position:absolute;top:0;left:0;font-size:2.4rem;line-height:1;transition:left .32s ease-out,top .16s ease-out;pointer-events:none;}'
      + '.mxp-step{position:absolute;top:2px;transform:translateX(-50%);background:#fff;color:#FF6B5B;border-radius:12px;padding:0 8px;font:800 1rem "Baloo 2",sans-serif;box-shadow:0 3px 0 rgba(0,0,0,.14);opacity:0;transition:opacity .25s;}'
      + '.mxp-step.on{opacity:1;}'
      + '@media (max-width:480px){.mxp-pad{height:38px;font-size:1rem}}';
      document.head.appendChild(s);
    })();
    function sgn(d){ return (d > 0 ? '+' : '−') + Math.abs(d); }
    // arr: числа дорожки, qi: какая кувшинка спрятана (-1 — никакая)
    function pondField(arr, qi, d){
      return function(el, X, task){
        var pond = document.createElement('div'); pond.className = 'mxp-pond'; el.appendChild(pond);
        var pads = arr.map(function(v, i){ var p = document.createElement('div'); p.className = 'mxp-pad' + (i === qi ? ' q' : ''); p.textContent = i === qi ? '?' : v; pond.appendChild(p); return p; });
        var frog = document.createElement('span'); frog.className = 'mxp-frog'; frog.textContent = '🐸'; pond.appendChild(frog);
        var tag = document.createElement('span'); tag.className = 'mxp-step'; tag.textContent = sgn(d); pond.appendChild(tag);
        function at(i){ var r = pads[i].getBoundingClientRect(), pr = pond.getBoundingClientRect(); return { x:r.left - pr.left + r.width/2, top:r.top - pr.top }; }
        function sit(i){ var a = at(i); frog.style.left = (a.x - 18) + 'px'; frog.style.top = (a.top - 34) + 'px'; }
        sit(0); pads[0].classList.add('lit');
        task.afterSay = function(){
          var i = 0;
          (function hop(){
            if(i >= arr.length - 1) return;
            i++;
            var a = at(i); frog.style.top = (a.top - 62) + 'px'; sit(i);
            setTimeout(function(){ frog.style.top = (at(i).top - 34) + 'px'; }, 170);
            pads[i].classList.add('lit'); X.sfx.hop();
            var prev = at(i-1); tag.style.left = ((prev.x + a.x)/2) + 'px'; tag.classList.add('on');
            if(i !== qi) X.say([arr[i]]);
            X.sleep(560).then(function(ok){ if(ok) hop(); });
          })();
        };
      };
    }
    function opts(ans, lo, hi, d){
      var set = [ans], st = Math.abs(d), cand = [ans + st, ans - st, ans + 1, ans - 1, ans + 2*st, ans - 2*st, ans + 10, ans - 10];
      cand.forEach(function(c){ if(set.length < 4 && c >= lo && c <= hi && set.indexOf(c) < 0) set.push(c); });
      for(var t = lo; set.length < 4 && t <= hi; t++) if(set.indexOf(t) < 0) set.push(t);
      return shuffle(set).map(function(v){ return { v:String(v), h:String(v) }; });
    }
    function solvedExpr(arr, qi, d){
      var h = [];
      arr.forEach(function(v, i){ h.push(i === qi ? OK(v) : v); if(i < arr.length - 1) h.push('<span style="color:#8B95A3">,</span>'); });
      return h;
    }
    // d — шаг (может быть отрицательным), qi — какая из 5 кувшинок спрятана
    function seqTask(sig, a, d, qi, lo, hi){
      var arr = []; for(var i=0;i<5;i++) arr.push(a + d*i);
      var ans = arr[qi], tokens = arr.map(function(v, i){ return i === qi ? '?' : v; }), sh = [];
      arr.forEach(function(v, i){ sh.push('<span style="white-space:nowrap">' + (i === qi ? QB : v) + (i < arr.length - 1 ? '<i style="color:#8B95A3;font-style:normal">,</i>' : '') + '</span>'); });
      return S(sig, {
        expr:eqs(sh), small:true, say:V.tpl('expr',{tokens:(qi === 4 ? arr.slice(0,4) : tokens), q:(qi === 4 ? 'next' : 'missing')}), ans:String(ans), opts:opts(ans, lo, hi, d),
        field:pondField(arr, qi, d),
        hintSay:arr, hintExpr:eqs(solvedExpr(arr, qi, d)), hint:function(el){ el.innerHTML = '<div class="mxs-expr s">' + eqs(solvedExpr(arr, qi, d)) + '</div><div class="mxs-expr s">' + eqs(['<span style="color:#FF6B5B">' + sgn(d) + '</span>']) + '</div>'; }
      });
    }
    function ruleTask(sig, a, d){
      var arr = []; for(var i=0;i<5;i++) arr.push(a + d*i);
      var st = Math.abs(d), sg = d > 0 ? '+' : '−';
      var set = [st]; [1,2,3,5,10,4].forEach(function(c){ if(set.length < 4 && set.indexOf(c) < 0) set.push(c); });
      var o = shuffle(set).map(function(v){ return { v:sg + v, h:sg + v }; });
      var sh = []; arr.forEach(function(v, i){ sh.push('<span style="white-space:nowrap">' + v + (i < arr.length - 1 ? '<i style="color:#8B95A3;font-style:normal">,</i>' : '') + '</span>'); });
      return S(sig, {
        expr:eqs(sh), small:true, say:V.tpl('q',{k:'frogjump'}), ans:sg + st, opts:o, layout:'wide',
        field:pondField(arr, -1, d),
        hintSay:arr, hintExpr:eqs(sh), hint:function(el){ el.innerHTML = '<div class="mxs-expr s">' + eqs(solvedExpr(arr, -1, d)) + '</div><div class="mxs-expr s">' + eqs([OK(sg + st)]) + '</div>'; }
      });
    }
    function span(d){ return Math.abs(d) * 4; }

    /* ⭐: шаг +1, +2, до 20 */
    function L1(){ var d = pick([1,1,2]), a = rnd(0, 20 - 4*d - (d === 1 ? 4 : 0)); a = Math.max(a, 1); return seqTask('f'+a+'_'+d, a, d, 4, 0, 30); }
    /* ⭐⭐: шаги 1–3 вперёд и назад, спрятана любая кувшинка */
    function L2(){
      var d = pick([1,2,3,-1,-2,-3]), a, qi = pick([4,4,3,2,1]);
      a = d > 0 ? rnd(1, 30) : rnd(4*Math.abs(d) + 1, 40);
      return seqTask('g'+a+'_'+d+qi, a, d, qi, 0, 60);
    }
    /* ⭐⭐⭐: шаги 5 и 10 до 100, «на сколько прыгает» */
    function L3(){
      var t = pick(['five','ten','rule','rule','back']), a, d;
      if(t === 'five'){ a = rnd(0, 12) * 5; return seqTask('h'+a, a, 5, pick([4,3,2,1]), 0, 100); }
      if(t === 'ten'){ a = rnd(0, 6) * 10; return seqTask('i'+a, a, 10, pick([4,3,2,1]), 0, 100); }
      if(t === 'back'){ d = pick([-2,-3,-5,-10]); a = rnd(Math.abs(d)*4 + 1, 100); return seqTask('j'+a+'_'+d, a, d, pick([4,3,2,1]), 0, 100); }
      d = pick([1,2,3,5,10,-1,-2,-5,-10]); a = d > 0 ? rnd(0, 40) : rnd(Math.abs(d)*4 + 1, 60);
      return ruleTask('k'+a+'_'+d, a, d);
    }

    M.run({ root:containerId, key:'pattern', need:10, theme:'pond', levels:[L1,L2,L3] });
  });
}
