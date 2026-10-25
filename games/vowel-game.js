/* ===== Білім Аралы — «Гласная или согласная: Поющие буквы» (v3) =====
   Обучение грамоте, 1 класс (приказ №399): гласные и согласные буквы. 10 гласных и 10 согласных. Уровни: гласная или согласная → найди среди четырёх → разложи шесть букв.
   «Приключения Барсика»: движок games/mathx.js + голос games/mathx-voice.js + заставка games/mathx-hero.js
   подгружаются сами — страницу менять не надо. Режим освоения: 10 заданий подряд без ошибки.
*/
window.__mxHeroCfg = {theme:'candy',icons:['🎵','Б','А']};
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
function initVowelGame(containerId){
  __mxLoad(function(){
    var M = MX, rnd = M.rnd, pick = M.pick, V = MXV, shuffle = M.shuffle;
    function S(sig, t){ t.sig = sig; return t; }
    var TR = {'А':'a','Б':'b','В':'v','Г':'g','Д':'d','Е':'e','Ё':'yo','Ж':'zh','З':'z','И':'i','Й':'j','К':'k','Л':'l','М':'m','Н':'n','О':'o','П':'p','Р':'r','С':'s','Т':'t','У':'u','Ф':'f','Х':'h','Ц':'c','Ч':'ch','Ш':'sh','Щ':'shch','Ы':'y','Э':'ye','Ю':'yu','Я':'ya'};
    var TW = {'а':'a','б':'b','в':'v','г':'g','д':'d','е':'e','ё':'yo','ж':'zh','з':'z','и':'i','й':'j','к':'k','л':'l','м':'m','н':'n','о':'o','п':'p','р':'r','с':'s','т':'t','у':'u','ф':'f','х':'h','ц':'c','ч':'ch','ш':'sh','щ':'shch','ъ':'','ы':'y','ь':'','э':'e','ю':'yu','я':'ya'};
    function LK(l){ return 'f:r_l_' + TR[l]; }
    function WK(w){ return 'f:r_w_' + w.toLowerCase().replace(/-/g, '').split('').map(function(c){ return TW[c]; }).join(''); }
    function F(){ return V.F[V.lang()]; }
    function msgs(){ var l = document.documentElement.getAttribute('data-current') || 'ru'; return (typeof translations !== 'undefined' && translations[l]) ? translations[l] : {}; }
    function cap1(w){ return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase(); }
    /* 20 букв из программы: 10 гласных и 10 согласных */
    var VOW = ['А','Е','Ё','И','О','У','Ы','Э','Ю','Я'], CON = ['Б','В','Г','Д','К','Л','М','Н','Р','С'];
    var ALL = VOW.map(function(l){ return [l, 'v']; }).concat(CON.map(function(l){ return [l, 'c']; }));
    var ICON = { v:'🎵', c:'🤫' }, SAY = { v:'vsay', c:'csay' }, FIND = { v:'findvowel', c:'findcons' };
    function label(k){ var m = msgs(); return k === 'v' ? (m.btn_vowel || 'Vowel') : (m.btn_consonant || 'Consonant'); }
    function of(k){ return ALL.filter(function(x){ return x[1] === k; }); }

    (function(){
      if(document.getElementById('mxvw-css')) return;
      var s = document.createElement('style'); s.id = 'mxvw-css';
      s.textContent = ''
      + '.mxvw-card{display:flex;align-items:center;justify-content:center;width:150px;height:150px;border-radius:30px;background:rgba(255,255,255,.92);box-shadow:inset 0 -9px 0 rgba(0,0,0,.08),0 7px 0 rgba(0,0,0,.14);font:800 6rem/1 "Baloo 2",sans-serif;color:#7E6BD6;animation:mxIn .4s backwards;}'
      + '.mxvw-info{display:flex;align-items:center;gap:10px;background:#fff;border-radius:20px;padding:8px 16px;box-shadow:0 4px 0 rgba(0,0,0,.14);font:800 1.12rem/1.2 "Baloo 2",sans-serif;color:#25324A;text-align:center;max-width:320px;margin-top:8px;}'
      + '.mxvw-info .L{font:800 2.6rem/1 "Baloo 2",sans-serif;color:#7E6BD6;}.mxvw-info .e{font-size:2.2rem;line-height:1;}'
      + '.mxvw-scene{display:flex;align-items:center;justify-content:center;width:min(100%,300px);height:120px;border-radius:26px;box-shadow:inset 0 -8px 0 rgba(0,0,0,.14),0 6px 0 rgba(0,0,0,.18);font-size:4.4rem;animation:mxIn .4s backwards;}'
      + '.mxs .mxs-balloon.wide{width:130px;}.mxs-balloon.wide .b .nm{font-size:1rem;line-height:1.1;padding:0 6px;text-align:center;}.mxs-balloon .b .lt{font:800 2.6rem "Baloo 2",sans-serif;}'
      + '@media (prefers-reduced-motion:reduce){.mxvw-card,.mxvw-scene{animation:none}}';
      document.head.appendChild(s);
    })();

    function hintOf(e){
      return { hintSay:[LK(e[0]), SAY[e[1]]].map(function(x){ return x.indexOf('f:') === 0 ? x : 'f:' + x; }), hint:function(el){ el.innerHTML = '<div class="mxvw-info"><span class="L">' + e[0] + '</span><span>→ ' + ICON[e[1]] + ' ' + label(e[1]) + '</span></div><div class="mxvw-info">' + F()[SAY[e[1]]] + '</div>'; } };
    }
    /* ⭐: гласная или согласная */
    function askTask(e){
      var h = hintOf(e), o = shuffle(['v','c']).map(function(k){ return { v:k, h:'<span class="nm">' + label(k) + '</span>' }; });
      return S('a' + e[0], { expr:'', say:V.tpl('seq', {list:[LK(e[0]), 'f:vowelq']}), cap:F().vowelq, ans:e[1], layout:'wide', opts:o,
        field:function(el){ el.innerHTML = '<div class="mxvw-card">' + e[0] + '</div>'; }, hintSay:h.hintSay, hintExpr:'', hint:h.hint });
    }
    /* ⭐⭐: найди гласную / согласную среди четырёх букв */
    function findTask(k, e){
      var other = k === 'v' ? 'c' : 'v', set = shuffle([e].concat(shuffle(of(other)).slice(0, 3))), h = hintOf(e);
      var bg = k === 'v' ? 'linear-gradient(#FFE29A,#FFB86B)' : 'linear-gradient(#DDE3EE,#B7C1D6)';
      return S('f' + k + e[0], { expr:'', say:V.tpl('q', {k:FIND[k]}), ans:e[0], layout:'wide', opts:set.map(function(x){ return { v:x[0], h:'<span class="lt">' + x[0] + '</span>' }; }),
        field:function(el){ el.innerHTML = '<div class="mxvw-scene" style="background:' + bg + '"><span>' + ICON[k] + '</span></div>'; }, hintSay:h.hintSay, hintExpr:'', hint:h.hint });
    }
    /* ⭐⭐⭐: разложи шесть букв */
    function sortTask(){
      var items = shuffle(shuffle(of('v')).slice(0, 3).concat(shuffle(of('c')).slice(0, 3))).map(function(x){ return { h:x[0], k:x[1], id:x[0] }; });
      return S('s' + items.map(function(i){ return i.id; }).join(''), M.sortTask({
        items:items, say:V.tpl('q', {k:'sortvc'}), hintSay:['f:vsay', 'f:csay'],
        buckets:[{ k:'v', name:label('v'), icon:ICON.v, c1:'#FFB454', c2:'#E8832F' }, { k:'c', name:label('c'), icon:ICON.c, c1:'#9AA7BD', c2:'#6B7A94' }]
      }));
    }

    function L1(){ return askTask(pick(ALL)); }
    function L2(){ var k = pick(['v','c']); return findTask(k, pick(of(k))); }
    function L3(){ return Math.random() < .65 ? sortTask() : (Math.random() < .5 ? askTask(pick(ALL)) : (function(){ var k = pick(['v','c']); return findTask(k, pick(of(k))); })()); }

    M.run({ root:containerId, key:'vowel', need:10, theme:'candy', levels:[L1,L2,L3] });
  });
}
