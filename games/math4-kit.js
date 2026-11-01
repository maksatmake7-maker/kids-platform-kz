/* Математика, 4 класс — общие помощники для игр math4-*. Подключается после pz2-kit.js.
   M4.init(C, N) даёт игре: засеянный генератор (rnd, pick, shuffle) — у каждого уровня конечный набор из N заданий,
   поэтому Барсик может озвучить каждое; f(n) — число с пробелами по разрядам; words(n) — число словами;
   near(ans, ex) — варианты ответа-числа; ch(sig, o) — вопрос с вариантами; levels([L1, L2, L3]) — уровни игры. */
(function(){
if(window.M4) return;
var NB = ' ';
var U = ['', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять', 'десять', 'одиннадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать'];
var T = ['', '', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто'];
var H = ['', 'сто', 'двести', 'триста', 'четыреста', 'пятьсот', 'шестьсот', 'семьсот', 'восемьсот', 'девятьсот'];
function pl(n, a, b, c){ var m = n % 100, k = n % 10; if(m > 10 && m < 20) return c; if(k === 1) return a; if(k > 1 && k < 5) return b; return c; }
function f(n){ var neg = n < 0, s = String(Math.abs(Math.round(n))).replace(/\B(?=(\d{3})+(?!\d))/g, NB); return (neg ? '−' : '') + s; }
function plain(t){ return String(t).replace(/(\d) (?=\d{3})/g, '$1').replace(/ /g, ' '); }
function tri(n, fem){
  var s = [], h = Math.floor(n / 100), r = n % 100;
  if(h) s.push(H[h]);
  if(r >= 20){ s.push(T[Math.floor(r / 10)]); r %= 10; }
  if(r){ var w = U[r]; if(fem && r === 1) w = 'одна'; if(fem && r === 2) w = 'две'; s.push(w); }
  return s.join(' ');
}
function words(n){
  if(n === 0) return 'ноль';
  var out = [], mil = Math.floor(n / 1000000), th = Math.floor(n / 1000) % 1000, rest = n % 1000;
  if(mil) out.push(tri(mil) + ' ' + pl(mil, 'миллион', 'миллиона', 'миллионов'));
  if(th) out.push(tri(th, true) + ' ' + pl(th, 'тысяча', 'тысячи', 'тысяч'));
  if(rest) out.push(tri(rest));
  return out.join(' ');
}
var DEN = { 2:['вторая', 'вторых'], 3:['третья', 'третьих'], 4:['четвёртая', 'четвёртых'], 5:['пятая', 'пятых'], 6:['шестая', 'шестых'], 7:['седьмая', 'седьмых'], 8:['восьмая', 'восьмых'], 9:['девятая', 'девятых'], 10:['десятая', 'десятых'], 11:['одиннадцатая', 'одиннадцатых'], 12:['двенадцатая', 'двенадцатых'], 100:['сотая', 'сотых'] };
/* дробь словами: fw(3, 7) → «три седьмых», fw(1, 4) → «одна четвёртая» */
function fw(n, d){ var D = DEN[d] || [d + '-я', d + '-х']; if(n === 1) return 'одна ' + D[0]; var w = words(n); if(n % 10 === 2 && n % 100 !== 12) w = w.replace(/два$/, 'две'); return w + ' ' + D[1]; }
function gcd(a, b){ return b ? gcd(b, a % b) : Math.abs(a); }

function rngObj(){
  var st = 1;
  function nx(){ st |= 0; st = st + 0x6D2B79F5 | 0; var t = Math.imul(st ^ st >>> 15, 1 | st); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }
  return {
    seed:function(s){ st = (Math.imul(s + 7, 2654435761) >>> 0) || 1; nx(); nx(); },
    rnd:function(a, b){ return a + Math.floor(nx() * (b - a + 1)); },
    pick:function(a){ return a[Math.floor(nx() * a.length)]; },
    shuffle:function(a){ a = a.slice(); for(var i = a.length - 1; i > 0; i--){ var j = Math.floor(nx() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  };
}

function init(C, N){
  N = N || 40;
  var R = rngObj(), G = C.G, S = C.S, cur = 0;
  var K = { fw:fw, R:R, rnd:R.rnd, pick:R.pick, shuffle:R.shuffle, G:G, M:C.M, f:f, plain:plain, words:words, pl:pl, gcd:gcd };
  /* варианты ответа — числа: сначала «типичные ошибки» ex, потом числа рядом по разрядам */
  K.near = function(ans, ex, fmt){
    fmt = fmt || f; var out = [ans], seen = {}, c = [];
    seen[ans] = 1;
    (ex || []).forEach(function(x){ if(x > 0 && !seen[x] && x === Math.round(x)){ seen[x] = 1; out.push(x); } });
    var steps = [1, 10, 100, 1000, 10000, 100000].filter(function(s){ return s <= Math.max(1, ans / 5); });
    steps.forEach(function(s){ c.push(ans + s, ans - s); });
    c.push(ans + 2, ans - 2); if(ans > 20) c.push(ans * 10); if(ans % 10 === 0 && ans >= 100) c.push(ans / 10);
    R.shuffle(c).forEach(function(x){ if(out.length < 4 && x > 0 && !seen[x] && x === Math.round(x)){ seen[x] = 1; out.push(x); } });
    for(var k = 3; out.length < 4; k++) if(!seen[ans + k]){ seen[ans + k] = 1; out.push(ans + k); }
    return out.slice(0, 4).map(fmt);
  };
  /* вопрос с вариантами. o: q, expr, opts(строки), ans(строка), hint(html), plain(для голоса), say(текст для голоса вместо q), field, layout */
  K.ch = function(sig, o){
    var opts = o.opts.map(String), ans = String(o.ans);
    if(opts.indexOf(ans) < 0) opts.unshift(ans);
    var seen = {}; opts = opts.filter(function(x){ if(seen[x]) return false; seen[x] = 1; return true; });
    if(opts.length > 4){ var rest = R.shuffle(opts.filter(function(x){ return x !== ans; })).slice(0, 3); opts = [ans].concat(rest); }
    var sayT = plain(o.say !== undefined ? o.say : o.q), pl2 = plain(o.plain || (o.hint ? o.hint.replace(/<br>/g, ' ').replace(/<[^>]+>/g, '') : ''));
    var spec = { q:o.q, say:[G.say(sayT)], opts:opts, ans:ans, layout:o.layout || (opts.every(function(x){ return x.length <= 12; }) ? 'wide' : 'wide'), hint:o.hint, hintPlain:pl2 };
    if(o.expr) spec.expr = o.expr;
    if(o.field) spec.field = o.field;
    if(o.hintExpr) spec.hintExpr = o.hintExpr;
    return S('m4' + cur + '_' + sig, G.choice(spec));
  };
  K.tf = function(sig, q, truth, hint, extra){
    extra = extra || {};
    return K.ch(sig, { q:q, say:q + ' Верно или неверно?', opts:['Верно', 'Неверно'], ans:truth ? 'Верно' : 'Неверно', hint:hint, field:extra.field, expr:extra.expr });
  };
  K.levels = function(fns){
    return fns.map(function(fn, li){ return function(){ cur = li * 1000 + 1 + Math.floor(Math.random() * N); R.seed(cur); return fn(); }; });
  };
  return K;
}
window.M4 = { init:init, fw:fw, f:f, plain:plain, words:words, pl:pl, gcd:gcd, NB:NB };
})();
