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
  var DICT = {}, LOADING = {}, PENDING = {}, texts = new Map(), attrEls = new Set(), busy = false, ATTRS = ['title', 'aria-label', 'alt', 'placeholder'];
  var FB = { fr: 'en', de: 'en' };   // французский и немецкий: чего нет в их словаре — берём из английского (пока перевод не дописан)
  var VER = 0;   // версия словарей: растёт при каждом пополнении, чтобы заново перевести уже переведённое (частично) более ранним пакетом
  window.UI_I18N_REG = function(l, d){   // можно вызывать несколько раз: пакеты дополняют словарь языка, а не заменяют его
    var cur0 = DICT[l] || { ex: Object.create(null), pat: [] };
    for (var k in d.ex) if (Object.prototype.hasOwnProperty.call(d.ex, k)) cur0.ex[k] = d.ex[k];
    (d.pat || []).forEach(function(p){ cur0.pat.push([new RegExp(p[0]), p[1], p[2]]); });
    DICT[l] = cur0; VER++;
    run();
  };
  /* Для игр: перевод одной строки (UI_I18N_LOOKUP) и ожидание, пока загрузятся все пакеты страницы (UI_I18N_WHEN) */
  window.UI_I18N_LOOKUP = function(l, str){ var d = DICT[l]; if (!d) return undefined; var r = d.ex[str]; if (r === undefined && d.fb) r = d.fb.ex[str]; return r; };
  window.UI_I18N_WHEN = function(l, cb){
    if (!l || l === 'ru'){ cb(); return; }
    var tries = 0; (function w(){ var d = DICT[l]; if ((d !== undefined && !PENDING[l]) || ++tries > 300) cb(); else { if (d === undefined) load(l); setTimeout(w, 50); } })();
  };
  function cur(){
    var l = document.documentElement.getAttribute('data-current');
    if (!l){ try { l = localStorage.getItem('bilim_lang_v1'); } catch(e){} }
    return l || 'ru';
  }
  /* Пакеты по классам: тексты уроков и игр лежат отдельно (ui-<язык>-g1.js — 1 класс), чтобы не грузить их на остальных страницах */
  var PACKS = [ [/\/grades\/grade-1(?:-kaz)?\//, 'g1'], [/\/grades\/grade-2(?:-kaz)?\//, 'g2'], [/\/grades\/grade-2(?:-kaz)?\/math\//, 'g2m'],
    [/\/grades\/grade-2(?:-kaz)?\/fizra\//, 'g2fizra'],
    [/\/grades\/grade-2(?:-kaz)?\/izo\//, 'g2izo'],
    [/\/grades\/grade-2(?:-kaz)?\/muzyka\//, 'g2muzyka'],
    [/\/grades\/grade-2(?:-kaz)?\/trud\//, 'g2trud'],
    [/\/grades\/grade-2(?:-kaz)?\/estestvo\//, 'g2estestvo'],
    [/\/grades\/grade-2(?:-kaz)?\/digital\//, 'g2digital'],
    [/\/grades\/grade-2(?:-kaz)?\/poznanie\//, 'g2poznanie'],
    [/\/grades\/grade-2(?:-kaz)?\/math\//, 'g2math'],
    [/\/grades\/grade-3(?:-kaz)?\/estestvo\//, 'g3est'],
    [/\/grades\/grade-3(?:-kaz)?\/poznanie\//, 'g3poz'],
    [/\/grades\/grade-3(?:-kaz)?\/izo\//, 'g3izo'],
    [/\/grades\/grade-3(?:-kaz)?\/muzyka\//, 'g3mus'],
    [/\/grades\/grade-3(?:-kaz)?\/trud\//, 'g3trud'],
    [/\/grades\/grade-3(?:-kaz)?\/fizra\//, 'g3fiz'],
    [/\/grades\/grade-3(?:-kaz)?\/digital\//, 'g3dig'],
    [/\/grades\/grade-[34](?:-kaz)?\/.*-course\.html$/, 'crsui'],
    [/\/grades\/grade-[34](?:-kaz)?\//, 'pz2eng'],
    [/\/grades\/grade-4(?:-kaz)?\//, 'g4'],
    [/\/(?:privacy\.html|gift\/)/, 'root'] ];
  /* Какие пакеты реально лежат в assets (ui-<язык>-<пакет>.js). Остальные не запрашиваем: иначе на каждой странице копятся лишние запросы с ошибкой 404.
     Добавили новый файл пакета — впишите его сюда. */
  var G2ALL = ['g2', 'g2m', 'g2fizra', 'g2izo', 'g2muzyka', 'g2trud', 'g2estestvo', 'g2digital', 'g2poznanie', 'g2math'];
  var AVAIL = { kz: ['g1', 'g4', 'root', 'g3est', 'g3poz', 'g3izo', 'g3mus', 'g3trud', 'g3fiz', 'g3dig', 'pz2eng', 'crsui'].concat(G2ALL), uz: ['g1', 'g4', 'root'], tg: ['g1', 'g4', 'root'], en: ['g4', 'root'], zh: ['g4', 'root'], ug: ['g4', 'root'], fr: [], de: [] };
  function load(l){
    if (DICT[l] !== undefined || LOADING[l] || !base) return; LOADING[l] = 1;
    var s = document.createElement('script'); s.src = base + 'ui-' + l + '.js'; s.async = true;
    s.onerror = function(){ DICT[l] = null; }; document.head.appendChild(s);
    PACKS.forEach(function(pk){
      if (!pk[0].test(location.pathname) || (AVAIL[l] || []).indexOf(pk[1]) < 0) return;
      var q = document.createElement('script'); q.src = base + 'ui-' + l + '-' + pk[1] + '.js'; q.async = true;
      PENDING[l] = (PENDING[l] || 0) + 1; q.onload = function(){ PENDING[l]--; }; q.onerror = function(){ PENDING[l]--; }; document.head.appendChild(q);
    });
  }
  function one(t, d){   // перевод одной фразы: точное совпадение, запасной вариант с точкой, затем шаблоны (undefined — не нашли)
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
        r = d.pat[i][1].replace(/\$(?:(\d)|\{(\d+)\})/g, function(_, a, b){ var v = m[+(a || b)]; return v === undefined ? '' : v; }); break;
      }
    }
    if (d.fb && r !== undefined && /[А-Яа-яЁё]/.test(r)){ var fx = one(t, d.fb); if (fx !== undefined) r = fx; }   // шаблон fr/de оставил русские слова — берём английский вариант целиком
    if (r === undefined && d.fb) r = one(t, d.fb);
    return r;
  }
  function tr(str, d){
    var t = str.replace(/\s+/g, ' ').trim(); if (!t) return null;
    var r = one(t, d);
    if (r === undefined && t.length < 600 && /[.!?…] \S/.test(t)){   // несколько предложений подряд (озвучка Барсика склеивает фразы): переводим по предложениям, но только если переведены ВСЕ
      var parts = t.replace(/([.!?…]) (?=\S)/g, '$1\u0001').split('\u0001'), out = [];
      for (var j = 0; j < parts.length; j++){ var x = one(parts[j], d); if (x === undefined){ out = null; break; } out.push(x); }
      if (out) r = out.join(' ');
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
      var d = DICT[l], fbl = FB[l];
      if (fbl){ load(fbl); if (d === undefined) load(l); if (!d) d = DICT[l] = { ex: Object.create(null), pat: [] }; d.fb = DICT[fbl] || null; }
      else { if (d === undefined){ load(l); return; } if (!d) return; }
      if (document.body) walk(document.body, d);
      var t = tr(document.title, d); if (t !== null) document.title = t;
    } finally { busy = false; }
  }
  var timer = null, firstAt = 0;   /* перевод не откладывается дольше ~120 мс, даже если страница постоянно меняется (конфетти, анимации) */
  function later(){ var now = Date.now(); if (!firstAt) firstAt = now; clearTimeout(timer); timer = setTimeout(function(){ firstAt = 0; run(); }, now - firstAt > 100 ? 0 : 50); }
  function init(){
    run();
    try {
      new MutationObserver(later).observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ATTRS });
      new MutationObserver(function(){ restore(); run(); }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-current'] });
    } catch(e){}
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
