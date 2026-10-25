/* ===== Білім Аралы — «Как правильно: Жи–ши, ча–ща» (v3) =====
   Обучение грамоте, 1 класс (цель 1.3.7.2 приказа №399): жи–ши и ча–ща. Только 7 слов, где правило однозначно: лыжи, уши, мыши, ежи, чашка, туча, свеча. Уровни: два написания → вставь букву → найди ошибку / разложи по правилам.
   «Приключения Барсика»: движок games/mathx.js + голос games/mathx-voice.js + заставка games/mathx-hero.js
   подгружаются сами — страницу менять не надо. Режим освоения: 10 заданий подряд без ошибки.
*/
window.__mxHeroCfg = {theme:'pond',icons:['✍️','🎿','☁️']};
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
function initSpellingGame(containerId){
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
    /* 7 слов из программы: жи–ши (всегда И) и ча–ща (всегда А).
       [слово, номер буквы после ж/ш/ч/щ, верная буква, неверная буква, неверное написание, картинка, правило] */
    var WD = [['лыжи',3,'и','ы','лыжы','🎿','zhshi'],['уши',2,'и','ы','ушы','👂','zhshi'],['мыши',3,'и','ы','мышы','🐭','zhshi'],['ежи',2,'и','ы','ежы','🦔','zhshi'],
              ['чашка',1,'а','я','чяшка','☕','chsha'],['туча',3,'а','я','тюча','☁️','chsha'],['свеча',4,'а','я','свечя','🕯️','chsha']];
    var RULE = { zhshi:'ЖИ – ШИ', chsha:'ЧА – ЩА' };
    var RICON = { zhshi:'И', chsha:'А' };

    (function(){
      if(document.getElementById('mxsp-css')) return;
      var s = document.createElement('style'); s.id = 'mxsp-css';
      s.textContent = ''
      + '.mxsp-pic{display:flex;align-items:center;justify-content:center;width:130px;height:110px;border-radius:26px;background:rgba(255,255,255,.92);box-shadow:inset 0 -8px 0 rgba(0,0,0,.08),0 6px 0 rgba(0,0,0,.14);font-size:4.4rem;line-height:1;animation:mxIn .4s backwards;}'
      + '.mxsp-gap{display:flex;gap:5px;justify-content:center;margin-top:12px;flex-wrap:wrap;max-width:330px;}.mxsp-gap b{min-width:40px;height:56px;padding:0 4px;border-radius:13px;background:#fff;box-shadow:0 4px 0 rgba(0,0,0,.16);font:800 2rem/56px "Baloo 2",sans-serif;color:#25324A;text-align:center;}.mxsp-gap b.q{min-width:46px;background:#EDE6FF;border:3px dashed #7E6BD6;color:#7E6BD6;line-height:50px;}'
      + '.mxsp-word{font:800 2rem "Baloo 2",sans-serif;color:#25324A;background:#fff;border-radius:18px;padding:2px 22px;display:inline-block;box-shadow:0 4px 0 rgba(0,0,0,.14);margin-top:8px;}.mxsp-word u{text-decoration:none;color:#E5503C;}'
      + '.mxsp-info{display:flex;align-items:center;gap:10px;background:#fff;border-radius:20px;padding:8px 16px;box-shadow:0 4px 0 rgba(0,0,0,.14);font:800 1.1rem/1.2 "Baloo 2",sans-serif;color:#25324A;text-align:center;max-width:320px;margin-top:8px;}.mxsp-info .e{font-size:2.2rem;line-height:1;}'
      + '.mxs .mxs-balloon.wide{width:124px;}.mxs-balloon .b .lt{font:800 2.6rem "Baloo 2",sans-serif;}body .mxs-balloon .b .nm{font-size:1.45rem!important;font-weight:800;padding:0 6px;text-align:center;}'
      + '@media (prefers-reduced-motion:reduce){.mxsp-pic{animation:none}}';
      document.head.appendChild(s);
    })();

    function bigWord(w){ var i = w[1]; return w[0].slice(0, i).toUpperCase() + '<u>' + w[0].charAt(i).toUpperCase() + '</u>' + w[0].slice(i + 1).toUpperCase(); }
    function hintOf(w){
      var rs = w[6] === 'zhshi' ? 'f:rule_zhshi' : 'f:rule_chsha';
      return { hintSay:[WK(w[0]), rs], hint:function(el){ el.innerHTML = '<div class="mxsp-pic" style="margin:0 auto">' + w[5] + '</div><div style="text-align:center"><span class="mxsp-word">' + bigWord(w) + '</span></div><div class="mxsp-info">' + F()[rs.slice(2)] + '</div>'; } };
    }
    /* ⭐: два написания — выбери верное */
    function pickTask(w){
      var h = hintOf(w);
      return S('p' + w[0], { expr:'', say:V.tpl('seq', {list:['f:spellq', WK(w[0])]}), cap:F().spellq, ans:w[0], layout:'wide', opts:shuffle([w[0], w[4]]).map(function(x){ return { v:x, h:'<span class="nm">' + x + '</span>' }; }),
        field:function(el){ el.innerHTML = '<div class="mxsp-pic" style="margin:0 auto">' + w[5] + '</div>'; }, hintSay:h.hintSay, hintExpr:'', hint:h.hint });
    }
    /* ⭐⭐: вставь пропущенную букву */
    function gapTask(w){
      var h = hintOf(w), vow = ['и','ы','а','я','о','у','е','ю'], pool = shuffle(vow.filter(function(c){ return c !== w[2] && c !== w[3]; })).slice(0, 2), set = shuffle([w[2], w[3]].concat(pool));
      return S('g' + w[0], { expr:'', say:V.tpl('seq', {list:['f:gapspell', WK(w[0])]}), cap:F().gapspell, ans:w[2], layout:'wide', opts:set.map(function(c){ return { v:c, h:'<span class="lt">' + c.toUpperCase() + '</span>' }; }),
        field:function(el){ el.innerHTML = '<div class="mxsp-pic" style="margin:0 auto">' + w[5] + '</div><div class="mxsp-gap">' + w[0].split('').map(function(c, i){ return i === w[1] ? '<b class="q">?</b>' : '<b>' + c.toUpperCase() + '</b>'; }).join('') + '</div>'; }, hintSay:h.hintSay, hintExpr:'', hint:h.hint });
    }
    /* ⭐⭐⭐: найди слово с ошибкой среди четырёх */
    function mistakeTask(w){
      var h = hintOf(w), others = shuffle(WD.filter(function(x){ return x[0] !== w[0]; })).slice(0, 3), set = shuffle([w[4]].concat(others.map(function(x){ return x[0]; })));
      return S('m' + w[0], { expr:'', say:V.tpl('q', {k:'findmistake'}), ans:w[4], layout:'wide', opts:set.map(function(x){ return { v:x, h:'<span class="nm">' + x + '</span>' }; }),
        field:function(el){ el.innerHTML = '<div class="mxsp-pic" style="margin:0 auto;font-size:3.4rem">✍️</div>'; }, hintSay:h.hintSay, hintExpr:'', hint:h.hint });
    }
    /* ⭐⭐⭐: какое правило — разложи шесть слов */
    function sortTask(){
      var a = shuffle(WD.filter(function(x){ return x[6] === 'zhshi'; })).slice(0, 3), b = WD.filter(function(x){ return x[6] === 'chsha'; });
      var items = shuffle(a.concat(b)).map(function(x){ return { h:x[0], k:x[6], id:x[0] }; });
      return S('s' + items.map(function(i){ return i.id; }).join(''), M.sortTask({ wide:true,
        items:items, say:V.tpl('q', {k:'sortrule'}), hintSay:['f:rule_zhshi', 'f:rule_chsha'],
        buckets:[{ k:'zhshi', name:RULE.zhshi, icon:'И', c1:'#5EC7FF', c2:'#2F9BE6' }, { k:'chsha', name:RULE.chsha, icon:'А', c1:'#FFB454', c2:'#E8832F' }]
      }));
    }

    function L1(){ return pickTask(pick(WD)); }
    function L2(){ return Math.random() < .7 ? gapTask(pick(WD)) : pickTask(pick(WD)); }
    function L3(){ var r = Math.random(); return r < .4 ? mistakeTask(pick(WD)) : r < .75 ? sortTask() : gapTask(pick(WD)); }

    M.run({ root:containerId, key:'spelling', need:10, theme:'pond', levels:[L1,L2,L3] });
  });
}
