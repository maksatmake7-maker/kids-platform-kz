/* ===== Білім Аралы — слой перевода надписей интерфейса =====
   Зачем: на многих страницах надписи (кнопки, названия курсов и тем, ссылки «К играм по…») написаны прямо в HTML/JS,
   а не в словаре i18n.js. Этот файл подменяет такие надписи на выбранный язык, не трогая сами страницы.
   Как работает: если выбран язык, для которого есть файл assets/ui-<язык>.js (сейчас ui-en.js, ui-kz.js), он подгружается, и каждый
   текст на странице (а также title / aria-label / alt / placeholder), который ТОЧНО совпадает с ключом словаря, заменяется
   переводом. Всё остальное не трогается. При смене языка оригинал возвращается. Русский работает как раньше.
   Добавить перевод: в assets/ui-<язык>.js добавьте пару  'русский текст': 'перевод'. */
(function(){
  if (window.__uiI18n) return; window.__uiI18n = true;
  var me = document.currentScript, base = (me && me.src) ? me.src.replace(/ui-i18n\.js.*$/, '') : '';
  var DICT = {}, LOADING = {}, texts = new Map(), attrEls = new Set(), busy = false, ATTRS = ['title', 'aria-label', 'alt', 'placeholder'];
  window.UI_I18N_REG = function(l, d){
    var ex = Object.create(null); for (var k in d.ex) if (Object.prototype.hasOwnProperty.call(d.ex, k)) ex[k] = d.ex[k];
    DICT[l] = { ex: ex, pat: (d.pat || []).map(function(p){ return [new RegExp(p[0]), p[1], p[2]]; }) };
    run();
  };
  function cur(){
    var l = document.documentElement.getAttribute('data-current');
    if (!l){ try { l = localStorage.getItem('bilim_lang_v1'); } catch(e){} }
    return l || 'ru';
  }
  function load(l){
    if (DICT[l] !== undefined || LOADING[l] || !base) return; LOADING[l] = 1;
    var s = document.createElement('script'); s.src = base + 'ui-' + l + '.js'; s.async = true;
    s.onerror = function(){ DICT[l] = null; }; document.head.appendChild(s);
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
        if (g){ var sub = d.ex[m[g]]; if (sub !== undefined) m[g] = sub; }
        r = d.pat[i][1].replace(/\$(\d)/g, function(_, k){ return m[+k] === undefined ? '' : m[+k]; }); break;
      }
    }
    if (r === undefined || r === t) return null;
    return str.match(/^\s*/)[0] + r + str.match(/\s*$/)[0];
  }
  function restore(){
    texts.forEach(function(v, n){ try { n.nodeValue = v.orig; } catch(e){} }); texts.clear();
    attrEls.forEach(function(e){ var o = e.__uiO; if (o){ for (var a in o){ try { e.setAttribute(a, o[a]); } catch(x){} } e.__uiO = null; } }); attrEls.clear();
  }
  function walk(root, d){
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null), n, list = [];
    while ((n = w.nextNode())){ var p = n.parentNode; if (p && !/^(SCRIPT|STYLE|NOSCRIPT|TEXTAREA)$/.test(p.nodeName)) list.push(n); }
    list.forEach(function(n){
      var rec = texts.get(n), v = n.nodeValue;
      if (rec && rec.out === v) return;
      var o = tr(v, d); if (o !== null){ texts.set(n, { orig: v, out: o }); n.nodeValue = o; }
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
