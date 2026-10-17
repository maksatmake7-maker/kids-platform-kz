/* ===== Білім Аралы — «Верно или неверно: Космодром Барсика» (v3) =====
   Математика, 1 класс (цель 1.2.2.1 приказа №399): верные и неверные равенства и неравенства. Числа до 20. Уровни: a ± b = c → знаки =, ≠, >, < → найди неверное/верное из трёх.
   «Приключения Барсика»: движок games/mathx.js + голос games/mathx-voice.js + заставка games/mathx-hero.js
   подгружаются сами — страницу менять не надо. Режим освоения: 10 заданий подряд без ошибки.
*/
window.__mxHeroCfg = {theme:'space',icons:['🚀','✅','❌']};
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
function initTrueFalseGame(containerId){
  __mxLoad(function(){
    var M = MX, rnd = M.rnd, pick = M.pick, V = MXV, shuffle = M.shuffle, OK = M.OKV;
    function S(sig, t){ t.sig = sig; return t; }
    function eqs(parts){ var big = parts.length > 5; return M.exprHtml(parts.map(function(p){ p = (p === '<' ? '&lt;' : p); return big && typeof p === 'string' && p.charAt(0) !== '<' ? '<span style="font-size:.82em">' + p + '</span>' : p; })); }
    function msgs(){ var l = document.documentElement.getAttribute('data-current') || 'ru'; return (typeof translations !== 'undefined' && translations[l]) ? translations[l] : {}; }

    (function(){
      if(document.getElementById('mxt-css')) return;
      var s = document.createElement('style'); s.id = 'mxt-css';
      s.textContent = ''
      + '.mxt-pad{display:flex;align-items:center;justify-content:center;gap:18px;margin-top:6px;}'
      + '.mxt-rocket{font-size:4.2rem;line-height:1;animation:mxBob 2.6s ease-in-out infinite alternate;filter:drop-shadow(0 8px 10px rgba(0,0,0,.35));}'
      + '.mxt-lights{display:flex;flex-direction:column;gap:10px;padding:10px 9px;border-radius:20px;background:#1B1F4A;box-shadow:0 4px 0 rgba(0,0,0,.35),inset 0 0 0 3px #4A4FA8;}'
      + '.mxt-lights i{display:block;width:34px;height:34px;border-radius:50%;background:#3A3E73;transition:background .25s,box-shadow .25s;}'
      + '.mxt-lights i.g.on{background:#3FE08F;box-shadow:0 0 18px 6px rgba(63,224,143,.75);}'
      + '.mxt-lights i.r.on{background:#FF5B5B;box-shadow:0 0 18px 6px rgba(255,91,91,.75);}'
      + '.mxs-balloon[data-value="t"]{--bc:#2FBF80 !important;}'
      + '.mxs-balloon[data-value="f"]{--bc:#FF5B5B !important;}'
      + '.mxs-balloon.wide .b .tf{display:flex;flex-direction:column;align-items:center;line-height:1.05;}'
      + '.mxs-balloon.wide .b .tf i{font-style:normal;font-size:1.7rem;}.mxs-balloon.wide .b .tf b{font:800 1rem "Baloo 2",sans-serif;}'
      + '.mxs-balloon.wide .b .eqo{font-size:1.05rem;line-height:1.1;padding:0 4px;text-align:center;white-space:nowrap;}'
      + '@media (prefers-reduced-motion:reduce){.mxt-rocket{animation:none}}';
      document.head.appendChild(s);
    })();

    var CMP = function(a, b){ return a > b ? '>' : (a < b ? '<' : '='); };
    function truth(l, op, r){ if(op === '=') return l === r; if(op === '≠') return l !== r; return op === '>' ? l > r : l < r; }
    /* выражение с заданным значением v (не больше max): число либо a + b / a − b */
    function exVal(v, max, allowExpr){
      if(!allowExpr || Math.random() < .35) return { t:[v], v:v };
      if(Math.random() < .5 && v >= 1){ var a = rnd(0, v); return { t:[a, '+', v - a], v:v }; }
      var d = rnd(1, Math.max(1, Math.min(9, max - v))); if(v + d > max) return { t:[v], v:v };
      return { t:[v + d, '−', d], v:v };
    }
    function exRand(max, plain){
      if(plain) return { t:[rnd(0, max)], v:0 };
      if(Math.random() < .55){ var s = rnd(2, max), a = rnd(1, s - 1); return { t:[a, '+', s - a], v:s }; }
      var x = rnd(3, max), b = rnd(1, x - 1); return { t:[x, '−', b], v:x - b };
    }
    function clamp(v, max){ return Math.max(0, Math.min(max, v)); }
    /* одно утверждение: {t:токены, v:значение, ok:верно ли} */
    function statement(max, ops, rightExpr, wantTrue){
      var op = pick(ops), L = exRand(max), lv = L.v, rv;
      if(op === '='){ rv = wantTrue ? lv : clamp(lv + pick([-3,-2,-1,1,2,3]), max); if(!wantTrue && rv === lv) rv = lv + 1 > max ? lv - 1 : lv + 1; }
      else if(op === '≠'){ rv = wantTrue ? clamp(lv + pick([-3,-2,-1,1,2,3]), max) : lv; if(wantTrue && rv === lv) rv = lv + 1 > max ? lv - 1 : lv + 1; }
      else if(op === '>'){ if(wantTrue){ if(lv < 1){ rv = 0; op = '='; wantTrue = false; rv = 0; } else rv = lv - rnd(1, Math.min(3, lv)); } else rv = clamp(lv + rnd(0, 3), max); }
      else { if(wantTrue){ if(lv >= max){ rv = max; } else rv = lv + rnd(1, Math.min(3, max - lv)); } else rv = clamp(lv - rnd(0, Math.min(3, lv)), max); }
      var R = exVal(rv, max, rightExpr);
      var ok = truth(lv, op, R.v);
      return { t:L.t.concat([op], R.t), l:lv, r:R.v, op:op, ok:ok };
    }
    function hintOf(st){
      var sym = CMP(st.l, st.r);
      return function(el, X){
        var sw = M.seesaw(el, st.l, st.r, X);
        el.insertAdjacentHTML('beforeend', '<div class="mxs-expr s">' + eqs([st.l, OK(sym), st.r]) + '</div>');
        X.sleep(500).then(function(ok){ if(ok) sw.reveal(sym); });
      };
    }
    function sayOf(st){ return V.tpl('expr', { tokens:st.t, q:'tfq' }); }

    function tfTask(st){
      var tfOpts = [{ v:'t', h:'<span class="tf"><i>✅</i><b>' + (msgs().btn_true || 'True') + '</b></span>' }, { v:'f', h:'<span class="tf"><i>❌</i><b>' + (msgs().btn_false || 'False') + '</b></span>' }];
      return S('tf' + st.t.join(''), {
        expr:eqs(st.t), small:st.t.length > 5, say:sayOf(st), ans:st.ok ? 't' : 'f', layout:'wide', opts:tfOpts, cap:'',
        field:function(el, X, task){
          el.innerHTML = '<div class="mxt-pad"><div class="mxt-rocket">🚀</div><div class="mxt-lights"><i class="r"></i><i class="g"></i></div></div>';
          task.reveal = function(){ var i = el.querySelector(st.ok ? '.g' : '.r'); if(i) i.classList.add('on'); };
        },
        hintSay:[st.l, CMP(st.l, st.r), st.r], hintExpr:eqs(st.t), hint:hintOf(st)
      });
    }
    /* найди неверное / найди верное из трёх */
    function pickTask(max, findWrong){
      var sts = [], i;
      for(i = 0; i < 3; i++) sts.push(statement(max, ['=','=','>','<'], false, findWrong ? true : false));
      var odd = statement(max, ['=','=','>','<'], false, findWrong ? false : true);
      sts[rnd(0, 2)] = odd; var idx = sts.indexOf(odd);
      // ровно одно «особое»: у остальных truth противоположна
      var good = sts.filter(function(s){ return s.ok === odd.ok; }).length;
      if(good !== 1) return null;
      var opts = sts.map(function(s, k){ return { v:String(k), h:'<span class="eqo">' + s.t.join(' ').replace('<', '&lt;') + '</span>' }; });
      var q = findWrong ? 'findwrong' : 'findright';
      return S('pk' + sts.map(function(s){ return s.t.join(''); }).join('|'), {
        expr:'', say:V.tpl('q', {k:q}), ans:String(idx), layout:'wide', opts:opts,
        field:function(el){ el.innerHTML = '<div class="mxt-pad"><div class="mxt-rocket">🚀</div></div>'; },
        hintSay:[odd.l, CMP(odd.l, odd.r), odd.r], hintExpr:eqs(odd.t), hint:hintOf(odd)
      });
    }

    /* ⭐: a ± b = c, числа до 10 */
    function L1(){ var st = statement(10, ['='], false, Math.random() < .5); return tfTask(st); }
    /* ⭐⭐: до 15, знаки = ≠ > <, справа может быть выражение */
    function L2(){ var st = statement(15, ['=','=','≠','>','<'], true, Math.random() < .5); return tfTask(st); }
    /* ⭐⭐⭐: до 20; найди неверное / верное из трёх */
    function L3(){
      var r = Math.random() < .35 ? tfTask(statement(20, ['=','≠','>','<'], true, Math.random() < .5)) : null;
      if(r) return r;
      var t, n = 0; do { t = pickTask(20, Math.random() < .6); n++; } while(!t && n < 40);
      return t || tfTask(statement(20, ['='], true, Math.random() < .5));
    }

    M.run({ root:containerId, key:'truefalse', need:10, theme:'space', levels:[L1,L2,L3] });
  });
}
