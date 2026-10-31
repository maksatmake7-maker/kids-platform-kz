/* Математика, 3 класс — «Время: секунды, минуты, часы, сутки, год, век» (цели 3.3.3.1–3.3.3.3). */
(function(){
PZ2.define({
  key:"math3time", theme:'sky', icons:[], groups:[], mcq:[], tf:[],
  custom:function(C){
    var M = C.M, G = C.G, S = C.S, pick = C.pick, shuffle = C.shuffle, rnd = C.rnd, P = G.plural;
    function nopts(ans, ex){ var c = shuffle([ans + 1, ans - 1, ans + 10, ans - 10, ans * 2, ans + 60, ans - 60].concat(ex || []).filter(function(x){ return x > 0 && x !== ans; })), out = [ans]; c.forEach(function(x){ if(out.length < 4 && out.indexOf(x) < 0) out.push(x); }); return out.map(String); }
    function tm(h, m){ return h + ':' + (m < 10 ? '0' : '') + m; }
    function words(h, m){ return h + ' ' + P(h, 'час', 'часа', 'часов') + (m ? ' ' + m + ' ' + P(m, 'минута', 'минуты', 'минут') : ''); }
    function topts(h, m){ var c = [tm(h, (m + 30) % 60), tm(h % 12 + 1, m), tm(m / 5 === 0 ? 12 : Math.max(1, m / 5), h * 5 % 60), tm(h, (m + 5) % 60), tm(h, (m + 55) % 60)].filter(function(x){ return x !== tm(h, m); }), out = [tm(h, m)]; shuffle(c).forEach(function(x){ if(out.length < 4 && out.indexOf(x) < 0) out.push(x); }); return out; }
    /* ⭐ единицы времени */
    function L1(){
      var k = pick(['min', 'hour', 'day', 'week', 'month', 'century']), n = rnd(2, 9);
      if(k === 'min') return S('1a' + n, G.choice({ q:'Сколько секунд в ' + n + ' мин? В одной минуте 60 секунд.', opts:nopts(n * 60, [n * 100]), ans:String(n * 60), layout:'wide', hint:n + ' · 60 = ' + n * 60 + ' с', hintPlain:'В одной минуте шестьдесят секунд. ' + n + ' умножить на шестьдесят будет ' + n * 60 + '.' }));
      if(k === 'hour') return S('1b' + n, G.choice({ q:'Сколько минут в ' + n + ' ч? В одном часе 60 минут.', opts:nopts(n * 60, [n * 100]), ans:String(n * 60), layout:'wide', hint:n + ' · 60 = ' + n * 60 + ' мин', hintPlain:'В одном часе шестьдесят минут. ' + n + ' умножить на шестьдесят будет ' + n * 60 + '.' }));
      if(k === 'day') return S('1c' + n, G.choice({ q:'Сколько часов в ' + n + ' сут? В одних сутках 24 часа.', opts:nopts(n * 24, [n * 20]), ans:String(n * 24), layout:'wide', hint:n + ' · 24 = ' + n * 24 + ' ч', hintPlain:'В одних сутках двадцать четыре часа. ' + n + ' умножить на двадцать четыре будет ' + n * 24 + '.' }));
      if(k === 'week') return S('1d' + n, G.choice({ q:'Сколько суток в ' + n + ' ' + P(n, 'неделе', 'неделях', 'неделях') + '? В неделе 7 суток.', opts:nopts(n * 7, [n * 5]), ans:String(n * 7), layout:'wide', hint:n + ' · 7 = ' + n * 7 + ' сут', hintPlain:'В неделе семь суток. ' + n + ' умножить на семь будет ' + n * 7 + '.' }));
      if(k === 'month') return S('1e' + n, G.choice({ q:'Сколько месяцев в ' + n + ' годах? В году 12 месяцев.', opts:nopts(n * 12, [n * 10]), ans:String(n * 12), layout:'wide', hint:n + ' · 12 = ' + n * 12 + ' мес', hintPlain:'В году двенадцать месяцев. ' + n + ' умножить на двенадцать будет ' + n * 12 + '.' }));
      return S('1f' + n, G.choice({ q:'Сколько лет в одном веке?', opts:['100', '10', '1000', '50'], ans:'100', layout:'wide', hint:'В одном веке 100 лет.', hintPlain:'В одном веке сто лет.' }));
    }
    /* ⭐⭐ часы, переводы */
    function L2(){
      var k = pick(['clock', 'clock', 'clock', 'conv', 'mixed']);
      if(k === 'clock'){ var h = rnd(1, 12), m = pick([0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 7, 12, 23, 38, 52]);
        return S('2c' + h + '_' + m, G.choice({ q:'Который час показывают часы?', opts:topts(h, m), ans:tm(h, m), layout:'wide', field:function(el){ el.innerHTML = G.clock(h, m, { size:170 }); },
          hint:'Короткая стрелка показывает часы: ' + h + '. Длинная показывает минуты: ' + m + '. Это ' + tm(h, m) + '.', hintPlain:'Короткая стрелка показывает часы: ' + h + '. Длинная показывает минуты: ' + m + '. Получается ' + words(h, m) + '.' })); }
      if(k === 'conv'){ var hh = rnd(1, 4), mm = pick([10, 15, 20, 30, 40, 45]), tot = hh * 60 + mm;
        return S('2v' + hh + '_' + mm, G.choice({ q:'Сколько минут в ' + words(hh, mm) + '?', opts:nopts(tot, [hh * 100 + mm]), ans:String(tot), layout:'wide', hint:hh + ' ч = ' + hh * 60 + ' мин. Прибавляем ' + mm + ': ' + tot + ' мин', hintPlain:words(hh, 0) + ' это ' + hh * 60 + ' минут. Прибавляем ' + mm + '. Получается ' + tot + '.' })); }
      var mn = rnd(1, 4), sec = pick([10, 15, 20, 30, 40, 45]); return S('2m' + mn + '_' + sec, G.choice({ q:'Сколько секунд в ' + mn + ' мин ' + sec + ' с?', opts:nopts(mn * 60 + sec, [mn * 100 + sec]), ans:String(mn * 60 + sec), layout:'wide', hint:mn + ' мин = ' + mn * 60 + ' с. Прибавляем ' + sec + ': ' + (mn * 60 + sec) + ' с', hintPlain:mn + ' минут это ' + mn * 60 + ' секунд. Прибавляем ' + sec + '. Получается ' + (mn * 60 + sec) + '.' }));
    }
    /* ⭐⭐⭐ длительность, начало и конец, века */
    function L3(){
      var k = pick(['end', 'dur', 'cent', 'days', 'start', 'lesson']);
      if(k === 'end'){ var h = rnd(8, 15), m = pick([0, 15, 30]), dm = pick([20, 35, 40, 45, 50]), tot = h * 60 + m + dm, eh = Math.floor(tot / 60), em = tot % 60;
        return S('3e' + h + m + dm, G.choice({ q:'Мультфильм начался в ' + tm(h, m) + ' и шёл ' + dm + ' минут. Когда он закончился?', say:[G.say('Мультфильм начался в ' + words(h, m) + ' и шёл ' + dm + ' минут. Когда он закончился?')], opts:topts(eh, em), ans:tm(eh, em), layout:'wide', hint:tm(h, m) + ' + ' + dm + ' мин = ' + tm(eh, em), hintPlain:'К началу прибавляем ' + dm + ' минут. Получается ' + words(eh, em) + '.' })); }
      if(k === 'dur'){ var h1 = rnd(8, 14), m1 = pick([0, 10, 20, 30]), d = pick([25, 30, 40, 45, 55]), t2 = h1 * 60 + m1 + d, h2 = Math.floor(t2 / 60), m2 = t2 % 60;
        return S('3d' + h1 + m1 + d, G.choice({ q:'Урок начался в ' + tm(h1, m1) + ' и закончился в ' + tm(h2, m2) + '. Сколько минут шёл урок?', say:[G.say('Урок начался в ' + words(h1, m1) + ' и закончился в ' + words(h2, m2) + '. Сколько минут шёл урок?')], opts:nopts(d, [d + 10, d - 5].filter(function(x){ return x > 0; })), ans:String(d), layout:'wide', hint:'От ' + tm(h1, m1) + ' до ' + tm(h2, m2) + ' проходит ' + d + ' минут.', hintPlain:'Считаем, сколько минут прошло между началом и концом. Получается ' + d + '.' })); }
      if(k === 'cent'){ var y = pick([1991, 2005, 1950, 1865, 2023, 1700, 1812]), c = Math.ceil(y / 100), ro = { 17:'XVII', 18:'XVIII', 19:'XIX', 20:'XX', 21:'XXI' }[c];
        return S('3c' + y, G.choice({ q:'В каком веке был ' + y + ' год?', opts:[c + '-й век', (c - 1) + '-й век', (c + 1) + '-й век', (c + 2) + '-й век'], ans:c + '-й век', layout:'wide', hint:'1-й век — годы с 1 по 100, 2-й — с 101 по 200 и так далее. Год ' + y + ' — это ' + c + '-й век.', hintPlain:'Чтобы найти век, смотрим на сотни: год ' + y + ' относится к ' + c + '-му веку.' })); }
      if(k === 'days'){ var mo = pick([['апрель', 30], ['июль', 31], ['июнь', 30], ['март', 31], ['сентябрь', 30], ['декабрь', 31]]);
        return S('3m' + mo[0], G.choice({ q:'Сколько дней в месяце «' + mo[0] + '»?', opts:shuffle(['30', '31', '28', '29']), ans:String(mo[1]), layout:'wide', hint:'В месяце «' + mo[0] + '» ' + mo[1] + ' дней.', hintPlain:'В месяце ' + mo[0] + ' ' + mo[1] + ' дней.' })); }
      if(k === 'start'){ var h3 = rnd(9, 16), m3 = pick([0, 20, 40]), d3 = pick([30, 40, 45]), t3 = h3 * 60 + m3 - d3, sh = Math.floor(t3 / 60), sm = t3 % 60;
        return S('3s' + h3 + m3 + d3, G.choice({ q:'Кино закончилось в ' + tm(h3, m3) + ' и шло ' + d3 + ' минут. Когда оно началось?', say:[G.say('Кино закончилось в ' + words(h3, m3) + ' и шло ' + d3 + ' минут. Когда оно началось?')], opts:topts(sh, sm), ans:tm(sh, sm), layout:'wide', hint:tm(h3, m3) + ' − ' + d3 + ' мин = ' + tm(sh, sm), hintPlain:'От конца отнимаем ' + d3 + ' минут. Получается ' + words(sh, sm) + '.' })); }
      var w = rnd(2, 6), tx = 'За неделю Бекзат читает по ' + (w * 10) + ' минут каждый день. Сколько минут он читает за неделю?';
      return S('3l' + w, G.choice({ q:tx, say:[G.say(tx)], opts:nopts(w * 70, [w * 10]), ans:String(w * 70), layout:'wide', hint:'В неделе 7 дней: ' + w * 10 + ' · 7 = ' + w * 70 + ' мин', hintPlain:'В неделе семь дней. ' + w * 10 + ' умножить на семь будет ' + w * 70 + '.' }));
    }
    return [L1, L2, L3];
  }
});
})();
