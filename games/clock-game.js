/* ===== Білім Аралы — «Который час? Часы Барсика» (v3) =====
   Математика, 1 класс (цель 1.1.3.5 приказа №399): время по циферблату, 12-часовой формат, только целые часы. Уровни: прочитай часы → поставь стрелку → найди такие часы.
   «Приключения Барсика»: движок games/mathx.js + голос games/mathx-voice.js + заставка games/mathx-hero.js
   подгружаются сами — страницу менять не надо. Режим освоения: 10 заданий подряд без ошибки.
*/
window.__mxHeroCfg = {theme:'sunset', icons:['🕐','👆','✅']};
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
function initClockGame(containerId){
  __mxLoad(function(){
    var M = MX, rnd = M.rnd, pick = M.pick, V = MXV, shuffle = M.shuffle;
    function S(sig, t){ t.sig = sig; return t; }
    function eqs(parts){ return M.exprHtml(parts); }
    var OK = M.OKV;
    (function(){
      if(document.getElementById('mxk-css')) return;
      var s = document.createElement('style'); s.id = 'mxk-css';
      s.textContent = ''
      + '.mxk{display:block;}'
      + '.mxk-wrap{position:relative;width:230px;height:230px;animation:mxIn .5s;}'
      + '.mxk-wrap svg{position:absolute;left:0;top:0;width:230px;height:230px;}'
      + '.mxk .hh{transition:transform .55s cubic-bezier(.3,1.4,.5,1);transform-origin:100px 100px;}'
      + '.mxk-num{position:absolute;width:44px;height:44px;margin:-22px 0 0 -22px;border:none;border-radius:50%;background:rgba(255,255,255,0);cursor:pointer;-webkit-tap-highlight-color:transparent;transition:background .15s,transform .15s;}'
      + '.mxk-num:hover{background:rgba(255,200,60,.45);transform:scale(1.1);}'
      + '.mxk-num.on{background:rgba(255,107,91,.55);}'
      + '.mxk-time{display:inline-block;background:#fff;border-radius:20px;padding:2px 22px;font:800 2.4rem "Baloo 2",sans-serif;color:#25324A;box-shadow:0 5px 0 rgba(0,0,0,.16);}'
      + '.mxs-balloon .b svg.mxk{width:62px;height:62px;}'
      + '@media (prefers-reduced-motion:reduce){.mxk-wrap{animation:none}}';
      document.head.appendChild(s);
    })();
    function word(){ return {ru:'ч', kz:'сағ', en:"o'clock"}[V.lang()]; }
    function timeHtml(h){ return '<span class="mxk-time">' + h + ' ' + word() + '</span>'; }
    function face(h, size, mini, interactive){
      var s = '<svg viewBox="0 0 200 200" class="mxk" style="width:' + size + 'px;height:' + size + 'px">' +
        '<circle cx="100" cy="100" r="94" fill="#fff" stroke="#25324A" stroke-width="7"/><circle cx="100" cy="100" r="86" fill="none" stroke="#FFC93C" stroke-width="3"/>';
      for(var k = 1; k <= 12; k++){
        var a = (k * 30 - 90) * Math.PI / 180;
        if(mini){ s += '<line x1="' + (100 + 74*Math.cos(a)) + '" y1="' + (100 + 74*Math.sin(a)) + '" x2="' + (100 + 86*Math.cos(a)) + '" y2="' + (100 + 86*Math.sin(a)) + '" stroke="#25324A" stroke-width="' + (k % 3 === 0 ? 8 : 4) + '"/>'; }
        else { s += '<text x="' + (100 + 68*Math.cos(a)) + '" y="' + (100 + 68*Math.sin(a)) + '" font-family="Baloo 2,Arial,sans-serif" font-weight="800" font-size="24" fill="#25324A" text-anchor="middle" dominant-baseline="central">' + k + '</text>'; }
      }
      s += '<line x1="100" y1="100" x2="100" y2="22" stroke="#FF6B5B" stroke-width="6" stroke-linecap="round"/>' +
        '<g class="hh" style="transform:rotate(' + ((h % 12) * 30) + 'deg)"><line x1="100" y1="100" x2="100" y2="50" stroke="#25324A" stroke-width="11" stroke-linecap="round"/></g>' +
        '<circle cx="100" cy="100" r="9" fill="#25324A"/></svg>';
      return s;
    }
    function hourOpts(h, near){
      var set = [h], cand = near ? [h+1, h-1, h+2, h-2] : [];
      cand.forEach(function(c){ c = ((c - 1 + 12) % 12) + 1; if(set.length < 4 && set.indexOf(c) < 0) set.push(c); });
      var pool = shuffle([1,2,3,4,5,6,7,8,9,10,11,12].filter(function(x){ return set.indexOf(x) < 0; }));
      while(set.length < 4) set.push(pool.pop());
      return set;
    }
    function hint(h){ return function(el){ el.innerHTML = face(h, 150, false) + '<div class="mxs-expr s">' + eqs([OK(h)]) + '</div>'; }; }

    function readTask(sig, h, near){
      return S(sig, {
        expr:'', say:V.tpl('q',{k:'clockq'}), ans:String(h),
        opts:shuffle(hourOpts(h, near)).map(function(v){ return { v:String(v), h:String(v) }; }),
        field:function(el){ el.innerHTML = '<div class="mxk-wrap">' + face(h, 230, false) + '</div>'; },
        hintSay:[h], hintExpr:eqs([OK(h)]), hint:hint(h)
      });
    }
    function setTask(sig, h){
      return S(sig, {
        expr:timeHtml(h), say:V.tpl('setclock',{n:h}), ans:String(h),
        field:function(el, X, task){
          var w = document.createElement('div'); w.className = 'mxk-wrap'; w.innerHTML = face(0, 230, false); el.appendChild(w);
          var hand = w.querySelector('.hh');
          for(var k = 1; k <= 12; k++){
            (function(k){
              var a = (k * 30 - 90) * Math.PI / 180, b = document.createElement('button'); b.type = 'button'; b.className = 'mxk-num'; b.setAttribute('data-h', k);
              b.style.left = (115 + 78.2*Math.cos(a)) + 'px'; b.style.top = (115 + 78.2*Math.sin(a)) + 'px';
              b.addEventListener('click', function(){
                if(task._done) return; task._done = true;
                hand.style.transform = 'rotate(' + (k * 30) + 'deg)'; b.classList.add('on'); X.sfx.tap(k);
                setTimeout(function(){ task.submit(String(k), b); }, 480);
              });
              w.appendChild(b);
            })(k);
          }
          task.auto = function(wrong){ var k = wrong ? (h % 12) + 1 : h; var b = w.querySelector('.mxk-num[data-h="' + k + '"]'); if(b) b.click(); };
        },
        hintSay:[h], hintExpr:timeHtml(h), hint:hint(h)
      });
    }
    function matchTask(sig, h){
      return S(sig, {
        expr:timeHtml(h), say:V.tpl('matchclock',{n:h}), ans:String(h),
        opts:shuffle(hourOpts(h, Math.random() < .5)).map(function(v){ return { v:String(v), h:face(v, 62, true) }; }),
        hintSay:[h], hintExpr:timeHtml(h), hint:hint(h)
      });
    }

    function L1(){ var h = rnd(1,12); return readTask('r'+h, h, false); }
    function L2(){ var h = rnd(1,12), t = pick(['set','set','read','match']); return t === 'set' ? setTask('s'+h, h) : (t === 'read' ? readTask('R'+h, h, true) : matchTask('m'+h, h)); }
    function L3(){ var h = rnd(1,12), t = pick(['match','match','read','set']); return t === 'set' ? setTask('S'+h, h) : (t === 'read' ? readTask('Q'+h, h, true) : matchTask('M'+h, h)); }

    M.run({ root:containerId, key:'clock', need:10, theme:'sunset', levels:[L1,L2,L3] });
  });
}
