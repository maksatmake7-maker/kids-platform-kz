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
    [/\/grades\/grade-1(?:-kaz)?\/english\//, 'g1eng'],
    [/\/grades\/grade-3(?:-kaz)?\/estestvo\//, 'g3est'],
    [/\/grades\/grade-3(?:-kaz)?\/poznanie\//, 'g3poz'],
    [/\/grades\/grade-3(?:-kaz)?\/izo\//, 'g3izo'],
    [/\/grades\/grade-3(?:-kaz)?\/muzyka\//, 'g3mus'],
    [/\/grades\/grade-3(?:-kaz)?\/trud\//, 'g3trud'],
    [/\/grades\/grade-3(?:-kaz)?\/fizra\//, 'g3fiz'],
    [/\/grades\/grade-3(?:-kaz)?\/digital\//, 'g3dig'],
    [/\/grades\/grade-3(?:-kaz)?\/math\//, 'g3math'],
    [/\/grades\/grade-3(?:-kaz)?\/english\//, 'g3eng'],
    [/\/grades\/grade-4(?:-kaz)?\/english\//, 'g4eng'],
    [/\/grades\/grade-[34](?:-kaz)?\/.*-course\.html$/, 'crsui'],
    [/\/grades\/grade-[34](?:-kaz)?\//, 'pz2eng'],
    [/\/grades\/grade-4(?:-kaz)?\/fizra\//, 'g4fiz'],
    [/\/grades\/grade-4(?:-kaz)?\/muzyka\//, 'g4mus'],
    [/\/grades\/grade-4(?:-kaz)?\/trud\//, 'g4trud'],
    [/\/grades\/grade-4(?:-kaz)?\/izo\//, 'g4izo'],
    [/\/grades\/grade-4(?:-kaz)?\/digital\//, 'g4dig'],
    [/\/grades\/grade-4(?:-kaz)?\/estestvo\//, 'g4est'],
    [/\/grades\/grade-4(?:-kaz)?\/poznanie\//, 'g4poz'],
    [/\/grades\/grade-4(?:-kaz)?\/math\//, 'g4math'],
    [/\/grades\/grade-4(?:-kaz)?\//, 'g4'],
    [/\/(?:privacy\.html|gift\/)/, 'root'] ];
  /* Какие пакеты реально лежат в assets (ui-<язык>-<пакет>.js). Остальные не запрашиваем: иначе на каждой странице копятся лишние запросы с ошибкой 404.
     Добавили новый файл пакета — впишите его сюда. */
  var G2ALL = ['g2', 'g2m', 'g2fizra', 'g2izo', 'g2muzyka', 'g2trud', 'g2estestvo', 'g2digital', 'g2poznanie', 'g2math'];
  var AVAIL = { kz: ['g1', 'g1eng', 'g4', 'root', 'g3est', 'g3poz', 'g3izo', 'g3mus', 'g3trud', 'g3fiz', 'g3dig', 'g3math', 'g3eng', 'g4eng', 'g4fiz', 'g4mus', 'g4trud', 'g4izo', 'g4dig', 'g4est', 'g4poz', 'g4math', 'pz2eng', 'crsui'].concat(G2ALL), uz: ['g1', 'g4', 'root', 'g2', 'g2izo', 'g2trud', 'g2fizra', 'g2muzyka'], tg: ['g1', 'g4', 'root', 'g2', 'g2izo', 'g2trud', 'g2fizra', 'g2muzyka'], en: ['g1', 'g4', 'root'], zh: ['g1', 'g4', 'root'], ug: ['g1', 'g4', 'root'], fr: ['g1'], de: ['g1'] };
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
  /* Казахские падежные окончания для чисел (по последнему слову прочтения числа): «5» + dat → «5-ке», «20» + abl → «20-дан» */
  var KZW = { 1:['f','R'], 2:['f','V'], 3:['f','U'], 4:['f','U'], 5:['f','U'], 6:['b','V'], 7:['f','V'], 8:['f','Z'], 9:['b','Z'],
    10:['b','N'], 20:['b','V'], 30:['b','Z'], 40:['b','U'], 50:['f','W'], 60:['b','U'], 70:['f','U'], 80:['f','N'], 90:['b','N'], 100:['f','Z'], 1000:['b','N'], 1000000:['b','N'], 0:['f','R'] };
  function kzNum(v, cs){
    var vv = v.replace(/ /g, ''); if (!/^\d+$/.test(vv)) return undefined;   // «9 248 140» — пробелы между классами не мешают
    var n = parseInt(vv, 10), key;
    if (n === 0) key = 0; else if (n % 10) key = n % 10; else if (n % 100) key = n % 100; else if (n % 1000) key = 100; else if (n % 1000000) key = 1000; else key = 1000000;
    var w = KZW[key], f = w[0] === 'f', t = w[1], sf;
    if (cs === 'dat') sf = (t === 'U' ? (f ? 'ке' : 'қа') : (f ? 'ге' : 'ға'));
    else if (cs === 'abl') sf = (t === 'U' ? (f ? 'тен' : 'тан') : t === 'N' ? (f ? 'нен' : 'нан') : (f ? 'ден' : 'дан'));
    else if (cs === 'loc') sf = (t === 'U' ? (f ? 'те' : 'та') : (f ? 'де' : 'да'));
    else if (cs === 'gen') sf = (t === 'U' ? (f ? 'тің' : 'тың') : (t === 'V' || t === 'N') ? (f ? 'нің' : 'ның') : (f ? 'дің' : 'дың'));
    else return undefined;
    return v + '-' + sf;
  }
  /* Числа прописью: «тридцать пять миллионов» → число → казахские слова («отыз бес миллион») */
  var RUW = { 'ноль':0, 'один':1, 'одна':1, 'одно':1, 'одну':1, 'одном':1, 'одного':1, 'два':2, 'две':2, 'три':3, 'четыре':4, 'пять':5, 'шесть':6, 'семь':7, 'восемь':8, 'девять':9, 'десять':10,
    'одиннадцать':11, 'двенадцать':12, 'тринадцать':13, 'четырнадцать':14, 'пятнадцать':15, 'шестнадцать':16, 'семнадцать':17, 'восемнадцать':18, 'девятнадцать':19,
    'двадцать':20, 'тридцать':30, 'сорок':40, 'пятьдесят':50, 'шестьдесят':60, 'семьдесят':70, 'восемьдесят':80, 'девяносто':90,
    'сто':100, 'двести':200, 'триста':300, 'четыреста':400, 'пятьсот':500, 'шестьсот':600, 'семьсот':700, 'восемьсот':800, 'девятьсот':900 };
  var KZU = ['нөл', 'бір', 'екі', 'үш', 'төрт', 'бес', 'алты', 'жеті', 'сегіз', 'тоғыз'], KZT = ['', 'он', 'жиырма', 'отыз', 'қырық', 'елу', 'алпыс', 'жетпіс', 'сексен', 'тоқсан'];
  function kzW3(n){
    var h = Math.floor(n / 100), t = Math.floor(n % 100 / 10), u = n % 10, o = [];
    if (h) o.push(h > 1 ? KZU[h] + ' жүз' : 'жүз'); if (t) o.push(KZT[t]); if (u) o.push(KZU[u]);
    return o.join(' ');
  }
  function kzNW(s){
    var w = s.split(' '), total = 0, cur = 0;
    for (var i = 0; i < w.length; i++){
      var x = w[i];
      if (RUW[x] !== undefined) cur += RUW[x];
      else if (/^тысяч/.test(x)){ total += (cur || 1) * 1000; cur = 0; }
      else if (/^миллион/.test(x)){ total += (cur || 1) * 1000000; cur = 0; }
      else return undefined;
    }
    total += cur;
    var mil = Math.floor(total / 1000000), th = Math.floor(total % 1000000 / 1000), rest = total % 1000, parts = [];
    if (mil) parts.push(kzW3(mil % 1000) + ' миллион'); if (th) parts.push(kzW3(th) + ' мың');
    if (rest || !parts.length) parts.push(rest ? kzW3(rest) : 'нөл');
    return parts.join(' ');
  }
  function kzList(v, d){   // «сова, пчела и орёл» → переводим каждое слово по словарю
    var parts = v.split(/(, | и )/), out = [];
    for (var i = 0; i < parts.length; i++){
      if (i % 2){ out.push(parts[i] === ' и ' ? ' және ' : ', '); continue; }
      var x = d.ex[parts[i]]; out.push(x === undefined ? parts[i] : x);
    }
    return out.join('');
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
          var sub = pre ? d.ex[pre + m[k]] : undefined; if (sub === undefined) sub = d.ex[m[k]];
          if (sub === undefined && pre){ var tg = pre.slice(0, -1);   // вычисляемые теги: падежи казахских числительных, список слов, вложенная фраза
            if (/^n(dat|abl|loc|gen)$/.test(tg)) sub = kzNum(m[k], tg.slice(1));
            else if (tg === 'ls') sub = kzList(m[k], d);
            else if (tg === 'nw') sub = kzNW(m[k]);
            else if (tg === 'tr'){ var sx = tr(m[k], d); if (sx !== null) sub = sx; } }
          if (sub !== undefined) m[k] = sub; }); }
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
      for (var j = 0; j < parts.length; j++){ var x = one(parts[j], d); if (x === undefined){ if (!/[А-Яа-яЁё]/.test(parts[j])){ out.push(parts[j]); continue; } out = null; break; } out.push(x); }   // части без букв (формулы «375 + 95 = 470») оставляем как есть
      if (out) r = out.join(' ');
    }
    if (r === undefined && /<br\s*\/?>/i.test(t) && t.length < 3000){   // разбор из нескольких строк через <br>: переводим каждую строку отдельно (строки без букв — формулы — оставляем как есть)
      var segs = t.split(/(<br\s*\/?>)/i), out2 = [], ok = true, any = false;
      for (var q2 = 0; q2 < segs.length && ok; q2++){
        var sg = segs[q2];
        if (q2 % 2 || !/[А-Яа-яЁё]/.test(sg.replace(/<[^>]+>/g, ''))){ out2.push(sg); continue; }
        var pre2 = '', post2 = '', mm = /^(<b>)(.*)(<\/b>)$/.exec(sg); if (mm){ pre2 = mm[1]; post2 = mm[3]; sg = mm[2]; }
        var dec = sg.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&'), x2 = tr(dec, d);
        if (x2 === null){ ok = false; break; }
        out2.push(pre2 + x2.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') + post2); any = true;
      }
      if (ok && any) r = out2.join('');
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
