/* ===== Білім Аралы — слой перевода надписей интерфейса =====
   Зачем: на многих страницах надписи (кнопки, названия курсов и тем, ссылки «К играм по…») написаны прямо в HTML/JS,
   а не в словаре i18n.js. Этот файл подменяет такие надписи на выбранный язык, не трогая сами страницы.
   Как работает: если выбран язык, для которого есть файл assets/ui-<язык>.js (есть для всех языков, кроме русского), он подгружается, и каждый
   текст на странице (а также title / aria-label / alt / placeholder), который ТОЧНО совпадает с ключом словаря, заменяется
   переводом. Всё остальное не трогается. При смене языка оригинал возвращается. Русский работает как раньше.
   Добавить перевод: в assets/ui-<язык>.js добавьте пару  'русский текст': 'перевод'. */
(function(){
  if (window.__uiI18n) return; window.__uiI18n = true;
  var me = document.currentScript, base = (me && me.src) ? me.src.replace(/ui-i18n\.js.*$/, '') : '';
  var DICT = {}, LOADING = {}, texts = new Map(), attrEls = new Set(), busy = false, ATTRS = ['title', 'aria-label', 'alt', 'placeholder'];
  var VER = 0;   // версия словарей: растёт при каждом пополнении, чтобы заново перевести уже переведённое (частично) более ранним пакетом
  window.UI_I18N_REG = function(l, d){   // можно вызывать несколько раз: пакеты дополняют словарь языка, а не заменяют его
    var cur0 = DICT[l] || { ex: Object.create(null), pat: [] };
    for (var k in d.ex) if (Object.prototype.hasOwnProperty.call(d.ex, k)) cur0.ex[k] = d.ex[k];
    (d.pat || []).forEach(function(p){ cur0.pat.push([new RegExp(p[0]), p[1], p[2]]); });
    DICT[l] = cur0; VER++;
    run();
  };
  function cur(){
    var l = document.documentElement.getAttribute('data-current');
    if (!l){ try { l = localStorage.getItem('bilim_lang_v1'); } catch(e){} }
    return l || 'ru';
  }
  /* Пакеты по классам: тексты уроков и игр лежат отдельно (ui-<язык>-g1.js — 1 класс), чтобы не грузить их на остальных страницах */
  var PACKS = [ [/\/grades\/grade-1\//, 'g1'] ];
  function load(l){
    if (DICT[l] !== undefined || LOADING[l] || !base) return; LOADING[l] = 1;
    var s = document.createElement('script'); s.src = base + 'ui-' + l + '.js'; s.async = true;
    s.onerror = function(){ DICT[l] = null; }; document.head.appendChild(s);
    PACKS.forEach(function(pk){
      if (!pk[0].test(location.pathname)) return;
      var q = document.createElement('script'); q.src = base + 'ui-' + l + '-' + pk[1] + '.js'; q.async = true;
      q.onerror = function(){}; document.head.appendChild(q);
    });
  }
  function tr(str, d){
    var t = str.replace(/\s+/g, ' ').trim(); if (!t) return null;
    var r = d.ex[t];
    if (r === undefined){   // запасной вариант: то же предложение, но точка в конце есть только с одной стороны
      var m0 = /^(.*[^.!?…])([.!?…]+)$/.exec(t);
      if (m0){ var x = d.ex[m0[1]]; if (x !== undefined) r = x + m0[2]; }
      else if (d.ex[t + '.'] !== undefined) r = d.ex[t + '.'].replace(/\.$/, '');
    }
    if (r === undefined){
      for (var i = 0; i < d.pat.length; i++){
        var m = d.pat[i][0].exec(t); if (!m) continue;
        var g = d.pat[i][2];   // номер группы, которую надо перевести по словарю (например название урока)
        if (g){ [].concat(g).forEach(function(k){ var pre = ''; if (typeof k === 'string'){ var q = k.split(':'); k = +q[0]; pre = q[1] + ':'; }   // g — номер группы, массив номеров или «номер:префикс» (словарь по контексту)
          var sub = pre ? d.ex[pre + m[k]] : undefined; if (sub === undefined) sub = d.ex[m[k]]; if (sub !== undefined) m[k] = sub; }); }
        r = d.pat[i][1].replace(/\$(\d)/g, function(_, k){ return m[+k] === undefined ? '' : m[+k]; }); break;
      }
    }
    if (r === undefined || r === t) return null;
    return str.match(/^\s*/)[0] + r + str.match(/\s*$/)[0];
  }
  var htmls = new Map();   // элементы, у которых заменили целиком innerHTML (фразы с <b>, <br>): элемент -> { orig, out }
  function restore(){
    htmls.forEach(function(v, e){ try { e.innerHTML = v.orig; } catch(x){} }); htmls.clear();
    texts.forEach(function(v, n){ try { n.nodeValue = v.orig; } catch(e){} }); texts.clear();
    attrEls.forEach(function(e){ var o = e.__uiO; if (o){ for (var a in o){ try { e.setAttribute(a, o[a]); } catch(x){} } e.__uiO = null; } }); attrEls.clear();
  }
  function walk(root, d){
    /* Фразы с разметкой внутри (<b>слово</b>, <br>): текст разбит на куски, поэтому сверяем innerHTML родителя целиком */
    var seenP = new Set(), w0 = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null), n0;
    while ((n0 = w0.nextNode())){
      var p0 = n0.parentNode; if (!p0 || seenP.has(p0) || !p0.children || !p0.children.length || p0.children.length > 8) continue;
      seenP.add(p0); if (/^(SCRIPT|STYLE|NOSCRIPT|TEXTAREA)$/.test(p0.nodeName)) continue;
      var rec0 = htmls.get(p0), h0 = p0.innerHTML;
      if (rec0 && rec0.out === h0){
        if (rec0.ver === VER) continue;
        rec0.ver = VER; var o1 = tr(rec0.orig, d); if (o1 !== null && o1 !== h0){ rec0.out = o1; p0.innerHTML = o1; }
        continue;
      }
      if (h0.length > 3000 || !/<(b|i|em|strong|br)\b|<span class="ac-/i.test(h0)) continue;
      var o0 = tr(h0, d); if (o0 !== null){ htmls.set(p0, { orig: h0, out: o0, ver: VER }); p0.innerHTML = o0; }
    }
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null), n, list = [];
    while ((n = w.nextNode())){ var p = n.parentNode; if (p && !/^(SCRIPT|STYLE|NOSCRIPT|TEXTAREA)$/.test(p.nodeName)) list.push(n); }
    list.forEach(function(n){
      var rec = texts.get(n), v = n.nodeValue;
      if (rec && rec.out === v){
        if (rec.ver === VER) return;
        rec.ver = VER; var o2 = tr(rec.orig, d); if (o2 !== null && o2 !== v){ rec.out = o2; n.nodeValue = o2; }
        return;
      }
      var o = tr(v, d); if (o !== null){ texts.set(n, { orig: v, out: o, ver: VER }); n.nodeValue = o; }
    });
    [].forEach.call(root.querySelectorAll('[title],[aria-label],[alt],[placeholder]'), function(e){
      ATTRS.forEach(function(a){
        var v = e.getAttribute(a); if (!v) return;
        var o = tr(v, d); if (o === null) return;
        if (!e.__uiO) e.__uiO = {}; if (e.__uiO[a] === undefined) e.__uiO[a] = v;
        e.setAttribute(a, o); attrEls.add(e);
      });
    });
  }
  function run(){
    if (busy) return; busy = true;
    try {
      var l = cur(); if (l === 'ru'){ restore(); return; }
      var d = DICT[l]; if (d === undefined){ load(l); return; } if (!d) return;
      if (document.body) walk(document.body, d);
      var t = tr(document.title, d); if (t !== null) document.title = t;
    } finally { busy = false; }
  }
  var timer = null; function later(){ clearTimeout(timer); timer = setTimeout(run, 50); }
  function init(){
    run();
    try {
      new MutationObserver(later).observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ATTRS });
      new MutationObserver(function(){ restore(); run(); }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-current'] });
    } catch(e){}
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
