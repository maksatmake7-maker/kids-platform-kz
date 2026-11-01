/* ===== Білім Аралы — набор для игр «Английский язык», 3 класс (A1.1, приказ №399, приложение 23) =====
   Барсик объясняет по-русски, английские слова и фразы звучат английским клипом
   (en:true, файл assets/audio/barsik/en/f_g2e_<хеш>.mp3). Движок — games/pz2-kit.js (подключается на странице раньше).

   ENG3.define({
     key:'eng3greet', theme:'garden',
     groups:[ { k, name, c:'green', words:[ [english, русское], … ] }, … ],   // темы: перевод, корзины, лишнее слово
     pairs:[ [english, русское, противоположное, русское], … ],              // противоположные слова
     fills:[ { lv:1|2|3, q:'вопрос по-русски', pre:'начало', right:'верное', wrong:['неверное',…], post:'конец', ru:'перевод целого', hint:'правило по-русски' }, … ],
     sound:[ [word, перевод, буква, [похожие буквы…], номер буквы?, уровень?], … ],
     order:[ [верное предложение, [неверные…], перевод, правило по-русски], … ],
     tf:[ [утверждение по-русски, true|false, разбор], … ]   // английские слова в {фигурных скобках} произносит английский голос
   } */
(function(){
  if(window.ENG3) return;
  function esc(s){ return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
  function hsh(s){ var x = 5381; for(var i = 0; i < s.length; i++) x = ((x << 5) + x + s.charCodeAt(i)) | 0; return (x >>> 0).toString(36); }
  function en(t){ return { id:'f_g2e_' + hsh(t), text:t, en:true }; }
  function same(a, b){ return String(a).toLowerCase() === String(b).toLowerCase(); }

  function define(spec){
    PZ2.define({ key:spec.key, theme:spec.theme || 'meadow', icons:[], custom:function(C){ return build(C, spec); } });
  }

  function build(C, S0){
    var M = C.M, G = C.G, S = C.S, pick = C.pick, shuffle = C.shuffle, rnd = C.rnd;
    function big(t){ var n = String(t).length, fs = n > 30 ? 1.2 : n > 16 ? 1.7 : n > 10 ? 2.2 : 3;
      return '<span style="font:800 ' + fs + 'rem/1.2 \'Baloo 2\',sans-serif;color:#25324A;display:block;max-width:34rem;margin:0 auto">' + esc(t) + '</span>'; }
    var GR = S0.groups || [], PA = S0.pairs || [], FL = S0.fills || [], SO = S0.sound || [], OR = S0.order || [], TF = S0.tf || [];
    var W = [];
    GR.forEach(function(g){ g.words.forEach(function(w){ W.push({ en:w[0], ru:w[1], g:g }); }); });
    PA.forEach(function(p){ W.push({ en:p[0], ru:p[1], g:null }); W.push({ en:p[2], ru:p[3], g:null }); });
    function others(w, n, key){ return shuffle(W.filter(function(x){ return !same(x.ru, w.ru) && !same(x.en, w.en); })).slice(0, n).map(function(x){ return x[key]; }); }
    function hintW(w){ return { hintSay:[en(w.en), G.say(w.ru + '.')], hint:G.hintCard(big(w.en), '<b>' + esc(w.en) + '</b> — ' + esc(w.ru)) }; }

    /* слово: слышу по-английски → перевод */
    function w2r(){
      var w = pick(W), o = [w.ru].concat(others(w, 2, 'ru'));
      return S('w2r' + w.en, Object.assign(G.choice({ q:'Что значит это слово?', say:[G.say('Послушай слово.'), en(w.en)], opts:o, ans:w.ru, layout:'card', expr:big(w.en) }), hintW(w), { echo:[en(w.en)] }));
    }
    /* слово: вижу по-русски → английское */
    function r2w(){
      var w = pick(W), o = [w.en].concat(others(w, 2, 'en'));
      return S('r2w' + w.en, Object.assign(G.choice({ q:'Как это сказать по-английски?', say:[G.say('Как по-английски: ' + w.ru + '?')], opts:o, ans:w.en, layout:'wide', expr:big(w.ru) }), hintW(w), { echo:[en(w.en)] }));
    }
    /* верно ли переведено */
    function tfw(){
      var w = pick(W), truth = Math.random() < .5, ru = truth ? w.ru : others(w, 1, 'ru')[0];
      return S('tw' + w.en + ru, Object.assign(G.choice({ q:'«' + w.en + '» — это «' + ru + '»', say:[G.say('Слово'), en(w.en), G.say('значит: ' + ru + '. Верно или неверно?')], opts:['Верно', 'Неверно'], ans:truth ? 'Верно' : 'Неверно', layout:'wide', expr:big(w.en) }),
        hintW(w), { echo:[en(w.en)] }));
    }
    /* разложить по темам */
    var COLN = ['green', 'orange', 'blue'];
    function sortT(){
      var pool = GR.filter(function(g){ return g.words.length >= 3; });
      if(pool.length < 2) return w2r();
      var gs = shuffle(pool).slice(0, Math.min(3, pool.length)), items = [];
      gs.forEach(function(g, i){ g._c = PZ2.COL[g.c || COLN[i % 3]] || PZ2.COL.blue; shuffle(g.words).slice(0, gs.length === 2 ? 3 : 2).forEach(function(w){ items.push({ k:g.k, h:esc(w[0]) }); }); });
      return S('s' + gs.map(function(g){ return g.k; }).sort().join('') + rnd(1, 99999), M.sortTask({ wide:true, items:shuffle(items), say:[G.say('Разложи слова по темам.')], cap:'Выбери слово, потом корзину',
        buckets:gs.map(function(g){ return { k:g.k, name:g.name, icon:'', c1:g._c[0], c2:g._c[1] }; }), hintSay:[G.say('Подумай, к какой теме относится слово. Подсказка покажет, какие слова куда идут.')] }));
    }
    /* лишнее слово */
    function odd(){
      var pool = GR.filter(function(g){ return g.words.length >= 3; });
      if(pool.length < 2) return tfw();
      var g = pick(pool), h = pick(pool.filter(function(x){ return x !== g; })), three = shuffle(g.words).slice(0, 3), one = pick(h.words), all = shuffle(three.concat([one]));
      return S('od' + all.map(function(w){ return w[0]; }).sort().join(''), Object.assign(G.choice({ q:'Какое слово лишнее?', say:[G.say('Какое слово лишнее?')].concat(all.map(function(w){ return en(w[0]); })), opts:all.map(function(w){ return w[0]; }), ans:one[0], layout:'wide' }),
        { echo:[en(one[0])], hintSay:[en(one[0]), G.say('Это слово не из темы: ' + g.name + '.')], hint:G.hintCard(big(one[0]), '<b>' + esc(one[0]) + '</b> — ' + esc(one[1]) + '<br>Остальные слова: ' + esc(g.name)) }));
    }
    /* антонимы */
    function anton(){
      var p = pick(PA), fl = Math.random() < .5, a = fl ? [p[2], p[3]] : [p[0], p[1]], b = fl ? [p[0], p[1]] : [p[2], p[3]];
      var wr = shuffle(PA.filter(function(x){ return x !== p; })).slice(0, 2).map(function(x){ return Math.random() < .5 ? x[0] : x[2]; });
      return S('an' + a[0], Object.assign(G.choice({ q:'Найди слово с противоположным значением', say:[G.say('Найди слово с противоположным значением.'), en(a[0])], opts:[b[0]].concat(wr), ans:b[0], layout:'wide', expr:big(a[0]) }),
        { echo:[en(b[0])], hintSay:[en(a[0]), G.say(a[1] + '.'), en(b[0]), G.say(b[1] + '.')], hint:G.hintCard(big(a[0] + ' — ' + b[0]), '<b>' + esc(a[0]) + '</b> — ' + esc(a[1]) + '<br><b>' + esc(b[0]) + '</b> — ' + esc(b[1])) }));
    }
    function antonTF(){
      var p = pick(PA), truth = Math.random() < .5, other = pick(PA.filter(function(x){ return x !== p; })), b = truth ? p[2] : other[2], bru = truth ? p[3] : other[3];
      return S('at' + p[0] + b, Object.assign(G.choice({ q:'«' + p[0] + '» и «' + b + '» — слова с противоположным значением', say:[G.say('Слова'), en(p[0]), G.say('и'), en(b), G.say('имеют противоположное значение. Верно или неверно?')], opts:['Верно', 'Неверно'], ans:truth ? 'Верно' : 'Неверно', layout:'wide', expr:big(p[0] + ' — ' + b) }),
        { echo:[en(p[0]), en(p[2])], hintSay:[en(p[0]), G.say(p[1] + '.'), en(b), G.say(bru + '.')], hint:G.hintCard(big(p[0] + ' — ' + b), '<b>' + esc(p[0]) + '</b> — ' + esc(p[1]) + '<br><b>' + esc(b) + '</b> — ' + esc(bru) + (truth ? '<br>Это противоположные слова' : '<br>Это не противоположные слова')) }));
    }
    /* вставь окончание / слово */
    function fillT(f){
      var full = f.pre + f.right + f.post, say = [G.say(f.q || 'Вставь пропущенное.')];
      var pr = f.pre.replace(/^[\s,.!?;:]+|[\s,.!?;:]+$/g, ''), po = f.post.replace(/^[\s,.!?;:]+/, '').trim();
      if(/[A-Za-z]/.test(pr)) say.push(en(pr));
      say.push(G.say('пропуск'));
      if(/[A-Za-z]/.test(po)) say.push(en(po));
      return S('fl' + f.pre + '|' + f.post + '|' + f.right, Object.assign(G.choice({ q:f.q || 'Вставь пропущенное', say:say, opts:[f.right].concat(f.wrong), ans:f.right, layout:'wide', expr:big(f.pre + '___' + f.post) }),
        { echo:[en(full)], hintSay:[en(full), G.say(f.ru + '. ' + (f.say || f.hint.replace(/<[^>]+>/g, '')))], hint:G.hintCard(big(full), '<b>' + esc(full) + '</b> — ' + esc(f.ru) + '<br>' + f.hint) }));
    }
    function fills(lv){ var a = FL.filter(function(f){ return (f.lv || 1) <= lv; }); return a.length ? a : FL; }
    /* какой буквы не хватает */
    function sound(lv){
      var a = SO.filter(function(s){ return (s[5] || 1) <= lv; }); if(!a.length) a = SO;
      var e = pick(a), ch = e[2], i = e[4] != null ? e[4] : e[0].indexOf(ch), mask = e[0].slice(0, i) + '_' + e[0].slice(i + 1);
      return S('sd' + e[0] + ch, Object.assign(G.choice({ q:'Какой буквы не хватает?', say:[G.say('Какой буквы не хватает?'), en(e[0])], opts:[ch].concat(e[3]), ans:ch, layout:'wide', expr:big(mask) }),
        { echo:[en(e[0])], hintSay:[en(e[0]), G.say(e[1] + '.')], hint:G.hintCard(big(e[0]), '<b>' + esc(e[0]) + '</b> — ' + esc(e[1]) + '<br>Здесь пишется буква «' + esc(ch) + '»') }));
    }
    /* порядок слов */
    function order(){
      var e = pick(OR), o = [e[0]].concat(shuffle(e[1]).slice(0, 2));
      return S('or' + e[0], Object.assign(G.choice({ q:'В каком предложении слова стоят правильно?', say:[G.say('В каком предложении слова стоят правильно?')], opts:o, ans:e[0], layout:'card' }),
        { echo:[en(e[0])], hintSay:[en(e[0]), G.say(e[2] + '. ' + (e[3] || 'Следи за порядком слов.'))], hint:G.hintCard(big(e[0]), '<b>' + esc(e[0]) + '</b> — ' + esc(e[2]) + '<br>' + esc(e[3] || 'Слова стоят в правильном порядке')) }));
    }
    /* утверждения: английские слова в {фигурных скобках} произносит английский голос */
    function plain(t){ return String(t).replace(/[{}]/g, ''); }
    function spk(t){ var out = [], parts = String(t).split(/\{([^}]*)\}/); parts.forEach(function(p, i){ if(!p.trim()) return; out.push(i % 2 ? en(p.trim()) : G.say(p.trim())); }); return out; }
    function rule(){
      var t = pick(TF), truth = t[1];
      return S('rt' + t[0], Object.assign(G.choice({ q:plain(t[0]), say:spk(t[0]).concat([G.say('Верно или неверно?')]), opts:['Верно', 'Неверно'], ans:truth ? 'Верно' : 'Неверно', layout:'wide' }),
        { hintExpr:'<span class="ok">' + (truth ? 'Верно' : 'Неверно') + '</span>', hintSay:spk(t[3] || t[2]), hint:G.hintCard('', esc(plain(t[2]))) }));
    }

    function L1(){
      var p = [];
      if(W.length) p.push(w2r, r2w);
      if(FL.length) p.push(function(){ return fillT(pick(fills(1))); }, function(){ return fillT(pick(fills(1))); });
      if(SO.length) p.push(function(){ return sound(1); });
      if(OR.length) p.push(order);
      return pick(p)();
    }
    function L2(){
      var p = [];
      if(GR.length > 1) p.push(sortT);
      if(PA.length) p.push(anton, anton);
      if(W.length && !PA.length) p.push(r2w);
      if(FL.length) p.push(function(){ return fillT(pick(fills(2))); }, function(){ return fillT(pick(fills(2))); });
      if(SO.length) p.push(function(){ return sound(2); });
      if(OR.length) p.push(order);
      return pick(p)();
    }
    function L3(){
      var p = [];
      if(GR.length > 1) p.push(odd, odd);
      if(W.length) p.push(tfw);
      if(PA.length) p.push(anton, antonTF);
      if(FL.length) p.push(function(){ return fillT(pick(fills(3))); }, function(){ return fillT(pick(fills(3))); }, function(){ return fillT(pick(fills(3))); });
      if(SO.length) p.push(function(){ return sound(3); }, function(){ return sound(3); });
      if(OR.length) p.push(order, order);
      if(TF.length) p.push(rule);
      return pick(p)();
    }
    return [L1, L2, L3];
  }
  window.ENG3 = { define:define, en:en };
})();
