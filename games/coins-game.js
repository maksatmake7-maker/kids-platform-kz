/* ===== Білім Аралы — «Монеты Казахстана: Магазин Барсика» (v3) =====
   Математика, 1 класс (цель 1.1.3.6 приказа №399): монеты 1, 2, 5, 10 и 20 тенге — ровно эти пять. Уровни: узнать монету → заплатить → сложить монеты, «собери сумму» (суммы до 20).
   «Приключения Барсика»: движок games/mathx.js + голос games/mathx-voice.js + заставка games/mathx-hero.js
   подгружаются сами — страницу менять не надо. Режим освоения: 10 заданий подряд без ошибки.
*/
window.__mxHeroCfg = {theme:'market', icons:['🪙','🍬','🐷']};
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
function initCoinsGame(containerId){
  __mxLoad(function(){
    var M = MX, rnd = M.rnd, pick = M.pick, V = MXV, shuffle = M.shuffle;
    function S(sig, t){ t.sig = sig; return t; }
    function eqs(parts){ return M.exprHtml(parts); }
    var OK = M.OKV, VALS = [1,2,5,10,20];
    (function(){
      if(document.getElementById('mxc-css')) return;
      var s = document.createElement('style'); s.id = 'mxc-css';
      s.textContent = ''
      + '.mxc{display:block;filter:none;}'
      + '.mxc-big{animation:mxcFlip .7s cubic-bezier(.3,1.4,.5,1) both;margin:6px 0;}'
      + '@keyframes mxcFlip{0%{transform:translateY(-120px) rotateY(0) scale(.6);opacity:0}60%{transform:translateY(8px) rotateY(540deg) scale(1.05);opacity:1}100%{transform:none}}'
      + '.mxc-table{display:flex;flex-direction:column;align-items:center;gap:6px;padding:14px 22px 12px;border-radius:24px;background:rgba(255,255,255,.55);box-shadow:inset 0 -6px 0 rgba(0,0,0,.08);}'
      + '.mxc-tag{position:relative;display:inline-block;background:#fff;border:4px solid #FF6B5B;border-radius:14px;padding:2px 16px;font:800 2rem "Baloo 2",sans-serif;color:#FF6B5B;box-shadow:0 4px 0 rgba(0,0,0,.14);}'
      + '.mxc-tag:before{content:"";position:absolute;left:-12px;top:50%;width:12px;height:12px;margin-top:-6px;border-radius:50%;background:#FF6B5B;}'
      + '.mxc-item{font-size:4.2rem;line-height:1;text-shadow:0 5px 0 rgba(0,0,0,.16);animation:mxBob 2.4s ease-in-out infinite alternate;}'
      + '.mxc-row{display:flex;align-items:center;justify-content:center;gap:10px;flex-wrap:wrap;}'
      + '.mxc-pig{font-size:3.6rem;line-height:1;position:relative;}'
      + '.mxc-pig.bump{animation:mxBump .3s ease;}'
      + '.mxc-tot{position:absolute;right:-26px;top:-12px;min-width:42px;height:42px;border-radius:50%;background:#FF6B5B;color:#fff;font:800 1.4rem "Baloo 2",sans-serif;display:flex;align-items:center;justify-content:center;box-shadow:0 3px 0 rgba(0,0,0,.2);}'
      + '.mxc-tray{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;padding:8px 10px;border-radius:18px;background:rgba(255,255,255,.55);max-width:330px;}'
      + '.mxc-pick{border:none;background:none;padding:0;cursor:pointer;transition:transform .12s;-webkit-tap-highlight-color:transparent;}'
      + '.mxc-pick:active{transform:scale(.85);}'
      + '.mxc-purse{position:relative;min-width:240px;min-height:74px;border-radius:16px 16px 40px 40px;background:linear-gradient(#C98B4B,#A8692F);padding:10px 14px 14px;display:flex;flex-wrap:wrap;gap:4px;justify-content:center;align-items:center;box-shadow:inset 0 -6px 0 rgba(0,0,0,.18);}'
      + '.mxc-purse .mxc{cursor:pointer;animation:mxIn .3s;}'
      + '.mxc-purse .mxc-sum{position:absolute;right:-12px;top:-16px;min-width:56px;height:46px;padding:0 8px;border-radius:23px;background:#FF6B5B;color:#fff;font:800 1.4rem "Baloo 2",sans-serif;display:flex;align-items:center;justify-content:center;box-shadow:0 3px 0 rgba(0,0,0,.2);}'
      + '.mxs-balloon .b svg.mxc{width:56px;height:56px;}'
      + '@media (prefers-reduced-motion:reduce){.mxc-big,.mxc-item{animation:none}}';
      document.head.appendChild(s);
    })();
    var STY = { 1:['#D9B23A','#5A4A1A'], 2:['#D9B23A','#5A4A1A'], 5:['#D9B23A','#5A4A1A'], 10:['#D9B23A','#5A4A1A'], 20:['#C9CED6','#454B57'] };
    function coin(v, size, cls){
      var c = STY[v];
      return '<svg viewBox="0 0 120 120" class="mxc ' + (cls || '') + '" style="width:' + size + 'px;height:' + size + 'px" data-v="' + v + '">' +
        '<circle cx="60" cy="60" r="55" fill="' + c[0] + '" stroke="rgba(0,0,0,.28)" stroke-width="3"/>' +
        '<circle cx="60" cy="60" r="45" fill="none" stroke="rgba(255,255,255,.55)" stroke-width="3"/>' +
        '<text x="60" y="74" font-family="Baloo 2,Arial,sans-serif" font-weight="800" font-size="' + (v >= 10 ? 46 : 54) + '" fill="' + c[1] + '" text-anchor="middle">' + v + '</text></svg>';
    }
    function tg(n){ return n + ' ₸'; }
    function valOpts(ans, wide){
      var set = [ans], pool = shuffle(VALS.filter(function(v){ return v !== ans; }));
      while(set.length < 4) set.push(pool.pop());
      return shuffle(set).map(function(v){ return { v:String(v), h:wide ? tg(v) : coin(v, 56) }; });
    }
    function sumOpts(s){
      var set = [s];
      [s+1, s-1, s+2, s-2, s+5, s-5, s+10, s-10].forEach(function(c){ if(set.length < 4 && c >= 1 && c <= 20 && set.indexOf(c) < 0) set.push(c); });
      for(var t = 1; set.length < 4 && t <= 20; t++) if(set.indexOf(t) < 0) set.push(t);
      return shuffle(set).map(function(v){ return { v:String(v), h:tg(v) }; });
    }
    function capPay(n){ var L = V.lang(), p = V.F[L].pay; return L === 'kz' ? tg(n) + ' ' + p : p + ' ' + tg(n); }
    function capCollect(n){ var L = V.lang(), p = V.F[L].collect; return L === 'kz' ? tg(n) + ' ' + p : p + ' ' + tg(n); }
    function greedy(n){ var out = []; [20,10,5,2,1].forEach(function(v){ while(n >= v){ out.push(v); n -= v; } }); return out; }
    function pairSum(k, max){   // k монет, сумма ≤ max, не одна и та же монета-единица
      var a; do { a = []; for(var i=0;i<k;i++) a.push(pick(VALS.filter(function(v){ return v < 20; }))); } while(a.reduce(function(x,y){ return x+y; }, 0) > max);
      return a;
    }
    // монеты падают в копилку по очереди и считаются вслух
    function dropToPig(el, X, vals){
      var coins = [].slice.call(el.querySelectorAll('.mxc-row .mxc')), pig = el.querySelector('.mxc-pig'), tot = el.querySelector('.mxc-tot'), run = 0, i = 0;
      return (function step(){
        if(i >= coins.length) return Promise.resolve();
        var c = coins[i], v = vals[i]; i++;
        if(c.animate) c.animate([{transform:'translateY(0) scale(1)',opacity:1},{transform:'translateY(70px) scale(.35)',opacity:0}],{duration:520,easing:'ease-in',fill:'forwards'});
        return X.sleep(480).then(function(ok){
          if(!ok) return;
          run += v; tot.textContent = run; pig.classList.remove('bump'); void pig.offsetWidth; pig.classList.add('bump');
          X.sfx.drop(); X.say([run]);
          return X.sleep(620).then(function(ok2){ return ok2 ? step() : null; });
        });
      })();
    }
    function hintCoins(vals, n){ return function(el){ el.innerHTML = '<div class="mxc-row">' + vals.map(function(v){ return coin(v, 64); }).join('') + '</div><div class="mxs-expr s">' + eqs([OK(tg(n))]) + '</div>'; }; }

    /* ===== Уровень 1 (⭐): какая монета ===== */
    function L1(){
      var v = pick(VALS);
      return S('i'+v, {
        expr:'', say:V.tpl('q',{k:'tengeq'}), ans:String(v), opts:valOpts(v, true), layout:'wide',
        field:function(el){ el.innerHTML = '<div class="mxc-table">' + coin(v, 150, 'mxc-big') + '</div>'; },
        hintSay:[v,'f:tenge'], hintExpr:eqs([OK(tg(v))]), hint:hintCoins([v], v)
      });
    }

    /* ===== Уровень 2 (⭐⭐): заплати одной монетой, две монеты ===== */
    function L2(){
      var t = pick(['pay','pay','two']), n, a;
      if(t === 'pay'){
        n = pick(VALS); var it = pick(['🍬','🍪','🍎','🎈','🧸','🚗','🍦','🍩']);
        return S('p'+n+it, {
          expr:'', cap:capPay(n), say:V.tpl('payx',{n:n}), ans:String(n), opts:valOpts(n, false),
          field:function(el){ el.innerHTML = '<div class="mxc-table"><div class="mxc-item">' + it + '</div><div class="mxc-tag">' + tg(n) + '</div></div>'; },
          hintSay:[n,'f:tenge'], hintExpr:eqs([OK(tg(n))]), hint:hintCoins([n], n)
        });
      }
      a = pairSum(2, 20); n = a[0] + a[1];
      return S('s'+a.join('+'), {
        expr:'', say:V.tpl('q',{k:'tengeq'}), ans:String(n), opts:sumOpts(n), layout:'wide',
        field:function(el, X, task){
          el.innerHTML = '<div class="mxc-table"><div class="mxc-row">' + a.map(function(v){ return coin(v, 84); }).join('') + '</div><div class="mxc-pig">🐷<span class="mxc-tot">0</span></div></div>';
          task.afterSay = function(){ dropToPig(el, X, a); };
        },
        hintSay:a.concat([]).reduce(function(r, v, i){ if(i) r.push('+'); r.push(v); return r; }, []).concat(['=', n]),
        hintExpr:eqs([a[0],'+',a[1],'=',OK(n)]), hint:function(el){ el.innerHTML = '<div class="mxc-row">' + a.map(function(v){ return coin(v, 64); }).join('') + '</div><div class="mxs-expr s">' + eqs([a[0],'+',a[1],'=',OK(n)]) + '</div>'; }
      });
    }

    /* ===== Уровень 3 (⭐⭐⭐): три монеты, «собери сумму» ===== */
    function L3(){
      var t = pick(['sum3','sum3','collect','collect','pay']), a, n;
      if(t === 'pay') return L2();
      if(t === 'sum3'){
        a = pairSum(3, 20); n = a[0] + a[1] + a[2];
        return S('q'+a.join('+'), {
          expr:'', say:V.tpl('q',{k:'tengeq'}), ans:String(n), opts:sumOpts(n), layout:'wide',
          field:function(el, X, task){
            el.innerHTML = '<div class="mxc-table"><div class="mxc-row">' + a.map(function(v){ return coin(v, 70); }).join('') + '</div><div class="mxc-pig">🐷<span class="mxc-tot">0</span></div></div>';
            task.afterSay = function(){ dropToPig(el, X, a); };
          },
          hintSay:[n,'f:tenge'], hintExpr:eqs([a[0],'+',a[1],'+',a[2],'=',OK(n)]),
          hint:function(el){ el.innerHTML = '<div class="mxc-row">' + a.map(function(v){ return coin(v, 56); }).join('') + '</div><div class="mxs-expr s">' + eqs([a[0],'+',a[1],'+',a[2],'=',OK(n)]) + '</div>'; }
        });
      }
      n = rnd(6, 20); while(VALS.indexOf(n) >= 0) n = rnd(6, 20);
      var sol = greedy(n);
      return S('c'+n, {
        expr:'', cap:capCollect(n), say:V.tpl('collect',{n:n}), ans:String(n), gate:false,
        field:function(el, X, task){
          var total = 0;
          var tray = document.createElement('div'); tray.className = 'mxc-tray';
          VALS.filter(function(v){ return v <= n; }).forEach(function(v){
            var b = document.createElement('button'); b.type = 'button'; b.className = 'mxc-pick'; b.setAttribute('data-v', v); b.innerHTML = coin(v, 54); tray.appendChild(b);
            b.addEventListener('click', function(){
              if(task._done || total + v > 40) return;
              total += v; var c = document.createElement('span'); c.innerHTML = coin(v, 40); c = c.firstChild; purse.insertBefore(c, sum);
              sum.textContent = total; X.sfx.tap(Math.min(total, 20)); X.say([total]);
              c.addEventListener('click', function(){ if(task._done) return; total -= v; c.remove(); sum.textContent = total; });
            });
          });
          var purse = document.createElement('div'); purse.className = 'mxc-purse';
          var sum = document.createElement('span'); sum.className = 'mxc-sum'; sum.textContent = '0'; purse.appendChild(sum);
          var go = document.createElement('button'); go.type = 'button'; go.className = 'mxs-go'; go.textContent = '✔';
          el.appendChild(tray); el.appendChild(purse); el.appendChild(go);
          go.addEventListener('click', function(){ if(task._done) return; task._done = true; task.submit(String(total), go); });
          task.auto = function(wrong){
            sol.concat(wrong ? [1] : []).forEach(function(v){ var b = el.querySelector('.mxc-pick[data-v="' + v + '"]'); if(b) b.click(); });
            go.click();
          };
        },
        hintSay:[n,'f:tenge'], hintExpr:eqs([OK(tg(n))]), hint:hintCoins(sol, n)
      });
    }

    M.run({ root:containerId, key:'coins', need:10, theme:'market', levels:[L1,L2,L3] });
  });
}
