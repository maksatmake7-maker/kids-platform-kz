/* ===== Білім Аралы — «Флаг Казахстана: Мой флаг» (v3) =====
   Познание мира, 1 класс (цель 1.3.5.1 приказа №399): отличать символы Казахстана от символов других стран. Флаги нарисованы картинками. Уровни: это флаг Казахстана? → найди среди четырёх → цвет, солнце и орёл на флаге.
   «Приключения Барсика»: движок games/mathx.js + голос games/mathx-voice.js + заставка games/mathx-hero.js
   подгружаются сами — страницу менять не надо. Режим освоения: 10 заданий подряд без ошибки.
*/
window.__mxHeroCfg = {theme:'sky',icons:['🦅','☀️','🏳️']};
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
function initFlagGame(containerId){
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
    /* флаги нарисованы картинками (SVG): смайлики-флаги на Windows показываются буквами */
    function star(cx, cy, R, r, rot){
      var pts = [], a0 = (rot === undefined ? -90 : rot);
      for(var i = 0; i < 10; i++){ var R2 = i % 2 ? r : R, a = (a0 + i * 36) * Math.PI / 180; pts.push((cx + R2 * Math.cos(a)).toFixed(2) + ',' + (cy + R2 * Math.sin(a)).toFixed(2)); }
      return '<polygon points="' + pts.join(' ') + '"/>';
    }
    function rays(cx, cy, r1, r2, n, w, col){
      var out = '';
      for(var i = 0; i < n; i++){ var a = i * 2 * Math.PI / n; out += '<line x1="' + (cx + r1 * Math.cos(a)).toFixed(2) + '" y1="' + (cy + r1 * Math.sin(a)).toFixed(2) + '" x2="' + (cx + r2 * Math.cos(a)).toFixed(2) + '" y2="' + (cy + r2 * Math.sin(a)).toFixed(2) + '" stroke="' + col + '" stroke-width="' + w + '"/>'; }
      return out;
    }
    var FL = {
      ru:function(){ return '<rect width="60" height="40" fill="#fff"/><rect y="13.3" width="60" height="13.4" fill="#0039A6"/><rect y="26.7" width="60" height="13.3" fill="#D52B1E"/>'; },
      us:function(){ var o = '<rect width="60" height="40" fill="#fff"/>'; for(var i = 0; i < 13; i += 2) o += '<rect y="' + (i * 40 / 13).toFixed(2) + '" width="60" height="' + (40 / 13).toFixed(2) + '" fill="#B22234"/>'; o += '<rect width="26" height="21.5" fill="#3C3B6E"/><g fill="#fff">'; for(var r = 0; r < 5; r++) for(var c = 0; c < 6; c++) o += '<circle cx="' + (3 + c * 4) + '" cy="' + (3 + r * 4) + '" r="1"/>'; return o + '</g>'; },
      cn:function(){ return '<rect width="60" height="40" fill="#DE2910"/><g fill="#FFDE00">' + star(10, 10, 5.2, 2.1) + star(20, 4.5, 1.8, .75, -70) + star(24, 9.5, 1.8, .75, -40) + star(24, 15.5, 1.8, .75, -10) + star(20, 20, 1.8, .75, 20) + '</g>'; },
      fr:function(){ return '<rect width="20" height="40" fill="#0055A4"/><rect x="20" width="20" height="40" fill="#fff"/><rect x="40" width="20" height="40" fill="#EF4135"/>'; },
      uz:function(){ var o = '<rect width="60" height="40" fill="#0099B5"/><rect y="13.4" width="60" height="1.2" fill="#CE1126"/><rect y="14.6" width="60" height="11" fill="#fff"/><rect y="25.6" width="60" height="1.2" fill="#CE1126"/><rect y="26.8" width="60" height="13.2" fill="#1EB53A"/><circle cx="8" cy="6.6" r="3.6" fill="#fff"/><circle cx="9.4" cy="6.6" r="3.1" fill="#0099B5"/><g fill="#fff">'; for(var r = 0; r < 3; r++) for(var c = 0; c < 4 - (r === 1 ? 1 : 0); c++) o += '<circle cx="' + (17 + c * 3.4 + r * 1.2) + '" cy="' + (3.4 + r * 3.2) + '" r=".8"/>'; return o + '</g>'; },
      kg:function(){ return '<rect width="60" height="40" fill="#E8112D"/><circle cx="30" cy="20" r="9.5" fill="#FFEF00"/>' + rays(30, 20, 10.5, 13.5, 40, .9, '#FFEF00') + '<circle cx="30" cy="20" r="6.2" fill="#E8112D"/><g stroke="#FFEF00" stroke-width=".8" fill="none"><path d="M24.6 17 Q30 20.4 35.4 17 M24.6 23 Q30 19.6 35.4 23"/></g>'; },
      tr:function(){ return '<rect width="60" height="40" fill="#E30A17"/><circle cx="23" cy="20" r="10" fill="#fff"/><circle cx="26" cy="20" r="8" fill="#E30A17"/><g fill="#fff">' + star(35, 20, 4.2, 1.7, 0) + '</g>'; },
      gb:function(){ return '<rect width="60" height="40" fill="#012169"/><path d="M0 0 L60 40 M60 0 L0 40" stroke="#fff" stroke-width="7"/><path d="M0 0 L60 40 M60 0 L0 40" stroke="#C8102E" stroke-width="2.4"/><path d="M30 0 V40 M0 20 H60" stroke="#fff" stroke-width="11"/><path d="M30 0 V40 M0 20 H60" stroke="#C8102E" stroke-width="6.4"/>'; },
      jp:function(){ return '<rect width="60" height="40" fill="#fff"/><circle cx="30" cy="20" r="11.5" fill="#BC002D"/>'; },
      'in':function(){ return '<rect width="60" height="13.4" fill="#FF9933"/><rect y="13.4" width="60" height="13.3" fill="#fff"/><rect y="26.7" width="60" height="13.3" fill="#138808"/><circle cx="30" cy="20" r="4.6" fill="none" stroke="#000080" stroke-width=".7"/>' + rays(30, 20, 0, 4.4, 24, .35, '#000080'); }
    };
    /* флаг Казахстана — настоящее изображение (assets/photos/flag-kz.webp), пропорции сохранены (≈1:2); флаги других стран нарисованы упрощённо */
    var KZ_SRC = (window.__mxBase || '../../../games/') + '../assets/photos/flag-kz.webp', KZ_RATIO = 2.118;
    function flag(code, w){
      if(code === 'kz') return '<span class="mxfl" style="width:' + w + 'px;height:' + Math.round(w / KZ_RATIO) + 'px"><img src="' + KZ_SRC + '" alt="Флаг Казахстана" draggable="false" style="display:block;width:100%;height:100%"></span>';
      return '<span class="mxfl" style="width:' + w + 'px;height:' + Math.round(w * 2 / 3) + 'px"><svg viewBox="0 0 60 40" width="100%" height="100%" preserveAspectRatio="none" aria-hidden="true">' + FL[code]() + '</svg></span>';
    }
    var OTHERS = ['ru','us','cn','fr','uz','kg','tr','gb','jp','in'], SIMILAR = ['kg','uz','tr','cn'];

    (function(){
      if(document.getElementById('mxfg-css')) return;
      var s = document.createElement('style'); s.id = 'mxfg-css';
      s.textContent = ''
      + '.mxfl{display:inline-block;border-radius:7px;overflow:hidden;box-shadow:0 0 0 2px rgba(255,255,255,.95),0 4px 0 rgba(0,0,0,.2);vertical-align:middle;}.mxfl svg{display:block;}'
      + '.mxfg-big{display:flex;align-items:center;justify-content:center;padding:14px 18px;border-radius:28px;background:rgba(255,255,255,.94);box-shadow:inset 0 -8px 0 rgba(0,0,0,.08),0 6px 0 rgba(0,0,0,.14);margin:0 auto;width:max-content;animation:mxIn .4s backwards;}'
      + '.mxfg-info{display:flex;align-items:center;gap:10px;background:#fff;border-radius:20px;padding:8px 16px;box-shadow:0 4px 0 rgba(0,0,0,.14);font:800 1.02rem/1.25 "Baloo 2",sans-serif;color:#25324A;text-align:center;max-width:320px;margin:10px auto 0;}'
      + '.mxs-balloon .b .lt{font:800 2.6rem "Baloo 2",sans-serif;}.mxs-balloon .b .nm{font-size:1.35rem!important;font-weight:800;}.mxs-balloon .b .sw{display:block;width:42px;height:42px;border-radius:50%;border:3px solid #fff;box-shadow:0 2px 0 rgba(0,0,0,.25);margin:0 auto 2px;}.mxs-balloon .b .swn{display:block;font:800 .95rem/1 "Baloo 2",sans-serif;}'
      + '.mxs .mxs-balloon.wide{width:136px;}'
      + '@media (prefers-reduced-motion:reduce){.mxfg-big{animation:none}}';
      document.head.appendChild(s);
    })();

    var hintBase = { hintSay:['f:r_flag_kz'], hint:function(el){ el.innerHTML = '<div class="mxfg-big" style="padding:10px 14px">' + flag('kz', 150) + '</div><div class="mxfg-info">Голубое полотно, в центре — золотое солнце и парящий орёл, у древка — узор.</div>'; } };
    function oneOf(set){ return set[rnd(0, set.length - 1)]; }
    /* ⭐: это флаг Казахстана? */
    function yesNoTask(){
      var isKz = Math.random() < .45, code = isKz ? 'kz' : pick(OTHERS);
      return S('y' + code, { expr:'', say:V.tpl('q', {k:'flagyn'}), ans:isKz ? 'y' : 'n', layout:'wide', opts:[{ v:'y', h:'<span class="nm">Да</span>' }, { v:'n', h:'<span class="nm">Нет</span>' }],
        field:function(el){ el.innerHTML = '<div class="mxfg-big">' + flag(code, 170) + '</div>'; }, hintSay:hintBase.hintSay, hintExpr:'', hint:hintBase.hint });
    }
    /* ⭐⭐/⭐⭐⭐: найди флаг Казахстана среди 4 (на высшем уровне — похожие) */
    function findTask(similar){
      var pool = similar ? SIMILAR.concat(shuffle(OTHERS.filter(function(c){ return SIMILAR.indexOf(c) < 0; })).slice(0, 1)) : OTHERS, set = shuffle(['kz'].concat(shuffle(pool).slice(0, 3)));
      return S('f' + set.join(''), { expr:'', say:V.tpl('q', {k:'flagfind'}), ans:'kz', layout:'wide', opts:set.map(function(c){ return { v:c, h:flag(c, 88) }; }),
        field:function(el){ el.innerHTML = '<div class="mxfg-big" style="padding:16px 28px"><span style="font:800 1.6rem \'Baloo 2\',sans-serif;color:#25324A">Казахстан</span></div>'; }, hintSay:hintBase.hintSay, hintExpr:'', hint:hintBase.hint });
    }
    /* ⭐⭐⭐: что на флаге Казахстана */
    function factTask(){
      var r = Math.random();
      if(r < .34) return S('kc', { expr:'', say:V.tpl('q', {k:'flagcolor'}), ans:'blue', layout:'wide', opts:shuffle([['blue','#00AFCA','Голубой'],['red','#E5503C','Красный'],['green','#3FA84A','Зелёный'],['white','#F4F6FA','Белый']]).map(function(c){ return { v:c[0], h:'<span class="sw" style="background:' + c[1] + '"></span><span class="swn">' + c[2] + '</span>' }; }),
        field:function(el){ el.innerHTML = '<div class="mxfg-big">' + flag('kz', 150) + '</div>'; }, hintSay:hintBase.hintSay, hintExpr:'', hint:hintBase.hint });
      if(r < .67) return S('ks', { expr:'', say:V.tpl('q', {k:'flagcenter'}), ans:'☀️', layout:'wide', opts:shuffle(['☀️','⭐','🌙','❄️']).map(function(e){ return { v:e, h:'<span class="lt">' + e + '</span>' }; }),
        field:function(el){ el.innerHTML = '<div class="mxfg-big">' + flag('kz', 150) + '</div>'; }, hintSay:hintBase.hintSay, hintExpr:'', hint:hintBase.hint });
      return S('kb', { expr:'', say:V.tpl('q', {k:'flagbird'}), ans:'🦅', layout:'wide', opts:shuffle(['🦅','🦉','🦆','🐓']).map(function(e){ return { v:e, h:'<span class="lt">' + e + '</span>' }; }),
        field:function(el){ el.innerHTML = '<div class="mxfg-big">' + flag('kz', 150) + '</div>'; }, hintSay:hintBase.hintSay, hintExpr:'', hint:hintBase.hint });
    }

    function L1(){ return yesNoTask(); }
    function L2(){ return Math.random() < .6 ? findTask(false) : yesNoTask(); }
    function L3(){ var r = Math.random(); return r < .4 ? findTask(true) : factTask(); }

    M.run({ root:containerId, key:'flag', need:10, theme:'sky', levels:[L1,L2,L3] });
  });
}
