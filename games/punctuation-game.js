/* ===== Білім Аралы — «Какой знак: Знаки в конце» (v3) =====
   Обучение грамоте, 1 класс (цель 1.3.9.1 приказа №399): точка, вопросительный и восклицательный знаки. 9 предложений. Уровни: поставь знак → найди вопрос/восклицание → исправь знак / разложи предложения.
   «Приключения Барсика»: движок games/mathx.js + голос games/mathx-voice.js + заставка games/mathx-hero.js
   подгружаются сами — страницу менять не надо. Режим освоения: 10 заданий подряд без ошибки.
*/
window.__mxHeroCfg = {theme:'sunset',icons:['.','?','!']};
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
function initPunctuationGame(containerId){
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
    /* 9 предложений собственного сочинения: [текст без знака, вид] */
    var SE = [['Это кот','period'],['На улице снег','period'],['Мама варит суп','period'],['Как тебя зовут','question'],['Где мой мяч','question'],['Сколько тебе лет','question'],['Как красиво','exclaim'],['Ура, каникулы','exclaim'],['Осторожно, машина','exclaim']];
    var MK = { period:'.', question:'?', exclaim:'!' };
    var KINDS = ['period','question','exclaim'];
    var COL = { period:['#5EC7FF','#2F9BE6'], question:['#FFB454','#E8832F'], exclaim:['#FF8FB1','#E8527F'] };

    (function(){
      if(document.getElementById('mxpn2-css')) return;
      var s = document.createElement('style'); s.id = 'mxpn2-css';
      s.textContent = ''
      + '.mxpn2-card{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:2px;max-width:324px;min-height:96px;padding:12px 18px;border-radius:26px;background:rgba(255,255,255,.94);box-shadow:inset 0 -8px 0 rgba(0,0,0,.07),0 6px 0 rgba(0,0,0,.14);font:800 1.7rem/1.25 "Baloo 2",sans-serif;color:#25324A;text-align:center;animation:mxIn .4s backwards;margin:0 auto;}'
      + '.mxpn2-gap{display:inline-flex;align-items:center;justify-content:center;width:40px;height:46px;margin-left:6px;border-radius:12px;border:3px dashed #7E6BD6;background:#EDE6FF;color:#7E6BD6;}'
      + '.mxpn2-mk{display:inline-block;font-size:2.4rem;line-height:1;margin-left:4px;color:#2F9BE6;}.mxpn2-mk.bad{color:#E5503C;}'
      + '.mxpn2-info{display:flex;align-items:center;gap:10px;background:#fff;border-radius:20px;padding:8px 16px;box-shadow:0 4px 0 rgba(0,0,0,.14);font:800 1.05rem/1.25 "Baloo 2",sans-serif;color:#25324A;text-align:center;max-width:320px;margin:8px auto 0;}'
      + '.mxs-balloon .b .mk{display:block;font:800 4rem/.8 "Baloo 2",sans-serif;text-align:center;}.mxs-balloon .b .mk.dot{width:18px;height:18px;border-radius:50%;background:currentColor;margin:0 auto;}.mxs-balloon .b .ml{display:block;font:800 .72rem/1.05 "Baloo 2",sans-serif;padding:0 4px;text-align:center;margin-top:2px;}'
      + 'body .mxs-balloon .b .nm{font-size:1.08rem!important;font-weight:800;padding:0 4px;text-align:center;line-height:1.1;}.mxs .mxs-balloon.wide{width:150px;}'
      + '@media (prefers-reduced-motion:reduce){.mxpn2-card{animation:none}}';
      document.head.appendChild(s);
    })();

    function idOf(s){ return SE.indexOf(s) + 1; }
    function markOpts(){ return KINDS.map(function(k){ return { v:k, h:k === 'period' ? '<span class="mk dot"></span>' : '<span class="mk">' + MK[k] + '</span>' }; }); }
    function hintOf(s){
      var k = s[1];
      return { hintSay:['f:r_sm_' + idOf(s), 'f:rule_' + k], hint:function(el){ el.innerHTML = '<div class="mxpn2-card">' + s[0] + '<span class="mxpn2-mk">' + MK[k] + '</span></div><div class="mxpn2-info">' + F()['rule_' + k] + '</div>'; } };
    }
    /* ⭐: какой знак в конце предложения */
    function markTask(s){
      var h = hintOf(s);
      return S('m' + idOf(s), { expr:'', say:V.tpl('seq', {list:['f:r_s_' + idOf(s), 'f:punctq']}), cap:F().punctq, ans:s[1], layout:'wide', opts:markOpts(),
        field:function(el){ el.innerHTML = '<div class="mxpn2-card">' + s[0] + '<span class="mxpn2-gap">?</span></div>'; }, hintSay:h.hintSay, hintExpr:'', hint:h.hint });
    }
    /* ⭐⭐: найди предложение нужного вида среди трёх */
    function findTask(kind){
      var pickS = function(k){ return pick(SE.filter(function(x){ return x[1] === k; })); };
      var target = pickS(kind), set = shuffle(KINDS.map(function(k){ return k === kind ? target : pickS(k); })), key = kind === 'question' ? 'punctfindq' : kind === 'exclaim' ? 'punctfinde' : 'punctfindp', h = hintOf(target);
      return S('f' + idOf(target) + set.map(idOf).join(''), { expr:'', say:V.tpl('q', {k:key}), ans:target[0], layout:'wide', opts:set.map(function(x){ return { v:x[0], h:'<span class="nm">' + x[0] + '</span>' }; }),
        field:function(el){ el.innerHTML = '<div class="mxpn2-card" style="min-height:80px"><span class="mxpn2-mk" style="font-size:3.4rem;margin:0">' + MK[kind] + '</span><span style="font-size:1rem;font-weight:700">' + F()['m_' + kind] + '</span></div>'; }, hintSay:h.hintSay, hintExpr:'', hint:h.hint });
    }
    /* ⭐⭐⭐: знак поставлен неверно — исправь */
    function fixTask(s){
      var wrongK = pick(KINDS.filter(function(k){ return k !== s[1]; })), h = hintOf(s);
      return S('x' + idOf(s) + wrongK, { expr:'', say:V.tpl('q', {k:'punctfix'}), ans:s[1], layout:'wide', opts:markOpts(),
        field:function(el){ el.innerHTML = '<div class="mxpn2-card">' + s[0] + '<span class="mxpn2-mk bad">' + MK[wrongK] + '</span></div>'; }, hintSay:h.hintSay, hintExpr:'', hint:h.hint });
    }
    /* ⭐⭐⭐: разложи шесть предложений по знакам */
    function sortTask(){
      var items = [];
      KINDS.forEach(function(k){ shuffle(SE.filter(function(x){ return x[1] === k; })).slice(0, 2).forEach(function(x){ items.push({ h:x[0], k:k, id:String(idOf(x)) }); }); });
      items = shuffle(items);
      return S('s' + items.map(function(i){ return i.id; }).join(''), M.sortTask({ wide:true, items:items, say:V.tpl('q', {k:'punctsort'}), hintSay:['f:rule_period', 'f:rule_question', 'f:rule_exclaim'],
        buckets:KINDS.map(function(k){ return { k:k, name:F()['m_' + k], icon:MK[k], c1:COL[k][0], c2:COL[k][1] }; }) }));
    }

    function L1(){ return markTask(pick(SE)); }
    function L2(){ return Math.random() < .5 ? markTask(pick(SE)) : findTask(pick(KINDS)); }
    function L3(){ var r = Math.random(); return r < .35 ? fixTask(pick(SE)) : r < .65 ? sortTask() : r < .85 ? findTask(pick(KINDS)) : markTask(pick(SE)); }

    M.run({ root:containerId, key:'punctuation', need:10, theme:'sunset', levels:[L1,L2,L3] });
  });
}
