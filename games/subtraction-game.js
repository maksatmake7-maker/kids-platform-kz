/* ===== Білім Аралы — «Отними и узнай: Шарики Барсика» (v3) =====
   Математика, 1 класс: вычитание (цели 1.1.2.1, 1.1.2.2, 1.1.2.5, 1.5.2.2, 1.5.2.3 приказа №399).
   «Приключения Барсика»: движок games/mathx.js + голос games/mathx-voice.js + заставка games/mathx-hero.js
   подгружаются сами — страницу менять не надо. Режим освоения: 10 заданий подряд без ошибки.
*/
window.__mxHeroCfg = {theme:'sky', icons:['🎈','👆','💥']};
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

function initSubtractionGame(containerId){
  __mxLoad(function(){
    var M = MX, rnd = M.rnd, pick = M.pick, V = MXV;
    function S(sig, t){ t.sig = sig; return t; }
    function eqs(parts){ return M.exprHtml(parts); }
    function solved(tokens, parts, vis){
      return { hintExpr: eqs(parts), hintSay: tokens, hint: function(el){ el.innerHTML = '<div class="mxs-expr s">' + eqs(parts) + '</div>' + (vis || ''); } };
    }
    function crossVis(a, b, em){ var h = '<div class="mxs-grp">'; for(var i=0;i<a;i++) h += '<span class="mxs-o" style="' + (i >= a-b ? 'opacity:.3;filter:grayscale(1)' : '') + '">' + em + '</span>'; return h + '</div>'; }
    var Q = M.Q(), QB = M.QB(), OK = M.OKV;

    /* ===== Уровень 1 (⭐): шарики — лопни или улетают ===== */
    function L1(em){
      var a = rnd(3,10), b = rnd(1,a-1), r = a-b;
      var h = solved([a,'−',b,'=',r], [a,'−',b,'=',OK(r)], crossVis(a,b,'🎈'));
      if(Math.random() < .6){
        return S('1p'+a+b, Object.assign(M.popBalloons({ a:a, b:b, expr:eqs([a,'−',b,'=',Q]), say:V.tpl('pop',{n:b}), opts:M.numOpts(r,1,10) }), h));
      }
      return S('1f'+a+b, Object.assign({
        expr:eqs([a,'−',b,'=',Q]), say:V.tpl('q',{k:'fly'}), ans:String(r), opts:M.numOpts(r,1,10),
        field:function(el, X, task){
          var sc = document.createElement('div'); sc.className = 'mxs-scatter'; sc.style.height = '150px'; el.appendChild(sc);
          var W = Math.min(el.clientWidth || 320, 320), cols = a > 10 ? 7 : 5, rows = Math.ceil(a/cols), cw = (W-30)/cols, ch = 150/rows, colors = M.shuffle(M.BALLOON_COLORS), bl = [];
          for(var i=0;i<a;i++){
            var b0 = document.createElement('span'); b0.className = 'mxs-pb'; b0.style.left = ((i%cols)*cw + 6) + 'px'; b0.style.top = (Math.floor(i/cols)*ch) + 'px'; b0.style.setProperty('--bc', colors[i%colors.length]); b0.style.animationDelay = (-(Math.random()*3)).toFixed(2) + 's'; sc.appendChild(b0); bl.push(b0);
          }
          task.afterSay = function(){
            var fl = M.shuffle(bl).slice(0, b), i = 0;
            (function go(){ if(i >= fl.length){ X.sleep(900).then(function(ok){ if(ok) X.say(['f:left']); }); return; } fl[i].classList.add('fly'); X.sfx.pop(); i++; X.sleep(420).then(function(ok){ if(ok) go(); }); })();
          };
        }
      }, h));
    }

    /* ===== Уровень 2 (⭐⭐): прыжки назад, пропуски, обратное действие, качели, ноль ===== */
    function L2(em){
      var t = pick(['hop','hop','missSub','missMin','inv','seesaw','zero']), a, b, c, d, r, s, sy;
      if(t === 'hop'){
        a = rnd(3,10); b = rnd(1,a-1); r = a-b;
        return S('2h'+a+b, Object.assign({
          expr:eqs([a,'−',b,'=',Q]), say:V.tpl('expr',{tokens:[a,'−',b,'=','?'], q:'howmuch'}), ans:String(r), opts:M.numOpts(r,1,10),
          field:function(el, X, task){ var h = M.hops(el, X, a, r, 10); task.afterSay = function(){ h.run(); }; }
        }, solved([a,'−',b,'=',r], [a,'−',b,'=',OK(r)], crossVis(a,b,em))));
      }
      if(t === 'zero'){
        a = rnd(1,10); var z = Math.random() < .5; r = z ? a : 0;
        var tk = z ? [a,'−',0,'=','?'] : [a,'−',a,'=','?'];
        return S('2z'+a+z, Object.assign({
          expr:eqs(z ? [a,'−',0,'=',Q] : [a,'−',a,'=',Q]), say:V.tpl('expr',{tokens:tk, q:'missing'}), ans:String(r), opts:M.numOpts(r,0,10,[a,0]),
          field:function(el){ el.innerHTML = M.grp(a, em); }
        }, solved(z ? [a,'−',0,'=',a] : [a,'−',a,'=',0], z ? [a,'−',0,'=',OK(a)] : [a,'−',a,'=',OK(0)], z ? M.grp(a, em) : crossVis(a,a,em))));
      }
      if(t === 'missSub'){
        a = rnd(3,10); r = rnd(1,a-1); b = a-r;
        return S('2s'+a+r, Object.assign({
          expr:eqs([a,'−',QB,'=',r]), say:V.tpl('expr',{tokens:[a,'−','?','=',r], q:'missing'}), ans:String(b), opts:M.numOpts(b,1,10,[r,a]),
          field:function(el){ el.innerHTML = M.grp(a, em); }
        }, solved([a,'−',b,'=',r], [a,'−',OK(b),'=',r], crossVis(a,b,em))));
      }
      if(t === 'missMin'){
        b = rnd(1,8); r = rnd(1,10-b); a = b+r;
        return S('2m'+a+b, Object.assign({
          expr:eqs([QB,'−',b,'=',r]), say:V.tpl('expr',{tokens:['?','−',b,'=',r], q:'missing'}), ans:String(a), opts:M.numOpts(a,2,10,[r,b]),
          field:function(el){ el.innerHTML = M.grp(r, em); }
        }, solved([a,'−',b,'=',r], [OK(a),'−',b,'=',r], crossVis(a,b,em))));
      }
      if(t === 'inv'){
        a = rnd(1,8); b = rnd(1,9-a); s = a+b;
        return S('2i'+a+b, Object.assign({
          expr:eqs([a,'+',b,'=',s,'<br>',s,'−',b,'=',QB]), say:V.tpl('expr',{tokens:[a,'+',b,'=',s,'.',s,'−',b,'=','?'], q:'missing'}), ans:String(a), opts:M.numOpts(a,1,9,[b,s]),
          field:function(el){ el.innerHTML = M.grp(s, em); }
        }, solved([s,'−',b,'=',a], [s,'−',b,'=',OK(a)], crossVis(s,b,em))));
      }
      a = rnd(3,10); b = rnd(1,a-1); c = rnd(3,10); d = rnd(1,c-1);
      if(Math.random() < .3){ c = rnd(3,10); d = c-(a-b); if(d < 1){ c = a; d = b; } }
      sy = M.cmpSym(a-b, c-d);
      return S('2q'+a+b+c+d, Object.assign({
        expr:eqs([a,'−',b,QB,c,'−',d]), say:V.tpl('expr',{tokens:[a,'−',b,'?',c,'−',d], q:'pickSign'}), ans:sy, opts:M.SYM3, layout:'sym',
        field:function(el, X, task){ var sw = M.seesaw(el, '<span class="mxs-wt">' + a + '−' + b + '</span>', '<span class="mxs-wt">' + c + '−' + d + '</span>', X); task.reveal = function(){ sw.reveal(sy); }; }
      }, solved([a-b,'=',a-b], [a+'−'+b,'=',OK(a-b),'<br>',c+'−'+d,'=',OK(c-d)], '')));
    }

    /* ===== Уровень 3 (⭐⭐⭐): до 20 без перехода через десяток ===== */
    function L3(em){
      var t = pick(['frame','frame','tens','missSub','missMin','inv','seesaw']), a, b, c, d, r, s, sy;
      if(t === 'frame' || t === 'tens'){
        a = rnd(11,20); b = t === 'tens' ? 10 : rnd(1,a-10); r = a-b;
        return S('3f'+a+b, Object.assign({
          expr:eqs([a,'−',b,'=',Q]), say:V.tpl('expr',{tokens:[a,'−',b,'=','?'], q:'howmuch'}), ans:String(r), opts:M.numOpts(r,1,19,[a]),
          field:function(el, X, task){ var f = M.framesAnim(el, a, em); task.afterSay = function(){ f.remove(b, X); }; }
        }, solved([a,'−',b,'=',r], [a,'−',b,'=',OK(r)], crossVis(a,b,em))));
      }
      if(t === 'missSub'){
        a = rnd(11,20); r = rnd(10,a-1); b = a-r;
        return S('3s'+a+r, Object.assign({
          expr:eqs([a,'−',QB,'=',r]), say:V.tpl('expr',{tokens:[a,'−','?','=',r], q:'missing'}), ans:String(b), opts:M.numOpts(b,1,10,[r,a]),
          field:function(el){ el.innerHTML = M.frames(a, em); }
        }, solved([a,'−',b,'=',r], [a,'−',OK(b),'=',r], M.frames(a, em))));
      }
      if(t === 'missMin'){
        b = rnd(1,9); r = rnd(10,20-b); a = b+r;
        return S('3m'+a+b, Object.assign({
          expr:eqs([QB,'−',b,'=',r]), say:V.tpl('expr',{tokens:['?','−',b,'=',r], q:'missing'}), ans:String(a), opts:M.numOpts(a,11,20,[r,b]),
          field:function(el){ el.innerHTML = M.frames(r, em); }
        }, solved([a,'−',b,'=',r], [OK(a),'−',b,'=',r], M.frames(a, em))));
      }
      if(t === 'inv'){
        a = rnd(10,19); b = rnd(1,20-a); s = a+b;
        return S('3i'+a+b, Object.assign({
          expr:eqs([a,'+',b,'=',s,'<br>',s,'−',b,'=',QB]), small:true, say:V.tpl('expr',{tokens:[a,'+',b,'=',s,'.',s,'−',b,'=','?'], q:'missing'}), ans:String(a), opts:M.numOpts(a,10,19,[b,s]),
          field:function(el){ el.innerHTML = M.frames(s, em); }
        }, solved([s,'−',b,'=',a], [s,'−',b,'=',OK(a)], M.frames(s, em))));
      }
      a = rnd(11,20); b = rnd(1,a-10); c = rnd(11,20); d = rnd(1,c-10);
      if(Math.random() < .3){ c = rnd(11,20); d = c-(a-b); if(d < 1 || d > c-10){ c = a; d = b; } }
      sy = M.cmpSym(a-b, c-d);
      return S('3q'+a+b+c+d, Object.assign({
        expr:eqs([a,'−',b,QB,c,'−',d]), small:true, say:V.tpl('expr',{tokens:[a,'−',b,'?',c,'−',d], q:'pickSign'}), ans:sy, opts:M.SYM3, layout:'sym',
        field:function(el, X, task){ var sw = M.seesaw(el, '<span class="mxs-wt">' + a + '−' + b + '</span>', '<span class="mxs-wt">' + c + '−' + d + '</span>', X); task.reveal = function(){ sw.reveal(sy); }; }
      }, solved([a-b,'=',a-b], [a+'−'+b,'=',OK(a-b),'<br>',c+'−'+d,'=',OK(c-d)], '')));
    }

    M.run({ root:containerId, key:'subtract', need:10, theme:'sky', levels:[L1,L2,L3] });
  });
}
